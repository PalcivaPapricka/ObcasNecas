<script setup>
import { ref, computed, watch, nextTick, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  items: { type: Array, required: true },
  direction: { type: Number, default: 1 },
  speed: { type: Number, default: 36 }
})

const TAU = 0.45
const MAX_SPEED = 2800
const AUTO = () => props.direction * props.speed

const viewport = ref(null)
const track = ref(null)
const looping = ref(false)
const grabbing = ref(false)
const reps = ref(3)

const groupItems = computed(() => {
  const result = []
  for (let r = 0; r < reps.value; r++) {
    for (const item of props.items) result.push({ ...item, dup: r > 0 })
  }
  return result
})

let x = 0
let velocity = AUTO()
let loopWidth = 0
let raf = 0
let lastTime = 0
let hovering = false
let focused = false
let dragging = false
let visible = true
let reduced = false
let resizeObserver = null
let intersectionObserver = null
let mediaQuery = null
let mediaQueryHandler = null

const render = () => {
  if (track.value) track.value.style.transform = `translate3d(${-x}px, 0, 0)`
}

const wrap = () => {
  if (loopWidth <= 0) return
  x %= loopWidth
  if (x < 0) x += loopWidth
}

const tick = (time) => {
  raf = requestAnimationFrame(tick)
  const dt = Math.min((time - lastTime) / 1000, 0.05)
  lastTime = time
  if (!looping.value || dragging) return

  const target = hovering || focused || reduced ? 0 : AUTO()
  velocity += (target - velocity) * (1 - Math.exp(-dt / TAU))
  x += velocity * dt
  wrap()
  render()
}

const start = () => {
  if (raf || !visible) return
  lastTime = performance.now()
  raf = requestAnimationFrame(tick)
}

const stop = () => {
  if (!raf) return
  cancelAnimationFrame(raf)
  raf = 0
}

const measure = async () => {
  await nextTick()

  if (!viewport.value || !track.value || !props.items.length) {
    looping.value = false
    loopWidth = 0
    x = 0
    render()
    return
  }

  const slides = [...track.value.querySelectorAll('.slide')]
  const itemCount = props.items.length

  if (slides.length < itemCount * 2) {
    reps.value = Math.max(reps.value, 3)
    await nextTick()
    return measure()
  }

  const measured =
      slides[itemCount].getBoundingClientRect().left -
      slides[0].getBoundingClientRect().left

  if (!Number.isFinite(measured) || measured <= 0) return
  loopWidth = measured

  const requiredReps = Math.max(3, Math.ceil(viewport.value.clientWidth / loopWidth) + 2)
  if (requiredReps !== reps.value) {
    reps.value = requiredReps
    await nextTick()
    return measure()
  }

  looping.value = props.items.length >= 3

  if (!looping.value) {
    x = 0
    velocity = 0
    render()
    return
  }

  wrap()
  render()
}

let pointerId = null
let startX = 0
let lastX = 0
let lastPointerTime = 0
let suppressClick = false

const onPointerDown = (e) => {
  if (!looping.value || (e.pointerType === 'mouse' && e.button !== 0)) return
  pointerId = e.pointerId
  startX = e.clientX
  lastX = e.clientX
  lastPointerTime = performance.now()
}

const onPointerMove = (e) => {
  if (pointerId !== e.pointerId) return

  if (!dragging) {
    if (Math.abs(e.clientX - startX) < 6) return
    dragging = true
    grabbing.value = true
    viewport.value?.setPointerCapture?.(pointerId)
  }

  const now = performance.now()
  const dx = e.clientX - lastX
  const dt = Math.max((now - lastPointerTime) / 1000, 0.001)

  x -= dx
  wrap()
  render()

  velocity = velocity * 0.6 + (-dx / dt) * 0.4
  velocity = Math.max(-MAX_SPEED, Math.min(MAX_SPEED, velocity))

  lastX = e.clientX
  lastPointerTime = now
}

const onPointerUp = (e) => {
  if (pointerId !== e.pointerId) return
  pointerId = null
  if (!dragging) return

  dragging = false
  grabbing.value = false
  suppressClick = true
  setTimeout(() => (suppressClick = false), 0)

  if (performance.now() - lastPointerTime > 90) velocity = 0
  wrap()
  render()
}

const onClickCapture = (e) => {
  if (!suppressClick) return
  e.preventDefault()
  e.stopPropagation()
  suppressClick = false
}

watch(
    () => props.items,
    async () => {
      x = 0
      velocity = AUTO()
      reps.value = 3
      await measure()
    }
)

onMounted(async () => {
  mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  reduced = mediaQuery.matches
  mediaQueryHandler = (e) => {
    reduced = e.matches
    velocity = reduced ? 0 : AUTO()
  }
  mediaQuery.addEventListener?.('change', mediaQueryHandler)

  resizeObserver = new ResizeObserver(() => measure())
  resizeObserver.observe(viewport.value)

  intersectionObserver = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting
    visible ? start() : stop()
  })
  intersectionObserver.observe(viewport.value)

  await measure()

  if (looping.value && props.direction < 0) {
    x = loopWidth * 0.5
    wrap()
    render()
  }

  start()
})

onBeforeUnmount(() => {
  stop()
  resizeObserver?.disconnect()
  intersectionObserver?.disconnect()
  mediaQuery?.removeEventListener?.('change', mediaQueryHandler)
})
</script>

<template>
  <div
      ref="viewport"
      class="carousel"
      :class="{ grabbing, static: !looping }"
      @mouseenter="hovering = true"
      @mouseleave="hovering = false"
      @focusin="focused = true"
      @focusout="focused = false"
      @pointerdown="onPointerDown"
      @pointermove="onPointerMove"
      @pointerup="onPointerUp"
      @pointercancel="onPointerUp"
      @click.capture="onClickCapture"
  >
    <div ref="track" class="track">
      <RouterLink
          v-for="(k, i) in groupItems"
          :key="`${i}-${k.slug}`"
          :to="`/kategorie/${k.slug}`"
          class="slide"
          draggable="false"
          :title="k.label"
          :tabindex="k.dup ? -1 : undefined"
          :aria-hidden="k.dup ? 'true' : undefined"
      >
        <span>{{ k.name }}</span>
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.carousel {
  overflow: hidden;
  overflow: clip;
  touch-action: pan-y;
  cursor: grab;
  user-select: none;
  -webkit-user-select: none;
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 60px, #000 calc(100% - 60px), transparent);
  mask-image: linear-gradient(90deg, transparent, #000 60px, #000 calc(100% - 60px), transparent);
}

.carousel.static {
  cursor: default;
  -webkit-mask-image: none;
  mask-image: none;
}

.carousel.grabbing {
  cursor: grabbing;
}

.carousel.grabbing .slide {
  pointer-events: none;
}

.track {
  display: flex;
  gap: 16px;
  width: max-content;
  will-change: transform;
}

.slide {
  flex: 0 0 auto;
  box-sizing: border-box;
  min-width: 132px;
  max-width: 170px;
  height: 70px;
  padding: 0 20px;

  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  background: #fff;
  border-radius: 14px;
  border: 1.5px solid var(--color-text);
  color: #111;
  text-decoration: none;
  font: 700 1.2rem/1.1 var(--font-display);
  letter-spacing: -0.01em;
  text-wrap: balance;

  -webkit-user-drag: none;
  transition: background 0.2s ease;
}

.slide:hover,
.slide:focus-visible {
  background: var(--color-mark);
}

@media (max-width: 720px) {
  .slide {
    min-width: 116px;
    height: 62px;
    font-size: 1.1rem;
  }
}
</style>
import { useRef, useCallback } from 'react'

/**
 * 3D tilt effect hook. Returns { ref, onMouseMove, onMouseLeave }.
 * Only active on fine-pointer devices. Max tilt degrees configurable.
 */
export function useTilt(maxDeg = 6) {
  const ref = useRef(null)

  const onMouseMove = useCallback((e) => {
    if (!ref.current) return
    const el = ref.current
    const { left, top, width, height } = el.getBoundingClientRect()
    const x = (e.clientX - left) / width - 0.5
    const y = (e.clientY - top) / height - 0.5
    const rotX = -y * maxDeg * 2
    const rotY = x * maxDeg * 2
    el.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(0)`
  }, [maxDeg])

  const onMouseLeave = useCallback(() => {
    if (!ref.current) return
    ref.current.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0)'
    ref.current.style.transition = 'transform 0.5s ease'
    setTimeout(() => {
      if (ref.current) ref.current.style.transition = ''
    }, 500)
  }, [])

  return { ref, onMouseMove, onMouseLeave }
}

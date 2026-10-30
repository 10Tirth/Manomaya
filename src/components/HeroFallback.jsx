/** Static CSS fallback for when WebGL is unavailable or reduced-motion is on. */
export default function HeroFallback() {
  return (
    <div className="relative w-full h-full flex items-center justify-center" aria-hidden="true">
      {/* Layered pastel radial-gradient orbs */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="blob-float"
          style={{
            width: 340,
            height: 340,
            borderRadius: '50%',
            background: 'radial-gradient(circle at 38% 40%, #cfc7fb 0%, #9fd3c1 45%, #bfe0f5 80%, transparent 100%)',
            opacity: 0.85,
            filter: 'blur(2px)',
          }}
        />
      </div>
      <div className="absolute" style={{ top: '15%', right: '15%' }}>
        <div
          className="blob-float-slow"
          style={{
            width: 120,
            height: 120,
            borderRadius: '50%',
            background: 'radial-gradient(circle, #ffcdb8 0%, transparent 70%)',
            opacity: 0.75,
          }}
        />
      </div>
      <div className="absolute" style={{ bottom: '18%', left: '18%' }}>
        <div
          className="blob-float-fast"
          style={{
            width: 90,
            height: 90,
            borderRadius: '50%',
            background: 'radial-gradient(circle, #ffe8a8 0%, transparent 70%)',
            opacity: 0.7,
          }}
        />
      </div>
      <div className="absolute" style={{ top: '30%', left: '10%' }}>
        <div
          className="blob-float"
          style={{
            width: 70,
            height: 70,
            borderRadius: '50%',
            background: 'radial-gradient(circle, #b9aef2 0%, transparent 70%)',
            opacity: 0.65,
          }}
        />
      </div>
    </div>
  )
}

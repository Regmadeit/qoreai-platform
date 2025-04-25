export default function ModernSVGLogo() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#0A3D62] to-[#1B4F72] p-6">
      <h1 className="text-white text-3xl font-bold mb-8">QoreAi Modern SVG Logo</h1>
      <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg shadow-xl">
        <svg width="800" height="400" viewBox="0 0 800 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Main Q Circle */}
          <circle cx="400" cy="160" r="120" fill="#0A3D62" />

          {/* Inner Circle (Negative Space) */}
          <circle cx="400" cy="160" r="60" fill="white" />

          {/* Gold Accent */}
          <path d="M460 220 L520 280 L460 280 L420 240 Z" fill="#FFC107" />

          {/* QoreAi Text */}
          <text x="160" y="360" fontFamily="Montserrat, sans-serif" fontWeight="700" fontSize="96" fill="#0A3D62">
            QoreAi
          </text>

          {/* Tagline */}
          <text x="160" y="390" fontFamily="Roboto, sans-serif" fontWeight="400" fontSize="28" fill="#1B4F72">
            DATA | OPERATIONS | CLARITY
          </text>
        </svg>
      </div>
      <p className="text-white/80 mt-6 max-w-md text-center">
        This is your modernized QoreAi logo in SVG format with a transparent background, perfect for your Shopify site
        at Qoreai.co
      </p>
    </div>
  )
}

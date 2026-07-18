export function Logo({ className = "", dark = false }: { className?: string; dark?: boolean }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="chaazLogoGradient" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
            <stop stopColor="#1246C7" />
            <stop offset="1" stopColor="#1FA84A" />
          </linearGradient>
        </defs>
        <circle cx="12" cy="12" r="11" fill="url(#chaazLogoGradient)" />
        <path
          d="M8 7c0-1.1.9-2 2-2s2 .9 2 2M12 5v4M8 11h8a2 2 0 0 1 2 2v0a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v0a2 2 0 0 1 2-2Z"
          stroke="white"
          strokeWidth="1.3"
          fill="none"
          strokeLinecap="round"
        />
        <path d="M9 17c0 1.1.9 2 2 2s2-.9 2-2" stroke="white" strokeWidth="1.3" fill="none" strokeLinecap="round" />
      </svg>
      <span className="font-extrabold tracking-tight leading-none text-lg">
        <span className={dark ? "text-white" : "text-gradient-brand"}>CHAAZ BUILDERS</span>
      </span>
    </div>
  );
}

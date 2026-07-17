export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="11" fill="#1E4E8C" />
        <path
          d="M8 7c0-1.1.9-2 2-2s2 .9 2 2M12 5v4M8 11h8a2 2 0 0 1 2 2v0a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v0a2 2 0 0 1 2-2Z"
          stroke="white"
          strokeWidth="1.3"
          fill="none"
          strokeLinecap="round"
        />
        <path d="M9 17c0 1.1.9 2 2 2s2-.9 2-2" stroke="white" strokeWidth="1.3" fill="none" strokeLinecap="round" />
      </svg>
      <span className="font-extrabold tracking-tight leading-none">
        <span className="text-brand text-lg">CHAAZ</span>{" "}
        <span className="text-brand-dark text-lg">BUILDERS</span>
      </span>
    </div>
  );
}

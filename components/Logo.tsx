import Image from "next/image";

export function Logo({ className = "", full = false }: { className?: string; full?: boolean }) {
  if (full) {
    return (
      <Image
        src="/logo-full.png"
        alt="Chaaz Builders - Quality. Reliability. Every Time."
        width={700}
        height={220}
        className={`h-auto w-56 ${className}`}
        priority
      />
    );
  }

  return (
    <Image
      src="/logo.png"
      alt="Chaaz Builders"
      width={600}
      height={149}
      className={`h-9 w-auto ${className}`}
      priority
    />
  );
}

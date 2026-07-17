import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t mt-16 bg-neutral-50">
      <div className="max-w-6xl mx-auto px-4 py-8 text-sm text-neutral-600 flex flex-col md:flex-row justify-between gap-4">
        <p>&copy; {new Date().getFullYear()} Chaaz Builders. All rights reserved.</p>
        <div className="flex gap-4">
          <Link href="/contact">Contact</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
        </div>
      </div>
    </footer>
  );
}

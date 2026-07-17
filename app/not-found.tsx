import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-md mx-auto px-4 py-24 text-center">
      <h1 className="text-2xl font-bold mb-2">404</h1>
      <p className="text-neutral-500 mb-4">Page not found.</p>
      <Link href="/" className="text-brand-dark underline">
        Back home
      </Link>
    </div>
  );
}

import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="container-page grid min-h-svh place-content-center gap-6 text-center">
      <p className="eyebrow mx-auto">404</p>
      <h1 className="h-section">This route doesn&apos;t exist.</h1>
      <p className="text-muted">The page may have moved, or the link is wrong.</p>
      <Link href="/" className="btn btn-primary mx-auto">Back to home</Link>
    </main>
  );
}

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
          <span>© 2025 Recipe Explorer. Functional culinary notebook.</span>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/recipes" className="hover:text-emerald-700 transition-colors">
            Recipes
          </Link>
          <Link href="/cuisines" className="hover:text-emerald-700 transition-colors">
            Cuisines
          </Link>
          <Link href="/about" className="hover:text-emerald-700 transition-colors">
            About
          </Link>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-emerald-700 transition-colors"
          >
            GitHub Repository
          </a>
        </div>
      </div>
    </footer>
  );
}

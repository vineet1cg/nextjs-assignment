"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const navLinks = [
    { label: "Recipes", href: "/recipes" },
    { label: "Cuisines", href: "/cuisines" },
    { label: "About", href: "/about" },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 group-hover:scale-125 transition-transform"></span>
            <span className="font-bold text-lg text-slate-900 tracking-tight">Recipe Explorer</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href === "/recipes" && (pathname === "/" || pathname?.startsWith("/recipes")));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors ${
                    isActive
                      ? "text-emerald-700 font-semibold border-b-2 border-emerald-600 pb-0.5"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/recipes/new"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-md transition-colors shadow-sm"
          >
            <span className="text-base leading-none">+</span>
            <span>New Recipe</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

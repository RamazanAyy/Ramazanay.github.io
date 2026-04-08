'use client';
import Link from 'next/link';
import { useLocale } from 'next-intl';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export default function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  const locale = useLocale();
  return (
    <nav className="py-4 text-sm" aria-label="Breadcrumb">
      <ol className="flex items-center gap-2 flex-wrap">
        <li>
          <Link
            href={`/${locale}`}
            className="text-gray-500 hover:text-[#1a5fa8] transition-colors"
          >
            Anasayfa
          </Link>
        </li>
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-2">
            <svg
              className="w-3.5 h-3.5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
            {item.href ? (
              <Link
                href={item.href}
                className="text-gray-500 hover:text-[#1a5fa8] transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-[#1a5fa8] font-medium">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

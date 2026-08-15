const LINKS = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "YouTube", href: "https://youtube.com" },
];

export default function SocialLinks() {
  return (
    <nav className="flex items-center gap-4 text-xs text-cream/70">
      {LINKS.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors hover:text-cream"
        >
          {link.label}
        </a>
      ))}
    </nav>
  );
}

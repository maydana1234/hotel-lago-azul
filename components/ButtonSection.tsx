import "./buttonSection.css";

const links = [
  { label: "GitHub", href: "https://github.com" },
  { label: "Frontend Mentor", href: "https://www.frontendmentor.io" },
  { label: "LinkedIn", href: "https://www.linkedin.com" },
  { label: "Twitter", href: "https://twitter.com" },
  { label: "Instagram", href: "https://www.instagram.com" },
];

export default function ButtonSection() {
  return (
    <nav className="button-section" aria-label="Social links">
      {links.map((link) => (
        <a
          key={link.label}
          className="button-section__link"
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
        >
          {link.label}
        </a>
      ))}
    </nav>
  );
}
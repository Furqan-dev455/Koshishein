"use client";

import { useState } from "react";
import Link from "next/link";
import BrandLogo from "@/components/BrandLogo";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import siteConfig from "@/data/siteConfig";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="header-brand" onClick={closeMenu}>
          <BrandLogo />
        </Link>

        <nav className="desktop-nav">
          <Link href="/">Home</Link>
          <Link href="/collection">Collection</Link>
          <Link href="/about">About</Link>
          <Link href="/catalog">Catalog</Link>
        </nav>

        <a
          href={`https://wa.me/${siteConfig.whatsappNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          className="header-whatsapp"
          aria-label="Contact on WhatsApp"
        >
          <WhatsAppIcon size={22} />
        </a>

        <button
          type="button"
          className="mobile-menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {menuOpen && (
        <nav className="mobile-nav">
          <Link href="/" onClick={closeMenu}>
            Home
          </Link>

          <Link href="/collection" onClick={closeMenu}>
            Collection
          </Link>

          <Link href="/about" onClick={closeMenu}>
            About
          </Link>

          <Link href="/catalog" onClick={closeMenu}>
            Catalog
          </Link>

          <a
            href={`https://wa.me/${siteConfig.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMenu}
            className="mobile-nav-whatsapp"
          >
            <WhatsAppIcon size={16} />
            Order on WhatsApp
          </a>
        </nav>
      )}
    </header>
  );
}

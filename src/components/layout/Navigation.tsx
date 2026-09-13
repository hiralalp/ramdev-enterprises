"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { navigation } from "@/data/navigation";
type ProductGroup = {
  category: string;
  products: { slug: string; name: string; approved: boolean }[];
};

export function MegaMenu({ groups }: { groups: ProductGroup[] }) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const closeOutside = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", closeOutside);
    return () => document.removeEventListener("pointerdown", closeOutside);
  }, []);
  return (
    <div
      className="mega-root"
      ref={root}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          setOpen(false);
          trigger.current?.focus();
        }
      }}
    >
      <button
        ref={trigger}
        className="nav-trigger"
        aria-expanded={open}
        aria-controls="product-menu"
        onClick={() => setOpen(!open)}
      >
        Products
        <ChevronDown size={12} aria-hidden="true" />
      </button>
      {open && (
        <div id="product-menu" className="mega-menu">
          <div>
            <p className="eyebrow">MATERIAL ENQUIRIES</p>
            <h2>Find your starting point.</h2>
            <Link
              className="text-link"
              href="/products"
              onClick={() => setOpen(false)}
            >
              Explore all categories
              <ArrowUpRight size={16} />
            </Link>
          </div>
          <div className="mega-links">
            {groups.map((group) => (
              <div className="mega-group" key={group.category}>
                <h3>{group.category}</h3>
                {group.products.map((product) => (
                  <Link
                    key={product.slug}
                    href={`/products/${product.slug}`}
                    onClick={() => setOpen(false)}
                  >
                    {product.name}
                    <ArrowUpRight size={15} aria-hidden="true" />
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function DesktopNav({ groups }: { groups: ProductGroup[] }) {
  const pathname = usePathname();
  return (
    <nav className="desktop-nav" aria-label="Main navigation">
      {groups.length ? (
        <MegaMenu groups={groups} />
      ) : (
        <Link
          href="/products"
          aria-current={pathname === "/products" ? "page" : undefined}
        >
          Products
        </Link>
      )}
      {navigation.slice(1).map((item) => (
        <Link
          key={item.href}
          href={item.href}
          aria-current={
            pathname === item.href || pathname.startsWith(`${item.href}/`)
              ? "page"
              : undefined
          }
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}

export function MobileNav({ groups }: { groups: ProductGroup[] }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);
  function close() {
    dialog.current?.close();
    setOpen(false);
    trigger.current?.focus();
  }
  function containFocus(event: React.KeyboardEvent<HTMLDialogElement>) {
    if (event.key !== "Tab") return;
    const controls = Array.from(
      event.currentTarget.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), summary, [tabindex="0"]',
      ),
    ).filter((control) => control.checkVisibility());
    const first = controls[0];
    const last = controls[controls.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  }
  return (
    <div className="mobile-nav">
      <button
        ref={trigger}
        className="icon-button"
        aria-label="Open navigation"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => {
          dialog.current?.showModal();
          setOpen(true);
        }}
      >
        <Menu size={25} />
      </button>
      <dialog
        ref={dialog}
        id="mobile-menu"
        className="mobile-dialog"
        aria-label="Site navigation"
        onKeyDown={containFocus}
        onCancel={() => setOpen(false)}
        onClose={() => setOpen(false)}
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
      >
        <div className="mobile-menu-top">
          <strong>Ramdev Enterprises</strong>
          <button
            className="icon-button"
            onClick={close}
            aria-label="Close navigation"
          >
            <X />
          </button>
        </div>
        <nav aria-label="Mobile navigation">
          {navigation.map((item) => (
            <Link href={item.href} key={item.href} onClick={close}>
              {item.label}
              <ArrowUpRight size={18} />
            </Link>
          ))}
          {groups.length > 0 && (
            <details className="mobile-product-groups">
              <summary>Browse product groups</summary>
              {groups.map((group) => (
                <details key={group.category}>
                  <summary>{group.category}</summary>
                  {group.products.map((product) => (
                    <Link
                      key={product.slug}
                      href={`/products/${product.slug}`}
                      onClick={close}
                    >
                      {product.name}
                      <ArrowUpRight size={14} aria-hidden="true" />
                    </Link>
                  ))}
                </details>
              ))}
            </details>
          )}
          <Link className="button" href="/request-quote" onClick={close}>
            Request a quote
            <ArrowUpRight size={18} />
          </Link>
        </nav>
      </dialog>
    </div>
  );
}

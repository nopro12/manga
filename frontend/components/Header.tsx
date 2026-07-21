'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-primary text-black px-3 py-2 rounded-lg font-bold text-lg">
              WEB
            </div>
            <div className="text-xl font-bold">TOON</div>
          </Link>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/originals" className="font-semibold hover:text-primary transition">
              ORIGINALS
            </Link>
            <Link href="/categories" className="font-semibold hover:text-primary transition">
              CATEGORIES
            </Link>
            <Link href="/rankings" className="font-semibold hover:text-primary transition">
              RANKINGS
            </Link>
            <Link href="/canvas" className="font-semibold hover:text-primary transition">
              CANVAS
            </Link>
          </nav>

          {/* Right Section */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/shop" className="text-sm font-semibold hover:text-primary transition">
              SHOP
            </Link>
            <Link href="/creators" className="text-sm font-semibold hover:text-primary transition">
              CREATORS
            </Link>
            <Link href="/dashboard" className="bg-black text-white px-4 py-2 rounded-full font-semibold text-sm hover:bg-gray-800 transition">
              DASHBOARD
            </Link>
            <Link href="/login" className="font-semibold hover:text-primary transition">
              Log In
            </Link>
            <button className="text-2xl">🔍</button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <nav className="md:hidden mt-4 space-y-4 border-t pt-4">
            <Link href="/originals" className="block font-semibold">
              ORIGINALS
            </Link>
            <Link href="/categories" className="block font-semibold">
              CATEGORIES
            </Link>
            <Link href="/rankings" className="block font-semibold">
              RANKINGS
            </Link>
            <Link href="/canvas" className="block font-semibold">
              CANVAS
            </Link>
            <Link href="/login" className="block font-semibold">
              Log In
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}

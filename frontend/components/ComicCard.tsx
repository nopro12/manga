'use client'

import Image from 'next/image'
import Link from 'next/link'

interface ComicCardProps {
  comic: {
    id: number
    title: string
    rank: number
    genre: string
    image: string
    isNew?: boolean
    isRecent?: boolean
    chapters?: number
  }
}

export default function ComicCard({ comic }: ComicCardProps) {
  return (
    <Link href={`/comic/${comic.id}`}>
      <div className="cursor-pointer group">
        <div className="relative mb-3 rounded-lg overflow-hidden bg-gray-200">
          <Image
            src={comic.image}
            alt={comic.title}
            width={200}
            height={300}
            className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {/* Badges */}
          <div className="absolute top-2 left-2 flex gap-2">
            {comic.isNew && (
              <span className="bg-primary text-black px-2 py-1 rounded text-xs font-bold">
                NEW SERIES
              </span>
            )}
            {comic.isRecent && (
              <span className="bg-yellow-400 text-black px-2 py-1 rounded text-xs font-bold">
                Recently Viewed
              </span>
            )}
          </div>

          {/* Rank */}
          <div className="absolute bottom-2 left-2 bg-black text-white text-2xl font-bold w-10 h-10 flex items-center justify-center rounded">
            {comic.rank}
          </div>
        </div>

        <div>
          <p className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition">
            {comic.title}
          </p>
          <p className="text-gray-500 text-xs mt-1">{comic.genre}</p>
          {comic.chapters && (
            <p className="text-gray-400 text-xs mt-1">+{comic.chapters}</p>
          )}
        </div>
      </div>
    </Link>
  )
}

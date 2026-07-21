'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ComicCard from '@/components/ComicCard'

interface Comic {
  _id: string
  title: string
  rank: number
  genre: string[]
  coverImage: string
  description: string
  views: number
  rating: number
}

export default function ComicDetailPage({ params }: { params: { id: string } }) {
  const [comic, setComic] = useState<Comic | null>(null)
  const [loading, setLoading] = useState(true)
  const [isFavorite, setIsFavorite] = useState(false)
  const [relatedComics, setRelatedComics] = useState<Comic[]>([])

  useEffect(() => {
    const fetchComic = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/comics/${params.id}`
        )
        const data = await response.json()
        setComic(data)
      } catch (error) {
        console.error('Failed to fetch comic', error)
      } finally {
        setLoading(false)
      }
    }

    fetchComic()
  }, [params.id])

  useEffect(() => {
    const fetchRelated = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/comics?limit=4`
        )
        const data = await response.json()
        setRelatedComics(data.comics || [])
      } catch (error) {
        console.error('Failed to fetch related comics', error)
      }
    }

    fetchRelated()
  }, [])

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">Loading...</div>
        <Footer />
      </>
    )
  }

  if (!comic) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">Comic not found</div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          {/* Hero Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Cover Image */}
            <div>
              <img
                src={comic.coverImage}
                alt={comic.title}
                className="w-full rounded-lg shadow-lg"
              />
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className={`w-full mt-4 py-2 rounded-lg font-semibold transition ${
                  isFavorite
                    ? 'bg-primary text-black hover:bg-opacity-90'
                    : 'bg-gray-200 text-black hover:bg-gray-300'
                }`}
              >
                {isFavorite ? '❤️ Added to Favorites' : '🤍 Add to Favorites'}
              </button>
            </div>

            {/* Comic Info */}
            <div className="md:col-span-2">
              <h1 className="text-4xl font-bold mb-4">{comic.title}</h1>
              <p className="text-gray-600 mb-6 text-lg">{comic.description}</p>

              <div className="space-y-4 mb-8">
                <div>
                  <h3 className="font-semibold text-sm text-gray-500 uppercase">Genre</h3>
                  <div className="flex gap-2 flex-wrap mt-2">
                    {comic.genre.map((g) => (
                      <span
                        key={g}
                        className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm"
                      >
                        {g}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-8">
                  <div>
                    <h3 className="font-semibold text-sm text-gray-500 uppercase">Views</h3>
                    <p className="text-2xl font-bold mt-1">{comic.views.toLocaleString()}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-gray-500 uppercase">Rating</h3>
                    <p className="text-2xl font-bold mt-1">⭐ {comic.rating.toFixed(1)}</p>
                  </div>
                </div>
              </div>

              <Link
                href={`/read/${comic._id}/1`}
                className="bg-primary text-black px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition inline-block"
              >
                Start Reading
              </Link>
            </div>
          </div>

          {/* Chapters Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Chapters</h2>
            <div className="space-y-2 border-t">
              {/* Mock chapters */}
              {[1, 2, 3, 4, 5].map((ch) => (
                <Link
                  key={ch}
                  href={`/read/${comic._id}/${ch}`}
                  className="block p-4 hover:bg-gray-50 border-b transition"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Chapter {ch}</span>
                    <span className="text-gray-500 text-sm">New</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Related Comics */}
          <section>
            <h2 className="text-2xl font-bold mb-6">You might also like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedComics.map((relatedComic) => (
                <ComicCard
                  key={relatedComic._id}
                  comic={{
                    id: relatedComic._id,
                    title: relatedComic.title,
                    rank: 0,
                    genre: relatedComic.genre[0] || 'Unknown',
                    image: relatedComic.coverImage,
                  }}
                />
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}

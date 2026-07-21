'use client'

import { useState } from 'react'
import ComicCard from './ComicCard'

const mockComics = [
  {
    id: 1,
    title: 'The Necromancer Saint',
    rank: 1,
    genre: 'Fantasy',
    image: 'https://via.placeholder.com/200x300?text=Necromancer',
    isNew: true,
  },
  {
    id: 2,
    title: 'Not Your Typical Reincarnation Story',
    rank: 2,
    genre: 'Romance',
    image: 'https://via.placeholder.com/200x300?text=Reincarnation',
    chapters: 1,
  },
  {
    id: 3,
    title: 'Daisy: How to Become the Duke\'s Fiancée',
    rank: 3,
    genre: 'Romance',
    image: 'https://via.placeholder.com/200x300?text=Daisy',
    chapters: 2,
  },
  {
    id: 4,
    title: 'The Murderer Targets Brunettes',
    rank: 4,
    genre: 'Mystery',
    image: 'https://via.placeholder.com/200x300?text=Murderer',
  },
  {
    id: 5,
    title: 'The Visitor of the Night',
    rank: 5,
    genre: 'Romance',
    image: 'https://via.placeholder.com/200x300?text=Visitor',
    isRecent: true,
  },
]

export default function TrendingSection() {
  const [activeTab, setActiveTab] = useState('trending')

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold">Trending & Popular Series</h2>
        <a href="#" className="text-primary font-semibold hover:underline">
          View all >
        </a>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-8">
        <button
          onClick={() => setActiveTab('trending')}
          className={`px-6 py-2 rounded-full font-semibold transition ${
            activeTab === 'trending'
              ? 'bg-black text-white'
              : 'bg-gray-200 text-black hover:bg-gray-300'
          }`}
        >
          Trending
        </button>
        <button
          onClick={() => setActiveTab('popular')}
          className={`px-6 py-2 rounded-full font-semibold transition ${
            activeTab === 'popular'
              ? 'bg-black text-white'
              : 'bg-gray-200 text-black hover:bg-gray-300'
          }`}
        >
          Popular
        </button>
      </div>

      {/* Comics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 overflow-x-auto">
        {mockComics.map((comic) => (
          <ComicCard key={comic.id} comic={comic} />
        ))}
      </div>
    </section>
  )
}

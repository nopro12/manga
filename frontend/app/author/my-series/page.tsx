'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

interface Series {
  _id: string
  title: string
  description: string
  status: string
  genre: string[]
  views: number
  createdAt: string
}

export default function MySeriesPage() {
  const [series, setSeries] = useState<Series[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        const token = localStorage.getItem('token')
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/comics?author=${localStorage.getItem('user')}&limit=20`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )

        if (response.ok) {
          const data = await response.json()
          setSeries(data.comics || [])
        }
      } catch (error) {
        console.error('Failed to fetch series', error)
      } finally {
        setLoading(false)
      }
    }

    fetchSeries()
  }, [])

  const filteredSeries = filter === 'all' ? series : series.filter((s) => s.status === filter)

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">My Series</h1>
            <Link
              href="/author/create"
              className="bg-primary text-black px-6 py-2 rounded-lg font-semibold hover:bg-opacity-90 transition"
            >
              + Create Series
            </Link>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-4 mb-8 border-b">
            {['all', 'draft', 'pending', 'approved', 'published'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 font-semibold border-b-2 transition capitalize ${
                  filter === status
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="text-center py-12">Loading...</div>
          ) : filteredSeries.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSeries.map((s) => (
                <div key={s._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold line-clamp-2">{s.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                        s.status === 'published'
                          ? 'bg-green-100 text-green-800'
                          : s.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : s.status === 'rejected'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {s.status}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{s.description}</p>
                    <div className="flex gap-2 flex-wrap mb-4">
                      {s.genre.slice(0, 2).map((g) => (
                        <span key={g} className="bg-gray-200 text-gray-800 px-2 py-1 rounded text-xs">
                          {g}
                        </span>
                      ))}
                    </div>
                    <div className="text-gray-500 text-sm mb-4">
                      👁️ {s.views.toLocaleString()} views
                    </div>
                    <Link
                      href={`/author/series/${s._id}`}
                      className="block w-full text-center bg-black text-white py-2 rounded-lg font-semibold hover:bg-gray-800 transition"
                    >
                      Edit Series
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg">
              <p className="text-gray-600 mb-4">You haven't created any series yet.</p>
              <Link
                href="/author/create"
                className="inline-block bg-primary text-black px-6 py-2 rounded-lg font-semibold hover:bg-opacity-90 transition"
              >
                Create Your First Series
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}

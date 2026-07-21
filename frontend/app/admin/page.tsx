'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

interface Stats {
  totalUsers: number
  totalComics: number
  pendingReviews: number
  publishedComics: number
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    totalComics: 0,
    pendingReviews: 0,
    publishedComics: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token')
        // In a real app, you would fetch actual stats from the backend
        // For now, we'll just set mock data
        setStats({
          totalUsers: 1250,
          totalComics: 89,
          pendingReviews: 12,
          publishedComics: 67,
        })
      } catch (error) {
        console.error('Failed to fetch stats', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
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

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-gray-600 font-semibold mb-2">Total Users</h3>
              <p className="text-4xl font-bold">{stats.totalUsers.toLocaleString()}</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-gray-600 font-semibold mb-2">Total Comics</h3>
              <p className="text-4xl font-bold">{stats.totalComics}</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-gray-600 font-semibold mb-2">Pending Reviews</h3>
              <p className="text-4xl font-bold text-yellow-600">{stats.pendingReviews}</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-gray-600 font-semibold mb-2">Published</h3>
              <p className="text-4xl font-bold text-green-600">{stats.publishedComics}</p>
            </div>
          </div>

          {/* Management Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link
              href="/admin/users"
              className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition"
            >
              <h3 className="text-2xl font-bold mb-4">User Management</h3>
              <p className="text-gray-600 mb-4">Manage all users, assign roles, and handle permissions.</p>
              <button className="text-primary font-semibold hover:underline">
                Go to Users →
              </button>
            </Link>

            <Link
              href="/admin/reviews"
              className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition"
            >
              <h3 className="text-2xl font-bold mb-4">Review Queue</h3>
              <p className="text-gray-600 mb-4">
                Review and approve pending comics and chapters.
              </p>
              <button className="text-primary font-semibold hover:underline">
                Go to Reviews →
              </button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

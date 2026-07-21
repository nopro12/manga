'use client'

import { useEffect, useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

interface User {
  id: string
  username: string
  email: string
  role: string
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token')
      const userData = localStorage.getItem('user')

      if (!token || !userData) {
        window.location.href = '/login'
        return
      }

      try {
        setUser(JSON.parse(userData))
      } catch (error) {
        console.error('Failed to parse user data')
      }

      setLoading(false)
    }

    checkAuth()
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    window.location.href = '/'
  }

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">Loading...</div>
        <Footer />
      </>
    )
  }

  if (!user) {
    return null
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          {/* Dashboard Header */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold mb-2">Welcome, {user.username}!</h1>
                <p className="text-gray-600 capitalize">Role: {user.role}</p>
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-600 transition"
              >
                Log Out
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex gap-4 mb-8 border-b">
            {['overview', 'library', 'history'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 font-semibold border-b-2 transition capitalize ${
                  activeTab === tab
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab}
              </button>
            ))}
            {user.role === 'author' && (
              <button
                onClick={() => (window.location.href = '/author/create')}
                className="px-6 py-3 font-semibold border-b-2 border-transparent text-gray-600 hover:text-gray-900"
              >
                Create Series
              </button>
            )}
            {(user.role === 'editor' || user.role === 'admin') && (
              <button
                onClick={() => (window.location.href = '/admin/reviews')}
                className="px-6 py-3 font-semibold border-b-2 border-transparent text-gray-600 hover:text-gray-900"
              >
                Review Queue
              </button>
            )}
          </div>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-gray-600 font-semibold mb-2">Reading Streak</h3>
                <p className="text-3xl font-bold">7 days</p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-gray-600 font-semibold mb-2">Favorites</h3>
                <p className="text-3xl font-bold">12 series</p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-gray-600 font-semibold mb-2">Chapters Read</h3>
                <p className="text-3xl font-bold">45 chapters</p>
              </div>
            </div>
          )}

          {/* Library Tab */}
          {activeTab === 'library' && (
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold mb-6">My Library</h2>
              <p className="text-gray-600">Your favorite comics will appear here</p>
            </div>
          )}

          {/* History Tab */}
          {activeTab === 'history' && (
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold mb-6">Reading History</h2>
              <p className="text-gray-600">Your reading history will appear here</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}

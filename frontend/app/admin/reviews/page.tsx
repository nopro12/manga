'use client'

import { useEffect, useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

interface Review {
  _id: string
  title: string
  status: 'pending' | 'approved' | 'rejected'
  author: { username: string }
  createdAt: string
  comments?: string
}

export default function ReviewQueuePage() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('pending')

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const token = localStorage.getItem('token')
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/comics?status=${filter}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )

        if (response.ok) {
          const data = await response.json()
          setReviews(data.comics || [])
        }
      } catch (error) {
        console.error('Failed to fetch reviews', error)
      } finally {
        setLoading(false)
      }
    }

    fetchReviews()
  }, [filter])

  const handleApprove = async (id: string) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/comics/${id}/approve`,
        {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      if (response.ok) {
        setReviews(reviews.filter((r) => r._id !== id))
      }
    } catch (error) {
      console.error('Failed to approve', error)
    }
  }

  const handleReject = async (id: string, reason: string) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/comics/${id}/reject`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ reason }),
        }
      )

      if (response.ok) {
        setReviews(reviews.filter((r) => r._id !== id))
      }
    } catch (error) {
      console.error('Failed to reject', error)
    }
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Review Queue</h1>

          {/* Filter Tabs */}
          <div className="flex gap-4 mb-8 border-b">
            {['pending', 'approved', 'rejected'].map((status) => (
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
          ) : reviews.length > 0 ? (
            <div className="space-y-4">
              {reviews.map((review) => (
                <div key={review._id} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold mb-1">{review.title}</h3>
                      <p className="text-gray-600 text-sm">By {review.author.username}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                      review.status === 'approved'
                        ? 'bg-green-100 text-green-800'
                        : review.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {review.status}
                    </span>
                  </div>

                  {review.comments && (
                    <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-700">
                        <strong>Comments:</strong> {review.comments}
                      </p>
                    </div>
                  )}

                  {review.status === 'pending' && (
                    <div className="flex gap-4">
                      <button
                        onClick={() => handleApprove(review._id)}
                        className="flex-1 bg-green-500 text-white py-2 rounded-lg font-semibold hover:bg-green-600 transition"
                      >
                        ✓ Approve
                      </button>
                      <button
                        onClick={() => handleReject(review._id, 'Content does not meet our standards')}
                        className="flex-1 bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-600 transition"
                      >
                        ✗ Reject
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg">
              <p className="text-gray-600">No {filter} reviews at the moment.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}

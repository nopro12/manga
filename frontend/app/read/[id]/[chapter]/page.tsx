'use client'

import { useEffect, useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function ReadPage({ params }: { params: { id: string; chapter: string } }) {
  const [images, setImages] = useState<string[]>([
    'https://via.placeholder.com/800x1000?text=Page+1',
    'https://via.placeholder.com/800x1000?text=Page+2',
    'https://via.placeholder.com/800x1000?text=Page+3',
    'https://via.placeholder.com/800x1000?text=Page+4',
  ])
  const [currentPage, setCurrentPage] = useState(1)

  const handlePrevChapter = () => {
    if (parseInt(params.chapter) > 1) {
      window.location.href = `/read/${params.id}/${parseInt(params.chapter) - 1}`
    }
  }

  const handleNextChapter = () => {
    window.location.href = `/read/${params.id}/${parseInt(params.chapter) + 1}`
  }

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1)
  }

  const handleNextPage = () => {
    if (currentPage < images.length) setCurrentPage(currentPage + 1)
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-black">
        <div className="max-w-4xl mx-auto">
          {/* Reader Controls */}
          <div className="bg-gray-900 text-white p-4 flex justify-between items-center">
            <button
              onClick={handlePrevChapter}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded transition"
            >
              ← Previous Chapter
            </button>
            <span className="font-semibold">
              Chapter {params.chapter} | Page {currentPage} / {images.length}
            </span>
            <button
              onClick={handleNextChapter}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded transition"
            >
              Next Chapter →
            </button>
          </div>

          {/* Comic Image */}
          <div className="flex justify-center py-8">
            <img
              src={images[currentPage - 1]}
              alt={`Page ${currentPage}`}
              className="max-w-full h-auto"
            />
          </div>

          {/* Navigation Buttons */}
          <div className="bg-gray-900 text-white p-4 flex justify-between items-center">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded transition disabled:opacity-50"
            >
              ← Previous Page
            </button>
            <div className="flex gap-2">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentPage(idx + 1)}
                  className={`w-2 h-2 rounded-full transition ${
                    currentPage === idx + 1 ? 'bg-primary' : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={handleNextPage}
              disabled={currentPage === images.length}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded transition disabled:opacity-50"
            >
              Next Page →
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

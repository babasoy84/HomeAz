'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface SimplePaginationProps {
  totalPages: number
  initialPage?: number
  onPageChange?: (page: number) => void
}

export default function SimplePagination({ totalPages, initialPage = 1, onPageChange }: SimplePaginationProps) {
  const [currentPage, setCurrentPage] = useState(initialPage)

  const handlePageChange = (newPage: number) => {
    const page = Math.max(1, Math.min(newPage, totalPages))
    setCurrentPage(page)
    onPageChange?.(page)
  }

  return (
    <div className="flex items-center justify-center space-x-4">
      <Button
        variant="outline"
        size="icon"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Go to previous page"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <span className="text-sm font-medium">
        Page {currentPage} of {totalPages}
      </span>
      <Button
        variant="outline"
        size="icon"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Go to next page"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}
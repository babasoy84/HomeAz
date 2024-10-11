'use client'

import { Home } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HeaderProps {
  onAddProperty: () => void; // App.tsx'den gelecek onClick fonksiyonu
}

export default function Header({ onAddProperty }: HeaderProps) {
  return (
    <header className="bg-white">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <a href="/" className="flex items-center space-x-2">
            <Home className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold text-primary">Home Az</span>
          </a>
        </div>
        <Button onClick={onAddProperty}>
          Add Property
        </Button>
      </div>
    </header>
  )
}

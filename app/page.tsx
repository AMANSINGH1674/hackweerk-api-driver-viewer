"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Loader2, RefreshCw, Search } from "lucide-react"
import Image from "next/image"

interface DogImage {
  url: string
  breed: string
}

interface BreedsResponse {
  message: Record<string, string[]>
  status: string
}

interface ImagesResponse {
  message: string[]
  status: string
}

export default function DogViewer() {
  const [dogImages, setDogImages] = useState<DogImage[]>([])
  const [allBreeds, setAllBreeds] = useState<string[]>([])
  const [selectedBreed, setSelectedBreed] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)

  // Fetch all available breeds
  const fetchBreeds = async () => {
    try {
      const response = await fetch("https://dog.ceo/api/breeds/list/all")
      const data: BreedsResponse = await response.json()

      const breeds: string[] = []
      Object.keys(data.message).forEach((breed) => {
        if (data.message[breed].length > 0) {
          // Handle sub-breeds
          data.message[breed].forEach((subBreed) => {
            breeds.push(`${breed}/${subBreed}`)
          })
        } else {
          breeds.push(breed)
        }
      })

      setAllBreeds(breeds.sort())
    } catch (error) {
      console.error("Error fetching breeds:", error)
    }
  }

  // Fetch random dog images
  const fetchRandomImages = async (count = 8) => {
    setLoading(true)
    try {
      const response = await fetch(`https://dog.ceo/api/breeds/image/random/${count}`)
      const data: ImagesResponse = await response.json()

      const images: DogImage[] = data.message.map((url) => {
        // Extract breed from URL
        const urlParts = url.split("/")
        const breedIndex = urlParts.findIndex((part) => part === "breeds") + 1
        const breed = urlParts[breedIndex] || "unknown"
        const subBreed = urlParts[breedIndex + 1]

        return {
          url,
          breed: subBreed && subBreed !== "images" ? `${breed}/${subBreed}` : breed,
        }
      })

      setDogImages(images)
    } catch (error) {
      console.error("Error fetching random images:", error)
    } finally {
      setLoading(false)
      setInitialLoading(false)
    }
  }

  // Fetch images by specific breed
  const fetchBreedImages = async (breed: string, count = 8) => {
    setLoading(true)
    try {
      const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`)
      const data: ImagesResponse = await response.json()

      // Get random selection from breed images
      const shuffled = data.message.sort(() => 0.5 - Math.random())
      const selected = shuffled.slice(0, count)

      const images: DogImage[] = selected.map((url) => ({
        url,
        breed,
      }))

      setDogImages(images)
    } catch (error) {
      console.error("Error fetching breed images:", error)
    } finally {
      setLoading(false)
    }
  }

  // Handle breed selection
  const handleBreedChange = (breed: string) => {
    setSelectedBreed(breed)
    if (breed === "all") {
      fetchRandomImages()
    } else {
      fetchBreedImages(breed)
    }
  }

  // Handle refresh
  const handleRefresh = () => {
    if (selectedBreed === "all") {
      fetchRandomImages()
    } else {
      fetchBreedImages(selectedBreed)
    }
  }

  // Filter images based on search term
  const filteredImages = dogImages.filter((image) => image.breed.toLowerCase().includes(searchTerm.toLowerCase()))

  // Initialize data
  useEffect(() => {
    fetchBreeds()
    fetchRandomImages()
  }, [])

  if (initialLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-lg text-gray-600">Loading adorable dogs...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">🐕 Dog API Viewer</h1>
          <p className="text-gray-600">Discover amazing dog breeds from around the world</p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search by breed name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Breed Filter */}
            <Select value={selectedBreed} onValueChange={handleBreedChange}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Select breed" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Breeds</SelectItem>
                {allBreeds.map((breed) => (
                  <SelectItem key={breed} value={breed}>
                    {breed.charAt(0).toUpperCase() + breed.slice(1).replace("/", " - ")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Refresh Button */}
            <Button onClick={handleRefresh} disabled={loading} className="w-full md:w-auto">
              {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <RefreshCw className="h-4 w-4 mr-2" />}
              Refresh
            </Button>
          </div>
        </div>

        {/* Results Info */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Showing {filteredImages.length} dogs</span>
            {searchTerm && <Badge variant="secondary">Filtered by: "{searchTerm}"</Badge>}
            {selectedBreed !== "all" && <Badge variant="outline">Breed: {selectedBreed.replace("/", " - ")}</Badge>}
          </div>
        </div>

        {/* Dog Images Grid */}
        {filteredImages.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredImages.map((dog, index) => (
              <Card key={`${dog.url}-${index}`} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="relative aspect-square">
                    <Image
                      src={dog.url || "/placeholder.svg"}
                      alt={`${dog.breed} dog`}
                      fill
                      className="object-cover"
                      crossOrigin="anonymous"
                    />
                  </div>
                  <div className="p-4">
                    <Badge variant="secondary" className="text-xs">
                      {dog.breed.charAt(0).toUpperCase() + dog.breed.slice(1).replace("/", " - ")}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No dogs found matching your search.</p>
            <Button onClick={() => setSearchTerm("")} variant="outline" className="mt-4">
              Clear Search
            </Button>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-500 text-sm">
            Powered by{" "}
            <a
              href="https://dog.ceo/dog-api/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Dog CEO API
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

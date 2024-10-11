"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface PropertyFilterProps {
    onFilterChange: (filters: {
      status: string;
      type: string;
      minPrice: string;
      maxPrice: string;
      bedrooms: string;
      bathrooms: string;
      minSquareMeters: string;
      maxSquareMeters: string;
    }) => void;
  }

  export default function PropertyFilter({ onFilterChange }: PropertyFilterProps) {
    const [status, setStatus] = useState("");
    const [type, setType] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [bedrooms, setBedrooms] = useState("");
    const [bathrooms, setBathrooms] = useState("");
    const [minSquareMeters, setMinSquareMeters] = useState("");
    const [maxSquareMeters, setMaxSquareMeters] = useState("");

  const MAX_SHORT = 100

  const handleFilter = () => {
    const filters = {
      status,
      type,
      minPrice,
      maxPrice,
      bedrooms,
      bathrooms,
      minSquareMeters,
      maxSquareMeters,
    };

    onFilterChange(filters);
  };

  const handleIntegerInput = (value: string, setter: (value: string) => void) => {
    const intValue = parseInt(value)
    if (!isNaN(intValue) && intValue >= 0 && intValue <= MAX_SHORT) {
      setter(intValue.toString())
    } else if (value === "") {
      setter("")
    }
  }

  const handleFloatInput = (value: string, setter: (value: string) => void) => {
    const floatRegex = /^\d*\.?\d*$/
    if (floatRegex.test(value)) {
      setter(value)
    }
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md max-w-7xl mx-auto">
      <div className="flex flex-wrap items-end gap-4">
        <div className="flex-1 min-w-[120px]">
          <Label htmlFor="status" className="mb-2 block">Status</Label>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger id="status">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="forSale">For Sale</SelectItem>
              <SelectItem value="forRent">For Rent</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex-1 min-w-[120px]">
          <Label htmlFor="type" className="mb-2 block">Property Type</Label>
          <Select value={type} onValueChange={setType}>
            <SelectTrigger id="type">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="House">House</SelectItem>
              <SelectItem value="Apartment">Apartment</SelectItem>
              <SelectItem value="Condo">Condo</SelectItem>
              <SelectItem value="Townhouse">Townhouse</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex-1 min-w-[120px]">
          <Label htmlFor="minPrice" className="mb-2 block">Min Price</Label>
          <Input
            type="text"
            id="minPrice"
            placeholder="Min Price"
            value={minPrice}
            onChange={(e) => handleFloatInput(e.target.value, setMinPrice)}
          />
        </div>
        <div className="flex-1 min-w-[120px]">
          <Label htmlFor="maxPrice" className="mb-2 block">Max Price</Label>
          <Input
            type="text"
            id="maxPrice"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) => handleFloatInput(e.target.value, setMaxPrice)}
          />
        </div>
        <div className="flex-1 min-w-[100px]">
          <Label htmlFor="bedrooms" className="mb-2 block">Bedrooms</Label>
          <Input
            type="text"
            id="bedrooms"
            placeholder="Beds"
            value={bedrooms}
            onChange={(e) => handleIntegerInput(e.target.value, setBedrooms)}
          />
        </div>
        <div className="flex-1 min-w-[100px]">
          <Label htmlFor="bathrooms" className="mb-2 block">Bathrooms</Label>
          <Input
            type="text"
            id="bathrooms"
            placeholder="Baths"
            value={bathrooms}
            onChange={(e) => handleIntegerInput(e.target.value, setBathrooms)}
          />
        </div>
        <div className="flex-1 min-w-[120px]">
          <Label htmlFor="minSquareMeters" className="mb-2 block">Min m²</Label>
          <Input
            type="text"
            id="minSquareMeters"
            placeholder="Min m²"
            value={minSquareMeters}
            onChange={(e) => handleFloatInput(e.target.value, setMinSquareMeters)}
          />
        </div>
        <div className="flex-1 min-w-[120px]">
          <Label htmlFor="maxSquareMeters" className="mb-2 block">Max m²</Label>
          <Input
            type="text"
            id="maxSquareMeters"
            placeholder="Max m²"
            value={maxSquareMeters}
            onChange={(e) => handleFloatInput(e.target.value, setMaxSquareMeters)}
          />
        </div>
        <Button onClick={handleFilter} className="ml-auto">Apply Filters</Button>
      </div>
    </div>
  )
}
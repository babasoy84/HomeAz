"use client";

import axios from "axios";
import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

enum PropertyTypes {
  House,
  Apartment,
  Condo,
  Townhouse,
}

enum PropertyStatus {
  ForSale = "For Sale",
  ForRent = "For Rent",
}

interface AddPropertyFormProps {
  setIsModalOpen: (b: boolean) => void;
}

export default function AddPropertyForm({
  setIsModalOpen,
}: AddPropertyFormProps) {
  const [status, setStatus] = useState<PropertyStatus>();
  const [type, setType] = useState<PropertyTypes | undefined>(undefined);
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [price, setPrice] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [squareMeters, setSquareMeters] = useState("");

  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setSelectedImages([...selectedImages, ...files]);

    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages([...previewImages, ...previews]);
  };

  const handleImageRemove = (index: number) => {
    const updatedImages = selectedImages.filter((_, i) => i !== index);
    const updatedPreviews = previewImages.filter((_, i) => i !== index);
    setSelectedImages(updatedImages);
    setPreviewImages(updatedPreviews);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log(type);

    const newErrors: Record<string, string> = {};
    if (!status) newErrors.status = "Property status is required";
    if (type == undefined) newErrors.type = "Property type is required";
    if (!description) newErrors.description = "Description is required";
    if (!address) newErrors.address = "Address is required";
    if (!price) newErrors.price = "Price is required";
    if (!bathrooms) newErrors.bathrooms = "Number of bathrooms is required";
    if (!bedrooms) newErrors.bedrooms = "Number of bedrooms is required";
    if (!squareMeters) newErrors.squareMeters = "Square meters are required";

    if (!selectedImages || selectedImages.length === 0)
      newErrors.images = "At least one image is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    const formData = new FormData();

    selectedImages.forEach((image) => {
      formData.append("Images", image);
    });

    setIsModalOpen(false)


    formData.append(
      "Status",
      status === PropertyStatus.ForSale ? "true" : "false"
    );
    formData.append("Type", type!.toString());
    formData.append("Description", description);
    formData.append("Address", address);
    formData.append("Price", price);
    formData.append("NumberOfBathrooms", bathrooms);
    formData.append("NumberOfBedrooms", bedrooms);
    formData.append("SquareMeters", squareMeters);

    try {
      await axios.post(
        "http://localhost:5000/api/Properties/Create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    } catch (error) {
      console.error("Error creating property:", error);
    }
  };

  const handleNumberInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setter(value);
    }
  };

  const handleFloatInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setter(value);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-lg relative">
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <h2 className="text-2xl font-semibold text-gray-800">
            Add New Property
          </h2>
          <button
            onClick={() => setIsModalOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            aria-label="Close modal"
          >
            <X className="h-5 w-5 text-gray-600" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-between space-x-4">
            <div className="w-1/2 space-y-2">
              <Label
                htmlFor="status"
                className="text-sm font-medium text-gray-700"
              >
                Property Status
              </Label>
              <Select
                onValueChange={(value) => setStatus(value as PropertyStatus)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(PropertyStatus).map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.status && (
                <p className="text-red-600 text-sm">{errors.status}</p>
              )}
            </div>

            <div className="w-1/2 space-y-2">
              <Label
                htmlFor="type"
                className="text-sm font-medium text-gray-700"
              >
                Property Type
              </Label>
              <Select
                onValueChange={(value) =>
                  setType(PropertyTypes[value as keyof typeof PropertyTypes])
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(PropertyTypes)
                    .filter((key) => isNaN(Number(key)))
                    .map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              {errors.type && (
                <p className="text-red-600 text-sm">{errors.type}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="description"
              className="text-sm font-medium text-gray-700"
            >
              Description
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter property description"
              className="rounded-md border-gray-300 focus:ring focus:ring-primary-300"
            />
            {errors.description && (
              <p className="text-red-600 text-sm">{errors.description}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="address"
              className="text-sm font-medium text-gray-700"
            >
              Address
            </Label>
            <Input
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter property address"
              className="rounded-md border-gray-300 focus:ring focus:ring-primary-300"
            />
            {errors.address && (
              <p className="text-red-600 text-sm">{errors.address}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="price"
                className="text-sm font-medium text-gray-700"
              >
                Price
              </Label>
              <Input
                id="price"
                type="text"
                value={price}
                onChange={(e) => handleFloatInput(e, setPrice)}
                placeholder="Enter price"
                className="rounded-md border-gray-300 focus:ring focus:ring-primary-300"
              />
              {errors.price && (
                <p className="text-red-600 text-sm">{errors.price}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="bathrooms"
                className="text-sm font-medium text-gray-700"
              >
                Bathrooms
              </Label>
              <Input
                id="bathrooms"
                type="text"
                value={bathrooms}
                onChange={(e) => handleNumberInput(e, setBathrooms)}
                placeholder="Enter bathrooms"
                className="rounded-md border-gray-300 focus:ring focus:ring-primary-300"
              />
              {errors.bathrooms && (
                <p className="text-red-600 text-sm">{errors.bathrooms}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="bedrooms"
                className="text-sm font-medium text-gray-700"
              >
                Bedrooms
              </Label>
              <Input
                id="bedrooms"
                type="text"
                value={bedrooms}
                onChange={(e) => handleNumberInput(e, setBedrooms)}
                placeholder="Enter bedrooms"
                className="rounded-md border-gray-300 focus:ring focus:ring-primary-300"
              />
              {errors.bedrooms && (
                <p className="text-red-600 text-sm">{errors.bedrooms}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="squareMeters"
                className="text-sm font-medium text-gray-700"
              >
                Square Meters
              </Label>
              <Input
                id="squareMeters"
                type="text"
                value={squareMeters}
                onChange={(e) => handleFloatInput(e, setSquareMeters)}
                placeholder="Enter square meters"
                className="rounded-md border-gray-300 focus:ring focus:ring-primary-300"
              />
              {errors.squareMeters && (
                <p className="text-red-600 text-sm">{errors.squareMeters}</p>
              )}
            </div>
          </div>

          <Label>Upload Images</Label>
          <Input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
          />

          <div className="image-preview flex gap-2">
            {previewImages.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={image}
                  alt={`Preview ${index}`}
                  className="w-20 h-20 object-cover"
                />
                <button
                  type="button"
                  onClick={() => handleImageRemove(index)}
                  className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>

          {errors.images && (
            <p className="text-red-600 text-sm">{errors.images}</p>
          )}

          <div className="space-y-4">
            <Button type="submit" className="w-full">
              Add Property
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

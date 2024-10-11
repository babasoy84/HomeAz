import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ChevronLeft,
  ChevronRight,
  Bed,
  Bath,
  Square,
  MapPin,
} from "lucide-react";

interface PropertyCardProps {
  id: number;
  images?: string[];
  status?: string;
  type?: string;
  description?: string;
  address?: string;
  price?: number;
  bedrooms?: number;
  bathrooms?: number;
  squareFootage?: number;
}

const fallbackImage = "/assets/images/fallback_image.png";

export default function PropertyCard({
  images = [],
  address = "123 Maple Street, Anytown, USA",
  price = 350000,
  bedrooms = 3,
  bathrooms = 2,
  squareFootage = 2000,
  status = "For Sale",
  description = "Beautiful modern home with open floor plan, updated kitchen, and large backyard perfect for entertaining.",
}: PropertyCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const displayImages = images.length > 0 ? images : [fallbackImage];

  const nextImage = () => {
    setIsTransitioning(true);
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % displayImages.length);
  };

  const prevImage = () => {
    setIsTransitioning(true);
    setCurrentImageIndex(
      (prevIndex) =>
        (prevIndex - 1 + displayImages.length) % displayImages.length
    );
  };

  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => setIsTransitioning(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  const formattedPrice = price.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

  return (
    <Card className="w-full max-w-sm mx-auto overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardContent className="p-0">
        <div className="relative h-64 overflow-hidden">
          {displayImages.map((image, index) => (
            <div key={index} className="absolute top-0 left-0 w-full h-full">
              {/* Fallback image her zaman yerinde, resim yüklenirken bu gösterilir */}
              <img
                src={fallbackImage}
                alt="Fallback"
                className="w-full h-full object-cover absolute top-0 left-0 z-0"
                style={{
                  display:
                    imageLoaded && index === currentImageIndex
                      ? "none"
                      : "block",
                }}
              />
              {/* Asıl resim, sadece yüklenince görünür */}
              <img
                src={image}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageLoaded(false)} // Hata durumunda fallback image gösterilecek
                alt={`Home view ${index + 1}`}
                className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity z-10 duration-300 ease-in-out ${
                  index === currentImageIndex && imageLoaded
                    ? "opacity-100"
                    : "opacity-0"
                }`}
              />
            </div>
          ))}
          {displayImages.length > 1 && (
            <>
              <Button
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-background/80 hover:bg-background z-10 p-2 rounded-full"
                onClick={prevImage}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-background/80 hover:bg-background z-10 p-2 rounded-full"
                onClick={nextImage}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <div className="absolute bottom-2 right-2 bg-background/80 text-foreground px-2 py-1 rounded-md text-sm z-10">
                {currentImageIndex + 1} / {displayImages.length}
              </div>
            </>
          )}
          <Badge className="absolute top-2 left-2 bg-primary z-10">
            {status}
          </Badge>
        </div>
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-2 line-clamp-1">
            {formattedPrice}
          </h2>
          <div className="flex items-center mb-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="line-clamp-1">{address}</span>
          </div>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <Bed className="h-4 w-4 mr-1" />
              <span className="mr-2">{bedrooms} bd</span>
              <Bath className="h-4 w-4 mr-1" />
              <span className="mr-2">{bathrooms} ba</span>
              <Square className="h-4 w-4 mr-1" />
              <span>{squareFootage} sqft</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {description}
          </p>
          <div className="flex justify-between items-center">
            <Button className="bg-primary hover:bg-primary/90 w-full">
              View Details
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

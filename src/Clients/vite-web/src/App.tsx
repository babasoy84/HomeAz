import { useState, useEffect } from "react";
import PropertyFilter from "./components/PropertyFilter";
import PropertyCard from "./components/PropertyCard";
import Pagination from "./components/Pagination";
import Header from "./components/Header";
import Loader from "./components/Loader";
import AddPropertyForm from "./components/AddPropertyForm";
import { Home } from "lucide-react";
import axios from "axios";
import "./App.css";

interface Property {
  id: number;
  status: string;
  type: string;
  price: number;
  description: string;
  address: string;
  numberOfBathrooms: number;
  numberOfBedrooms: number;
  squareMeters: number;
  imageUrls: string[];
}

function App() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    status: "",
    type: "",
    minPrice: "",
    maxPrice: "",
    bedrooms: "",
    bathrooms: "",
    minSquareMeters: "",
    maxSquareMeters: "",
  });

  const pageSize = 6;

  const handleAddProperty = () => {
    setIsModalOpen(true);
  };

  const fetchTotalCount = async () => {
    try {
      const cleanedFilters = Object.fromEntries(
        Object.entries(filters).filter(([_, value]) => value !== "")
      );

      const params = {
        ...cleanedFilters,
        status:
          cleanedFilters.status === "forSale"
            ? true
            : cleanedFilters.status === "forRent"
            ? false
            : null,
        minPrice: cleanedFilters.minPrice
          ? parseFloat(cleanedFilters.minPrice)
          : null,
        maxPrice: cleanedFilters.maxPrice
          ? parseFloat(cleanedFilters.maxPrice)
          : null,
        numberOfBedrooms: cleanedFilters.bedrooms
          ? parseInt(cleanedFilters.bedrooms)
          : null,
        numberOfBathrooms: cleanedFilters.bathrooms
          ? parseInt(cleanedFilters.bathrooms)
          : null,
      };

      const response = await axios.get(
        "http://localhost:5000/api/Properties/Count",
        { params }
      );
      const totalCount = response.data.count;
      console.log(totalCount);

      setTotalPages(Math.ceil(totalCount / pageSize));
    } catch (error) {
      console.error("Error fetching total count:", error);
    }
  };

  const fetchProperties = async () => {
    try {
      setLoading(true);

      const cleanedFilters = Object.fromEntries(
        Object.entries(filters).filter(([_, value]) => value !== "")
      );

      const params = {
        ...cleanedFilters,
        currentPage: page,
        pageSize: pageSize,
        status:
          cleanedFilters.status === "forSale"
            ? true
            : cleanedFilters.status === "forRent"
            ? false
            : null,
        minPrice: cleanedFilters.minPrice
          ? parseFloat(cleanedFilters.minPrice)
          : null,
        maxPrice: cleanedFilters.maxPrice
          ? parseFloat(cleanedFilters.maxPrice)
          : null,
        numberOfBedrooms: cleanedFilters.bedrooms
          ? parseInt(cleanedFilters.bedrooms)
          : null,
        numberOfBathrooms: cleanedFilters.bathrooms
          ? parseInt(cleanedFilters.bathrooms)
          : null,
      };

      console.log(cleanedFilters);
      const response = await axios.get(
        "http://localhost:5000/api/Properties/GetAll",
        { params }
      );
      setProperties(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching properties:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTotalCount();
    fetchProperties();
  }, [filters, page]);

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
    setPage(1);
  };

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  if (loading) {
    return <Loader/>;
  }

  return (
    <>
      <Header onAddProperty={handleAddProperty} />

      {properties.length == 0}

      <PropertyFilter onFilterChange={handleFilterChange} />
      {properties.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-4 space-y-4 m-8 bg-background rounded-lg shadow">
          <Home className="w-16 h-16 text-muted-foreground" />
          <h2 className="text-xl font-semibold text-center">
            No Property Found
          </h2>
        </div>
      ) : (
        <div>
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property: Property) => (
                <PropertyCard
                  key={property.id}
                  id={property.id}
                  status={property.status}
                  type={property.type}
                  price={property.price}
                  description={property.description}
                  address={property.address}
                  bathrooms={property.numberOfBathrooms}
                  bedrooms={property.numberOfBedrooms}
                  squareFootage={property.squareMeters}
                  images={property.imageUrls}
                />
              ))}
            </div>
          </div>
          <Pagination
            totalPages={totalPages}
            initialPage={page}
            onPageChange={handlePageChange}
          />
        </div>
      )}

      {isModalOpen && <AddPropertyForm setIsModalOpen={setIsModalOpen} />}
    </>
  );
}

export default App;

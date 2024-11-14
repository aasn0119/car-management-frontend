import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";
import { PlusCircle, Search } from "lucide-react";

const handleSearch = (cars, searchTerm) => {
  return cars.filter((car) => {
    return (
      car.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  });
};

const CarListPage = () => {
  const [cars, setCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCars, setFilteredCars] = useState([]);
  const navigate = useNavigate();

  let url = import.meta.env.VITE_API_URL;
  let parts = url.split(".com/");
  let result = parts[0] + ".com/";

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axiosInstance.get("/cars/getCars");
        setCars(response.data);
        setFilteredCars(response.data);
      } catch (error) {
        console.error("Failed to fetch cars", error);
      }
    };
    fetchCars();
  }, []);

  const onSearch = () => {
    setFilteredCars(handleSearch(cars, searchTerm));
  };

  const handleView = (id) => {
    navigate(`/cars/${id}`);
  };

  const handleEdit = (id) => {
    navigate(`/cars/edit/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/cars/removeCarDetails/${id}`);
      setCars(cars.filter((car) => car._id !== id));
      setFilteredCars(filteredCars.filter((car) => car._id !== id));
    } catch (error) {
      console.error("Failed to delete car", error);
    }
  };

  const handleCreateNew = () => {
    navigate("/cars/create");
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6 flex-col sm:flex-row">
        <h1 className="text-3xl mb-4 sm:mb-0">My Cars</h1>
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search cars..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  onSearch();
                }
              }}
              className="bg-white text-gray-800 rounded-md px-4 py-2 pr-10 w-full"
            />
            <button
              className="absolute inset-y-0 right-0 px-4 flex items-center"
              onClick={onSearch}
            >
              <Search className="text-gray-600" />
            </button>
          </div>
          <button
            onClick={handleCreateNew}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            <PlusCircle />
          </button>
        </div>
      </div>

      {filteredCars.length === 0 ? (
        <p>No cars found. Start by creating one!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredCars.map((car) => (
            <div key={car._id} className="p-4 shadow-md bg-white rounded-lg">
              <h2 className="text-xl font-semibold mb-2">{car.title}</h2>
              <p className="text-gray-600 mb-4">{car.description}</p>
              {car.images.length > 0 && (
                <img
                  src={`${result}${car.images[0]}`}
                  alt="Car"
                  className="w-full h-48 object-cover rounded mb-4"
                />
              )}
              <div className="flex gap-4 flex-wrap">
                <button
                  onClick={() => handleView(car._id)}
                  className="bg-green-500 text-white px-4 py-2 rounded mb-2 sm:mb-0"
                >
                  View
                </button>
                <button
                  onClick={() => handleEdit(car._id)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded mb-2 sm:mb-0"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(car._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded mb-2 sm:mb-0"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CarListPage;

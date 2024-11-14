import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosConfig";
import { useSelector } from "react-redux";
import { showSuccessToast } from "../utils/Toasts";

const CarDetailPage = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await axiosInstance.get(`/cars/getCarDetails/${id}`);
        setCar(response.data);
      } catch (error) {
        console.error("Failed to load car details", error);
      }
    };
    fetchCar();
  }, [id]);

  const handleDelete = async () => {
    try {
      const response = await axiosInstance.delete(
        `/cars/removeCarDetails/${id}`
      );
      if (response.status === 200) {
        showSuccessToast("Car deleted successfully");
      }
      navigate("/cars");
    } catch (error) {
      console.error("Failed to delete car", error);
    }
  };

  if (!car) return <div className="loading">Loading...</div>;

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
      {/* Car Title & Images Section */}
      <div className="mb-8">
        <h1 className="text-4xl font-semibold mb-4">{car.title}</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {car.images.map((img, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-lg shadow-lg"
            >
              <img
                src={`http://localhost:3005${img}`}
                alt={`Car ${index + 1}`}
                className="w-full h-72 object-cover transition-transform duration-300 transform hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Car Details */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
          Car Details
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-lg">
          <div className="space-y-2">
            <p>
              <strong className="text-gray-700">Make:</strong> {car.make}
            </p>
            <p>
              <strong className="text-gray-700">Model:</strong> {car.model}
            </p>
            <p>
              <strong className="text-gray-700">Year:</strong> {car.year}
            </p>
            <p>
              <strong className="text-gray-700">Condition:</strong>{" "}
              {car.condition}
            </p>
            <p>
              <strong className="text-gray-700">Price:</strong> ${car.price}
            </p>
            <p>
              <strong className="text-gray-700">Fuel Type:</strong>{" "}
              {car.fuelType}
            </p>
            <p>
              <strong className="text-gray-700">Transmission:</strong>{" "}
              {car.transmission}
            </p>
          </div>
          <div className="space-y-2">
            <p>
              <strong className="text-gray-700">Car Type:</strong> {car.carType}
            </p>
            <p>
              <strong className="text-gray-700">Color:</strong>{" "}
              {car.color.exterior} exterior / {car.color.interior} interior
            </p>
            <p>
              <strong className="text-gray-700">Location:</strong>{" "}
              {car.location.city}, {car.location.state}
            </p>
            <p>
              <strong className="text-gray-700">Availability:</strong>{" "}
              {car.availability}
            </p>
            <p>
              <strong className="text-gray-700">Owner Name:</strong>{" "}
              {user?.username || "Unknown"}
            </p>
            <p>
              <strong className="text-gray-700">Tags:</strong> {car.tags}
            </p>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
          Pricing Information
        </h2>
        <div className="space-y-2">
          <p>
            <strong className="text-gray-700">List Price:</strong> $
            {car.pricing.listPrice}
          </p>
          <p>
            <strong className="text-gray-700">Selling Price:</strong> $
            {car.pricing.sellingPrice}
          </p>
          <p>
            <strong className="text-gray-700">On-Road Price:</strong> $
            {car.pricing.onRoadPrice}
          </p>
          <p>
            <strong className="text-gray-700">Tax Amount:</strong> $
            {car.pricing.taxAmount}
          </p>
          <p>
            <strong className="text-gray-700">Discount:</strong> $
            {car.pricing.discount}
          </p>
        </div>
      </div>

      {/* Warranty Information */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
          Warranty Information
        </h2>
        <p>
          <strong className="text-gray-700">Warranty Available:</strong>{" "}
          {car.warranty.isWarranty ? "Yes" : "No"}
        </p>
        {car.warranty.isWarranty && (
          <>
            <p>
              <strong className="text-gray-700">Warranty Expiry Date:</strong>{" "}
              {car.warranty.expiryDate}
            </p>
            <p>
              <strong className="text-gray-700">Warranty Description:</strong>{" "}
              {car.warranty.description}
            </p>
          </>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-4">
        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition duration-300"
        >
          Delete Car
        </button>
        <button
          onClick={() => navigate(`/cars/edit/${id}`)}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Edit Car
        </button>
      </div>
    </div>
  );
};

export default CarDetailPage;

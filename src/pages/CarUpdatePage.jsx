import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Upload, X } from "lucide-react";
import axiosInstance from "../api/axiosConfig";

const CarUpdatePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  let url = import.meta.env.VITE_API_URL;
  let parts = url.split(".com/");
  let result = parts[0] + ".com";

  // All state variables for the form fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState(new Date().getFullYear());
  const [carType, setCarType] = useState("");
  const [condition, setCondition] = useState("");
  const [price, setPrice] = useState("");
  const [color, setColor] = useState({ exterior: "", interior: "" });
  const [transmission, setTransmission] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [tags, setTags] = useState("");
  const [availability, setAvailability] = useState("Available");
  const [location, setLocation] = useState({
    address: "",
    city: "",
    state: "",
    country: "",
    coordinates: [],
  });
  const [warranty, setWarranty] = useState({
    isWarranty: false,
    expiryDate: "",
    description: "",
  });
  const [registration, setRegistration] = useState({
    number: "",
    registrationDate: "",
    expiryDate: "",
  });
  const [pricing, setPricing] = useState({
    listPrice: "",
    sellingPrice: "",
    onRoadPrice: "",
    taxAmount: "",
    discount: "",
  });
  const [financing, setFinancing] = useState({
    isFinancingAvailable: false,
    emiOptions: [],
  });
  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [fileNames, setFileNames] = useState([]);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await axiosInstance.get(`/cars/getCarDetails/${id}`);
        const car = response.data;
        console.log("Car details", car);

        setTitle(car.title);
        setDescription(car.description);
        setMake(car.make);
        setModel(car.model);
        setYear(car.year || new Date().getFullYear());
        setCarType(car.carType);
        setCondition(car.condition);
        setPrice(car.price);
        setColor(car.color || { exterior: "", interior: "" });
        setTransmission(car.transmission);
        setFuelType(car.fuelType);
        setTags(car.tags.join(", "));
        setAvailability(car.availability);
        setLocation(
          car.location || {
            address: "",
            city: "",
            state: "",
            country: "",
            coordinates: [],
          }
        );
        setWarranty(
          car.warranty || { isWarranty: false, expiryDate: "", description: "" }
        );
        setRegistration(
          car.registration || {
            number: "",
            registrationDate: "",
            expiryDate: "",
          }
        );
        setPricing(
          car.pricing || {
            listPrice: "",
            sellingPrice: "",
            onRoadPrice: "",
            taxAmount: "",
            discount: "",
          }
        );
        setFinancing(
          car.financing || { isFinancingAvailable: false, emiOptions: [] }
        );
        setExistingImages(car.images || []);
      } catch (error) {
        console.error("Failed to load car details for update", error);
      }
    };
    fetchCar();
  }, [id]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    setFileNames(files.map((file) => file.name));
  };

  const handleRemoveExistingImage = async (imageUrl) => {
    try {
      await axiosInstance.delete(`/cars/${id}/images`, {
        data: { imageUrl },
      });
      setExistingImages(existingImages.filter((img) => img !== imageUrl));
    } catch (error) {
      console.error("Failed to remove image", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("make", make);
    formData.append("model", model);
    formData.append("year", year);
    formData.append("carType", carType);
    formData.append("condition", condition);
    formData.append("price", price);
    formData.append("color[exterior]", color.exterior);
    formData.append("color[interior]", color.interior);
    formData.append("transmission", transmission);
    formData.append("fuelType", fuelType);
    tags.split(",").forEach((tag) => formData.append("tags", tag.trim()));
    formData.append("availability", availability);
    formData.append("location[address]", location.address);
    formData.append("location[city]", location.city);
    formData.append("location[state]", location.state);
    formData.append("location[country]", location.country);
    formData.append(
      "location[coordinates]",
      JSON.stringify(location.coordinates)
    );
    formData.append("warranty[isWarranty]", warranty.isWarranty);
    formData.append("warranty[expiryDate]", warranty.expiryDate);
    formData.append("warranty[description]", warranty.description);
    formData.append("registration[number]", registration.number);
    formData.append(
      "registration[registrationDate]",
      registration.registrationDate
    );
    formData.append("registration[expiryDate]", registration.expiryDate);
    formData.append("pricing[listPrice]", pricing.listPrice);
    formData.append("pricing[sellingPrice]", pricing.sellingPrice);
    formData.append("pricing[onRoadPrice]", pricing.onRoadPrice);
    formData.append("pricing[taxAmount]", pricing.taxAmount);
    formData.append("pricing[discount]", pricing.discount);
    formData.append(
      "financing[isFinancingAvailable]",
      financing.isFinancingAvailable
    );
    financing.emiOptions.forEach((option) =>
      formData.append("financing[emiOptions]", option)
    );
    images.forEach((image) => formData.append("images", image));

    try {
      await axiosInstance.put(`/cars/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate(`/cars/${id}`);
    } catch (error) {
      console.error("Failed to update car", error.response?.data?.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6">Update Car</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Form Fields */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter car title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-32"
                placeholder="Enter car description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Make
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter make"
                value={make}
                onChange={(e) => setMake(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Model
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter model"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Year
              </label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Interior Color
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={color.interior}
                onChange={(e) =>
                  setColor({ ...color, interior: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Transmission
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={transmission}
                onChange={(e) => setTransmission(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fuel Type
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={fuelType}
                onChange={(e) => setFuelType(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tags
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter tags (comma-separated)"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Availability
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={availability}
                onChange={(e) => setAvailability(e.target.value)}
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={location.address}
                onChange={(e) =>
                  setLocation({ ...location, address: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={location.city}
                onChange={(e) =>
                  setLocation({ ...location, city: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                State
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={location.state}
                onChange={(e) =>
                  setLocation({ ...location, state: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Country
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={location.country}
                onChange={(e) =>
                  setLocation({ ...location, country: e.target.value })
                }
              />
            </div>

            {/* Warranty */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Warranty Status
              </label>
              <input
                type="checkbox"
                checked={warranty.isWarranty}
                onChange={(e) =>
                  setWarranty({ ...warranty, isWarranty: e.target.checked })
                }
              />
              <label className="ml-2 text-sm text-gray-700">
                Is Warranty Available?
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Warranty Expiry Date
              </label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={warranty.expiryDate}
                onChange={(e) =>
                  setWarranty({ ...warranty, expiryDate: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Warranty Description
              </label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={warranty.description}
                onChange={(e) =>
                  setWarranty({ ...warranty, description: e.target.value })
                }
              />
            </div>

            {/* Registration */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Registration Number
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={registration.number}
                onChange={(e) =>
                  setRegistration({ ...registration, number: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Registration Date
              </label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={registration.registrationDate}
                onChange={(e) =>
                  setRegistration({
                    ...registration,
                    registrationDate: e.target.value,
                  })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Registration Expiry Date
              </label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={registration.expiryDate}
                onChange={(e) =>
                  setRegistration({
                    ...registration,
                    expiryDate: e.target.value,
                  })
                }
              />
            </div>

            {/* Pricing */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                List Price
              </label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={pricing.listPrice}
                onChange={(e) =>
                  setPricing({ ...pricing, listPrice: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Selling Price
              </label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={pricing.sellingPrice}
                onChange={(e) =>
                  setPricing({ ...pricing, sellingPrice: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                On Road Price
              </label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={pricing.onRoadPrice}
                onChange={(e) =>
                  setPricing({ ...pricing, onRoadPrice: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tax Amount
              </label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={pricing.taxAmount}
                onChange={(e) =>
                  setPricing({ ...pricing, taxAmount: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Discount
              </label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={pricing.discount}
                onChange={(e) =>
                  setPricing({ ...pricing, discount: e.target.value })
                }
              />
            </div>

            {/* Financing */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Financing Available?
              </label>
              <input
                type="checkbox"
                checked={financing.isFinancingAvailable}
                onChange={(e) =>
                  setFinancing({
                    ...financing,
                    isFinancingAvailable: e.target.checked,
                  })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                EMI Options
              </label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter EMI options separated by commas"
                value={financing.emiOptions.join(", ")}
                onChange={(e) =>
                  setFinancing({
                    ...financing,
                    emiOptions: e.target.value.split(","),
                  })
                }
              />
            </div>

            {/* Images */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Car Images
              </label>
              <input
                type="file"
                multiple
                onChange={handleImageChange}
                className="border border-gray-300 rounded-md"
              />
            </div>

            {/* Displaying existing images */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Existing Images
              </label>
              <div className="grid grid-cols-3 gap-2">
                {existingImages.map((image, idx) => (
                  <div key={idx} className="relative">
                    <img
                      src={`${result}${image}`}
                      alt="Car"
                      className="w-full h-auto rounded-md"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveExistingImage(image)}
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-6">
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
              >
                Update Car
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CarUpdatePage;

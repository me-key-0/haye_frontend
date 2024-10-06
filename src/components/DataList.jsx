import React, { useState } from 'react';

const DataList = ({ data, type, onAdd, onRemove }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({ name: '', image: null, priceRange: '', category: '', photo: null });

  // Function to toggle popup visibility
  const togglePopup = () => {
    setShowPopup(!showPopup);
    setFormData({ name: '', image: null, priceRange: '', category: '', photo: null }); // Reset form when toggling
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file input (for image or photo)
  const handleFileChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a new item object based on type
    const newItem = {
      id: Math.random().toString(36).substr(2, 9), // Generate a random ID
      name: formData.name,
    };

    // Add additional fields based on the type
    if (type === 'place') {
      newItem.image = formData.image; // Assuming you'll handle this later
      newItem.priceRange = formData.priceRange;
      newItem.category = formData.category;
    } else if (type === 'event') {
      newItem.photo = formData.photo; // Assuming you'll handle this later
    }

    // Call the onAdd function to update the parent state
    onAdd(newItem);

    // Close the popup
    togglePopup();
  };

  return (
    <div>
      <h3 className="text-xl font-bold mb-4">{type === 'user' ? 'Users' : type === 'place' ? 'Places' : 'Events'}</h3>
      <ul>
        {data.map((item) => (
          <li key={item.id} className="flex justify-between items-center p-4 bg-white mb-2 rounded-lg shadow-md">
            <div>
              <p className="text-lg font-semibold">{item.name}</p>
              <p className="text-sm text-gray-600">
                {type === 'user' ? item.email : type === 'place' ? item.category : item.date}
              </p>
            </div>
            <button
              className=" text-red-500 hover:text-red-700"
              onClick={() => onRemove(item.id)} // Call onRemove with the item's ID
            >
              <i className="fas fa-times"></i> {/* Font Awesome icon */}
            </button>
          </li>
        ))}
      </ul>
      {/* Add Button */}
      {type == 'event' || type ==='place' ? (<button
        className="mt-4 p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        onClick={togglePopup}
      >
        {type === 'event' ? '+ Add Events': '+ Add Places' }
      </button>):(<></>)}

      {/* Popup Form */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg relative">
            <button
               className=" absolute top-2 right-2 text-red-500 hover:text-red-700 p-5"
              onClick={togglePopup}
            >
               <i className="fas fa-times"></i> 
            </button>
           
            <h2 className="text-2xl font-bold mb-4">Add {type}</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder={`Enter ${type} name`}
                  required
                />
              </div>

              {type === 'place' && (
                <>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Image:</label>
                    <input
                      type="file"
                      name="image"
                      onChange={handleFileChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Price Range:</label>
                    <select
                      name="priceRange"
                      value={formData.priceRange}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    >
                      <option value="">Select</option>
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Category:</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    >
                      <option value="">Select</option>
                      <option value="restaurant">Restaurant</option>
                      <option value="cafe">Cafe</option>
                      <option value="lounge">Lounge</option>
                    </select>
                  </div>
                </>
              )}

              {type === 'event' && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Photo:</label>
                  <input
                    type="file"
                    name="photo"
                    onChange={handleFileChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
              )}

              <button
                type="submit"
                className="mt-4 p-3 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                Add {type}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataList;

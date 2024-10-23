import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddAndPostProperty.css';
import { serverUrl } from '../../utlis/constant';
import Cookies from 'js-cookie'; // Import js-cookie for cookie management

const AddAndPostProperty = () => {
    const [propertyDetails, setPropertyDetails] = useState({
        title: '',
        description: '',
        price: '',
        bedrooms: '',
        bathrooms: '',
        location: '',
        phone: '',
        images: [],
        type: 'Rent',
        status: 'Available',
    });
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleListProperty = async () => {
        if (!propertyDetails.title || !propertyDetails.price || !propertyDetails.location || !propertyDetails.phone) {
            alert('Title, Price, Location, and Phone are required fields.');
            return;
        }

        setLoading(true);
        setSuccessMessage('');
        setError(null);

        try {
            const token = Cookies.get('token');
            const formData = new FormData();
            for (const image of propertyDetails.images) {
                formData.append('images', image.file);
            }
            formData.append('title', propertyDetails.title);
            formData.append('description', propertyDetails.description);
            formData.append('price', propertyDetails.price);
            formData.append('bedrooms', propertyDetails.bedrooms);
            formData.append('bathrooms', propertyDetails.bathrooms);
            formData.append('location', propertyDetails.location);
            formData.append('phone', propertyDetails.phone);
            formData.append('rent', propertyDetails.type === 'Rent');
            formData.append('buy', propertyDetails.type === 'Buy');
            formData.append('status', propertyDetails.status);

            const response = await fetch(`${serverUrl}property/propertytype`, {
                method: 'POST',
                body: formData,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to list property. Please try again.');
            }

            const data = await response.json();
            setSuccessMessage('Property listed successfully!');

            Cookies.set('propertyId', data.propertyId, { expires: 1 });
            Cookies.set('sellerId', data.sellerId, { expires: 1 });

            // Reset the form
            setPropertyDetails({
                title: '',
                description: '',
                price: '',
                bedrooms: '',
                bathrooms: '',
                location: '',
                phone: '',
                images: [],
                type: 'Rent',
                status: 'Available',
            });

            navigate('/');
        } catch (error) {
            console.error('Error listing property:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleImageUpload = (event) => {
        const files = event.target.files;
        const newImages = Array.from(files).map((file) => ({
            file,
            id: Math.random().toString(36).substr(2, 9),
        }));

        setPropertyDetails((prev) => ({
            ...prev,
            images: [...prev.images, ...newImages],
        }));
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setPropertyDetails((prev) => ({ ...prev, [name]: value }));
    };

    const handleRemoveImage = (id) => {
        setPropertyDetails((prev) => ({
            ...prev,
            images: prev.images.filter((image) => image.id !== id),
        }));
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div className="seller-workflow-container">
            <div className="back-btn" onClick={handleGoBack}>
                <i className="fas fa-arrow-left"></i>
            </div>
            <h1 className="page-title">List Property</h1>
            {successMessage && (
                <div className="success-message">
                    {successMessage}
                    <div>
                        Contact Number: 
                        <a href={`tel:${propertyDetails.phone}`} className="phone-link">
                            {propertyDetails.phone}
                        </a>
                    </div>
                </div>
            )}
            {error && <div className="error-message">{error}</div>}
            <div className="page">
                <div className="form-field">
                    <i className="fas fa-home"></i>
                    <input
                        type="text"
                        name="title"
                        placeholder="Property Title"
                        value={propertyDetails.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-field">
                    <i className="fas fa-pencil-alt"></i>
                    <textarea
                        name="description"
                        placeholder="Property Description"
                        value={propertyDetails.description}
                        onChange={handleChange}
                    ></textarea>
                </div>
                <div className="form-field">
                    <i className="fas fa-tag"></i>
                    <input
                        type="number"
                        name="price"
                        placeholder="Property Price"
                        value={propertyDetails.price}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-field">
                    <i className="fas fa-bed"></i>
                    <input
                        type="number"
                        name="bedrooms"
                        placeholder="Bedrooms"
                        value={propertyDetails.bedrooms}
                        onChange={handleChange}
                    />
                    <i className="fas fa-bath"></i>
                    <input
                        type="number"
                        name="bathrooms"
                        placeholder="Bathrooms"
                        value={propertyDetails.bathrooms}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-field">
                    <i className="fas fa-map-marker-alt"></i>
                    <input
                        type="text"
                        name="location"
                        placeholder="Property Location"
                        value={propertyDetails.location}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-field">
                    <i className="fas fa-phone"></i>
                    <input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number"
                        value={propertyDetails.phone}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div class="scrollable-container">
  <div class="form-field radio-buttons">
    <label>
      <input type="radio" name="type" value="Rent" />
      Rent
    </label>
    <label>
      <input type="radio" name="type" value="Buy" />
      Buy
    </label>
  </div>

  <div class="form-field radio-buttons">
    <label>
      <input type="radio" name="status" value="Available" />
      Available
    </label>
    <label>
      <input type="radio" name="status" value="Not Available" />
      Not Available
    </label>
  </div>
</div>

                <div className="form-field">
                    <input
                        type="file"
                        multiple
                        onChange={handleImageUpload}
                    />
                </div>
                {propertyDetails.images.length > 0 && (
                    <div className="image-preview">
                        <h3>Image Previews:</h3>
                        {propertyDetails.images.map((image) => (
                            <div key={image.id} className="image-item">
                                <img src={URL.createObjectURL(image.file)} alt={`Preview of ${image.file.name}`} />
                                <button onClick={() => handleRemoveImage(image.id)}>Remove</button>
                            </div>
                        ))}
                    </div>
                )}
                <button className="primary-btn" onClick={handleListProperty} disabled={loading}>
                    {loading ? 'Listing...' : 'Add and Post Property'}
                </button>
            </div>
        </div>
    );
};

export default AddAndPostProperty;
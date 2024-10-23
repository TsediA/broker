import React from 'react';
import { Link } from 'react-router-dom';
import './PropertiesPage.css';

const PropertiesPage = () => {
  const propertyTypes = [
    { label: 'Multi-Family Home', link: '/properties/multi-family' },
    { label: 'Single-Family Home', link: '/properties/single-family' },
    { label: 'Apartment', link: '/properties/apartment' },
    { label: 'Condominium', link: '/properties/condominium' },
    { label: 'Townhouse', link: '/properties/townhouse' },
    { label: 'Farm', link: '/properties/farm' },
  ];

  return (
    <div className="properties-page">
      <h1>Properties</h1>
      <ul className="property-types">
        {propertyTypes.map((type, index) => (
          <li key={index} className="property-type">
            <Link to={type.link} className="property-type-link">
              {type.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PropertiesPage;
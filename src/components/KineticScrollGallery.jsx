import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getPortfolios } from "../lib/portfolioApi";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://nergizkhalid.com/api-nergiz';

// Card component
const Card = ({ title, description, category, i, src, id, onCardClick }) => {
  const getImageSrc = (img) => {
    if (!img) return '/images/about.png'; // fallback image from public folder
    if (img.startsWith('http')) return img;
    if (img.startsWith('/')) return img; // already absolute path
    // For API images, construct full URL
    return `${API_BASE_URL}/${img}`;
  };

  return (
    <div className="h-screen flex items-center justify-center sticky top-0 md:p-0 px-4">
      <div
        className="relative flex flex-col h-[500px] w-[700px] py-12 px-10 md:px-12  
        rotate-0 md:h-[500px] md:w-[1000px] lg:h-[700px] lg:w-[1190px] items-center justify-center mx-auto 
        shadow-md pr-3 pl-3 pt-3 pb-4 bg-black/20 backdrop-blur-sm cursor-pointer hover:bg-black/30 transition-all duration-300"
        onClick={() => onCardClick(id)}
      >
        <span className="font-bold relative text-5xl md:text-7xl mt-5">
          <span
            className="relative z-10 font-light tracking-tight text-white"
          >
            {title}
          </span>
        </span>
        <div
          className="text-lg md:text-2xl font-light text-center mb-0 z-50 mt-2 lowercase tracking-wide text-gray-400"
          style={{ lineHeight: 1.4 }}
        >
          {category}
        </div>
        <div
          className="text-sm md:text-lg font-light text-center mb-0 z-50 mt-4 text-gray-300 max-w-md"
          style={{ lineHeight: 1.4 }}
        >
          {description}
        </div>
        <div className="absolute inset-0 z-0 bg-gray-800">
          <img
            className="w-full h-full rounded object-cover opacity-80 brightness-50"
            src={getImageSrc(src)}
            alt={`${title} - ${category} project image`}
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        </div>
      </div>
    </div>
  );
};

// CardsParallax component
const CardsParallax = ({ items, onCardClick }) => {
  const limitedItems = Array.isArray(items) ? items.slice(0, 9) : [];
  return (
    <div className="min-h-screen">
      {limitedItems.map((project, i) => (
        <Card key={`p_${i}`} {...project} i={i} onCardClick={onCardClick} />
      ))}
    </div>
  );
};

// Main component export
const KineticScrollGallery = () => {
  const navigate = useNavigate();
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Handle card click navigation
  const handleCardClick = (projectId) => {
    // Scroll to top before navigation
    window.scrollTo({ top: 0, behavior: 'smooth' });
    navigate(`/portfolio/${projectId}`);
  };

  // Fallback data when API fails
  const fallbackData = [
    {
      id: 1,
      title: "Modern Interior Design",
      description: "Contemporary living space with clean lines and elegant finishes",
      category: "Interior Design",
      src: "/images/g9.JPG",
    },
    {
      id: 2,
      title: "Classic Bedroom",
      description: "Luxurious bedroom design with premium materials",
      category: "Bedroom Design",
      src: "/images/g12.JPG",
    },
    {
      id: 3,
      title: "Kitchen Design",
      description: "Modern kitchen with functional and aesthetic elements",
      category: "Kitchen Design",
      src: "/images/g3.JPG",
    },
    {
      id: 4,
      title: "Living Room",
      description: "Comfortable and stylish living space",
      category: "Living Room",
      src: "/images/g4.JPG",
    },
  ];

  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getPortfolios();
        console.log('Fetched portfolio data:', data);
        
        
        // Transform portfolio data to match card format
        const transformedItems = data.map((item) => {
          // Find primary image or use first image
          const primaryImage = Array.isArray(item.images) 
            ? (item.images.find(img => img.is_primary) || item.images[0])
            : null;
          
          return {
            id: item.id,
            title: item.name || 'Untitled Project',
            description: item.description || '',
            category: item.category_name || 'Portfolio',
            src: primaryImage ? primaryImage.image : null,
          };
        });
        
        setPortfolioItems(transformedItems);
      } catch (err) {
        console.error('Error fetching portfolio data:', err);
        setError(err.message);
        // Use fallback data when API fails
        setPortfolioItems(fallbackData);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolioData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-white text-xl">Loading portfolio...</div>
      </div>
    );
  }

  return <CardsParallax items={portfolioItems} onCardClick={handleCardClick} />;
};

export default KineticScrollGallery;


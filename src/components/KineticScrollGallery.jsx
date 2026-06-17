import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { portfolioItems } from '../data/siteData';
import { isVideoAsset, toAssetUrl } from '../lib/media';

const Card = ({ title, description, category, src, id, onCardClick }) => {
  const isVideo = isVideoAsset(src);

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
          {isVideo ? (
            <video
              className="w-full h-full rounded object-cover opacity-80 brightness-50"
              src={toAssetUrl(src)}
              autoPlay
              loop
              muted
              playsInline
            />
          ) : (
            <img
              className="w-full h-full rounded object-cover opacity-80 brightness-50"
              src={toAssetUrl(src)}
              alt={`${title} - ${category} project`}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

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

const KineticScrollGallery = () => {
  const navigate = useNavigate();

  const handleCardClick = (projectId) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    navigate(`/portfolio/${projectId}`);
  };

  const featuredItems = useMemo(
    () =>
      portfolioItems
        .filter((item) => item.featured)
        .map((item) => ({
          id: item.id,
          title: item.name,
          description: item.description,
          category: `${item.category} / ${item.subcategory}`,
          src: item.media[0]?.src || '/images/about.png',
        })),
    []
  );

  return <CardsParallax items={featuredItems} onCardClick={handleCardClick} />;
};

export default KineticScrollGallery;

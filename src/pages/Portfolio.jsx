import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import AnimatedText from '../components/AnimatedText';
import usePortfolioStore from '../store/portfolio';
import { getPortfolioSubcategories, portfolioCategories } from '../data/siteData';
import { isVideoAsset, toAssetUrl } from '../lib/media';

export default function Portfolio() {
  const navigate = useNavigate();
  const { items, loading, error, filter, setCategory, setSubcategory, fetchAll } = usePortfolioStore();

  useEffect(() => {
    if (!items || items.length === 0) {
      fetchAll();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const subcategories = useMemo(
    () => getPortfolioSubcategories(filter?.category ?? 'All'),
    [filter]
  );

  const projects = useMemo(() => {
    return items.map((project) => ({
      ...project,
      cover: project.media?.[0]?.src || '/images/about.png',
    }));
  }, [items]);

  const filteredProjects = useMemo(() => {
    const selectedCategory = filter?.category ?? 'All';
    const selectedSubcategory = filter?.subcategory ?? 'All';

    return projects.filter((project) => {
      const categoryMatch = selectedCategory === 'All' || project.category === selectedCategory;
      const subcategoryMatch =
        selectedSubcategory === 'All' || project.subcategory === selectedSubcategory;

      return categoryMatch && subcategoryMatch;
    });
  }, [projects, filter]);

  return (
    <div className="min-h-screen">
      <section className="py-44 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedText
            text="Our Work"
            className="text-4xl text-center md:text-start sm:text-5xl font-light text-gray-100 mb-8"
          />

          <div className="mb-8">
            <div data-aos="fade-up" data-aos-delay="200" className="flex flex-wrap gap-4">
              {portfolioCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => setCategory(category)}
                  className={`px-6  py-2 rounded font-light transition-all duration-300 ${
                    (filter?.category ?? 'All') === category
                      ? 'bg-gradient-to-r from-gray-300 to-gray-100  shadow-lg scale-105 bg-transparent border border-white text-black px-8 py-2 text-lg font-light hover:bg-white hover:text-black transition-all duration-300'
                      : 'bg-transparent border border-white text-white px-8 py-2 text-lg font-light hover:bg-white hover:text-black transition-all duration-300'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {(filter?.category ?? 'All') !== 'All' && (
            <div className="mb-12">
              <div data-aos="fade-up" data-aos-delay="250" className="flex flex-wrap gap-3">
                {subcategories.map((subcategory) => (
                  <button
                    key={subcategory}
                    onClick={() => setSubcategory(subcategory)}
                    className={`px-5 py-2 rounded border transition-all duration-300 ${
                      (filter?.subcategory ?? 'All') === subcategory
                        ? 'border-white bg-white text-black'
                        : 'border-white/30 text-white hover:border-white'
                    }`}
                  >
                    {subcategory}
                  </button>
                ))}
              </div>
            </div>
          )}

          {loading && (
            <p className="mt-6 text-gray-500" data-aos="fade-up">Loading portfolio...</p>
          )}
          {error && (
            <p className="mt-6" data-aos="fade-up">{error}</p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, idx) => {
              const isVideo = isVideoAsset(project.cover);

              return (
                <div
                  key={project.id}
                  data-aos="fade-up"
                  data-aos-delay={idx * 100}
                  className="group grayscale hover:grayscale-0 transition duration-500 relative overflow-hidden shadow-lg hover:shadow-2xl cursor-pointer"
                  onClick={() => {
                    navigate(`/portfolio/${project.id}`);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  <div className="aspect-[4/3] overflow-hidden bg-gray-200">
                    {isVideo ? (
                      <video
                        src={toAssetUrl(project.cover)}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        autoPlay
                        loop
                        muted
                        playsInline
                      />
                    ) : (
                      <img
                        src={toAssetUrl(project.cover)}
                        alt={project.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    )}
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <span className="text-gray-300 text-sm uppercase tracking-[0.2em] mb-2">
                      {project.category} / {project.subcategory}
                    </span>
                    <h3 className="text-white text-2xl font-light mb-2">
                      {project.name}
                    </h3>
                    <p className="text-gray-200 text-sm font-light">
                      {project.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

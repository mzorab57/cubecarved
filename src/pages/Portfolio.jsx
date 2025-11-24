import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import AnimatedText from '../components/AnimatedText';
import usePortfolioStore from '../store/portfolio';

export default function Portfolio() {
  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://nergizkhalid.com/api-nergiz';
  const { items, loading, error, filter, setFilter, fetchAll } = usePortfolioStore();

  useEffect(() => {
    if (!items || items.length === 0) {
      fetchAll();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const categories = useMemo(() => {
    const base = ['All'];
    const cats = Array.from(new Set(items.map((p) => p.category_name).filter(Boolean)));
    console.log(cats);
    
    return [...base, ...cats];
  }, [items]);

  const projects = useMemo(() => {
    // Map backend schema to UI shape
    return items.map((p) => {
      const primaryImage = Array.isArray(p.images) ? (p.images.find((img) => img.is_primary) || p.images[0]) : null;
      return {
        id: p.id,
        title: p.name,
        category: p.category_name || p.type || 'Unknown',
        image: primaryImage ? primaryImage.image : 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200',
        images: Array.isArray(p.images) ? p.images.map((img) => img.image) : [],
        description: p.description || '',
      };
    });
  }, [items]);

  const filteredProjects = useMemo(() => {
    if (!filter || filter.category === 'All') return projects;
    return projects.filter((project) => project.category === filter.category);
  }, [projects, filter]);

  return (
    <div className="min-h-screen">
     

      <section className="py-44 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedText
              text="Our Work"
              className="text-4xl text-center md:text-start sm:text-5xl font-light text-gray-100 mb-8"
            />
          <div className="text-center mb-12 flex justify-between">

            <div data-aos="fade-up" data-aos-delay="200" className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setFilter(category)}
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

            {loading && (
              <p className="mt-6 text-gray-500" data-aos="fade-up">Loading portfolio.....</p>
            )}
            {error && (
              <p className="mt-6 " data-aos="fade-up">{error}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, idx) => (
              <div
                key={project.id}
                data-aos="fade-up"
                data-aos-delay={idx * 100}
                className="group grayscale hover:grayscale-0 transition duration-500 relative  overflow-hidden  shadow-lg hover:shadow-2xl  cursor-pointer"
                onClick={() => {
                  navigate(`/portfolio/${project.id}`);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                <div className="aspect-[4/3] overflow-hidden bg-gray-200">
                  <img
                    src={project.image && `${API_BASE_URL}/${project.image}`}
                    alt={project.title}
                    className="w-full h-full  object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                 
                  <h3 className="text-white text-2xl font-light mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-200 text-sm font-light">
                    {project.description}
                  </p>
                </div>

                {/* <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-gray-700">
                    {project.category}
                  </span>
                </div> */}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

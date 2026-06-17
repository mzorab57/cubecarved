import { Link } from 'react-router-dom';
import { siteContent } from '../data/siteData';

const ServicesTitle = () => {
  return (
    <section className="relative  flex items-center justify-center py-20 bg-yellow-50">
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative w-full">
          <div>
            <h1 className="absolute -top-16 left-0 w-full text-4xl md:text-7xl font-bold text-gray-800 mb-12 tracking-wide opacity-5">
              IA & CO.
            </h1>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-12 tracking-wide">
              SERVICES OFFERED
            </h1>

            <div className="space-y-4 mb-8">
              {siteContent.servicesOffered.map((service) => (
                <div key={service.title} className="text-lg md:text-xl text-gray-700 font-light tracking-wide">
                  {service.title}
                </div>
              ))}
            </div>

            <p className="text-gray-600 leading-relaxed max-w-xl mb-10">
              Design, execution, interior and exterior decoration, and comprehensive engineering
              supervision delivered through one integrated workflow.
            </p>

            <Link
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              to="/services"
              className="bg-transparent border border-black text-black px-8 py-2 text-lg font-light hover:bg-black hover:text-white transition-all duration-300"
            >
              Visit Our Services
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesTitle;

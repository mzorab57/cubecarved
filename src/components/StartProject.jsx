import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const StartProject = () => {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div data-aos="fade-up" data-aos-duration="1000">
          <h2 className="text-4xl sm:text-5xl font-light text-gray-100 mb-6">
            Ready to Build Your Next Project?
          </h2>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto font-light">
            Share your requirements and let CUBE CARVED shape them into a functional, modern,
            and high-quality result.
          </p>
          <Link
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            to="/contact"
            className="inline-flex items-center space-x-2 bg-transparent border border-white text-white px-8 py-2 text-lg font-light hover:bg-white hover:text-black transition-all duration-300"
          >
            <span>Start Your Project</span>
            <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default StartProject;

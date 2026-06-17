import AnimatedText from '../components/AnimatedText';
import { useEffect } from 'react';
import useServicesStore from '../store/services';
import { siteContent } from '../data/siteData';

export default function Services() {
  const { items: services, loading, error, fetchAll } = useServicesStore();

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const getImageSrc = (img) => {
    if (!img) return '/images/color.png';
    return img;
  };

  return (
    <div >
      <section className="relative   overflow-hidden ">
        <div className=" aspect-square lg:aspect-[3.6/2] inset-0 bg-[url('/images/servicebg.PNG')] bg-cover bg-center  opacity-40"></div>
      </section>

       <div className="h-14 w-full bg-gradient-to-t from-[#121212] via-[#0e0e0e] to-transparent -translate-y-8"></div>
      <section className="py-24 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <AnimatedText
              text="What We Offer"
              className="text-4xl sm:text-5xl font-light text-gray-100 mb-4"
            />
            <p data-aos="fade-up" data-aos-delay="200" className="text-xl text-gray-400 max-w-2xl mx-auto font-light ">
              Integrated engineering services that connect design quality with dependable execution.
            </p>
            {loading && (
              <p className="mt-4 text-gray-400">Loading services...</p>
            )}
            {error && (
              <p className="mt-4 text-gray-400 font-light">{error}</p>
            )}
          </div>

          {!loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, idx) => (
                <div
                  key={service.id || idx}
                  data-aos="fade-up"
                  data-aos-delay={idx * 100}
                  className="group grayscale hover:grayscale-0  rounded p-4 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-700 hover:border-gray-200 hover:-translate-y-2"
                >
                  <img
                    src={getImageSrc(service.image)}
                    alt={service.name}
                    className="w-full h-32  object-cover rounded mb-6 group-hover:scale-110 group-hover:rotate-6  transition-all duration-300 shadow-lg brightness-75"
                  />

                  <h3 className="text-2xl font-light text-gray-100 mb-4">
                    {service.title || service.name}
                  </h3>

                  <p className="text-gray-400 mb-6 font-light leading-relaxed">
                    {service.description}
                  </p>

                  {Array.isArray(service.features) && service.features.length > 0 && (
                    <div className="space-y-2">
                      {service.features.map((feature, featureIdx) => (
                        <div
                          key={featureIdx}
                          className="flex items-center space-x-2 text-gray-400"
                        >
                          <div className="w-1.5 h-1.5 bg-gray-200 rounded-full"></div>
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>


{/* our process */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 data-aos="fade-up" className="text-4xl sm:text-5xl font-light text-gray-100 mb-6">
              Our Process
            </h2>
            <p data-aos="fade-up" data-aos-delay="100" className="text-xl text-gray-400 max-w-2xl mx-auto font-light">
              A structured workflow from initial planning to final handover.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {siteContent.process.map((process, idx) => (
              <div
                key={process}
                data-aos="fade-up"
                data-aos-delay={idx * 100}
                className="relative"
              >
                <div className="bg-transparent border h-64 border-white text-white px-8 py-2 text-lg font-light hover:bg-white hover:text-black transition-all duration-300">
                  <div className="text-6xl font-bold text-gray-200 mb-4">
                    {String(idx + 1).padStart(2, '0')}
                  </div>
                  <h3 className="text-xl font-bold text-gray-100 mb-3">
                    {process}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {siteContent.futureGoals.items[idx] || 'Professional coordination at every project stage.'}
                  </p>
                </div>
                {idx < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-gray-200 to-gray-200"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-black text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div data-aos="zoom-in" data-aos-duration="1000">
            <h2 className="text-4xl sm:text-5xl font-light mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-lg font-light text-gray-300 mb-10">
              Design, execution, and supervision aligned in one clear process.
            </p>
            <a
              href="/contact"
              className="bg-transparent border border-white text-white px-8 py-2 text-lg font-light hover:bg-white hover:text-black transition-all duration-300"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

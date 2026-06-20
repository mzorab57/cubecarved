import { Award, Clock3, BadgeDollarSign } from 'lucide-react';
import AnimatedText from './AnimatedText';
import { siteContent } from '../data/siteData';

const WhyChooseUs = () => {
  const icons = [Award, Clock3, BadgeDollarSign];

  return (
    <section className="py-24 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <AnimatedText
            text="Why Choose Us?"
            className="text-4xl sm:text-5xl text-gray-100 mb-4"
          />
          <p
            data-aos="fade-up"
            data-aos-delay="200"
            className="text-xl font-sans text-gray-400 max-w-2xl mx-auto"
          >
            A reliable engineering partner for design, execution, and long-term project value.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {siteContent.whyChooseUs.map((feature, idx) => {
            const Icon = icons[idx] || Award;

            return (
              <div
                key={feature.title}
                data-aos="fade-up"
                data-aos-delay={idx * 100}
                className="group p-8 bg-white/5  hover:shadow-2xl transition-all duration-300 border border-[#7C3AED]/30  hover:border-[#7C3AED]/50  hover:-translate-y-2"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-[#7C3AED]/10 via-[#4F46E5]/10 to-[#60A5FA]/10 text-white  rounded-xl flex items-center justify-center mb-6  transition-all duration-300 shadow-lg">
                  <Icon className="w-8 h-8 " />
                </div>
                <h3 className="text-xl font-semibold text-gray-100 mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;

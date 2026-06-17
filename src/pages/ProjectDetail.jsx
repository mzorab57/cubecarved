import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';
import { getPortfolioById } from '../lib/portfolioApi';
import AnimatedText from '../components/AnimatedText';
import { isVideoAsset, toAssetUrl } from '../lib/media';

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        const data = await getPortfolioById(id);
        setProject(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProject();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center py-32">
        <div className="text-white text-xl">Loading project...</div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center py-32">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">Project not found</div>
          <button
            onClick={() => navigate('/portfolio')}
            className="bg-white text-black px-6 py-2 rounded hover:bg-gray-200 transition-colors"
          >
            Back to Portfolio
          </button>
        </div>
      </div>
    );
  }

  const media = project.media || [];
  const activeMedia = media[selectedImage] || media[0];
  const activeIsVideo = isVideoAsset(activeMedia);

  return (
    <div className="min-h-screen bg-black py-24 lg:pl-14 pl-0">
      <div className="pt-20 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => navigate('/portfolio')}
            className="flex items-center text-white hover:text-gray-300 transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Portfolio
          </button>
          
          <AnimatedText
            text={project.name || 'Project Details'}
            className="text-4xl sm:text-5xl font-light text-white mb-4"
          />
          
          <div className="flex flex-wrap gap-4 mb-8">
            <span className="px-4 py-2 bg-white/10 rounded-full text-white text-sm">
              {project.category}
            </span>
            <span className="px-4 py-2 bg-white/10 rounded-full text-white text-sm">
              {project.subcategory}
            </span>
            <span className="px-4 py-2 bg-white/10 rounded-full text-white text-sm">
              {project.location}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="relative aspect-[4/3] bg-gray-900 rounded-lg overflow-hidden">
              {activeIsVideo ? (
                <video
                  src={toAssetUrl(activeMedia?.src)}
                  className="w-full h-full object-cover"
                  controls
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              ) : (
                <img
                  src={toAssetUrl(activeMedia?.src)}
                  alt={project.name}
                  className="w-full h-full object-cover"
                />
              )}
              <div 
                className="w-full h-full bg-gray-800 flex items-center justify-center text-white text-lg"
                style={{ display: 'none' }}
              >
                Image not available
              </div>
              
              {media.length > 1 && (
                <>
                  <button
                    onClick={() => setSelectedImage((prev) => (prev > 0 ? prev - 1 : media.length - 1))}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={() => setSelectedImage((prev) => (prev + 1) % media.length)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
            </div>

            {media.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {media.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index 
                        ? 'border-white ring-2 ring-white/50' 
                        : 'border-white/20 hover:border-white/40'
                    }`}
                  >
                    {isVideoAsset(item) ? (
                      <video
                        src={toAssetUrl(item.src)}
                        className="w-full h-full object-cover"
                        muted
                      />
                    ) : (
                      <img
                        src={toAssetUrl(item.src)}
                        alt={`${project.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-light text-white mb-4">Project Description</h2>
              <p className="text-gray-300 leading-relaxed text-lg">
                {project.description || 'No description available for this project.'}
              </p>
            </div>

            <div>
              <h3 className="text-xl font-light text-white mb-4">Project Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b border-white/10">
                  <span className="text-gray-400">Category</span>
                  <span className="text-white">{project.category || 'N/A'}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/10">
                  <span className="text-gray-400">Subcategory</span>
                  <span className="text-white">{project.subcategory || 'N/A'}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/10">
                  <span className="text-gray-400">Service</span>
                  <span className="text-white">{project.service || 'N/A'}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/10">
                  <span className="text-gray-400">Location</span>
                  <span className="text-white">{project.location || 'N/A'}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/10">
                  <span className="text-gray-400">Media</span>
                  <span className="text-white">{media.length}</span>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-6">
              <h3 className="text-xl font-light text-white mb-3">Interested in similar work?</h3>
              <p className="text-gray-300 mb-4">
                Get in touch to discuss your project requirements.
              </p>
              <button
                onClick={() => navigate('/contact')}
                className="bg-white text-black px-6 py-3 rounded font-medium hover:bg-gray-200 transition-colors"
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

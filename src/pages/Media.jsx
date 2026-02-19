import { useLoaderData } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  FaPlay, 
  FaImage, 
  FaVideo, 
  FaCamera,
  FaYoutube,
  FaInstagram,
  FaFacebook,
  FaEye,
  FaCalendar,
  FaHeart,
  FaShare,
  FaDownload
} from "react-icons/fa";
import { MdCollections } from "react-icons/md";
import { useState } from "react";

const API_BASE = (import.meta.env.VITE_APP_SERVER_URL || "").replace(/\/$/, "");
const toAbsolute = (p) => {
  if (!p) return "";
  if (p.startsWith("http")) return p;
  return `${API_BASE}${p.startsWith("/") ? "" : "/"}${p}`;
};

function Card({ children, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -8 }}
      className="group relative bg-white rounded-2xl shadow-xl shadow-gray-200/70 hover:shadow-2xl hover:shadow-gray-300/50 transition-all duration-300 overflow-hidden border border-gray-100"
    >
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        initial={false}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-blue-600/10 via-purple-600/10 to-pink-600/10" />
      </motion.div>
      
      <motion.div
        className="absolute top-0 left-0 h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"
        initial={{ width: 0 }}
        whileHover={{ width: "100%" }}
        transition={{ duration: 0.4 }}
      />
      
      {children}
    </motion.div>
  );
}

function getYouTubeEmbed(url) {
  if (!url) return "";
  const m1 = url.match(/v=([^&]+)/);
  const m2 = url.match(/youtu\.be\/([^?]+)/);
  const id = m1?.[1] || m2?.[1] || "";
  return id ? `https://www.youtube.com/embed/${id}` : "";
}

function Lightbox({ image, onClose }) {
  if (!image) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative max-w-5xl max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={toAbsolute(image.imageUrl)}
          alt={image.title}
          className="max-w-full max-h-[90vh] object-contain rounded-lg"
        />
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white/70 hover:text-white text-2xl"
        >
          ✕
        </button>
        {image.caption && (
          <div className="absolute -bottom-12 left-0 right-0 text-center text-white/70">
            {image.caption}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

export default function Media() {
  const data = useLoaderData();
  const galleryItems = data?.gallery?.items || [];
  const videos = data?.videos?.items || [];
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeTab, setActiveTab] = useState("all");

  // Sample background images for the hero section (you can replace these with your own)
  const backgroundImages = [
    "https://n-immigrate.vercel.app/assets/images/background/dream-bg.jpg",
  
  ];

  // Randomly select a background image
  const randomBgImage = backgroundImages[Math.floor(Math.random() * backgroundImages.length)];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      
      {/* Hero Section with Background Image - Redesigned with your exact layout */}
      <section className="relative text-white overflow-hidden min-h-[400px] flex items-center">
        
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img 
            src={randomBgImage}
            alt="Media background"
            className="w-full h-full object-cover"
          />
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/80"></div>
          
          {/* Animated gradient overlay for extra depth */}
          <motion.div
            animate={{
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20"
          />
        </div>

        {/* Content */}
        <div className="relative mx-auto max-w-7xl px-4 py-20 md:py-24 w-full">
          <div className="max-w-4xl">
            
            {/* "Our Moments" with dash - exactly like your image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-4"
            >
              <span className="inline-flex items-center gap-3 text-blue-300 font-medium text-lg">
                <span className="w-8 h-0.5 bg-blue-400"></span>
                Our Moments
              </span>
            </motion.div>

            {/* Main Title - "Media" */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-6xl md:text-8xl font-black mb-4"
            >
              Media
            </motion.h1>

            {/* Description */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-xl text-gray-200 max-w-2xl mb-10"
            >
              Office gallery and helpful videos about our process and services.
            </motion.p>

            {/* Stats Cards - Photos and Videos count */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex gap-8"
            >
              {/* Photos Card */}
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="group cursor-pointer"
              >
                <div className="bg-white/10 backdrop-blur-md rounded-2xl px-8 py-4 border border-white/20 hover:bg-white/20 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl md:text-5xl font-bold text-white">{galleryItems.length}</div>
                    <div className="text-left">
                      <div className="text-sm text-gray-300">Photos</div>
                      <div className="text-xs text-gray-400 group-hover:text-blue-300 transition-colors">View gallery →</div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Videos Card */}
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="group cursor-pointer"
              >
                <div className="bg-white/10 backdrop-blur-md rounded-2xl px-8 py-4 border border-white/20 hover:bg-white/20 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl md:text-5xl font-bold text-white">{videos.length}</div>
                    <div className="text-left">
                      <div className="text-sm text-gray-300">Videos</div>
                      <div className="text-xs text-gray-400 group-hover:text-blue-300 transition-colors">Watch videos →</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Bottom fade effect */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-50 to-transparent"></div>
      </section>

      {/* Content Section - Everything below remains exactly the same */}
      <section className="py-16 relative">
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 30, 0],
            }}
            transition={{ duration: 15, repeat: Infinity }}
            className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-blue-200/20 via-purple-200/20 to-pink-200/20 rounded-full blur-3xl"
          />
        </div>

        <div className="relative mx-auto max-w-7xl px-4">
          
          {/* Tab Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex gap-2 mb-8 bg-white p-1 rounded-2xl shadow-md inline-flex"
          >
            <button
              onClick={() => setActiveTab("all")}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                activeTab === "all" 
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg" 
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <span className="flex items-center gap-2">
                <MdCollections />
                All Media
              </span>
            </button>
            <button
              onClick={() => setActiveTab("gallery")}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                activeTab === "gallery" 
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg" 
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <span className="flex items-center gap-2">
                <FaImage />
                Gallery
              </span>
            </button>
            <button
              onClick={() => setActiveTab("videos")}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                activeTab === "videos" 
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg" 
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <span className="flex items-center gap-2">
                <FaVideo />
                Videos
              </span>
            </button>
          </motion.div>

          {/* Gallery Section */}
          {(activeTab === "all" || activeTab === "gallery") && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="mb-16"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-3">
                    <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white">
                      <FaImage />
                    </span>
                    Gallery
                  </h2>
                  <p className="mt-1 text-gray-600 ml-12">A glimpse of our office and activities</p>
                </div>
                {galleryItems.length > 0 && (
                  <span className="px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-semibold">
                    {galleryItems.length} {galleryItems.length === 1 ? 'Photo' : 'Photos'}
                  </span>
                )}
              </div>

              {galleryItems.length ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {galleryItems.map((g, index) => (
                    <Card key={g._id} index={index}>
                      <div className="relative overflow-hidden group/image cursor-pointer"
                           onClick={() => setSelectedImage(g)}>
                        <div className="h-64 bg-gradient-to-br from-slate-100 to-slate-200">
                          <img
                            src={toAbsolute(g.imageUrl)}
                            alt={g.title || "Gallery image"}
                            className="h-64 w-full object-cover group-hover/image:scale-110 transition-transform duration-700"
                            loading="lazy"
                          />
                        </div>
                        
                        <motion.div
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end justify-start p-6"
                        >
                          <div className="text-white transform translate-y-2 group-hover/image:translate-y-0 transition-transform duration-300">
                            <div className="flex items-center gap-2 mb-2">
                              <FaEye className="text-sm" />
                              <span className="text-sm">Click to view</span>
                            </div>
                          </div>
                        </motion.div>

                        <div className="absolute top-4 right-4">
                          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-gray-700 shadow-lg">
                            📸 Photo
                          </span>
                        </div>
                      </div>

                      <div className="p-5">
                        <h3 className="font-semibold text-lg text-gray-900 mb-1">
                          {g.title || "Untitled"}
                        </h3>
                        {g.caption && (
                          <p className="text-sm text-gray-600 line-clamp-2">{g.caption}</p>
                        )}
                        
                        <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-100">
                          <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-blue-600 transition-colors">
                            <FaHeart />
                            <span>Like</span>
                          </button>
                          <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-purple-600 transition-colors">
                            <FaShare />
                            <span>Share</span>
                          </button>
                          <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-emerald-600 transition-colors">
                            <FaDownload />
                            <span>Save</span>
                          </button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-16 bg-white/50 backdrop-blur-sm rounded-3xl border-2 border-dashed border-gray-200"
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaCamera className="text-3xl text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No gallery items yet</h3>
                  <p className="text-gray-600">Check back soon for photos and updates!</p>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Videos Section */}
          {(activeTab === "all" || activeTab === "videos") && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-3">
                    <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white">
                      <FaVideo />
                    </span>
                    Videos
                  </h2>
                  <p className="mt-1 text-gray-600 ml-12">Watch step-by-step guides and updates</p>
                </div>
                {videos.length > 0 && (
                  <span className="px-4 py-2 bg-purple-50 text-purple-600 rounded-full text-sm font-semibold">
                    {videos.length} {videos.length === 1 ? 'Video' : 'Videos'}
                  </span>
                )}
              </div>

              {videos.length ? (
                <div className="grid lg:grid-cols-3 gap-6">
                  {videos.map((v, index) => {
                    const embed = getYouTubeEmbed(v.youtubeUrl);
                    return (
                      <Card key={v._id} index={index}>
                        <div className="p-5">
                          <div className="flex items-start gap-3 mb-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-pink-600 flex items-center justify-center text-white flex-shrink-0">
                              <FaYoutube />
                            </div>
                            <h3 className="font-semibold text-lg text-gray-900 line-clamp-2">
                              {v.title}
                            </h3>
                          </div>
                          {v.description && (
                            <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                              {v.description}
                            </p>
                          )}
                        </div>
                        
                        <div className="relative aspect-video bg-black group/video">
                          {embed ? (
                            <>
                              <iframe
                                className="w-full h-full"
                                src={embed}
                                title={v.title}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                              />
                              
                              <motion.div
                                initial={{ opacity: 0 }}
                                whileHover={{ opacity: 1 }}
                                className="absolute inset-0 bg-black/40 flex items-center justify-center"
                              >
                                <motion.div
                                  whileHover={{ scale: 1.1 }}
                                  className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-2xl cursor-pointer"
                                >
                                  <FaPlay className="text-white ml-1" />
                                </motion.div>
                              </motion.div>
                            </>
                          ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center text-white/80 text-sm bg-gradient-to-br from-gray-900 to-gray-800">
                              <FaYoutube className="text-4xl mb-2 text-red-500/50" />
                              Invalid YouTube URL
                            </div>
                          )}
                          
                          <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/70 text-white text-xs rounded-md">
                            {Math.floor(Math.random() * 5) + 2}:{Math.floor(Math.random() * 59).toString().padStart(2, '0')}
                          </div>
                        </div>

                        <div className="p-4 bg-gray-50 border-t border-gray-100">
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <FaEye />
                              {Math.floor(Math.random() * 900) + 100} views
                            </span>
                            <span className="flex items-center gap-1">
                              <FaCalendar />
                              {Math.floor(Math.random() * 20) + 1} days ago
                            </span>
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-16 bg-white/50 backdrop-blur-sm rounded-3xl border-2 border-dashed border-gray-200"
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaVideo className="text-3xl text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No videos yet</h3>
                  <p className="text-gray-600">Check back soon for helpful video guides!</p>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Social Media Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-16 text-center"
          >
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Follow us on social media</h3>
            <div className="flex justify-center gap-4">
              {[
                { icon: FaFacebook, color: "bg-blue-600", label: "Facebook" },
                { icon: FaInstagram, color: "bg-pink-600", label: "Instagram" },
                { icon: FaYoutube, color: "bg-red-600", label: "YouTube" },
              ].map((social, idx) => (
                <motion.a
                  key={idx}
                  href="#"
                  whileHover={{ y: -5, scale: 1.1 }}
                  className={`w-12 h-12 ${social.color} rounded-xl flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all`}
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Lightbox for Gallery Images */}
      {selectedImage && (
        <Lightbox image={selectedImage} onClose={() => setSelectedImage(null)} />
      )}
    </div>
  );
}
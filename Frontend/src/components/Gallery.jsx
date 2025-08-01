const Gallery = () => {
  return (
    <section
      id="gallery"
      className="bg-[#8B4513] text-white min-h-screen flex flex-col items-center justify-center text-center px-6"
    >
      <h2 className="text-4xl font-bold mb-4">Gallery</h2>
      <p className="text-lg max-w-2xl mb-6">
        Browse the memories shared by our alumni.
      </p>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-6xl">
        {/* Replace src with actual image links */}
        <img src="/images/download.jpeg" alt="Gallery Image 1" className="w-full h-60 object-cover rounded-lg" />
        <img src="/images/download.jpeg" alt="Gallery Image 2" className="w-full h-60 object-cover rounded-lg" />
        <img src="/images/images.jpeg" alt="Gallery Image 3" className="w-full h-60 object-cover rounded-lg" />
        <img src="/images/download.jpeg" alt="Gallery Image 4" className="w-full h-60 object-cover rounded-lg" />
        <img src="/images/download(1).jpeg" alt="Gallery Image 5" className="w-full h-60 object-cover rounded-lg" />
        <img src="/images/download.jpeg" alt="Gallery Image 6" className="w-full h-60 object-cover rounded-lg" />
      </div>
    </section>
  );
};

export default Gallery;
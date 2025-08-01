import React from "react";
import { motion } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

const Home = () => {
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 2000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    arrows: false,
    pauseOnHover: false,
  };

  const alumniImages = [
    { src: "/images/download.jpeg", name: "Alumni 1", title: "Software Engineer" },
    { src: "/images/download.jpeg", name: "Alumni 2", title: "Data Scientist" },
    { src: "/images/download.jpeg", name: "Alumni 3", title: "Entrepreneur" },
    { src: "/images/download.jpeg", name: "Alumni 4", title: "AI Researcher" },
    { src: "/images/download.jpeg", name: "Alumni 5", title: "Tech Innovator" },
    { src: "/images/download.jpeg", name: "Alumni 6", title: "Business Leader" },
  ];

  return (
    <div className="pt-16 text-center px-4 py-8">
      <motion.div
        className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-12 rounded-xl shadow-lg"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-4xl font-bold mb-3">Welcome to Vignan Alumni Network</h1>
        <p className="text-lg">Stay connected, share experiences, and grow together!</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="mt-4 bg-white text-orange-600 font-semibold px-6 py-2 rounded-lg shadow-md hover:bg-gray-200 transition"
          onClick={() => window.location.href = "/alumni"}
        >
          Explore Alumni
        </motion.button>
      </motion.div>

      <div className="mt-12">
        <h2 className="text-3xl font-semibold mb-6">Our Notable Alumni</h2>
        <div className="max-w-5xl mx-auto">
          <Slider {...sliderSettings}>
            {alumniImages.map((alumni, index) => (
              <div key={index} className="p-4">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <img
                    src={alumni.src}
                    alt={alumni.name}
                    className="mx-auto mb-3 rounded-full w-32 h-32 object-cover"
                  />
                  <h3 className="text-xl font-bold">{alumni.name}</h3>
                  <p className="text-gray-600">{alumni.title}</p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      <footer className="mt-12 bg-gray-900 text-white py-6">
        <div className="container mx-auto text-center">
          <h3 className="text-lg font-semibold">Vignan's Foundation for Science, Technology & Research</h3>
          <p>(Deemed to be University), Vadlamudi, Guntur-522213</p>
          <p>Email: <a href="mailto:info@vignan.ac.in" className="text-orange-400">info@vignan.ac.in</a></p>
          <p>Contact: 0863-2344700 / 701</p>
          <div className="mt-4 text-sm">
            <p>Stay connected with your alma mater! Join our alumni community to network, mentor, and grow.</p>
            <p>&copy; {new Date().getFullYear()} Vignan Alumni Network. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;

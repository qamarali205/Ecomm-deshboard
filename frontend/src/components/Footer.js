import React, { useState, useEffect } from "react";
import "./styles.css"; // Import the CSS styles

const Footer = () => {
  const [showScroll, setShowScroll] = useState(false);

  // Show the scroll-up icon when the user scrolls down the page
  const handleScroll = () => {
    if (window.scrollY > 300) {
      setShowScroll(true);
    } else {
      setShowScroll(false);
    }
  };

  // Scroll to the top of the page when the scroll-up icon is clicked
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <footer className="footer">
      <p>&copy; 2023 Admin Dashboard</p>
      <div
        className={`scroll-up ${showScroll ? "show" : ""}`}
        onClick={scrollToTop}
      >
        {/* &#8593; */}
      </div>
    </footer>
  );
};

export default Footer;

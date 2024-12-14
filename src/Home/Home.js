import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Slider from 'react-slick';
import './Home.css';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const audioRef = useRef(null); // Create a ref for the audio element
  const [showDescription, setShowDescription] = useState(false); // State for showing the description
  const [descriptionText, setDescriptionText] = useState(''); // State for the typing effect
  const donateFormRef = useRef(null); 

  const navigate = useNavigate();

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  // Function to play the audio and start typing effect
  const handleAudioPlay = () => {
    if (audioRef.current) {
      audioRef.current.play(); // Play the audio when the button is clicked
    }
    startTypingEffect(); // Start the typing effect
  };

  // Typing effect function
  const startTypingEffect = () => {
    const fullText = 'Make a difference by donating surplus food to those in need. Your contribution helps fight hunger and supports local communities.';
    let index = 0;
    setDescriptionText(''); // Reset the description text before starting
  
    const typingInterval = setInterval(() => {
      if (index < fullText.length) {
        setDescriptionText((prev) => prev + fullText.charAt(index)); // Append the next character
        index++;
      } else {
        clearInterval(typingInterval); // Clear the interval when done
        setShowDescription(true); // Show the description once typing is complete
      }
    }, 60); // Adjust typing speed here
  };
  
  const scrollToDonateForm = () => {
    if (donateFormRef.current) {
      donateFormRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handledonatenow = () => {
    navigate('/orphanages');
  };

  return (
    <div className="advanced-home-container">
      <Navbar />
      <section className="hero-section">
        <h1 className="hero-title" data-shadow="Donate Food, Save Lives">
          Donate Food, Save Lives
        </h1>
       
        <motion.p className="hero-subtitle" data-shadow="Make a difference in your community by donating surplus food.">
          Make a difference in your community by donating surplus food.
        </motion.p>
        <motion.button className="hero-button" onClick={scrollToDonateForm}>
          Get Started
        </motion.button>
      </section>

      <section ref={donateFormRef} className="donate-form-section">
        <div className="donate-form-content">
          <div className="donate-image">
            <img src="/donation.png" alt="Food Donation" />
          </div>
          <div className="donate-text">
            <h2 className='donate-title'>Food Donation</h2>

            {/* Hidden audio element */}
            <audio ref={audioRef}>
              <source src="/audio1.mp3" type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
            
            {/* Button to trigger the audio */}
            <button className="learn-more-button" onClick={handleAudioPlay}>Learn More</button>

            {/* Display the description with typing effect */}
            {showDescription && (
              <p className='donate-description'>{descriptionText}</p>
            )}
          </div>
        </div>
      </section>

      <section className="donate-now-section">
        <h2>Make a Difference Today</h2>
        <p>Your contribution can help feed those in need. Every bit counts!</p>
        <motion.button 
          className="donate-now-button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handledonatenow}
        >
          Donate Now
        </motion.button>
      </section>

      <section className="steps-section">
        <h2>How It Works?</h2>
        <div className="steps">
          <motion.div
            className="step"
            whileHover={{ scale: 1.1 }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3>Step 1</h3>
            <p>Create an account or sign in.</p>
          </motion.div>
          <motion.div
            className="step"
            whileHover={{ scale: 1.1 }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3>Step 2</h3>
            <p>Select a local charity or shelter.</p>
          </motion.div>
          <motion.div
            className="step"
            whileHover={{ scale: 1.1 }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h3>Step 3</h3>
            <p>Schedule a pickup or drop-off for your donation.</p>
          </motion.div>
        </div>
      </section>

      <section className="testimonials-section">
        <h2>Recent Feedbacks</h2>
        <div className="testimonial-slider">
          <Slider {...sliderSettings}>
            <div className="testimonial-card">
              <p>
                "Food Donation Platform makes it incredibly easy to give back and support people in need!"
              </p>
              <span>- Emily R.</span>
            </div>
            <div className="testimonial-card">
              <p>
                "A seamless experience from start to finish. I now donate food regularly thanks to this platform."
              </p>
              <span>- Michael T.</span>
            </div>
            <div className="testimonial-card">
              <p>
                "Easy processing steps and accessibility."
              </p>
              <span>- Sharan.</span>
            </div>
            {/* Add more cards as needed */}
          </Slider>
        </div>
      </section>

      <section className="cta-section">
        <motion.div 
          className="cta-box"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h2>CONTACT</h2>
          <p>Enter your details below, and we'll reach you!</p>
          <form className="donation-form">
            <input className='contact-text' type="text" placeholder="Your Name" />
            <input className='contact-text' type="email" placeholder="Your Email" />
            <textarea className='contact-text' placeholder="Message or Questions"></textarea>
            <motion.button 
              type="submit" 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="form-button"
            >
              Contact Us
            </motion.button>
          </form>
        </motion.div>
      </section>

      <footer className="foooter">
        <p>© 2024 Food Donation Platform. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;

import React, { useState, useEffect } from "react";
import "./App.css";
import RequestForm from "./components/request";
import RequestsList from "./components/RequestsList";
import UpcomingSittings from "./components/UpcomingSittings";
import firstSlide from "./pics/IMG_20210306_135141.jpg";
import secondSlide from "./pics/20230319_113845.jpg";
import thirdSlide from "./pics/IMG_20210522_140924.jpg";
import fourthSlide from "./pics/IMG_0338.jpeg";
import fifthSlide from "./pics/IMG_0820.jpeg";
import sixthSlide from "./pics/IMG_7087.jpeg";
import seventhSlide from "./pics/IMG_7263.jpeg";
import eighthSlide from "./pics/IMG_8754.jpeg";
import ninthSlide from "./pics/IMG_9464.jpeg";
import tenthSlide from "./pics/IMG_1054.jpg";
import eleventhSlide from "./pics/IMG_1026.jpg";
import twelfthSlide from "./pics/IMG_1045.jpg";
import thirteenthSlide from "./pics/IMG_1048.jpg";
import fourteenthSlide from "./pics/IMG_1184.jpeg";
import fifteenthSlide from "./pics/IMG_4432.jpeg";
import sixteenthSlide from "./pics/IMG_6724.jpeg";
import seventeenthSlide from "./pics/IMG_5189.jpeg";
import eighteenthSlide from "./pics/IMG_6459.jpeg";
import nineteenthSlide from "./pics/IMG_8864.jpeg";

import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import dogPawIcon from "./pics/icons8-dog-paw-64.png";
import PaymentPage from "./components/PaymentPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { GoogleMap, LoadScript, Circle } from "@react-google-maps/api";


const mapContainerStyle = {
  width: "300px",
  height: "200px",
};

const center = {
  lat: 49.11268810825966,  
  lng: -123.92850984632845, // Coordinates for Nanaimo
};

const circleOptions = {
  strokeColor: "#800080", // Purple color
  strokeOpacity: 0.8,
  strokeWeight: 2,
  fillColor: "#800080",
  fillOpacity: 0.35,
  center: center,
  radius: 2000, // This will create a circle around 5km, adjust as necessary
};

function App() {
  const [currentSlide, setCurrentSlide] = React.useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % 19);  // Cycle to next slide
  };

  
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 19);
    }, 3000); // changes every 5 seconds

    return () => clearInterval(timer); // Clear the interval when the component is unmounted
  }, []);

  return (
    <div className="App container mt-5">
      <h1 className="display-4 mb-3">
        <img
          src={dogPawIcon}
          alt="Dog Paw Icon"
          style={{ marginRight: "10px", verticalAlign: "middle" }}
        />
        Boarding For The Love Of Dogs
        <img
          src={dogPawIcon}
          alt="Dog Paw Icon"
          style={{ marginRight: "10px", verticalAlign: "middle" }}
        />
      </h1>

      <div className="mb-5">
        <h3 className="h5 mb-3">Welcome to Jessica's Dog Boarding Service</h3>
        <p>
          No matter what type of care and support your four legged friend requires, rest
          assured that For the Love of Dogs can provide what they need and more
          with experience, passion, and fun. Being flexible and accommodating to
          both you and the dogs in our care, we don't just meet the basics. We
          go the extra mile, catering to each individual owner's and dog's
          desires.
        </p>
        <p>
          With over half an acre fully fenced for play, we offer multiple areas
          for shade, dog pools and natural dens. Our house is their house and our priority
          is insuring comfort not just for your pet, but for you
          as well.
           Trust in us; your best friends are in excellent hands.
          Driven by a passion for animals and a deep understanding of quality
          pet care, we proudly serve our growing client base.
        </p>
      </div>

      <div
        className="carousel-wrapper"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Price on the left */}
        <div className="price-info">
          <h1>
            $40/night <br /> per dog
          </h1>
        </div>

        {/* Carousel in the center */}
        <div className="carousel-container">
          <div
            className="carousel-slides"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            <img src={firstSlide} alt="Slide 1" />
            <img src={secondSlide} alt="Slide 2" />
            <img src={thirdSlide} alt="Slide 3" />
            <img src={fourthSlide} alt="Slide 4" />
            <img src={fifthSlide} alt="Slide 5" />
            <img src={sixthSlide} alt="Slide 6" />
            <img src={seventhSlide} alt="Slide 7" />
            <img src={eighthSlide} alt="Slide 8" />
            <img src={ninthSlide} alt="Slide 9" />
            <img src={tenthSlide} alt="Slide 10" />
            <img src={eleventhSlide} alt="Slide 11" />
            <img src={twelfthSlide} alt="Slide 12" />
            <img src={thirteenthSlide} alt="Slide 13" />
            <img src={fourteenthSlide} alt="Slide 14" />
            <img src={fifteenthSlide} alt="Slide 15" />
            <img src={sixteenthSlide} alt="Slide 16" />
            <img src={seventeenthSlide} alt="Slide 17" />
            <img src={eighteenthSlide} alt="Slide 18" />
            <img src={nineteenthSlide} alt="Slide 19" />
          </div>
          <button className="carousel-arrow right" onClick={nextSlide}>&#9654;</button>  {/* Right arrow button */}

        </div>

        {/* Google Maps on the right */}
        <div className="google-maps">
          <LoadScript googleMapsApiKey="AIzaSyAEJ8aZV3BcwjS0xijFxxPngpRy9PBkoMk">
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={center}
              zoom={9.5}
            >
              <Circle center={center} options={circleOptions} />
            </GoogleMap>
          </LoadScript>
          <small>Address will be given when your sitting <br></br> payment has been confirmed but is Located <br></br> only minutes from Duke point ferry, Nanaimo <br></br> Airport and Nanaimo lakes and rivers.</small>
        </div>
      </div>

      <div className="mb-5">
        <h3 className="h5 mb-3">Boarding/Hikes</h3>
        <p>
          Life can be busy and complicated, which is why we offer
          a variety of services to make things easier on you and your furry
          family. From boarding, with plenty of love and attention, to fun hikes,
          we pride ourselves on our professional yet friendly approach. We do
          everything necessary to ensure your pets are safe, secure, and happy.
        </p>
        <p>
          Our large and energetic family have over 20 years of experience
           hosting "part-time family" dogs. We like to say that we are
          your dog's second best friends. The passion shines through in all we do.
        </p>
      </div>

      <Routes>
        <Route
          path="/"
          element={
            <>
              <RequestForm />
            </>
          }
        />
        <Route path="/payment/:requestId" element={<PaymentPage />} />
      </Routes>

      <div className="contact-info mt-5 mb-4">
        <h3 className="h5 mb-3">Contact Us</h3>
        <p>
          Email:{" "}
          <a href="mailto:Fortheloveofdogsboarding@gmail.com">
            Fortheloveofdogsboarding@gmail.com
          </a>
        </p>
        <p>
          Phone: <a href="tel:7786747053">778-674-7053</a>
        </p>
      </div>
    </div>
  );
}

export default App;

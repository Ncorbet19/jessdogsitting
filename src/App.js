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
  lat: 49.1659,
  lng: -123.9401, // Coordinates for Nanaimo
};

const circleOptions = {
  strokeColor: "#800080", // Purple color
  strokeOpacity: 0.8,
  strokeWeight: 2,
  fillColor: "#800080",
  fillOpacity: 0.35,
  center: center,
  radius: 5000, // This will create a circle around 5km, adjust as necessary
};

function App() {
  const [currentSlide, setCurrentSlide] = React.useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 9);
    }, 5000); // changes every 5 seconds

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
          for shade, dog pools, natural dens. Our house is their house and our priority
          is insuring comfort not just for your pet, but for you
          as well.
           Trust in us; your best friends are in excellent hands.
          Driven by a passion for animals and a deep understanding of quality
          pet care, we proudly serve our growing client base, always looking to
          expand and improve our service.
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
            $50/night <br /> per dog
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
          </div>
        </div>

        {/* Google Maps on the right */}
        <div className="google-maps">
          <LoadScript googleMapsApiKey="AIzaSyAEJ8aZV3BcwjS0xijFxxPngpRy9PBkoMk">
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={center}
              zoom={10}
            >
              <Circle center={center} options={circleOptions} />
            </GoogleMap>
          </LoadScript>
          <small>address will be given when your sitting <br></br> payment has been confirmed but is Located <br></br> only minutes from Duke point ferry, Nanaimo <br></br> Airport and Nanaimo lakes and rivers.</small>
        </div>
      </div>

      <div className="mb-5">
        <h3 className="h5 mb-3">Boarding/Hikes</h3>
        <p>
          Life can be busy and complicated, which is why we offer
          a variety of services to make things easier on you and your furry
          family. From boarding with plenty of love and attention to fun hikes,
          we pride ourselves on our professional yet friendly approach. We do
          everything necessary to ensure your pets are safe, secure, and happy.
        </p>
        <p>
          Our energetic family of 4 children, 2 dogs, chickens and cats have over 20 years of
          experience hosting "part-time family" dogs. We like to say that we are
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

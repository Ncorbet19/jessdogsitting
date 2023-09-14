import React, { useState, useEffect } from "react";
import { db } from "../config/firebaseConfig"; // Adjust the path to point to your firebaseConfig file
import { collection, addDoc, Timestamp } from "firebase/firestore";

function RequestForm() {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [details, setDetails] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [numPets, setNumPets] = useState("1");
  const [dogAge, setDogAge] = useState("");
  const [isVaccinated, setIsVaccinated] = useState(false);
  const [dogBreed, setDogBreed] = useState("Labrador");
  const [dogName, setDogName] = useState("");
  const [isSpayedOrNeutered, setIsSpayedOrNeutered] = useState(false);
  const currentDate = new Date().toISOString().slice(0, 16);
  const [dogBreeds, setDogBreeds] = useState([]);


  const [price, setPrice] = useState(0);

  useEffect(() => {
    calculatePrice();
  }, [start, end, numPets]);

  const calculatePrice = () => {
    if (start && end) {
      const startDate = new Date(start);
      const endDate = new Date(end);
      const nights = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
      const total = nights * parseInt(numPets) * 50;
      setPrice(total);
    } else {
      setPrice(0);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "requests"), {
        start: Timestamp.fromDate(new Date(start)),
        end: Timestamp.fromDate(new Date(end)),
        details: details,
        firstName: firstName,
        lastName: lastName,
        email: email,
        numPets: numPets,
        price: price,
        dogAge: dogAge,
        isVaccinated: isVaccinated,
        dogBreed: dogBreed,
        dogName: dogName,
        isSpayedOrNeutered: isSpayedOrNeutered,
      });
      console.log("Request added!");
      setStart("");
      setEnd("");
      setDetails("");
      setFirstName("");
      setLastName("");
      setEmail("");
      setNumPets("1");
      setPrice(0); // Reset price as well
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };
  return (
    <div className="container mt-5">
      <h3 className="h5">Request Form</h3>
      <p>
        If you'd like to avail of our services, please fill out the form below.
        Provide as much detail as possible, and we'll get back to you promptly
        to confirm your reservation.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <select
            value={numPets}
            onChange={(e) => setNumPets(e.target.value)}
            className="form-select"
          >
            <option value="1">1 Pet</option>
            <option value="2">2 Pets</option>
            <option value="3">3 Pets</option>
            <option value="4">4 Pets</option>
            <option value="5">5 Pets</option>
          </select>
        </div>
        <div className="mb-3">
          <input
            type="datetime-local"
            value={start}
            onChange={(e) => {
              if (end && new Date(e.target.value) > new Date(end)) {
                alert("Start time cannot be after the end time");
                return;
              }
              setStart(e.target.value);
            }}
            placeholder="Start Time"
            className="form-control"
            min={currentDate}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="datetime-local"
            value={end}
            onChange={(e) => {
              if (new Date(e.target.value) < new Date(start)) {
                alert("End time cannot be before the start time");
                return;
              }
              setEnd(e.target.value);
            }}
            placeholder="End Time"
            className="form-control"
            min={start || currentDate}
            required
          />
        </div>


        <div className="mb-3">
          <input
            type="text"
            value={dogName}
            onChange={(e) => setDogName(e.target.value)}
            placeholder="Dog Name(s)"
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="number"
            value={dogAge}
            onChange={(e) => {
              if (e.target.value >= 0) {
                setDogAge(e.target.value);
              }
            }}
            placeholder="Dog Age(s)"
            className="form-control"
            min="0"
            required
          />
        </div>

        <div className="mb-3">
          <textarea
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            placeholder="Details (Dog Breed(s), Dietary Restrictions, etc.)"
            className="form-control"
            required
          />
        </div>

        <div className="mb-3 d-flex align-items-center">
          <label className="me-2">Fully Vaccinated</label>
          <input
            type="checkbox"
            checked={isVaccinated}
            onChange={(e) => setIsVaccinated(e.target.checked)}
          />
        </div>

        <div className="mb-3 d-flex align-items-center">
          <label className="me-2">Spayed/Neutered</label>
          <input
            type="checkbox"
            checked={isSpayedOrNeutered}
            onChange={(e) => setIsSpayedOrNeutered(e.target.checked)}
          />
        </div>

        <p>Total Price: ${price}</p>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default RequestForm;

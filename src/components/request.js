import React, { useState, useEffect } from 'react';
import { db } from '../config/firebaseConfig';  // Adjust the path to point to your firebaseConfig file
import { collection, addDoc, Timestamp } from 'firebase/firestore';

function RequestForm() {
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [details, setDetails] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [numPets, setNumPets] = useState('1');

  const [price, setPrice] = useState(0);

  useEffect(() => {
    calculatePrice();
  }, [start, end, numPets]);

  const calculatePrice = () => {
    if (start && end) {
      const startDate = new Date(start);
      const endDate = new Date(end);
      const nights = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)); 
      const total = nights * parseInt(numPets) * 55; 
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
      });
      console.log('Request added!');
      setStart('');
      setEnd('');
      setDetails('');
      setFirstName('');
      setLastName('');
      setEmail('');
      setNumPets('1');
      setPrice(0); // Reset price as well
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };
  return (
    <div className="container mt-5">
  
    <h3 className="h5">Request Form</h3>
    <p>If you'd like to avail of our services, please fill out the form below. Provide as much detail as possible, and we'll get back to you promptly to confirm your reservation.</p>
  
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <input 
          type="text" 
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
          placeholder="First Name"
          className="form-control"
          required
        />
      </div>
      <div className="mb-3">
        <input 
          type="text" 
          value={lastName}
          onChange={e => setLastName(e.target.value)}
          placeholder="Last Name"
          className="form-control"
          required
        />
      </div>
      <div className="mb-3">
        <input 
          type="email" 
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
          className="form-control"
          required
        />
      </div>
      <div className="mb-3">
        <select 
          value={numPets}
          onChange={e => setNumPets(e.target.value)}
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
          onChange={e => setStart(e.target.value)}
          placeholder="Start Time"
          className="form-control"
          required
        />
      </div>
      <div className="mb-3">
        <input 
          type="datetime-local" 
          value={end}
          onChange={e => setEnd(e.target.value)}
          placeholder="End Time"
          className="form-control"
          required
        />
      </div>
      <div className="mb-3">
        <textarea 
          value={details}
          onChange={e => setDetails(e.target.value)}
          placeholder="Details"
          className="form-control"
          required
        />
      </div>
      <p>Total Price: ${price}</p>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  </div>
);
}

export default RequestForm;

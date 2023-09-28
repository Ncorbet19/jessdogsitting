import React, { useState, useEffect } from 'react';
import { db } from '../config/firebaseConfig';  // Adjust the path
import { collection, getDocs, query, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import './RequestsList.css';

function RequestsList() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const requestCollection = collection(db, "sittings");
      const requestQuery = query(requestCollection);
      const requestSnapshot = await getDocs(requestQuery);
      const requestData = requestSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setRequests(requestData);
    };

    fetchData();
  }, []);

  const togglePaymentStatus = async (request) => {
    const requestRef = doc(db, 'sittings', request.id);
    await updateDoc(requestRef, {
      paymentConfirmed: !request.paymentConfirmed
    });
    setRequests(prevRequests => prevRequests.map(r => r.id === request.id ? { ...r, paymentConfirmed: !r.paymentConfirmed } : r));
  };

  const handleDelete = async (id) => {
    const requestRef = doc(db, 'sittings', id);
    await deleteDoc(requestRef);
    setRequests(prevRequests => prevRequests.filter(r => r.id !== id));
  };

  return (
    <div className="container">
      <h2>Accepted Requests</h2>
      <div className="request-list">
        {requests.map(request => (
          <div key={request.id} className="request-card">
            <strong>Name:</strong> {request.firstName} {request.lastName} <br />
            <strong>Email:</strong> {request.email} <br />
            <strong>Number of Pets:</strong> {request.numPets} <br />
            <strong>Start:</strong> {new Date(request.start.seconds * 1000).toLocaleString()} <br />
            <strong>End:</strong> {new Date(request.end.seconds * 1000).toLocaleString()} <br />
            <strong>Details:</strong> {request.details || "No details provided"} <br />
            <strong>Fully Vaccinated:</strong> {request.isVaccinated ? "Yes" : "No"} <br />
            <strong>Dog Name:</strong> {request.dogName || "Not specified"} <br />
            <strong>Spayed/Neutered:</strong> {request.isSpayedOrNeutered ? "Yes" : "No"} <br />
            <strong>Price:</strong> {request.price} <br />
            <strong>Payment Confirmed:</strong> {request.paymentConfirmed ? "Yes" : "No"} 
            <div className="request-buttons">
              <button className="button" onClick={() => togglePaymentStatus(request)}>
                {request.paymentConfirmed ? "Unconfirm Payment" : "Confirm Payment"}
              </button>
              <button className="button delete-button" onClick={() => handleDelete(request.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );  
}

export default RequestsList;

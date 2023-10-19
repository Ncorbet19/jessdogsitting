import React, { useState, useEffect } from 'react';
import { db } from '../config/firebaseConfig';
import { collection, getDocs, query, doc, deleteDoc, addDoc, updateDoc } from 'firebase/firestore';
import './RequestsList.css';

function RequestsList() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const requestCollection = collection(db, "requests");
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


  const handleAccept = async (request) => {
    const userConfirmation = window.confirm("By clicking OK, you are accepting this request.");
    if (userConfirmation) {
        const { id, ...requestWithoutId } = request;

        const sittingData = {
          ...requestWithoutId,
          paymentConfirmed: false
        };

        // new code next 2 lines
        const requestRef = doc(db, "requests", id);
        await updateDoc(requestRef, { accepted: true });
    
        await addDoc(collection(db, "sittings"), requestWithoutId);
    
        await deleteDoc(doc(db, "requests", id));
    
        setRequests(prevRequests => prevRequests.filter(r => r.id !== id));
        
        window.location.reload();
      }
  };



  const handleReject = async (request) => {
    const userConfirmation = window.confirm("Are you sure you want to reject this request?");
    if (userConfirmation) {
      await deleteDoc(doc(db, "requests", request.id));
      setRequests(prevRequests => prevRequests.filter(r => r.id !== request.id));
      window.location.reload();
    }
  };
  

  return (
    <div className="container">
      <h2>New Requests</h2>
      {requests.map((request) => (
        <div key={request.id} className="request-card">
          <strong>Name:</strong> {request.firstName} {request.lastName} <br />
          <strong>Email:</strong> {request.email} <br />
          <strong>Number of Pets:</strong> {request.numPets} <br />
          <strong>Start:</strong> {new Date(request.start.seconds * 1000).toLocaleString()} <br />
          <strong>End:</strong> {new Date(request.end.seconds * 1000).toLocaleString()} <br />
          <strong>Details:</strong> {request.details || "No details provided"} <br />
          <strong>Dog Age:</strong> {request.dogAges ? request.dogAges.join(", ") : "Not specified"} <br />
          <strong>Fully Vaccinated:</strong> {request.isVaccinated ? "Yes" : "No"} <br />
          <strong>Dog Name:</strong> {request.dogName || "Not specified"} <br />
          <strong>Spayed/Neutered:</strong> {request.isSpayedOrNeutered ? "Yes" : "No"} <br />
          <strong>Price:</strong> {request.price} <br />
          <div className="request-buttons">
            <button className="button" onClick={() => handleAccept(request)}>
              Accept
            </button>
            <button className="button" onClick={() => handleReject(request)}>
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
  
}

export default RequestsList;

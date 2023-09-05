import React, { useState, useEffect } from 'react';
import { db } from '../config/firebaseConfig';  // Adjust the path
import { collection, getDocs, query } from 'firebase/firestore';

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

  return (
    <div>
      <h2>Accepted Requests</h2>
      <ul>
        {requests.map(request => (
          <li key={request.id}>
            <strong>Name:</strong> {request.firstName} {request.lastName} <br />
            <strong>Email:</strong> {request.email} <br />
            <strong>Number of Pets:</strong> {request.numPets} <br />
            <strong>Start:</strong> {new Date(request.start.seconds * 1000).toLocaleString()} <br />
            <strong>End:</strong> {new Date(request.end.seconds * 1000).toLocaleString()} <br />
            <strong>Details:</strong> {request.details || "No details provided"} <br />
            <strong>Price:</strong> {request.price} <br />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RequestsList;

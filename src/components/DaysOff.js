import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { collection, addDoc, onSnapshot, doc, deleteDoc, Timestamp, serverTimestamp } from 'firebase/firestore'; 
import { db } from '../config/firebaseConfig';
import './DaysOff.css';

function DaysOff() {
    const [subject, setSubject] = useState('');
    const [selectedDate, setSelectedDate] = useState([null, null]);
    const [allDaysOff, setAllDaysOff] = useState([]);
  
    const handleChange = (dates) => {
      const [startDate, endDate] = dates;
      setSelectedDate([startDate, endDate]);
    };
  
    const handleSubmit = async () => {
      const docData = {
        subject,
        daysOff: [selectedDate[0].toISOString(), selectedDate[1].toISOString()],
      };
      try {
        await addDoc(collection(db, 'DaysOff'), docData);
        console.log('Days off added!');
      } catch (error) {
        console.error('Error adding document: ', error);
      }
    };
  
    useEffect(() => {
      const unsubscribe = onSnapshot(collection(db, 'DaysOff'), (snapshot) => {
        setAllDaysOff(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
      });
      return unsubscribe; // Cleanup subscription on unmount
    }, []);

    async function handleDelete(id) {
        const docRef = doc(db, 'DaysOff', id);
        try {
          await deleteDoc(docRef);
          console.log('Document deleted');
        } catch (error) {
          console.error('Error deleting document: ', error);
        }
      }

      function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
      }
      
      

  return (
    <div className="daysOffCard">
    <div className="daysOffContainer">
      <div className="daysOffListSection">
        <h1>Select Days Off</h1>
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Subject"
          required
        />
        <DatePicker
          selected={selectedDate[0]}
          onChange={handleChange}
          selectsRange
          inline
          startDate={selectedDate[0]}
          endDate={selectedDate[1]}
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>
      <div className="daysOffDaysOffList">
        {allDaysOff.map((dayOff, index) => (
          <div key={index} className="daysOffDayOffItem">
            <h3>Subject: {dayOff.subject}</h3>
            <p>        Days Off: {formatDate(dayOff.daysOff[0])} to {formatDate(dayOff.daysOff[1])}</p>
            <button onClick={() => handleDelete(dayOff.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}

export default DaysOff;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';

function PaymentPage() {
    const { requestId } = useParams();
    const [price, setPrice] = useState(null);

    useEffect(() => {
        async function fetchPrice() {
            const requestDoc = doc(db, 'sittings', requestId);
            const requestSnapshot = await getDoc(requestDoc);

            if (requestSnapshot.exists()) {
                setPrice(requestSnapshot.data().price);
            } else {
                console.error("Document doesn't exist!");
            }
        }

        fetchPrice();
    }, [requestId]);

    return (
        <div className="container mt-5">
            <h3>Payment Page</h3>
            <p>Total Price: ${price}</p>
            <div>
                {/* Temporary card form */}
                <input placeholder="Card Number" />
                <input placeholder="CVV" />
                <input type="date" placeholder="Expiry Date" />
                <button className="btn btn-primary">Pay ${price}</button>
            </div>
        </div>
    );
}

export default PaymentPage;




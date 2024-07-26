import React, { useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutPayment from './CheckoutPayment';
import { useLocation, Navigate } from 'react-router-dom';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE);

const Payment = () => {
    const location = useLocation();
    const price = location?.state?.price;
    const cartItm = location.state?.itemId;

    if (!price) {
        return <Navigate to="/dashboard/my-selected" />;
    }

    return (
        <div className='my-40 stripe-custom-class'>
            <Elements stripe={stripePromise}>
                <CheckoutPayment price={price} cartItm={cartItm} />
            </Elements>
        </div>
    );
}

export default Payment;

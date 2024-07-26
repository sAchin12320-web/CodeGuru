import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import useUser from '../../../../hooks/useUser';
import { Navigate, useNavigate } from 'react-router-dom';

const CheckoutPayment = ({ price, cartItm }) => {
    const URL = `http://localhost:3000/payment-info${cartItm ? `?classId=${cartItm}` : ''}`;
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const { currentUser } = useUser();
    const [clientSecret, setClientSecret] = useState('');
    const [succeeded, setSucceeded] = useState('');
    const [message, setMessage] = useState('');
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();

    if (!price || price < 0) {
        return <Navigate to="/dashboard/my-selected" replace />;
    }

    useEffect(() => {
        let isMounted = true;

        const fetchClientSecret = async () => {
            try {
                const response = await axiosSecure.post('/create-payment-intent', { price });
                if (isMounted) {
                    setClientSecret(response.data.clientSecret);
                }
            } catch (error) {
                console.error('Error fetching clientSecret:', error);
            }
        };

        fetchClientSecret();

        return () => {
            isMounted = false;
        };
    }, [axiosSecure, price]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setMessage('');
        if (!stripe || !elements || !clientSecret) {
            return;
        }

        try {
            const { error, paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card: elements.getElement(CardElement),
                billing_details: {
                    name: currentUser?.name || 'unknown',
                    email: currentUser?.email || 'anonymous',
                },
            });

            if (error) {
                console.error('Error creating payment method:', error);
                setMessage(error.message);
                return;
            }

            const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: {
                        name: currentUser?.name || 'unknown',
                        email: currentUser?.email || 'anonymous',
                    },
                },
            });

            if (confirmError) {
                console.error('Error confirming payment:', confirmError);
                setMessage(confirmError.message);
            } else {
                console.log('Payment successful:', paymentIntent);
                if (paymentIntent.status === 'succeeded') {
                    const transactionId = paymentIntent.id;
                    const paymentMethod = paymentIntent.payment_method;
                    const amount = paymentIntent.amount / 100;
                    const currency = paymentIntent.currency;
                    const paymentStatus = paymentIntent.status;
                    const userName = currentUser?.name;
                    const email = currentUser?.email;

                    const data = {
                        transactionId,
                        paymentMethod,
                        amount,
                        currency,
                        paymentStatus,
                        userName,
                        email,
                        classesId: cartItm ? [cartItm] : cart,
                        date: new Date(),
                    };
                    fetch(URL, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            authorization: `Bearer ${localStorage.getItem('token')}`,
                        },
                        body: JSON.stringify(data),
                    })
                        .then((res) => res.json())
                        .then((res) => {
                            console.log(res);
                            if (res.deletedResult.deletedCount > 0 && res.paymentResult.insertedId && res.updatedResult.modifiedCount > 0) {
                                setSucceeded('Payment Successful, You can now access course');
                                navigate('/dashboard/enrolled-class');
                            } else {
                                setSucceeded('PaymentFailed!, please try again...');
                            }
                        })
                        .catch((err) => console.error('Error submitting payment info:', err));
                }
            }
        } catch (error) {
            console.error('Unexpected error:', error);
            setMessage(error.message);
        }
    };

    useEffect(() => {
        if (currentUser?.email) {
            axiosSecure.get(`/cart/${currentUser.email}`)
                .then((res) => {
                    const classesId = res.data.map(item => item._id);
                    setCart(classesId);
                })
                .catch((err) => console.error('Error fetching cart items:', err));
        }
    }, [currentUser, axiosSecure]);

    return (
        <>
            <div className="text-center mb-6">
                <h1 className="text-2xl font-bold">
                    Payment Amount: <span className="text-secondary">${price}</span>
                </h1>
            </div>
            <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
                <CardElement options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }} className="mb-4" />
                <button
                    id="btn"
                    type="submit"
                    disabled={!stripe || !clientSecret}
                    className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
                >
                    Pay
                </button>
                {message && <p className="text-red-500 mt-2">{message}</p>}
                {succeeded && <p className="text-green-500 mt-2">{succeeded}</p>}
            </form>
        </>
    );
};

export default CheckoutPayment;

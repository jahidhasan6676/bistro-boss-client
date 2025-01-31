import React, { useState } from 'react';
import SectionTitle from '../../../components/section-title/SectionTitle';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckOutForm from './CheckOutForm';
import SslPayment from './SslPayment';



const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);

const Payment = () => {
    const [paymentValue, setPaymentValue] = useState('strip')
    
    return (
        <div>
            <SectionTitle heading="Payment" subHeading="Please pay to eat"></SectionTitle>

            <div className='py-10'> 
                <select value={paymentValue} onChange={(e)=>setPaymentValue(e.target.value)} className="select select-bordered w-full max-w-xs" >
                    <option value="strip">Strip</option>
                    <option value="SSL">SSL Commerce</option>
                </select>
            </div>
            {
                paymentValue === 'strip' && <div>
                <Elements stripe={stripePromise}>
                    <CheckOutForm />
                </Elements>
            </div>
            }
            {
                paymentValue === 'SSL' && <SslPayment/>
            }
        </div>
    );
};

export default Payment;
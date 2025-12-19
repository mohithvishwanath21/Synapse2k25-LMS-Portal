// import 'dotenv/config'
// import Razorpay from "razorpay";
// import crypto from 'crypto'

// const razorpay = new Razorpay({
//     key_id : process.env.RAZORPAY_KEY_ID,
//     key_secret : process.env.RAZORPAY_SECRET_KEY
// })

// export const razorpayOrder = async(finalPrice) => {
    
//     try {
//         const razorpayOrder = await razorpay.orders.create({
//             amount : finalPrice * 100,
//             currency : 'INR',
//             receipt : `order_${Date.now()}`,
//             payment_capture : 1
//         })

//         return razorpayOrder
        
//     } catch (error) {
//         console.log('error creating order id');
//         throw new Error(error.message)
//     }

// }

// export const generateSignature = (razorpay_order_id, razorpay_payment_id) => {
//     return crypto
//         .createHmac("sha256", process.env.RAZORPAY_SECRET_KEY) 
//         .update(`${razorpay_order_id}|${razorpay_payment_id}`)
//         .digest("hex");
// }

import 'dotenv/config';
import Razorpay from 'razorpay';
import crypto from 'crypto';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET_KEY,
});

export const razorpayOrder = async (finalPrice) => {
  try {
    console.log('Final price (INR):', finalPrice);
console.log('Amount in paise:', Math.round(finalPrice * 100));

    console.log('✅ Creating Razorpay order...');
    console.log('RAZORPAY_KEY_ID:', process.env.RAZORPAY_KEY_ID);
    console.log('RAZORPAY_SECRET_KEY:', process.env.RAZORPAY_SECRET_KEY ? 'Loaded ✅' : '❌ Missing!');

    const order = await razorpay.orders.create({
      amount: Math.round(finalPrice * 100), // in paise
      currency: 'INR',
      receipt: `order_${Date.now()}`,
      payment_capture: 1,
    });

    console.log('✅ Razorpay order created:', order.id);
    return order;
  } catch (error) {
  console.error('❌ Error creating order id:');
  console.error(error); // 👈 this logs the full object, not just message
  throw new Error(error.message || 'Unknown Razorpay error');
}

};

export const generateSignature = (razorpay_order_id, razorpay_payment_id) => {
  return crypto
    .createHmac('sha256', process.env.RAZORPAY_SECRET_KEY)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest('hex');
};

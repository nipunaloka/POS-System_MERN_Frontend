import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { getTotalPrice } from '../../redux/slices/cartSlice';
import { enqueueSnackbar } from 'notistack';
import { createOrderStripe } from '../../http';

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = src;

    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);

    document.body.appendChild(script);
  });
}

export const BillInfo = () => {
  const customerData = useSelector((state) => state.customerData);
  const cartData = useSelector((state) => state.cart);
  const total = useSelector(getTotalPrice);
  const taxRate = 4.25;
  const tax = (total * taxRate) / 100;
  const totalPriceWithTax = total + tax;

  const [paymentMethod, setPaymentMethod] = useState();
  const [showInvoice, setShowInvice ] = useState();

  const handlePlaceOrder = async () => {
    if (!paymentMethod) {
      enqueueSnackbar('Please select a Payment Method!', { variant: 'warning' });
      return;
    }

    if(paymentMethod === 'Online'){
      try {
        // Load the Stripe checkout script
        const res = await loadScript('https://checkout.stripe.com/checkout.js');
  
        if (!res) {
          enqueueSnackbar('Stripe SDK failed to load. Are you online?', {
            variant: 'warning',
          });
          return;
        }
  
        const reqData = {
          amount: totalPriceWithTax.toFixed(2), // Amount with tax
        };
  
        // Create order and get checkout URL
        const { data } = await createOrderStripe(reqData);
  
        // Ensure checkout URL is present in response
        if (data.checkoutUrl) {
          const stripe = window.Stripe('your-stripe-public-key'); // Replace with your public key
          stripe.redirectToCheckout({ sessionId: data.checkoutUrl }).then((result) => {
            if (result.error) {
              enqueueSnackbar(result.error.message, { variant: 'error' });
            }
          });
        } else {
          enqueueSnackbar('Error with Stripe Checkout URL', { variant: 'error' });
        }
      } catch (error) {
        console.log(error);
        enqueueSnackbar('Payment Failed!', { variant: 'error' });
      }
    }else {
      // Place the order
      const orderData = {
        customerDetails: {
          name: customerData.customerName,
          phone: customerData.customerPhone,
          guests: customerData.guests,
        },
        orderStatus: "In Progress",
        bills: {
          total: total,
          tax: tax,
          totalWithTax: totalPriceWithTax,
        },
        items: cartData,
        table: customerData.table.tableId,
        paymentMethod: paymentMethod,
      };
      orderMutation.mutate(orderData);
    }
  };

  

  return (
    <>
      <div className='flex items-center justify-between px-5 mt-2 '>
        <p className='text-xs text-[#ababab] font-medium mt-2'>Total</p>
        <h1 className='text-[#f5f5f5] text-md font-bold'>LKR {total.toFixed(2)}</h1>
      </div>
      <div className='flex items-center justify-between px-5 mt-2'>
        <p className='text-xs text-[#ababab] font-medium mt-2'>Tax (4.25%)</p>
        <h1 className='text-[#f5f5f5] text-md font-bold'>LKR {tax.toFixed(2)}</h1>
      </div>
      <div className='flex items-center justify-between px-5 mt-2'>
        <p className='text-xs text-[#ababab] font-medium mt-2'>Net Price</p>
        <h1 className='text-[#f5f5f5] text-md font-bold'>LKR {totalPriceWithTax.toFixed(2)}</h1>
      </div>
      <div className='flex items-center gap-2 px-5 mt-4'>
        <button
          onClick={() => setPaymentMethod('Cash')}
          className={`bg-[#1f1f1f] px-4 py-1 w-full rounded-lg text-[#ababab] font-semibold ${
            paymentMethod === 'Cash' ? 'bg-[#383737]' : ''
          }`}
        >
          Cash
        </button>
        <button
          onClick={() => setPaymentMethod('Online')}
          className={`bg-[#1f1f1f] px-4 py-1 w-full rounded-lg text-[#ababab] font-semibold ${
            paymentMethod === 'Online' ? 'bg-[#383737]' : ''
          }`}
        >
          Online
        </button>
      </div>
      <div className='flex items-center gap-2 px-5 mt-4'>
        <button className='bg-[#1018b1] px-4 py-2 w-full rounded-lg text-[#ababab] font-semibold text-m'>
          Print Receipt
        </button>
        <button
          onClick={handlePlaceOrder}
          className='bg-[#f6b100] px-4 py-2 w-full rounded-lg text-[#1f1f1f] font-semibold text-m'
        >
          Place Order
        </button>
      </div>
    </>
  );
};

/* eslint-disable react/prop-types */
import React, { useRef, useEffect } from "react";

const Paypal = ({ setIsPayedError, setIsCheckout }) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const paypal = useRef();

  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions, err) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: "ORDER",
                amount: {
                  currency_code: "CAD",
                  value:`${user.totalPrice}`, 
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          try {
            const order = await actions.order.capture();
            if(order){
              setIsPayedError(false);
              setIsCheckout(false);
              console.log("Payment successful:", order);
            }
          } catch (error) {
            setTimeout(()=>{
              setIsCheckout(false);
              setIsPayedError(true);
            },1000)

            console.error("Payment error:", error);
          }
        },
        onError: (err) => {
          setIsCheckout(false);
          setIsPayedError(true);
          console.error("PayPal error:", err);
        },
      })
      .render(paypal.current);
  }, []);

  return <div ref={paypal}></div>;
};

export default Paypal;

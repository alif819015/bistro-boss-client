import { loadStripe } from "@stripe/stripe-js";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckOutForm";
import useCart from "../../../hooks/useCart";

// TODO: provide publishable key
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_pk)
console.log(import.meta.env.VITE_Payment_Gateway_pk)
const Payment = () => {
    const [ cart] = useCart();
    const total = cart.reduce((sum,item)=> sum + item.price, 0);
    console.log(total)
    const price = parseFloat(total?.toFixed(2))
    return (
        <div className="w-full min-h-full">
            <SectionTitle subHeading='Please Provide' heading='Payment'></SectionTitle> 
          <Elements stripe={stripePromise}>
            <CheckoutForm cart={cart} price={price}></CheckoutForm>
          </Elements>
        </div>
    );
};

export default Payment;
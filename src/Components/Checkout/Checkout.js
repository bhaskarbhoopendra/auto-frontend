import { useState } from "react";
import "./Checkout.css";
import Layout from "../../layout/Layout";
import {
  useClearCartMutation,
  useGetCartMutation,
} from "../../features/cartSlice";
import { useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useUpdateCartItemMutation } from "../../features/cartSlice";
import { useRemoveFromCartMutation } from "../../features/cartSlice";
import { formatCurrency } from "../../util/currencyFormatter";
import Modal from "../Modal/Modal";
import { useNavigate } from "react-router-dom";

const stripePromise = loadStripe(
  "pk_test_51QQPLaSJVNOYVjCcGHn6Jo62Za46h9aausnZmbNbF1ruRRmrNT5JFBK6hljpE4zPeAXLqqQgDWvVadamMGemA8Z300eEUNR2Vs"
);

export default function CheckoutForm() {
  const [email, setEmail] = useState("email@gmail.com");
  const [subscribeNewsletter, setSubscribeNewsletter] = useState(false);
  const [deliveryMethod, setDeliveryMethod] = useState("ship");
  const [showCardElement, setShowCardElement] = useState(false);
  const [updateCartItem, { isLoading: isUpdating, error: updateError }] =
    useUpdateCartItemMutation();
  const [removeFromCart] = useRemoveFromCartMutation();
  const [clearCart] = useClearCartMutation();

  const user = JSON.parse(localStorage.getItem("user"));

  const userId = user?.id;
  const [getCart, { data: cartData, isLoading, error }] = useGetCartMutation();
  const [isModelOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();

  const cardStyle = {
    base: {
      iconColor: "#c4f0ff",
      color: "#32325d",
      lineHeight: "24px",
      fontWeight: 400,
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
    complete: {
      color: "#4caf50",
      iconColor: "#4caf50",
    },
  };

  const toggleDialog = () => {
    setIsDialogOpen(!isModelOpen);
  };

  useEffect(() => {
    if (userId) {
      getCart(userId);
    }
  }, [userId]);

  // State for Stripe Elements
  const stripe = useStripe();
  const elements = useElements();
  const handleLoginClick = () => {
    navigate("/login"); // Redirect to login page
  };

  const handleContinueToShipping = () => {
    if (!user) {
      handleLoginClick();
    }
    toggleDialog();
    setShowCardElement(true); // Show CardElement
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet
      return;
    }

    // Create a payment method
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
      billing_details: {
        email: user.email,
        name: `${user.firstName} ${user.lastName}`, // Ensure this is the exact name on the card
        phone: "+91 9876543210", // Optional but recommended for India (add your phone number)
        address: {
          line1: "123 Main Street", // Include the street address
          city: "New Delhi", // Include the city
          state: "Delhi", // Include the state
          postal_code: "110001", // Postal code (ZIP)
          country: "IN", // Country code for India
        },
      },
    });

    if (error) {
      console.error("Payment Error: ", error);
      alert(error.message);
      return;
    }

    // Call your server to create a payment intent and confirm the payment
    const response = await fetch(
      "http://localhost:3000/api/products/create-payment",
      {
        method: "POST",
        body: JSON.stringify({
          payment_method: paymentMethod.id,
          amount: subtotal, // amount in cents
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const { clientSecret } = await response.json();

    // Confirm the payment with the client secret returned from your backend
    const { error: confirmError, paymentIntent } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id,
      });

    if (confirmError) {
      console.error("Payment Confirmation Error: ", confirmError);
      alert(confirmError.message);
      return;
    }
    const payload = {
      userId,
    };
    await clearCart(payload).unwrap();
    toggleDialog();
    getCart(userId);
    navigate("/");
    // Payment successful
    alert("Payment successful!");
  };

  const subtotal = cartData?.cart?.items?.reduce(
    (sum, item) => sum + item?.product?.price * item.quantity,
    0
  );
  const shipping = 5.0;
  const total = subtotal ?? 0 + shipping;

  const handleQuantityChange = async (itemId, change) => {
    console.log({ itemId });
    const item = cartData?.cart?.items.find(
      (item) => item?.product?._id === itemId
    );
    if (item) {
      const updatedQuantity = item.quantity + change;

      if (updatedQuantity < 1) {
        return; // Don't allow quantity to go below 1
      }

      const updatedItem = {
        userId,
        productId: item?.product._id,
        quantity: updatedQuantity,
      };

      try {
        await updateCartItem(updatedItem).unwrap();
        getCart(userId); // Refetch cart data after update
      } catch (err) {
        console.error("Error updating item:", err);
      }
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
      const payload = {
        productId,
        userId,
      };
      await removeFromCart(payload).unwrap();
      getCart(userId); // Refetch the cart after removal
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };
  console.log({ cartData });
  return (
    <Layout>
      <div className="checkout-container">
        <div className="form-section">
          <div className="header-actions">
            <h2 className="section-title">Contact Information</h2>
          </div>

          <div className="form-group">
            <label htmlFor="email">Contact</label>
            <input
              type="email"
              id="email"
              value={user.email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "flex-start",
            }}
          >
            <input
              type="checkbox"
              id="newsletter"
              checked={subscribeNewsletter}
              onChange={(e) => setSubscribeNewsletter(e.target.checked)}
            />
            <label htmlFor="newsletter">
              Yes, I want subscribe to newsletter now
            </label>
          </div> */}

          {/* <h2 className="section-title">Delivery Method</h2>
          <div className="delivery-options">
            <div className="checkbox-group">
              <input
                type="radio"
                id="ship"
                name="delivery"
                value="ship"
                checked={deliveryMethod === "ship"}
                onChange={(e) => setDeliveryMethod(e.target.value)}
              />
              <label htmlFor="ship">Ship</label>
            </div>
            <div className="checkbox-group">
              <input
                type="radio"
                id="pickup"
                name="delivery"
                value="pickup"
                checked={deliveryMethod === "pickup"}
                onChange={(e) => setDeliveryMethod(e.target.value)}
              />
              <label htmlFor="pickup">Pick Up</label>
            </div>
          </div> */}

          {/* <h2 className="section-title">Shipping Address</h2>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input type="text" id="address" defaultValue="" />
          </div>

          <div className="form-group">
            <label htmlFor="country">Country</label>
            <input type="text" id="country" defaultValue="" />
          </div> */}

          <div className="form-group">
            <label htmlFor="street">Address</label>
            <input type="text" id="street" />
          </div>

          <div className="form-group">
            <div style={{ display: "flex", gap: "20px" }}>
              <div style={{ flex: 1 }}>
                <label htmlFor="city">City</label>
                <input type="text" id="city" />
              </div>
              <div style={{ flex: 1 }}>
                <label htmlFor="postal">Postal Code</label>
                <input type="text" id="postal" />
              </div>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input type="text" id="phone" />
          </div>

          {/* <div className="checkbox-group">
            <input type="checkbox" id="recipient" />
            <label htmlFor="recipient">The recipient is not me</label>
          </div> */}

          <button
            onClick={() => handleContinueToShipping()}
            className="submit-button"
          >
            Continue To Shipping
          </button>
        </div>

        <div className="order-summary">
          <h2 className="section-title">Your order</h2>
          {cartData?.cart?.items?.map((item) => (
            <div key={item.id} className="order-item">
              <img
                src={item?.product?.images[0]}
                alt={item.name}
                className="item-image"
              />
              <div className="item-details">
                <div className="item-title">{item.name}</div>
                <div className="item-price">
                  {formatCurrency(item?.product?.price)}
                </div>
              </div>
              <div className="quantity-controls">
                <button
                  className="quantity-button"
                  onClick={() => handleQuantityChange(item?.product?._id, -1)}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  className="quantity-button"
                  onClick={() => handleQuantityChange(item?.product?._id, 1)}
                >
                  +
                </button>
                <button
                  className="quantity-button"
                  onClick={() => handleRemoveItem(item?.product?._id)}
                >
                  ×
                </button>
              </div>
            </div>
          ))}

          <div className="order-summary-footer">
            <div className="summary-row">
              <span>SUBTOTAL</span>
              <span>{formatCurrency(subtotal ?? 0)}</span>
            </div>
            <div className="summary-row">
              <span>SHIPPING</span>
              <span>{formatCurrency(shipping)}</span>
            </div>
            <div className="summary-row total-row">
              <span>ESTIMATED TOTAL</span>
              <span>{formatCurrency(total ?? 0)}</span>
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={isModelOpen}
        onClose={() => toggleDialog()}
        title={"Complete Payment"}
      >
        {showCardElement && (
          <form onSubmit={(e) => handleSubmit(e)}>
            <CardElement options={{ style: cardStyle }} />
            <button
              style={{ marginTop: "40px" }}
              className="submit-button"
              type="submit"
              disabled={!stripe || isLoading}
            >
              Pay Now
            </button>
          </form>
        )}
      </Modal>
    </Layout>
  );
}

export function CheckoutPage() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}

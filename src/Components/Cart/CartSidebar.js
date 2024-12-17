import { useState } from "react";
import { Gift } from "lucide-react";
import "./CartSidebar.css";
import {
  selectCartItems,
  selectIsCartOpen,
  removeItem,
  incrementQuantity,
  decrementQuantity,
  toggleCart,
  // setCartItems,
} from "../../store/cartSlice";
import { useGetCartMutation } from "../../features/cartSlice";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useUpdateCartItemMutation } from "../../features/cartSlice";
import { useRemoveFromCartMutation } from "../../features/cartSlice";
import { formatCurrency } from "../../util/currencyFormatter";

export default function CartSidebar() {
  const isCartOpen = useSelector(selectIsCartOpen);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const userId = user?.id;
  const [getCart, { data: cartData, isLoading, error }] = useGetCartMutation();
  const [updateCartItem, { isLoading: isUpdating, error: updateError }] =
    useUpdateCartItemMutation();
  const [removeFromCart] = useRemoveFromCartMutation();

  useEffect(() => {
    if (isCartOpen && userId) {
      getCart(userId);
    }
  }, [isCartOpen, userId, getCart]);

  const handleClose = () => {
    dispatch(toggleCart());
  };

  const handleCheckout = () => {
    navigate("/checkout"); // Navigate to checkout page
    dispatch(toggleCart()); // Close the cart sidebar
  };

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

  const [samples, setSamples] = useState([
    {
      id: 1,
      name: "Lorem Ipsum Dolor Sit The Leve",
      image: "/placeholder.svg",
      selected: false,
    },
    {
      id: 2,
      name: "Lorem Ipsum Dolor Sit The Leve",
      image: "/placeholder.svg",
      selected: false,
    },
    {
      id: 3,
      name: "Lorem Ipsum Dolor Sit The Leve",
      image: "/placeholder.svg",
      selected: false,
    },
  ]);

  const toggleSample = (id) => {
    const selectedCount = samples.filter((s) => s.selected).length;
    setSamples((currentSamples) =>
      currentSamples.map((sample) => {
        if (sample.id === id) {
          if (!sample.selected && selectedCount >= 2) return sample;
          return { ...sample, selected: !sample.selected };
        }
        return sample;
      })
    );
  };

  const subtotal = cartData?.cart?.items?.reduce(
    (sum, item) => sum + item?.product?.price * item.quantity,
    0
  );

  if (!isCartOpen) {
    return null; // Do not render the sidebar if it's not open
  }

  return (
    <div className="cart-sidebar">
      <div className="cart-header">
        <h2 className="cart-title">CART</h2>
        <button onClick={() => handleClose()} className="close-button">
          ×
        </button>
      </div>

      <div className="cart-items">
        {cartData?.cart?.items?.length === 0 ? (
          <p>Your cart is empty.</p> // Message when the cart is empty
        ) : (
          cartData?.cart?.items.map((item) => (
            <div key={item.id} className="cart-item">
              <img
                src={item?.product?.images[0]}
                alt={item.name}
                className="item-image"
              />
              <div className="item-details">
                <div className="item-name">{item?.product?.name}</div>
                <div className="item-price">
                  {formatCurrency(item?.product?.price)}
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
            </div>
          ))
        )}
      </div>

      {/* <div className="samples-section">
        <div className="samples-header">
          <Gift className="samples-icon" size={20} />
          Pick 2 Free Samples with every order!
        </div>
        <div className="samples-grid">
          {samples.map((sample) => (
            <div key={sample.id} className="sample-item">
              <img
                src={sample.image}
                alt={sample.name}
                className="sample-image"
              />
              <button
                className="add-sample-button"
                onClick={() => toggleSample(sample.id)}
              >
                {sample.selected ? "REMOVE" : "ADD"}
              </button>
              <div className="sample-name">{sample.name}</div>
            </div>
          ))}
        </div>
        <div className="sample-dots">
          <div className="dot active" />
          <div className="dot" />
          <div className="dot" />
        </div>
      </div> */}

      <div className="cart-footer">
        <div className="subtotal">
          <span>SUBTOTAL</span>
          <span> {formatCurrency(subtotal ?? 0)}</span>
        </div>
        <button onClick={handleCheckout} className="checkout-button">
          Check Out
        </button>
      </div>
    </div>
  );
}

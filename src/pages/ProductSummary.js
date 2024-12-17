import { useState } from "react";
import { Star, Heart, ChevronDown } from "lucide-react";
import "./ProductSummary.css";
import Layout from "../layout/Layout";
import { useGetProductByIdQuery } from "../features/ProductSlice";
import { useAddToCartMutation } from "../features/cartSlice";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { selectIsCartOpen, toggleCart } from "../store/cartSlice";
import { formatCurrency } from "../util/currencyFormatter";

export default function ProductSummaryPage() {
  const { productId } = useParams(); // Extract the product ID from the URL
  const dispatch = useDispatch();
  const [mainImage, setMainImage] = useState(""); // For handling the main image
  const [selectedImage, setSelectedImage] = useState(0);
  const [sections, setSections] = useState({
    description: true,
    features: false,
    brand: false,
  });
  const user = JSON.parse(localStorage.getItem("user"));

  const userId = user?.id;
  const navigate = useNavigate();

  // Fetch product data using RTK query
  const { data, isLoading, error } = useGetProductByIdQuery(productId);
  const [addToCart] = useAddToCartMutation();

  // Set the main image to the first image when the data is fetched
  useEffect(() => {
    if (data && data.images.length > 0) {
      setMainImage(data.images[0]); // Set the first image as the main image by default
    }
  }, [data]);
  const handleImageClick = (image) => {
    setMainImage(image);
    setSelectedImage(image);
  };

  const handleAddToCart = async (product) => {
    console.log({ product });
    if (!user) {
      navigate("/login");
      return;
    }
    const productId = product._id;
    const quantity = 1;
    await addToCart({ productId, quantity, userId });

    dispatch(toggleCart());
  };

  if (isLoading) return <div>Loading...</div>;

  // Handle error state if the product is not found or there is any other error
  if (error) return <div>Error loading product. Please try again.</div>;

  const toggleSection = (section) => {
    setSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <Layout>
      <div className="product-container">
        <div className="product-images">
          <img src={mainImage} alt="Product view" className="main-image" />
          <div className="thumbnail-container">
            {data?.images?.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className={`thumbnail ${
                  selectedImage === index ? "active" : ""
                }`}
                onClick={() => handleImageClick(image)}
              />
            ))}
          </div>
        </div>
        <div className="summary-container">
          <div className="product-info">
            <h1 className="product-title">{data?.name}</h1>

            <div className="rating-container">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="#9333ea" />
                ))}
              </div>
              <span className="reviews">5 reviews</span>
            </div>

            <div className="price">{formatCurrency(data.price)}</div>

            <p className="description">
              {data?.description
                ? data?.description
                : ` It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has a more-or-less normal
              distribution of letters, as opposed to using 'Content here,
              content here'.`}
            </p>

            <div className="vehicle-compatibility">
              {/* <div className="compatibility-title">Vehicle compatibility</div> */}
              <div className="compatibility-models">
                {/* Boxer BM 150 · Active Rg · Drynees */}
              </div>
            </div>

            <div className="actions">
              <button
                onClick={() => handleAddToCart(data)}
                className="add-to-cart"
              >
                Add To Cart
              </button>
              <button className="wishlist-btn">
                <Heart size={20} />
              </button>
            </div>

            <div className="info-section">
              <div
                className="info-header"
                onClick={() => toggleSection("description")}
              >
                <span className="info-title">DESCRIPTION</span>
                <ChevronDown size={20} />
              </div>
              {sections.description && (
                <div className="info-content">
                  {data?.description}
                  <div className="product-info"></div>
                </div>
              )}
            </div>

            <div className="info-section">
              <div
                className="info-header"
                onClick={() => toggleSection("features")}
              >
                <span className="info-title">SPECIAL FEATURES</span>
                <ChevronDown size={20} />
              </div>
              {sections.features && (
                <div className="info-content">{data?.specialFeatures}</div>
              )}
            </div>

            <div className="info-section">
              <div
                className="info-header"
                onClick={() => toggleSection("brand")}
              >
                <span className="info-title">BRAND INFO</span>
                <ChevronDown size={20} />
              </div>
              {sections.brand && (
                <div className="info-content">
                  Brand information content goes here
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

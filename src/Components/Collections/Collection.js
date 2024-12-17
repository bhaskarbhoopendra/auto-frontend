import React, { useEffect, useState } from 'react';
import './Collection.css';
import Banner from '../Banner/Banner';
import Navbar1 from '../Nav1/Navbar';
import Navbar2 from '../Nav2/Navbar';
import Footer from '../Footer/Footer';
import { useParams, useNavigate } from 'react-router-dom';

const Collection = () => {
  const { dataKey } = useParams();
  const navigate = useNavigate();
  const [items, setItems] = useState([
    { id: 1, imgSrc: 'path/to/essence_mascara.jpg', text: 'Essence Mascara Lash Princess', url: 'https://dummyjson.com/products' },
    { id: 2, imgSrc: 'path/to/eyeshadow_palette.jpg', text: 'Eyeshadow Palette with Mirror', url: 'https://dummyjson.com/carts' },
    { id: 3, imgSrc: 'path/to/eyeliner.jpg', text: 'bajaj tyre' , url: 'https://dummyjson.com/products'},
    // Add other items here
  ]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Banner />
      <Navbar1 />
      <Navbar2 />
      <div style={{ marginTop: "15px" }}>
        <p style={{ textAlign: "left", paddingLeft: "50px" }}>
          <a href="/" style={{ textDecoration: "none", color: "black" }}>Home</a> &gt; All collections
        </p>
        <h1 style={{ textAlign: "center", marginTop: "45px" }}>All collections</h1>
      </div>

      <div className="collection-container">
        {items.map((item) => (
          <div 
            className="collection-item" 
            key={item.id} 
            onClick={() => navigate(`/products/${item.id}`, { state: { title: item.text } })} // Pass the title here
          >
            <img src={item.imgSrc} alt={item.text} />
            <h2>{item.text}</h2>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default Collection;

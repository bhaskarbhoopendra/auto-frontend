import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectEngineData } from '../../store/engineSlice';
import './Engine.css'; // Import the CSS file

const Engine = ({ dataKey }) => {
  const engineData = []
  const navigate = useNavigate();

  if (!engineData) {
    return <div>No data available</div>;
  }

  const handleProductClick = (product) => {
    navigate(`/product-list`, { state: { product } });
  };

  return (
    <div style={{ padding: "3rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "-35px" }}>
        <h3 style={{ textAlign: "left", marginBottom: "1.5rem", fontSize: "1.2rem", fontWeight: "600" }}>
          {engineData.title}
        </h3>
        <h6 
          style={{ fontSize: "0.9rem", fontWeight: "700", cursor: "pointer", color: "#8146CC" }} 
          onClick={() => navigate(`/collections/${dataKey}`)} // Pass the correct key here
        >
          View all
        </h6>
      </div>

      {/* <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {engineData.engineItems.slice(0, 5).map((item, index) => (
          <div key={index} className="image-container" onClick={() => handleProductClick(item)}> {/* Add onClick handler */}
            {/* <img  */}
              {/* src={item.src}  */}
              {/* alt={item.name}  */}
              {/* className="image" // Use the image class */}
            {/* /> */}
            {/* <p className="name">{item.name}</p> */}
          {/* </div> */}
        {/* // ))} */}
      {/* </div>  */}
    </div>
  );
};

export default Engine;

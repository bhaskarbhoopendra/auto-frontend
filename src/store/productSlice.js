import { createSlice } from '@reduxjs/toolkit';
import productsData from '../data/productsData.json';

// Import images
import engineValveSetGlamor from '../assets/Engine Valve Set Glamor 2.webp';
import carburetorRepairKitGlamor from '../assets/Carburetor repair kit Glamor 1.jpg';
import carburetorBajajAvenger220 from '../assets/carburetor bajaj avenger 220.webp';

// Create an image mapping
const imageMap = {
  "Engine Valve Set Glamor 2.webp": engineValveSetGlamor,
  "Carburetor repair kit Glamor 1.jpg": carburetorRepairKitGlamor,
  "carburetor bajaj avenger 220.webp": carburetorBajajAvenger220,
};

const initialState = {
  ...productsData,
  productsData1: {
    ...productsData.productsData1,
    products: productsData.productsData1.products.map(product => ({
      ...product,
      img: imageMap[product.img] // Map the image path to the imported image
    }))
  },
  productsData2: {
    ...productsData.productsData2,
    products: productsData.productsData2.products.map(product => ({
      ...product,
      img: imageMap[product.img]
    }))
  },
  productsData3: {
    ...productsData.productsData3,
    products: productsData.productsData3.products.map(product => ({
      ...product,
      img: imageMap[product.img]
    }))
  }
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
});

export const selectProductsByCategory = (state, key) => state.products[key];

export default productSlice.reducer;

// Import statements should come first
import { createSlice } from '@reduxjs/toolkit';

// Import images
import carburetorBajajAvenger220 from '../assets/carburetor bajaj avenger 220.webp';
import carburetorRepairKitGlamor from '../assets/Carburetor repair kit Glamor 1.jpg';
import roadKit from '../assets/Connecting Road Kit - Glamor 2.webp';
import crankShift from '../assets/Crank Shaft Glamour.jpg';
import engineValveSet from '../assets/Engine Valve Set Glamor 2.webp';
import dominor from '../assets/Dominar 400 self Startor motor.jpg';
import advancedCarburetor from '../assets/Gear Pinion Set.webp';
import airFilterSystem from '../assets/Stator coil plate assembly Glamor.jpg';
import speedometer from '../assets/suzuki-hayate speedometer.webp';
import fuelPump from '../assets/KTM duke fuel pump.jpg';

// Import JSON data
import engineDataJSON from '../data/engineData.json';

// Create a mapping of image keys to imports
const imageMapping = {
  carburetorBajajAvenger220,
  carburetorRepairKitGlamor,
  roadKit,
  crankShift,
  engineValveSet,
  dominor,
  advancedCarburetor,
  airFilterSystem,
  speedometer,
  fuelPump
};

// Function to replace image keys with actual image imports
const replaceImageKeysWithImports = (engineData) => {
  return engineData.map(item => ({
    ...item,
    src: imageMapping[item.imageKey]
  }));
};

// Initial state, referencing the JSON and replacing the image keys
const initialState = {
  engineData1: {
    title: engineDataJSON?.engineData1.title,
    engineItems: replaceImageKeysWithImports(engineDataJSON.engineData1.engineItems)
  },
  engineData2: {
    title: engineDataJSON.engineData2.title,
    engineItems: replaceImageKeysWithImports(engineDataJSON.engineData2.engineItems)
  }
};

// Create slice
const engineSlice = createSlice({
  name: 'engine',
  initialState,
  reducers: {},
});

export const selectEngineData = (state, key) => state.engine[key];

export default engineSlice.reducer;

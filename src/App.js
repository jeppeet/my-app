import React from 'react';
import 'leaflet/dist/leaflet.css';
import  Map  from './Map.js';

// Example usage
const shapes = [
  /* { Type: "cirkle", Coordinates: [{ Lat: "61.4242", Lon: "11.3243" }], Radius: 500 },
  { Type: "cirkle", Coordinates: [{ Lat: "59.911491", Lon: "10.757933" }], Radius: 100 }, */
  /* { Type: "polygon", Coordinates: [
      { Lat: "60.3913", Lon: "5.3221" },
      { Lat: "60.3935", Lon: "5.3245" },
      { Lat: "60.3947", Lon: "5.3199" }
    ], Radius: null }, *//*
  { Type: "cirkle", Coordinates: [{ Lat: "63.4305", Lon: "10.3951" }], Radius: 200 },*/
  { Type: "polygon", Coordinates: [
      { Lat: "58.9690", Lon: "5.7331" },
      { Lat: "58.9714", Lon: "5.7355" },
      { Lat: "58.9730", Lon: "5.7283" }
    ], Radius: null } 
];

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Map with Shapes</h1>
        <p>This map shows circles and polygons with calculated centers.</p>
      </header>
      <Map shapes={shapes} />
    </div>
  );
};

export default App;

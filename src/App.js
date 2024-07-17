import React, { useState, useEffect } from 'react';
import { getShapes } from './Services/shapeService';
import MapComponent from './Components/MapComponent';

const App = () => {
  const [shapes, setShapes] = useState([]);

  useEffect(() => {
    const fetchShapes = async () => {
      try {
        const shapesData = await getShapes();
        setShapes(shapesData);
        
      } catch (error) {
        console.error('Error fetching shapes:', error);
      }
    };
    
    fetchShapes();
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <h1>Map with Shapes</h1>
        <p>This map shows circles and polygons with calculated centers.</p>
      </header>
      <MapComponent shapes={shapes} />
    </div>
  );
};

export default App;

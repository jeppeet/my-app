import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Polygon, Circle, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Function to parse coordinates
const parseCoordinates = (coordinates) => {
  return coordinates.map(coord => [parseFloat(coord.Lat), parseFloat(coord.Lon)]);
};

// Function to calculate the bounds of a polygon
const calculatePolygonBounds = (coordinates) => {
  return L.latLngBounds(coordinates);
};

// Function to calculate the bounds of a circle
const calculateCircleBounds = (center, radius) => {
  const circle = L.circle(center, { radius: radius * 1000 }); // Radius in meters
  return circle.getBounds();
};

// Function to aggregate bounds
const aggregateBounds = (boundsArray) => {
  const aggregatedBounds = L.latLngBounds(boundsArray[0]);
  boundsArray.forEach(bounds => {
    aggregatedBounds.extend(bounds);
  });
  return aggregatedBounds;
};

const FitBoundsComponent = ({ bounds }) => {
  const map = useMap();
  useEffect(() => {
    map.fitBounds(bounds);
  }, [bounds, map]);
  return null;
};

const Map = ({ shapes }) => {
  const boundsArray = shapes.map(shape => {
    if (shape.Type === "cirkle") {
      const center = parseCoordinates(shape.Coordinates)[0];
      const radius = shape.Radius; // Radius in kilometers
      return calculateCircleBounds(center, radius);
    } else if (shape.Type === "polygon") {
      const polygonCoordinates = parseCoordinates(shape.Coordinates);
      return calculatePolygonBounds(polygonCoordinates);
    }
    return null;
  }).filter(bounds => bounds !== null);

  const mapBounds = aggregateBounds(boundsArray);

  return (
    <MapContainer bounds={mapBounds} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {shapes.map((shape, index) => {
        if (shape.Type === "cirkle") {
          const center = parseCoordinates(shape.Coordinates)[0];
          const radius = shape.Radius * 1000; // Radius in meters
          return <Circle key={index} center={center} radius={radius} color="blue" />;
        } else if (shape.Type === "polygon") {
          const polygonCoordinates = parseCoordinates(shape.Coordinates);
          return <Polygon key={index} positions={polygonCoordinates} color="purple" />;
        }
        return null;
      })}
      <FitBoundsComponent bounds={mapBounds} />
    </MapContainer>
  );
};




export default Map;

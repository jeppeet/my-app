import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Polygon, Circle, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Function to parse coordinates
const parseCoordinates = (coordinates) => {
  return coordinates.map(coord => [parseFloat(coord.Lat), parseFloat(coord.Lon)]);
};

// Function to calculate the bounding box of a polygon
const calculatePolygonBounds = (coordinates) => {
  return L.latLngBounds(coordinates);
};

// Function to calculate the bounding box of a circle manually
const calculateCircleBounds = (center, radius) => {
  const lat = center[0];
  const lon = center[1];
  const radiusInDegrees = radius / 111; // Rough conversion of km to degrees
  return L.latLngBounds([
    [lat - radiusInDegrees, lon - radiusInDegrees],
    [lat + radiusInDegrees, lon + radiusInDegrees],
  ]);
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
    <MapContainer bounds={mapBounds} style={{ height: '80vh', width: '50%' }}>
      <TileLayer
        url='https://cache.kartverket.no/v1/wmts/1.0.0/topo/default/webmercator/{z}/{y}/{x}.png'
        attribution='&copy; <a href="http://www.kartverket.no/">Kartverket</a>'
      />
      {shapes.map((shape, index) => {
        if (shape.Type === "cirkle") {
          const center = parseCoordinates(shape.Coordinates)[0];
          const radius = shape.Radius * 1000; // Radius in meters
          return <Circle key={index} center={center} radius={radius} color="red" />;
        } else if (shape.Type === "polygon") {
          const polygonCoordinates = parseCoordinates(shape.Coordinates);
          return <Polygon key={index} positions={polygonCoordinates} color="red" />;
        }
        return null;
      })}
      <FitBoundsComponent bounds={mapBounds} />
    </MapContainer>
  );
};

export default Map;
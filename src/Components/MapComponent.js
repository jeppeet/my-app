import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Polygon, Circle, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { parseCoordinates, calculatePolygonBounds, calculateCircleBounds, aggregateBounds } from '../Utils/MapUtils';

const FitBoundsComponent = ({ bounds }) => {
  const map = useMap();
  useEffect(() => {
    if (bounds.isValid()) {
      map.fitBounds(bounds);
    }
  }, [bounds, map]);
  return null;
};

const ShapeLayer = ({ shapes }) => {
  return (
    <>
      {shapes.map((shape) => {
        if (shape.Type === "cirkle") {
          const center = parseCoordinates(shape.Coordinates)[0];
          const radius = shape.Radius * 1000; // Radius in meters
          return <Circle key={shape.id} center={center} radius={radius} color="blue" />;
        } else if (shape.Type === "polygon") {
          const polygonCoordinates = parseCoordinates(shape.Coordinates);
          return <Polygon key={shape.id} positions={polygonCoordinates} color="purple" />;
        }
        return null;
      })}
    </>
  );
};

const MapComponent = ({ shapes }) => {
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
    <MapContainer bounds={mapBounds.isValid() ? mapBounds : [[0, 0], [0, 0]]} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://cache.kartverket.no/v1/wmts/1.0.0/topo/default/webmercator/{z}/{y}/{x}.png"
        attribution='&copy; <a href="http://www.kartverket.no/">Kartverket</a>'
      />
      <ShapeLayer shapes={shapes} />
      <FitBoundsComponent bounds={mapBounds} />
    </MapContainer>
  );
};

export default MapComponent;

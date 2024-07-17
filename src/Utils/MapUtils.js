import L from 'leaflet';

export const parseCoordinates = (coordinates) => {
  return coordinates.map(coord => [parseFloat(coord.Lat), parseFloat(coord.Lon)]);
};

export const calculatePolygonBounds = (coordinates) => {
  return L.latLngBounds(coordinates);
};

export const calculateCircleBounds = (center, radius) => {
  const lat = center[0];
  const lon = center[1];
  const radiusInDegrees = radius / 111; // Rough conversion of km to degrees
  return L.latLngBounds([
    [lat - radiusInDegrees, lon - radiusInDegrees],
    [lat + radiusInDegrees, lon + radiusInDegrees],
  ]);
};

export const aggregateBounds = (boundsArray) => {
  const aggregatedBounds = L.latLngBounds(boundsArray[0]);
  boundsArray.forEach(bounds => {
    aggregatedBounds.extend(bounds);
  });
  return aggregatedBounds;
};

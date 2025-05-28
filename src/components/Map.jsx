import React from 'react';
import '../styles/Map.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Ορισμός εικονιδίων ανά κατηγορία
const icons = {
  Plastic: new L.Icon({
    iconUrl: '/icons/plastic-icon.png',
    iconSize: [30, 45],
    iconAnchor: [15, 45],
    popupAnchor: [0, -45],
  }),
  Paper: new L.Icon({
    iconUrl: '/icons/paper-icon.png',
    iconSize: [30, 45],
    iconAnchor: [15, 45],
    popupAnchor: [0, -45],
  }),
  Glass: new L.Icon({
    iconUrl: '/icons/glass-icon.png',
    iconSize: [30, 45],
    iconAnchor: [15, 45],
    popupAnchor: [0, -45],
  }),
  Electronics: new L.Icon({
    iconUrl: '/icons/electronics-icon.png',
    iconSize: [30, 45],
    iconAnchor: [15, 45],
    popupAnchor: [0, -45],
  }),
  Default: new L.Icon.Default()
};

const Map = ({ bins }) => {
  return (
    <MapContainer
      center={[39.0742, 21.8243]} // Κέντρο Ελλάδας
      zoom={6}
      style={{ height: '500px', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {bins.map((bin) => (
        <Marker
          key={bin.id}
          position={[bin.latitude, bin.longitude]}
          icon={icons[bin.category] || icons.Default}
        >
          <Popup>
            Κατηγορία: {bin.category} <br />
            Κατάσταση: {bin.status}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;

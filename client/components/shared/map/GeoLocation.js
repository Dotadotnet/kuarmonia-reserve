import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useState } from "react";
import L from "leaflet";
import "react-leaflet-search/dist/styles.css";
import Search from "react-leaflet-search";

const GeoLocation = ({ location, zoom, height, setSelectedLocation }) => {
  const [position, setPosition] = useState([41.0082, 28.9784]); // مختصات اولیه (استانبول)

  const customMarker = new L.Icon({
    iconUrl: "/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        setPosition([e.latlng.lat, e.latlng.lng]);
        setSelectedLocation({ lat: e.latlng.lat, lng: e.latlng.lng });
      },
    });

    return position === null ? null : (
      <Marker position={position} icon={customMarker}>
        <Popup>مکان انتخابی شما</Popup>
      </Marker>
    );
  };

  return (
    <MapContainer center={position} zoom={zoom} style={{ height, width: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Search
        position="topright"
        inputPlaceholder="جستجوی مکان..."
        showMarker={false}
        provider="OpenStreetMap"
        providerOptions={{ region: "tr" }} // تغییر کشور مورد نظر
        closeResultsOnClick={true}
        openSearchOnLoad={false}
        onChange={(info) => {
          const { lat, lng } = info.latLng;
          setPosition([lat, lng]);
          setSelectedLocation({ lat, lng });
        }}
      />
      <LocationMarker />
    </MapContainer>
  );
};

export default GeoLocation;

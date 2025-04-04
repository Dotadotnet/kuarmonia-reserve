import React, { useMemo, useState } from "react";
import { MapContainer, Marker, TileLayer, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import useGetCountryLatLng from "@/hooks/useGetCountryLatLng";
import dynamic from "next/dynamic";

// ایمپورت داینامیک برای جلوگیری از خطای SSR
const Search = dynamic(() => import("react-leaflet-search"), { ssr: false });

const GeoLocation = ({ location, zoom, height, setSelectedLocation }) => {
  const latlng = useGetCountryLatLng(location);
  const position = useMemo(() => {
    if (latlng) {
      return {
        lat: parseFloat(latlng.split(",")[0]),
        lon: parseFloat(latlng.split(",")[1]),
      };
    } else {
      return {
        lat: 20,
        lon: 90,
      };
    }
  }, [latlng]);

  const [markerPosition, setMarkerPosition] = useState([position.lat, position.lon]);

  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        setMarkerPosition([e.latlng.lat, e.latlng.lng]);
        setSelectedLocation({ lat: e.latlng.lat, lng: e.latlng.lng });
      },
    });
    return null;
  };

  return (
    <MapContainer
      key={`${position.lat}-${position.lon}`}
      center={position}
      zoom={zoom}
      scrollWheelZoom={false}
      style={{ height: height }}
      className="w-full rounded overflow-hidden !z-40"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      
      {/* نشانگر مکان انتخاب‌شده */}
      <Marker position={markerPosition}>
        <Popup>مکان انتخاب‌شده</Popup>
      </Marker>

      <MapClickHandler />
    </MapContainer>
  );
};

export default GeoLocation;

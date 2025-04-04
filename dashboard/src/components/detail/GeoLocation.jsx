import { MapContainer, Marker, TileLayer, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerShadowPng from "leaflet/dist/images/marker-shadow.png";
import useGetCountryLatLng from "@/hooks/useGetCountryLatLng";
import { useMemo, useState } from "react";

const customIcon = new L.Icon({
  iconUrl: markerIconPng,
  shadowUrl: markerShadowPng,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const GeoLocation = ({ location, zoom, height, setSelectedLocation }) => {
  const latlng = useGetCountryLatLng(location);
  const position = useMemo(() => {
    if (latlng) {
      return {
        lat: parseFloat(latlng.split(",")[0]),
        lng: parseFloat(latlng.split(",")[1]),
      };
    } else {
      return {
        lat: 20,
        lng: 90,
      };
    }
  }, [latlng]);

  const [markerPosition, setMarkerPosition] = useState([position.lat, position.lng]);

  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        const newLatLng = { lat: e.latlng.lat, lng: e.latlng.lng };

        console.log("موقعیت جدید انتخاب‌شده:", newLatLng); // لاگ در کنسول

        setMarkerPosition([newLatLng.lat, newLatLng.lng]);

        if (setSelectedLocation) {
          setSelectedLocation(newLatLng); // ذخیره موقعیت انتخابی
        }
      },
    });
    return null;
  };

  return (
    <MapContainer
      center={position}
      zoom={zoom}
      scrollWheelZoom={false}
      style={{ height: height }}
      className={"w-full rounded overflow-hidden z-40"}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={markerPosition} icon={customIcon}>
        <Popup>مکان انتخاب‌شده</Popup>
      </Marker>

      <MapClickHandler />
    </MapContainer>
  );
};

export default GeoLocation;

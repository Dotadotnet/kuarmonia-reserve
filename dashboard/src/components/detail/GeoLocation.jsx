import { useMemo, useRef, useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  TileLayer,
  Popup,
  useMapEvents,
  useMap
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerShadowPng from "leaflet/dist/images/marker-shadow.png";
import useGetCountryLatLng from "@/hooks/useGetCountryLatLng";

const customIcon = new L.Icon({
  iconUrl: markerIconPng,
  shadowUrl: markerShadowPng,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const GeoLocation = ({ location, zoom, height, setSelectedLocation, cityLatLng }) => {
  const latlng = useGetCountryLatLng(location);
  
  const position = useMemo(() => {
    if (cityLatLng) {
      return {
        lat: cityLatLng.lat,
        lng: cityLatLng.lng,
      };
    } else if (latlng) {
      return {
        lat: parseFloat(latlng.split(",")[0]),
        lng: parseFloat(latlng.split(",")[1]),
      };
    } else {
      return { lat: 20, lng: 90 };
    }
  }, [latlng, cityLatLng]);

  const [markerPosition, setMarkerPosition] = useState([position.lat, position.lng]);
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setView([position.lat, position.lng], zoom);
      setMarkerPosition([position.lat, position.lng]);
    }
  }, [position, zoom]);

  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        const newLatLng = { lat: e.latlng.lat, lng: e.latlng.lng };
        setMarkerPosition([newLatLng.lat, newLatLng.lng]);
        if (setSelectedLocation) setSelectedLocation(newLatLng);
      },
    });
    return null;
  };

  return (
    <MapContainer
      center={position}
      zoom={zoom}
      scrollWheelZoom={true}
      style={{ height }}
      whenCreated={(mapInstance) => (mapRef.current = mapInstance)}
      className="w-full rounded overflow-hidden !z-50"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={markerPosition} icon={customIcon}>
        <Popup>مکان انتخاب‌شده</Popup>
      </Marker>

      <MapController position={position} zoom={zoom} />
      <MapClickHandler />
    </MapContainer>
  );
};

const MapController = ({ position, zoom }) => {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.setView(position, zoom);
    }
  }, [position, zoom, map]);

  return null;
};

export default GeoLocation;

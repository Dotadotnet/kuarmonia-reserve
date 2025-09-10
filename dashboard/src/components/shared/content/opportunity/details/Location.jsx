
import {
  MapContainer,
  Marker,
  TileLayer,
  Popup,
  useMapEvents
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

const Location = ({ property }) => {
  const position = [property?.location?.lat ||24.084081797317943, property?.location?.lng||89.99015092849733]; 
  return (
    <div className="map-container" style={{ height: "200px", width: "100%" }}>
      <MapContainer
        center={position}
        zoom={13}
        style={{ height: "100%", width: "100%", borderRadius: "10px" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={position}>
          <Popup>اینجا موقعیت شماست.</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Location;

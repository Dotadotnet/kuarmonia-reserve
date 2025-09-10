
import {
  MapContainer,
  Marker,
  TileLayer,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { useTranslations } from "next-intl";

const Location = ({ property }) => {
    const t = useTranslations("Property")

  const position = [
    property?.location?.lat || 24.084081797317943,
    property?.location?.lng || 89.99015092849733
  ];
  return (
    <div className="flex flex-col gap-y-2.5 w-full">
      <div className="flex flex-row gap-x-2 items-center">
        <span className="whitespace-nowrap text-sm ">{t("location")}</span>
        <hr className="w-full" />
      </div>
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
    </div>
  );
};

export default Location;

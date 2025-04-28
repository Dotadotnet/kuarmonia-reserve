

import { NavLink } from "react-router-dom";
import ControlPanel from "../ControlPanel";

export default function Setting() {
  const settings = [
    { name: "تنظیمات عمومی", path: "./general" },
    { name: "اسلایدها", path: "./setting/slides" },
    { name: "درباره ما", path: "./aboutus" },
    { name: "تماس با ما", path: "./contact" },
    { name: "خدمات", path: "./services" },
    { name: "سوالات متداول", path: "./faqs" }
  ];

  return (
    <ControlPanel>
      <div className="p-6 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {settings.map((setting) => (
            <NavLink key={setting.path} to={setting.path}>
              <button className="w-full custom-button  text-white py-4 px-6 rounded shadow transition duration-200">
                {setting.name}
              </button>
            </NavLink>
          ))}
        </div>
      </div>
    </ControlPanel>
  );
}

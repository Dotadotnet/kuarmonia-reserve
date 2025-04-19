import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Arrow from "@/components/icons/Arrow";

const SidebarItem = ({ item ,sidebarExpanded}) => {
  const { pathname } = useLocation();
  const isActive = pathname === item.path || item.subItems?.some(sub => pathname === sub.path);
  
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <li className={`pl-4 pr-3 py-2 rounded-lg mb-0.5 last:mb-0 ${isActive ? "bg-violet-500/[0.12]" : ""} ${isOpen ?'bg-violet-500/[0.12]':''}`}>
      <div 
        onClick={item.subItems ? handleToggle : undefined} 
        className={`flex justify-between items-center cursor-pointer`}
      >
        <NavLink 
          end 
          to={item.path} 
          className={` text-gray-800 dark:text-gray-100 transition duration-150 flex items-center ${isActive ? "" : "hover:text-gray-900 dark:hover:text-white"}`}
        >
          <item.icon className={`shrink-0 fill-current ${isActive ? "text-violet-500" : "text-gray-400 dark:text-gray-500"}`} />
          <span className="text-sm font-medium mr-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">{item.title}</span>
        </NavLink>

        {/* فلش فقط برای مواردی که subItems دارند */}
        {item.subItems && (
          <Arrow className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
        )}
      </div>

      {/* زیرمنو */}
      {item.subItems && (
        <ul className={`mt-4 transition-all  duration-200 ${isOpen ? "block" : "hidden"}`}>
          {item.subItems.map((subItem) => (
            <li key={subItem.path} className="mb-3   last:mb-0">
              <NavLink 
                end 
                to={subItem.path} 
                className={({ isActive }) => `flex items-center ${!sidebarExpanded ? '':'mr-3' } gap-x-2 transition duration-150 truncate  ${isActive ? "text-violet-500 " : "text-gray-500/90  dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 "}`}
              >
                {subItem.icon && <subItem.icon className={`shrink-0 fill-current text-gray-400 dark:text-gray-500`} />}
                <span className="text-sm font-medium">{subItem.title}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

export default SidebarItem;

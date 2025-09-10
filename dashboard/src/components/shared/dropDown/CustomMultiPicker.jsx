import { useState, useEffect } from "react";

// آیکون جستجو (SVG)
const SearchIcon = ({ color = "black", size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color}
       strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

// آیکون انتخاب‌شده (Checked)
const CheckCircleIcon = ({ color = "green", size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color}
       strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);

// آیکون انتخاب‌نشده (Unchecked)
const UncheckedCircleIcon = ({ color = "gray", size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color}
       strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
  </svg>
);

const CustomMultiPicker = ({
  options,
  selected = [],
  multiple = true,
  search = true,
  placeholder = "جستجو کنید...",
  placeholderTextColor = "#757575",
  rowBackgroundColor = "#eee",
  rowHeight = 40,
  rowRadius = 5,
  searchIconColor = "red",
  searchIconSize = 20,
  iconColor = "#00a2dd",
  iconSize = 20,
  callback,
}) => {
  const [searchText, setSearchText] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    if (Array.isArray(selected)) {
      setSelectedItems(selected);
    } else {
      setSelectedItems([selected]);
    }
  }, [selected]);

  const handleSelect = (item) => {
    let updatedSelection;
    if (multiple) {
      updatedSelection = selectedItems.includes(item)
        ? selectedItems.filter((i) => i !== item)
        : [...selectedItems, item];
    } else {
      updatedSelection = selectedItems.includes(item) ? [] : [item];
    }
    setSelectedItems(updatedSelection);
    callback(updatedSelection);
  };

  const filteredOptions = Object.keys(options)
    .filter((key) =>
      options[key].toLowerCase().includes(searchText.toLowerCase())
    );

  return (
    <div style={{ width: "300px", margin: "auto", backgroundColor: "#fff", padding: "10px", borderRadius: "8px", boxShadow: "0 2px 5px rgba(0,0,0,0.2)" }}>
      {search && (
        <div style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
          <SearchIcon color={searchIconColor} size={searchIconSize} />
          <input
            type="text"
            placeholder={placeholder}
            style={{
              flex: 1,
              padding: "5px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              marginLeft: "8px",
              color: placeholderTextColor
            }}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
      )}

      <div style={{ maxHeight: "130px", overflowY: "auto" }}>
        {filteredOptions.map((key) => (
          <div
            key={key}
            onClick={() => handleSelect(key)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "10px",
              backgroundColor: rowBackgroundColor,
              borderRadius: `${rowRadius}px`,
              marginBottom: "5px",
              cursor: "pointer",
              transition: "background 0.3s",
            }}
          >
            <span>{options[key]}</span>
            {selectedItems.includes(key) ? (
              <CheckCircleIcon color={iconColor} size={iconSize} />
            ) : (
              <UncheckedCircleIcon color={iconColor} size={iconSize} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomMultiPicker;

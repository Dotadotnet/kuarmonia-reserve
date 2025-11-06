import React, { useState, useMemo, useRef, useEffect } from "react";
import { useGetIconsQuery } from "@/services/icon/iconApi";
import FormInput from "@/components/shared/input/FormInput";

const IconSelect = ({ 
  value = "", 
  onChange, 
  placeholder = "انتخاب آیکون",
  label = "آیکون",
  required = false,
  className = "w-full"
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  const { data: iconsData, isLoading, isError, error } = useGetIconsQuery({ 
    page: 1, 
    limit: 100,
    search: searchTerm
  });

  // Filter icons based on search term
  const filteredIcons = useMemo(() => {
    // Check if iconsData.data is an array (new structure) or object with icons property (old structure)
    const iconsArray = Array.isArray(iconsData?.data) 
      ? iconsData.data 
      : iconsData?.data?.icons || [];
    
    return iconsArray.filter(icon => 
      icon.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [iconsData, searchTerm]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setHighlightedIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setHighlightedIndex(prev => 
            prev < filteredIcons.length - 1 ? prev + 1 : prev
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setHighlightedIndex(prev => prev > 0 ? prev - 1 : prev);
          break;
        case "Enter":
          e.preventDefault();
          if (highlightedIndex >= 0 && filteredIcons[highlightedIndex]) {
            handleIconSelect(filteredIcons[highlightedIndex]);
          }
          break;
        case "Escape":
          setIsOpen(false);
          setHighlightedIndex(-1);
          break;
        default:
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, highlightedIndex, filteredIcons]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    if (!isOpen) setIsOpen(true);
  };

  const handleIconSelect = (icon) => {
    onChange(icon);
    setIsOpen(false);
    setSearchTerm("");
    setHighlightedIndex(-1);
  };

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 0);
    }
  };

  const handleClearSelection = () => {
    onChange(null);
    setSearchTerm("");
  };

  return (
    <div className={className} ref={dropdownRef}>
      <div className="relative">
        {/* Selected icon display / Toggle button */}
        <div 
          className="w-full p-2 border rounded text-sm flex items-center justify-between cursor-pointer bg-white"
          onClick={handleToggleDropdown}
        >
          {value ? (
            <div className="flex items-center gap-2">
              <div 
                className="w-6 h-6 flex items-center justify-center"
                dangerouslySetInnerHTML={{ __html: value.symbol }} 
              />
            </div>
          ) : (
            <span className="text-gray-500">{placeholder}</span>
          )}
          <div className="flex items-center gap-2">
            {value && (
              <button 
                type="button" 
                onClick={(e) => {
                  e.stopPropagation();
                  handleClearSelection();
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            )}
            <span className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}>
              ▼
            </span>
          </div>
        </div>

        {/* Dropdown */}
        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border rounded shadow-lg">
            {/* Search input inside dropdown */}
            <div className="p-2 border-b">
              <FormInput
                ref={searchInputRef}
                type="text"
                placeholder="جستجوی آیکون..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="mb-0"
              />
            </div>
            
            {/* Loading indicator */}
            {isLoading && (
              <div className="py-2 px-4 text-center">
                <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900"></div>
              </div>
            )}
            
            {/* Error message */}
            {isError && (
              <div className="py-2 px-4 text-red-600 text-sm">
                خطا در بارگذاری آیکون‌ها: {error?.data?.message || "خطای نامشخص"}
              </div>
            )}
            
            {/* Icons list */}
            {!isLoading && !isError && (
              <div className="max-h-60 overflow-y-auto">
                {filteredIcons.length > 0 ? (
                  filteredIcons.map((icon, index) => (
                    <div
                      key={icon._id}
                      className={`flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-100 ${
                        highlightedIndex === index ? 'bg-gray-100' : ''
                      } ${value?._id === icon._id ? 'bg-blue-50' : ''}`}
                      onClick={() => handleIconSelect(icon)}
                      onMouseEnter={() => setHighlightedIndex(index)}
                    >
                      <div 
                        className="w-6 h-6 flex items-center justify-center"
                        dangerouslySetInnerHTML={{ __html: icon.symbol }} 
                      />
                      <span>{icon.title}</span>
                    </div>
                  ))
                ) : (
                  <div className="py-2 px-4 text-center text-gray-500">
                    آیکونی یافت نشد
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default IconSelect;
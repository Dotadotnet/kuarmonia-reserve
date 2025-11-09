import React, { useEffect, useRef } from "react";
import Plus from "@/components/icons/Plus";
import Minus from "@/components/icons/Minus";

const FormItemList = ({
  items = [""],
  setItems,
  label = "آیتم‌ها",
  placeholder = "آیتم را وارد کنید",
  className = "w-full flex flex-col gap-y-4 p-4 border rounded",
  required = false
}) => {
  const containerRef = useRef(null);

  const handleAddItem = () => {
    setItems([...items, ""]);
  };

  const handleRemoveItem = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  const handleChange = (index, value) => {
    const updatedItems = [...items];
    updatedItems[index] = value;
    setItems(updatedItems);
  };

  // Handle pasting comma-separated values
  const handlePaste = (e) => {
    const paste = e.clipboardData.getData('text');
    // Check if paste contains commas (handle both English and Persian commas) or double spaces
    if (paste.includes(',') || paste.includes('،') || paste.includes('  ')) {
      e.preventDefault();
      let newItems = [];
      
      // Split by comma first (handle both English and Persian commas)
      if (paste.includes(',') || paste.includes('،')) {
        // Split by either comma or Persian comma and trim each item
        const separators = /[,،]/;
        newItems = paste.split(separators).map(item => item.trim()).filter(item => item.length > 0);
      } 
      // If no commas, split by double spaces
      else if (paste.includes('  ')) {
        newItems = paste.split('  ').map(item => item.trim()).filter(item => item.length > 0);
      }
      
      // Filter out empty items from the current list and add new items
      const nonEmptyItems = items.filter(item => item.trim() !== "");
      setItems([...nonEmptyItems, ...newItems]);
    }
  };

  // Add paste event listener to inputs
  useEffect(() => {
    const attachListeners = () => {
      if (containerRef.current) {
        const inputs = containerRef.current.querySelectorAll('input');
        inputs.forEach(input => {
          // Remove any existing listener to prevent duplicates
          input.removeEventListener('paste', handlePaste);
          // Add the paste listener
          input.addEventListener('paste', handlePaste);
        });
        
        return inputs.length;
      }
      return 0;
    };
    
    // Initial attempt
    let attachedCount = attachListeners();
    
    // Retry mechanism in case inputs aren't rendered yet
    if (attachedCount === 0) {
      const retryInterval = setInterval(() => {
        attachedCount = attachListeners();
        if (attachedCount > 0) {
          clearInterval(retryInterval);
        }
      }, 100);
      
      // Clear interval after 2 seconds to prevent memory leaks
      setTimeout(() => {
        clearInterval(retryInterval);
      }, 2000);
      
      // Cleanup function that clears the interval
      return () => {
        clearInterval(retryInterval);
        if (containerRef.current) {
          const inputs = containerRef.current.querySelectorAll('input');
          inputs.forEach(input => {
            input.removeEventListener('paste', handlePaste);
          });
        }
      };
    }
    
    // Normal cleanup function
    return () => {
      if (containerRef.current) {
        const inputs = containerRef.current.querySelectorAll('input');
        inputs.forEach(input => {
          input.removeEventListener('paste', handlePaste);
        });
      }
    };
  }, [items]);

  return (
    <div ref={containerRef} className={className} >
      <label className="w-full flex flex-col gap-y-4">
        <p className="text-sm flex flex-row justify-between items-center">
          {label}{required && "*"}
          <button
            type="button"
            className="p-0.5 border rounded-secondary bg-green-500 text-white"
            onClick={handleAddItem}
          >
            <Plus />
          </button>
        </p>

        {items.map((item, index) => (
          <p
            key={index}
            className="flex flex-row gap-x-2 items-center"
          >
            <input
              type="text"
              placeholder={placeholder}
              className="flex-1"
              value={item}
              onChange={(event) =>
                handleChange(index, event.target.value)
              }
              required={required}
            />
            {index !== 0 && (
              <button
                type="button"
                className="p-0.5 border rounded-secondary bg-red-500 text-white"
                onClick={() => handleRemoveItem(index)}
              >
                <Minus />
              </button>
            )}
          </p>
        ))}
      </label>
    </div>
  );
};

export default FormItemList;
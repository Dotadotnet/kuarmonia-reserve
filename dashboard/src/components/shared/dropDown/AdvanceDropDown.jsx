import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";

export const AdvanceDropDown = ({
  onChange,
  valueKey,
  titleKey,
  value,
  initialValue,
  width,
  multiSelect,
  optionsList,
  search,
  url,
  setSearch,
  setDoNotSearch,
  wrapperProps,
  disabled,
  error,
}) => {
  const { ref: inViewRef, inView } = useInView();

  const refetch = wrapperProps?.refetch ?? (() => {});
  const fetchNextPage = wrapperProps?.fetchNextPage ?? (() => {});
  const hasNextPage = wrapperProps?.hasNextPage ?? false;

  const [showOptions, setShowOptions] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(null);

  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  const handleAdd = (selectedItem) => {
    let existing = multiSelect?.value || [];
    const alreadyAdded = existing.some((item) => item[valueKey] === selectedItem.value);
    if (!alreadyAdded) {
      const newList = [
        ...existing,
        { [valueKey]: selectedItem.value, [titleKey]: selectedItem.title },
      ];
      multiSelect?.onChange(newList);
    }
  };

  const handleRemove = (id) => {
    let updated = (multiSelect?.value || []).filter((item) => item[valueKey] !== id);
    multiSelect?.onChange(updated);
  };

  const handleRemoveAll = () => multiSelect?.onChange([]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowOptions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!showOptions && value) {
      const found = optionsList.find((item) => item.value === value);
      if (found) {
        setSearch(found.title);
      }
    }
  }, [showOptions]);

  useEffect(() => {
    const checkFocus = () => {
      setInputFocused(inputRef.current === document.activeElement);
    };
    const el = inputRef.current;
    el?.addEventListener("focus", checkFocus);
    el?.addEventListener("blur", checkFocus);
    return () => {
      el?.removeEventListener("focus", checkFocus);
      el?.removeEventListener("blur", checkFocus);
    };
  }, []);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  const handleKeyDown = (e) => {
    if (!showOptions || optionsList.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev === null || prev >= optionsList.length - 1 ? 0 : prev + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev === null || prev <= 0 ? optionsList.length - 1 : prev - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const selectedOption = optionsList[highlightedIndex];
      if (selectedOption) {
        if (multiSelect) {
          const selected = multiSelect.value?.some((item) => item[valueKey] === selectedOption.value);
          if (selected) handleRemove(selectedOption.value);
          else handleAdd(selectedOption);
          setSearch("");
        } else {
          onChange(selectedOption.value);
          setSearch(selectedOption.title);
          setShowOptions(false);
        }
      }
    } else if (e.key === "Escape") {
      setShowOptions(false);
    }
  };

  return (
    <div
      tabIndex={0}
      onClick={() => {
        if (!disabled) {
          setShowOptions((prev) => !prev);
          if (url) refetch();
        }
      }}
      style={{ width }}
      className="dropdown-container"
      ref={dropdownRef}
      onBlur={(e) => {
        if (!dropdownRef.current.contains(e.relatedTarget)) {
          setShowOptions(false);
        }
      }}
    >
      <div
        className={`dropdown-input-box ${inputFocused ? "focused" : ""} ${
          disabled ? "disabled" : ""
        } ${error ? "error" : ""}`}
      >
        {multiSelect?.value?.map((item) => (
          <div className="selected-item" key={item[valueKey]}>
            <span>{item[titleKey]}</span>
            <span
              onClick={(e) => {
                e.stopPropagation();
                handleRemove(item[valueKey]);
              }}
              className="remove-item"
            >
              ✖️
            </span>
          </div>
        ))}
        <input
          disabled={disabled}
          ref={inputRef}
          className="dropdown-input"
          placeholder={inputFocused ? "جستجو" : initialValue || "انتخاب کنید"}
          onChange={(e) => {
            setDoNotSearch(false);
            if (!showOptions) setShowOptions(true);
            const val = e.target.value;
            setSearch(val);
            if (val === "") {
              onChange(null);
              refetch();
            }
          }}
          value={search}
          onKeyDown={handleKeyDown}
        />
      </div>

      {(value || (multiSelect && multiSelect.value?.length > 0)) && (
        <div
          onClick={(e) => {
            e.stopPropagation();
            onChange(null);
            setSearch("");
            if (multiSelect) handleRemoveAll();
          }}
          className="clear-button"
        >
          ×
        </div>
      )}

      {showOptions && (
        <div className="dropdown-options" style={{ width }}>
          <div className="options-list">
            {!hasNextPage && optionsList.length === 0 && (
              <div className="no-options">موردی یافت نشد</div>
            )}
            {optionsList.map((optionItem, index) => {
              const selected =
                multiSelect?.value?.some((item) => item[valueKey] === optionItem.value) ||
                value === optionItem.value;

              return (
                <div
                  className={`option-item ${
                    highlightedIndex === index ? "highlighted" : ""
                  } ${selected ? "selected" : ""}`}
                  key={optionItem.value}
                  onMouseEnter={() => setHighlightedIndex(index)}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (multiSelect) {
                      selected ? handleRemove(optionItem.value) : handleAdd(optionItem);
                      setSearch("");
                    } else {
                      onChange(optionItem.value);
                      setSearch(optionItem.title);
                      setShowOptions(false);
                    }
                    inputRef.current?.focus();
                  }}
                >
                  {optionItem.title}
                </div>
              );
            })}
            {hasNextPage && (
              <div className="loading" ref={inViewRef}>
                در حال دریافت اطلاعات...
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

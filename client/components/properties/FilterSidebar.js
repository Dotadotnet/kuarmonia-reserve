"use client";
import useGetCountries from "@/hooks/useGetCountries";
import React, { useState } from "react";
import { AiOutlineReload } from "react-icons/ai";
import { BiSolidStar } from "react-icons/bi";
import { useDispatch } from "react-redux";
import Image from "next/image";
import { useGetTypesQuery } from "@/services/type/typeApi";
import { useGetSaleTypesQuery } from "@/services/saleType/saleTypeApi";
import { useGetAllTradeTypesQuery } from "@/services/tradeType/tradeTypeApi";
import {
  setType,
  setTradeType,
  setSaleType,
  setCountries,
  setDateRange,
  setPriceRange,
  setRatings,
  resetFilter
} from "@/features/filter/filterSlice";

const FilterSidebar = () => {
  const [selectedType, setSelectedType] = useState([]);
  const [selectedTradeType, setSelectedTradeType] = useState([]);
  const [selectedSaleType, setSelectedSaleType] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [priceRange, setPriceRangeLocal] = useState({ min: 5, max: 500 });
  const [dateRange, setDateRangeLocal] = useState({
    startDate: null,
    endDate: null
  });
  const { data: propertyTypesData, isLoading } = useGetTypesQuery({
    page: 1,
    search: "",
    limit: 10000
  });
    const {
      data: tradeTypesData,
      isLoading: isLoadingTradeTypes,
      error: errorTradeTypes
    } = useGetAllTradeTypesQuery();
    const {
      data: saleTypesData,
      isLoading: isLoadingSaleTypes,
      error: errorSaleTypes
    } = useGetSaleTypesQuery();
  
    const tradeTypes = tradeTypesData?.data || [];
    const saleTypes = saleTypesData?.data || [];
  const propertyTypes = propertyTypesData?.data || [];
  const [selectedRatings, setSelectedRatings] = useState([]);

  const countries = useGetCountries();
  const dispatch = useDispatch();

  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  const handleTypeChange = (selectedOptions) => {
    setSelectedType(selectedOptions);
    dispatch(setType(selectedOptions));
  };

  const handleTradeTypeChange = (selectedOptions) => {
    setSelectedTradeType(selectedOptions);
    dispatch(setTradeType(selectedOptions));
  };
  const handleSaleTypeChange = (selectedOptions) => {
    setSelectedSaleType(selectedOptions);
    dispatch(setSaleType(selectedOptions));
  };


  const handleCountriesChange = (selectedOptions) => {
    setSelectedCountries(selectedOptions);
    dispatch(setCountries(selectedOptions));
  };

  const handlePriceRangeChange = (min, max) => {
    setPriceRangeLocal({ min, max });
    dispatch(setPriceRange({ min, max }));
  };

  const handleDateRangeChange = (startDate, endDate) => {
    setDateRangeLocal({ startDate, endDate });
    dispatch(setDateRange({ startDate, endDate }));
  };

  const handleRatingsChange = (selectedOptions) => {
    setSelectedRatings(selectedOptions);
    dispatch(setRatings(selectedOptions));
  };

  function renderStarIcons(count) {
    const stars = [];
    for (let i = 0; i < count; i++) {
      stars.push(<BiSolidStar key={i} className="text-yellow-500 h-4 w-4" />);
    }
    return stars;
  }

  return (
    <aside className="lg:col-span-3 md:col-span-4 col-span-12">
      <section className="flex flex-col gap-y-4 md:sticky md:top-4">
        {/* Choose Type */}
        <div className="flex flex-col gap-y-4 border py-2 px-4 rounded">
          <h2 className="text-lg">انتخاب دسته بندی</h2>
          <div className="flex flex-col gap-y-2.5 h-40 overflow-y-auto">
            {propertyTypes?.length === 0 && <>در حال بارگذاری ...</>}
            {propertyTypes?.map(({ title ,_id}, index) => (
              <label
                key={index}
                htmlFor={title}
                className="text-sm flex flex-row items-center gap-x-1.5"
              >
                <input
                  type="checkbox"
                  name={title}
                  id={title}
                  value={_id}
                  className="!rounded-secondary checked:bg-primary checked:text-primary"
                  onChange={(e) => {
                    const isChecked = e.target.checked;
                    const updatedType = isChecked
                      ? [...selectedType, title]
                      : selectedType.filter(
                          (type) => type !== title
                        );
                    handleTypeChange(updatedType);
                  }}
                />
                <span className="flex flex-row gap-x-1 items-center whitespace-normal truncate">
                  {title}
                </span>
              </label>
            ))}
          </div>
        </div>
          {/* Choose Type */}
          <div className="flex flex-col gap-y-4 border py-2 px-4 rounded">
          <h2 className="text-lg">انتخاب نوع فروش</h2>
          <div className="flex flex-col gap-y-2.5 h-40 overflow-y-auto">
            {saleTypes?.length === 0 && <>در حال بارگذاری ...</>}
            {saleTypes?.map(({ title ,_id}, index) => (
              <label
                key={index}
                htmlFor={title}
                className="text-sm flex flex-row items-center gap-x-1.5"
              >
                <input
                  type="checkbox"
                  name={title}
                  id={title}
                  value={_id}
                  className="!rounded-secondary checked:bg-primary checked:text-primary"
                  onChange={(e) => {
                    const isChecked = e.target.checked;
                    const updatedSaleType = isChecked
                      ? [...selectedType, title]
                      : selectedSaleType.filter(
                          (type) => type !== title
                        );
                    handleSaleTypeChange(updatedSaleType);
                  }}
                />
                <span className="flex flex-row gap-x-1 items-center whitespace-normal truncate">
                  {title}
                </span>
              </label>
            ))}
          </div>
        </div>
          {/* Choose Type */}
          <div className="flex flex-col gap-y-4 border py-2 px-4 rounded">
          <h2 className="text-lg">انتخاب  نوع معامله</h2>
          <div className="flex flex-col gap-y-2.5 h-40 overflow-y-auto">
            {tradeTypes?.length === 0 && <>در حال بارگذاری ...</>}
            {tradeTypes?.map(({ title ,_id}, index) => (
              <label
                key={index}
                htmlFor={title}
                className="text-sm flex flex-row items-center gap-x-1.5"
              >
                <input
                  type="checkbox"
                  name={title}
                  id={title}
                  value={_id}
                  className="!rounded-secondary checked:bg-primary checked:text-primary"
                  onChange={(e) => {
                    const isChecked = e.target.checked;
                    const updatedTradeType = isChecked
                      ? [...selectedTradeType, title]
                      : selectedTradeType.filter(
                          (type) => type !== title
                        );
                        handleTradeTypeChange(updatedTradeType);
                  }}
                />
                <span className="flex flex-row gap-x-1 items-center whitespace-normal truncate">
                  {title}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Choose Country */}
        <div className="flex flex-col gap-y-4 border py-2 px-4 rounded">
          <h2 className="text-lg">انتخاب کشور مقصد</h2>
          <div className="flex flex-col gap-y-2.5 h-40 overflow-y-auto">
            {countries?.length === 0 && <>Loading...</>}
            {countries?.map((country, index) => (
              <label
                key={index}
                htmlFor={country.name}
                className="text-sm flex flex-row items-center gap-x-1.5"
              >
                <input
                  type="checkbox"
                  name={country.name}
                  id={country.name}
                  className="!rounded-secondary checked:bg-primary checked:text-primary"
                  onChange={(e) => {
                    const isChecked = e.target.checked;
                    const updatedCountries = isChecked
                      ? [...selectedCountries, country.name]
                      : selectedCountries.filter((c) => c !== country.name);
                    handleCountriesChange(updatedCountries);
                  }}
                />
                <span className="flex flex-row gap-x-2 items-center whitespace-normal truncate">
                  <Image
                    src={country.flag}
                    alt={country.name}
                    height={10}
                    width={20}
                  />
                  {country.name}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="flex flex-col gap-y-4 border py-2 px-4 rounded">
          <h2 className="text-lg">رنج قیمت </h2>
          <label htmlFor="price" className="flex flex-col gap-y-2">
            <input
              type="range"
              name="price"
              id="price"
              min={5}
              max={500}
              value={priceRange.min || ""}
              onChange={(e) =>
                handlePriceRangeChange(Number(e.target.value), priceRange.max)
              }
              className="flex-1 bg-secondary appearance-none h-0 rounded"
            />
            <p className="text-xs flex flex-row items-center justify-between">
              ${priceRange.min.toFixed(2)}
              <span className="text-xs"> ${priceRange.max.toFixed(2)}</span>
            </p>
          </label>
        </div>

        {/* Date Range */}
        <div className="flex flex-col gap-y-4 border py-2 px-4 rounded">
          <h2 className="text-lg">رنج تاریخ</h2>
          <label
            htmlFor="startDate"
            className="flex flex-row gap-x-2 items-center"
          >
            <input
              type="date"
              id="startDate"
              value={dateRange.startDate || ""}
              onChange={(e) =>
                handleDateRangeChange(e.target.value, dateRange.endDate)
              }
              className="flex-1 !text-sm !p-0 !border-0"
            />
            <div className="h-4 border" />
            <input
              type="date"
              id="endDate"
              value={dateRange.endDate || ""}
              onChange={(e) =>
                handleDateRangeChange(dateRange.startDate, e.target.value)
              }
              className="flex-1 !text-sm !p-0 !border-0"
            />
          </label>
        </div>

        {/* Choose Ratings */}
        <div className="flex flex-col gap-y-4 border py-2 px-4 rounded">
          <h2 className="text-lg">براساس امتیاز</h2>
          <div className="flex flex-col gap-y-2.5">
            {[5, 4, 3, 2, 1].map((rating) => (
              <label
                key={rating}
                htmlFor={rating}
                className="text-sm flex flex-row items-center gap-x-1.5"
              >
                <input
                  type="checkbox"
                  name={rating.toString()}
                  id={rating.toString()}
                  className="!rounded-secondary checked:bg-primary checked:text-primary"
                  onChange={(e) => {
                    const isChecked = e.target.checked;
                    const updatedRatings = isChecked
                      ? [...selectedRatings, rating]
                      : selectedRatings.filter((r) => r !== rating);
                    handleRatingsChange(updatedRatings);
                  }}
                />
                <span className="flex flex-row gap-x-1 items-center">
                  {renderStarIcons(rating)}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Reset Button */}
        <button
          className="px-4 py-1 border border-primary !rounded-secondary flex flex-row gap-x-2 items-center w-fit bg-secondary text-primary"
          onClick={() => {
            setSelectedType([]);
            setSelectedCountries([]);
            setPriceRangeLocal({ min: 10, max: 500 });
            setDateRangeLocal({ startDate: null, endDate: null });
            setSelectedRatings([]);
            dispatch(resetFilter());
          }}
        >
          تنظیم مجدد
        </button>
      </section>
    </aside>
  );
};

export default FilterSidebar;

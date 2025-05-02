"use client";
import { useEffect, useState } from "react";
import Gold from "@/components/icons/Gold";
import BTC from "@/components/icons/BTC";
import ETH from "@/components/icons/ETH";
const API_KEY = "FreeQj1qTYP36STO4Oj7g3dSuAVfiGAv";
const BASE_URL = `https://BrsApi.ir/Api/Market/Gold_Currency.php?key=${API_KEY}`;
import "swiper/css";
import "swiper/css/autoplay";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

const fallbackRates = {
  USD: { price: 580000, change_percent: 0 },
  EUR: { price: 625000, change_percent: 0 },
  TRY: { price: 18500, change_percent: 0 },
  CAD: { price: 430000, change_percent: 0 },
  BTC: { price: 3000000000, change_percent: 0 },
  ETH: { price: 150000000, change_percent: 0 },
  "18K Gold": { price: 4000000, change_percent: 0 }
};

const currencyToVisual = {
  USD: (
    <img
      src="https://hatscripts.github.io/circle-flags/flags/us.svg"
      width="20"
      height="20"
      alt="USD"
    />
  ),
  EUR: (
    <img
      src="https://hatscripts.github.io/circle-flags/flags/european_union.svg"
      width="20"
      height="20"
      alt="EUR"
    />
  ),
  TRY: (
    <img
      src="https://hatscripts.github.io/circle-flags/flags/tr.svg"
      width="20"
      height="20"
      alt="TRY"
    />
  ),
  CAD: (
    <img
      src="https://hatscripts.github.io/circle-flags/flags/ca.svg"
      width="20"
      height="20"
      alt="CAD"
    />
  ),
  BTC: <BTC />,
  ETH: <ETH />,
  "18K Gold": <Gold />
};

export const useExchangeRatesToIRR = () => {
  const [rates, setRates] = useState(fallbackRates);

  useEffect(() => {
    const fetchAllRates = async () => {
      const updatedRates = { ...fallbackRates };
      try {
        const res = await fetch(BASE_URL);
        const data = await res.json();

        const extractRate = (sourceArray, symbol, key) => {
          const item = sourceArray.find((i) => i.symbol === symbol);
          if (item) {
            updatedRates[key] = {
              price: Math.round(item.price),
              change_percent: parseFloat(item.change_percent) || 0
            };
          }
        };

        extractRate(data.currency, "USD", "USD");
        extractRate(data.currency, "EUR", "EUR");
        extractRate(data.currency, "CAD", "CAD");
        extractRate(data.currency, "TRY", "TRY");
        extractRate(data.cryptocurrency, "BTC", "BTC");
        extractRate(data.cryptocurrency, "ETH", "ETH");
        extractRate(data.gold, "IR_GOLD_18K", "18K Gold");
      } catch (err) {
        console.warn("⚠ خطا در گرفتن نرخ‌ها ➡ استفاده از نرخ پشتیبان");
      }
      setRates(updatedRates);
    };

    fetchAllRates();
  }, []);

  return rates;
};

export default function CurrencyRates() {
  const rates = useExchangeRatesToIRR();

  const Arrow = ({ change }) => {
    if (change > 0) {
      return <span className="text-green-500 text-xs ml-1">▲ {change}%</span>;
    } else if (change < 0) {
      return (
        <span className="text-red-500 text-xs ml-1">▼ {Math.abs(change)}%</span>
      );
    } else {
      return <span className="text-gray-400 text-xs ml-1">۰%</span>;
    }
  };
  const [time, setTime] = useState({
    tehran: "",
    toronto: "",
    istanbul: ""
  });

  const formatTime = (timeZone) => {
    const date = new Date();
    const options = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false
    };

    return new Intl.DateTimeFormat("en-US", {
      ...options,
      timeZone
    }).format(date);
  };

  useEffect(() => {
    const updateTimes = () => {
      setTime({
        tehran: formatTime("Asia/Tehran"),
        toronto: formatTime("America/Toronto"),
        istanbul: formatTime("Europe/Istanbul")
      });
    };

    const interval = setInterval(updateTimes, 1000);
    updateTimes(); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex z-50 justify-between w-full bg-orange-500 md:hidden">
      <div className="flex justify-between w-7/12 px-1 items-center gap-x-2">
        <div className="flex text-center justify-center items-center gap-x-2">
          <img
            src="https://hatscripts.github.io/circle-flags/flags/ca.svg"
            width="20"
            height="20"
            alt="tehran"
          />{" "}
          <p className="!text-white">{time.toronto}</p>
        </div>
        <div className="text-center gap-x-2  flex justify-center items-center">
          <img
            src="https://hatscripts.github.io/circle-flags/flags/tr.svg"
            width="20"
            height="20"
            alt="tehran"
          />{" "}
          <p className="!text-white">{time.istanbul}</p>
        </div>
        <div className="flex text-center gap-x-2 justify-center items-center ">
          <img
            src="https://hatscripts.github.io/circle-flags/flags/ir.svg"
            width="20"
            height="20"
            alt="tehran"
          />{" "}
          <p className="!text-white">{time.tehran}</p>
        </div>
      </div>{" "}
      <div className="w-5/12 h-8 flex flex-col gap-1 items-end">
        <Swiper
          loop={true}
          direction="vertical"
          autoplay={{
            delay: 3000,
            disableOnInteraction: false
          }}
          speed={1000}
          slidesPerView={1}
          spaceBetween={1}
          modules={[Autoplay]}
          className="h-full !flex !justify-end"
        >
          {Object.entries(rates).map(
            ([currency, { price, change_percent }]) => (
              <SwiperSlide className="!flex !justify-end !gap-x-2">
                <div
                  key={currency}
                  className="flex items-center justify-Center gap-x-2 px-2 py-1 "
                >
                  <div className="flex items-center gap-x-2">
                    <Arrow change={change_percent} />
                    <span className="text-sm  text-white">
                      {price.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-xs border-2 rounded-full flex items-center  border-white bg-white backdrop-blur-md shadow-md justify-center">
                      {currencyToVisual[currency]}
                    </span>
                  </div>
                </div>
              </SwiperSlide>
            )
          )}
        </Swiper>
      </div>
    </div>
  );
}

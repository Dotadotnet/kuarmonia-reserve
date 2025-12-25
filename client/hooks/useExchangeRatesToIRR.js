"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Gold from "@/components/icons/Gold";
import BTC from "@/components/icons/BTC";
import ETH from "@/components/icons/ETH";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
const API_KEY = "BXYjLAx4p44QKszks9ABrrttY8Hz5MGE";
const BASE_URL = `https://BrsApi.ir/Api/Market/Gold_Currency.php?key=${API_KEY}`;

const fallbackRates = {
  USD: { price: 580000, change_percent: 0 },
  EUR: { price: 625000, change_percent: 0 },
  TRY: { price: 18500, change_percent: 0 },
  CAD: { price: 430000, change_percent: 0 },
  BTC: { price: 3000000000, change_percent: 0 },
  ETH: { price: 150000000, change_percent: 0 },
  "18K Gold": { price: 4000000, change_percent: 0 }
};

// مسیر پرچم‌ها روی سرور خودتون
const currencyToVisual = {
  USD: <Image priority={false} quality={2} src="/flags/us.svg" width={20} height={20} alt="USD" />,
  EUR: <Image priority={false} quality={2} src="/flags/eu.svg" width={20} height={20} alt="EUR" />,
  TRY: <Image priority={false} quality={2} src="/flags/tr.svg" width={20} height={20} alt="TRY" />,
  CAD: <Image priority={false} quality={2} src="/flags/ca.svg" width={20} height={20} alt="CAD" />,
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
    if (change > 0) return <span className="text-green-500 text-xs ml-1">▲ {change}%</span>;
    if (change < 0) return <span className="text-red-500 text-xs ml-1">▼ {Math.abs(change)}%</span>;
    return <span className="text-gray-400 text-xs ml-1">۰%</span>;
  };

  const [time, setTime] = useState({ tehran: "", toronto: "", istanbul: "" });

  const formatTime = (timeZone) => {
    const date = new Date();
    return new Intl.DateTimeFormat("en-US", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone }).format(date);
  };

  useEffect(() => {
    const updateTimes = () => {
      setTime({
        tehran: formatTime("Asia/Tehran"),
        toronto: formatTime("America/Toronto"),
        istanbul: formatTime("Europe/Istanbul")
      });
    };
    updateTimes();
    const interval = setInterval(updateTimes, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex z-50 justify-between w-full bg-orange-500 md:hidden">
      <div className="flex justify-between w-7/12 px-1 items-center gap-x-2">
        {[
          { flag: "/flags/ca.svg", city: "toronto", time: time.toronto },
          { flag: "/flags/tr.svg", city: "istanbul", time: time.istanbul },
          { flag: "/flags/ir.svg", city: "tehran", time: time.tehran }
        ].map(({ flag, city, time }) => (
          <div key={city} className="flex justify-center items-center gap-x-2">
            <Image priority={false} quality={2} src={flag} width={24} height={24} alt={city} className="border-1 rounded-full border-white bg-white backdrop-blur-md" />
            <p className="!text-white">{time}</p>
          </div>
        ))}
      </div>

      <div className="w-5/12 h-8 flex flex-col gap-1 items-end">
        <Swiper
          loop
          direction="vertical"
          autoplay={{ delay: 3000 }}
          speed={1000}
          modules={[Autoplay]}
          className="h-full !flex !justify-end"
        >
          {Object.entries(rates).map(([currency, { price, change_percent }]) => (
            <SwiperSlide key={currency} className="!flex !justify-end !gap-x-2">
              <div className="flex items-center justify-center gap-x-2 px-2 py-1">
                <div className="flex items-center gap-x-2">
                  <Arrow change={change_percent} />
                  <span className="text-sm text-white">{price.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-xs border-2 rounded-full flex items-center border-white bg-white backdrop-blur-md shadow-md justify-center">
                    {currencyToVisual[currency]}
                  </span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

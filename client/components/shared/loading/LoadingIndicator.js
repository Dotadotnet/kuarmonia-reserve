"use client"
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

const LoadingIndicator = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false); // وضعیت لودینگ

  useEffect(() => {
    const handleRouteChangeStart = () => {
      setLoading(true); // شروع لودینگ
    };

    const handleRouteChangeComplete = () => {
      setLoading(false); // پایان لودینگ
    };

    const handleRouteChangeError = () => {
      setLoading(false); // در صورت بروز خطا
    };

    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);
    router.events.on("routeChangeError", handleRouteChangeError);

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
      router.events.off("routeChangeError", handleRouteChangeError);
    };
  }, [router]);

  return (
    <>
      {loading && (
        <div
          className="fixed top-0 left-0  z-[9999] w-screen h-screen flex items-center justify-center "
          style={{ background: "rgba(0, 0, 0, 0.6)" }}
        >
          <div className="bg-white dark:bg-slate-900  shadow-lg py-6 px-14 rounded-lg flex items-center flex-col just">
            <Image src="/logo.gif" width={100} height={60} />
            <div className="loader-dots  relative w-24 h-6 mt-2 flex items-center justify-center">
              <div className="absolute mt-1 w-5 h-5 rounded-full bg-green-500 dark:bg-blue-500"></div>
              <div className="absolute mt-1 w-5 h-5 rounded-full bg-green-500 dark:bg-blue-500"></div>
              <div className="absolute mt-1 w-5 h-5 rounded-full bg-green-500 dark:bg-blue-500"></div>
              <div className="absolute mt-1 w-5 h-5 rounded-full bg-green-500 dark:bg-blue-500"></div>
            </div>

            <div className="text-gray-500 dark:text-gray-100 text-lg  mt-2 text-center">
              صبر کنید ...
            </div>
          </div>
          <style jsx>{`
            .loader-dots div {
              animation-timing-function: cubic-bezier(0, 1, 1, 0);
            }
            .loader-dots div:nth-child(1) {
              left: 8px;
              animation: loader-dots1 0.6s infinite;
            }
            .loader-dots div:nth-child(2) {
              left: 8px;
              animation: loader-dots2 0.6s infinite;
            }
            .loader-dots div:nth-child(3) {
              left: 32px;
              animation: loader-dots2 0.6s infinite;
            }
            .loader-dots div:nth-child(4) {
              left: 56px;
              animation: loader-dots3 0.6s infinite;
            }
            @keyframes loader-dots1 {
              0% {
                transform: scale(0);
              }
              100% {
                transform: scale(1);
              }
            }
            @keyframes loader-dots3 {
              0% {
                transform: scale(1);
              }
              100% {
                transform: scale(0);
              }
            }
            @keyframes loader-dots2 {
              0% {
                transform: translate(0, 0);
              }
              100% {
                transform: translate(24px, 0);
              }
            }
          `}</style>
        </div>
      )}
    </>
  );
};

export default LoadingIndicator;

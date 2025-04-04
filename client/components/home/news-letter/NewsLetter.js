"use client";
import Button from "@/components/shared/button/Button";
import Container from "@/components/shared/container/Container";
import React, { useState } from "react";
import { BiHotel } from "react-icons/bi";
import Image from 'next/image'

const NewsLetter = () => {
  const [showAdditionalContent, setShowAdditionalContent] = useState(false);
  const [visible, setVisible] = useState(false);

  const toggleAdditionalContent = () => {
    setShowAdditionalContent(!showAdditionalContent);
  };

  return (
    <section className="h-full py-12 dark:bg-gray-900">
      <Container>
        <section className="w-full h-full lg:gap-x-4 gap-y-12 grid grid-cols-12">
          <div className="lg:col-span-5 col-span-12 rounded relative">
            <Image
              src="/assets/static/News Letter.jpg"
              alt="newsletter"
              height={302}
              width={440}
              className="rounded h-[302px] w-full object-cover border border-primary"
            />
            <div>
              <span
                className="cursor-pointer absolute top-1/3 left-1/3 h-4 w-4 bg-secondary border-2 border-primary rounded-secondary"
                onClick={toggleAdditionalContent}
              />

              {showAdditionalContent && (
                <div className="bg-white flex flex-col gap-y-3 border p-4 rounded absolute top-1/3 left-1/4 mt-5">
                <article className="flex flex-row gap-x-2">
                  <Image
                    src="/assets/static/News Letter.jpg"
                    alt="thumbnail"
                    height={300}
                    width={300}
                    className="rounded-[5px] object-cover h-[35px] w-[35px] border border-primary"
                  />
                  <div className="flex flex-col gap-y-1">
                    <h2 className="text-base line-clamp-1">مهاجرت و سرمایه‌گذاری</h2>
                    <p className="flex flex-row gap-x-0.5 items-center text-xs line-clamp-1">
                      <BiHotel className="w-4 h-4 text-primary" /> کانادا و ترکیه
                    </p>
                  </div>
                </article>
                <p className="text-xs flex flex-row justify-between items-center whitespace-nowrap">
                  <span className="flex flex-row gap-x-0.5 items-baseline">
                    شروع از 
                    <span className="text-sm text-primary dark:bg-blue-500">شنبه</span>
                  </span>
                  <span className="min-w-[1rem]" />
                  <span className="border px-3 py-0.5 rounded-secondary">
فقط 5 روز تا پایان فرصت                  </span>
                </p>
              </div>
              
              )}
            </div>
          </div>
          <div className="lg:col-span-7 col-span-12 bg-secondary/70 dark:bg-blue-500/40 rounded relative p-8">
            <Image
              src="/assets/home-page/newsletter/air-ticket.svg"
              alt="ticket"
              height={285}
              width={612}
              className="h-[285px] w-full object-contain absolute lg:-top-4 -top-8 lg:-right-[8rem] md:right-[4rem] -right-[1rem]"
            />
            <Image
              src="/assets/home-page/newsletter/target-circle.svg"
              alt="ticket"
              height={50}
              width={50}
              className="h-[50px] w-[50px] object-contain absolute lg:top-4 md:top-1 lg:left-[9.4rem] md:-left-[0.6rem] -left-[0.4rem]"
            />
            <article className="flex flex-col gap-y-4 h-full">
            <h2 className="lg:text-4xl md:text-2xl text-xl z-50">
  آینده‌ای روشن در انتظار شماست، به دنیای جدیدی قدم بگذارید
</h2>
<p className="text-sm">
  با خدمات حرفه‌ای ما در زمینه مهاجرت و ویزا، به آسانی و با اطمینان مسیر خود را برای شروع زندگی جدید در یک کشور دیگر پیدا کنید. ما همراه شما خواهیم بود تا بهترین فرصت‌ها و راهکارها را برای یک شروع موفق فراهم کنیم.
</p>


              <label
                htmlFor="newsletter"
                className="mt-auto flex flex-row gap-x-2 z-50"
              >
                {visible ? (
            <span className="text-primary drop-shadow">شما با موفقیت 
            به مجموعه ما پیوستید!</span>

                ) : (
                  <>
                    <input
                      type="email"
                      name="newsletter"
                      id="newsletter"
                      disabled={visible}
                      placeholder="ایمیل خود را وارد کنید"
                      className="w-full rounded border-1 border-primary text-sm z-50"
                    />
                    <Button
                      className="px-4 py-1 text-xs"
                      onClick={() => setVisible(true)}
                    >
                       عضویت
                    </Button>
                  </>
                )}
              </label>
            </article>
          </div>
        </section>
      </Container>
    </section>
  );
};

export default NewsLetter;

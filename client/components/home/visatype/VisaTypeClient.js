'use client';

import React from 'react';
import VisaTypeCard from './VisaTypeCard';
import HighlightText from '@/components/shared/highlightText/page';
import { useTranslations } from "next-intl";
import Container from '@/components/shared/container/Container';
import Link from 'next/link';
import { BiRightArrowAlt } from "react-icons/bi";

const VisaTypeClient = ({ visaTypes, locale }) => {
    const t = useTranslations("Visa");

    return (
        <section style={{
            backgroundImage: "url(/assets/home-page/blogs-and-travel-guide/bg.svg)",
            backgroundPosition: "125% 80%"
        }}>
            <Container>
                <div className="w-full h-full flex flex-col gap-y-6 px-4">
                    <div className="flex flex-row justify-between items-center">
                        <article className="flex flex-col gap-y-4">
                            <h2 className="lg:text-5xl md:text-4xl text-3xl whitespace-normal">
                                <HighlightText title={t("Title")} />
                            </h2>
                        </article>
                        <div className="text-primary border-b-2 border-transparent hover:border-b-primary transition-all">
                            <Link
                                href={`/visas`}
                                className="flex flex-row gap-x-1 items-center whitespace-nowrap"
                            >
                                {t("More")} <BiRightArrowAlt className="rtl:rotate-180" />
                            </Link>
                        </div>
                    </div>
                    <p className="text-base px-4">{t("Description")}</p>
                    
                    {/* Simple overflow solution instead of carousel */}
                    <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide">
                        {visaTypes.map((visaType) => (
                            <div key={visaType._id} className="flex-shrink-0 w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6">
                                <VisaTypeCard visaType={visaType} locale={locale} />
                            </div>
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default VisaTypeClient;
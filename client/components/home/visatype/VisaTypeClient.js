'use client';

import React from 'react';
import EmblaCarousel from './EmblaCarousel';
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
                </div>
                <EmblaCarousel
                    slides={visaTypes}
                    options={{ align: 'start', slidesToScroll: 1 }}
                    locale={locale}
                />
            </Container>
        </section>
    );
};

export default VisaTypeClient;
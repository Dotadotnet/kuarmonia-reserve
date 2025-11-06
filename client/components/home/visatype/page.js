import React from 'react';
import VisaTypeClient from './VisaTypeClient';

async function page({ params = "fa" }) {
  const { locale } = await params;

  const api = `${process.env.NEXT_PUBLIC_API}/visaType/get-visaTypes`;

  let visaTypes = [];

  try {
    const response = await fetch(api, {
      cache: "no-store",
      next: { tags: ["visaType"] },
      headers: {
        "Accept-Language": locale,
        "Content-Type": "application/json"
      }
    });

    const data = await response.json();
    visaTypes = data.data || [];
  } catch (error) {
    console.error("Error fetching visa types:", error);
  }

  return (
    <VisaTypeClient visaTypes={visaTypes} locale={locale}  />
  );
}

export default page;
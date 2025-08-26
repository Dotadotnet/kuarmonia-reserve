
// import Image from "next/image";
import React from "react";
import Tooltip from "../../tooltip/Tooltip";
import Image from 'next/image'
import { useTranslations } from "next-intl";

const FooterPayment = () => {
  const t = useTranslations("ForAll")
  const methods = [
    {
      id: 1,
      name: t("26"),
      logo: "/assets/payment-methods/visa.svg",
    },
    {
      id: 2,
      name: t("27"),
      logo: "/assets/payment-methods/mastercard.svg",
    },
    {
      id: 3,
      name: t("28"),
      logo: "/assets/payment-methods/paypal.svg",
    },
    {
      id: 4,
      name: t("29"),
      logo: "/assets/payment-methods/gpay.svg",
    },
  ];

  // function toBase64(str) {
  //   return btoa(unescape(encodeURIComponentComponent(str)));
  // }

  // function shimmer(width, height) {
  //   return `https://placehold.co/${width}x${height}.svg`;
  // }

  return (
    <section>
      <div className="flex flex-col gap-y-2">
        <h2 className="text-lg">{t("10")}</h2>
        <div className="flex flex-row flex-wrap gap-1.5">
          {methods.map(({ id, name, logo }) => (
            <span key={id}>
              <Tooltip text={name} txtColor={'text-white'}>
                <Image
                  src={logo}
                  alt={name}
                  width={50}
                  height={29}
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                  }}
                  // placeholder="blur"
                  // blurDataURL={`data:image/svg+xml;base64,${toBase64(
                  //   shimmer(50, 29)
                  // )}`}
                />
              </Tooltip>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FooterPayment;

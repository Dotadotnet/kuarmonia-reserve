

import Link from "next/link";
import React from "react";
import {
  BiLogoLinkedin,
  BiLogoGithub,
  BiLogoFacebook,
  BiLogoInstagram,
  BiLogoTwitter,
  BiLogoPinterest,
  BiLogoTiktok,
} from "react-icons/bi";
import Tooltip from "../../tooltip/Tooltip";

const FooterSocial = () => {
  const items = [
    {
      id: 1,
      name: "Linkedin",
      icon: <BiLogoLinkedin className="text-lg" />,
      href: "https://www.linkedin./in/kuarmonia"
    },
    {
      id: 2,
      name: "Github",
      icon: <BiLogoGithub className="text-lg" />,
      href: "https://www.github.com/kuarmonia",
    },
    {
      id: 3,
      name: "Facebook",
      icon: <BiLogoFacebook className="text-lg" />,
      href: "https://www.facebook.com/kuarmonia",
    },
    {
      id: 4,
      name: "Instagram",
      icon: <BiLogoInstagram className="text-lg" />,
      href: "https://www.instagram.com/kuarmonia",
    },
    {
      id: 5,
      name: "Twitter",
      icon: <BiLogoTwitter className="text-lg" />,
      href: "https://www.twitter.com/kuarmonia",
    },
    {
      id: 6,
      name: "Pinterest",
      icon: <BiLogoPinterest className="text-lg" />,
      href: "https://www.pinterest.com/kuarmonia",
    },
    {
      id: 7,
      name: "Tiktok",
      icon: <BiLogoTiktok className="text-lg" />,
      href: "https://www.tiktok.com/kuarmonia",
    },
  ];

  return (
    <section>
      <div className="flex flex-row flex-wrap md:justify-normal justify-center items-center gap-2">
        {items.map((item) => (
          <span
            key={item.id}
            className="border border-primary/20 dark:border-gray-500 dark:hover:text-blue-500 dark:text-gray-500 hover:border-primary dark:hover:border-blue-500 rounded p-1 h-fit w-fit"
          >
            <Tooltip text={item.name} txtColor="text-white">
              <Link href={item.href} title={item.name}>
                {item.icon}
              </Link>
            </Tooltip>
          </span>
        ))}
      </div>
    </section>
  );
};

export default FooterSocial;

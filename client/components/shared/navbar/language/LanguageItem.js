// import Link from "next/link";
// import { useRouter } from "next/router";
// import React, { useState } from "react";
// import { useLanguage } from "../../../hooks/useLanguage";

// const LanguageItem = ({ language, onCloseBox }) => {
//   const { t, locale } = useLanguage();
//   const router = useRouter();
//   const [lang, setLang] = useState(locale);

//   function onChangeHandler(e) {
//     setLang(e.currentTarget.id);
//   }

//   return (
//     <Link href={router.asPath} locale={language}>
//       <a className="whitespace-nowrap flex justify-between items-center py-1 md:py-2">
//         <div className="flex items-center" onClick={() => onCloseBox(false)}>
//           <input
//             type="radio"
//             id={language}
//             name="language"
//             value={lang}
//             className="block accent-rose-600"
//             checked={locale === language}
//             onChange={onChangeHandler}
//           />
//           <label
//             htmlFor={language}
//             className={`font-farsi mx-3 grow ${
//               locale === language && "font-bold"
//             }`}
//           >
//             {t[language]}
//           </label>
//         </div>
//       </a>
//     </Link>
//   );
// };

// export default LanguageItem;

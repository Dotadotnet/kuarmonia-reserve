// // hooks/useUserTracking.js
// import { useEffect, useMemo } from 'react';
// import { useRouter } from 'next/router';
// import { collectUserData } from '@/utils/collectData';
// import { logPageView } from '@/utils/logManager';
// import { useSelector } from "react-redux";

// const useUserTracking = () => {
//   const router = useRouter();
//   const user = useSelector((state) => state?.auth);
//   const defaultValues = useMemo(() => {
//     return {
//       id: user?._id,
//     };
//   }, [user]);

//   useEffect(() => {
//     const userId = defaultValues?.id; 

//     const handleRouteChange = (url) => {
//       const data = {
//         userId: userId || null,
//         pageUrl: url,
//         interaction: {},
//       };
//       collectUserData(data);
//     };

//     // ارسال اطلاعات بازدید اولیه
//     handleRouteChange(window.location.pathname + window.location.search);

//     // ارسال اطلاعات هر بار که مسیر تغییر می‌کند
//     router.events.on('routeChangeComplete', handleRouteChange);

//     // پاکسازی
//     return () => {
//       router.events.off('routeChangeComplete', handleRouteChange);
//     };
//   }, [router.events, defaultValues]);

//   useEffect(() => {
//     const userId = defaultValues?.id;
//     const cleanup = logPageView(userId);

//     return () => {
//       cleanup();
//     };
//   }, [defaultValues]);

//   useEffect(() => {
//     const handleClick = (event) => {
//       const data = {
//         userId: defaultValues?.id || null,
//         pageUrl: window.location.pathname + window.location.search,
//         interaction: {
//           type: 'click',
//           element: event.target.tagName,
//           id: event.target.id || null,
//           class: event.target.className || null,
//         },
//       };
//       collectUserData(data);
//     };

//     document.addEventListener('click', handleClick);

//     return () => {
//       document.removeEventListener('click', handleClick);
//     };
//   }, [defaultValues]);

//   useEffect(() => {
//     const handleScroll = () => {
//       const data = {
//         userId: defaultValues?.id || null,
//         pageUrl: window.location.pathname + window.location.search,
//         interaction: {
//           type: 'scroll',
//           scrollY: window.scrollY,
//         },
//       };
//       collectUserData(data);
//     };

//     window.addEventListener('scroll', handleScroll);

//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, [defaultValues]);

//   useEffect(() => {
//     const handleDownload = (event) => {
//       const target = event.target.closest('a');
//       if (target && target.getAttribute('href')?.match(/\.(jpg|jpeg|png|gif)$/)) {
//         const data = {
//           userId: defaultValues?.id || null,
//           pageUrl: window.location.pathname + window.location.search,
//           interaction: {
//             type: 'download',
//             fileName: target.getAttribute('href'),
//           },
//         };
//         collectUserData(data);
//       }
//     };

//     document.addEventListener('click', handleDownload);

//     return () => {
//       document.removeEventListener('click', handleDownload);
//     };
//   }, [defaultValues]);
// };

// export default useUserTracking;

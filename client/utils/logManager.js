// // utils/logManager.js
// import { collectUserData } from './collectData';

// export const logPageView = (adminId) => {
//   const entryTime = Date.now();

//   const handleUnload = (event) => {
//     const exitTime = Date.now();
//     const duration = exitTime - entryTime; // مدت زمان به میلی‌ثانیه

//     let exitType = 'close_tab';
//     if (event.type === 'beforeunload') {
//       exitType = 'close_tab';
//     } else if (event.type === 'navigate') {
//       exitType = 'navigate';
//     }

//     const data = {
//       adminId: adminId || null,
//       pageUrl: window.location.pathname + window.location.search,
//       interaction: {
//         type: 'exit',
//         exitType: exitType,
//         duration,
//       },
//     };

//     collectUserData(data);
//   };

//   window.addEventListener('beforeunload', handleUnload);

//   return () => {
//     window.removeEventListener('beforeunload', handleUnload);
//   };
// };

// export const logDownload = (adminId, element) => {
//     const data = {
//       adminId: adminId || null,
//       pageUrl: window.location.pathname + window.location.search,
//       interaction: {
//         type: 'download',
//         fileName: element.getAttribute('href') || null,
//       },
//     };
//     collectUserData(data);
//   };
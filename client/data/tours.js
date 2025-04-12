const tours = [
  {
    _id: "5f3e1e7e3f3d5b1b7e7b5d3e",
    host: "جیمز لی",
    title: "اتاق نجیب در تورین تاریخی",
    thumbnails: [
      "https://placehold.co/1280x720.svg",
      "https://placehold.co/1280x720.svg",
      "https://placehold.co/1280x720.svg",
      "https://placehold.co/1280x720.svg",
    ],
    description:
      "ما در یک ساختمان از دهه 1800 در یک خیابان آرام اما در قلب تورین تاریخی هستیم. فقط 10 دقیقه از بزرگترین میدان اروپا 'پیازا ویتوریا' که شب‌زنده‌داری در آنجا برگزار می‌شود فاصله داریم. دسترسی به تمام خدمات آسان است. در محله، یک بازار محلی با محصولات تازه روزانه وجود دارد، همچنین سوپرمارکت‌های مختلفی هم در دسترس هستند. اتوبوس برقی کوچک 'Star1' نزدیک خانه شما را به 'موله آنتونلیانا' با موزه سینما، موزه مصری یا حتی میدان باشکوه 'پیازا کاستلو' می‌رساند.",
    rating: {
      views: 159,
      number: 4,
    },
    pricingDetails: {
      amount: 41,
      deal: "نفر", // نفر یا شب یا غیره
    },
    guests: {
      adults: 2,
      children: 1,
      infants: 3,
      pets: 1,
    },
    location: "بارسلونا، کاتالونیا، اسپانیا",
    status: "برترین امتیاز",
    leastDuration: "1 روز، 2 شب",
  },
  {
    _id: "5f3e1e7e3f3d5b1b7e7b5d4e",
    host: "دانیل پارک",
    title: "اتاق دو نفره در آپارتمان دوست‌داشتنی",
    thumbnails: [
      "https://placehold.co/1280x720.svg",
      "https://placehold.co/1280x720.svg",
      "https://placehold.co/1280x720.svg",
      "https://placehold.co/1280x720.svg",
    ],
    description:
      "این آپارتمان در منطقه‌ای آرام در میلان واقع شده است و به مرکز شهر (20 دقیقه) و فرودگاه (15 دقیقه) دسترسی خوبی دارد. ایستگاه‌های اتوبوس، تراموا و قطار فقط چند قدم از خانه فاصله دارند. این آپارتمان با من به اشتراک گذاشته شده است و من مطمئن خواهم شد که همه چیز برای اقامت راحت شما مهیاست. صبحانه در دسترس نیست، اما من راحتی و نکات زیادی برای گشت و گذار در شهر به شما خواهم داد!",
    rating: {
      views: 45,
      number: 5,
    },
    pricingDetails: {
      amount: 41,
      deal: "شب", // نفر یا شب یا غیره
    },
    guests: {
      adults: 4,
      children: 2,
      infants: 3,
      pets: 0,
    },
    location: "ویروبراجان، اندونزی",
    status: "10% تخفیف",
    leastDuration: "2 روز، 3 شب",
  },
  {
    _id: "5f3e1e7e3f3d5b1b7e7b5d5e",
    host: "جک کیم",
    title: "خانه هنری GGD - اینترنت وای فای و تهویه مطبوع",
    thumbnails: [
      "https://placehold.co/1280x720.svg",
      "https://placehold.co/1280x720.svg",
      "https://placehold.co/1280x720.svg",
      "https://placehold.co/1280x720.svg",
      "https://placehold.co/1280x720.svg",
    ],
    description:
      "اتاق بزرگ در خانه-استودیو هنرمند، که فقط چند قدم با مهم‌ترین یادبودهای تاریخی و معماری شهر فاصله دارد. آپارتمان به دلیل وجود یک سری فضاهای بزرگ که به بالکن‌های سبز و پنجره‌های پانوراما باز می‌شوند، شناخته شده است. پر از کتاب‌ها و اشیاء هنری است و برای کسانی که دوست دارند در یک مکان آرام و مهمان‌نواز اقامت کنند، مناسب است. واقعاً برای مسافرانی که دوست دارند شیوه زندگی را کشف کنند و با پالرموی واقعی و شگفت‌انگیز ارتباط برقرار کنند، توصیه می‌شود.",
    rating: {
      views: 79,
      number: 2,
    },
    pricingDetails: {
      amount: 41,
      deal: "شب", // نفر یا شب یا غیره
    },
    guests: {
      adults: 1,
      children: 2,
      infants: 0,
      pets: 1,
    },
    location: "پالرموی، سیسیل، ایتالیا",
    status: "فروش لحظه‌ای",
    leastDuration: "2 روز، 3 شب",
  },
  {
    _id: "5f3e1e7e3f3d5b1b7e7b5d6e",
    host: "ساموئل سو",
    title: "اتاق دوقلو در خانه تاریخی جورجیایی",
    thumbnails: [
      "https://placehold.co/1280x720.svg",
      "https://placehold.co/1280x720.svg",
      "https://placehold.co/1280x720.svg",
    ],
    description:
      "ما یک اتاق خواب رایگان زیبا در خانه هیپی شیک خود در قلب شهر داریم. این اتاق یک تخت دو نفره دارد که شما با نور صبح زود از بالکن بیدار خواهید شد.",
    rating: {
      views: 35,
      number: 2,
    },
    pricingDetails: {
      amount: 72,
      deal: "نفر", // نفر یا شب یا غیره
    },
    guests: {
      adults: 1,
      children: 1,
      infants: 0,
      pets: 1,
    },
    location: "ادینبرو، انگلستان",
    status: "50% تخفیف",
    leastDuration: "3 روز، 2 شب",
  },
  {
    _id: "5f3e1e7e3f3d5b1b7z1b5d6e",
    host: "تام لی",
    title: "اتاق خواب آفتابی در گراسیه",
    thumbnails: [
      "https://placehold.co/1280x720.svg",
      "https://placehold.co/1280x720.svg",
      "https://placehold.co/1280x720.svg",
      "https://placehold.co/1280x720.svg",
    ],
    description:
      "یک اتاق نشیمن راحت وجود دارد که شما می‌توانید در آن استراحت کنید یا در حالی که کتاب می‌خوانید، آرامش پیدا کنید. ما یک میز بزرگ داریم که برای کار کردن از آن استفاده می‌کنیم یا اگر بخواهید هوای تازه بگیرید می‌توانید در تراس بمانید. ما یک آشپزخانه آمریکایی بزرگ داریم که برای علاقه‌مندان به آشپزی ایده‌آل است.",
    rating: {
      views: 119,
      number: 3,
    },
    pricingDetails: {
      amount: 88,
      deal: "شب", // نفر یا شب یا غیره
    },
    guests: {
      adults: 2,
      children: 1,
      infants: 1,
      pets: 2,
    },
    location: "بارسلونا، کاتالونیا، اسپانیا",
    status: "جمعه سیاه",
    leastDuration: "3 روز، 3 شب",
  },
  {
    _id: "5f3e1e7e3f3d5b1b7e7b5d9e",
    host: "تام لی",
    title: "تراس سابین - تخت دو نفره خصوصی در مرکز شهر",
    thumbnails: [
      "https://placehold.co/1280x720.svg",
      "https://placehold.co/1280x720.svg",
      "https://placehold.co/1280x720.svg",
      "https://placehold.co/1280x720.svg",
    ],
    description:
      "این مهمانخانه دارای 2 طبقه است که در منطقه مسکونی ویروبراجان واقع شده و فقط 8 دقیقه با مرکز شهر فاصله دارد. همه 3 اتاق خصوصی در طبقه دوم قرار دارند، مناسب برای 2 نفر و هر کدام دارای توالت خصوصی (آبگرمکن و تهویه مطبوع) هستند. در همان طبقه، امکانات مشترک شامل آشپزخانه، میز غذاخوری، سالن، گالری کوچک و یک تراس برای مشاهده است. طبقه اول محل زندگی والدین من است که در آن یک آشپزخانه، استخر ماهی و فضای مشترک وجود دارد که می‌توانید از آن استفاده کنید.",
    rating: {
      views: 35,
      number: 4,
    },
    pricingDetails: {
      amount: 112,
      deal: "شب", // نفر یا شب یا غیره
    },
    guests: {
      adults: 1,
      children: 0,
      infants: 0,
      pets: 0,
    },
    location: "ویروبراجان، اندونزی",
    status: "3% تخفیف",
    leastDuration: "1 روز، 1 شب",
  },
];

export default tours;

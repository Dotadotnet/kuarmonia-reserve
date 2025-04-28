export interface TimelineItemType {
    title: string;
    description: string;
    duration: string;
    link?: { url: string; text: string };
  }
  
  export const timelineData: TimelineItemType[] = [
    {
      title: 'ساخت سایت با GatsbyJS',
      description: 'ساخت و انتشار وبسایت شخصی با استفاده از GatsbyJS برای مقالات تخصصی',
      duration: 'May 26, 2024',
      link: { url: '#', text: 'مشاهده' },
    },
    {
      title: 'پایان MVP پروژه',
      description: 'نسخه اولیه MVP از یک پروژه مورد علاقه را تکمیل کردم',
      duration: 'February 04, 2024',
      link: { url: '#', text: 'مشاهده' },
    },
    {
      title: 'راه‌اندازی فضای کاری شخصی',
      description: 'تهیه میز و فضای کاری برای شروع فعالیت‌های حرفه‌ای شخصی',
      duration: 'November 04, 2023',
    },
    {
      title: 'دریافت نشان برتر Dev.to',
      description: 'کسب نشان Top 7 در Dev.to به خاطر انتشار پست‌های برجسته',
      duration: 'March 17, 2021',
      link: { url: 'https://dev.to/abdulbasit313', text: 'نمایه من' },
    },
    {
      title: 'استخدام در Acme Lab',
      description: 'شروع به کار به عنوان توسعه‌دهنده MERN Stack در شرکت Acme Lab',
      duration: 'October 08, 2020',
      link: { url: '#', text: 'اطلاعات بیشتر' },
    },
    {
      title: 'مدرک طراحی واکنش‌گرا',
      description: 'گذراندن دوره طراحی واکنش‌گرا از freeCodeCamp و دریافت گواهی‌نامه',
      duration: 'August 1, 2018',
      link: {
        url: 'https://www.freecodecamp.org/certification/basit_miyanji/responsive-web-design',
        text: 'دیدن مدرک',
      },
    },
  ];
  
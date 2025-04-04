import Head from 'next/head';
import NewsItem from './newsItem';
import Image from 'next/image'

const BlogPage = () => {
    const items = [
        {
          _id: 1,
          icon: (
            <Image
              src={"/assets/home-page/advantage/earth.svg"}
              alt={"earth"}
              height={60}
              width={60}
              className="border border-primary shadow-lg rounded-full"
            />
          ),
          title: "تجربه و تخصص",
          description:
            "تیم  ما از مشاوران و وکلای با تجربه تشکیل شده است که با قوانین و روندهای ",
        },
        {
          _id: 2,
          icon: (
            <Image
              src={"/assets/home-page/advantage/smile.svg"}
              alt={"smile"}
              height={60}
              width={60}
              className="border border-primary shadow-lg rounded-full"
            />
          ),
          title: "پشتیبانی شخصی‌سازی شده",
          description:
            "خدمات ما کاملاً متناسب با نیازهای خاص شما طراحی شده است. ما به هر مشتری توجه ",
        },
        {
          _id: 3,
          icon: (
            <Image
              src={"/assets/home-page/advantage/star.svg"}
              alt={"star"}
              height={60}
              width={60}
              className="border border-primary shadow-lg rounded-full"
            />
          ),
          title: "رویکرد سریع و کارآمد",
          description:
            "ما از روش‌های به‌روز و کارآمد استفاده می‌کنیم تا فرآیندهای مهاجرت   ",
        },
        {
          _id: 4,
          icon: (
            <Image
              src={"/assets/home-page/advantage/star.svg"}
              alt={"star"}
              height={60}
              width={60}
              className="border border-primary shadow-lg rounded-full"
            />
          ),
          title: "پشتیبانی از ابتدای تا انتهای فرآیند",
          description:
            "از مرحله ارزیابی اولیه تا پیگیری نهایی، ما در کنار شما خواهیم بود. تیم ما در ",
        },
      ];
      const newsIcon = (
      <Image
        src={"/assets/home-page/advantage/earth.svg"}
        alt={"earth"}
        height={60}
        width={60}
        className="border border-primary shadow-lg rounded-full"
      />)
        
           
            
           
    
  return (
    <main>
       <article className="flex flex-col gap-y-8">
        <title>اخبار</title>
        <div className="flex items-center gap-2">
       <Image
              src={"/assets/home-page/advantage/earth.svg"}
              alt={"earth"}
              height={60}
              width={60}
              className="border border-primary shadow-lg rounded-full"
            />
            <h1 className="text-lg">اخبار</h1>
            </div>
      <div className="flex flex-col gap-y-4">
        {items.map(({ _id, icon, title, description }) => (
          <div
            key={_id}
            className="flex gap-x-2 items-start bg-white/70 shadow p-4 rounded-primary"
          >
            {icon}
            <div className="w-full flex flex-col gap-y-1">
              <h2 className="text-lg">{title}</h2>
              <p className="text-xs lg:line-clamp-2 md:line-clamp-2 line-clamp-none">
                {description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </article>
    </main>
  );
};

export default BlogPage;

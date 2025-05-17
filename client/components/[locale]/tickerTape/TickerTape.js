
import "./Style.css";

const TickerTape = async ({locale}) => {
  
    const api = `${process.env.NEXT_PUBLIC_API}/news/get-news`;
    const response = await fetch(api, {
      cache: "no-store",
      next: { tags: ["news"] },
      headers: {
        "Accept-Language": locale
      }
    });
  
    const res = await response.json();
    const news = res.data;
  
    return (
      <div className="!bg-primary dark:!bg-blue-500 ticker-tape text-white py-1 overflow-hidden whitespace-nowrap relative">
        <div className="inline-block animate-ticker pl-full">
          <div  className="ticker-content">
            
          {news.map((item, index) => {
            const translation =
            item?.translations?.find((t) => t.language === locale)
            ?.translation?.fields;
            
            const title = translation?.title;
            
            return (
              <span key={index} className="mx-4 ">
                🔴 {title}
           
              </span>
            );
          })}
          
          </div>
        </div>
      </div>
    );
  };

  export default TickerTape;
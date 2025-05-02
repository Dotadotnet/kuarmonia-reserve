// import داده‌ها بدون تایپ
import { timelineItemData } from './data'

const TimelineItem = ({ data }) => {
  const {
    title,
    description,
    link,
    duration
  } = data

  return (
    <div className="group relative my-[10px] flex w-1/2 justify-end pr-[22px] odd:justify-start odd:self-end odd:pl-[22px] odd:pr-0 sm:pr-[30px] sm:odd:pl-[30px]">
      <div className="relative flex w-[400px] max-w-[95%] flex-col items-center rounded-[5px] px-4 py-[10px] text-center shadow-[0_0_2px_rgba(0,128,0,0.8)] dark:shadow-white after:absolute after:right-[-7.5px] after:top-[calc(50%-7.5px)] after:h-4 after:w-4 after:rotate-45 after:content-normal after:bg-gray-100 after:dark:bg-gray-900 after:shadow-primary after:dark:shadow-white group-odd:items-center group-odd:text-center group-odd:after:left-[-7.5px] group-odd:after:right-auto group-odd:after:shadow-[-1px_1px_0px_rgba(0,128,0,0.3)] dark:group-odd:after:shadow-[-1px_1px_0px_rgba(200,200,200,0.8)] sm:max-w-[70%] md:items-end md:p-4 md:text-right md:group-odd:items-start md:group-odd:text-left">
        <span className="absolute left-[5px] top-[5px] w-[calc(100%-10px)] p-[5px] text-center text-xs font-bold uppercase tracking-[1px] group-odd:left-auto group-odd:right-1 md:w-auto bg-secondary dark:bg-blue-500 rounded-sm">
          {title}
        </span>
        <time className="mt-6 text-xs text-[#777] md:mr-0">{duration}</time>
        <p className="my-4 max-w-64 text-sm sm:text-base">{description}</p>
        {link && (
          <a
            href={link.url}
            className="text-sm text-[rgb(160,160,160)] underline after:mr-0.5 after:hidden after:text-xs after:content-['►'] md:no-underline md:after:inline-block"
            target="_blank"
            rel="noopener noreferrer"
          >
            {link.text}
          </a>
        )}
        <span className="absolute -right-8 top-[calc(50%-10px)] z-50 h-5 w-5 rounded-[50%] border-[3px] border-slate-400 group-odd:-left-8 group-odd:right-auto sm:-right-10 sm:group-odd:-left-10" />
      </div>
    </div>
  );
}

export default TimelineItem;

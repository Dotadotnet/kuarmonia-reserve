
import TimelineItem from "./timeline-item";

interface TimelineDataItem {
  title: string;
  description: string;
  duration: string;
  link: {
    text: string;
    url: string;
  };
}

interface TimelineProps {
  items: TimelineDataItem[];
}

const Timeline: React.FC<TimelineProps> = ({ items }) => {
  if (items.length === 0) return null;

  return (
    <div className="relative my-10 flex flex-col after:absolute after:left-[calc(50%_-_2px)] after:h-full after:w-1 after:content-normal after:bg-slate-400">
      {items.map((data, idx) => (
        <TimelineItem key={idx} data={data} />
      ))}
    </div>
  );
};

export default Timeline;

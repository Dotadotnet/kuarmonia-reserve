import TimelineItem from "./timeline-item";
import Calendar from "@/components/icons/Calendar";
import Clock  from "@/components/icons/Clock";

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
    <div className="mx-auto max-w-screen-lg px-4 py-12">
      <section id="roadmap" className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
          <Calendar className="w-8 h-8 text-purple-600" />
          مراحل درخواست
        </h2>
        <div className="space-y-8">
          {items.map((data, index) => (
            <div key={index} className="relative">
              {index !== items.length - 1 && (
                <div className="absolute top-16 w-0.5 h-20 bg-gradient-to-b from-purple-300 to-purple-100 right-6"></div>
              )}
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                  {index + 1}
                </div>
                <div className="flex-1 dark:bg-gray-800 dark:border-gray-700 border-gray-100 bg-white border rounded-xl p-6 dark:shadow-gray-300 hover:shadow-md transition-shadow">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <h3 className="font-semibold text-gray-900 dark:text-white text-xl mb-2 md:mb-0">
                      {data.title}
                    </h3>
                    <span className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium border border-blue-200">
                      <Clock className="w-4 h-4" />
                      {data.duration}
                    </span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-100 leading-relaxed text-lg">
                    {data.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Timeline;
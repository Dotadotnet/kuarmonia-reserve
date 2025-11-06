import React from 'react';
import Link from 'next/link';
import Image from 'next/image';


const VisaTypeCard = ({ visaType, locale }) => {


  return (
    <Link
      href={`/${locale}/visa-types/${visaType.visaTypeId}/${visaType.slug}`}
      className="group relative overflow-hidden bg-white border border-gray-100 dark:border-gray-800 rounded-lg hover:shadow-xl hover:shadow-gray-200 dark:hover:border-blue-500 dark:hover:shadow-none dark:bg-gray-800 flex flex-col gap-4  p-4 delay-100 dark:text-blue-500 transition-all duration-300 ease-in-out h-fit"
    >
      <div className="flex flex-col gap-y-2">
        <div className="flex w-full justify-center">
          <div className="w-full p-1 rounded-full">
            {visaType.thumbnail?.url && (
              <Image
                src={visaType.thumbnail?.url}
                alt={visaType.title}
                width={600}
                height={600}
                className="object-cover h-24 w-full rounded"
              />
            )}
          </div>
        </div>
      </div>

      <article className="flex flex-col gap-y-2.5 items-center dark:text-white w-full mt-auto">
        <h3 className="text-base line-clamp-2 md:text-sx text-center">
          {visaType.title}
        </h3>
      </article>
    </Link>
  );
};

export default VisaTypeCard;
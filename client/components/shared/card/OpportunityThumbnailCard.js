'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import SkeletonImage from '../skeleton/SkeletonImage';
import SkeletonText from '../skeleton/SkeletonText'; 
import Time from '@/components/icons/Calendar';

export default function OpportunityThumbnailCard({ opportunity }) {
  const [showAdditionalContent, setShowAdditionalContent] = useState(false);

  const toggleAdditionalContent = () => {
    setShowAdditionalContent(!showAdditionalContent);
  };

  return (
    <div className="flex justify-between items-end gap-y-2 flex-col cols-span-1 ">
      {!opportunity?.thumbnail ? (
        opportunity?.jobType?.thumbnail ? (
          <div className="w-32 h-32 rounded-full relative">
            <Image
              src={opportunity.jobType.thumbnail.url}
              alt="feature tour"
              width={128}
              height={128}
              className="object-cover rounded-full"
            />
            <span
              className="cursor-pointer absolute top-1/4 right-1/4 h-4 w-4 bg-secondary border-2 border-primary rounded-secondary"
              onClick={toggleAdditionalContent}
            />
          </div>
        ) : (
          <SkeletonImage
            width={128}
            height={128}
            showSize={false}
            txtSize="text-3xl"
            borderRadius="rounded-full"
            className="z-0 w-full h-full"
          />
        )
      ) : (
        <div className="w-32 h-32 rounded-full relative">
          <Image
            src={opportunity.thumbnail.url}
            alt="feature tour"
            width={128}
            height={128}
            className="object-cover w-32 h-32 rounded-full"
          />
          <span
            className="cursor-pointer absolute top-1/4 right-1/4 h-4 w-4 bg-secondary border-2 border-primary rounded-secondary"
            onClick={toggleAdditionalContent}
          />
          {showAdditionalContent && (
            <div className="bg-white flex flex-col w-64 gap-y-3 border p-4 rounded absolute top-1/3 left-1/4 mt-5 z-50">
              <article className="flex flex-row gap-x-2">
                <Image
                  src={opportunity.thumbnail}
                  alt="thumbnail"
                  width={35}
                  height={35}
                  className="rounded-[5px] object-cover border border-primary"
                />
                <div className="flex flex-col gap-y-1">
                  <div className="text-sm text-gray-600 line-clamp-1 ">
                    {opportunity?.company?.name || <SkeletonText lines={1} />}
                  </div>
                  <p className="flex flex-row gap-x-0.5 items-center text-xs line-clamp-1">
                    {opportunity?.country}
                  </p>
                </div>
              </article>
              <p className="text-xs flex flex-row justify-between items-center whitespace-nowrap">
                <span className="flex flex-row gap-x-0.5 items-baseline">
                  <span className="text-sm text-primary "></span>
                </span>
                <span className="min-w-[1rem]" />
                <span className="border px-3 py-0.5 text-wrap rounded-">
                  {opportunity?.company?.bio}
                </span>
              </p>
            </div>
          )}
        </div>
      )}

      <span className="flex items-center justify-center gap-1 px-2 py-1 h-7 bg-gray-100 text-gray-500 rounded-sm whitespace-nowrap">
        <span className="min-w-10 text-sm">
          {opportunity?.endDate
            ? new Date(opportunity.endDate).toLocaleDateString('fa-IR-u-ca-persian', {
                day: 'numeric',
                month: 'long',
              })
            : ''}
        </span>
        <span className="text-xs text-gray-700">
          {' - '}
          {opportunity?.startDate
            ? new Date(opportunity.startDate).toLocaleDateString('fa-IR-u-ca-persian', {
                day: 'numeric',
                month: 'long',
              })
            : ''}
        </span>
        <Time />
      </span>
    </div>
  );
}

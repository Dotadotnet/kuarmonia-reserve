import SkeletonText from "@/components/shared/skeleton/SkeletonText";

const Description = ({ opportunity }) => (
  <div className="p-4 flex flex-col gap-y-4">
    {/* Description */}
    <section>
      <h4 className="text-xl mb-2 ">توضیحات</h4>
      <p className="text-justify leading-8">
        {opportunity?.description || <SkeletonText lines={4} />}
      </p>
    </section>
   {/* Requirements */}
    <section>
      <h4 className="text-xl mb-2">مزایا</h4>
      {opportunity.benefits?.length > 1 ? (
        <ul className="list-disc list-inside">
          {opportunity.benefits.map((item, index) => (
            <li
              key={index}
              className="min-w-10 icon-list flex items-center gap-1"
            >
              {item}
            </li>
          ))}
        </ul>
      ) : (
        <SkeletonText lines={2} />
      )}
    </section>
    {/* Responsibilities */}
    <section>
      <h4 className="text-xl mb-2 ">مسئولیت ها</h4>
      {opportunity.responsibilities?.length > 1 ? (
        <ul className="list-disc list-inside">
          {opportunity.responsibilities.map((item, index) => (
            <li
              key={index}
              className="min-w-10 icon-list  flex items-center gap-1"
            >
              {item}
            </li>
          ))}
        </ul>
      ) : (
        <SkeletonText lines={2} />
      )}
    </section>

    <section>
      <h4 className="text-xl mb-2">شرایط </h4>
      {opportunity.qualifications?.length > 1 ? (
        <ul className="list-disc list-inside">
          {opportunity.qualifications.map((item, index) => (
            <li
              key={index}
              className="min-w-10 icon-list flex items-center gap-1"
            >
              {item}
            </li>
          ))}
        </ul>
      ) : (
        <SkeletonText lines={2} />
      )}
    </section>

    <section>
      <h4 className="text-xl mb-2">مدارک </h4>
      {opportunity.documents?.length > 1 ? (
        <ul className="list-disc list-inside">
          {opportunity.documents.map((item, index) => (
            <li
              key={index}
              className="min-w-10 icon-list flex items-center gap-1"
            >
              {item}
            </li>
          ))}
        </ul>
      ) : (
        <SkeletonText lines={2} />
      )}
    </section>
 

    {/* Tags */}
    {opportunity?.tags?.length > 0 && (
      <section>
        <h4 className="text-xl mb-2">برچسب‌ها</h4>
        <div className="flex flex-wrap gap-2">
          {opportunity.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </section>
    )}
  </div>
);

export default Description;

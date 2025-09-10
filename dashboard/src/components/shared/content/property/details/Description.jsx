import { useEffect, useState } from "react";
import DetailCard from "./DetailCard";
import { toast } from "react-hot-toast";
import Inform from "@/components/icons/Inform";
import { useSelector } from "react-redux";
import Modal from "@/components/shared/modal/Modal";

const Description = ({ property }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  
  return (
    <section className="flex flex-col gap-y-2.5">
      <div className="flex flex-row gap-x-2 items-center">
        <span className="whitespace-nowrap text-sm">امکانات ملک🏡</span>
        <div className="flex flex-row gap-x-2 items-center">
          <hr className="w-full border-gray-300 dark:border-gray-700" />
        </div>

        {/* لیست امکانات */}
        <hr className="w-full" />
      </div>
      <div>
        <div className="grid grid-cols-2 gap-2">
          {property?.amenities
            ?.filter((amenity) => amenity) // حذف موارد null
            .map((amenity, index) => (
              <div
                key={index}
                className="flex items-center gap-x-2 text-gray-700 dark:text-gray-300"
              >
                {amenity.hasAmenity ? "✅" : "❌"}
                <span>{amenity.title}</span>
              </div>
            ))}
        </div>
      </div>
      <article className="flex flex-col gap-y-4">
        <button
          className="px-8 py-2 border border-black rounded-secondary bg-black hover:bg-black/90 text-white transition-colors drop-shadow w-fit flex flex-row gap-x-2 items-center"
          onClick={() => setIsOpen(!isOpen)}
        >
          نظرات
        </button>
        <div className="flex flex-row gap-x-2 items-center">
          <span className="whitespace-nowrap text-sm ">ویزگی های این ملک </span>
          <hr className="w-full" />
        </div>
        <div className="flex flex-col gap-y-4">
          {property?.features?.map((explanation, index) => (
            <DetailCard
              key={index}
              title={explanation?.title}
              content={explanation?.content}
            />
          ))}
        </div>
      </article>

      {isOpen && (
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          className="p-6 lg:w-1/3 md:w-1/2 w-full h-96"
        >
          <section className="h-full flex flex-col gap-y-6">
            <form
              action=""
              className="flex flex-row gap-x-2 items-center"
              onSubmit={handleAddReview}
            >
              <input
                type="text"
                name="comment"
                id="comment"
                placeholder="اگر ایده یا نظری دارید خوشحال می شویم با ما در میان بگذارید"
                className="w-full text-sm"
              />
              <input
                type="number"
                name="rating"
                id="rating"
                min="1"
                max="5"
                placeholder="مقدار"
                className="w-fit text-sm"
              />
              <input
                type="submit"
                value="ثبت"
                className="text-sm p-2 border bg-black text-white rounded cursor-pointer"
              />
            </form>

            {property?.reviews?.length === 0 ? (
              <p className="text-sm flex flex-row gap-x-1 items-center justify-center">
                <Inform /> هیچ نظری برای این ملک ثبت نشده!
              </p>
            ) : (
              <div className="h-full overflow-y-auto scrollbar-hide flex flex-col gap-y-4">
                {property?.reviews?.map((review, index) => (
                  <article
                    key={index}
                    className="flex flex-col gap-y-2 p-4 bg-slate-50 rounded"
                  >
                    <div className="flex flex-row gap-x-2">
                      <Image
                        src={review?.reviewer?.avatar?.url}
                        alt={review?.reviewer?.avatar?.public_id}
                        width={40}
                        height={40}
                        className="rounded object-cover h-[40px] w-[40px]"
                      />
                      <div className="flex flex-col gap-y-1">
                        <h2 className="text-base">{review?.reviewer?.name}</h2>
                        <p className="text-xs">{review?.reviewer?.email}</p>
                        <p className="text-xs">
                          {new Date(review?.createdAt).toLocaleDateString(
                            "en-GB"
                          )}{" "}
                          • ⭐ {review?.rating}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm">{review?.comment}</p>
                  </article>
                ))}
              </div>
            )}
          </section>
        </Modal>
      )}
    </section>
  );
};

export default Description;

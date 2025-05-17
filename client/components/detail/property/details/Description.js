import React, { useEffect, useState } from "react";
import DetailCard from "./DetailCard";
import Image from "next/image";
import { useAddReviewMutation } from "@/services/review/reviewApi";
import { toast } from "react-hot-toast";
import Inform from "@/components/icons/Inform";
import Modal from "@/components/shared/modal/Modal";
import { useLocale } from "next-intl";
import { useTranslations } from "next-intl";
import ShieldAlert from "@/components/icons/ShieldAlert";
import ShieldCheck from "@/components/icons/ShieldCheck";

const Description = ({ property }) => {
  const t = useTranslations("Property");

  const locale = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const [addReview, { isLoading, data, error }] = useAddReviewMutation();
  useEffect(() => {
    if (isLoading) {
      toast.loading("Adding Review...", { id: "addReview" });
    }

    if (data) {
      toast.success(data?.description, { id: "addReview" });
    }
    if (error?.data) {
      toast.error(error?.data?.description, { id: "addReview" });
    }
  }, [isLoading, data, error]);

  const handleAddReview = (e) => {
    e.preventDefault();

    addReview({
      rating: e.target.rating.value,
      comment: e.target.comment.value
    });

    event.target.reset();
  };

  return (
    <section className="flex flex-col gap-y-2.5">
      <div className="flex flex-row gap-x-2 items-center">
        <span className="whitespace-nowrap text-sm">
          
          {t("amenities")}
        </span>
        <div className="flex flex-row gap-x-2 items-center">
          <hr className="w-full border-gray-300 dark:border-gray-700" />
        </div>

        <hr className="w-full" />
      </div>
      <div>
        <div className="grid grid-cols-2 gap-2">
          {property?.amenities
            ?.filter((amenity) => amenity)
            .map((amenity, index) => {
              const translation = amenity.translations.find(
                (t) => t.language === locale && t.translation
              );

              const title =
                translation?.translation?.fields?.title || "بدون عنوان";

              return (
                <div
                  key={index}
                  className="flex items-center gap-x-2 text-gray-700 dark:text-gray-300"
                >
                  {amenity.hasAmenity ? <ShieldCheck className="w-6 h-6 text-primary" />:<ShieldAlert className="h-6 w-6 text-yellow-500"  />}
                  <span>{title}</span>
                </div>
              );
            })}
        </div>
      </div>
      <article className="flex flex-col gap-y-4">
        <button
          className="px-8 py-2 border border-black rounded-secondary bg-black hover:bg-black/90 text-white transition-colors drop-shadow w-fit flex flex-row gap-x-2 items-center"
          onClick={() => setIsOpen(!isOpen)}
        >
          {t("review-property")}
        </button>
        <div className="flex flex-row gap-x-2 items-center">
          <span className="whitespace-nowrap text-sm ">{t("features")}</span>
          <hr className="w-full" />
        </div>
        <div className="flex flex-col gap-y-4">
          {property?.translations
            ?.find(
              (translation) =>
                translation.language === locale && translation.translation
            )
            ?.translation?.fields?.features?.map((feature, index) => (
              <DetailCard
                key={index}
                title={feature?.title}
                content={feature?.content}
              />
            ))}
        </div>
      </article>

      {isOpen && (
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          className="p-6 lg:w-1/3 md:w-1/2 w-full h-96 !z-50"
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
                placeholder={t("comment")}
                className="w-full text-sm"
              />
              <input
                type="number"
                name="rating"
                id="rating"
                min="1"
                max="5"
                placeholder={t("rating")}
                className="w-fit text-sm"
              />
              <input
                type="submit"
                value={t("add-comment")}
                className="text-sm p-2 border bg-black text-white rounded cursor-pointer"
              />
            </form>

            {property?.reviews?.length === 0 ? (
              <p className="text-sm flex flex-row gap-x-1 items-center justify-center">
                <Inform /> {t("no-reviews")}
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

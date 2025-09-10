"use client";
import { useEffect, useMemo, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { RiChatQuoteFill } from "react-icons/ri";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { LiaPlusSolid } from "react-icons/lia";
import { useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { IoIosStar, IoIosStarOutline } from "react-icons/io";
import { useAddReviewMutation } from "@/services/review/reviewApi";
import { toast } from "react-hot-toast";

import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import Container from "../shared/container/Container";
import LoadImage from "../shared/image/LoadImage";
import Modal from "../shared/modal/Modal";
import Spinner from "../shared/spinner/Spinner";

const animation = { duration: 50000, easing: (t) => t };

const AllReviews = ({
  className,
  targetId,
  targetType = "rent",
  reviews = []
}) => {
  const t = useTranslations("reviews");
  const locale = useLocale();
  const { handleSubmit, control, reset } = useForm();
  const [isOpen, setIsOpen] = useState(false);
  const [reviewList, setReviewList] = useState(reviews);
  const user = useSelector((state) => state?.user);
  const [addReview, { isLoading, data, error }] = useAddReviewMutation();
  const getRandomAvatar = () => {
    const total = 50;
    const randomIndex = Math.floor(Math.random() * total) + 1;
    return `/avatar/male/${randomIndex}.png`;
  };
  useEffect(() => {
    if (isLoading) {
      toast.loading(t("addingReview"), {
        id: "add-review"
      });
    }

    if (data) {
      toast.success(data?.description, {
        id: "add-review"
      });
      setIsOpen(false);
      setReviewList([...reviewList, data.data]);
      reset();
    }

    if (error?.data) {
      toast.error(error?.data?.description, {
        id: "add-review"
      });
    }
  }, [data, error, isLoading, reset]);

  const [sliderRef] = useKeenSlider({
    loop: true,
    initial: 0,
    created(s) {
      s.moveToIdx(5, true, animation);
    },
    updated(s) {
      s.moveToIdx(s.track.details.abs + 5, true, animation);
    },
    animationEnded(s) {
      s.moveToIdx(s.track.details.abs + 5, true, animation);
    },
    breakpoints: {
      "(max-width: 768px)": {
        slides: {
          perView: 1,
          spacing: 15
        }
      },
      "(min-width: 768px)": {
        slides: {
          perView: 2,
          spacing: 15
        }
      },
      "(min-width: 1080px)": {
        slides: {
          perView: 3,
          spacing: 15
        }
      }
    }
  });

  const handleAddReview = (data) => {
    addReview({ ...data, targetId, targetType });
  };

  return (
    <section className="h-full col-span-12 py-12">
      <Container>
        <div className="w-full h-full flex flex-col gap-y-12">
          <div className="flex flex-row justify-between items-center">
            <article className="flex flex-col gap-y-4"></article>
            <div className="text-primary border-b-2 border-b-transparent hover:border-b-primary transition-all">
              <button
                className="flex flex-row gap-x-1 items-center whitespace-nowrap"
                onClick={() => setIsOpen(true)}
              >
                {t("addReview")} <LiaPlusSolid />
              </button>
            </div>
          </div>
          {reviewList?.length === 0 ? (
            <div ref={sliderRef} className="keen-slider ">
              {[...Array(4)].map((_, index) => (
                <div
                  key={index}
      className="keen-slider__slide animate-pulse  flex flex-col gap-y-4 border border-gray-200 p-4 rounded h-40"
                >
                  <div className="flex gap-x-2 items-center">
                    <div className="bg-gray-300 rounded-full h-10 w-10" />
                    <div className="flex flex-col gap-y-2 flex-1">
                      <div className="h-4 bg-gray-300 rounded w-1/2" />
                      <div className="h-3 bg-gray-200 rounded w-1/3" />
                    </div>
                  </div>
                  <div className="h-3 bg-gray-200 rounded w-full" />
                  <div className="h-3 bg-gray-200 rounded w-5/6" />
                  <div className="h-3 bg-gray-200 rounded w-3/4" />
                </div>
              ))}
            </div>
          ) : (
            <div ref={sliderRef} className="keen-slider flex gap-2">
              {reviewList.map((review, index) => (
                <article
                  key={index}
                  className="group relative flex flex-col  gap-y-4 border border-gray-200 hover:border-primary transition-colors ease-linear p-4 rounded keen-slider__slide"
                >
                  <div className="flex flex-row items-end">
                    <LoadImage
                      src={review?.reviewer?.avatar?.url || getRandomAvatar()}
                      alt={review?.reviewer?.avatar?.public_id || "avatar"}
                      width={50}
                      height={50}
                      className="rounded h-[50px] w-[50px] object-cover"
                    />
                    <div className="flex flex-row justify-between w-full">
                      <div>
                        <h2> {review?.reviewer?.name || "کاربر مهمان"}</h2>
                      </div>
                      <div className="flex flex-col items-end">
                        <p className="flex flex-row justify-center items-center gap-x-1 text-[#F9BC1D]">
                          {[1, 2, 3, 4, 5].map((star) =>
                            star <= review?.rating ? (
                              <IoIosStar key={star} className="h-5 w-5" />
                            ) : (
                              <IoIosStarOutline
                                key={star}
                                className="h-5 w-5"
                              />
                            )
                          )}
                        </p>
                        <p className="text-xs">
                          {(() => {
                            const date = new Date(review?.createdAt);
                            const day = date.getDate();
                            const suffix = (day) => {
                              if (day >= 11 && day <= 13) return "th";
                              switch (day % 10) {
                                case 1:
                                  return "st";
                                case 2:
                                  return "nd";
                                case 3:
                                  return "rd";
                                default:
                                  return "th";
                              }
                            };
                            return (
                              day +
                              suffix(day) +
                              " " +
                              date.toLocaleDateString(locale, {
                                month: "long",
                                year: "numeric"
                              })
                            );
                          })()}
                        </p>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm line-clamp-4">
                    <RiChatQuoteFill className="absolute top-2 left-2 w-6 h-6 text-primary z-10 opacity-0 group-hover:opacity-100 transition-opacity ease-linear delay-100" />
                    {review?.comment}
                  </p>
                </article>
              ))}
            </div>
          )}
        </div>
      </Container>

      {isOpen && (
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          className="lg:w-1/4 md:w-1/2 w-full z-50"
        >
          <section className="h-full w-full flex flex-col gap-y-8">
            <article className="flex flex-col gap-y-2">
              <h2 className="text-2xl drop-shadow">{t("modalTitle")}</h2>

              <ul className="text-sm list-disc list-inside">
                <li>{t("commentLimit")}</li>
                <li>{t("starLimit")}</li>
              </ul>
            </article>
            <form
              className="w-full flex flex-col gap-y-4"
              onSubmit={handleSubmit(handleAddReview)}
            >
              <Controller
                control={control}
                name="comment"
                rules={{ required: true }}
                render={({ field }) => (
                  <textarea
                    {...field}
                    name="comment"
                    id="comment"
                    rows="5"
                    maxLength="500"
                    placeholder={t("placeholder")}
                    className="w-full"
                  ></textarea>
                )}
              />

              <Controller
                name="rating"
                control={control}
                defaultValue={1}
                rules={{ required: true }}
                render={({ field }) => (
                  <p className="flex flex-row justify-center items-center gap-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        className={`cursor-pointer ${
                          star <= field.value ? "text-[#F9BC1D]" : ""
                        }`}
                        onClick={() => field.onChange(star)}
                      >
                        {star <= field.value ? (
                          <IoIosStar className="h-6 w-6" />
                        ) : (
                          <IoIosStarOutline className="h-6 w-6" />
                        )}
                      </button>
                    ))}
                  </p>
                )}
              />

              <button
                type="submit"
                className="px-8 mx-auto py-2 border border-primary rounded-secondary bg-primary hover:bg-primary/90 text-white transition-colors drop-shadow w-fit flex flex-row gap-x-2 items-center"
              >
                {isLoading ? <Spinner /> : <>{t("submit")}</>}
              </button>
            </form>
          </section>
        </Modal>
      )}
    </section>
  );
};

export default AllReviews;

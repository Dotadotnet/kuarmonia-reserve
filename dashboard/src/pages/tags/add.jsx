import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useAddTagMutation } from "@/services/tag/tagApi";
import BackButton from "@/components/shared/button/BackButton";
import SendButton from "@/components/shared/button/SendButton";
import ToggleThemeButton from "@/components/ThemeToggle";
import FormInput from "@/components/shared/input/FormInput";
import FormKeywords from "@/components/shared/input/FormKeywords";
import ThumbnailUpload from "@/components/shared/gallery/ThumbnailUpload";
import SkeletonImage from "@/components/shared/skeleton/SkeletonImage";
import StepAddTag from "./add/steps/StepAddTag";
import ThemeToggle from "../../components/ThemeToggle";

function AddTag() {
  return (
    <section className="w-screen relative h-screen overflow-hidden flex justify-center items-center p-4 ">
      <div className="wave "></div>
      <div className="wave wave2 "></div>
      <div className="wave wave3"></div>
      <div className="max-w-md w-full bg-white justify-center dark:bg-gray-900 z-50 flex flex-col gap-y-4  p-8 rounded-primary shadow-lg">
        <div className="flex flex-row  items-center gap-x-2">
          <StepAddTag />
        </div>
        <ThemeToggle />
      </div>
    </section>
  );
}

export default AddTag;

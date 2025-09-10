import { useMemo } from "react";
import FeatureListInput from "@/components/shared/input/FeatureListInput";
import SocialLinksInput from "@/components/shared/input/SocialLinksInput";

const Step11 = ({
  errors,
  features,
  register,
  setFeatures,
  socialLinksData, 
  setSocialLinksData
}) => {
  
  return (
    <>
      <FeatureListInput
        features={features}
        setFeatures={setFeatures}
        register={register}
        errors={errors}
      />
<SocialLinksInput
  socialLinksData={socialLinksData}
  setSocialLinksData={setSocialLinksData}
/>
    </>
  );
};

export default Step11;

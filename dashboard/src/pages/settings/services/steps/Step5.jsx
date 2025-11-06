import FormRoadmap from "@/components/shared/input/FormRoadmap";

const Step5 = ({ errors, roadmap, setRoadmap }) => {
  return (
    <div className="flex flex-col gap-y-4 h-96 overflow-y-auto p-2">
      <FormRoadmap
        items={roadmap}
        setItems={setRoadmap}
        errors={errors?.roadmap || {}}
      />
    </div>
  );
};

export default Step5;
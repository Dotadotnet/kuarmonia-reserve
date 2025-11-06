import { useState } from "react";
import FormPageBuilder from "@/components/shared/input/FormPageBuilder";
import OutlineEye from "@/components/icons/OutlineEye";
import ContentPreviewModal from "@/components/shared/modal/ContentPreviewModal";

const Step4 = ({
  errors,
  editorData,
  setEditorData
}) => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handleContentChange = (content) => {
    // Update the editorData state with the content
    setEditorData(content);
  };

  const openPreview = () => {
    setIsPreviewOpen(true);
  };

  const closePreview = () => {
    setIsPreviewOpen(false);
  };

  return (
    <div className="flex flex-col max-h-96 gap-y-4 overflow-y-auto p-2">
      <div className="flex flex-col">
        {/* Preview Button */}
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">* محتوا</span>
          <button
            type="button"
            onClick={openPreview}
            className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
            title="پیش نمایش محتوا"
          >
            <OutlineEye className="w-5 h-5" />
            <span className="text-sm">پیش نمایش</span>
          </button>
        </div>

        <FormPageBuilder
          id="content"
          value={editorData}
          onChange={handleContentChange}
          error={errors?.content}
          required={true}
          className="flex-1"
        />
      </div>

      {/* Content Preview Modal */}
      <ContentPreviewModal
        isOpen={isPreviewOpen}
        onClose={closePreview}
        content={editorData}
      />
    </div>
  );
};

export default Step4;
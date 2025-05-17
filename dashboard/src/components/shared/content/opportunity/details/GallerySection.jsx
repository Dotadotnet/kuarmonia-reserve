import MasonryGallery from "@/components/shared/gallery/MasonryGallery";

const GallerySection = ({ opportunity }) => {
  return (
    <div className="bg-white rounded-xl w-full">
      <MasonryGallery gallery={opportunity?.gallery || []} />
    </div>
  );
};

export default GallerySection;

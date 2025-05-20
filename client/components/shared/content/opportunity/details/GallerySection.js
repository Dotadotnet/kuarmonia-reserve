import MasonryGallery from "@/components/shared/gallery/MasonryGallery";

const GallerySection = ({ opportunity }) => {
  return (
      <MasonryGallery  gallery={opportunity?.gallery || []} />
  );
};

export default GallerySection;

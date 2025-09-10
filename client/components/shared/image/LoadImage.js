
import Image from "next/image";

const LoadImage = ({ src, alt, height , quality = 100 , priority = true  , width, ...rest }) => {


  function toBase64(str) {
    return btoa(unescape(encodeURIComponent(str)));
  }

  function shimmer(width, height) {
    return `https://placehold.co/${width}x${height}.svg`;
  }

  return (
    <Image
      src={src}
      quality={quality}
      priority={priority}
      height={height}
      width={width}
      {...rest}
    />
  );
};

export default LoadImage;
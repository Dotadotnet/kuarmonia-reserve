
const Screen = () => {
  return (
    <section className="flex  fixed top-0 right-0 z-[2222222222222] justify-center items-center h-screen w-screen bg-white">
      <video
        autoPlay
        loop
        muted
        playsInline
        width={300}
        height={300}
        className="object-contain"
      >
        <source src="/loading.webm" type="video/webm" />
      </video>
    </section>
  );
};

export default Screen;

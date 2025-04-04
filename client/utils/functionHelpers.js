







export const toggleFullscreen = (previewRef) => {
  if (document.fullscreenElement === previewRef.current) {
    // خروج از fullscreen
    document.exitFullscreen().catch((err) => {
      console.error("Error exiting fullscreen: ", err);
    });
  } else {
    // ورود به fullscreen
    if (previewRef.current.requestFullscreen) {
      previewRef.current.requestFullscreen().catch((err) => {
        console.error("Error entering fullscreen: ", err);
      });
    }
  }
};
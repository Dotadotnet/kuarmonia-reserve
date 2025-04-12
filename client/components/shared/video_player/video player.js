"use client"
import ReactPlayer from "react-player";
function Video({ src }) {
    return (
        <ReactPlayer
            url={src}
            controls
            width="100%"
            height="100%"
            style={{ backgroundColor: "#000" }}
            playing={true}
        />
    );
};

export default Video;
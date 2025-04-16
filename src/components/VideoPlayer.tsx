"use client";
import React from "react";

interface VideoPlayerProps {
  videoUrl: string;
  title?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoUrl,
  title = "Video Player",
}) => {
  return (
    <div
      id="video-player-section"
      className="relative overflow-hidden rounded-lg shadow-lg mx-auto mt-8 sm:mt-16"
      style={{
        width: "80%", // Default smaller width for mobile
        maxWidth: "1000px", // Limit width on larger screens
        aspectRatio: "16/9", // Maintain a 16:9 aspect ratio
      }}
    >
      <iframe
        src={videoUrl}
        frameBorder="0"
        allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
        allowFullScreen
        title={title}
        className="absolute top-0 left-0 w-full h-full"
        style={{ borderRadius: "inherit" }}
      />
    </div>
  );
};

export default VideoPlayer;

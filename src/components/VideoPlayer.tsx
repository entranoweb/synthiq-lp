"use client";
import * as React from 'react';

interface VideoPlayerProps {
  videoUrl: string;
  title?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl, title = "Video Player" }) => {
  return (
    <div className="relative overflow-hidden rounded-lg shadow-lg" style={{ paddingTop: "56.25%" }}>
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

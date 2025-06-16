import { useRef, useState } from "react";
import { FaDownload, FaPlay, FaPause } from "react-icons/fa";

interface VideoPlayerProps {
  videoUrl: string;
  description?: string;
}

export default function VideoPlayer({
  videoUrl,
  description
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleDownload = () => {
    console.log("Downloading video from:", videoUrl);
    const link = document.createElement("a");
    link.href = videoUrl;
    link.download = "generated-video.mp4";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="video-output">
      <div className="video-container">
        <div className={`video-overlay ${isPlaying ? "playing" : ""}`}>
          <button
            className="play-button"
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause video" : "Play video"}
          >
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
          <button
            className="mute-button"
            onClick={toggleMute}
            aria-label={isMuted ? "Unmute video" : "Mute video"}
          >
            {isMuted ? "🔇" : "🔊"}
          </button>
        </div>
        <video
          ref={videoRef}
          src={videoUrl}
          className="video-element"
          poster="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
          loop
          muted={isMuted}
          onClick={togglePlay}
        />
      </div>

      {description && (
        <div className="video-description">
          <h3>Video Description</h3>
          <p>{description}</p>
        </div>
      )}

      <button
        className="download-btn"
        onClick={handleDownload}
        aria-label="Download video"
      >
        <FaDownload />
        <span>Download Video</span>
      </button>
    </div>
  );
}

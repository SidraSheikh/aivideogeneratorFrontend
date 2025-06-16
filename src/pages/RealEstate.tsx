import { useState } from "react";
import type { FormEvent } from "react"; // Separate type import
import VideoPlayer from "../components/VideoPlayer";
import { FaHome, FaSpinner, FaCheckCircle } from "react-icons/fa";
import { GiModernCity } from "react-icons/gi";
import { MdFamilyRestroom } from "react-icons/md";

interface VideoResponse {
  success: boolean;
  videoUrl: string;
  script: string;
  timestamp: string;
}

export default function RealEstatePage() {
  const [style, setStyle] = useState<string>("Luxury");
  const [loading, setLoading] = useState<boolean>(false);
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setVideoUrl("");
    setDescription("");

    try {
      const response = await fetch(
        "https://aivideogeneratorbackend-production.up.railway.app",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            useCase: "real-estate",
            data: { style }
          })
        }
      );

      if (response.ok) {
        const data: VideoResponse = await response.json();
        if (data.success && data.videoUrl) {
          setVideoUrl(data.videoUrl);
          setDescription(data.script);
          return;
        }
      }
      useDummyData();
    } catch (err) {
      console.log("Using fallback real estate tour data");
      useDummyData();
    } finally {
      setLoading(false);
    }
  };

  const useDummyData = () => {
    setVideoUrl("https://samplelib.com/lib/preview/mp4/sample-10s.mp4");
    setDescription(
      `Stunning ${style} Property Tour\n\n` +
        `• Beautifully designed ${style.toLowerCase()} property\n` +
        `• Spacious living areas with premium finishes\n` +
        `• Perfect for ${getTargetAudience()}\n` +
        `• Contact us today to schedule a viewing!`
    );
  };

  const getTargetAudience = () => {
    switch (style) {
      case "Luxury":
        return "discerning buyers";
      case "Family-Friendly":
        return "growing families";
      case "Modern":
        return "urban professionals";
      default:
        return "home buyers";
    }
  };

  const getStyleIcon = () => {
    switch (style) {
      case "Luxury":
        return <GiModernCity className="style-icon" />;
      case "Family-Friendly":
        return <MdFamilyRestroom className="style-icon" />;
      default:
        return <FaHome className="style-icon" />;
    }
  };

  return (
    <div className="generator-container">
      <div className="generator-header">
        <h2>
          <FaHome className="header-icon" />
          <span>Real Estate Tour</span>
        </h2>
        <p>Create immersive property tours with AI</p>
      </div>

      <form onSubmit={handleSubmit} className="generator-form">
        <div className="form-group">
          <label className="form-label">
            <span>Tour Style</span>
            <div className="style-selector">
              {getStyleIcon()}
              <select
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                className="style-select"
              >
                <option value="Luxury">Luxury</option>
                <option value="Family-Friendly">Family-Friendly</option>
                <option value="Modern">Modern</option>
              </select>
            </div>
          </label>
        </div>

        <button type="submit" disabled={loading} className="generate-btn">
          {loading ? (
            <>
              <FaSpinner className="spinner" />
              <span>Generating...</span>
            </>
          ) : (
            <>
              <FaCheckCircle />
              <span>Generate Tour</span>
            </>
          )}
        </button>
      </form>

      {videoUrl && (
        <VideoPlayer videoUrl={videoUrl} description={description} />
      )}
    </div>
  );
}

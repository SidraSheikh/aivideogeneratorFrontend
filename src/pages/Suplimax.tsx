import React, { useState, FormEvent } from "react";
import VideoPlayer from "../components/VideoPlayer";
import { FaBolt, FaSpinner } from "react-icons/fa";
import { GiEnergyBreath } from "react-icons/gi";

interface VideoResponse {
  success: boolean;
  videoUrl: string;
  script: string;
}

export default function SuplimaxPage() {
  const [features, setFeatures] = useState<string>(
    "Boosts energy, Sugar-free, Vitamin B12"
  );
  const [tone, setTone] = useState<string>("Energetic");
  const [audience, setAudience] = useState<string>("Athletes");
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
            useCase: "suplimax",
            data: { features, tone, audience }
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
      console.log("Using fallback data");
      useDummyData();
    } finally {
      setLoading(false);
    }
  };

  const useDummyData = () => {
    setVideoUrl("https://samplelib.com/lib/preview/mp4/sample-5s.mp4");
    setDescription(
      `Introducing Suplimax - the ultimate energy boost for ${audience}!\n\n` +
        `Key Features:\n${features
          .split(",")
          .map((f) => `• ${f.trim()}`)
          .join("\n")}\n\n` +
        `Feel the ${tone.toLowerCase()} power of Suplimax!`
    );
  };

  return (
    <div className="generator-container suplimax-theme">
      <div className="generator-header">
        <h2>
          <FaBolt className="header-icon" />
          <span>Suplimax Generator</span>
        </h2>
        <p>Create electrifying energy drink promos with AI</p>
      </div>

      <form onSubmit={handleSubmit} className="generator-form">
        <div className="form-group">
          <label className="form-label">Key Features</label>
          <textarea
            value={features}
            onChange={(e) => setFeatures(e.target.value)}
            className="feature-input"
            placeholder="Enter key features (e.g. Boosts energy, Sugar-free, Vitamin B12)"
            rows={3}
            required
          />
        </div>

        <div className="style-grid">
          <div className="form-group">
            <label className="form-label">Tone</label>
            <div className="radio-group">
              {["Energetic", "Professional", "Trendy"].map((option) => (
                <label
                  key={option}
                  className={`radio-option ${tone === option ? "active" : ""}`}
                >
                  <input
                    type="radio"
                    name="tone"
                    value={option}
                    checked={tone === option}
                    onChange={() => setTone(option)}
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Target Audience</label>
            <div className="radio-group">
              {["Athletes", "Gamers", "Teens"].map((option) => (
                <label
                  key={option}
                  className={`radio-option ${
                    audience === option ? "active" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="audience"
                    value={option}
                    checked={audience === option}
                    onChange={() => setAudience(option)}
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <button type="submit" disabled={loading} className="generate-btn">
          {loading ? (
            <>
              <FaSpinner className="spinner" />
              <span>Generating...</span>
            </>
          ) : (
            <>
              <GiEnergyBreath />
              <span>Generate</span>
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

import { useEffect, useMemo, useState } from "react";
import FashionModelScene from "./components/FashionModelScene";
import "./App.css";
import Lenis from 'lenis'
import React, { useEffect } from 'react'


function App() {

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <div>
      <section className="h-screen flex items-center justify-center bg-pink-200">
        <h1 className="text-6xl font-bold">
          Cinematic Fashion AI
        </h1>
      </section>

      <section className="h-screen bg-white"></section>
      <section className="h-screen bg-pink-100"></section>
    </div>
  )
}


const clothingTypes = [
  {
    type: "Shirt",
    mood: "Tailored studio essential with crisp proportion control.",
    image:
      "https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&w=900&q=85",
  },
  {
    type: "Pants",
    mood: "Runway trousers with sculpted volume and clean drape.",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=85",
  },
  {
    type: "Dress",
    mood: "Couture-ready silhouette for evening and bridal concepts.",
    image:
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=900&q=85",
  },
  {
    type: "Top",
    mood: "Modular upper-body design with neckline and sleeve studies.",
    image:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=85",
  },
  {
    type: "Jacket",
    mood: "Architectural outerwear with premium shoulder structure.",
    image:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=85",
  },
  {
    type: "Skirt",
    mood: "Elegant lower-body forms from pencil lines to soft volume.",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=85",
  },
];

const storyFrames = [
  {
    title: "AI Fashion Design Studio",
    text: "A runway film that becomes your design system.",
  },
  {
    title: "Design. Visualize. Create.",
    text: "Campaign imagery, fabric studies, and designer references drift through the room.",
  },
  {
    title: "Where fashion meets intelligence and 3D design",
    text: "A living model rotates through silhouettes as the studio prepares your workspace.",
  },
  {
    title: "Enter Studio",
    text: "Move from cinematic inspiration into a professional fashion tool.",
  },
];

const optionGroups = {
  sleeves: ["Short sleeve", "Long sleeve", "Puff sleeve", "Sleeveless"],
  neck: ["Round neck", "V-neck", "Square neck", "High neck"],
  pattern: ["Plain", "Striped", "Embroidered", "Printed"],
  fabric: ["Cotton", "Silk", "Denim", "Wool", "Linen"],
};

const initialDesignOptions = {
  sleeves: "Long sleeve",
  neck: "V-neck",
  pattern: "Embroidered",
  fabric: "Silk",
  color: "#d6b56d",
};

function App() {
  const [experience, setExperience] = useState("home");
  const [isEntering, setIsEntering] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeScene, setActiveScene] = useState(0);
  const [selectedClothing, setSelectedClothing] = useState("Top");
  const [designOptions, setDesignOptions] = useState(initialDesignOptions);
  const [bodyMeasurements, setBodyMeasurements] = useState({
    height: "175",
    chest: "88",
    waist: "68",
    hips: "94",
  });
  const [styleDescription, setStyleDescription] = useState("");
  const [generatedDesignState, setGeneratedDesignState] = useState("draft");

  const selectedCard = useMemo(
    () => clothingTypes.find((item) => item.type === selectedClothing),
    [selectedClothing]
  );

  useEffect(() => {
    if (experience !== "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [experience]);

  const updateDesignOption = (key, value) => {
    setDesignOptions((current) => ({ ...current, [key]: value }));
  };

  const updateMeasurement = (key, value) => {
    setBodyMeasurements((current) => ({ ...current, [key]: value }));
  };

  const enterStudio = (target = "catalog") => {
    setIsEntering(true);
    window.setTimeout(() => {
      setExperience(target);
      setIsEntering(false);
    }, 680);
  };

  const openDesigner = (type) => {
    setSelectedClothing(type);
    setGeneratedDesignState("draft");
    setExperience("designer");
  };

  const generateDesign = () => {
    setGeneratedDesignState("generated");
    setExperience("viewer");
  };

  return (
    <main className={`fashion-app ${isEntering ? "entering-studio" : ""}`}>
      <TopNavigation
        experience={experience}
        onHome={() => setExperience("home")}
        onCatalog={() => setExperience("catalog")}
        onDesigner={() => setExperience("designer")}
        onViewer={() => setExperience("viewer")}
        onPatterns={() => setExperience("patterns")}
      />
      <div className="ambient-grid" />

      {experience === "home" && (
        <CinematicStoryHome
          activeScene={activeScene}
          designOptions={designOptions}
          scrollProgress={scrollProgress}
          selectedClothing={selectedClothing}
          onProgress={setScrollProgress}
          onSceneChange={setActiveScene}
          onEnter={() => enterStudio("catalog")}
        />
      )}

      {experience === "catalog" && (
        <ClothingCatalog selectedClothing={selectedClothing} onSelect={openDesigner} />
      )}

      {experience === "designer" && (
        <DesignLab
          selectedCard={selectedCard}
          selectedClothing={selectedClothing}
          designOptions={designOptions}
          bodyMeasurements={bodyMeasurements}
          styleDescription={styleDescription}
          onOptionChange={updateDesignOption}
          onMeasurementChange={updateMeasurement}
          onDescriptionChange={setStyleDescription}
          onGenerate={generateDesign}
        />
      )}

      {experience === "viewer" && (
        <ModelViewer
          selectedClothing={selectedClothing}
          designOptions={designOptions}
          bodyMeasurements={bodyMeasurements}
          styleDescription={styleDescription}
          onOptionChange={updateDesignOption}
          onMeasurementChange={updateMeasurement}
          onDescriptionChange={setStyleDescription}
          onPatterns={() => setExperience("patterns")}
        />
      )}

      {experience === "patterns" && (
        <PatternSystem
          selectedClothing={selectedClothing}
          designOptions={designOptions}
          generatedDesignState={generatedDesignState}
          onBack={() => setExperience("viewer")}
        />
      )}
    </main>
  );
}

function TopNavigation({
  experience,
  onHome,
  onCatalog,
  onDesigner,
  onViewer,
  onPatterns,
}) {
  const compact = experience === "home";

  return (
    <nav className={`top-nav ${compact ? "home-nav" : ""}`}>
      <button className="brand-mark" onClick={onHome}>
        Maison Neural
      </button>
      <div className="nav-actions">
        <button className={experience === "home" ? "active" : ""} onClick={onHome}>
          Home
        </button>
        <button className={experience === "catalog" ? "active" : ""} onClick={onCatalog}>
          Catalog
        </button>
        <button
          className={experience === "designer" ? "active" : ""}
          onClick={onDesigner}
        >
          Design Studio
        </button>
        <button className={experience === "viewer" ? "active" : ""} onClick={onViewer}>
          3D Viewer
        </button>
        <button
          className={experience === "patterns" ? "active" : ""}
          onClick={onPatterns}
        >
          Patterns
        </button>
      </div>
    </nav>
  );
}

function CinematicStoryHome({
  activeScene,
  designOptions,
  scrollProgress,
  selectedClothing,
  onProgress,
  onSceneChange,
  onEnter,
}) {
  const [runwayLook, setRunwayLook] = useState(0);
  const [cameraMood, setCameraMood] = useState("cinematic");

  const runwayLooks = useMemo(
    () => [
      { type: "Dress", color: "#d6b56d", fabric: "Silk" },
      { type: "Jacket", color: "#a86464", fabric: "Wool" },
      { type: "Top", color: "#6f7f65", fabric: "Linen" },
      { type: selectedClothing, color: designOptions.color, fabric: designOptions.fabric },
    ],
    [designOptions.color, designOptions.fabric, selectedClothing]
  );

  useEffect(() => {
    const updateProgress = () => {
      const maxScroll = Math.max(document.body.scrollHeight - window.innerHeight, 1);
      const nextProgress = Math.min(window.scrollY / maxScroll, 1);
      const nextScene = Math.min(Math.floor(nextProgress * storyFrames.length), 3);
      onProgress(nextProgress);
      onSceneChange(nextScene);
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, [onProgress, onSceneChange]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setRunwayLook((current) => (current + 1) % runwayLooks.length);
    }, 2800);
    return () => window.clearInterval(timer);
  }, [runwayLooks.length]);

  const activeLook = runwayLooks[runwayLook];
  const sceneProgress = Math.min(Math.max(scrollProgress * 1.16, 0), 1);
  const ctaReady = scrollProgress > 0.72;

  return (
    <section className="cinematic-story">
      <div className="film-stage">
        <div
          className="motion-backdrop"
          style={{
            transform: `scale(${1.06 + sceneProgress * 0.1}) translate3d(${
              (scrollProgress - 0.5) * -26
            }px, ${scrollProgress * -18}px, 0)`,
          }}
        />
        <div className="runway-video-sim">
          <span className="film-grain" />
          <span className="lens-bloom bloom-left" />
          <span className="lens-bloom bloom-right" />
        </div>

        <div
          className="parallax-image layer-model-one"
          style={{
            transform: `translate3d(${scrollProgress * -68}px, ${
              scrollProgress * -140
            }px, 0) rotate(${-4 + scrollProgress * 6}deg)`,
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=900&q=85"
            alt="Editorial runway model"
          />
        </div>
        <div
          className="parallax-image layer-designer"
          style={{
            transform: `translate3d(${scrollProgress * 84}px, ${
              scrollProgress * -96
            }px, 0) rotate(${5 - scrollProgress * 8}deg)`,
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=900&q=85"
            alt="Fashion designer studio reference"
          />
        </div>
        <div
          className="parallax-image layer-fabric"
          style={{
            transform: `translate3d(${scrollProgress * -36}px, ${
              scrollProgress * 76
            }px, 0) rotate(${scrollProgress * -10}deg)`,
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=85"
            alt="Luxury garment closeup"
          />
        </div>

        <div
          className="story-model"
          style={{
            transform: `translate3d(${scrollProgress * 42}px, ${
              scrollProgress * 14
            }px, 0) scale(${1 + scrollProgress * 0.08})`,
          }}
        >
          <FashionModelScene
            mode="runway"
            cameraMood={cameraMood}
            clothingType={activeLook.type}
            designOptions={{ ...designOptions, ...activeLook }}
            interactive={false}
          />
        </div>

        <div className="story-text-stack">
          {storyFrames.map((frame, index) => {
            const distance = Math.abs(activeScene - index);
            const isActive = activeScene === index;
            return (
              <article
                key={frame.title}
                className={`story-frame ${isActive ? "active" : ""}`}
                style={{
                  opacity: isActive ? 1 : Math.max(0, 0.22 - distance * 0.16),
                  transform: `translate3d(0, ${
                    (index - activeScene) * 78 - scrollProgress * 18
                  }px, 0) scale(${isActive ? 1 : 0.94})`,
                  filter: `blur(${isActive ? 0 : distance * 5}px)`,
                }}
              >
                <p className="eyebrow">Scene 0{index + 1}</p>
                <h1>{frame.title}</h1>
                <p>{frame.text}</p>
              </article>
            );
          })}
        </div>

        <div className={`enter-studio-wrap ${ctaReady ? "visible" : ""}`}>
          <button
            className="premium-cta enter-studio-button"
            onMouseEnter={() => setCameraMood("focus")}
            onMouseLeave={() => setCameraMood("cinematic")}
            onClick={onEnter}
          >
            Enter Studio
          </button>
        </div>

        <div className="film-timeline glass-panel">
          {storyFrames.map((frame, index) => (
            <span
              key={frame.title}
              className={activeScene === index ? "active" : ""}
              style={{ width: activeScene === index ? "52px" : "18px" }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ClothingCatalog({ selectedClothing, onSelect }) {
  return (
    <section className="catalog-shell screen-enter">
      <header className="section-header">
        <p className="eyebrow">Silhouette library</p>
        <h2>Choose the garment foundation</h2>
        <p>
          Select a garment family, then refine construction details in the
          dynamic design engine.
        </p>
      </header>

      <div className="type-grid">
        {clothingTypes.map((item, index) => (
          <button
            key={item.type}
            className={`type-card ${
              selectedClothing === item.type ? "selected" : ""
            } ${index % 3 === 0 ? "tall" : ""}`}
            onClick={() => onSelect(item.type)}
          >
            <img src={item.image} alt={`${item.type} fashion reference`} />
            <span className="card-aura" />
            <div>
              <span>{item.type}</span>
              <h3>{item.type}</h3>
              <p>{item.mood}</p>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

function DesignLab({
  selectedCard,
  selectedClothing,
  designOptions,
  bodyMeasurements,
  styleDescription,
  onOptionChange,
  onMeasurementChange,
  onDescriptionChange,
  onGenerate,
}) {
  return (
    <section className="designer-shell screen-enter">
      <div className="mini-viewer glass-panel">
        <FashionModelScene
          mode="atelier"
          clothingType={selectedClothing}
          designOptions={designOptions}
          interactive={false}
        />
        <div className="mini-caption">
          <p className="eyebrow">Dynamic garment lab</p>
          <h2>{selectedClothing}</h2>
          <p>{selectedCard?.mood}</p>
        </div>
      </div>

      <div className="configuration-panel glass-panel">
        <div className="section-header compact">
          <p className="eyebrow">Construction controls</p>
          <h2>Shape the design language</h2>
        </div>

        <OptionGroup
          title="Sleeve Type"
          value={designOptions.sleeves}
          options={optionGroups.sleeves}
          onChange={(value) => onOptionChange("sleeves", value)}
        />
        <OptionGroup
          title="Neck Design"
          value={designOptions.neck}
          options={optionGroups.neck}
          onChange={(value) => onOptionChange("neck", value)}
        />
        <OptionGroup
          title="Pattern Style"
          value={designOptions.pattern}
          options={optionGroups.pattern}
          onChange={(value) => onOptionChange("pattern", value)}
        />
        <OptionGroup
          title="Fabric Selection"
          value={designOptions.fabric}
          options={optionGroups.fabric}
          onChange={(value) => onOptionChange("fabric", value)}
        />

        <ColorControl
          color={designOptions.color}
          onChange={(value) => onOptionChange("color", value)}
        />

        <MeasurementControl
          measurements={bodyMeasurements}
          onChange={onMeasurementChange}
        />

        <div className="control-block">
          <h3>Text Description</h3>
          <textarea
            value={styleDescription}
            onChange={(event) => onDescriptionChange(event.target.value)}
            placeholder="Describe your design vision (e.g., elegant evening wear, modern minimalist style)"
          />
        </div>

        <button className="generate-button" onClick={onGenerate}>
          Generate 3D Fashion Design
        </button>
      </div>
    </section>
  );
}

function OptionGroup({ title, value, options, onChange }) {
  return (
    <div className="control-block">
      <h3>{title}</h3>
      <div className="pill-row">
        {options.map((option) => (
          <button
            key={option}
            className={value === option ? "active" : ""}
            onClick={() => onChange(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

function ColorControl({ color, onChange }) {
  return (
    <div className="control-block color-block">
      <div>
        <h3>Color Picker</h3>
        <p>Use the chroma lens to tune garment atmosphere.</p>
      </div>
      <label
        className="color-orb"
        style={{
          background: `radial-gradient(circle at 30% 25%, #fff, ${color} 38%, #111 100%)`,
        }}
      >
        <input
          type="color"
          value={color}
          onChange={(event) => onChange(event.target.value)}
          aria-label="Choose garment color"
        />
      </label>
    </div>
  );
}

function MeasurementControl({ measurements, onChange }) {
  return (
    <div className="control-block">
      <h3>Body Measurements</h3>
      <div className="measurement-grid">
        {Object.entries(measurements).map(([key, value]) => (
          <label key={key}>
            <span>{key}</span>
            <input
              type="number"
              value={value}
              onChange={(event) => onChange(key, event.target.value)}
            />
          </label>
        ))}
      </div>
    </div>
  );
}

function ModelViewer({
  selectedClothing,
  designOptions,
  bodyMeasurements,
  styleDescription,
  onOptionChange,
  onMeasurementChange,
  onDescriptionChange,
  onPatterns,
}) {
  return (
    <section className="viewer-shell screen-enter">
      <div className="full-viewer">
        <FashionModelScene
          mode="inspection"
          clothingType={selectedClothing}
          designOptions={designOptions}
          bodyMeasurements={bodyMeasurements}
          interactive
          showFbxModel
        />
      </div>

      <aside className="viewer-tools glass-panel">
        <p className="eyebrow">Interactive 3D simulation</p>
        <h2>{selectedClothing} preview</h2>
        <p>
          Drag to rotate, scroll to zoom, and adjust details live while the
          garment stays mapped to the studio model.
        </p>

        <OptionGroup
          title="Sleeves"
          value={designOptions.sleeves}
          options={optionGroups.sleeves}
          onChange={(value) => onOptionChange("sleeves", value)}
        />
        <OptionGroup
          title="Neck"
          value={designOptions.neck}
          options={optionGroups.neck}
          onChange={(value) => onOptionChange("neck", value)}
        />
        <OptionGroup
          title="Fabric"
          value={designOptions.fabric}
          options={optionGroups.fabric}
          onChange={(value) => onOptionChange("fabric", value)}
        />
        <ColorControl color={designOptions.color} onChange={(value) => onOptionChange("color", value)} />
        <MeasurementControl measurements={bodyMeasurements} onChange={onMeasurementChange} />

        <div className="control-block">
          <h3>Creative Direction</h3>
          <textarea
            value={styleDescription}
            onChange={(event) => onDescriptionChange(event.target.value)}
            placeholder="Refine the design story while inspecting the model."
          />
        </div>

        <button className="generate-button" onClick={onPatterns}>
          Generate Sewing Patterns
        </button>
      </aside>
    </section>
  );
}

function PatternSystem({ selectedClothing, designOptions, generatedDesignState, onBack }) {
  const pieces = ["Front", "Back", "Sleeves", "Collar"];

  return (
    <section className="pattern-shell screen-enter">
      <header className="section-header">
        <p className="eyebrow">Manufacturing handoff</p>
        <h2>Sewing pattern system</h2>
        <p>
          Production-ready visual planning for a {designOptions.fabric}{" "}
          {selectedClothing.toLowerCase()} with {designOptions.pattern.toLowerCase()} finish.
        </p>
      </header>

      <div className="pattern-layout">
        <div className="pattern-board glass-panel">
          {pieces.map((piece, index) => (
            <div key={piece} className={`pattern-piece piece-${index + 1}`}>
              <span>{piece}</span>
            </div>
          ))}
        </div>

        <aside className="guide-panel glass-panel">
          <span className="status-pill">{generatedDesignState}</span>
          <h3>Assembly Guide</h3>
          <ol>
            <li>Cut fabric</li>
            <li>Stitch shoulders</li>
            <li>Attach sleeves</li>
            <li>Join sides</li>
            <li>Finishing</li>
          </ol>
          <button className="ghost-cta dark" onClick={onBack}>
            Return to 3D Viewer
          </button>
        </aside>
      </div>
    </section>
  );
}

export default App;

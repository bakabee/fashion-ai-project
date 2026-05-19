const clothingTypes = ["Dress", "Jacket", "Skirt", "Pants", "Top"];
const fabrics = ["Cotton", "Silk", "Denim", "Wool", "Linen"];
const sleeveOptions = ["Short sleeve", "Long sleeve", "Sleeveless", "Puff sleeve"];
const neckOptions = ["Round", "V-neck", "High neck", "Boat neck"];
const patternOptions = ["Plain", "Striped", "Embroidered", "Geometric"];

const swatches = [
  { name: "Rose", value: "#e84c7c" },
  { name: "Lavender", value: "#9b6dff" },
  { name: "Onyx", value: "#1a1620" },
  { name: "Ivory", value: "#faf0e8" },
  { name: "Sage", value: "#8a9a7c" },
  { name: "Cerulean", value: "#3a7abd" },
];

function ColorSwatch({ color, selected, onSelect }) {
  return (
    <button
      onClick={() => onSelect(color.value)}
      className={`h-10 w-10 rounded-full border-2 transition ${
        selected === color.value
          ? "border-[var(--color-ink)] scale-110 shadow-[0_0_0_3px_var(--color-bg),0_0_0_5px_var(--color-ink)]"
          : "border-[rgba(32,26,31,0.15)] hover:scale-105"
      }`}
      style={{ backgroundColor: color.value }}
      title={color.name}
    />
  );
}

function OptionGroup({ label, options, value, onChange }) {
  return (
    <fieldset>
      <legend className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-[var(--color-pink)]">
        {label}
      </legend>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            className={`rounded-full px-5 py-2.5 text-sm font-bold transition ${
              value === opt
                ? "bg-[var(--color-ink)] text-[var(--color-bg)] shadow-[0_8px_20px_rgba(255,79,163,0.18)]"
                : "bg-[rgba(255,247,240,0.66)] text-[rgba(32,26,31,0.62)] border border-[rgba(32,26,31,0.1)] hover:border-[rgba(255,79,163,0.3)]"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

export default function DesignStudio({ options, setOptions }) {
  const set = (key) => (value) => setOptions((prev) => ({ ...prev, [key]: value }));

  return (
    <section className="design-studio-page px-5 py-10">
      <div className="mx-auto w-[min(1080px,100%)]">
        <div className="mb-10">
          <p className="mb-2 text-xs font-black uppercase tracking-[0.22em] text-[var(--color-pink)]">
            Design Studio
          </p>
          <h2 className="font-display text-[clamp(2.2rem,5vw,4.4rem)] font-black leading-[0.9]">
            Customize Your Garment
          </h2>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
          <div className="space-y-10">
            <OptionGroup
              label="Clothing Type"
              options={clothingTypes}
              value={options.clothingType}
              onChange={set("clothingType")}
            />
            <OptionGroup
              label="Fabric"
              options={fabrics}
              value={options.fabric}
              onChange={set("fabric")}
            />
            <OptionGroup
              label="Sleeves"
              options={sleeveOptions}
              value={options.sleeves}
              onChange={set("sleeves")}
            />
            <OptionGroup
              label="Neck Design"
              options={neckOptions}
              value={options.neck}
              onChange={set("neck")}
            />
            <OptionGroup
              label="Pattern"
              options={patternOptions}
              value={options.pattern}
              onChange={set("pattern")}
            />
          </div>

          <div className="rounded-3xl border border-[rgba(32,26,31,0.1)] bg-[rgba(255,247,240,0.56)] p-6 backdrop-blur-xl">
            <p className="mb-5 text-xs font-black uppercase tracking-[0.18em] text-[var(--color-pink)]">
              Color Palette
            </p>
            <div className="flex flex-wrap gap-3">
              {swatches.map((color) => (
                <ColorSwatch
                  key={color.value}
                  color={color}
                  selected={options.color}
                  onSelect={set("color")}
                />
              ))}
            </div>

            <div className="mt-8 rounded-2xl bg-[rgba(32,26,31,0.04)] p-4">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[rgba(32,26,31,0.42)]">
                Current Selection
              </p>
              <ul className="mt-3 space-y-1.5 text-sm">
                <li><strong>Type:</strong> {options.clothingType}</li>
                <li><strong>Fabric:</strong> {options.fabric}</li>
                <li><strong>Sleeves:</strong> {options.sleeves}</li>
                <li><strong>Neck:</strong> {options.neck}</li>
                <li><strong>Pattern:</strong> {options.pattern}</li>
              </ul>
            </div>

            <a
              href="/studio/viewer"
              className="mt-6 flex min-h-12 items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--color-pink),var(--color-purple))] font-black text-[var(--color-bg)] shadow-[0_12px_36px_rgba(255,79,163,0.28)] transition hover:-translate-y-0.5"
            >
              View in 3D →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

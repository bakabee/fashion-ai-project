export const fashionCategories = [
  {
    id: "dresses",
    category: "Dresses",
    theme: "Fluid evening silhouettes in a soft pink editorial set.",
    accent: "Rose satin / motion drape",
    images: [
      {
        src: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=88",
        alt: "Editorial model wearing a pink dress",
      },
      {
        src: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=88",
        alt: "Fashion model in a flowing dress",
      },
      {
        src: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1200&q=88",
        alt: "Studio dress silhouette with soft light",
      },
    ],
  },
  {
    id: "streetwear",
    category: "Streetwear",
    theme: "Layered urban outfits with oversized shape language.",
    accent: "Oversized / graphic / utility",
    images: [
      {
        src: "https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=1200&q=88",
        alt: "Streetwear jacket editorial outfit",
      },
      {
        src: "https://images.unsplash.com/photo-1506629905607-d405d7d3b0d2?auto=format&fit=crop&w=1200&q=88",
        alt: "Urban streetwear fashion look",
      },
      {
        src: "https://images.unsplash.com/photo-1484516758160-2c8f0a7e760d?auto=format&fit=crop&w=1200&q=88",
        alt: "Streetwear model in layered outfit",
      },
    ],
  },
  {
    id: "luxury",
    category: "Luxury",
    theme: "Tailored premium looks with sculpted proportion and polish.",
    accent: "Couture / tailored / polished",
    images: [
      {
        src: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=88",
        alt: "Luxury fashion editorial outfit",
      },
      {
        src: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=1200&q=88",
        alt: "Designer luxury fashion studio look",
      },
      {
        src: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=88",
        alt: "Polished luxury fashion styling",
      },
    ],
  },
  {
    id: "casual",
    category: "Casual",
    theme: "Clean everyday styling with relaxed silhouettes and warm light.",
    accent: "Soft basics / easy styling",
    images: [
      {
        src: "https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&w=1200&q=88",
        alt: "Casual fashion outfit in warm studio light",
      },
      {
        src: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1200&q=88",
        alt: "Minimal casual fashion look",
      },
      {
        src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=88",
        alt: "Casual editorial portrait outfit",
      },
    ],
  },
];

export const catalogItems = fashionCategories.flatMap((category) =>
  category.images.map((image, index) => ({
    id: `${category.id}-${index + 1}`,
    category: category.category,
    theme: category.theme,
    title: `${category.category} Look ${String(index + 1).padStart(2, "0")}`,
    image: image.src,
    alt: image.alt,
    details:
      index === 0
        ? "AI ranked for silhouette clarity"
        : index === 1
          ? "Saved by editorial mood boards"
          : "Ready for try-on mapping",
  }))
);

export const storyboardMetrics = [
  { label: "Moodboards synced", value: "2.4k" },
  { label: "Silhouette reads", value: "98%" },
  { label: "Try-on previews", value: "12s" },
];

import { useEffect } from "react";
import { registerScrollStory } from "../animations/registerScrollStory";

export function useScrollStory() {
  useEffect(() => registerScrollStory(), []);
}

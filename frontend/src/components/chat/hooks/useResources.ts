"use client";
import { useState, useEffect } from "react";

export interface Resource {
  id: number;
  filename: string;
  title: string;
  description: string;
  types: string;         // csv
  created_at: string;
}

export function useResources(section: "health" | "ed-resources" | "general") {
  const [items, setItems] = useState<Resource[]>([]);
  const refresh = () => {
    fetch(`/api/resources?section=${section}`)
      .then((r) => r.json())
      .then(setItems)
      .catch(console.error);
  };

  // automatically load once (and whenever the section changes)
  useEffect(() => {
    refresh();
  }, [section]);
  return { items, refresh };
}
"use client";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import type { User } from "@/components/chat/types/types";

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    api<{ id: string; nickname: string }[]>("/users")
      .then((rows) =>
        rows.map((r) => ({
          id: r.id,
          name: r.nickname,
          avatar: "https://placehold.co/40x40.png",
          isOnline: true,
        }))
      )
      .then(setUsers)
      .catch(console.error);
  }, []);

  return users;
}

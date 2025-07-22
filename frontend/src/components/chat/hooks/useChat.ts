import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export interface ChatRow {
  id: number;
  sender_id: string;
  receiver_id: string;
  text: string;
  created_at: string;
}

export function useChat(self: string, peer: string, poll = 1500) {
  const [msgs, setMsgs] = useState<ChatRow[]>([]);

  useEffect(() => {
    let stop = false;
    const loop = async () => {
      try {
        const data = await api<ChatRow[]>(
          `/chat?self=${self}&peer=${peer}`
        );
        if (!stop) setMsgs(data);
      } catch (e) { console.error(e); }
      if (!stop) setTimeout(loop, poll);
    };
    loop();
    return () => { stop = true; };
  }, [self, peer, poll]);

  const send = async (text: string) => {
    await api("/chat", {
      method: "POST",
      body: JSON.stringify({ senderId: self, receiverId: peer, text }),
    });
  };

  return { msgs, send };
}
"use client";

import type { Message, User } from "@/components/chat/types/types";
import { ScrollArea } from "@/components/chat/ui/scroll-area";
import { ChatMessage } from "./chat-message";
import { useEffect, useRef } from "react";

interface ChatMessagesProps {
  messages: Message[];
  currentUser: User;
  users: User[];
}

export function ChatMessages({
  messages,
  currentUser,
  users,
}: ChatMessagesProps) {
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <ScrollArea className="flex-1 p-4 bg-white" ref={scrollAreaRef}>
      <div className="space-y-6">
        {messages.map((message) => {
          const sender = users.find((u) => u.id === message.senderId);
          if (!sender) return null;
          return (
            <ChatMessage
              key={message.id}
              message={message}
              sender={sender}
              isCurrentUser={message.senderId === currentUser.id}
            />
          );
        })}
      </div>
    </ScrollArea>
  );
}

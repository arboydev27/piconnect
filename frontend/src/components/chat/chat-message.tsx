"use client";

import type { Message, User } from "@/components/chat/types/types";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/chat/ui/avatar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface ChatMessageProps {
  message: Message;
  sender: User;
  isCurrentUser: boolean;
}

export function ChatMessage({
  message,
  sender,
  isCurrentUser,
}: ChatMessageProps) {
  return (
    <div
      className={cn(
        "flex items-start gap-3",
        isCurrentUser && "flex-row-reverse"
      )}
    >
      <Avatar className="h-8 w-8 ring-2 ring-white shadow">
        <AvatarImage
          src={sender.avatar}
          alt={sender.name}
          data-ai-hint="avatar"
        />
        <AvatarFallback>{sender.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div
        className={cn(
          "flex flex-col gap-1.5 rounded-lg px-3 py-2 max-w-xs md:max-w-md shadow-sm",
          isCurrentUser ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"
        )}
      >
        <div className="flex items-baseline gap-2">
          <p
            className={cn(
              "font-semibold text-sm",
              isCurrentUser ? "text-white" : "text-gray-800"
            )}
          >
            {sender.name}
          </p>
          <time
            className={cn(
              "text-xs",
              isCurrentUser
                ? "text-gray-200 opacity-70"
                : "text-gray-500 opacity-70"
            )}
          >
            {format(new Date(message.timestamp), "HH:mm")}
          </time>
        </div>
        <p className="text-sm leading-relaxed whitespace-pre-wrap">
          {message.text}
        </p>
      </div>
    </div>
  );
}

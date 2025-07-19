"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/chat/ui/textarea";
import { SendHorizontal } from "lucide-react";
import { useToast } from "@/components/chat/hooks/use-toast";

interface ChatInputProps {
  onSendMessage: (text: string) => void;
}

export function ChatInput({ onSendMessage }: ChatInputProps) {
  const [text, setText] = useState("");
  const { toast } = useToast();

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onSendMessage(text);
      setText("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  return (
    <div className="p-4 bg-white border-t border-gray-200">
      <form onSubmit={handleSendMessage} className="relative">
        <Textarea
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          className="pr-16 min-h-[50px] resize-none rounded-md border border-gray-300 text-sm text-gray-900 placeholder-gray-400 bg-white"
        />
        <Button
          type="submit"
          size="icon"
          disabled={!text.trim()}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400"
        >
          <SendHorizontal />
          <span className="sr-only">Send message</span>
        </Button>
      </form>
    </div>
  );
}

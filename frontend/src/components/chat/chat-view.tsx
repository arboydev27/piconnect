"use client";

import type { User, Message } from "@/components/chat/types/types";
import { ChatTopbar } from "./chat-topbar";
import { ChatMessages } from "./chat-messages";
import { ChatInput } from "./chat-input";

interface ChatViewProps {
  currentUser: User;
  selectedUser: User;
  messages: Message[];
  onSendMessage: (text: string) => void;
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
}

export function ChatView({
  currentUser,
  selectedUser,
  messages,
  onSendMessage,
  onToggleSidebar,
  isSidebarOpen,
}: ChatViewProps) {
  return (
    <div className="flex flex-col h-full w-full bg-white text-gray-800">
      <ChatTopbar
        selectedUser={selectedUser}
        onToggleSidebar={onToggleSidebar}
        isSidebarOpen={isSidebarOpen}
      />
      <ChatMessages
        messages={messages}
        currentUser={currentUser}
        users={[currentUser, selectedUser]}
      />
      <ChatInput onSendMessage={onSendMessage} />
    </div>
  );
}

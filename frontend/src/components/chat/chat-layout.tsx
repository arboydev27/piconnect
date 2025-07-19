"use client";

import { useState } from "react";
import type { User, Message } from "@/components/chat/types/types";
import { UserList } from "@/components/chat/user-list";
import { ChatView } from "./chat-view";
import { cn } from "@/lib/utils";

interface ChatLayoutProps {
  currentUser: User;
  users: User[];
  selectedUser: User;
  messages: Message[];
  onSendMessage: (text: string) => void;
  onUserSelect: (user: User) => void;
}

export function ChatLayout({
  currentUser,
  users,
  selectedUser,
  messages,
  onSendMessage,
  onUserSelect,
}: ChatLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen w-full bg-[#FFFFFF]">
      <div
        className={cn(
          "border-r transition-all duration-300 ease-in-out",
          "flex flex-col",
          isSidebarOpen ? "w-full md:w-80" : "w-0 md:w-20"
        )}
      >
        <UserList
          users={users}
          currentUser={currentUser}
          selectedUser={selectedUser}
          onUserSelect={onUserSelect}
          isCollapsed={!isSidebarOpen}
        />
      </div>
      <div className="flex-1 flex flex-col">
        <ChatView
          currentUser={currentUser}
          selectedUser={selectedUser}
          messages={messages}
          onSendMessage={onSendMessage}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          isSidebarOpen={isSidebarOpen}
        />
      </div>
    </div>
  );
}

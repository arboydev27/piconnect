"use client";

import type { User } from "@/components/chat/types/types";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/chat/ui/avatar";
import { Button } from "@/components/ui/button";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatTopbarProps {
  selectedUser: User;
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
}

export function ChatTopbar({
  selectedUser,
  onToggleSidebar,
  isSidebarOpen,
}: ChatTopbarProps) {
  return (
    <div className="w-full h-16 flex items-center justify-between px-4 md:px-6 border-b border-gray-200 bg-white shadow-sm">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleSidebar}
          className="md:hidden text-gray-600 hover:text-gray-800"
        >
          <span className="sr-only">Toggle sidebar</span>
          {isSidebarOpen ? <PanelLeftClose /> : <PanelLeftOpen />}
        </Button>
        <Avatar className="h-10 w-10 ring-2 ring-white shadow">
          <AvatarImage
            src={selectedUser.avatar}
            alt={selectedUser.name}
            data-ai-hint="avatar"
          />
          <AvatarFallback>{selectedUser.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="font-semibold text-gray-800 text-sm md:text-base">
            {selectedUser.name}
          </span>
          <span
            className={cn(
              "mt-0.5 inline-flex items-center gap-1 text-[11px] font-medium",
              selectedUser.isOnline ? "text-green-600" : "text-gray-500"
            )}
          >
            <span
              className={cn(
                "inline-block h-2 w-2 rounded-full",
                selectedUser.isOnline ? "bg-green-500" : "bg-gray-400"
              )}
            />
            {selectedUser.isOnline ? "Online" : "Offline"}
          </span>
        </div>
      </div>
    </div>
  );
}

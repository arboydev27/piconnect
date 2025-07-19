"use client";

import type { User } from "@/components/chat/types/types";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/chat/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/chat/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/chat/ui/tooltip";

interface UserListProps {
  users: User[];
  currentUser: User;
  selectedUser: User;
  onUserSelect: (user: User) => void;
  isCollapsed: boolean;
}

export function UserList({
  users,
  currentUser,
  selectedUser,
  onUserSelect,
  isCollapsed,
}: UserListProps) {
  return (
    <div className="flex flex-col h-full bg-white text-gray-800">
      <div className="p-4 border-b border-gray-200">
        <div
          className={cn(
            "flex items-center gap-3",
            isCollapsed && "justify-center"
          )}
        >
          <Avatar className="h-10 w-10 ring-2 ring-white shadow">
            <AvatarImage
              src={currentUser.avatar}
              alt={currentUser.name}
              data-ai-hint="avatar"
            />
            <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className={cn("flex flex-col", isCollapsed && "hidden")}>
            <p className="font-semibold text-gray-800">{currentUser.name}</p>
            <p className="text-xs text-gray-500">My Account</p>
          </div>
        </div>
      </div>
      <ScrollArea className="flex-1">
        <TooltipProvider delayDuration={0}>
          <div className={cn("p-2 space-y-1", isCollapsed && "p-1")}>
            {users.map((user) =>
              isCollapsed ? (
                <Tooltip key={user.id}>
                  <TooltipTrigger asChild>
                    <Button
                      variant={
                        selectedUser.id === user.id ? "secondary" : "ghost"
                      }
                      className="w-full justify-center h-12"
                      size="icon"
                      onClick={() => onUserSelect(user)}
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={user.avatar}
                          alt={user.name}
                          data-ai-hint="avatar"
                        />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>{user.name}</p>
                  </TooltipContent>
                </Tooltip>
              ) : (
                <Button
                  key={user.id}
                  variant={selectedUser.id === user.id ? "secondary" : "ghost"}
                  className="w-full justify-start h-14 hover:bg-gray-100"
                  onClick={() => onUserSelect(user)}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar>
                        <AvatarImage
                          src={user.avatar}
                          alt={user.name}
                          data-ai-hint="avatar"
                        />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      {user.isOnline && (
                        <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white" />
                      )}
                    </div>
                    <div className="text-left">
                      <p className="font-semibold truncate text-gray-800">
                        {user.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {user.isOnline ? "Online" : "Offline"}
                      </p>
                    </div>
                  </div>
                </Button>
              )
            )}
          </div>
        </TooltipProvider>
      </ScrollArea>
    </div>
  );
}

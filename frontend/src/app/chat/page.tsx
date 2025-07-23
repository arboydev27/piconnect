"use client";

import { useState, useEffect } from "react";
import { useUsers } from "@/components/chat/hooks/useUsers";
import { useChat } from "@/components/chat/hooks/useChat";
import type { User } from "@/components/chat/types/types";
import { ChatLayout } from "@/components/chat/chat-layout";
import ProfileSetup from "@/components/chat/profile-setup";
import { useToast } from "@/components/chat/hooks/use-toast";
import Sidebar from "@/components/ui/sidebar";

export default function ChatPage() {
  const { toast } = useToast();

  // current user (null until profile created)
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // static mock users + runtime current user
  const users = useUsers();

  // default to first mock peer
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // live messages from backend
  const { msgs: backendMsgs, send } = useChat(
    currentUser?.id ?? "",
    selectedUser?.id ?? ""
  );

  useEffect(() => {
    if (users.length && currentUser && !selectedUser) {
      const firstPeer = users.find((u) => u.id !== currentUser.id);
      if (firstPeer) setSelectedUser(firstPeer);
    }
  }, [users, currentUser, selectedUser]);

  const handleProfileSetup = async (name: string) => {
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      const data = await res.json(); // { id: "42" }
      const newUser: User = {
        id: data.id,
        name,
        avatar: `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(
          name
        )}`,
        isOnline: true,
      };

      setCurrentUser(newUser);
    } catch (err) {
      console.error(err);
      toast({ title: "Could not create profile" });
    }
  };

  if (!currentUser || !selectedUser) {
    return (
      <Sidebar>
        <ProfileSetup onProfileSetup={handleProfileSetup} />
      </Sidebar>
    );
  }

  return (
    <Sidebar>
      <div className="h-[70vh] md:h-[80vh] flex flex-col rounded-lg shadow-lg bg-white overflow-hidden">
        <ChatLayout
          currentUser={currentUser}
          selectedUser={selectedUser}
          users={users.filter((u) => u.id !== currentUser.id)}
          messages={backendMsgs.map((m) => ({
            id: m.id.toString(),
            senderId: m.sender_id,
            receiverId: m.receiver_id,
            text: m.text,
            timestamp: new Date(m.created_at),
          }))}
          onSendMessage={send}
          onUserSelect={setSelectedUser}
        />
      </div>
    </Sidebar>
  );
}

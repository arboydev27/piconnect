"use client";

import { useState } from "react";
import {
  users as initialUsers,
  messages as initialMessages,
} from "@/components/chat/lib/mock-data";
import type { User, Message } from "@/components/chat/types/types";
import { ChatLayout } from "@/components/chat/chat-layout";
import ProfileSetup from "@/components/chat/profile-setup";
import { useToast } from "@/components/chat/hooks/use-toast";
import Sidebar from "@/components/ui/sidebar";

export default function ChatPage() {
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [selectedUser, setSelectedUser] = useState<User>(initialUsers[1]);

  const handleSendMessage = async (text: string) => {
    if (!currentUser) return;

    const newMessage: Message = {
      id: (messages.length + 1).toString(),
      senderId: currentUser.id,
      receiverId: selectedUser.id,
      text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
  };

  const handleProfileSetup = (name: string) => {
    const newUser: User = {
      id: "user-current",
      name,
      avatar: `https://placehold.co/40x40.png`,
      isOnline: true,
    };
    setCurrentUser(newUser);
    setUsers((prev) => [newUser, ...prev]);
    setSelectedUser(users[0]);
  };

  if (!currentUser) {
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
          messages={messages.filter(
            (m) =>
              (m.senderId === currentUser.id &&
                m.receiverId === selectedUser.id) ||
              (m.senderId === selectedUser.id &&
                m.receiverId === currentUser.id)
          )}
          onSendMessage={handleSendMessage}
          onUserSelect={setSelectedUser}
        />
      </div>
    </Sidebar>
  );
}

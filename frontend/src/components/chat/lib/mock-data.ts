import type { User, Message } from "@/components/chat/types/types";

export const users: User[] = [
  {
    id: "user-1",
    name: "Alice",
    avatar: "https://placehold.co/40x40.png",
    isOnline: true,
  },
  {
    id: "user-2",
    name: "Bob",
    avatar: "https://placehold.co/40x40.png",
    isOnline: false,
  },
  {
    id: "user-3",
    name: "Charlie",
    avatar: "https://placehold.co/40x40.png",
    isOnline: true,
  },
  {
    id: "user-4",
    name: "Diana",
    avatar: "https://placehold.co/40x40.png",
    isOnline: true,
  },
];

export const messages: Message[] = [
  {
    id: "1",
    senderId: "user-1",
    receiverId: "user-2",
    text: "Hey Bob, how are you?",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
  },
  {
    id: "2",
    senderId: "user-2",
    receiverId: "user-1",
    text: "I'm good, Alice! Just working on the new project. How about you?",
    timestamp: new Date(Date.now() - 1000 * 60 * 58),
  },
  {
    id: "3",
    senderId: "user-1",
    receiverId: "user-2",
    text: "Same here. Did you see this article? https://www.theverge.com/2023/10/26/23933423/google-ai-updates-magic-compose-bard-pixel-8-pnas",
    timestamp: new Date(Date.now() - 1000 * 60 * 55),
  },
  {
    id: "4",
    senderId: "user-3",
    receiverId: "user-4",
    text: "Lunch today?",
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
  },
];

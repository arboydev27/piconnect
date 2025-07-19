"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/chat/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface ProfileSetupProps {
  onProfileSetup: (name: string) => void;
}

export default function ProfileSetup({ onProfileSetup }: ProfileSetupProps) {
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onProfileSetup(name.trim());
    }
  };

  return (
    <div className="h-[70vh] md:h-[80vh] flex items-center justify-center rounded-lg shadow-lg bg-white">
      {/* center the card */}
      <div className="flex items-center justify-center">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-800">
              Welcome to PiConnect Chat
            </CardTitle>
            <CardDescription className="text-sm text-gray-600">
              Enter your name to start chatting.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="grid gap-4">
              <div className="grid gap-2 text-gray-700">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-500 placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                Join Chat
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}

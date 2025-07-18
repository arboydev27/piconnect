import React from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  MessageSquare,
  Vote,
  BookOpen,
  HeartPulse,
  ArrowRight,
} from "lucide-react";

const Home = () => {
  const features = [
    {
      title: "Local Chat",
      description: "Communicate with others on the local network.",
      href: "/chat",
      icon: MessageSquare,
      color: "bg-[#A0C4FF]",
    },
    {
      title: "Community Voting",
      description: "Participate in local polls and make decisions together.",
      href: "/vote",
      icon: Vote,
      color: "bg-[#BDB2FF]",
    },
    {
      title: "Resource Hub",
      description: "Access educational articles, videos, and more.",
      href: "/resources",
      icon: BookOpen,
      color: "bg-[#A0C4FF]",
    },
    {
      title: "Health & Wellness",
      description: "Find important health information and resources.",
      href: "/health",
      icon: HeartPulse,
      color: "bg-[#BDB2FF]",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight font-headline text-[#353B41]">
          Welcome to PiConnect Hub
        </h1>
        <p className="mt-2 text-lg text-muted-foreground text-[#64748B]">
          Your offline community space for connection and knowledge.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
        {features.map((feature) => {
          const Icon = feature.icon; // ✅ assign to capitalized variable
          return (
            <Link href={feature.href} key={feature.title} className="group">
              <Card className="h-full transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl bg-[#FFFFFF]">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-xl font-semibold text-[#353B41]">
                    {feature.title}
                  </CardTitle>
                  <div className={`p-3 rounded-lg ${feature.color}`}>
                    <Icon className="w-6 h-6 text-primary text-[#0A6EFE]" />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-[#64748B]">
                    {feature.description}
                  </p>
                  <div className="flex items-center mt-4 font-semibold text-primary text-[#0D6DFD]">
                    Go to section{" "}
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Home;

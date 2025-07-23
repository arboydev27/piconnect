"use client";
import React, { useState } from "react";
import Sidebar from "@/components/ui/sidebar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Video, Download, Plus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Dropzone from "@/components/ui/dropzone";

const resources = {
  education: [
    {
      title: "Introduction to Programming",
      description: "A comprehensive guide for beginners.",
      type: "pdf",
      icon: FileText,
      fileName: "intro_to_programming.pdf",
    },
    {
      title: "History of the World",
      description: "A video series exploring ancient civilizations.",
      type: "video",
      icon: Video,
      fileName: "history_of_the_world.mp4",
    },
    {
      title: "Algebra Basics",
      description: "Learn the fundamentals of algebra.",
      type: "pdf",
      icon: FileText,
      fileName: "algebra_basics.pdf",
    },
    {
      title: "Economics of Sustainability",
      description: "A detailed book about sustuinable economies.",
      type: "pdf",
      icon: FileText,
      fileName: "economics_of_sustainability.pdf",
    },
    {
      title: "Community Gardening Guide",
      description: "How to start and maintain a community garden.",
      type: "pdf",
      icon: FileText,
      fileName: "community_gardening.pdf",
    },
    {
      title: "Local History Archive",
      description: "A collection of articles about our local history.",
      type: "pdf",
      icon: FileText,
      fileName: "local_history_archive.pdf",
    },
    {
      title: "Sustainable Agriculture",
      description: "Techniques for sustainable farming practices.",
      type: "pdf",
      icon: FileText,
      fileName: "sustainable_agriculture.pdf",
    },
  ],
  announcements: [
    {
      title: "Community Meeting Notes",
      description: "Summary of the last community meeting on 24th July.",
      type: "pdf",
      icon: FileText,
      fileName: "meeting_notes_july24.pdf",
    },
    {
      title: "Upcoming Events",
      description: "List of events for the next month.",
      type: "pdf",
      icon: FileText,
      fileName: "upcoming_events.pdf",
    },
    {
      title: "Local Business Directory",
      description: "A directory of local businesses and services.",
      type: "pdf",
      icon: FileText,
      fileName: "local_business_directory.pdf",
    },
    {
      title: "New Safety Guidelines",
      description: "Important safety guidelines for our community.",
      type: "pdf",
      icon: FileText,
      fileName: "safety_guidelines.pdf",
    },
  ],
};

function ResourceCard({
  title,
  description,
  icon: Icon,
  fileName,
}: {
  title: string;
  description: string;
  icon: React.ElementType;
  fileName: string;
}) {
  return (
    <Card className="bg-[#FFFFFF]">
      <CardHeader className="grid grid-cols-[1fr_auto] items-start gap-4 space-y-0">
        <div className="space-y-1">
          <CardTitle className="text-[#353B41]">{title}</CardTitle>
          <CardDescription className="text-[#64748B]">
            {description}
          </CardDescription>
        </div>
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#F1F5F9]">
          <Icon className="w-6 h-6 text-secondary-foreground text-[#353B41]" />
        </div>
      </CardHeader>
      <CardContent>
        <Button size="sm" className="w-full bg-[#0D6DFD]" asChild>
          <a className="flex flex-row" href={`/resources/${fileName}`} download>
            <Download className="mr-2 h-4 w-4" />
            <div>Download</div>
          </a>
        </Button>
      </CardContent>
    </Card>
  );
}

const ResourcesPage = () => {
  const [showDropzone, setShowDropzone] = useState(false);

  return (
    <Sidebar>
      <div className="space-y-8">
        <div className="flex flex-row justify-between items-center">
          <h1 className="text-3xl font-bold font-headline !text-[#353B41]">
            Resource Hub
          </h1>
          <button
            onClick={() => setShowDropzone(true)}
            className="border px-2 py-2 md:px-3 md:py-2 rounded-full md:rounded-lg bg-[#0f172a] flex flex-row items-center gap-2"
          >
            <Plus className="w-6 h-6 text-white" />
            <span className="hidden md:inline ">Upload</span>
          </button>
        </div>
        <Tabs defaultValue="education" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
            <TabsTrigger
              value="education"
              className="!bg-[#F0F4F8] !text-[#0F172A]"
            >
              Education
            </TabsTrigger>
            <TabsTrigger
              value="announcements"
              className="!bg-[#F0F4F8] !text-[#0F172A]"
            >
              Announcements
            </TabsTrigger>
          </TabsList>
          <TabsContent value="education">
            <div className="grid gap-6 mt-6 md:grid-cols-2 lg:grid-cols-3">
              {resources.education.map((res) => (
                <ResourceCard key={res.title} {...res} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="announcements">
            <div className="grid gap-6 mt-6 md:grid-cols-2 lg:grid-cols-3">
              {resources.announcements.map((res) => (
                <ResourceCard key={res.title} {...res} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
      {showDropzone && (
        <div className="fixed inset-0 z-50 flex items-center jsutify-center bg-black/50">
          <div className="relative">
            <Dropzone onClose={() => setShowDropzone(false)} />
          </div>
        </div>
      )}
    </Sidebar>
  );
};

export default ResourcesPage;

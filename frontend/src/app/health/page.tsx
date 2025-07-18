"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Sidebar from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { FileText, Video, Download, HeartPulse, Plus } from "lucide-react";
import Dropzone from "@/components/ui/dropzone";

const healthResources = [
  {
    title: "First Aid Guide",
    description: "Essential first aid procedures for common injuries.",
    type: "pdf",
    icon: FileText,
    category: "Emergency",
    fileName: "first_aid.pdf",
  },
  {
    title: "Healthy Eating Habits",
    description: "A video guide to maintaining a balanced diet.",
    type: "video",
    icon: Video,
    category: "Nutrition",
    fileName: "healthy_eating.mp4",
  },
  {
    title: "Mental Wellness Tips",
    description: "Strategies for managing stress and anxiety.",
    type: "pdf",
    icon: FileText,
    category: "Mental Health",
    fileName: "mental_wellness.pdf",
  },
  {
    title: "Basic Hygiene Practices",
    description: "Information on staying clean and healthy.",
    type: "pdf",
    icon: FileText,
    category: "Hygiene",
    fileName: "hygiene.pdf",
  },
  {
    title: "Basic CPR Techniques",
    description: "Learn how to perform CPR in emergencies.",
    type: "pdf",
    icon: FileText,
    category: "Emergency",
    fileName: "cpr_techniques.pdf",
  },
  {
    title: "Local Health Services",
    description: "A guide to local clinics and health services.",
    type: "pdf",
    icon: FileText,
    category: "Resources",
    fileName: "local_health_services.pdf",
  },
  {
    title: "Vaccination Information",
    description: "Details on available vaccinations in the community.",
    type: "pdf",
    icon: FileText,
    category: "Health",
    fileName: "vaccination_info.pdf",
  },
  {
    title: "Community Health Events",
    description: "Upcoming health events and workshops in the area.",
    type: "pdf",
    icon: FileText,
    category: "Events",
    fileName: "community_health_events.pdf",
  },
];

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
        <div className="flex items-center justify-center w-12 h-12 text-accent-foreground rounded-full bg-soft-purple bg-[#F1F5F9]">
          <Icon className="w-6 h-6 text-[#353B41]" />
        </div>
      </CardHeader>
      <CardContent>
        <Button size="sm" className="w-full bg-[#0D6DFD]" asChild>
          <a href={`/resources/health/${fileName}`} download>
            <Download className="mr-2 h-4 w-4" />
            Download
          </a>
        </Button>
      </CardContent>
    </Card>
  );
}

const HealthPage = () => {
  const [showDropzone, setShowDropzone] = useState(false);

  return (
    <Sidebar>
      <div className="space-y-8">
        <div className="flex flex-row justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-destructive/20 bg-[#EF444433]">
              <HeartPulse className="w-8 h-8 text-destructive text-[#F83030]" />
            </div>
            <div>
              <h1 className="text-3xl font-bold font-headline text-[#353B41]">
                Health & Wellness
              </h1>
              <p className="text-muted-foreground text-[#64748B]">
                Essential health resources for our community.
              </p>
            </div>
          </div>
          <div>
            <button
              onClick={() => setShowDropzone(true)}
              className="border px-2 py-2 md:px-3 md:py-2 rounded-full md:rounded-lg bg-[#0f172a] flex flex-row items-center gap-2"
            >
              <Plus className="w-6 h-6 text-white" />
              <span className="hidden md:inline ">Upload</span>
            </button>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {healthResources.map((res) => (
            <ResourceCard key={res.title} {...res} />
          ))}
        </div>
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

export default HealthPage;

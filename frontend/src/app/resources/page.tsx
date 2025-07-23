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
import { FileText, Video, Download, Plus, Trash } from "lucide-react";
import Dropzone from "@/components/ui/dropzone";
import { useResources } from "@/components/chat/hooks/useResources";

function ResourceCard({
  id,
  title,
  description,
  icon: Icon,
  fileName,
  onDelete,
}: {
  id: number;
  title: string;
  description: string;
  icon: React.ElementType;
  fileName: string;
  onDelete: (id: number) => void;
}) {
  return (
    <Card className="bg-[#FFFFFF] flex flex-col h-full">
      <CardHeader className="grid grid-cols-[1fr_auto] items-start gap-4 space-y-0 relative flex-1">
        <div className="space-y-1">
          <CardTitle className="text-[#353B41] line-clamp-2 min-h-[3rem] break-all">
            {title}
          </CardTitle>
          <CardDescription className="text-[#64748B] line-clamp-3">
            {description}
          </CardDescription>
        </div>
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#F1F5F9]">
          <Icon className="w-6 h-6 text-secondary-foreground text-[#353B41]" />
        </div>
        <button
          onClick={() => onDelete(id)}
          className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-100"
          title="Delete"
        >
          <Trash className="w-4 h-4 text-red-600" />
        </button>
      </CardHeader>
      <CardContent className="mt-auto">
        <Button size="sm" className="w-full bg-[#0D6DFD]" asChild>
          <a
            className="flex flex-row"
            href={`/uploads/${encodeURIComponent(fileName)}`}
            download
          >
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
  const { items: resources, refresh } = useResources("ed-resources");

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
        <div className="grid gap-6 mt-6 md:grid-cols-2 lg:grid-cols-3">
          {resources.length === 0 ? (
            <p>No resources yet.</p>
          ) : (
            resources.map((r) => (
              <ResourceCard
                key={r.id}
                id={r.id}
                title={r.title}
                description={r.description}
                icon={r.types.includes("video") ? Video : FileText}
                fileName={r.filename}
                onDelete={async (id) => {
                  const res = await fetch(`/api/resources/${id}`, {
                    method: "DELETE",
                  });
                  if (res.ok) refresh();
                  else alert("Failed to delete.");
                }}
              />
            ))
          )}
        </div>
      </div>
      {showDropzone && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="relative">
            <Dropzone
              section="ed-resources"
              onClose={() => setShowDropzone(false)}
              onUploadComplete={() => {
                setShowDropzone(false);
                refresh();
              }}
            />
          </div>
        </div>
      )}
    </Sidebar>
  );
};

export default ResourcesPage;

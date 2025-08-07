import AvatarDisplay from "@/components/AvatarDisplay";
import FeatureSelector from "@/components/FeatureSelector";
import { Button } from "@/components/ui/button";
import { AvatarFeatures, avatarFeatureOptions, defaultAvatarFeatures } from "@/types/avatar";
import html2canvas from "html2canvas";
import React, { useRef, useState } from "react";
import { toast } from "sonner";

const AvatarBuilderPage: React.FC = () => {
  const [features, setFeatures] = useState<AvatarFeatures>(defaultAvatarFeatures);
  const avatarRef = useRef<HTMLDivElement>(null);

  const handleSelectFeature = (category: string, feature: string) => {
    setFeatures((prev) => ({
      ...prev,
      [category]: feature,
    }));
    toast.success(`Selected ${feature} for ${category}!`);
  };

  const handleReset = () => {
    setFeatures(defaultAvatarFeatures);
    toast.info("Avatar reset to default!");
  };

  const handleRandomize = () => {
    const newFeatures: AvatarFeatures = { ...defaultAvatarFeatures };
    for (const category in avatarFeatureOptions) {
      const options = (avatarFeatureOptions as any)[category];
      const randomIndex = Math.floor(Math.random() * options.length);
      (newFeatures as any)[category] = options[randomIndex];
    }
    setFeatures(newFeatures);
    toast.info("Avatar randomized!");
  };

  const handleDownload = async () => {
    if (avatarRef.current) {
      const toastId = toast.loading("Generating avatar image...");
      try {
        const canvas = await html2canvas(avatarRef.current, {
          backgroundColor: null, // Transparent background
          useCORS: true, // Important for images loaded from other origins
        });
        const image = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = image;
        link.download = "my-avatar.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast.dismiss(toastId);
        toast.success("Avatar downloaded successfully!");
      } catch (error) {
        toast.dismiss(toastId);
        console.error("Error downloading avatar:", error);
        toast.error("Failed to download avatar. Please try again.");
      }
    } else {
      toast.error("Avatar display not found.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <h1 className="text-4xl font-bold mb-8 text-gray-800 dark:text-gray-100">
        Virtual Avatar Builder
      </h1>
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 w-full max-w-4xl">
        <div className="flex-shrink-0">
          <AvatarDisplay features={features} ref={avatarRef} />
        </div>
        <div className="flex-grow w-full">
          <FeatureSelector
            selectedFeatures={features}
            onSelectFeature={handleSelectFeature}
          />
          <div className="mt-6 flex flex-col sm:flex-row justify-center md:justify-start gap-4">
            <Button onClick={handleRandomize} variant="secondary">
              Randomize Avatar
            </Button>
            <Button onClick={handleReset} variant="destructive">
              Reset Avatar
            </Button>
            <Button onClick={handleDownload}>
              Download Avatar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvatarBuilderPage;
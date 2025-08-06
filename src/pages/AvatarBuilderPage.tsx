import React, { useState } from "react";
import AvatarDisplay from "@/components/AvatarDisplay";
import FeatureSelector from "@/components/FeatureSelector";
import { defaultAvatarFeatures, AvatarFeatures, avatarFeatureOptions } from "@/types/avatar";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const AvatarBuilderPage: React.FC = () => {
  const [features, setFeatures] = useState<AvatarFeatures>(defaultAvatarFeatures);

  const handleSelectFeature = (category: keyof AvatarFeatures, feature: string) => {
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

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <h1 className="text-4xl font-bold mb-8 text-gray-800 dark:text-gray-100">
        Virtual Avatar Builder
      </h1>
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 w-full max-w-4xl">
        <div className="flex-shrink-0">
          <AvatarDisplay features={features} />
        </div>
        <div className="flex-grow w-full">
          <FeatureSelector
            selectedFeatures={features}
            onSelectFeature={handleSelectFeature}
          />
          <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
            <Button onClick={handleRandomize} variant="secondary">
              Randomize Avatar
            </Button>
            <Button onClick={handleReset} variant="destructive">
              Reset Avatar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvatarBuilderPage;
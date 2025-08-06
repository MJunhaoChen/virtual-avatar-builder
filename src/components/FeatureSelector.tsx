import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { avatarFeatureOptions } from "@/types/avatar";

interface FeatureSelectorProps {
  selectedFeatures: { [key: string]: string };
  onSelectFeature: (category: string, feature: string) => void;
}

const FeatureSelector: React.FC<FeatureSelectorProps> = ({
  selectedFeatures,
  onSelectFeature,
}) => {
  const categories = Object.keys(avatarFeatureOptions);

  return (
    <Tabs defaultValue={categories[0]} className="w-full max-w-md">
      <ScrollArea className="w-full whitespace-nowrap rounded-md border">
        <TabsList className="w-full justify-start">
          {categories.map((category) => (
            <TabsTrigger key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </TabsTrigger>
          ))}
        </TabsList>
      </ScrollArea>
      {categories.map((category) => (
        <TabsContent key={category} value={category} className="mt-4">
          <div className="grid grid-cols-2 gap-2">
            {(avatarFeatureOptions as any)[category].map((feature: string) => (
              <Button
                key={feature}
                variant={
                  selectedFeatures[category] === feature ? "default" : "outline"
                }
                onClick={() => onSelectFeature(category, feature)}
                className="capitalize"
              >
                {feature}
              </Button>
            ))}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default FeatureSelector;
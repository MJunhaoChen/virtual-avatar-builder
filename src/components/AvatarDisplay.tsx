import React from "react";
import { AvatarFeatures } from "@/types/avatar";
import { cn } from "@/lib/utils";

interface AvatarDisplayProps {
  features: AvatarFeatures;
}

const AvatarDisplay = React.forwardRef<HTMLDivElement, AvatarDisplayProps>(({ features }, ref) => {
  const featureStyles: { [key: string]: string } = {
    head: "w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center text-xs font-bold",
    eyes: "w-12 h-4 bg-gray-700 rounded-full absolute top-8",
    mouth: "w-8 h-2 bg-gray-700 rounded-full absolute bottom-8",
    hair: "w-28 h-12 bg-yellow-600 rounded-t-full absolute -top-4",
    clothes: "w-28 h-20 bg-blue-500 rounded-b-lg absolute bottom-0",
  };

  const getHeadShapeClass = (shape: string) => {
    switch (shape) {
      case "round":
        return "rounded-full";
      case "square":
        return "rounded-md";
      case "oval":
        return "rounded-full scale-y-125";
      default:
        return "rounded-full";
    }
  };

  const getEyeShapeClass = (shape: string) => {
    switch (shape) {
      case "normal":
        return "w-12 h-4";
      case "wide":
        return "w-16 h-4";
      case "narrow":
        return "w-12 h-2";
      default:
        return "w-12 h-4";
    }
  };

  const getMouthShapeClass = (shape: string) => {
    switch (shape) {
      case "smile":
        return "w-8 h-2 rounded-b-full";
      case "frown":
        return "w-8 h-2 rounded-t-full";
      case "neutral":
        return "w-8 h-1";
      default:
        return "w-8 h-2 rounded-b-full";
    }
  };

  const getHairStyleClass = (style: string) => {
    switch (style) {
      case "short":
        return "w-28 h-12 rounded-t-full";
      case "long":
        return "w-28 h-24 rounded-t-full rounded-b-lg";
      case "curly":
        return "w-28 h-16 rounded-full";
      case "bald":
        return "w-0 h-0"; // No hair
      default:
        return "w-28 h-12 rounded-t-full";
    }
  };

  const getClothesStyleClass = (style: string) => {
    switch (style) {
      case "t-shirt":
        return "w-28 h-20 rounded-b-lg";
      case "hoodie":
        return "w-32 h-24 rounded-b-lg rounded-t-md";
      case "suit":
        return "w-30 h-28 rounded-b-lg rounded-t-sm";
      default:
        return "w-28 h-20 rounded-b-lg";
    }
  };

  return (
    <div ref={ref} className="relative w-48 h-64 flex flex-col items-center justify-center bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Hair */}
      <div
        className={cn(
          "absolute z-20 bg-yellow-600",
          getHairStyleClass(features.hair),
          features.hair === "bald" ? "hidden" : "block",
          features.hair === "long" ? "top-0" : "-top-4",
        )}
      ></div>

      {/* Head */}
      <div
        className={cn(
          "relative z-10 bg-gray-300 flex items-center justify-center text-xs font-bold",
          featureStyles.head,
          getHeadShapeClass(features.head),
        )}
      >
        {/* Eyes */}
        <div
          className={cn(
            "absolute bg-gray-700",
            getEyeShapeClass(features.eyes),
            "left-1/2 -translate-x-1/2 top-8 flex justify-between px-1",
          )}
        >
          <div className="w-2 h-2 bg-white rounded-full"></div>
          <div className="w-2 h-2 bg-white rounded-full"></div>
        </div>
        {/* Mouth */}
        <div
          className={cn(
            "absolute bg-gray-700",
            getMouthShapeClass(features.mouth),
            "left-1/2 -translate-x-1/2 bottom-8",
          )}
        ></div>
      </div>

      {/* Clothes */}
      <div
        className={cn(
          "absolute z-0 bg-blue-500",
          getClothesStyleClass(features.clothes),
          "bottom-0",
        )}
      ></div>
    </div>
  );
});

export default AvatarDisplay;
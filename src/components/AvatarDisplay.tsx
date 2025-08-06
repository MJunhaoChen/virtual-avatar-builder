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

  // Map hairColor to Tailwind color classes, with optional variant for spiky hair
  const getHairColorClass = (color: string, variant: number = 0) => {
    switch (color) {
      case "blonde":
        return ["bg-yellow-300", "bg-yellow-400", "bg-yellow-200"][variant] || "bg-yellow-300";
      case "brown":
        return ["bg-yellow-900", "bg-yellow-800", "bg-yellow-700"][variant] || "bg-yellow-900";
      case "black":
        return ["bg-gray-900", "bg-gray-800", "bg-gray-700"][variant] || "bg-gray-900";
      case "red":
        return ["bg-red-700", "bg-red-500", "bg-orange-600"][variant] || "bg-red-700";
      case "gray":
        return ["bg-gray-400", "bg-gray-300", "bg-gray-200"][variant] || "bg-gray-400";
      default:
        return "bg-yellow-300";
    }
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
      case "spiky":
        return "w-28 h-12"; // base for spiky, but will render custom below
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
        return "w-32 h-28 rounded-b-lg rounded-t-sm";
      default:
        return "w-28 h-20 rounded-b-lg";
    }
  };

  return (
    <div ref={ref} className="relative w-48 h-64 flex flex-col items-center justify-center bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Hair */}
      {features.hair === "spiky" ? (
        <div className="absolute z-20 left-1/2 -translate-x-1/2 top-12 flex flex-row gap-1">
          {/* Five spikes */}
          <div className={cn("w-3 h-8 rounded-t-full transform -rotate-12", getHairColorClass(features.hairColor))}></div>
          <div className={cn("w-3 h-10 rounded-t-full transform -rotate-6", getHairColorClass(features.hairColor, 1))}></div>
          <div className={cn("w-4 h-12 rounded-t-full", getHairColorClass(features.hairColor, 2))}></div>
          <div className={cn("w-3 h-10 rounded-t-full transform rotate-6", getHairColorClass(features.hairColor, 1))}></div>
          <div className={cn("w-3 h-8 rounded-t-full transform rotate-12", getHairColorClass(features.hairColor))}></div>
        </div>
      ) : (
        <div
          className={cn(
            "absolute z-20",
            getHairColorClass(features.hairColor),
            getHairStyleClass(features.hair),
            features.hair === "bald" ? "hidden" : "block",
            features.hair === "long" ? "top-0" : (features.hair === "short" ? "top-10" : features.hair === "curly" ? "top-6" : "top-0"),
          )}
        ></div>
      )}

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
      {features.clothes === "suit" ? (
        <div className="absolute z-0 bottom-0 left-1/2 -translate-x-1/2 w-32 h-28 flex items-end justify-center">
          {/* Suit body */}
          <div className="absolute w-32 h-28 bg-gray-800 rounded-b-lg"></div>
          {/* Shirt center */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-20 bg-white rounded-b-md z-10"></div>
          {/* Left lapel */}
          <div className="absolute left-8 top-4 w-6 h-16 bg-gray-700 rounded-tl-lg rounded-bl-2xl transform -rotate-20 z-20"></div>
          {/* Right lapel */}
          <div className="absolute right-8 top-4 w-6 h-16 bg-gray-700 rounded-tr-lg rounded-br-2xl transform rotate-20 z-20"></div>
        </div>
      ) : features.clothes === "hoodie" ? (
        <>
          {/* Hoodie body */}
          <div className="absolute z-0 left-1/2 -translate-x-1/2 bottom-0 w-32 h-24 bg-green-700 rounded-b-2xl"></div>
          {/* Drawstrings */}
          <div className="absolute z-20 left-1/2 -translate-x-1/2 bottom-16 flex flex-row gap-2">
            <div className="w-1 h-6 bg-white rounded-full"></div>
            <div className="w-1 h-6 bg-white rounded-full"></div>
          </div>
        </>
      ) : (
        <div
          className={cn(
            "absolute z-0 bg-blue-500",
            getClothesStyleClass(features.clothes),
            "bottom-0",
          )}
        ></div>
      )}
    </div>
  );
});

export default AvatarDisplay;
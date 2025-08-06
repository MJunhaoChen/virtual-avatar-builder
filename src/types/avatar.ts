export type AvatarFeatures = {
  head: string;
  eyes: string;
  mouth: string;
  hair: string;
  clothes: string;
};

export const defaultAvatarFeatures: AvatarFeatures = {
  head: "round",
  eyes: "normal",
  mouth: "smile",
  hair: "short",
  clothes: "t-shirt",
};

export const avatarFeatureOptions = {
  head: ["round", "square", "oval"],
  eyes: ["normal", "wide", "narrow"],
  mouth: ["smile", "frown", "neutral"],
  hair: ["short", "long", "curly", "bald"],
  clothes: ["t-shirt", "hoodie", "suit"],
};
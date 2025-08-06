export type AvatarFeatures = {
  head: string;
  eyes: string;
  mouth: string;
  hair: string;
  hairColor: string;
  clothes: string;
};

export const defaultAvatarFeatures: AvatarFeatures = {
  head: "round",
  eyes: "normal",
  mouth: "smile",
  hair: "short",
  hairColor: "blonde",
  clothes: "t-shirt",
};

export const avatarFeatureOptions = {
  head: ["round", "square", "oval"],
  eyes: ["normal", "wide", "narrow"],
  mouth: ["smile", "frown", "neutral"],
  hair: ["short", "long", "curly", "spiky", "bald"],
  hairColor: ["blonde", "brown", "black", "red", "gray"],
  clothes: ["t-shirt", "hoodie", "suit"],
};
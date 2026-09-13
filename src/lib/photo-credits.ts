import records from "@/data/photo-credits.json";

export type PhotoCredit = {
  id: string;
  title: string;
  author: string;
  source: string;
  license: string;
  licenseUrl: string;
  description: string;
  paths: string[];
  changes: string;
};
export const photoCredits: PhotoCredit[] = records;
export function creditForPhoto(path?: string) {
  return photoCredits.find((photo) => path && photo.paths.includes(path));
}

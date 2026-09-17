// Client logos as supplied by Ramdev Enterprises in public/images/clients.
// Filenames were provided out of order, so each entry below is mapped to
// its verified logo file individually. c15.avif is a generic stock template
// (not a real client logo), so only c15.jpg (Doshi Housings) is used.
// Logos are auto-trimmed (see scripts/trim-client-logos.mjs) to remove
// inconsistent built-in whitespace/padding baked into the source files.
export type Client = { name: string; logo: string };
export const clients: Client[] = [
  { name: "Casagrand Pvt Ltd", logo: "/images/clients/trimmed/c1.jpg.png" },
  { name: "Abhirami Builders", logo: "/images/clients/trimmed/c2.jpg.png" },
  { name: "Akshaya Builder", logo: "/images/clients/trimmed/c3.webp.png" },
  { name: "BBCL", logo: "/images/clients/trimmed/c4.webp.png" },
  { name: "Legendary", logo: "/images/clients/trimmed/c5.png.png" },
  { name: "Lifestyle", logo: "/images/clients/trimmed/c6.webp.png" },
  { name: "Plaza", logo: "/images/clients/trimmed/c7.webp.png" },
  { name: "Vencer Project", logo: "/images/clients/trimmed/c8.png.png" },
  { name: "TVH", logo: "/images/clients/trimmed/c9.jpg.png" },
  { name: "VGN", logo: "/images/clients/trimmed/c10.jpg.png" },
  {
    name: "Vijay Raja Builders",
    logo: "/images/clients/trimmed/c11.jpg.png",
  },
  { name: "URC", logo: "/images/clients/trimmed/c12.png.png" },
  { name: "DRA Homes", logo: "/images/clients/trimmed/c13.jpg.png" },
  { name: "Narsi Intoriyar", logo: "/images/clients/trimmed/c14.png.png" },
  { name: "Doshi Housings", logo: "/images/clients/trimmed/c15.jpg.png" },
  { name: "Brigade", logo: "/images/clients/trimmed/c16.webp.png" },
  { name: "DAC Developers", logo: "/images/clients/trimmed/c17.png.png" },
  { name: "Radian Realty", logo: "/images/clients/trimmed/c18.jpeg.png" },
  {
    name: "Enfini Construction",
    logo: "/images/clients/trimmed/c19.avif.png",
  },
  { name: "SB Construction", logo: "/images/clients/trimmed/c20.jpg.png" },
  { name: "Magan Infra", logo: "/images/clients/trimmed/c21.webp.png" },
  {
    name: "Mass Construction",
    logo: "/images/clients/trimmed/c22.webp.png",
  },
  {
    name: "L&T Project (Larsen & Toubro)",
    logo: "/images/clients/trimmed/c23.png.png",
  },
  { name: "Indian Oil", logo: "/images/clients/trimmed/c24.webp.png" },
  { name: "Chettinad Builder", logo: "/images/clients/trimmed/c25.png.png" },
  { name: "Ocean Interior", logo: "/images/clients/trimmed/c26.png.png" },
  { name: "S&P Builder", logo: "/images/clients/trimmed/c27.jpg.png" },
  {
    name: "SSS Hi-Tech Construction",
    logo: "/images/clients/trimmed/c28.png.png",
  },
  { name: "Navin's Homes", logo: "/images/clients/trimmed/c29.png.png" },
  { name: "Ganga Sweet", logo: "/images/clients/trimmed/c30.webp.png" },
  { name: "Purvica Store", logo: "/images/clients/trimmed/c31.jpeg.png" },
  { name: "Jayachandra Mall", logo: "/images/clients/trimmed/c32.png.png" },
  { name: "Sarvana Store", logo: "/images/clients/trimmed/c33.png.png" },
  { name: "Interlace Pvt Ltd", logo: "/images/clients/trimmed/c34.png.png" },
];

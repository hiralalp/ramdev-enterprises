export const company = {
  name: "Ramdev Enterprises",
  addressLine1: "1st Floor 49/2 Vembuliamman Koil Street",
  locality: "Karanai",
  city: "Chennai",
  postalCode: "600130",
  district: "Chengalpattu",
  state: "Tamil Nadu",
  country: "India",
  phoneDisplay: "91 76507264",
  phoneHref: "",
  email: "ramdeventerprises15@gmail.com",
  gstin: "33DVEPK6522D1ZX",
  pan: "DVEPK6522D",
};

export const address = `${company.addressLine1}, ${company.locality}, ${company.city} - ${company.postalCode}, ${company.district}, ${company.state}, ${company.country}`;
export const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

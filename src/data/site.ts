export const SITE = {
  name: "Zama Gadgets",
  tagline: "Quality Beyond",
  phone: "+256 709 321161",
  phoneHref: "tel:+256709321161",
  whatsapp: "256709321161",
  email: "zamagadgets@gmail.com",
  address: "New Pioneer Mall, Wilson Street, Shop No. PA 23, Kampala, Uganda",
  merchant: "7040710",
  mtnMerchant: "82992038",
  tiktok: "https://www.tiktok.com/@zama.gadgets?_r=1&_t=ZS-98xA1leMvGT",
};

export function waLink(message: string) {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
}
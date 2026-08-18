import laptop from "@/assets/laptop.jpg.asset.json";
import laptopGrey from "@/assets/laptop-grey.jpg.asset.json";
import tablet from "@/assets/tablet.jpg.asset.json";
import accessories from "@/assets/accessories.jpg.asset.json";

import i11 from "@/assets/products/iphone-11.webp.asset.json";
import i11pro from "@/assets/products/iphone-11-pro.webp.asset.json";
import i11promax from "@/assets/products/iphone-11-pro-max.webp.asset.json";
import i12 from "@/assets/products/iphone-12.webp.asset.json";
import i12pro from "@/assets/products/iphone-12-pro.webp.asset.json";
import i12promax from "@/assets/products/iphone-12-pro-max.webp.asset.json";
import i13 from "@/assets/products/iphone-13.webp.asset.json";
import i13pro from "@/assets/products/iphone-13-pro.webp.asset.json";
import i13promax from "@/assets/products/iphone-13-pro-max.webp.asset.json";
import i14 from "@/assets/products/iphone-14.webp.asset.json";
import i14plus from "@/assets/products/iphone-14-plus.webp.asset.json";
import i14pro from "@/assets/products/iphone-14-pro.webp.asset.json";
import i14promax from "@/assets/products/iphone-14-pro-max.webp.asset.json";
import i15 from "@/assets/products/iphone-15.webp.asset.json";
import i15plus from "@/assets/products/iphone-15-plus.webp.asset.json";
import i15pro from "@/assets/products/iphone-15-pro.webp.asset.json";
import i15promax from "@/assets/products/iphone-15-pro-max.webp.asset.json";
import i16 from "@/assets/products/iphone-16.webp.asset.json";
import i16plus from "@/assets/products/iphone-16-plus.webp.asset.json";
import i16pro from "@/assets/products/iphone-16-pro.webp.asset.json";
import i16promax from "@/assets/products/iphone-16-pro-max.webp.asset.json";
import i17 from "@/assets/products/iphone-17.webp.asset.json";
import i17pro from "@/assets/products/iphone-17-pro.webp.asset.json";
import i17promax from "@/assets/products/iphone-17-pro-max.webp.asset.json";
import iair from "@/assets/products/iphone-air.webp.asset.json";
import mbProM5 from "@/assets/products/macbook-pro-m5.webp.asset.json";
import ipad10 from "@/assets/products/ipad-10.webp.asset.json";
import ipadAirM3 from "@/assets/products/ipad-air-m3.webp.asset.json";

export type Category = "iPhones" | "MacBooks" | "Tablets" | "Accessories";

export type Product = {
  id: string;
  name: string;
  category: Category;
  condition: "Brand New" | "UK Used" | "New & Used";
  specs: string;
  image: string;
  badge?: string;
};

export const PRODUCTS: Product[] = [
  { id: "iphone-11", name: "iPhone 11", category: "iPhones", condition: "UK Used", specs: "6.1\" Liquid Retina HD · Dual 12MP camera", image: i11.url },
  { id: "iphone-11-pro", name: "iPhone 11 Pro", category: "iPhones", condition: "UK Used", specs: "5.8\" Super Retina XDR · Triple 12MP camera", image: i11pro.url },
  { id: "iphone-11-pro-max", name: "iPhone 11 Pro Max", category: "iPhones", condition: "UK Used", specs: "6.5\" Super Retina XDR · Triple 12MP camera", image: i11promax.url },
  { id: "iphone-12", name: "iPhone 12", category: "iPhones", condition: "New & Used", specs: "6.1\" Super Retina XDR · 5G · Dual 12MP", image: i12.url },
  { id: "iphone-12-pro", name: "iPhone 12 Pro", category: "iPhones", condition: "UK Used", specs: "6.1\" Super Retina XDR · Triple 12MP · LiDAR", image: i12pro.url },
  { id: "iphone-12-pro-max", name: "iPhone 12 Pro Max", category: "iPhones", condition: "UK Used", specs: "6.7\" Super Retina XDR · Triple 12MP camera", image: i12promax.url },
  { id: "iphone-13", name: "iPhone 13", category: "iPhones", condition: "New & Used", specs: "6.1\" Super Retina XDR · A15 Bionic", image: i13.url },
  { id: "iphone-13-pro", name: "iPhone 13 Pro", category: "iPhones", condition: "UK Used", specs: "6.1\" 120Hz ProMotion · Triple 12MP", image: i13pro.url },
  { id: "iphone-13-pro-max", name: "iPhone 13 Pro Max", category: "iPhones", condition: "UK Used", specs: "6.7\" 120Hz ProMotion · Triple 12MP", image: i13promax.url, badge: "Hot" },
  { id: "iphone-14", name: "iPhone 14", category: "iPhones", condition: "New & Used", specs: "6.1\" Super Retina XDR · Dual camera · A15", image: i14.url },
  { id: "iphone-14-plus", name: "iPhone 14 Plus", category: "iPhones", condition: "New & Used", specs: "6.7\" Super Retina XDR · All-day battery", image: i14plus.url },
  { id: "iphone-14-pro", name: "iPhone 14 Pro", category: "iPhones", condition: "New & Used", specs: "6.1\" 120Hz · Triple 48MP · Dynamic Island", image: i14pro.url },
  { id: "iphone-14-pro-max", name: "iPhone 14 Pro Max", category: "iPhones", condition: "New & Used", specs: "6.7\" 120Hz · Triple 48MP · Dynamic Island", image: i14promax.url, badge: "Best seller" },
  { id: "iphone-15", name: "iPhone 15", category: "iPhones", condition: "Brand New", specs: "6.1\" Super Retina XDR · 48MP main · USB-C", image: i15.url },
  { id: "iphone-15-plus", name: "iPhone 15 Plus", category: "iPhones", condition: "New & Used", specs: "6.7\" Super Retina XDR · 48MP main · USB-C", image: i15plus.url },
  { id: "iphone-15-pro", name: "iPhone 15 Pro", category: "iPhones", condition: "Brand New", specs: "6.1\" 120Hz · Titanium · A17 Pro", image: i15pro.url },
  { id: "iphone-15-pro-max", name: "iPhone 15 Pro Max", category: "iPhones", condition: "Brand New", specs: "6.7\" 120Hz · Titanium · 5x telephoto", image: i15promax.url, badge: "Hot" },
  { id: "iphone-16", name: "iPhone 16", category: "iPhones", condition: "Brand New", specs: "6.1\" Super Retina XDR · A18 · Camera Control", image: i16.url },
  { id: "iphone-16-plus", name: "iPhone 16 Plus", category: "iPhones", condition: "Brand New", specs: "6.7\" Super Retina XDR · A18 · 4383mAh", image: i16plus.url },
  { id: "iphone-16-pro", name: "iPhone 16 Pro", category: "iPhones", condition: "Brand New", specs: "6.3\" 120Hz · Triple 48MP · A18 Pro", image: i16pro.url },
  { id: "iphone-16-pro-max", name: "iPhone 16 Pro Max", category: "iPhones", condition: "Brand New", specs: "6.9\" 120Hz · Triple 48MP · Titanium", image: i16promax.url },
  { id: "iphone-17", name: "iPhone 17", category: "iPhones", condition: "Brand New", specs: "6.1\" Super Retina XDR · A19 · Ceramic Shield", image: i17.url },
  { id: "iphone-17-pro", name: "iPhone 17 Pro", category: "iPhones", condition: "Brand New", specs: "6.3\" · Triple 48MP · A19 Pro · Titanium", image: i17pro.url, badge: "New arrival" },
  { id: "iphone-17-pro-max", name: "iPhone 17 Pro Max", category: "iPhones", condition: "Brand New", specs: "6.9\" · Triple 48MP · 5088mAh · A19 Pro", image: i17promax.url, badge: "New arrival" },
  { id: "iphone-air", name: "iPhone Air", category: "iPhones", condition: "Brand New", specs: "6.5\" 120Hz · 48MP Fusion · Ultra-thin titanium", image: iair.url },

  { id: "macbook-pro-m5", name: "MacBook Pro M5", category: "MacBooks", condition: "Brand New", specs: "Apple M5 chip · Liquid Retina XDR display", image: mbProM5.url, badge: "Pro" },
  { id: "macbook-air-m1", name: "MacBook Air M1", category: "MacBooks", condition: "UK Used", specs: "8GB RAM · 256GB SSD · 13\"", image: laptop.url },
  { id: "macbook-air-m2", name: "MacBook Air M2", category: "MacBooks", condition: "New & Used", specs: "8/16GB RAM · 256–512GB SSD", image: laptopGrey.url },
  { id: "macbook-pro-14", name: "MacBook Pro 14\" M3 Pro", category: "MacBooks", condition: "Brand New", specs: "18GB RAM · 512GB SSD · Liquid Retina", image: laptop.url },
  { id: "macbook-pro-16", name: "MacBook Pro 16\" M3 Max", category: "MacBooks", condition: "Brand New", specs: "36GB RAM · 1TB SSD", image: laptopGrey.url },

  { id: "ipad-10", name: "Apple iPad (Retina)", category: "Tablets", condition: "New & Used", specs: "Retina display · A-series chip · WiFi / Cellular", image: ipad10.url },
  { id: "ipad-air-m3", name: "iPad Air M3", category: "Tablets", condition: "Brand New", specs: "Liquid Retina · Apple M3 · 7606mAh battery", image: ipadAirM3.url },
  { id: "ipad-pro", name: "iPad Pro 11\"", category: "Tablets", condition: "Brand New", specs: "128GB / 256GB · M-series chip", image: tablet.url },

  { id: "airpods", name: "AirPods & Earbuds", category: "Accessories", condition: "Brand New", specs: "AirPods 2/3/Pro · Original & OEM", image: accessories.url },
  { id: "chargers", name: "Chargers & Cables", category: "Accessories", condition: "Brand New", specs: "20W–35W fast chargers, USB-C, Lightning", image: accessories.url },
  { id: "covers", name: "Covers & Screen Protectors", category: "Accessories", condition: "Brand New", specs: "Cases, tempered glass, pouches", image: accessories.url },
];

export const CATEGORIES: Category[] = ["iPhones", "MacBooks", "Tablets", "Accessories"];

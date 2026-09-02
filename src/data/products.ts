import laptop from "@/assets/laptop.jpg";
import laptopGrey from "@/assets/laptop-grey.jpg";
import tablet from "@/assets/tablet.jpg";
import accessories from "@/assets/accessories.jpg";

import i11 from "@/assets/products/iphone-11.webp";
import i11pro from "@/assets/products/iphone-11-pro.webp";
import i11promax from "@/assets/products/iphone-11-pro-max.webp";
import i12 from "@/assets/products/iphone-12.webp";
import i12pro from "@/assets/products/iphone-12-pro.webp";
import i12promax from "@/assets/products/iphone-12-pro-max.webp";
import i13 from "@/assets/products/iphone-13.webp";
import i13pro from "@/assets/products/iphone-13-pro.webp";
import i13promax from "@/assets/products/iphone-13-pro-max.webp";
import i14 from "@/assets/products/iphone-14.webp";
import i14plus from "@/assets/products/iphone-14-plus.webp";
import i14pro from "@/assets/products/iphone-14-pro.webp";
import i14promax from "@/assets/products/iphone-14-pro-max.webp";
import i15 from "@/assets/products/iphone-15.webp";
import i15plus from "@/assets/products/iphone-15-plus.webp";
import i15pro from "@/assets/products/iphone-15-pro.webp";
import i15promax from "@/assets/products/iphone-15-pro-max.webp";
import i16 from "@/assets/products/iphone-16.webp";
import i16plus from "@/assets/products/iphone-16-plus.webp";
import i16pro from "@/assets/products/iphone-16-pro.webp";
import i16promax from "@/assets/products/iphone-16-pro-max.webp";
import i17 from "@/assets/products/iphone-17.webp";
import i17pro from "@/assets/products/iphone-17-pro.webp";
import i17promax from "@/assets/products/iphone-17-pro-max.webp";
import iair from "@/assets/products/iphone-air.webp";
import mbProM5 from "@/assets/products/macbook-pro-m5.webp";
import mbpM5Max from "@/assets/products/mbp-m5-max.webp";
import mbp2020 from "@/assets/products/mbp-2020.webp";
import mbp2019 from "@/assets/products/mbp-2019.webp";
import mbp2018 from "@/assets/products/mbp-2018.webp";
import mba2020 from "@/assets/products/mba-2020.webp";
import mba2019 from "@/assets/products/mba-2019.webp";
import ipad10 from "@/assets/products/ipad-10.webp";
import ipadAirM3 from "@/assets/products/ipad-air-m3.webp";

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
  { id: "iphone-11", name: "iPhone 11", category: "iPhones", condition: "UK Used", specs: "6.1\" Liquid Retina HD · Dual 12MP camera", image: i11 },
  { id: "iphone-11-pro", name: "iPhone 11 Pro", category: "iPhones", condition: "UK Used", specs: "5.8\" Super Retina XDR · Triple 12MP camera", image: i11pro },
  { id: "iphone-11-pro-max", name: "iPhone 11 Pro Max", category: "iPhones", condition: "UK Used", specs: "6.5\" Super Retina XDR · Triple 12MP camera", image: i11promax },
  { id: "iphone-12", name: "iPhone 12", category: "iPhones", condition: "New & Used", specs: "6.1\" Super Retina XDR · 5G · Dual 12MP", image: i12 },
  { id: "iphone-12-pro", name: "iPhone 12 Pro", category: "iPhones", condition: "UK Used", specs: "6.1\" Super Retina XDR · Triple 12MP · LiDAR", image: i12pro },
  { id: "iphone-12-pro-max", name: "iPhone 12 Pro Max", category: "iPhones", condition: "UK Used", specs: "6.7\" Super Retina XDR · Triple 12MP camera", image: i12promax },
  { id: "iphone-13", name: "iPhone 13", category: "iPhones", condition: "New & Used", specs: "6.1\" Super Retina XDR · A15 Bionic", image: i13 },
  { id: "iphone-13-pro", name: "iPhone 13 Pro", category: "iPhones", condition: "UK Used", specs: "6.1\" 120Hz ProMotion · Triple 12MP", image: i13pro },
  { id: "iphone-13-pro-max", name: "iPhone 13 Pro Max", category: "iPhones", condition: "UK Used", specs: "6.7\" 120Hz ProMotion · Triple 12MP", image: i13promax, badge: "Hot" },
  { id: "iphone-14", name: "iPhone 14", category: "iPhones", condition: "New & Used", specs: "6.1\" Super Retina XDR · Dual camera · A15", image: i14 },
  { id: "iphone-14-plus", name: "iPhone 14 Plus", category: "iPhones", condition: "New & Used", specs: "6.7\" Super Retina XDR · All-day battery", image: i14plus },
  { id: "iphone-14-pro", name: "iPhone 14 Pro", category: "iPhones", condition: "New & Used", specs: "6.1\" 120Hz · Triple 48MP · Dynamic Island", image: i14pro },
  { id: "iphone-14-pro-max", name: "iPhone 14 Pro Max", category: "iPhones", condition: "New & Used", specs: "6.7\" 120Hz · Triple 48MP · Dynamic Island", image: i14promax, badge: "Best seller" },
  { id: "iphone-15", name: "iPhone 15", category: "iPhones", condition: "Brand New", specs: "6.1\" Super Retina XDR · 48MP main · USB-C", image: i15 },
  { id: "iphone-15-plus", name: "iPhone 15 Plus", category: "iPhones", condition: "New & Used", specs: "6.7\" Super Retina XDR · 48MP main · USB-C", image: i15plus },
  { id: "iphone-15-pro", name: "iPhone 15 Pro", category: "iPhones", condition: "Brand New", specs: "6.1\" 120Hz · Titanium · A17 Pro", image: i15pro },
  { id: "iphone-15-pro-max", name: "iPhone 15 Pro Max", category: "iPhones", condition: "Brand New", specs: "6.7\" 120Hz · Titanium · 5x telephoto", image: i15promax, badge: "Hot" },
  { id: "iphone-16", name: "iPhone 16", category: "iPhones", condition: "Brand New", specs: "6.1\" Super Retina XDR · A18 · Camera Control", image: i16 },
  { id: "iphone-16-plus", name: "iPhone 16 Plus", category: "iPhones", condition: "Brand New", specs: "6.7\" Super Retina XDR · A18 · 4383mAh", image: i16plus },
  { id: "iphone-16-pro", name: "iPhone 16 Pro", category: "iPhones", condition: "Brand New", specs: "6.3\" 120Hz · Triple 48MP · A18 Pro", image: i16pro },
  { id: "iphone-16-pro-max", name: "iPhone 16 Pro Max", category: "iPhones", condition: "Brand New", specs: "6.9\" 120Hz · Triple 48MP · Titanium", image: i16promax },
  { id: "iphone-17", name: "iPhone 17", category: "iPhones", condition: "Brand New", specs: "6.1\" Super Retina XDR · A19 · Ceramic Shield", image: i17 },
  { id: "iphone-17-pro", name: "iPhone 17 Pro", category: "iPhones", condition: "Brand New", specs: "6.3\" · Triple 48MP · A19 Pro · Titanium", image: i17pro, badge: "New arrival" },
  { id: "iphone-17-pro-max", name: "iPhone 17 Pro Max", category: "iPhones", condition: "Brand New", specs: "6.9\" · Triple 48MP · 5088mAh · A19 Pro", image: i17promax, badge: "New arrival" },
  { id: "iphone-air", name: "iPhone Air", category: "iPhones", condition: "Brand New", specs: "6.5\" 120Hz · 48MP Fusion · Ultra-thin titanium", image: iair },

  { id: "macbook-pro-m5", name: "MacBook Pro M5", category: "MacBooks", condition: "Brand New", specs: "Apple M5 chip · Liquid Retina XDR display", image: mbProM5, badge: "Pro" },
  { id: "macbook-pro-m5-max", name: "MacBook Pro M5 Max", category: "MacBooks", condition: "Brand New", specs: "M5 Max · Liquid Retina XDR · Thunderbolt 5 · Wi-Fi 7", image: mbpM5Max, badge: "New arrival" },
  { id: "macbook-pro-13-2020", name: "MacBook Pro 13\" (2020)", category: "MacBooks", condition: "UK Used", specs: "Retina display · Magic Keyboard · Touch Bar & Touch ID", image: mbp2020 },
  { id: "macbook-pro-13-2019", name: "MacBook Pro 13\" (2019)", category: "MacBooks", condition: "UK Used", specs: "Retina display · Intel Core · Thunderbolt 3 · SSD", image: mbp2019 },
  { id: "macbook-pro-13-2018", name: "MacBook Pro 13\" (2018)", category: "MacBooks", condition: "UK Used", specs: "Retina True Tone · Touch Bar · Touch ID · SSD", image: mbp2018 },
  { id: "macbook-air-13-2020", name: "MacBook Air 13\" (2020)", category: "MacBooks", condition: "UK Used", specs: "Retina True Tone · Magic Keyboard · Touch ID", image: mba2020 },
  { id: "macbook-air-13-2019", name: "MacBook Air 13\" (2019)", category: "MacBooks", condition: "UK Used", specs: "Retina True Tone · Touch ID · All-day battery", image: mba2019 },
  { id: "macbook-air-m1", name: "MacBook Air M1", category: "MacBooks", condition: "UK Used", specs: "8GB RAM · 256GB SSD · 13\"", image: laptop },
  { id: "macbook-air-m2", name: "MacBook Air M2", category: "MacBooks", condition: "New & Used", specs: "8/16GB RAM · 256–512GB SSD", image: laptopGrey },
  { id: "macbook-pro-14", name: "MacBook Pro 14\" M3 Pro", category: "MacBooks", condition: "Brand New", specs: "18GB RAM · 512GB SSD · Liquid Retina", image: laptop },
  { id: "macbook-pro-16", name: "MacBook Pro 16\" M3 Max", category: "MacBooks", condition: "Brand New", specs: "36GB RAM · 1TB SSD", image: laptopGrey },

  { id: "ipad-10", name: "Apple iPad (Retina)", category: "Tablets", condition: "New & Used", specs: "Retina display · A-series chip · WiFi / Cellular", image: ipad10 },
  { id: "ipad-air-m3", name: "iPad Air M3", category: "Tablets", condition: "Brand New", specs: "Liquid Retina · Apple M3 · 7606mAh battery", image: ipadAirM3 },
  { id: "ipad-pro", name: "iPad Pro 11\"", category: "Tablets", condition: "Brand New", specs: "128GB / 256GB · M-series chip", image: tablet },

  { id: "airpods", name: "AirPods & Earbuds", category: "Accessories", condition: "Brand New", specs: "AirPods 2/3/Pro · Original & OEM", image: accessories },
  { id: "chargers", name: "Chargers & Cables", category: "Accessories", condition: "Brand New", specs: "20W–35W fast chargers, USB-C, Lightning", image: accessories },
  { id: "covers", name: "Covers & Screen Protectors", category: "Accessories", condition: "Brand New", specs: "Cases, tempered glass, pouches", image: accessories },
];

export const CATEGORIES: Category[] = ["iPhones", "MacBooks", "Tablets", "Accessories"];

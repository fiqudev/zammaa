import phoneBlack from "@/assets/phone-black.jpg.asset.json";
import phoneWhite from "@/assets/phone-white.jpg.asset.json";
import phoneBlue from "@/assets/phone-blue.jpg.asset.json";
import phoneGold from "@/assets/phone-gold.jpg.asset.json";
import laptop from "@/assets/laptop.jpg.asset.json";
import laptopGrey from "@/assets/laptop-grey.jpg.asset.json";
import tablet from "@/assets/tablet.jpg.asset.json";
import accessories from "@/assets/accessories.jpg.asset.json";

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

const img = {
  black: phoneBlack.url,
  white: phoneWhite.url,
  blue: phoneBlue.url,
  gold: phoneGold.url,
  laptop: laptop.url,
  laptopGrey: laptopGrey.url,
  tablet: tablet.url,
  accessories: accessories.url,
};

export const PRODUCTS: Product[] = [
  { id: "iphone-11", name: "iPhone 11", category: "iPhones", condition: "UK Used", specs: "64GB / 128GB · Battery 85%+", image: img.white },
  { id: "iphone-11-pro-max", name: "iPhone 11 Pro Max", category: "iPhones", condition: "UK Used", specs: "64GB / 256GB · Triple camera", image: img.gold },
  { id: "iphone-12", name: "iPhone 12", category: "iPhones", condition: "New & Used", specs: "64GB / 128GB · 5G ready", image: img.blue },
  { id: "iphone-12-pro-max", name: "iPhone 12 Pro Max", category: "iPhones", condition: "UK Used", specs: "128GB / 256GB · Pro cameras", image: img.black },
  { id: "iphone-13", name: "iPhone 13", category: "iPhones", condition: "New & Used", specs: "128GB / 256GB · A15 Bionic", image: img.white },
  { id: "iphone-13-pro-max", name: "iPhone 13 Pro Max", category: "iPhones", condition: "UK Used", specs: "256GB · ProMotion 120Hz", image: img.gold, badge: "Hot" },
  { id: "iphone-14", name: "iPhone 14", category: "iPhones", condition: "Brand New", specs: "128GB / 256GB · Sealed", image: img.blue },
  { id: "iphone-14-pro-max", name: "iPhone 14 Pro Max", category: "iPhones", condition: "New & Used", specs: "256GB / 512GB · Dynamic Island", image: img.black, badge: "Best seller" },
  { id: "iphone-15", name: "iPhone 15", category: "iPhones", condition: "Brand New", specs: "128GB / 256GB · USB-C", image: img.white },
  { id: "iphone-15-pro-max", name: "iPhone 15 Pro Max", category: "iPhones", condition: "Brand New", specs: "256GB / 512GB · Titanium", image: img.blue, badge: "Hot" },
  { id: "iphone-16", name: "iPhone 16", category: "iPhones", condition: "Brand New", specs: "128GB / 256GB · Sealed in box", image: img.black },
  { id: "iphone-16-pro-max", name: "iPhone 16 Pro Max", category: "iPhones", condition: "Brand New", specs: "256GB / 1TB · Camera Control", image: img.gold, badge: "New arrival" },

  { id: "macbook-air-m1", name: "MacBook Air M1", category: "MacBooks", condition: "UK Used", specs: "8GB RAM · 256GB SSD · 13\"", image: img.laptop },
  { id: "macbook-air-m2", name: "MacBook Air M2", category: "MacBooks", condition: "New & Used", specs: "8/16GB RAM · 256–512GB SSD", image: img.laptopGrey },
  { id: "macbook-pro-13", name: "MacBook Pro 13\" M2", category: "MacBooks", condition: "New & Used", specs: "16GB RAM · 512GB SSD", image: img.laptopGrey },
  { id: "macbook-pro-14", name: "MacBook Pro 14\" M3 Pro", category: "MacBooks", condition: "Brand New", specs: "18GB RAM · 512GB SSD · Liquid Retina", image: img.laptop, badge: "Pro" },
  { id: "macbook-pro-16", name: "MacBook Pro 16\" M3 Max", category: "MacBooks", condition: "Brand New", specs: "36GB RAM · 1TB SSD", image: img.laptopGrey },

  { id: "ipad-9", name: "iPad 9th Gen", category: "Tablets", condition: "New & Used", specs: "64GB · WiFi / Cellular", image: img.tablet },
  { id: "ipad-air", name: "iPad Air", category: "Tablets", condition: "New & Used", specs: "64GB / 256GB · Apple Pencil support", image: img.tablet },
  { id: "ipad-pro", name: "iPad Pro 11\"", category: "Tablets", condition: "Brand New", specs: "128GB / 256GB · M-series chip", image: img.tablet },

  { id: "airpods", name: "AirPods & Earbuds", category: "Accessories", condition: "Brand New", specs: "AirPods 2/3/Pro · Original & OEM", image: img.accessories },
  { id: "chargers", name: "Chargers & Cables", category: "Accessories", condition: "Brand New", specs: "20W–35W fast chargers, USB-C, Lightning", image: img.accessories },
  { id: "covers", name: "Covers & Screen Protectors", category: "Accessories", condition: "Brand New", specs: "Cases, tempered glass, pouches", image: img.accessories },
];

export const CATEGORIES: Category[] = ["iPhones", "MacBooks", "Tablets", "Accessories"];
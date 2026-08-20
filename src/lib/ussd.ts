import { SITE } from "@/data/site";

export type NetworkId = "mtn" | "airtel";

export interface NetworkInfo {
  id: NetworkId;
  label: string;
  short: string;
  merchant: string;
  /** USSD entry code that opens the merchant-payment menu on the phone. */
  dial: string;
  steps: string[];
}

export const NETWORKS: Record<NetworkId, NetworkInfo> = {
  mtn: {
    id: "mtn",
    label: "MTN MoMoPay",
    short: "MTN",
    merchant: SITE.mtnMerchant,
    dial: "*165*3*1#",
    steps: [
      "Your dialer opens the MoMoPay merchant menu",
      `Enter merchant code ${SITE.mtnMerchant} (Zama Gadgets)`,
      "Enter the amount you are saving",
      "Confirm the name shown, then enter your MoMo PIN",
    ],
  },
  airtel: {
    id: "airtel",
    label: "Airtel Money",
    short: "Airtel",
    merchant: SITE.merchant,
    dial: "*185#",
    steps: [
      "Your dialer opens the Airtel Money menu",
      "Choose Make Payments, then Merchant / Goods & Services",
      `Enter merchant number ${SITE.merchant} (Zama Gadgets)`,
      "Enter the amount, confirm, then enter your Airtel Money PIN",
    ],
  },
};

export const MIN_DEPOSIT = 50000;

/** tel: link that launches the network's merchant-payment USSD session. */
export function dialLink(network: NetworkId) {
  return `tel:${encodeURIComponent(NETWORKS[network].dial)}`;
}

export function formatUGX(amount: number) {
  return `UGX ${Math.round(amount).toLocaleString("en-UG")}`;
}

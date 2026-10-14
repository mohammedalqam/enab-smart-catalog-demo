export const catalogConfig = {
  storeNameAr: "عنب كاندي",
  storeNameEn: "ENAB CANDY",
  instagram: "https://www.instagram.com/enabcandy/",
  demoMode: true,
  allowRealOrders: false,
  showPrices: false,
  productCount: 30,
  studioName: "0MAR WEB STUDIO",
  studioInstagram: "https://www.instagram.com/0mar.web/",
  storageKey: "enab-catalog-list-v1",
  recentStorageKey: "enab-catalog-recent-v1",
} as const;

export const assetPath = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH || ""}${path}`;

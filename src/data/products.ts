export const categories = [
  { id: "chocolate", name: "شوكولاتة", emoji: "🍫", synonyms: ["شوكولاتة", "شوكلاطة", "شوكولاته", "شوكولات", "chocolate", "choc"] },
  { id: "candy", name: "كاندي وحلويات", emoji: "🍬", synonyms: ["حلوى", "حلويات", "كاندي", "candy", "sweets", "gummy"] },
  { id: "snacks", name: "شيبس وسناكات", emoji: "🍿", synonyms: ["شيبس", "شبس", "سناكات", "chips", "snacks", "crisps"] },
  { id: "drinks", name: "مشروبات", emoji: "🥤", synonyms: ["مشروبات", "عصير", "drink", "drinks", "juice"] },
  { id: "biscuits", name: "بسكويت وويفر", emoji: "🍪", synonyms: ["بسكويت", "ويفر", "كوكيز", "biscuits", "cookies", "wafer", "wafers"] },
  { id: "boxes", name: "بوكسات", emoji: "🎁", synonyms: ["بوكس", "بوكسات", "هدايا", "هدية", "gift", "box", "boxes"] },
  { id: "bundles", name: "عروض ومجموعات", emoji: "✨", synonyms: ["مجموعة", "مجموعات", "عروض", "bundle", "bundles", "offer"] },
] as const;
export type CategoryId = (typeof categories)[number]["id"];
export type Product = {
  id: string; nameAr: string; nameEn: string; category: CategoryId;
  descriptionAr: string; image: string; price?: number; currency?: string;
  tags: string[]; searchKeywords: string[];
  isNew: boolean; isFeatured: boolean; isAvailable: boolean;
};
type ProductSeed = [CategoryId, string, string, string, string[]];
const seeds: ProductSeed[] = [
  ["chocolate", "شوكولاتة بالحليب", "Milk Chocolate", "قطع شوكولاتة ناعمة بطعم الحليب، لمزاج حلو وبسيط.", ["حليب", "milk", "لوح", "bar"]],
  ["chocolate", "شوكولاتة داكنة", "Dark Chocolate", "قطع داكنة بنكهة الكاكاو الغنية، لمحبي الطعم القوي.", ["داكنة", "dark", "كاكاو", "cocoa"]],
  ["chocolate", "ترافل الكاكاو", "Cocoa Truffles", "كرات شوكولاتة مخملية بلمسة من مسحوق الكاكاو.", ["ترافل", "كرات", "truffle", "truffles", "cocoa"]],
  ["chocolate", "برالين البندق", "Hazelnut Pralines", "حبات شوكولاتة مع البندق، قرمشة لطيفة بكل لقمة.", ["بندق", "hazelnut", "praline", "برالين"]],
  ["chocolate", "شوكولاتة بيضاء", "White Chocolate", "قطع شوكولاتة بيضاء بطعم كريمي وناعم.", ["بيضاء", "ابيض", "white"]],
  ["chocolate", "شوكولاتة باللوز", "Almond Chocolate Clusters", "قطع لوز مغطاة بالشوكولاتة، حلاوة مع قرمشة.", ["لوز", "almond", "clusters"]],
  ["candy", "دببة الجيلي", "Rainbow Gummy Bears", "دببة صغيرة بألوان مرحة ونكهات فواكه متنوعة.", ["دببة", "دب", "جيلي", "jelly", "bears", "حلوى جيلي"]],
  ["candy", "أشرطة قوس قزح", "Sour Rainbow Belts", "أشرطة ملونة ومغطاة بالسكر، حموضة بتحبها.", ["حامض", "حامضة", "ساور", "قوس", "sour", "rainbow", "belts"]],
  ["candy", "قلوب الفراولة", "Strawberry Gummy Hearts", "قلوب وردية بنكهة الفراولة، لقمة حلوة من القلب.", ["فراولة", "قلوب", "قلب", "strawberry", "hearts"]],
  ["candy", "حلقات الخوخ", "Peach Gummy Rings", "حلقات جيلي بنكهة الخوخ ولمسة سكر خفيفة.", ["خوخ", "حلقات", "حامضة", "sour", "peach", "rings"]],
  ["candy", "مارشميلو وردي", "Pink Marshmallows", "مكعبات مارشميلو هوائية بالوردي والأبيض.", ["مارشميلو", "مارشمالو", "marshmallow", "marshmallows", "ناعم"]],
  ["candy", "لوليبوب دوّامة", "Swirl Lollipops", "مصاصات دائرية بألوان الباستيل وتفاصيل دوّامة.", ["مصاصة", "مصاصات", "لوليبوب", "lollipop", "lollipops", "swirl"]],
  ["snacks", "شيبس كلاسيك", "Classic Potato Chips", "رقائق بطاطا ذهبية ومقرمشة، خيار بسيط لأي جلسة.", ["بطاطا", "كلاسيك", "potato", "classic", "salt"]],
  ["snacks", "ناتشوز مقرمش", "Crunchy Nachos", "مثلثات الذرة المقرمشة، بتكمّل جلسة الفيلم.", ["ناتشوز", "ذرة", "nachos", "tortilla", "corn"]],
  ["snacks", "بوب كورن", "Classic Popcorn", "فشار خفيف ومقرمش، رفيق الأفلام المفضل.", ["فشار", "بوبكورن", "بوب", "popcorn", "pop corn", "فيلم"]],
  ["snacks", "بريتزل مالح", "Salted Pretzels", "عقد بريتزل ذهبية، قرمشة مع لمسة ملح.", ["بريتزل", "مالح", "pretzel", "pretzels", "salted"]],
  ["snacks", "مكس مكسرات", "Roasted Nut Mix", "تشكيلة مكسرات تجمع الكاجو واللوز والبندق.", ["مكسرات", "كاجو", "لوز", "nuts", "cashew", "mix"]],
  ["drinks", "ليمونادة الفراولة", "Strawberry Lemonade", "مشروب وردي بالفراولة والليمون، انتعاش بطعم حلو.", ["فراولة", "ليمون", "ليمونادة", "lemonade", "strawberry", "pink"]],
  ["drinks", "مشروب المانجا", "Mango Drink", "مشروب بطعم المانجا ولمسة استوائية.", ["مانجا", "مانجو", "mango", "tropical"]],
  ["drinks", "مشروب العنب", "Grape Drink", "مشروب بلون بنفسجي ونكهة العنب.", ["عنب", "grape", "purple"]],
  ["drinks", "ليمون ونعناع", "Lemon Mint Drink", "مشروب منعش يجمع الليمون مع النعناع.", ["ليمون", "نعناع", "lemon", "mint", "fresh"]],
  ["biscuits", "كوكيز الشوكولاتة", "Chocolate Chip Cookies", "كوكيز ذهبية مليانة بقطع الشوكولاتة.", ["كوكيز", "بسكويت", "chocolate chip", "cookie", "cookies"]],
  ["biscuits", "ويفر الفانيلا", "Vanilla Wafers", "طبقات ويفر خفيفة مع حشوة الفانيلا.", ["فانيلا", "vanilla", "wafer"]],
  ["biscuits", "ويفر الكاكاو", "Cocoa Wafers", "أصابع ويفر مقرمشة مع نكهة الكاكاو.", ["كاكاو", "شوكولاتة", "cocoa", "chocolate", "wafer"]],
  ["biscuits", "بسكويت الزبدة", "Butter Biscuits", "حبات بسكويت ذهبية بنكهة الزبدة، لوقت القهوة.", ["زبدة", "قهوة", "butter", "biscuit"]],
  ["boxes", "بوكس كاندي ملون", "Rainbow Candy Box", "بوكس وردي يجمع الجيلي والقلوب والحلوى الملونة.", ["جيلي", "كاندي", "هدية", "rainbow", "candy", "gift"]],
  ["boxes", "بوكس شوكولاتة", "Chocolate Gift Box", "تشكيلة برالين وشوكولاتة داخل بوكس كريمي أنيق.", ["شوكولاتة", "شوكلاطة", "هدية", "chocolate", "pralines", "gift"]],
  ["boxes", "بوكس المزاج الحلو", "Sweet Mood Box", "بوكس يجمع الشوكولاتة والكاندي، أكثر من طعم بمكان واحد.", ["شوكولاتة", "كاندي", "تشكيلة", "sweet", "chocolate", "candy", "mix"]],
  ["bundles", "مجموعة ليلة فيلم", "Movie Night Bundle", "بوب كورن وناتشوز مع بعض، لجلسة الفيلم.", ["فيلم", "بوب كورن", "ناتشوز", "movie", "popcorn", "nachos"]],
  ["bundles", "مجموعة عشاق الحامض", "Sour Lovers Bundle", "أشرطة وحلقات وقلوب، تشكيلة حلوة لمحبي الحامض.", ["حامض", "حامضة", "ساور", "sour", "belts", "rings", "hearts"]],
];
export const products: Product[] = seeds.map((seed, index) => ({
  id: `p${String(index + 1).padStart(2, "0")}`,
  category: seed[0], nameAr: seed[1], nameEn: seed[2], descriptionAr: seed[3],
  image: `/products/p${String(index + 1).padStart(2, "0")}.webp`,
  tags: seed[4].slice(0, 2), searchKeywords: seed[4],
  isNew: [7, 8, 17, 22, 27].includes(index),
  isFeatured: [2, 6, 7, 9, 17, 25].includes(index),
  isAvailable: ![4, 19].includes(index),
}));
export const productMap = new Map(products.map(product => [product.id, product]));
export const categoryMap = new Map(categories.map(category => [category.id, category]));

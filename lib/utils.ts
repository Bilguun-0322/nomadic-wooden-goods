import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const CATEGORIES = [
  { id: "all", name: "Бүгд", slug: "" },
  { id: "avdar", name: "Авдар", slug: "avdar" },
  { id: "wood_item", name: "Авдар сэргээн засвар", slug: "wood_item" },
  { id: "gift", name: "Модон тавилга", slug: "gift" },
] as const;

export function getCategoryName(categoryKey: string): string {
  const found = CATEGORIES.find((c) => c.id === categoryKey);
  return found ? found.name : categoryKey;
}

const CYRILLIC_MAP: Record<string, string> = {
  а: "a", б: "b", в: "v", г: "g", д: "d", е: "ye", ё: "yo", ж: "j",
  з: "z", и: "i", й: "i", к: "k", л: "l", м: "m", н: "n", о: "o",
  ө: "u", п: "p", р: "r", с: "s", т: "t", у: "u", ү: "u", ф: "f",
  х: "kh", ц: "ts", ч: "ch", ш: "sh", щ: "sh", ъ: "", ы: "y", ь: "i",
  э: "e", ю: "yu", я: "ya",
};

export function slugify(text: string): string {
  const lower = text.toString().toLowerCase().trim();
  let transliterated = "";
  for (const char of lower) {
    transliterated += CYRILLIC_MAP[char] !== undefined ? CYRILLIC_MAP[char] : char;
  }

  const cleaned = transliterated
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  return cleaned || `item-${Date.now().toString(36)}`;
}

export const BRAND = {
  name: "Нүүдэлчин модон эдлэл",
  tagline: "Уламжлалт Монгол урлал ба цэвэр байгалийн мод",
  description:
    "Уламжлалт хээ угалзтай сийлбэрт авдар, байгалийн цул модон интерьерийн тавилга, гар урлалын бэлэг дурсгалыг захиалгаар чанарын өндөр түвшинд урлана.",
  phone: "+976 95116710",
  phoneRaw: "95116710",
  messengerUrl: "https://m.me/Nuudelchinmodonedlel",
  facebookUrl: "https://www.facebook.com/people/%D0%9D%D2%AF%D2%AF%D0%B4%D1%8D%D0%BB%D1%87%D0%B8%D0%BD-%D0%BC%D0%BE%D0%B4%D0%BE%D0%BD-%D1%8D%D0%B4%D0%BB%D1%8D%D0%BB/100089579563335/",
  instagramUrl: "https://instagram.com/nomadicwoodengoods",
  address: "Улаанбаатар хот, Чингэлтэй дүүрэг, 19-хороо Салхит 4-р гудамж 220 тоот",
  workHours: "Өдөр бүр ажиллана: 10:00 - 20:00",
};

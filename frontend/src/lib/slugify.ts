import slugify from "slugify";

const generateSlug = (text: string) => {
  const options = {
    replacement: "-", // Boşluk yerine kullanılacak karakter
    lower: true, // Küçük harflerle dönüştürme
    strict: true, // Sadece URL uyumlu karakterleri kullanma
  };

  return slugify(text, options);
};

export default generateSlug;

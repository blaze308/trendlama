import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.join(__dirname, '..');
const DATA_DIR = path.join(ROOT_DIR, 'src', 'data');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// GUARANTEED WORKING UNSPLASH IDs for Supplementation
const PHOTO_POOL = {
  beauty: ['1522337621184-22114a8c2195', '1612817288484-6f30085871bf', '1596462502278-27bfad4575a6'],
  fragrances: ['1541643600914-78b084681c0c', '1592945403244-b3fbafd7f539', '1594035910387-fea47794261f'],
  furniture: ['1555041469-a586c61ea9bc', '1524758631624-e2822e304c36', '1586023492125-27b2c045efd7'],
  groceries: ['1516594798947-e65505dbb29d', '147119394590b-35ad7d7d747c', '1542831371-29b0f74f9713'],
  'home-decoration': ['1513519245088-0e12902e5a38', '1534349762230-e09da3a3db14', '1581783898377-1c85bf937427'],
  laptops: ['1496181133206-8127bb240ca2', '1517336715461-d4231b0380ad', '15255477185bb-11bd74472d41'],
  'mens-shirts': ['1523381210434-271e8be1f52b', '1598033129183-c4f50c7176c8', '1617137968427-85924c800a22'],
  'mens-shoes': ['1542291026-7eec264c27ff', '1560768374-1a74aa96df8f', '1595950653106-6c9ebd614d3a'],
  smartphones: ['1511707171636-20d3b100ff92', '1592899677296-189f4a13d42b', '1510557833910-d95629df4740'],
  sunglasses: ['1572635196237-14d56d81395c', '1508296064059-ee633d699779', '1511499767333-ac4533087084'],
  'womens-bags': ['1584917865717-37a5446976bf', '1566150905-f97de5fa6590', '1591560370043-cdb12d77d73d'],
};

const CATEGORIES = Object.keys(PHOTO_POOL).map(slug => ({
    slug,
    name: slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
}));

const BRANDS = ['TrendLama', 'LuxuryCore', 'NordicDesign', 'TechFlow', 'UrbanWear', 'ApexSports', 'AuraBeauty'];

function getRandomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function getRandomFloat(min, max, decimals = 2) { return parseFloat((Math.random() * (max - min) + min).toFixed(decimals)); }
function getRandomItem(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

function generateReviews(rating) {
  const count = getRandomInt(3, 15);
  const reviewers = ['James Lee', 'Sarah Jenks', 'Michael Doe', 'Elena Gilbert', 'Robert Miller', 'Sophia Brown'];
  const comments = ['Absolutely love it!', 'Great quality.', 'Exceeded expectations.', 'Very stylish.', 'Good value.', 'Perfect fit!'];
  return Array.from({ length: count }, (_, i) => ({
    rating: getRandomInt(Math.max(1, Math.floor(rating) - 1), 5),
    comment: getRandomItem(comments),
    date: new Date(Date.now() - getRandomInt(0, 1000 * 60 * 60 * 24 * 365)).toISOString(),
    reviewerName: getRandomItem(reviewers),
    reviewerEmail: `user${i}@example.com`
  }));
}

const blendedProducts = [];
let currentId = 1;

async function fetchSources() {
  console.log("Fetching from multiple APIs...");
  
  try {
    // 1. DUMMYJSON (100 products)
    const djRes = await fetch("https://dummyjson.com/products?limit=100");
    const djData = await djRes.json();
    console.log(`Fetched ${djData.products.length} from DummyJSON`);
    djData.products.forEach(p => {
        blendedProducts.push({
            ...p,
            id: currentId++,
            brand: p.brand || getRandomItem(BRANDS),
            category: p.category.toLowerCase().replace(" ", "-")
        });
    });

    // 2. PLATZI (200 products)
    const pRes = await fetch("https://api.escuelajs.co/api/v1/products?offset=0&limit=200");
    const pData = await pRes.json();
    console.log(`Fetched ${pData.length} from Platzi`);
    pData.forEach(p => {
        const rating = getRandomFloat(3.5, 5.0, 1);
        blendedProducts.push({
            id: currentId++,
            title: p.title,
            description: p.description,
            price: p.price,
            discountPercentage: getRandomInt(5, 20),
            rating: rating,
            stock: getRandomInt(10, 100),
            brand: getRandomItem(BRANDS),
            category: p.category?.name.toLowerCase().replace(" ", "-") || "misc",
            thumbnail: p.images[0] || "https://placehold.co/600x400",
            images: p.images.length > 0 ? p.images : ["https://placehold.co/600x400"],
            reviews: generateReviews(rating),
            availabilityStatus: "In Stock"
        });
    });

    // 3. FAKE STORE API (20 products)
    const fsRes = await fetch("https://fakestoreapi.com/products");
    const fsData = await fsRes.json();
    console.log(`Fetched ${fsData.length} from Fake Store API`);
    fsData.forEach(p => {
        blendedProducts.push({
            id: currentId++,
            title: p.title,
            description: p.description,
            price: p.price,
            discountPercentage: getRandomInt(5, 15),
            rating: p.rating?.rate || 4.2,
            stock: p.rating?.count || 50,
            brand: getRandomItem(BRANDS),
            category: p.category.toLowerCase().replace(" ", "-"),
            thumbnail: p.image,
            images: [p.image],
            reviews: generateReviews(p.rating?.rate || 4.2),
            availabilityStatus: "In Stock"
        });
    });

  } catch (error) {
    console.error("Error fetching sources:", error);
  }
}

async function run() {
  await fetchSources();

  // 4. SUPPLEMENTATION (Up to 1012 products)
  const TOTAL_GOAL = 1012;
  const needed = TOTAL_GOAL - blendedProducts.length;
  console.log(`Supplementing with ${needed} premium products...`);

  for (let i = 0; i < needed; i++) {
    const category = getRandomItem(CATEGORIES);
    const photoId = getRandomItem(PHOTO_POOL[category.slug]);
    const rating = getRandomFloat(3.8, 5.0, 1);
    const brand = getRandomItem(BRANDS);

    blendedProducts.push({
      id: currentId++,
      title: `${brand} Premium ${category.name} ${currentId}`,
      description: `Experience the peak of quality with the ${brand} ${category.name}. This premium product is curated from high-end sources to ensure longevity and a great user experience.`,
      price: getRandomFloat(29.99, 1299.99),
      discountPercentage: getRandomInt(5, 25),
      rating: rating,
      stock: getRandomInt(5, 150),
      brand: brand,
      category: category.slug,
      thumbnail: `https://images.unsplash.com/photo-${photoId}?auto=format&fit=crop&q=80&w=800`,
      images: [
        `https://images.unsplash.com/photo-${photoId}?auto=format&fit=crop&q=80&w=1200`,
        `https://images.unsplash.com/photo-${photoId}?auto=format&fit=crop&q=80&w=1200`
      ],
      reviews: generateReviews(rating),
      availabilityStatus: "In Stock",
      shippingInformation: "Ships in 2-4 business days",
      returnPolicy: "30 days return policy"
    });
  }

  const finalData = {
    products: blendedProducts,
    total: blendedProducts.length,
    skip: 0,
    limit: blendedProducts.length
  };

  const outputFilePath = path.join(DATA_DIR, 'products.json');
  fs.writeFileSync(outputFilePath, JSON.stringify(finalData, null, 2));
  console.log(`\nSUCCESS! Blended ${finalData.total} products into ${outputFilePath}`);
}

run();

const fs = require('fs');
const path = require('path');

function getImages(folderPath) {
  try {
    const files = fs.readdirSync(folderPath).filter(f => f.endsWith('.jpg') || f.endsWith('.png')).sort();
    return files;
  } catch {
    return [];
  }
}

const products = [];
let bedId = 1, couchId = 1, tableId = 1, fabricId = 1;

// Beds
const beds = fs.readdirSync('public/Images/Beds').filter(f => fs.statSync(path.join('public/Images/Beds', f)).isDirectory());
beds.forEach(slug => {
  const images = getImages(path.join('public/Images/Beds', slug));
  if (images.length > 0) {
    products.push({
      id: `bed-${String(bedId).padStart(3, '0')}`,
      slug: slug,
      category: 'Beds',
      name: { en: `Luxury Bed ${bedId}`, he: `מיטה יוקרתית ${bedId}` },
      shortDescription: { en: `Premium quality bed with elegant design.`, he: `מיטה באיכות יוקרתית עם עיצוב אלגנטי.` },
      fullDescription: { en: `This luxury bed combines comfort and style in perfect harmony. Crafted with premium materials and attention to detail.`, he: `מיטה יוקרתית זו משלבת נוחות וסטייל בהרמוניה מושלמת. מעוצבת מחומרים יוקרתיים ותשומת לב לפרטים.` },
      dimensions: { width: 200, height: 120, depth: 220 },
      materials: ['Premium fabric', 'Solid wood frame', 'High-density foam'],
      price: 7000 + (bedId * 200),
      images: images,
      createdAt: new Date().toISOString()
    });
    bedId++;
  }
});

// Couches
const sofas = fs.readdirSync('public/Images/Sofas').filter(f => fs.statSync(path.join('public/Images/Sofas', f)).isDirectory());
sofas.sort((a,b) => {
  const numA = parseInt(a.replace('Product', '')) || 0;
  const numB = parseInt(b.replace('Product', '')) || 0;
  return numA - numB;
});
sofas.forEach(slug => {
  const images = getImages(path.join('public/Images/Sofas', slug));
  if (images.length > 0) {
    products.push({
      id: `couch-${String(couchId).padStart(3, '0')}`,
      slug: slug,
      category: 'Couches',
      name: { en: `Premium Sofa ${couchId}`, he: `ספה יוקרתית ${couchId}` },
      shortDescription: { en: `Elegant sofa with premium comfort.`, he: `ספה אלגנטית עם נוחות יוקרתית.` },
      fullDescription: { en: `This premium sofa offers exceptional comfort and style. Perfect for any living space.`, he: `ספה יוקרתית זו מציעה נוחות וסטייל יוצאי דופן. מושלמת לכל מרחב מגורים.` },
      dimensions: { width: 220, height: 85, depth: 95 },
      materials: ['Premium fabric', 'High-resilience foam', 'Solid wood frame'],
      price: 8000 + (couchId * 150),
      images: images,
      createdAt: new Date().toISOString()
    });
    couchId++;
  }
});

// Tables
const tables = fs.readdirSync('public/Images/Tables').filter(f => fs.statSync(path.join('public/Images/Tables', f)).isDirectory());
tables.sort((a,b) => {
  const numA = parseInt(a.replace('Product', '')) || 0;
  const numB = parseInt(b.replace('Product', '')) || 0;
  return numA - numB;
});
tables.forEach(slug => {
  const images = getImages(path.join('public/Images/Tables', slug));
  if (images.length > 0) {
    products.push({
      id: `table-${String(tableId).padStart(3, '0')}`,
      slug: slug,
      category: 'Tables',
      name: { en: `Elegant Table ${tableId}`, he: `שולחן אלגנטי ${tableId}` },
      shortDescription: { en: `Beautiful table with elegant design.`, he: `שולחן יפה עם עיצוב אלגנטי.` },
      fullDescription: { en: `This elegant table combines functionality with style. Perfect addition to any room.`, he: `שולחן אלגנטי זה משלב פונקציונליות עם סטייל. תוספת מושלמת לכל חדר.` },
      dimensions: { width: 150, height: 75, depth: 80 },
      materials: ['Premium wood', 'Protective finish', 'Metal hardware'],
      price: 3500 + (tableId * 300),
      images: images,
      createdAt: new Date().toISOString()
    });
    tableId++;
  }
});

// Fabrics
const fabricFiles = fs.readdirSync('public/Images/Fabrics').filter(f => f.endsWith('.jpg')).sort((a,b) => {
  return parseInt(a.replace('.jpg', '')) - parseInt(b.replace('.jpg', ''));
});
fabricFiles.forEach(file => {
  products.push({
    id: `fabric-${String(fabricId).padStart(3, '0')}`,
    slug: `fabric-${fabricId}`,
    category: 'Fabrics',
    name: { en: `Premium Fabric ${fabricId}`, he: `בד יוקרתי ${fabricId}` },
    shortDescription: { en: `Luxurious fabric perfect for upholstery.`, he: `בד יוקרתי מושלם לריפוד.` },
    fullDescription: { en: `High-quality fabric with excellent durability and comfort.`, he: `בד באיכות גבוהה עם עמידות ונוחות מעולים.` },
    dimensions: { width: 140, height: 1, depth: 140 },
    materials: ['Premium fabric', 'Stain-resistant', 'High quality'],
    price: 300 + (fabricId * 20),
    images: [file],
    createdAt: new Date().toISOString()
  });
  fabricId++;
});

// Write with UTF-8 encoding
const jsonString = JSON.stringify(products, null, 2);
fs.writeFileSync('src/data/products.json', jsonString, 'utf8');
console.log(`Generated ${products.length} products: ${bedId-1} beds, ${couchId-1} couches, ${tableId-1} tables, ${fabricId-1} fabrics`);


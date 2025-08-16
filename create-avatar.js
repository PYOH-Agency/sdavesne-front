const fs = require('fs');
const path = require('path');

// Créer une image JPG simple (96x96px) avec un dégradé bleu-vert
// En production, vous remplacerez ceci par la vraie photo de Sophie Davesne

const width = 96;
const height = 96;

// Créer un canvas SVG temporaire qui sera converti en JPG
const svgContent = `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#3B82F6;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#10B981;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#grad)" rx="12"/>
  <circle cx="${width/2}" cy="${height/3}" r="${width/6}" fill="white" opacity="0.9"/>
  <path d="M${width/6} ${height*0.8}c0-${width/6} ${width/6}-${width/6} ${width/3}-${width/6}s${width/3} 0 ${width/3} ${width/6}" fill="white" opacity="0.9"/>
</svg>`;

// Sauvegarder le SVG temporaire
fs.writeFileSync(path.join(__dirname, 'public/images/sophie-davesne-avatar.svg'), svgContent);

console.log('✅ Avatar SVG temporaire créé avec succès !');
console.log('📝 Remplacez-le par la vraie photo de Sophie Davesne dans public/images/sophie-davesne-avatar.jpg');
console.log('💡 Format recommandé : JPG, 96x96px ou 192x192px');

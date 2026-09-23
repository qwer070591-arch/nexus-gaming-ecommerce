const categoryDefinitions = [
  { name: 'Keyboards', icon: '⌨', image: '/images/product1.png', description: 'Mechanical precision' },
  { name: 'Mice', icon: '◉', image: '/images/product2.png', description: 'Speed meets control' },
  { name: 'Headsets', icon: '◖', image: '/images/product3.png', description: 'Immersive audio' },
  { name: 'Monitors', icon: '▣', image: '/images/product10.png', description: 'See every frame' },
  { name: 'Accessories', icon: '✦', image: '/images/product7.png', description: 'Complete your setup' },
]

export const categories = categoryDefinitions.map((category) => ({
  ...category,
  image: {
    Keyboards: '/images/products/apex-k87/main.webp',
    Mice: '/images/product15.png',
    Headsets: '/images/product20.png',
    Monitors: '/images/products/nova-curve-34/main.webp',
    Accessories: '/images/products/hypergear-full-desk-bundle/main.webp',
  }[category.name],
}))

export const products = [
  { id: 1, name: 'Apex K87 Mechanical Keyboard', category: 'Keyboards', brand: 'Apex', price: 3290, originalPrice: 3790, rating: 4.9, reviews: 124, image: '/images/products/apex-k87/main.webp', images: ['/images/products/apex-k87/angle.webp', '/images/products/apex-k87/detail.webp', '/images/products/apex-k87/lifestyle.webp'], featured: true, popular: true, badge: 'Best seller', description: 'A compact tenkeyless keyboard built for calm, responsive competitive play.', specifications: { Switches: 'Linear red switches', Layout: '87-key TKL', Connection: 'USB-C wired', Lighting: 'Per-key RGB' } },
  { id: 2, name: 'Pulse Shift Wireless Mouse', category: 'Mice', brand: 'Pulse', price: 2190, originalPrice: 2490, rating: 4.8, reviews: 98, image: '/images/product15.png', images: [], featured: true, popular: true, badge: '−12%', description: 'An ultra-light wireless mouse with precise tracking and a sculpted, all-day shape.', specifications: { Sensor: '26K optical', Weight: '59 g', Battery: 'Up to 90 hours', Connection: '2.4 GHz / USB-C' } },
  { id: 3, name: 'Nova H1 Spatial Headset', category: 'Headsets', brand: 'NovaTech', price: 2790, originalPrice: null, rating: 4.7, reviews: 76, image: '/images/product20.png', images: ['/images/product21.png'], featured: true, popular: false, badge: 'New', description: 'Studio-tuned drivers and a clear detachable mic make every match feel closer.', specifications: { Drivers: '50 mm neodymium', Microphone: 'Detachable cardioid', Connection: '3.5 mm / USB', Weight: '278 g' } },
  { id: 4, name: 'Titan Glide XL Mouse Pad', category: 'Mouse Pads', brand: 'Titan', price: 890, originalPrice: 1090, rating: 4.8, reviews: 221, image: '/images/product19.png', images: [], featured: true, popular: true, badge: '−18%', description: 'A low-friction woven surface with a stable non-slip base for effortless aim.', specifications: { Size: '490 × 420 mm', Surface: 'Control weave', Base: 'Natural rubber', Thickness: '4 mm' } },
  { id: 5, name: 'HyperGear 75 Pro Keyboard', category: 'Keyboards', brand: 'HyperGear', price: 4490, originalPrice: null, rating: 4.9, reviews: 57, image: '/images/product13.png', images: [], featured: true, popular: false, badge: 'New', description: 'A premium 75% board with a gasket mount, hot-swappable switches, and rich acoustics.', specifications: { Switches: 'Tactile brown switches', Layout: '75% compact', Connection: 'Tri-mode wireless', Battery: '4,000 mAh' } },
  { id: 6, name: 'Apex Vision 27 QHD Monitor', category: 'Monitors', brand: 'Apex', price: 10990, originalPrice: 12490, rating: 4.8, reviews: 42, image: '/images/product24.png', images: [], featured: false, popular: true, badge: '−12%', description: 'Fast 180 Hz QHD performance with crisp color and a clean, adjustable stand.', specifications: { Panel: '27-inch Fast IPS', Resolution: '2560 × 1440', Refresh: '180 Hz', Response: '1 ms GtG' } },
  { id: 7, name: 'Pulse Stream USB Microphone', category: 'Microphones', brand: 'Pulse', price: 1990, originalPrice: null, rating: 4.6, reviews: 63, image: '/images/product27.png', images: [], featured: false, popular: true, badge: '', description: 'A plug-and-play condenser microphone made for sharp voice chat, streams, and calls.', specifications: { Capsule: '16 mm condenser', Pattern: 'Cardioid', Connection: 'USB-C', Controls: 'Gain / mute / headphone' } },
  { id: 8, name: 'Nova Air Wireless Headset', category: 'Headsets', brand: 'NovaTech', price: 3590, originalPrice: 3990, rating: 4.7, reviews: 88, image: '/images/product22.png', images: [], featured: false, popular: true, badge: '−10%', description: 'Comfort-first wireless audio with low-latency gaming mode and 45-hour battery.', specifications: { Drivers: '40 mm', Battery: 'Up to 45 hours', Wireless: '2.4 GHz + Bluetooth', Weight: '255 g' } },
  { id: 9, name: 'Titan Arc Ergonomic Mouse', category: 'Mice', brand: 'Titan', price: 1690, originalPrice: null, rating: 4.5, reviews: 49, image: '/images/product17.png', images: [], featured: false, popular: false, badge: '', description: 'A refined ergonomic mouse with dependable tracking and silent primary switches.', specifications: { Sensor: '18K optical', Weight: '76 g', Buttons: '6 programmable', Connection: 'Wireless / Bluetooth' } },
  { id: 10, name: 'Nova Curve 34 Ultrawide', category: 'Monitors', brand: 'NovaTech', price: 16990, originalPrice: 18490, rating: 4.9, reviews: 31, image: '/images/products/nova-curve-34/main.webp', images: ['/images/products/nova-curve-34/angle.webp', '/images/products/nova-curve-34/detail.webp', '/images/products/nova-curve-34/lifestyle.webp'], featured: false, popular: false, badge: '−8%', description: 'A sweeping ultrawide display that gives games, work, and media room to breathe.', specifications: { Panel: '34-inch VA curved', Resolution: '3440 × 1440', Refresh: '165 Hz', Curve: '1500R' } },
  { id: 11, name: 'HyperGear Flex Laptop Stand', category: 'Laptop Stands', brand: 'HyperGear', price: 1290, originalPrice: null, rating: 4.6, reviews: 37, image: '/images/product5.png', images: [], featured: false, popular: false, badge: '', description: 'A durable aluminum stand with six viewing angles and cooling-friendly airflow.', specifications: { Material: 'Anodized aluminum', Compatibility: 'Up to 16-inch', Adjustments: '6 height settings', Load: 'Up to 8 kg' } },
  { id: 12, name: 'Apex Command Gaming Chair', category: 'Gaming Chairs', brand: 'Apex', price: 8990, originalPrice: 9990, rating: 4.7, reviews: 26, image: '/images/products/apex-command-gaming-chair/main.webp', images: ['/images/products/apex-command-gaming-chair/angle.webp', '/images/products/apex-command-gaming-chair/detail.webp', '/images/products/apex-command-gaming-chair/lifestyle.webp'], featured: false, popular: false, badge: '−10%', description: 'Supportive high-back comfort with tuned lumbar support for longer game sessions.', specifications: { Upholstery: 'Breathable PU hybrid', Recline: '90°–155°', Frame: 'Steel', Capacity: '136 kg' } },
  { id: 13, name: 'Pulse Key 65 Keyboard', category: 'Keyboards', brand: 'Pulse', price: 2890, originalPrice: null, rating: 4.6, reviews: 40, image: '/images/product14.png', images: [], featured: false, popular: false, badge: '', description: 'A travel-ready 65% mechanical keyboard with practical arrow keys and warm RGB.', specifications: { Switches: 'Linear silver', Layout: '65%', Connection: 'Bluetooth / USB-C', Lighting: 'South-facing RGB' } },
  { id: 14, name: 'Titan Glide Desk Mat', category: 'Mouse Pads', brand: 'Titan', price: 1190, originalPrice: null, rating: 4.7, reviews: 84, image: '/images/product18.png', images: [], featured: false, popular: false, badge: '', description: 'A generous desk mat that anchors your full setup with a smooth, durable finish.', specifications: { Size: '900 × 400 mm', Surface: 'Spill-resistant weave', Base: 'Rubber grip', Thickness: '3 mm' } },
  { id: 15, name: 'Nova Echo Studio Mic', category: 'Microphones', brand: 'NovaTech', price: 3290, originalPrice: 3690, rating: 4.8, reviews: 29, image: '/images/product26.png', images: [], featured: false, popular: false, badge: '−11%', description: 'A vivid USB microphone with onboard monitoring for clean streaming and podcast audio.', specifications: { Capsule: 'Large diaphragm condenser', Pattern: 'Cardioid / omni', Connection: 'USB-C', Sampling: '24-bit / 96 kHz' } },
  { id: 16, name: 'Apex Frame 24 Monitor', category: 'Monitors', brand: 'Apex', price: 5690, originalPrice: null, rating: 4.5, reviews: 65, image: '/images/product25.png', images: [], featured: false, popular: false, badge: '', description: 'A compact, fast Full HD screen designed for responsive play in smaller spaces.', specifications: { Panel: '24.5-inch IPS', Resolution: '1920 × 1080', Refresh: '180 Hz', Response: '1 ms' } },
  { id: 17, name: 'HyperGear Orbit Headset', category: 'Headsets', brand: 'HyperGear', price: 1890, originalPrice: null, rating: 4.4, reviews: 52, image: '/images/product23.png', images: [], featured: false, popular: false, badge: '', description: 'Easy, balanced gaming audio in a featherweight design with soft memory foam cups.', specifications: { Drivers: '40 mm', Microphone: 'Flip-to-mute', Connection: '3.5 mm', Weight: '235 g' } },
  { id: 18, name: 'Pulse Edge Wireless Mouse', category: 'Mice', brand: 'Pulse', price: 2890, originalPrice: 3190, rating: 4.8, reviews: 73, image: '/images/product16.png', images: [], featured: false, popular: false, badge: '−9%', description: 'A competitive-grade symmetrical mouse that stays quick, light, and reliable.', specifications: { Sensor: '30K optical', Weight: '54 g', Battery: '100 hours', Connection: '2.4 GHz / USB-C' } },
  { id: 19, name: 'Titan Lift Pro Stand', category: 'Laptop Stands', brand: 'Titan', price: 1690, originalPrice: null, rating: 4.7, reviews: 21, image: '/images/products/titan-lift-pro/main.webp', images: ['/images/products/titan-lift-pro/angle.webp', '/images/products/titan-lift-pro/detail.webp', '/images/products/titan-lift-pro/lifestyle.webp'], featured: false, popular: false, badge: 'New', description: 'A rigid, height-adjustable laptop riser made for a cleaner posture and desk.', specifications: { Material: 'Aluminum alloy', Compatibility: '11–17 inches', Height: '55–155 mm', Load: '10 kg' } },
  { id: 20, name: 'Nova Throne Gaming Chair', category: 'Gaming Chairs', brand: 'NovaTech', price: 11990, originalPrice: null, rating: 4.9, reviews: 18, image: '/images/products/nova-throne-gaming-chair/main.webp', images: ['/images/products/nova-throne-gaming-chair/angle.webp', '/images/products/nova-throne-gaming-chair/detail.webp', '/images/products/nova-throne-gaming-chair/lifestyle.webp'], featured: false, popular: false, badge: 'New', description: 'A luxurious adjustable chair shaped to support demanding play and focused work.', specifications: { Upholstery: 'Soft fabric', Recline: '90°–160°', Frame: 'Reinforced steel', Capacity: '150 kg' } },
  { id: 21, name: 'Apex Switch Sample Kit', category: 'Accessories', brand: 'Apex', price: 490, originalPrice: null, rating: 4.6, reviews: 96, image: '/images/products/apex-switch-sample-kit/main.webp', images: ['/images/products/apex-switch-sample-kit/angle.webp', '/images/products/apex-switch-sample-kit/detail.webp', '/images/products/apex-switch-sample-kit/lifestyle.webp'], featured: false, popular: false, badge: '', description: 'Try six thoughtfully selected switch types before you choose your perfect feel.', specifications: { Switches: '24 assorted pieces', Types: 'Linear / tactile / clicky', Compatibility: 'MX-style', Case: 'Reusable storage case' } },
  { id: 22, name: 'Pulse Cable Dock', category: 'Accessories', brand: 'Pulse', price: 690, originalPrice: 790, rating: 4.5, reviews: 45, image: '/images/products/pulse-cable-dock/main.webp', images: ['/images/products/pulse-cable-dock/angle.webp', '/images/products/pulse-cable-dock/detail.webp', '/images/products/pulse-cable-dock/lifestyle.webp'], featured: false, popular: false, badge: '−13%', description: 'A weighted desktop dock that keeps your favorite wireless mouse cable exactly in place.', specifications: { Material: 'Silicone + zinc alloy', Cable: 'Fits 2.5–4 mm cable', Base: 'Non-slip', Color: 'Graphite' } },
  { id: 23, name: 'HyperGear Full Desk Bundle', category: 'Accessories', brand: 'HyperGear', price: 6490, originalPrice: 7790, rating: 4.9, reviews: 34, image: '/images/products/hypergear-full-desk-bundle/main.webp', images: ['/images/products/hypergear-full-desk-bundle/angle.webp', '/images/products/hypergear-full-desk-bundle/detail.webp', '/images/products/hypergear-full-desk-bundle/lifestyle.webp'], featured: false, popular: false, badge: 'Bundle', description: 'A coherent keyboard, mouse, and desk-mat trio curated for a sharp first setup.', specifications: { Includes: 'Keyboard, mouse, desk mat', Keyboard: '75% mechanical', Mouse: 'Wireless optical', Savings: 'NT$1,300' } },
  { id: 24, name: 'Titan RGB Light Bar', category: 'Accessories', brand: 'Titan', price: 990, originalPrice: null, rating: 4.5, reviews: 61, image: '/images/product7.png', images: [], featured: false, popular: false, badge: '', description: 'A low-profile monitor light bar that keeps your desk illuminated without glare.', specifications: { Lighting: 'RGBIC + warm white', Connection: 'USB-C', Controls: 'Touch + app', Length: '45 cm' } },
]

const refinedMainImages = {
  2: '/images/products/pulse-shift-wireless-mouse/main.webp',
  3: '/images/products/nova-h1-spatial-headset/main.webp',
  4: '/images/products/titan-glide-xl-mouse-pad/main.webp',
  5: '/images/products/hypergear-75-pro-keyboard/main.webp',
  6: '/images/products/apex-vision-27-qhd-monitor/main.webp',
  7: '/images/products/pulse-stream-usb-microphone/main.webp',
  8: '/images/products/nova-air-wireless-headset/main.webp',
  9: '/images/products/titan-arc-ergonomic-mouse/main.webp',
  13: '/images/products/pulse-key-65-keyboard/main.webp',
  14: '/images/products/titan-glide-desk-mat/main.webp',
  15: '/images/products/nova-echo-studio-mic/main.webp',
  16: '/images/products/apex-frame-24-monitor/main.webp',
  17: '/images/products/hypergear-orbit-headset/main.webp',
  18: '/images/products/pulse-edge-wireless-mouse/main.webp',
}

products.forEach((product) => {
  if (refinedMainImages[product.id]) product.image = refinedMainImages[product.id]
})

categories.forEach((category) => {
  if (category.name === 'Mice') category.image = refinedMainImages[2]
  if (category.name === 'Headsets') category.image = refinedMainImages[3]
  if (category.name === 'Monitors') category.image = refinedMainImages[6]
})

export const allCategories = ['All', 'Keyboards', 'Mice', 'Mouse Pads', 'Headsets', 'Monitors', 'Microphones', 'Laptop Stands', 'Gaming Chairs', 'Accessories']

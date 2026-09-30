// Demo catalog used when NEXT_PUBLIC_DEMO_MODE="true".
// Raw records here are shaped by demoFetch.js into the same JSON the Django API returns.
// Photos live in public/demo (Unsplash License, see public/demo/CREDITS.md).

const daysFromNow = (days) => new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString()

const brandTitles = [
    'Intel', 'AMD', 'ASUS', 'MSI', 'Gigabyte', 'Corsair', 'Kingston', 'Samsung', 'Western Digital',
    'Antec', 'DeepCool', 'Dell', 'Logitech', 'Havit', 'APC', 'Lenovo', 'HP', 'Acer', 'Apple', 'TP-Link',
    'D-Link', 'Canon', 'Epson', 'BenQ', 'Hikvision', 'Dahua', 'Fantech', 'Sony', 'Microsoft', 'SanDisk',
    'Seagate', 'Transcend', 'Edifier', 'Microlab', 'A4Tech', 'Fifine', 'Razer', 'Cooler Master', 'Power Guard',
]

export const demoBrands = brandTitles.map((title, i) => ({
    id: i + 1,
    slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    title,
    logo: null,
}))

// departments are top-level categories; each one also appears as a side menu with the same slug
const departments = [
    ['desktop-components', 'Desktop Components', 'cpu-line', [
        ['processor', 'Processor'], ['motherboard', 'Motherboard'], ['ram-desktop', 'RAM (Desktop)'], ['ssd', 'SSD'],
        ['graphics-card', 'Graphics Card'], ['power-supply', 'Power Supply'], ['casing', 'Casing'],
        ['cpu-cooler', 'CPU Cooler'], ['casing-cooler', 'Casing Cooler'],
    ]],
    ['laptops', 'Laptops', 'macbook-line', [
        ['gaming-laptop', 'Gaming Laptop'], ['business-laptop', 'Business Laptop'], ['ultrabook', 'Ultrabook'],
    ]],
    ['accessories', 'Accessories', 'keyboard-line', [
        ['monitor', 'Monitor'], ['keyboard', 'Keyboard'], ['mouse', 'Mouse'], ['headphone', 'Headphone'], ['webcam', 'Webcam'],
    ]],
    ['gaming', 'Gaming', 'gamepad-line', [
        ['gaming-chair', 'Gaming Chair'], ['gamepad', 'Gamepad'], ['gaming-console', 'Gaming Console'],
    ]],
    ['networking', 'Networking', 'router-line', [
        ['router', 'Router'], ['network-switch', 'Network Switch'], ['wifi-adapter', 'WiFi Adapter'],
    ]],
    ['storage', 'Storage', 'hard-drive-2-line', [
        ['portable-hdd', 'Portable HDD'], ['pen-drive', 'Pen Drive'], ['memory-card', 'Memory Card'],
    ]],
    ['office-equipment', 'Office Equipment', 'printer-line', [
        ['printer', 'Printer'], ['scanner', 'Scanner'], ['projector', 'Projector'], ['ups', 'UPS'],
    ]],
    ['security-surveillance', 'Security & Surveillance', 'shield-check-line', [
        ['cctv-camera', 'CCTV Camera'], ['ip-camera', 'IP Camera'],
    ]],
    ['audio', 'Audio', 'speaker-2-line', [
        ['speaker', 'Speaker'], ['microphone', 'Microphone'],
    ]],
]

// parent_category holds the parent's slug, matching the API's StringRelatedField
export const demoCategories = departments.flatMap(([slug, title, logo, children]) => [
    { slug, title, logo, parent_category: null },
    ...children.map(([childSlug, childTitle]) => ({ slug: childSlug, title: childTitle, parent_category: slug })),
]).map((category, i) => ({ id: i + 1, ...category }))

// sub menu slugs match category slugs because query is 'category'
export const demoSideMenus = departments.map(([slug, title, logo, children], i) => ({
    id: i + 1,
    title,
    slug,
    logo,
    query: 'category',
    sub_side_menu: children.map(([childSlug]) => childSlug),
}))

export const demoSliders = [
    { id: 1, slider_url: '/menu/desktop-components', mini_text: 'Build your dream PC', mid_text: 'Latest desktop components', color: true, image: '/demo/slider/slider-1.jpg' },
    { id: 2, slider_url: '/trending', mini_text: 'Hot deals this week', mid_text: 'Up to 15% off', color: true, image: '/demo/slider/slider-2.jpg' },
    { id: 3, slider_url: '/menu/gaming', mini_text: 'Level up your setup', mid_text: 'Gaming gear in stock', color: true, image: '/demo/slider/slider-3.jpg' },
]

const reviewers = ['rahim', 'karim', 'nusrat', 'tanvir', 'farhana']
const comments = [
    'Great product, works exactly as described.',
    'Good value for the price. Fast delivery too.',
    'Solid build quality, happy with the purchase.',
    'Performance is excellent for my use case.',
]

// [title, category, brand, model, price, prev_price, flags, key features]
const rawProducts = [
    // desktop components
    ['Intel Core i5-13400F 13th Gen Processor', 'processor', 'Intel', 'i5-13400f', 24500, 26000, { featured: true, offered: true },
        [['Cores', '10 (6P + 4E)'], ['Threads', '16'], ['Max Turbo', '4.6 GHz'], ['Socket', 'LGA1700']]],
    ['AMD Ryzen 7 7700X Processor', 'processor', 'AMD', 'ryzen-7-7700x', 38500, 41000, { featured: true, offered: true, display_big: true },
        [['Cores', '8'], ['Threads', '16'], ['Max Boost', '5.4 GHz'], ['Socket', 'AM5']]],
    ['Intel Core i9-14900K 14th Gen Processor', 'processor', 'Intel', 'i9-14900k', 68000, 0, {},
        [['Cores', '24 (8P + 16E)'], ['Threads', '32'], ['Max Turbo', '6.0 GHz'], ['Socket', 'LGA1700']]],
    ['ASUS PRIME B760M-A D4 Motherboard', 'motherboard', 'ASUS', 'prime-b760m-a-d4', 17800, 0, {},
        [['Chipset', 'Intel B760'], ['Form Factor', 'Micro ATX'], ['Memory', 'DDR4, up to 128GB'], ['Socket', 'LGA1700']]],
    ['MSI MAG B650 TOMAHAWK WiFi Motherboard', 'motherboard', 'MSI', 'mag-b650-tomahawk-wifi', 29500, 31000, { featured: true },
        [['Chipset', 'AMD B650'], ['Form Factor', 'ATX'], ['Memory', 'DDR5, up to 192GB'], ['Wireless', 'Wi-Fi 6E']]],
    ['Corsair Vengeance LPX 16GB DDR4 3200MHz RAM', 'ram-desktop', 'Corsair', 'cmk16gx4m1e3200c16', 5200, 5600, { featured: true, offered: true },
        [['Capacity', '16GB'], ['Type', 'DDR4'], ['Speed', '3200MHz'], ['Latency', 'CL16']]],
    ['Kingston FURY Beast 32GB DDR5 5600MHz RAM', 'ram-desktop', 'Kingston', 'kf556c40bb-32', 11800, 0, {},
        [['Capacity', '32GB'], ['Type', 'DDR5'], ['Speed', '5600MHz'], ['Latency', 'CL40']]],
    ['Samsung 980 PRO 1TB PCIe 4.0 NVMe SSD', 'ssd', 'Samsung', 'mz-v8p1t0bw', 12500, 14000, { featured: true, offered: true },
        [['Capacity', '1TB'], ['Interface', 'PCIe 4.0 x4 NVMe'], ['Read', '7000 MB/s'], ['Write', '5000 MB/s']]],
    ['Western Digital Blue SN580 500GB NVMe SSD', 'ssd', 'Western Digital', 'wds500g3b0e', 5400, 0, { is_stock: false },
        [['Capacity', '500GB'], ['Interface', 'PCIe 4.0 x4 NVMe'], ['Read', '4000 MB/s'], ['Write', '3600 MB/s']]],
    ['ASUS Dual GeForce RTX 4060 OC 8GB Graphics Card', 'graphics-card', 'ASUS', 'dual-rtx4060-o8g', 42000, 45000, { featured: true, offered: true },
        [['Memory', '8GB GDDR6'], ['Boost Clock', '2535 MHz'], ['Outputs', 'HDMI 2.1, 3x DP 1.4a'], ['Power', '1x 8-pin']]],
    ['Gigabyte Radeon RX 7600 Gaming OC 8GB Graphics Card', 'graphics-card', 'Gigabyte', 'gv-r76gaming-oc-8gd', 36500, 0, {},
        [['Memory', '8GB GDDR6'], ['Boost Clock', '2755 MHz'], ['Outputs', '2x HDMI, 2x DP'], ['Power', '1x 8-pin']]],
    ['Corsair RM750e 750W 80 Plus Gold Power Supply', 'power-supply', 'Corsair', 'cp-9020262', 12800, 0, { featured: true },
        [['Wattage', '750W'], ['Efficiency', '80 Plus Gold'], ['Modular', 'Fully Modular'], ['Fan', '120mm']]],
    ['Antec CSK550 550W 80 Plus Bronze Power Supply', 'power-supply', 'Antec', 'csk550', 5300, 5800, {},
        [['Wattage', '550W'], ['Efficiency', '80 Plus Bronze'], ['Modular', 'Non Modular'], ['Fan', '120mm']]],
    ['Antec NX410 Mid Tower Gaming Casing', 'casing', 'Antec', 'nx410', 6200, 6800, {},
        [['Type', 'Mid Tower'], ['Motherboard', 'ATX, Micro ATX, ITX'], ['Fans', '3x ARGB included'], ['Side Panel', 'Tempered Glass']]],
    ['Cooler Master MasterBox TD500 Mesh Casing', 'casing', 'Cooler Master', 'td500-mesh', 9800, 0, { featured: true },
        [['Type', 'Mid Tower'], ['Motherboard', 'E-ATX, ATX, Micro ATX'], ['Fans', '3x 120mm ARGB'], ['Front Panel', 'Mesh']]],
    ['DeepCool AK400 CPU Air Cooler', 'cpu-cooler', 'DeepCool', 'ak400', 3900, 0, { featured: true },
        [['Type', 'Air Cooler'], ['Heatpipes', '4'], ['Fan', '120mm FDB'], ['TDP', '220W']]],
    ['DeepCool LE720 240mm Liquid CPU Cooler', 'cpu-cooler', 'DeepCool', 'le720', 9500, 10500, { offered: true },
        [['Type', 'AIO Liquid Cooler'], ['Radiator', '240mm'], ['Fans', '2x 120mm ARGB'], ['Socket', 'LGA1700, AM5']]],
    ['DeepCool FC120 ARGB Casing Fan (3 Pack)', 'casing-cooler', 'DeepCool', 'fc120-3in1', 3600, 0, {},
        [['Size', '120mm'], ['Quantity', '3'], ['Lighting', 'ARGB'], ['Speed', '500 - 1800 RPM']]],
    ['Corsair iCUE AF120 RGB Elite Casing Fan', 'casing-cooler', 'Corsair', 'af120-rgb-elite', 2400, 0, {},
        [['Size', '120mm'], ['Quantity', '1'], ['Lighting', 'RGB'], ['Speed', '400 - 2100 RPM']]],

    // laptops
    ['ASUS TUF Gaming F15 Core i7 RTX 4060 Gaming Laptop', 'gaming-laptop', 'ASUS', 'fx507vv', 165000, 175000, { featured: true, offered: true },
        [['Processor', 'Intel Core i7-13620H'], ['RAM', '16GB DDR5'], ['Storage', '512GB NVMe SSD'], ['Display', '15.6" FHD 144Hz']]],
    ['Lenovo LOQ 15IRH8 Core i5 RTX 3050 Gaming Laptop', 'gaming-laptop', 'Lenovo', '15irh8', 112000, 0, {},
        [['Processor', 'Intel Core i5-12450H'], ['RAM', '16GB DDR5'], ['Storage', '512GB NVMe SSD'], ['Display', '15.6" FHD 144Hz']]],
    ['Dell Latitude 3540 Core i5 13th Gen Business Laptop', 'business-laptop', 'Dell', 'latitude-3540', 89000, 0, { featured: true },
        [['Processor', 'Intel Core i5-1335U'], ['RAM', '8GB DDR4'], ['Storage', '512GB SSD'], ['Display', '15.6" FHD']]],
    ['Acer Aspire 5 A515 Core i5 Laptop', 'business-laptop', 'Acer', 'a515-58m', 72000, 76000, {},
        [['Processor', 'Intel Core i5-1335U'], ['RAM', '8GB DDR5'], ['Storage', '512GB SSD'], ['Display', '15.6" FHD IPS']]],
    ['Apple MacBook Air 13" M3 8GB 256GB', 'ultrabook', 'Apple', 'mrxn3', 138000, 0, { featured: true },
        [['Chip', 'Apple M3 8-core'], ['RAM', '8GB Unified'], ['Storage', '256GB SSD'], ['Display', '13.6" Liquid Retina']]],
    ['HP Pavilion Aero 13 Ryzen 7 Ultrabook', 'ultrabook', 'HP', 'aero-13-be2', 98000, 104000, { offered: true },
        [['Processor', 'AMD Ryzen 7 7735U'], ['RAM', '16GB LPDDR5'], ['Storage', '512GB SSD'], ['Weight', '0.99 kg']]],

    // accessories
    ['ASUS TUF Gaming VG249Q1A 23.8" FHD 165Hz Monitor', 'monitor', 'ASUS', 'vg249q1a', 21500, 23000, { featured: true, offered: true },
        [['Size', '23.8 inch'], ['Resolution', '1920 x 1080'], ['Refresh Rate', '165Hz'], ['Panel', 'IPS']]],
    ['Dell S2722DC 27" QHD USB-C Monitor', 'monitor', 'Dell', 's2722dc', 36000, 0, {},
        [['Size', '27 inch'], ['Resolution', '2560 x 1440'], ['Refresh Rate', '75Hz'], ['Ports', 'USB-C 65W, 2x HDMI']]],
    ['Samsung Odyssey G5 32" Curved Gaming Monitor', 'monitor', 'Samsung', 'lc32g55t', 42000, 45500, {},
        [['Size', '32 inch'], ['Resolution', '2560 x 1440'], ['Refresh Rate', '144Hz'], ['Curvature', '1000R']]],
    ['Logitech G213 Prodigy RGB Gaming Keyboard', 'keyboard', 'Logitech', 'g213', 5800, 0, { featured: true },
        [['Switch', 'Mech-Dome'], ['Lighting', 'RGB 5-zone'], ['Connection', 'USB'], ['Spill Resistant', 'Yes']]],
    ['Fantech MAXFIT61 Mechanical Keyboard', 'keyboard', 'Fantech', 'mk857', 3500, 3900, {},
        [['Switch', 'Hot-swappable Red'], ['Layout', '60%'], ['Lighting', 'RGB'], ['Connection', 'USB-C']]],
    ['Logitech G102 Lightsync RGB Gaming Mouse', 'mouse', 'Logitech', 'g102', 1950, 2200, { featured: true, offered: true },
        [['DPI', '200 - 8000'], ['Buttons', '6'], ['Lighting', 'RGB'], ['Connection', 'USB']]],
    ['Razer DeathAdder Essential Gaming Mouse', 'mouse', 'Razer', 'rz01-03850100', 2600, 0, {},
        [['DPI', '6400'], ['Buttons', '5'], ['Sensor', 'Optical'], ['Connection', 'USB']]],
    ['Havit H2002d Gaming Headphone', 'headphone', 'Havit', 'h2002d', 2300, 0, {},
        [['Driver', '53mm'], ['Microphone', 'Yes'], ['Connection', '3.5mm + USB'], ['Weight', '320g']]],
    ['Razer BlackShark V2 X Gaming Headset', 'headphone', 'Razer', 'rz04-03240100', 6200, 6800, { featured: true },
        [['Driver', '50mm'], ['Surround', '7.1'], ['Microphone', 'Cardioid'], ['Connection', '3.5mm']]],
    ['Logitech C920 HD Pro Webcam', 'webcam', 'Logitech', 'c920', 7900, 0, {},
        [['Resolution', '1080p 30fps'], ['Focus', 'Autofocus'], ['Microphone', 'Dual Stereo'], ['Connection', 'USB']]],

    // gaming
    ['Fantech Alpha GC-283 Gaming Chair', 'gaming-chair', 'Fantech', 'gc-283', 18500, 20000, { featured: true },
        [['Material', 'PU Leather'], ['Recline', '90 - 180°'], ['Armrest', '2D Adjustable'], ['Max Load', '150 kg']]],
    ['Cooler Master Caliber R3 Gaming Chair', 'gaming-chair', 'Cooler Master', 'caliber-r3', 24000, 0, {},
        [['Material', 'PU Leather'], ['Recline', '90 - 180°'], ['Armrest', '4D Adjustable'], ['Max Load', '150 kg']]],
    ['Microsoft Xbox Wireless Controller', 'gamepad', 'Microsoft', 'xbox-wireless', 6500, 7200, { offered: true },
        [['Connection', 'Bluetooth / USB-C'], ['Compatibility', 'Xbox, PC, Mobile'], ['Battery', '2x AA'], ['Color', 'Carbon Black']]],
    ['Sony DualShock 4 Wireless Controller', 'gamepad', 'Sony', 'cuh-zct2', 5800, 0, {},
        [['Connection', 'Bluetooth'], ['Compatibility', 'PS4, PC'], ['Battery', 'Rechargeable'], ['Touchpad', 'Yes']]],
    ['Microsoft Xbox Series S 512GB Console', 'gaming-console', 'Microsoft', 'series-s-512', 52000, 0, { featured: true },
        [['Storage', '512GB SSD'], ['Resolution', 'Up to 1440p'], ['Frame Rate', 'Up to 120fps'], ['Disc Drive', 'No']]],

    // networking
    ['TP-Link Archer C6 AC1200 Dual Band Router', 'router', 'TP-Link', 'archer-c6', 3900, 4200, { featured: true },
        [['Speed', 'AC1200'], ['Band', 'Dual Band'], ['Antenna', '4 External'], ['Ports', 'Gigabit']]],
    ['TP-Link Archer AX23 AX1800 WiFi 6 Router', 'router', 'TP-Link', 'archer-ax23', 6200, 0, {},
        [['Speed', 'AX1800'], ['Standard', 'Wi-Fi 6'], ['Antenna', '4 External'], ['Ports', 'Gigabit']]],
    ['D-Link DGS-1016A 16-Port Gigabit Switch', 'network-switch', 'D-Link', 'dgs-1016a', 5600, 0, {},
        [['Ports', '16x Gigabit'], ['Type', 'Unmanaged'], ['Mount', 'Desktop / Rack'], ['Switching Capacity', '32 Gbps']]],
    ['TP-Link Archer TX20U Plus AX1800 USB WiFi Adapter', 'wifi-adapter', 'TP-Link', 'archer-tx20u-plus', 3300, 3600, {},
        [['Standard', 'Wi-Fi 6'], ['Speed', 'AX1800'], ['Interface', 'USB 3.0'], ['Antenna', '2 High-Gain']]],

    // storage
    ['Seagate Expansion 2TB Portable HDD', 'portable-hdd', 'Seagate', 'stkm2000400', 7200, 0, { featured: true },
        [['Capacity', '2TB'], ['Interface', 'USB 3.0'], ['Size', '2.5 inch'], ['Compatibility', 'Windows, Mac']]],
    ['Western Digital My Passport 1TB Portable HDD', 'portable-hdd', 'Western Digital', 'wdbyvg0010bbk', 5900, 6300, {},
        [['Capacity', '1TB'], ['Interface', 'USB 3.2'], ['Security', '256-bit AES'], ['Size', '2.5 inch']]],
    ['SanDisk Ultra Flair 64GB USB 3.0 Pen Drive', 'pen-drive', 'SanDisk', 'sdcz73-064g', 850, 0, {},
        [['Capacity', '64GB'], ['Interface', 'USB 3.0'], ['Read', '150 MB/s'], ['Body', 'Metal']]],
    ['Transcend JetFlash 790 128GB Pen Drive', 'pen-drive', 'Transcend', 'ts128gjf790k', 1350, 1500, { offered: true },
        [['Capacity', '128GB'], ['Interface', 'USB 3.1'], ['Design', 'Capless Sliding'], ['Warranty', 'Lifetime']]],
    ['SanDisk Extreme PRO 128GB SDXC Card', 'memory-card', 'SanDisk', 'sdsdxxd-128g', 2900, 0, {},
        [['Capacity', '128GB'], ['Class', 'UHS-I U3 V30'], ['Read', '200 MB/s'], ['Write', '90 MB/s']]],
    ['Samsung EVO Plus 128GB microSD Card', 'memory-card', 'Samsung', 'mb-mc128ka', 1500, 1700, { featured: true },
        [['Capacity', '128GB'], ['Class', 'U3 V30 A2'], ['Read', '130 MB/s'], ['Adapter', 'SD Adapter Included']]],

    // office equipment
    ['HP LaserJet Pro MFP 4103fdw Printer', 'printer', 'HP', '2z629a', 58000, 0, { featured: true },
        [['Type', 'Mono Laser MFP'], ['Functions', 'Print, Copy, Scan, Fax'], ['Speed', '40 ppm'], ['Connectivity', 'Wi-Fi, LAN, USB']]],
    ['Canon PIXMA G3020 Ink Tank Printer', 'printer', 'Canon', 'g3020', 18500, 19800, {},
        [['Type', 'Color Ink Tank'], ['Functions', 'Print, Copy, Scan'], ['Resolution', '4800 x 1200 dpi'], ['Connectivity', 'Wi-Fi, USB']]],
    ['Epson Perfection V39 II Flatbed Scanner', 'scanner', 'Epson', 'v39-ii', 11500, 0, {},
        [['Type', 'Flatbed'], ['Resolution', '4800 dpi'], ['Scan Size', 'A4'], ['Interface', 'USB']]],
    ['BenQ MW560 WXGA Business Projector', 'projector', 'BenQ', 'mw560', 62000, 65000, { offered: true },
        [['Brightness', '4000 ANSI Lumens'], ['Resolution', '1280 x 800'], ['Contrast', '20000:1'], ['Ports', '2x HDMI, VGA']]],
    ['Epson EB-E01 XGA Projector', 'projector', 'Epson', 'eb-e01', 48000, 0, {},
        [['Brightness', '3300 Lumens'], ['Resolution', '1024 x 768'], ['Contrast', '15000:1'], ['Lamp Life', '12000 hours']]],
    ['APC Back-UPS BX1100C 1100VA UPS', 'ups', 'APC', 'bx1100c-ms', 11500, 0, { featured: true },
        [['Capacity', '1100VA / 550W'], ['Outlets', '4'], ['Backup', 'Up to 25 min (half load)'], ['Type', 'Line Interactive']]],
    ['Power Guard PG650VA Offline UPS', 'ups', 'Power Guard', 'pg650va', 3200, 3500, {},
        [['Capacity', '650VA'], ['Outlets', '3'], ['Backup', '10 - 15 min'], ['Type', 'Offline']]],

    // security & surveillance
    ['Hikvision DS-2CE16D0T 2MP Bullet CCTV Camera', 'cctv-camera', 'Hikvision', 'ds-2ce16d0t-irf', 1900, 0, { featured: true },
        [['Resolution', '2MP 1080p'], ['Night Vision', 'Up to 20m'], ['Lens', '3.6mm'], ['Weatherproof', 'IP67']]],
    ['Dahua HAC-HDW1200TRQP 2MP Dome CCTV Camera', 'cctv-camera', 'Dahua', 'hac-hdw1200trqp', 1700, 1900, {},
        [['Resolution', '2MP 1080p'], ['Night Vision', 'Up to 30m'], ['Lens', '2.8mm'], ['Type', 'Dome']]],
    ['Hikvision DS-2CD1043G0-I 4MP IP Camera', 'ip-camera', 'Hikvision', 'ds-2cd1043g0-i', 5200, 0, {},
        [['Resolution', '4MP'], ['Night Vision', 'Up to 30m'], ['Compression', 'H.265+'], ['Power', 'PoE']]],

    // audio
    ['Edifier R1280DB Bluetooth Bookshelf Speaker', 'speaker', 'Edifier', 'r1280db', 13500, 14500, { featured: true },
        [['Output', '42W RMS'], ['Connection', 'Bluetooth, Optical, RCA'], ['Driver', '4" Bass + 13mm Tweeter'], ['Remote', 'Yes']]],
    ['Microlab M-108 2.1 Multimedia Speaker', 'speaker', 'Microlab', 'm-108', 2500, 0, {},
        [['Channel', '2.1'], ['Output', '11W RMS'], ['Connection', '3.5mm'], ['Power', 'AC']]],
    ['Fifine K669B USB Condenser Microphone', 'microphone', 'Fifine', 'k669b', 3600, 0, {},
        [['Type', 'Condenser'], ['Pattern', 'Cardioid'], ['Connection', 'USB'], ['Stand', 'Tripod Included']]],
    ['Fifine AmpliGame A8 RGB Gaming Microphone', 'microphone', 'Fifine', 'a8', 4800, 5200, { offered: true },
        [['Type', 'Condenser'], ['Pattern', 'Cardioid'], ['Connection', 'USB-C'], ['Lighting', 'RGB']]],
]

const brandSlug = (title) => demoBrands.find(b => b.title === title).slug

// the nth product of a category uses public/demo/products/<category>-<n>.jpg
const categoryCounter = {}

export const demoProducts = rawProducts.map(([title, category, brand, model_name, price, prev_price, flags, features], index) => {
    const id = index + 1
    const total_stock = 40 + (id * 7) % 60
    const reviewCount = id % 4
    categoryCounter[category] = (categoryCounter[category] || 0) + 1
    return {
        id,
        title,
        slug: `${brandSlug(brand)}-${category}-${model_name}`,
        category,
        brand: brandSlug(brand),
        side_menu: demoCategories.find(c => c.slug === category).parent_category,
        model_name,
        price,
        prev_price,
        emi_price: Math.round(price / 12),
        is_stock: flags.is_stock ?? true,
        sold_stock: Math.floor(total_stock * ((id * 13) % 90) / 100),
        total_stock,
        featured: !!flags.featured,
        offered: !!flags.offered,
        display_big: !!flags.display_big,
        offered_time: flags.offered ? daysFromNow(2 + (id % 5)) : null,
        description: `${title} is a reliable choice from ${brand}. This is demo data shown while the site runs in demo mode.`,
        image: `/demo/products/${category}-${categoryCounter[category]}.jpg`,
        key_features: features,
        reviews: Array.from({ length: reviewCount }, (_, i) => ({
            user: reviewers[(id + i) % reviewers.length],
            comment: comments[(id + i) % comments.length],
            stars: 5 - ((id + i) % 2),
            date: daysFromNow(-(10 + id + i * 3)).slice(0, 10),
        })),
    }
})

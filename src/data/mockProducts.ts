import { Product } from '../types.ts';

export const PRODUCTS: Product[] = [
  {
    id: 'volt-audio-pro',
    title: 'Aura SoundMax Studio Wireless ANC Headphones with Spatial Audio & LDAC',
    shortTitle: 'Aura SoundMax Studio ANC',
    brand: 'Volt Acoustics',
    category: 'audio',
    categoryLabel: 'Audio & Acoustics',
    price: 349.99,
    originalPrice: 429.99,
    rating: 4.9,
    reviewsCount: 3120,
    isPrime: true,
    isBestSeller: true,
    isAmazonChoice: true,
    inStock: true,
    stockCount: 24,
    image: '/src/assets/images/hero_flagship_audio_1793046601743.jpg',
    description:
      'Engineered for acoustic purists, producers, and discerning audiophiles. Powered by 45mm custom beryllium dynamic drivers, hybrid adaptive noise cancellation up to 48dB, and uncompressed LDAC high-resolution wireless streaming with up to 60 hours of continuous playback.',
    keyFeatures: [
      'Custom 45mm Beryllium Acoustic Dome Drivers with ultra-low 0.05% THD distortion',
      'Advanced 4-tier Hybrid Active Noise Cancellation adapting 10,000 times per second',
      'Lossless LDAC & aptX Adaptive Bluetooth 5.4 wireless streaming',
      '60-hour continuous playback with fast-charge (10 min charge = 6 hours listening)',
      'Quad beamforming microphones with AI wind and ambient noise suppression'
    ],
    specs: {
      'Driver Diameter': '45mm Custom Beryllium Dome',
      'Frequency Response': '5Hz – 45,000Hz (Hi-Res Certified)',
      'Noise Cancellation': 'Active Hybrid up to -48dB with Transparency Mode',
      'Battery Runtime': '60 Hours (ANC Off) / 46 Hours (ANC On)',
      'Bluetooth Standard': 'Bluetooth 5.4 Multipoint (Connects 2 devices simultaneously)',
      'Supported Codecs': 'LDAC, aptX Adaptive, AAC, SBC',
      'Weight': '278 grams (0.61 lbs)',
      'Included In Box': 'Hard Travel Shell, 3.5mm Braided Cable, USB-C Fast Cable, Airplane Adapter'
    },
    variants: {
      colors: ['Titanium Slate', 'Matte Carbon Black', 'Moonlight Silver'],
      storage: ['Standard Studio Edition', 'Producer Bundle (+ DAC & Cable)']
    },
    reviews: [
      {
        id: 'rev-1',
        author: 'Marcus Vance',
        rating: 5,
        date: 'October 18, 2026',
        title: 'Better soundstage and ANC than Sony XM5 or AirPods Max',
        content:
          'As an audio mastering engineer, I was skeptical of wireless headphones until testing the Aura SoundMax. The transient response on acoustic instruments is remarkably crisp without harsh sibilance. ANC completely erased subway train rumble.',
        verified: true,
        helpfulCount: 142
      },
      {
        id: 'rev-2',
        author: 'Elena Rostova',
        rating: 5,
        date: 'October 12, 2026',
        title: '60hr battery is no joke — charges like lightning',
        content:
          'Traveled across three timezones and barely drained 30% of the battery. The plush earcups never pinch my glasses. Highly recommend the Titanium Slate finish, looks extremely high-end.',
        verified: true,
        helpfulCount: 89
      },
      {
        id: 'rev-3',
        author: 'David Chen',
        rating: 4,
        date: 'September 29, 2026',
        title: 'Outstanding fidelity, slightly firm clamping force at first',
        content:
          'Sound quality is 10/10. Takes about 2 days of gentle break-in for the headband to mold to your head size, after which it feels like a cloud.',
        verified: true,
        helpfulCount: 31
      }
    ]
  },
  {
    id: 'volt-laptop-titan',
    title: 'Titan Arc 15 Pro Workstation Laptop (15.6" 3.2K 120Hz OLED, 32GB RAM, 1TB SSD)',
    shortTitle: 'Titan Arc 15 Pro Laptop',
    brand: 'Titan Systems',
    category: 'computing',
    categoryLabel: 'Laptops & Computing',
    price: 1899.99,
    originalPrice: 2199.99,
    rating: 4.8,
    reviewsCount: 1480,
    isPrime: true,
    isBestSeller: false,
    isAmazonChoice: true,
    inStock: true,
    stockCount: 9,
    image: '/src/assets/images/product_laptop_pro_1793046602825.jpg',
    description:
      'Ultralight aerospace-grade aluminum chassis with a breathtaking 15.6-inch 3.2K 120Hz calibrated OLED display. Powered by a 16-core neural processor, 32GB unified memory, and vapor chamber thermal architecture designed for software developers, 3D artists, and creators.',
    keyFeatures: [
      '15.6" 3.2K (3200 x 2000) 120Hz OLED with 100% DCI-P3 color calibration and 600 nits HDR',
      'Next-Gen 16-Core Neural Silicon processor with dedicated 48 TOPS AI engine',
      '32GB LPDDR5X 7500MHz Unified RAM + 1TB PCIe 4.0 NVMe SSD (up to 7,200 MB/s)',
      'Dual Vapor Chamber cooling system maintaining peak sustained boost clocks',
      'All-day 96Wh battery with 140W USB-C GaN fast adapter (50% charge in 28 mins)'
    ],
    specs: {
      'Display': '15.6-inch 3.2K OLED 120Hz, 0.2ms response, Dolby Vision HDR',
      'Processor': '16-Core Neural Architecture, up to 4.9 GHz Turbo',
      'Memory': '32GB LPDDR5X (Unified High-Bandwidth)',
      'Storage': '1TB NVMe PCIe Gen4 M.2 Solid State Drive',
      'Ports': '2x Thunderbolt 4, 1x HDMI 2.1, 2x USB-A 3.2, UHS-II SD Card Reader',
      'Battery': '96Wh Lithium Polymer (up to 18 hours office productivity)',
      'Weight': '1.49 kg (3.28 lbs)',
      'Operating System': 'Volt OS Professional / Linux / Windows 11 Ready'
    },
    variants: {
      colors: ['Space Gray Titanium', 'Starlight Silver'],
      storage: ['32GB RAM / 1TB NVMe', '64GB RAM / 2TB NVMe']
    },
    reviews: [
      {
        id: 'rev-201',
        author: 'Siddharth M.',
        rating: 5,
        date: 'October 21, 2026',
        title: 'The cleanest developer machine on the market',
        content:
          'Compiles large Docker containers and Next.js repositories silently. The OLED display is true black and text is tack-sharp at 120Hz.',
        verified: true,
        helpfulCount: 65
      }
    ]
  },
  {
    id: 'volt-watch-ultra',
    title: 'Apex Chrono Horizon Titanium GPS Multisport Smartwatch with Sapphire Glass',
    shortTitle: 'Apex Chrono Horizon Smartwatch',
    brand: 'Apex Gear',
    category: 'wearables',
    categoryLabel: 'Smart Wearables',
    price: 429.00,
    originalPrice: 499.00,
    rating: 4.9,
    reviewsCount: 890,
    isPrime: true,
    isBestSeller: true,
    isAmazonChoice: false,
    inStock: true,
    stockCount: 38,
    image: '/src/assets/images/product_smartwatch_ultra_1793046603710.jpg',
    description:
      'Engineered for extreme endurance athletes, divers, and mountaineers. Handcrafted with a Grade 5 titanium bezel, scratch-proof sapphire crystal lens, dual-frequency multi-satellite GNSS positioning, and 21-day solar battery autonomy.',
    keyFeatures: [
      'Grade 5 Aerospace Titanium case with diamond-like carbon (DLC) protective coating',
      'Dual-Frequency L1/L5 GPS with offline contour topographical maps and turn navigation',
      '10 ATM Water Resistance (certified for 100m scuba diving and water sports)',
      'Comprehensive biometrics: continuous ECG, optical SpO2, HRV recovery tracker',
      'Solar-enhanced sapphire dial delivering up to 21 days battery in smartwatch mode'
    ],
    specs: {
      'Case Material': 'Grade 5 Aerospace Titanium with ceramic backplate',
      'Lens Material': 'Anti-reflective Sapphire Crystal Glass',
      'Display': '1.43-inch Always-On AMOLED (1,400 nits sunlight viewable)',
      'Water Rating': '10 ATM (100 meters dive tested, EN13319)',
      'Battery Life': '21 Days in Smartwatch Mode / 68 Hours in Full Dual GPS',
      'Sensors': 'Optical 6-LED HR, ECG, Pulse Ox, 3D Compass, Altimeter, Barometer',
      'Connectivity': 'Bluetooth 5.3, Wi-Fi, ANT+, NFC Contactless Payments'
    },
    variants: {
      colors: ['Midnight Slate Silicone', 'Tactical Desert Loop', 'Brushed Titanium Link'],
      storage: ['47mm Standard', '51mm Expedition']
    },
    reviews: [
      {
        id: 'rev-301',
        author: 'Chloe Dupont',
        rating: 5,
        date: 'October 15, 2026',
        title: 'Survived a 7-day alpine hike without a single recharge',
        content:
          'GPS track matched the actual trails to within 2 meters. Incredible durability after scraping rocks multiple times — not a scratch on the titanium bezel.',
        verified: true,
        helpfulCount: 52
      }
    ]
  },
  {
    id: 'volt-cinema-camera',
    title: 'Lumina Cine-X 12K Pro Cinema Digital Camera Body with Dual Native ISO',
    shortTitle: 'Lumina Cine-X 12K Camera',
    brand: 'Lumina Optics',
    category: 'cameras',
    categoryLabel: 'Cameras & Optics',
    price: 2649.00,
    originalPrice: 2899.00,
    rating: 4.7,
    reviewsCount: 420,
    isPrime: true,
    isBestSeller: false,
    isAmazonChoice: true,
    inStock: true,
    stockCount: 5,
    image: '/src/assets/images/product_dslr_camera_1793046603805.jpg',
    description:
      'High-end production powerhouse. Equipped with an oversized Super35 cinema sensor shooting up to 12K 60fps and 8K 120fps raw footage. Features 16 stops of dynamic range, built-in motorized optical ND filters, and dual CFexpress Type B slots.',
    keyFeatures: [
      '12K Super35 CMOS Sensor with 16 Stops of true cinema dynamic range',
      'Internal 12-Bit RAW recording up to 12K at 60fps and 4K at 240fps slow-motion',
      'Motorized optical clear, 2, 4, and 6-stop IR ND filtration wheel',
      'Dual Native ISO (800 / 3200) for clean shadows in demanding low-light shoots',
      'Interchangeable PL/EF locking lens mount with electronic aperture communication'
    ],
    specs: {
      'Sensor Size': 'Super35 (27.03 x 14.25mm)',
      'Recording Formats': '12-bit RAW, 10-bit ProRes 422 HQ, Avid DNxHR',
      'Audio Inputs': '2x Locking Full-Size XLR with 48V Phantom Power',
      'Video Outputs': '12G-SDI, Full HDMI 2.1, Timecode BNC In/Out',
      'Storage Media': 'Dual CFexpress Type B + High-Speed USB-C External SSD Recording',
      'Weight': '1.82 kg (4.01 lbs body only)'
    },
    variants: {
      colors: ['Matte Magnesium Cine Black'],
      storage: ['Body Only', 'Cine Production Kit (+ 2x CFexpress & Rig)']
    },
    reviews: [
      {
        id: 'rev-401',
        author: 'Julian Thorne',
        rating: 5,
        date: 'October 05, 2026',
        title: 'Cinema commercial grade colors straight out of the box',
        content:
          'Highlight rolloff is smooth like 35mm celluloid. The internal motorized ND filters save 20 minutes on every outdoor shoot.',
        verified: true,
        helpfulCount: 38
      }
    ]
  },
  {
    id: 'volt-gaming-box',
    title: 'Aura Play One Next-Gen Gaming Console with Haptic Feedback Wireless Controller',
    shortTitle: 'Aura Play One Console',
    brand: 'Aura Interactive',
    category: 'gaming',
    categoryLabel: 'Gaming & Entertainment',
    price: 499.99,
    originalPrice: 549.99,
    rating: 4.9,
    reviewsCount: 5410,
    isPrime: true,
    isBestSeller: true,
    isAmazonChoice: true,
    inStock: true,
    stockCount: 16,
    image: '/src/assets/images/product_gaming_console_1793046603562.jpg',
    description:
      'Uncompromised 4K 120Hz console gaming engineered with custom RDNA3 graphics, hardware ray-tracing accelerators, 1TB high-speed PCIe 4.0 SSD, and liquid-metal acoustic chamber for whisper-quiet performance.',
    keyFeatures: [
      'Custom 8-Core Zen4 CPU + 36 Compute Unit RDNA3 GPU with 14.2 TFLOPs',
      'Native 4K rendering up to 120 FPS with Variable Refresh Rate (VRR) and HDR10+',
      'Ultra-fast 1TB NVMe SSD loading modern 80GB games in under 3.5 seconds',
      'Ergonomic Wireless Controller with dynamic haptic motors and dual-stage adaptive triggers',
      'Advanced 3D Spatial Audio processing engine supporting directional soundscapes'
    ],
    specs: {
      'CPU': 'Custom 8-Core / 16-Thread Zen 4 Architecture up to 3.8GHz',
      'GPU': 'Custom RDNA3 Architecture, 14.2 TFLOPS, Ray Tracing Cores',
      'Memory': '16GB GDDR6 Unified System RAM (560 GB/s bandwidth)',
      'Storage': '1TB Custom NVMe SSD (Expandable via standard M.2 slot)',
      'Video Output': 'HDMI 2.1 Supporting 4K@120Hz, 8K HDR, VRR, ALLM',
      'Acoustic Level': '<22 dB whisper-silent liquid metal cooling chamber'
    },
    variants: {
      colors: ['Obsidian Black & Amber LED', 'Cyber White & Ice Blue LED'],
      storage: ['1TB High-Speed SSD', '2TB High-Speed SSD (+$99)']
    },
    reviews: [
      {
        id: 'rev-501',
        author: 'Travis G.',
        rating: 5,
        date: 'October 24, 2026',
        title: 'Zero load times and the haptics are unbelievable',
        content:
          'Coming from last generation, the silence of this machine alone is worth it. Playing RPGs with haptic rain droplets vibrating in your palms is next level.',
        verified: true,
        helpfulCount: 210
      }
    ]
  }
];

export const CATEGORIES = [
  { id: 'all', name: 'All Electronics', count: 5 },
  { id: 'audio', name: 'Audio & Acoustics', count: 1 },
  { id: 'computing', name: 'Laptops & Computing', count: 1 },
  { id: 'wearables', name: 'Smart Wearables', count: 1 },
  { id: 'cameras', name: 'Cameras & Optics', count: 1 },
  { id: 'gaming', name: 'Gaming & VR', count: 1 }
];

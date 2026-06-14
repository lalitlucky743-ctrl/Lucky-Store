import { Product } from './types';

export const CATEGORIES = [
  {
    name: 'Apparel',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3pVjL52g1ePa-PJwkUTrJhvN06xT3AhUS57DBZ5kH67JdbVX5hvb77Q9PMW29Bbyw74rGhc4I7CqWEUSijCzcU9yvmRiDDlYqBsPTl2W4dyqZDFD2sMEg_9u_Q0BvrESRdexFPhER4OXymSnZzK99dBiHswXuWf4UcVeI7Beqdd7nmE4GyL9z186hU1hJbCqr5TWzYx1dXVE7pggAMAsaSyhEltPvvKSULWW6M9T2W7fLIbTeen7aHemULkrwODLhWBUxh7WA7rw'
  },
  {
    name: 'Tech',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCqCpagxBeoqfqERhJk0BehQaLAYdTXArLsVmLyg8-akytcz1lPAu_4VmKppRkTjVHXxsEL32kOwkycMn0D7iK3q9weGqd91g1wZJwXtc0CKXA8tKOGZyfE-sSVp_DolPwyqYq3uG7VudbAy3VhmDehzKFMWCvIRPXW2AkK7A-FsrjN6xNY76cAEpQOLUZtUEHszepmMqiqRV6yhkFa7NAsj7oAYgwd42BLL9BgipQqlvtZf8MJLFff4dnd0FupVcHdNNOhyN0Kx7I'
  },
  {
    name: 'Home',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBnuH6DsFzAc27VoB1BE_9puGbyb1mfQePZSSI7kdW5oMUWrGh6-Fq0y4RUYb-PozGplD_1fZvHUkkM2XNhyntKVz6CIQ2NC3V0HjkVT0lfiz1B3PgieyDds2uc6hBJ975x5NHg-L2563W3VJcDvGiVI3KsP0T7vp207YmayklBxH5BuZc6eAbdibTZ6K-b6gV-9izpl6jnOCN4ZzQMshvUglRf7kloHlOjBxuIxlVdKK_YQe5tGXH6ZXf2l2_sUCPOIVP-k-qJlkk'
  },
  {
    name: 'Beauty',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCr8h4EH5zRegM9DTxhqngeYstQYRs6oejhD01ZkSVPQYNLWxR0S7S43o7iy7POOFB_pLNoaniAfTpSwqM2Rg_MT8DhsYVsATGhe3MLnCf1g6vZHsWNRXlCPnZZQPr2RGx4mlokiThe7XF6g-R1iqBnMnnFTW6azo1VnSYTY0rr9DhccBPB-kE0Aw9vJgG8fBY5YDuEdzMnbkBMgzBYjj8DN0Q06dnENgC0D2jaRIGYehMbH8cRlrxg1oxUyqKL9Z2YNXk0BUdWK00'
  }
] as const;

export const PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Essential Wool Coat',
    price: 189.00,
    originalPrice: 240.00,
    category: 'Apparel',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuConSBCTXtUpQ-_vVGkq4aa-ucdO7hkjqS0tHy6lf0X7lOYe1W26Sn02Yw-m1RSmSfSUFAcSQSqmAiMMYuxJ9oDw7eWTTWgtcW0XewkjlcNVPYYf3uDbf1SR5EP4AveRe_bc5gPZ1YiO8Ld6tDCw7SEys9EtODyYQkj3_G9UzX_d4xoUvpX0HWiJvkt1lk6XV9S9HjHuxdl2W7wkzT7JywcrwIL0znL3wg5ed8SA0-cocbDbzzbLDiQsVPkHiDy7Rr7vKqKuyfSGcs',
    rating: 4.8,
    reviewsCount: 124,
    description: 'A masterpiece of contemporary outerwear tailoring, crafted from luxurious premium virgin wool. Its soft, unstructured shoulder silhouette offers a perfect smart-casual look suitable for any season. Features a hidden double-breasted placket, minimalist side-seam pockets, and a clean interior lining.',
    features: [
      '80% Extra-fine Virgin Wool, 20% Organic Cotton blend',
      'Unstructured drape for premium comfortable fit',
      'Minimalist storm-flap collar detailing',
      'Designed in Barcelona, hand-tailored ethically'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Slate Blue', hex: '#3b5266' },
      { name: 'Warm Charcoal', hex: '#21262d' },
      { name: 'Soft Oak', hex: '#bc9c80' }
    ],
    isNewArrival: true
  },
  {
    id: 'prod-2',
    name: 'Velocity Runners',
    price: 120.00,
    category: 'Apparel',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBZ6SUKiA_5KHL1vXl0Qa_AvhbIPZGtSWEM7E4aF-8S4jOaJQ48q9wtFg4_9EXuf8E2H_Arf2dp-7hbNCDtBjBqF0OEYQ_Y2hxstoQ5wayOLE_rx80f6SP-BHnGEZPkGPGQzQYz-pS3oiz1wRVFvQNgLwckA1gojrcftPSv5ytFUVwu62QxHDVML-VZ_JovUROnKKKWShbJF8f867UPBHSR2rr3VP_OLq6RJJwi1NXFtg646cfi5TZkjiM7aW78CXyjQc18poNyuR0',
    rating: 4.9,
    reviewsCount: 382,
    description: 'Vibrant red performance running shoes displayed on a clean white pedestal in a minimalist fitness boutique setting. High-key lighting emphasizes the sleek contours and technical materials.',
    features: [
      'Breathable engineered Primeknit mesh upper',
      'Reactive responsive foam midsole with energy return',
      'Anatomically contoured arch support system',
      'High-traction decoupled rubber soles'
    ],
    sizes: ['7', '8', '9', '10', '11', '12'],
    colors: [
      { name: 'Active Crimson', hex: '#dc2626' },
      { name: 'Stealth White', hex: '#f8fafc' },
      { name: 'Core Black', hex: '#0f172a' }
    ]
  },
  {
    id: 'prod-3',
    name: 'Series X Smartwatch',
    price: 299.00,
    category: 'Tech',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCAx5mvrc3m9PQCagNxtqlI6o31eg6HNgkceESF0Pe8hPmAYhtGD_rfa_2FvCg481rMKQDQ7CBQQJaV9of6NxpskzWqUQdl3Lel5cK4jIg3qcUoj8gDK6n-Jxwz4TyXqeTfCg4KRIHz-DL87cy85d48oP55c6T5_YzK2aL0NkHuURKyEL4qsSRhTTc5JxEyW3rwh0O5wcBQe3OPrC9_Bq0_LX9kVvrElkD7mxz2LJxTBTfYNylVwg0TVRPHSDv07DZL0_u502lJnvY',
    rating: 4.7,
    reviewsCount: 94,
    description: 'A minimalist high-tech smartwatch with a white silicone strap resting on a light gray architectural surface. Soft, indirect lighting creates subtle shadows that define the watch’s circular face. The image communicates a sense of modern simplicity.',
    features: [
      'Always-on AMOLED display with anti-reflective glass',
      '7-day active battery life with magnetic charging',
      'Biometric health sensors tracking oxygen, heart rate, and sleep quality',
      'Pristine sand-blasted matte titanium finish'
    ],
    colors: [
      { name: 'Alabaster White', hex: '#f1f5f9' },
      { name: 'Titanium Gray', hex: '#64748b' }
    ]
  },
  {
    id: 'prod-4',
    name: 'Artisan Frames',
    price: 155.00,
    category: 'Apparel',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD_rPTIk0nxQexruxFXmIsITQ6MeaEArYr0GK0n5ioDsNyCdcZUdBjiZWG8jatciiyHra-7l06fjZ3Id4oufTse7621LGQZpHol7Q7oWOaOr8uPZg7hKvKKVZIEhlMs1jeMCq0VnQ1wIasWgkuTCAfB5qC6K8HD5c_db8TvFI1RHigjHraGqHXKJtcOR3gHJobZsOYTslLjbgRSIaxLCL80y4O6zmlwP64v8oJcj2lP013kcmymQCsKeG6VNLT40ZHLArt1A9fQ0JE',
    rating: 4.6,
    reviewsCount: 78,
    description: 'A pair of designer sunglasses with tortoiseshell frames placed on an open art book. The setting is a sun-drenched minimalist living room with warm, golden hour lighting.',
    features: [
      'Authentic biodegradable Italian acetate frames',
      '100% UV Protection filter lenses',
      'Reinforced Japanese 5-barrel hinges',
      'Comes with handcrafted full-grain leather sleeve'
    ],
    colors: [
      { name: 'Tortoiseshell Brown', hex: '#7c2d12' },
      { name: 'Crystal Gray', hex: '#cbd5e1' }
    ]
  },
  // Additional Premium Soft-Minimalist Items
  {
    id: 'prod-5',
    name: 'Studio Wireless Headphones',
    price: 249.00,
    category: 'Tech',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCqCpagxBeoqfqERhJk0BehQaLAYdTXArLsVmLyg8-akytcz1lPAu_4VmKppRkTjVHXxsEL32kOwkycMn0D7iK3q9weGqd91g1wZJwXtc0CKXA8tKOGZyfE-sSVp_DolPwyqYq3uG7VudbAy3VhmDehzKFMWCvIRPXW2AkK7A-FsrjN6xNY76cAEpQOLUZtUEHszepmMqiqRV6yhkFa7NAsj7oAYgwd42BLL9BgipQqlvtZf8MJLFff4dnd0FupVcHdNNOhyN0Kx7I',
    rating: 4.9,
    reviewsCount: 215,
    description: 'Precision acoustics meets raw physical comfort. Handcrafted with memory-foam ear cushions wrapped in ultra-soft protein leather. Featuring dual hybrid Active Noise Cancelling.',
    features: [
      'Hybrid active noise reduction up to 40dB',
      'Custom tuned 40mm beryllium drivers',
      'High-res audio wireless transmission codec support',
      'Ambient transparency mode'
    ],
    colors: [
      { name: 'Soft Gray', hex: '#e2e8f0' },
      { name: 'Obsidian Black', hex: '#1e293b' }
    ],
    isNewArrival: true
  },
  {
    id: 'prod-6',
    name: 'Organic Linen Shirt Set',
    price: 85.00,
    originalPrice: 110.00,
    category: 'Apparel',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3pVjL52g1ePa-PJwkUTrJhvN06xT3AhUS57DBZ5kH67JdbVX5hvb77Q9PMW29Bbyw74rGhc4I7CqWEUSijCzcU9yvmRiDDlYqBsPTl2W4dyqZDFD2sMEg_9u_Q0BvrESRdexFPhER4OXymSnZzK99dBiHswXuWf4UcVeI7Beqdd7nmE4GyL9z186hU1hJbCqr5TWzYx1dXVE7pggAMAsaSyhEltPvvKSULWW6M9T2W7fLIbTeen7aHemULkrwODLhWBUxh7WA7rw',
    rating: 4.7,
    reviewsCount: 88,
    description: 'Luxurious set of casual breathable organic linen. Delivers perfect heat dissipation during high summer heat and classic relaxed elegance lines.',
    features: [
      '100% Certified Organic Belgian flax linen',
      'Pre-washed with gentle natural enzymes for supreme softness',
      'Regular casual drape fit with raw-shell buttons',
      'Breathable, moisture-wicking and hypo-allergenic'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Parchment Oak', hex: '#e4d2bf' },
      { name: 'Bleached Linen', hex: '#fbfbfb' }
    ]
  },
  {
    id: 'prod-7',
    name: 'Ethereal Ceramic Vase',
    price: 65.00,
    category: 'Home',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBnuH6DsFzAc27VoB1BE_9puGbyb1mfQePZSSI7kdW5oMUWrGh6-Fq0y4RUYb-PozGplD_1fZvHUkkM2XNhyntKVz6CIQ2NC3V0HjkVT0lfiz1B3PgieyDds2uc6hBJ975x5NHg-L2563W3VJcDvGiVI3KsP0T7vp207YmayklBxH5BuZc6eAbdibTZ6K-b6gV-9izpl6jnOCN4ZzQMshvUglRf7kloHlOjBxuIxlVdKK_YQe5tGXH6ZXf2l2_sUCPOIVP-k-qJlkk',
    rating: 4.8,
    reviewsCount: 54,
    description: 'A minimalist hand-thrown structural ceramic vase with an elegant matte glaze finish. Designed to celebrate empty negative space with organic beauty.',
    features: [
      'Handmade stoneware with a raw textured touch',
      'Minimalist neck calibrated for delicate dry botanicals',
      'Earth-conscious clay processing methods',
      'Designed by ceramicists in Copenhagen'
    ]
  },
  {
    id: 'prod-8',
    name: 'Opaline Skincare Ritual',
    price: 135.00,
    originalPrice: 160.00,
    category: 'Beauty',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCr8h4EH5zRegM9DTxhqngeYstQYRs6oejhD01ZkSVPQYNLWxR0S7S43o7iy7POOFB_pLNoaniAfTpSwqM2Rg_MT8DhsYVsATGhe3MLnCf1g6vZHsWNRXlCPnZZQPr2RGx4mlokiThe7XF6g-R1iqBnMnnFTW6azo1VnSYTY0rr9DhccBPB-kE0Aw9vJgG8fBY5YDuEdzMnbkBMgzBYjj8DN0Q06dnENgC0D2jaRIGYehMbH8cRlrxg1oxUyqKL9Z2YNXk0BUdWK00',
    rating: 4.9,
    reviewsCount: 198,
    description: 'A clinical skin recovery regimen designed to lock in essential minerals. Formulated without synthetic fragrance or fillers for the ultimate clean glow.',
    features: [
      'Includes active Restoring Cleanser, Hydrating Mist, and Elixir',
      'Purity-level testing guarantees zero toxin exposure',
      'Biodegradable frosted glass vessel with airless pump',
      'Highly concentrated squalane and clean ceramide base'
    ]
  }
];

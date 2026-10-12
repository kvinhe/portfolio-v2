export const categories = [
  { key: 'robotics', label: 'Robotics' },
  { key: 'software', label: 'Software' },
];

export const projects = [
  {
    slug: 'robotic-arm',
    category: 'robotics',
    title: 'Robotic Arm',
    dates: 'Sep 2026 — Present',
    blurb: 'A 4-DOF robotic arm that interacts with your phone.',
    meta: ['C++', 'ESP32-S3', 'ROS 2', 'MuJoCo', 'OpenCV', 'Python'],
    bullets: null,
    sections: [
      {
        eyebrow: 'Building',
        title: 'Assembling the robotic arm',
        clips: [
          {
            src: '/videos/robot-arm/assembly-bench.mp4',
            poster: '/images/robot-arm/assembly-bench.jpg',
            title: 'pt. 1',
            caption: 'Assembling the arm',
          },
          {
            src: '/videos/robot-arm/assembly-together.mp4',
            poster: '/images/robot-arm/assembly-together.jpg',
            title: 'pt. 2',
            caption: 'Continuing assembly',
          },
          {
            src: '/videos/robot-arm/wiring-bus.mp4',
            poster: '/images/robot-arm/wiring-bus.jpg',
            title: 'pt. 3',
            caption: 'Robotic arm moves for the first time',
          },
        ],
      },
      {
        eyebrow: 'Debugging',
        title: 'Fixing the setup',
        clips: [
          {
            src: '/videos/robot-arm/touch-problem.mp4',
            poster: '/images/robot-arm/touch-problem.jpg',
            title: 'The problem',
            caption: 'Touches were not being registered on the phone',
          },
          {
            src: '/videos/robot-arm/wiring.mp4',
            poster: '/images/robot-arm/wiring.jpg',
            title: 'The fix',
            caption: 'Taping a wire to the tip of the stylus',
          },
        ],
      },
    ],
    links: [],
  },
  {
    slug: 'esp32-lyrics-display',
    category: 'robotics',
    title: 'Lyrics Display',
    dates: 'Sep 2026',
    blurb: 'Time-synced lyrics for whatever is playing on the host machine, on a 128×64 I2C OLED.',
    meta: ['C++', 'PlatformIO', 'I2C', 'USB serial'],
    bullets: [
      'The host rasterises each screen with a real Windows font and ships a 1024-byte framebuffer; the firmware draws no text, which is what makes Chinese, Japanese, Korean and Cyrillic render at all.',
      'An onboard RGB LED encodes bus and link state — no OLED on I2C, frames stalled, frames arriving — so the board is debuggable without a serial terminal.',
      'No Spotify API, no OAuth, no keys: it reads the OS media session and pulls timestamped .lrc files.',
    ],
    links: [],
  },

  {
    slug: 'clove',
    logo: '/images/logos/clove-logo.png',
    category: 'software',
    title: 'Clove — TreeHacks (Stanford Hackathon)',
    dates: 'Feb 2026',
    blurb: "Built at TreeHacks, Stanford's hackathon.",
    // TODO (Kevin): what Clove does, and what you built. One paragraph is plenty.
    links: [{ label: 'Devpost', href: 'https://devpost.com/software/clove-ga6v5p' }],
  },
  {
    slug: 'stacy',
    logo: '/images/logos/stacy.png',
    category: 'software',
    title: 'Stacy — Hack The North Winner',
    dates: 'Sep 2025',
    blurb: 'Won Best Voice Assistant at Hack The North.',
    // TODO (Kevin): what Stacy does, and which part was yours.
    links: [{ label: 'Devpost', href: 'https://devpost.com/software/stacy-g7zptj' }],
  },
  {
    slug: 'zenos',
    logo: '/images/logos/zenos_logo.png',
    category: 'software',
    title: 'ZenOS — BagelHacks Winner',
    dates: 'Mar 2025',
    blurb: 'Won BagelHacks.',
    // TODO (Kevin): what ZenOS does.
    youtube: 'https://www.youtube.com/embed/3vmHrCJ-nJs',
    links: [
      {
        label: 'Demo video',
        href: 'https://www.youtube.com/watch?v=3vmHrCJ-nJs',
      },
    ],
  },
  {
    slug: 'pickyeats',
    logo: '/images/logos/pickyeats_logo.jpg',
    category: 'software',
    title: 'PickyEats — 10k+ downloads',
    dates: '2024 — 2025',
    blurb: 'A restaurant recommender app, launched on the App Store and Google Play.',
    meta: ['React Native', 'Expo', 'Flask', 'PostgreSQL', 'Firebase', 'AWS'],
    bullets: [
      'Launched to 12,000+ downloads across the App Store and Google Play Store.',
      'Partnered with RestoMontreal.ca to integrate a catalog of 10,000+ restaurants across Quebec.',
    ],
    links: [{ label: 'Website', href: 'https://picky-eats.vercel.app/' }],
  },
  {
    slug: 'cheri',
    logo: '/images/logos/cherimtl_logo.jpg',
    category: 'software',
    title: 'Chéri',
    dates: 'Sep 2024',
    blurb: '',
    // TODO (Kevin): what Chéri is — this one has no description anywhere yet.
    links: [{ label: 'Website', href: 'https://www.cherimtl.com/' }],
  },
];

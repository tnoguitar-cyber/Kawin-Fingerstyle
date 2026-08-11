import { Album, Course, Product, ConcertDate, ArtistGear, Track, PopularVideo, FreeTabItem, Achievement, Article } from '../types';

export const POPULAR_VIDEOS: PopularVideo[] = [
  {
    id: 'pv-1',
    title: 'Kawin Fingerstyle - Official Popular Performance (YouTube)',
    platform: 'youtube',
    url: 'https://youtu.be/E8fXKTbTrwU',
    embedId: 'E8fXKTbTrwU',
    thumbnailUrl: 'https://img.youtube.com/vi/E8fXKTbTrwU/hqdefault.jpg',
    tag: '🔥 Popular Video',
  },
  {
    id: 'pv-2',
    title: 'Kawin Fingerstyle - Acoustic Arrangement (YouTube)',
    platform: 'youtube',
    url: 'https://youtu.be/eEDXEy4OCZA',
    embedId: 'eEDXEy4OCZA',
    thumbnailUrl: 'https://img.youtube.com/vi/eEDXEy4OCZA/hqdefault.jpg',
    tag: '🎵 Official Video',
  },
  {
    id: 'pv-3',
    title: 'Kawin Fingerstyle - Acoustic Fingerstyle Cover (TikTok)',
    platform: 'tiktok',
    url: 'https://vt.tiktok.com/ZS4A3RnW1/',
    thumbnailUrl: 'https://lh3.googleusercontent.com/d/1HRPpGDCQqp2FCLl92u-D4eEHuNIHxO0f',
    tag: '⚡ TikTok Clip',
  },
  {
    id: 'pv-4',
    title: 'Kawin Fingerstyle - Acoustic Lick & Solo Performance (TikTok)',
    platform: 'tiktok',
    url: 'https://vt.tiktok.com/ZS4A3dNcQ/',
    thumbnailUrl: 'https://lh3.googleusercontent.com/d/1HRPpGDCQqp2FCLl92u-D4eEHuNIHxO0f',
    tag: '⚡ TikTok Clip',
  },
  {
    id: 'pv-5',
    title: 'Kawin - The Cloud',
    platform: 'youtube',
    url: 'https://youtu.be/eoqQCUt_GQs',
    embedId: 'eoqQCUt_GQs',
    thumbnailUrl: 'https://img.youtube.com/vi/eoqQCUt_GQs/hqdefault.jpg',
    tag: '☁️ Official Single',
  },
  {
    id: 'pv-6',
    title: 'Kawin - ฤดูฝนที่แล้ว (Last Rainy Season)',
    platform: 'youtube',
    url: 'https://youtu.be/UmOLbarq-xA',
    embedId: 'UmOLbarq-xA',
    thumbnailUrl: 'https://img.youtube.com/vi/UmOLbarq-xA/hqdefault.jpg',
    tag: '🌧️ Official Single',
  },
  {
    id: 'pv-7',
    title: 'April - Kawin',
    platform: 'youtube',
    url: 'https://youtu.be/VT2thQmsyf0',
    embedId: 'VT2thQmsyf0',
    thumbnailUrl: 'https://img.youtube.com/vi/VT2thQmsyf0/hqdefault.jpg',
    tag: '🍃 Official Single',
  },
];

export const ARTIST_INFO = {
  name: 'KAWIN PHUSRITHET',
  realName: 'กวิน (Kawin Fingerstyle)',
  stageName: 'Kawin Fingerstyle',
  profileImageUrl: 'https://lh3.googleusercontent.com/d/1kLdj7Vlv3tvSqgtgjf7TNemz90cRR4DR',
  bio: 'มือกีตาร์ Fingerstyle อะคูสติก ผู้สร้างสรรค์ผลงานเพลงบรรเลง ถ่ายทอดอารมณ์ความรู้สึกอันประณีตผ่านสายกีตาร์ acoustic',
  shortTagline: 'บรรเลงความรู้สึก... ผ่านเสียงกีตาร์อะคูสติก Kawin Fingerstyle',
  lineId: '@535pcjno',
  lineOaUrl: 'https://lin.ee/yJTzmGpK',
  email: 'tnofingergt@gmail.com',
  storeUrl: 'http://happyhome-music.lnwshop.com/',
  storeName: 'HappyHome Music',
  socials: {
    spotify: 'https://open.spotify.com/artist/30XG3SaQCced73MWX3zfm3',
    appleMusic: 'https://music.apple.com/th/artist/kawin-phusrithet/1709237335?l=th',
    youtube: 'https://www.youtube.com/@KawinFingerstyle',
    tiktok: 'https://www.tiktok.com/@kawinfingerstyle?_r=1&_t=ZS-98YBdt2bHEL',
    facebook: 'https://www.facebook.com/share/1LZyVYScrE/?mibextid=wwXIfr',
    instagram: 'https://www.instagram.com/kawin_phusrithet?igsh=MmRqcHdpcXZzaXZn&utm_source=qr',
    lineOa: 'https://lin.ee/yJTzmGpK',
    email: 'mailto:tnofingergt@gmail.com',
  },
  featuredQuote: 'ทุกท่วงทำนองกีตาร์ คือภาษาใจที่สื่อถึงความทรงจำที่อบอุ่นที่สุด',
};

export const CHILL_GROOVE_BAND = {
  name: 'Chill Groove',
  youtubeUrl: 'https://www.youtube.com/@chillgroove-th',
  tagline: 'วงโฟร์คซอง Acoustic Folk Band สำหรับงานแต่งงาน งานอีเวนต์ และงานแสดงดนตรีบรรยากาศอบอุ่น',
  rates: [
    {
      id: 'rate-1',
      title: 'รูปแบบที่ 1 (Duo Folk)',
      lineup: '🎸 กีตาร์โปร่งไฟฟ้า + 🎤 นักร้องหญิง',
      priceLocal: '5,000฿',
      priceOutstation: '6,000฿',
      notes: '**ไม่รวมค่าน้ำมัน, ที่พัก',
      badge: 'ยอดนิยมสำหรับงานแต่งอบอุ่น',
    },
    {
      id: 'rate-2',
      title: 'รูปแบบที่ 2 (Trio Folk + Saxophone)',
      lineup: '🎸 กีตาร์โปร่งไฟฟ้า + 🎤 นักร้องหญิง + 🎷 แซกโซโฟน',
      priceLocal: '6,000฿',
      priceOutstation: '7,500฿',
      notes: '**ไม่รวมค่าน้ำมัน, ที่พัก',
      badge: 'เพิ่มความโรแมนติกหวานละมุน',
    },
    {
      id: 'rate-3',
      title: 'รูปแบบที่ 3 (Trio Folk + Pad Drum)',
      lineup: '🎸 กีตาร์โปร่งไฟฟ้า + 🎤 นักร้องหญิง + 🥁 กลองไฟฟ้า Pad drum',
      priceLocal: '6,000฿',
      priceOutstation: '7,500฿',
      notes: '**ไม่รวมค่าน้ำมัน, ที่พัก',
      badge: 'เพิ่มจังหวะความสนุกสนาน',
    },
  ],
};

export const ARTIST_ACHIEVEMENTS: Achievement[] = [
  {
    year: '2025',
    title: 'Korat Guitar Festival 2025 (Artist & Jury)',
    category: 'Artist & Jury',
    imageUrl: 'https://lh3.googleusercontent.com/d/1lTHeuhkYsKV0KyfBo3CWVphQNgA1x9u2',
    caption: 'ภาพบรรยากาศงาน Korat Guitar Festival 2025 ในฐานะ ศิลปิน และ คณะกรรมการตัดสิน (Artist & Jury)',
  },
  {
    year: '2024',
    title: 'Artist & Jury Thailand International Guitar Festival Fingerstyle Guitar Competition',
    category: 'Artist & Jury',
    imageUrl: 'https://lh3.googleusercontent.com/d/1TlaiQrjqXy4a6lxT3bNYBP0p-dJ6d5Zu',
    caption: 'Thailand International Guitar Festival 2024 - Fingerstyle Guitar Competition (Artist & Jury)',
  },
  {
    year: '2023',
    title: '(Artist OPENING ACT) Tommy Emmanuel CGP LIVE IN BANGKOK @M THEATRE',
    category: 'Concert Opening Act',
    imageUrl: 'https://lh3.googleusercontent.com/d/1KJPs66y5JKyUDKQ6wQSyHKVS6EwXFw-p',
    caption: 'Opening Act performance for Tommy Emmanuel CGP LIVE IN BANGKOK @ M Theatre',
  },
  {
    year: '2023',
    title: 'FINALIST NATASHA INTERNATIONAL FINGERSTYLE COMPETITION',
    category: 'International Finalist',
    imageUrl: 'https://lh3.googleusercontent.com/d/1IQOqLdOKpCC8O0SYhMidOUc75QUxei9X',
    caption: 'Finalist - Natasha International Fingerstyle Competition',
  },
  {
    year: '2022',
    title: 'Artist & Jury Phitsanuloke Classical Music Challenge (Fingerstyle Guitar)',
    category: 'Artist & Jury',
    imageUrl: 'https://lh3.googleusercontent.com/d/1NETuEMFN9YrQ9JHMvnGOIIQ8Btsy1ZCP',
    caption: 'ศิลปินและคณะกรรมการตัดสินการประกวด - Phitsanuloke Classical Music Challenge (Fingerstyle Guitar)',
  },
  {
    year: '2021',
    title: 'Endorser of Mayson Guitar (Thailand)',
    category: 'Brand Endorser',
    imageUrl: 'https://lh3.googleusercontent.com/d/1oGvhxItgh51hM4KV47hsee1rUpGfM5FP',
    caption: 'Official Brand Endorser for Mayson Guitars Thailand',
  },
  {
    year: '2020',
    title: '1ST Place Overdrive Acoustic Guitar Contest 2',
    category: 'Contest Winner',
    imageUrl: 'https://lh3.googleusercontent.com/d/1CjNyH8spdEn41MeIhJVFUnFFxRHSWwFf',
    caption: 'ชนะเลิศอันดับ 1 - Overdrive Acoustic Guitar Contest ครั้งที่ 2',
  },
  {
    year: '2019',
    title: '1ST Place CRAFTER GUITAR CONTEST',
    category: 'Contest Winner',
    imageUrl: 'https://lh3.googleusercontent.com/d/1SxDZwNdjLyxBO8yze6B0jGwuN9aZejQT',
    caption: 'ชนะเลิศอันดับ 1 - CRAFTER GUITAR CONTEST',
  },
  {
    year: '2018',
    title: 'Endorser of Rotosound Strings',
    category: 'Brand Endorser',
    imageUrl: 'https://lh3.googleusercontent.com/d/15DWOCaf0oPbVmhlKMpmYrdeb-pWOiIbn',
    caption: 'Official Endorser for Rotosound Strings',
  },
  {
    year: '2017',
    title: 'Composed Music (Run in Space) 6x10 : 10 fingerstyle Thai Guitarists With Their 6 String Guitars (Baichasong Record)',
    category: 'Music Composition & Record',
    imageUrl: 'https://lh3.googleusercontent.com/d/1MSIT3bvXM_F-j0fFv92QbUshI5h6TCJK',
    caption: 'ประพันธ์เพลง (Run in Space) ในโปรเจกต์ 6x10 สังกัด ใบชาซอง (Baichasong Record)',
  },
  {
    year: '2017',
    title: 'The Final 5 Finalists Overdrive Acoustic Guitar Contest NO.1',
    category: 'Contest Finalist',
    imageUrl: 'https://lh3.googleusercontent.com/d/10fnDfafdCcy-NBsR6gO7x74cudBqPFFn',
    caption: 'เข้ารอบ 5 คนสุดท้ายการประกวด Overdrive Acoustic Guitar Contest ครั้งที่ 1',
  },
  {
    year: '2017',
    title: '1ST Place Thailand Isan Guitar Festival Guitar Non Classic Solo (Fingerstyle)',
    category: 'Contest Winner',
    imageUrl: 'https://lh3.googleusercontent.com/d/1Xa6ym3cNSXsPE1cYgOaA-_tIkbkU3UgE',
    caption: 'ชนะเลิศอันดับ 1 - Thailand Isan Guitar Festival ประเภทกีตาร์ทั่วไป Solo (Fingerstyle)',
  },
  {
    year: '2009',
    title: 'Outstanding Honor Award National classical guitar competition Yamaha Thailand Institute',
    category: 'National Honor Award',
    imageUrl: 'https://lh3.googleusercontent.com/d/1djxE9IAUTLQvmIdEvBYvDQHBATV0itNj',
    caption: 'รางวัลเกียรติยศดีเด่น การประกวดกีตาร์คลาสสิกระดับประเทศ สถาบันดนตรียามาฮ่า (ประเทศไทย)',
  },
  {
    year: '2008',
    title: '1ST Place Northern Classical Guitar Competition Yamaha Thailand Institute',
    category: 'Regional Winner',
    imageUrl: 'https://lh3.googleusercontent.com/d/1djxE9IAUTLQvmIdEvBYvDQHBATV0itNj',
    caption: 'ชนะเลิศอันดับ 1 - Northern Classical Guitar Competition สถาบันดนตรียามาฮ่า (ประเทศไทย)',
  },
];

export const TRACKS: Track[] = [
  {
    id: 'tr-1',
    title: 'Kawin - The Cloud',
    thaiTitle: 'The Cloud (เดอะ คลาวด์)',
    albumId: 'alb-1',
    albumTitle: 'Kawin Official Tracks',
    duration: '03:42',
    releaseYear: 2024,
    tuning: 'Standard (EADGBE)',
    key: 'D Major',
    youtubeUrl: 'https://youtu.be/eoqQCUt_GQs',
    youtubeEmbedId: 'eoqQCUt_GQs',
    thumbnailUrl: 'https://img.youtube.com/vi/eoqQCUt_GQs/hqdefault.jpg',
    plays: 185000,
    synthNotes: [
      { time: 0.0, string: 6, fret: 0, duration: 1.2, technique: 'pluck' },
      { time: 0.2, string: 3, fret: 2, duration: 0.8, technique: 'pluck' },
      { time: 0.4, string: 2, fret: 0, duration: 0.8, technique: 'pluck' },
      { time: 0.6, string: 1, fret: 0, duration: 1.0, technique: 'pluck' },
      { time: 0.8, string: 4, fret: 0, duration: 0.8, technique: 'slap' },
      { time: 1.0, string: 2, fret: 2, duration: 0.8, technique: 'hammer' },
      { time: 1.2, string: 1, fret: 4, duration: 1.5, technique: 'harmonic' },
    ],
  },
  {
    id: 'tr-2',
    title: 'Kawin - ฤดูฝนที่แล้ว (Last Rainy Season)',
    thaiTitle: 'ฤดูฝนที่แล้ว (Last Rainy Season)',
    albumId: 'alb-1',
    albumTitle: 'Kawin Official Tracks',
    duration: '04:15',
    releaseYear: 2024,
    tuning: 'Standard (EADGBE)',
    key: 'G Major',
    youtubeUrl: 'https://youtu.be/UmOLbarq-xA',
    youtubeEmbedId: 'UmOLbarq-xA',
    thumbnailUrl: 'https://img.youtube.com/vi/UmOLbarq-xA/hqdefault.jpg',
    plays: 240000,
    synthNotes: [
      { time: 0.0, string: 6, fret: 3, duration: 1.2, technique: 'pluck' },
      { time: 0.3, string: 3, fret: 0, duration: 0.8, technique: 'pluck' },
      { time: 0.6, string: 2, fret: 1, duration: 0.8, technique: 'pluck' },
      { time: 0.9, string: 1, fret: 3, duration: 1.2, technique: 'pluck' },
    ],
  },
  {
    id: 'tr-3',
    title: 'April - Kawin',
    thaiTitle: 'April (เมษายน)',
    albumId: 'alb-1',
    albumTitle: 'Kawin Official Tracks',
    duration: '03:50',
    releaseYear: 2024,
    tuning: 'Standard (EADGBE)',
    key: 'A Major',
    youtubeUrl: 'https://youtu.be/VT2thQmsyf0',
    youtubeEmbedId: 'VT2thQmsyf0',
    thumbnailUrl: 'https://img.youtube.com/vi/VT2thQmsyf0/hqdefault.jpg',
    plays: 198000,
    synthNotes: [
      { time: 0.0, string: 5, fret: 0, duration: 1.5, technique: 'pluck' },
      { time: 0.2, string: 3, fret: 2, duration: 0.8, technique: 'pluck' },
      { time: 0.4, string: 2, fret: 2, duration: 0.8, technique: 'pluck' },
      { time: 0.6, string: 1, fret: 0, duration: 1.5, technique: 'harmonic' },
    ],
  },
];

export const COURSES: Course[] = [

  {
    id: 'course-vip-premium',
    title: 'VIP PREMIUM PLAN - Kawin Fingerstyle Studio',
    thaiTitle: 'สมาชิก VIP PREMIUM PLAN - Kawin Fingerstyle Studio',
    subtitle: 'ปลดล็อกขีดจำกัด เข้าถึงทุกฟังก์ชันและทุกคอร์สเรียนแบบไม่จำกัด',
    level: 'ทุกระดับ (All Levels)',
    durationHours: 999, // Unlimted
    totalLessons: 999, // Unlimited
    price: 5900,
    discountPrice: 2990,
    coverUrl: 'https://lh3.googleusercontent.com/d/1_ElhCAr8j-XcA5pqESusrtZ02CxDXvf2',
    description: 'ปลดล็อกขีดจำกัดด้วยสมาชิก VIP PREMIUM PLAN เข้าชมวิดีโอบทเรียนครบทุกคอร์ส ไม่จำกัดชั่วโมง พร้อมฟังก์ชันครบครันสำหรับนักกีตาร์',
    syllabus: [
      {
        sectionTitle: 'ฟังก์ชันและสิทธิพิเศษ (VIP PREMIUM PLAN)',
        lessons: [
          { id: 'v1', title: 'Unlimited Courses: เข้าชมวิดีโอบทเรียนครบทุกคอร์ส ไม่จำกัดชั่วโมง', duration: 'Unlimited', isFreePreview: true },
          { id: 'v2', title: 'Interactive Tabs: ระบบชีตแท็บเคลื่อนไหว ขยับตามเสียงซ้อมจริง', duration: 'Feature' },
          { id: 'v3', title: 'Exercise Playbook: แบบฝึกหัดเตรียมพร้อมสำหรับทุกเทคนิค', duration: 'Feature' },
          { id: 'v4', title: '50+ Ear Games & Ear Training Game: ฝึกวิชาสดผ่านระบบเกมที่เข้มข้นที่สุด', duration: 'Feature' },
          { id: 'v5', title: 'Jam Studio & Metronome Pro', duration: 'Feature' },
          { id: 'v6', title: 'Chord Analysis & Functional Harmony', duration: 'Feature' },
          { id: 'v7', title: 'คลังคอร์ดมหาศาล Chord Database 1000+', duration: 'Feature' },
          { id: 'v8', title: 'คลังสเกลกีตาร์ โหมด และ Special Lick Fingerstyle Technique', duration: 'Feature' },
          { id: 'v9', title: 'Guitar Tunner 3 mode Guitar, Chromatic, Polytune', duration: 'Feature' },
          { id: 'v10', title: 'คลังทฤษฎีดนตรีสากลครอบคลุมความรู้ในทุกมิติ', duration: 'Feature' },
          { id: 'v11', title: '💬 คลังความรู้ & คำแนะนำเทคนิค Fingerstyle', duration: 'Feature' },
          { id: 'v12', title: 'Digital Booklet: คู่มือประกอบการเรียนแบบดิจิทัล', duration: 'Feature' },
        ],
      }
    ],
    features: [
      'Unlimited Courses: เข้าชมวิดีโอบทเรียนครบทุกคอร์ส ไม่จำกัดชั่วโมง',
      'Interactive Tabs: ระบบชีตแท็บเคลื่อนไหว ขยับตามเสียงซ้อมจริง',
      '50+ Ear Games: ฝึกวิชาสดผ่านระบบเกมที่เข้มข้นที่สุด',
      'Digital Booklet: คู่มือประกอบการเรียนแบบดิจิทัล',
      'Exercise Playbook & Ear Training Game',
      'Jam Studio & Metronome Pro',
      'Chord Analysis & Functional Harmony',
      'คลังคอร์ดมหาศาล Chord Database 1000+',
      'คลังสเกลกีตาร์ โหมด และ Special Lick Fingerstyle Technique',
      'Guitar Tunner 3 mode Guitar, Chromatic, Polytune',
      'คลังทฤษฎีดนตรีสากลครอบคลุมความรู้ในทุกมิติ',
      '💬 คลังความรู้ & คำแนะนำเทคนิค Fingerstyle'
    ],
    rating: 5.0,
    reviewsCount: 520,
    studentCount: 2340,
    includesTabBook: true,
    badge: '👑 VIP PREMIUM PLAN',
    youtubeVideoUrl: 'https://youtu.be/uFSOEGSJKUc',
    youtubeEmbedUrl: 'https://www.youtube.com/embed/uFSOEGSJKUc',
  },

  {
    id: 'course-private-online',
    title: 'Kawin Fingerstyle Private Online Course',
    thaiTitle: 'คอร์สเรียนสด Online - Private Fingerstyle (4 ชม.)',
    subtitle: 'เรียนสด • วิธีการ • แนวคิด เรียบเรียงทุกเพลงเป็น Fingerstyle ถ่ายทอดเทคนิคทั้งหมดและการแต่งเพลงในสไตล์ของคุณ',
    level: 'เรียนสด Online (Private)',
    durationHours: 4,
    totalLessons: 4,
    price: 2600,
    coverUrl: ARTIST_INFO.profileImageUrl,
    description: 'เรียนสด Online สำหรับผู้ที่สนใจต่อยอดพัฒนาการเล่นกีตาร์แนวบรรเลง Fingerstyle ถ่ายทอดทุกอย่างในแนวทางการเรียบเรียง การแต่งเพลงฟิงเกอร์สไตล์ และเทคนิคของผมทั้งหมด หลังครบ ชม.เรียน สามารถส่ง VDO การบ้านและปรึกษาตรงกับผมได้ตลอดครับ',
    syllabus: [
      {
        sectionTitle: 'หัวข้อการเรียนสด (4 ชั่วโมงเต็ม)',
        lessons: [
          { id: 'p1', title: 'ปูพื้นฐานและระบบความคิดการจัดทางคอร์ดบรรเลง Fingerstyle', duration: '60 นาที' },
          { id: 'p3', title: 'แนวทางการแต่งเพลง และการเรียบเรียงเพลงป๊อปให้เป็น Fingerstyle ในสไตล์ของคุณ', duration: '60 นาที' },
          { id: 'p4', title: 'วิเคราะห์บทเพลงจริง และรับโจทย์ฝึกฝนส่วนบุคคล', duration: '60 นาที' },
          { id: 'p5', title: 'เช็กการซ้อม แนะนำแนวคิดการเรียบเรียง และปรับปรุงแก้ไขเทคนิคต่างๆ ในการเล่น', duration: '60 นาที' },
        ],
      },
    ],
    features: [
      'เรียนสด Private Online ตัวต่อตัว 4 ชั่วโมงเต็ม',
      'หลังครบ ชม.เรียน สามารถส่ง VDO การบ้านและปรึกษาตรงกับ Kawin ได้ตลอด',
      'สอนระบบความคิดการเรียบเรียงเพลง Fingerstyle ในสไตล์ของคุณเอง',
      'เรียนผ่าน Google Meet, LINE Video Call หรือ Skype',
      'สนใจเรียน / สอบถาม LINE ID: @535pcjno',
    ],
    rating: 5.0,
    reviewsCount: 240,
    studentCount: 520,
    badge: '🔥 คอร์สเรียนสด Online (Private)',
  },

  {
    id: 'course-chordscale-master',
    title: 'ChordScale Master - Guitar Practice Web App',
    thaiTitle: 'ChordScale Master - เครื่องมือฝึกซ้อมกีตาร์อัจฉริยะ',
    subtitle: 'เครื่องมือฝึกซ้อมกีตาร์ คลังคอร์ด สเกล และระบบบันทึกประวัติชั่วโมงฝึกซ้อมแบบ Interactive',
    level: 'เครื่องมือฝึกซ้อมกีตาร์',
    durationHours: 999,
    totalLessons: 1,
    price: 390,
    discountPrice: 199,
    coverUrl: 'https://lh3.googleusercontent.com/d/15aG72NFAZ4-7X1HXYfSuVHcUbvcT-07e',
    description: '🎸 ChordScale Master เครื่องมือฝึกซ้อมกีตาร์อัจฉริยะ ซ้อมกีตาร์อย่างมีเป้าหมาย ด้วยเครื่องมือฝึกซ้อมอัจฉริยะสำหรับนักดนตรี หากคุณกำลังมองหาระบบที่จะช่วยจัดระเบียบการฝึกซ้อมกีตาร์ให้มีทิศทาง พัฒนาฝีมือได้รวดเร็วและเห็นภาพชัดเจนที่สุด... เว็บไซต์นี้ถูกออกแบบมาเพื่อสิ่งนั้นครับ:',
    externalUrl: 'https://chord-scale-master.vercel.app/',
    youtubeVideoUrl: 'https://youtube.com/shorts/z805slX9QmY?feature=share',
    youtubeEmbedUrl: 'https://www.youtube.com/embed/z805slX9QmY',
    syllabus: [
      {
        sectionTitle: 'ฟังก์ชันเครื่องมือฝึกซ้อมกีตาร์ (ChordScale Master)',
        lessons: [
          { id: 'cs1', title: 'คลังคอร์ดสมบูรณ์แบบ: ค้นหาคอร์ด จับนิ้วถูกต้อง แม่นยำ สวยงาม', duration: 'Feature', isFreePreview: true },
          { id: 'cs2', title: 'สำรวจสเกลอัจฉริยะ: ค้นพบและจำลองโน้ตบนคอกีตาร์ได้อย่างละเอียด', duration: 'Feature' },
          { id: 'cs3', title: 'รักษาวินัยการฝึก: บันทึกประวัติชั่วโมงฝึกซ้อม', duration: 'Feature' },
        ],
      },
    ],
    features: [
      'เครื่องมือฝึกซ้อมกีตาร์แบบ Web App ไม่ต้องติดตั้งแอปพลิเคชัน',
      'คลังคอร์ดสมบูรณ์แบบ: ค้นหาคอร์ด จับนิ้วถูกต้อง แม่นยำ',
      'สำรวจสเกลอัจฉริยะ: ค้นพบและจำลองโน้ตบนคอกีตาร์แบบ Interactive',
      'รักษาวินัยการฝึก: ระบบบันทึกประวัติชั่วโมงฝึกซ้อมส่วนบุคคล',
    ],
    rating: 5.0,
    reviewsCount: 320,
    studentCount: 1450,
    badge: '🎸 เครื่องมือฝึกซ้อมกีตาร์',
  },
];

export const PRODUCTS: Product[] = [
  {
    id: 'prod-ebook-vol1',
    name: 'Vol.1 Fingerstyle Shortcut The Essential Foundations - Kawin Fingerstyle Studio',
    thaiName: 'Vol.1 Fingerstyle Shortcut The Essential Foundations',
    category: 'E-Book & หนังสือ TAB (E-Books & Tab Books)',
    price: 199,
    originalPrice: 350,
    imageUrl: 'https://lh3.googleusercontent.com/d/1PWoHAtgTJUJWIg1GQSkEzKl9IhDF24Gb',
    badge: '🔥 ลดพิเศษ 199฿ (จาก 350฿) เฉพาะ 50 ท่านแรก',
    description: `📖 รายละเอียด E-Book: Fingerstyle Shortcut Volume 1: Foundations

• 🎸 5 บทเรียนพื้นฐาน วางรากฐานการเล่น Fingerstyle อย่างเป็นระบบ
• 🎼 เน้นพื้นฐาน การแยกประสาทนิ้ว การเดินเบส และการควบคุมมือขวา
• 📑 Standard 6-Line TAB รูปแบบมาตรฐาน อ่านง่าย
• 🖨️ จัดรูปแบบสำหรับ พิมพ์ A4
• 🔊 Interactive Audio Simulator สำหรับเปิดฟังเสียงตัวอย่างประกอบการฝึก
• 💻 รูปแบบ Interactive E-Book สามารถเรียนและฝึกตามเนื้อหาได้

เหมาะสำหรับ: ผู้เริ่มต้น Fingerstyle และผู้ที่ต้องการจัดระบบพื้นฐานการฝึกให้ถูกต้อง
รูปแบบ: E-Book • A4 • Standard TAB • Interactive Audio`,
    inStock: true,
    rating: 5.0,
    reviewsCount: 50,
    specifications: [
      '🎸 5 บทเรียนพื้นฐาน วางรากฐานการเล่น Fingerstyle อย่างเป็นระบบ',
      '🎼 เน้นพื้นฐาน การแยกประสาทนิ้ว การเดินเบส และการควบคุมมือขวา',
      '📑 Standard 6-Line TAB รูปแบบมาตรฐาน อ่านง่าย',
      '🖨️ จัดรูปแบบสำหรับ พิมพ์ A4',
      '🔊 Interactive Audio Simulator สำหรับเปิดฟังเสียงตัวอย่างประกอบการฝึก',
      '💻 รูปแบบ Interactive E-Book สามารถเรียนและฝึกตามเนื้อหาได้',
      '🎯 เหมาะสำหรับ: ผู้เริ่มต้น Fingerstyle และผู้ที่ต้องการจัดระบบพื้นฐานการฝึกให้ถูกต้อง',
      '📄 รูปแบบ: E-Book • A4 • Standard TAB • Interactive Audio'
    ],
    details: [
      '🎸 5 บทเรียนพื้นฐาน วางรากฐานการเล่น Fingerstyle อย่างเป็นระบบ',
      '🎼 เน้นพื้นฐาน การแยกประสาทนิ้ว การเดินเบส และการควบคุมมือขวา',
      '📑 Standard 6-Line TAB รูปแบบมาตรฐาน อ่านง่าย',
      '🖨️ จัดรูปแบบสำหรับ พิมพ์ A4',
      '🔊 Interactive Audio Simulator สำหรับเปิดฟังเสียงตัวอย่างประกอบการฝึก',
      '💻 รูปแบบ Interactive E-Book สามารถเรียนและฝึกตามเนื้อหาได้',
      '🎯 เหมาะสำหรับ: ผู้เริ่มต้น Fingerstyle และผู้ที่ต้องการจัดระบบพื้นฐานการฝึกให้ถูกต้อง',
      '📄 รูปแบบ: E-Book • A4 • Standard TAB • Interactive Audio'
    ]
  }
];

export const ARTIST_GEARS: ArtistGear[] = [
  {
    name: 'Acoustic Guitar',
    category: 'Acoustic Guitar',
    spec: 'Top: Master Grade Sitka Spruce | Back/Sides: Rosewood',
    description: 'Kirati Guitar K-SJ\nFurch S23 CR\nMayson Mayfair',
    items: [
      {
        name: 'Kirati Guitar K-SJ',
        url: 'https://www.facebook.com/share/19QSq4oZhM/?mibextid=wwXIfr',
        badge: 'Facebook'
      },
      { name: 'Furch S23 CR' },
      { name: 'Mayson Mayfair' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Acoustic Guitar Pickup System',
    category: 'Guitar Pickup',
    spec: 'Dual Source Pickup',
    description: 'K&K Quantum Trinity',
    items: [
      { name: 'K&K Quantum Trinity' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
  },
];

export const FREE_TABS: FreeTabItem[] = [
  {
    id: 'free-tab-1',
    title: 'หลงกล - หิน เหล็ก ไฟ (Intro TAB - 2 ไลน์)',
    fileName: 'หลงกล - หิน เหล็ก ไฟ (Intro TAB).pdf',
    driveUrl: 'https://drive.google.com/drive/folders/1fltMqlPkQAdc-jnfW2nfX5pMcVkvwuxT?usp=drive_link',
    youtubeUrl: 'https://youtube.com/shorts/8aEdDbWNVFw?feature=share',
    badge: '🔥 Rock Ballad',
    description: 'โน้ตและแท็บกีตาร์ช่วงอินโทร (Intro) เพลงหลงกล ของวง หิน เหล็ก ไฟ แบบเรียบเรียง 2 ไลน์ประสาน เล่นง่ายเสียงเต็มอิ่ม',
    difficulty: 'ปานกลาง (Intermediate)',
    tuning: 'Standard (E A D G B E)',
    capo: 'No Capo',
  },
  {
    id: 'free-tab-2',
    title: 'ลอยกระทง - Loy Krathong (Boom Chick Technique)',
    fileName: 'ลอยกระทง - Loy Krathong.pdf',
    driveUrl: 'https://drive.google.com/drive/folders/11PexQX5KU07drqYSLHz50oV0Y93DtvYt?usp=drive_link',
    youtubeUrl: 'https://youtu.be/05jvhSle7Gc',
    badge: '✨ Boom Chick',
    description: 'โน้ตและแท็บกีตาร์เพลง ลอยกระทง ฝึกฝนด้วยเทคนิคยอดนิยม Boom Chick Technique จังหวะกระชับสนุกสนาน ความยากระดับปานกลาง ตั้งสายปกติ',
    difficulty: 'ปานกลาง (Intermediate)',
    tuning: 'Standard (E A D G B E)',
    capo: 'No Capo',
  },
];

export const CONCERT_DATES: ConcertDate[] = [
  {
    id: 'concert-1',
    date: '15 พ.ย. 2026',
    city: 'นครราชสีมา (Korat)',
    venue: 'Korat Guitar Festival 2026',
    eventTitle: 'Solo Recital & Masterclass',
    ticketStatus: 'เปิดขายบัตร',
  },
  {
    id: 'concert-2',
    date: '28 ธ.ค. 2026',
    city: 'กรุงเทพฯ (Bangkok)',
    venue: 'Thailand International Guitar Festival',
    eventTitle: 'Opening Special Guest Performance',
    ticketStatus: 'เหลือน้อย',
  },
  {
    id: 'concert-3',
    date: '14 ม.ค. 2027',
    city: 'พิษณุโลก (Phitsanuloke)',
    venue: 'Classical Music Challenge Gala Concert',
    eventTitle: 'Feature Acoustic Session',
    ticketStatus: 'เข้าชมฟรี',
  }
];

export const ARTICLES: Article[] = [
  {
    id: 'art-1',
    title: 'บทความที่ 1: พื้นฐานการใช้นิ้วมือขวา (PIMA) และ Travis Picking',
    shortTitle: 'พื้นฐานการใช้นิ้วมือขวา (PIMA) & Travis Picking',
    coverUrl: 'https://lh3.googleusercontent.com/d/1AgIz8eoTGBybcWqjXGNqe-QhIuc1-JTo',
    category: 'พื้นฐาน Fingerstyle',
    readTime: '5 นาที',
    publishedDate: '10 ส.ค. 2026',
    author: 'Kawin Fingerstyle',
    excerpt: 'การเล่น Fingerstyle ให้ไพเราะไม่ได้ขึ้นอยู่กับพรสวรรค์ แต่เริ่มจากการวางพื้นฐานการใช้นิ้วมือขวาให้ถูกต้อง เพื่อให้เสียงใส นิ่ง และต่อยอดในระดับสูงได้ง่าย',
    sections: [
      {
        heading: 'ระบบ PIMA คืออะไร?',
        body: 'ในทางสากล กีตาร์คลาสสิกและ Fingerstyle จะใช้ตัวอักษรย่อภาษาสเปนแทนแต่ละนิ้วของมือขวา ดังนี้:',
        list: [
          'p (Thumb - นิ้วโป้ง): รับหน้าที่ดูแลสายเบส (สาย 4, 5 และ 6)',
          'i (Index - นิ้วชี้): รับหน้าที่ดูแลสาย 3 (เสียงกลาง-แหลม)',
          'm (Middle - นิ้วกลาง): รับหน้าที่ดูแลสาย 2 (เสียงกลาง-แหลม)',
          'a (Ring - นิ้วนาง): รับหน้าที่ดูแลสาย 1 (เสียงแหลม)',
        ],
      },
      {
        heading: 'วางมืออย่างไรให้ไม่เกร็ง',
        list: [
          'งอนิ้วเล็กน้อย: รักษารูปมือให้อยู่ในลักษณะผ่อนคลาย คล้ายกำลูกบอลลูกเล็กๆ',
          'ดีดจากโคนนิ้ว: ออกแรงจากข้อต่อโคนนิ้ว ไม่ใช่งอเฉพาะปลายนิ้ว เพื่อให้ได้พลังเสียงที่หนาและสม่ำเสมอ',
          'ผ่อนคลาย: ข้อมือและแขนต้องไม่เกร็ง',
          'ควบคุมน้ำหนัก: บาลานซ์น้ำหนักการดีดของแต่ละนิ้วให้พอดี',
        ],
      },
      {
        heading: 'รูปแบบพื้นฐาน Travis Picking (Pattern ตัวอย่าง)',
        body: 'แพตเทิร์น Travis Picking คือการเล่นสลับระหว่างสายเบสและสายเมโลดี้ สร้างจังหวะแบบ "Boom - Chick"',
        list: [
          'Boom (เบส): นิ้วโป้ง (p) ดีดสายเบส (เช่น สาย 5 หรือ 6)',
          'Chick (เมโลดี้): นิ้วชี้ (i), นิ้วกลาง (m) หรือ นิ้วนาง (a) ดีดสายกลาง-แหลม (เช่น สาย 3, 2, 1) สลับกันไปตามจังหวะ',
        ],
      },
      {
        heading: '5 ขั้นตอนการฝึกสำหรับมือใหม่',
        list: [
          '1. ฝึก Pattern พื้นฐานให้คล่อง: เริ่มฝึกดีดแพตเทิร์นช้าๆ ที่ความเร็ว 60 BPM',
          '2. เปลี่ยนคอร์ดง่ายๆ: ลองใช้แพตเทิร์นเดิมกับคอร์ดเบสิก เช่น C, Am, F, G',
          '3. ควบคุมเสียงเบสให้แน่น: นิ้วโป้งต้องดีดใกล้ๆ โคนสาย เพื่อให้ได้เสียงเบสที่กังวาน',
          '4. รักษาจังหวะให้คงที่: เปิด Metronome (เครื่องให้จังหวะ) ช่วยฝึกเสมอ',
          '5. ฟังและปรับปรุง: อัดเสียงตัวเองขณะฝึกเพื่อฟังจุดที่ต้องแก้ไข',
        ],
      },
    ],
    keyTakeaway: 'Key Takeaway: ความสม่ำเสมอสำคัญกว่าความเก่ง ฝึกวันละนิด ทำทุกวัน เสียงจะไพเราะและพัฒนาขึ้นอย่างแน่นอน',
  },
  {
    id: 'art-2',
    title: 'บทความที่ 2: แก้ปัญหาดีดแล้ว "สะดุด" พร้อมแบบฝึกหัด 4 Exercise',
    shortTitle: 'แก้ปัญหานิ้วสะดุด + แบบฝึกหัด 4 Exercise',
    coverUrl: 'https://lh3.googleusercontent.com/d/1GlTTnWn4wmIchzzs843j8Sy9QksKjyPV',
    category: 'เทคนิค & แบบฝึกหัด',
    readTime: '6 นาที',
    publishedDate: '10 ส.ค. 2026',
    author: 'Kawin Fingerstyle',
    excerpt: 'หลายคนที่ฝึกดีดกีตาร์มักเจอภาวะมือขวาสะดุด นิ้วพันกัน สาเหตุหลักไม่ได้มาจากความช้า แต่เกิดจาก "การใช้นิ้วผิดลำดับ" และไม่มีหน้าที่ประจำของแต่ละนิ้ว',
    sections: [
      {
        heading: 'เทคนิคสำคัญเพื่อแก้ปัญหานิ้วสะดุด',
        list: [
          'อย่าฝืนใช้นิ้ว: ใช้นิ้วประจำสายตามหลัก PIMA ให้เป็นธรรมชาติ (p=เบส, i=สาย 3, m=สาย 2, a=สาย 1)',
          'เล่นช้าๆ ให้สะอาด: ไม่ต้องรีบ ให้เน้นความชัดเจนของโน้ตทุกตัว',
          'ฟังเสียงทุกตัวโน้ต: ตรวจสอบว่ามีเสียงพร่าหรือเสียงดับหรือไม่',
        ],
      },
      {
        heading: 'ตารางฝึกประจำวัน (Daily Exercise)',
        body: 'ฝึกที่ความเร็ว 60 BPM ช้าๆ วนไปรอบละ 20 รอบ:',
        exercises: [
          {
            title: 'Exercise 1 (ฝึกไล่นิ้วพื้นฐาน)',
            strings: 'สาย: 6 ➔ 3 ➔ 2 ➔ 1',
            fingers: 'นิ้ว: p ➔ i ➔ m ➔ a',
          },
          {
            title: 'Exercise 2 (ฝึกแยกเบสกับเมโลดี้)',
            strings: 'สาย: 6 ➔ 3 ➔ 5 ➔ 2',
            fingers: 'นิ้ว: p ➔ i ➔ p ➔ m',
          },
          {
            title: 'Exercise 3 (ฝึกเปลี่ยนสายเบสแต่คงชุดนิ้ว)',
            strings: 'สาย: 6➔3➔2➔1 | 5➔3➔2➔1 | 4➔3➔2➔1',
            fingers: 'นิ้ว: p ➔ i ➔ m ➔ a (เปลี่ยนเฉพาะสายเบส)',
          },
          {
            title: 'Exercise 4 (ฝึกแบบย้อนกลับ)',
            strings: 'สาย: 1 ➔ 2 ➔ 3 ➔ 6',
            fingers: 'นิ้ว: a ➔ m ➔ i ➔ p',
          },
        ],
      },
      {
        heading: 'Challenge เพิ่มความชำนาญ',
        body: 'เมื่อฝึก Exercise 1–4 ที่ 60 BPM ได้ต่อเนื่องโดยไม่หยุด ไม่มองมือขวาแล้ว ให้ค่อยๆ ขยับความเร็วขึ้นเป็น 70 BPM (ใช้เวลาฝึกเพียงวันละ 15 นาที)',
      },
    ],
  },
  {
    id: 'art-3',
    title: 'บทความที่ 3: จังหวะ (Timing) หัวใจสำคัญของความไพเราะ',
    shortTitle: 'จังหวะ (Timing) หัวใจสำคัญของความไพเราะ',
    coverUrl: 'https://lh3.googleusercontent.com/d/1IPc0FX1B8y3X8imVz1PeuC_j7JJ7pvNj',
    category: 'การฝึกจังหวะ (Timing)',
    readTime: '4 นาที',
    publishedDate: '10 ส.ค. 2026',
    author: 'Kawin Fingerstyle',
    excerpt: 'กูรู Fingerstyle มักเน้นย้ำว่า "เล่นเร็ว = เล่นเก่ง" เป็นความเข้าใจผิด นักกีตาร์ที่เล่นเพราะ คือคนที่ควบคุมจังหวะและน้ำหนักเสียงได้นิ่ง',
    sections: [
      {
        heading: 'กฎเหล็กเรื่องจังหวะ',
        list: [
          'ช้าได้ แต่ต้องถูกต้อง: การเล่นช้าช่วยให้สมองและนิ้วสร้างความจำกล้ามเนื้อ (Muscle Memory)',
          'รีบไม่ได้: การรีบเพิ่มความเร็วทั้งที่ยังดีดไม่ชัด จะทำให้ติดนิสัยเล่นสะดุด',
        ],
      },
      {
        heading: 'วิธีฝึกควบคุมจังหวะด้วย คอร์ด C',
        list: [
          'ตั้งเครื่อง Metronome: เริ่มต้นที่ 60 BPM',
          'นับจังหวะ 1 - 2 - 3 - 4: กดคอร์ด C แล้วดีดลงทุกจังหวะตก (1, 2, 3, 4) วนซ้ำ 20 รอบ',
          'จุดโฟกัส: ทุกสายต้องเสียงสะอาด ชัดเจน และดังเท่ากันทุกโน้ต',
          'การต่อยอด: เมื่อเล่นนิ่งและสะอาดแล้ว จึงค่อยๆ เพิ่มความเร็วทีละ 5 BPM',
        ],
      },
    ],
  },
  {
    id: 'art-4',
    title: 'บทความที่ 4: เติมมิติและอารมณ์ให้การเล่น (Dynamic & Expression)',
    shortTitle: 'เติมมิติและอารมณ์ให้การเล่น (Dynamic & Expression)',
    coverUrl: 'https://lh3.googleusercontent.com/d/10Ebn22Z7MlvzW4uRf2gzf1LJhiYZPeIH',
    category: 'การถ่ายทอดอารมณ์',
    readTime: '5 นาที',
    publishedDate: '10 ส.ค. 2026',
    author: 'Kawin Fingerstyle',
    excerpt: 'เมื่อเล่นคอร์ดและจังหวะได้ถูกต้องแล้ว ขั้นถัดไปของการเล่น Fingerstyle คือการเปลี่ยนโน้ตดนตรีธรรมดาให้มี "ชีวิตและอารมณ์"',
    sections: [
      {
        heading: '4 เทคนิคเพิ่มมิติแบบมืออาชีพ',
        list: [
          '1. Dynamics (น้ำหนัก ดัง-เบา): ไม่ดีดเสียงระดับเดียวตลอดทั้งเพลง ฝึกเล่นท่อนที่ต้องการอารมณ์ผ่อนคลายให้เบาลง และเน้นเสียงดังในท่อนสำคัญ',
          '2. Timing (ความนิ่ง): จังหวะนิ่งแต่ต้องไม่แข็งกระด้าง ล็อกจังหวะด้วย Metronome',
          '3. Melody Voice (เน้นเสียงร้อง/เมโลดี้): ใน Fingerstyle นิ้วจะเล่นทั้งเบสและเมโลดี้พร้อมกัน ต้องดีดสายที่เป็นเสียงร้อง (Melody) ให้เด่นชัดกว่าสายเบสและสายคอร์ดประกอบ',
          '4. Tone & Color (เทคนิคสร้างสีสันเสียง): ดึงเทคนิคพิเศษมาผสมผสาน เช่น Harmonics (สร้างเสียงกังวานคล้ายระฆัง), Slap (การเคาะสายสร้างจังหวะ), Palm Mute (การอุดสายด้วยฝ่ามือให้เสียงสั้นทุ้ม)',
        ],
      },
      {
        heading: 'ขั้นตอนฝึกเล่นให้มีมิติ',
        list: [
          'เลือกร้องหรือพึมพำแนวเมโลดี้ไปพร้อมกับการเล่น',
          'บันทึกเสียง/วิดีโอ การเล่นของตนเอง แล้วนำมาเปิดฟังเพื่อหาจุดที่ต้องเพิ่มน้ำหนัก',
          'ฝึกจากเพลงที่ชอบทีละท่อนอย่างพิถีพิถัน เน้นคุณภาพไม่ใช่ปริมาณ',
        ],
      },
    ],
  },
  {
    id: 'art-5',
    title: 'บทความที่ 5: เริ่มฝึก Fingerpicking จากเพลงที่ชอบ (4 เพลงแนะนำ)',
    shortTitle: 'เริ่มฝึก Fingerpicking จากเพลงที่ชอบ (4 เพลงแนะนำ)',
    coverUrl: 'https://lh3.googleusercontent.com/d/1awTlf4Z9WwpvgWlY1Mm8TapR9MTxvbBY',
    category: 'เพลงฝึกสำหรับมือใหม่',
    readTime: '5 นาที',
    publishedDate: '10 ส.ค. 2026',
    author: 'Kawin Fingerstyle',
    excerpt: 'การซ้อมแบบฝึกหัดอย่างเดียวอาจทำให้เบื่อ วิธีการพัฒนาที่เร็วที่สุดคือการเลือก "เพลงที่คุ้นหู" มาเริ่มฝึกเกาสาย',
    sections: [
      {
        heading: 'ทำไมควรฝึกจากเพลงที่ชอบ?',
        list: [
          'เพลงที่คุ้นหูช่วยให้เราจับจังหวะและเมโลดี้ได้ง่ายขึ้นโดยสัญชาตญาณ',
          'ทำให้สนุก สนใจการฝึก และช่วยพัฒนาการแยกนิ้ว มือขวา-มือซ้าย ได้อย่างรวดเร็ว',
        ],
      },
      {
        heading: '4 เพลงเกาสายเพราะๆ เหมาะสำหรับเริ่มต้น',
        list: [
          '1. ตราบรุสลีดิน: เหมาะสำหรับฝึกการเดินสายเบสและการควบคุมจังหวะ ให้อารมณ์ซึ้งๆ',
          '2. ตลอดเวลา (พงษ์สิทธิ์ คำภีร์): แพตเทิร์นเกาสายติดหู จำง่าย ได้ฝึกบาลานซ์เบสและเมโลดี้',
          '3. Dust in the Wind (Kansas): ลายเกาสายสไตล์คลาสสิกในตำนาน เหมาะสำหรับฝึกแพตเทิร์น Fingerpicking แบบต่อเนื่อง',
          '4. Tears in Heaven (Eric Clapton): ทำนองเพราะลึกซึ้ง เหมาะมากสำหรับการฝึกแยกประสาทระหว่างสาย Bass + Melody',
        ],
      },
    ],
  },
  {
    id: 'art-6',
    title: 'บทความที่ 6: ทำไมเล่น Fingerstyle แล้ว “จังหวะไม่ลื่น?”: เข้าใจ Logic จังหวะ แก้ปัญหาดีดกระตุกให้พริ้วไหว',
    shortTitle: 'เข้าใจ Logic จังหวะ แก้ปัญหาดีดกระตุกให้พริ้วไหว',
    coverUrl: 'https://lh3.googleusercontent.com/d/1KISobolA0krQS4yRQTIy5J-W89iofPwL',
    category: 'วิเคราะห์จังหวะ & Logic',
    readTime: '7 นาที',
    publishedDate: '10 ส.ค. 2026',
    author: 'Kawin Fingerstyle',
    excerpt: 'เคยสงสัยไหมครับว่า ทำไมเราถึงจับคอร์ดได้ เปลี่ยนคอร์ดทัน แต่พอเล่น Fingerstyle เป็นเพลงแล้ว รู้สึกว่าจังหวะสะดุด ไม่ต่อเนื่อง หรือฟังดูแข็งๆ ไม่พริ้วไหว? สาเหตุหลักไม่ได้เกิดจากการขาดพรสวรรค์ แต่เป็นเพราะ “ยังไม่เข้าใจ Logic (ตรรกะ) ของจังหวะ”',
    sections: [
      {
        heading: '3 หัวใจสำคัญของจังหวะที่ลื่นไหล',
        body: 'การเล่น Fingerstyle ให้ลื่นไหล ไร้การสะดุด ต้องประกอบด้วยองค์ประกอบหลัก 3 ส่วนทำงานร่วมกัน:',
        list: [
          'มือซ้าย: จัดคอร์ดได้แม่นยำ ไม่ลังเล และเตรียมวางนิ้วล่วงหน้า',
          'มือขวา: วางนิ้วและดีดอย่างมีระบบ มีหน้าที่ประจำสายที่ชัดเจน',
          'ลมหายใจ: ผ่อนคลาย ไม่เกร็งร่างกายหรือกักลมหายใจขณะเล่น',
        ],
      },
      {
        heading: 'เข้าใจ Logic ของจังหวะ (3 ขั้นตอนง่ายๆ)',
        body: 'ในทางโครงสร้างดนตรี Fingerstyle ตัวโน้ตที่เกิดขึ้นพร้อมกันหรือคาบเกี่ยวกัน สามารถแบ่งการตกของจังหวะออกเป็น 3 รูปแบบพื้นฐาน:',
        list: [
          '1. Bass ก่อน Melody: เสียงเบสลงมาก่อน แล้วตามด้วยโน้ตทำนอง',
          '2. Melody ก่อน Bass: เสียงทำนองลงมาก่อน แล้วตามด้วยโน้ตเบส',
          '3. Melody พร้อม Bass: เสียงเบสและทำนองดีดพร้อมกันในจังหวะเดียวกัน (มักเป็นจังหวะตกสำคัญ)',
        ],
        quote: 'เมื่อเข้าใจโครงสร้างนี้ สมองและนิ้วจะเริ่มจัดลำดับการดีดได้อย่างเป็นระบบ ไม่สับสนว่าตัวไหนต้องออกแรงก่อนหรือหลัง',
      },
      {
        heading: 'การวางนิ้วมือขวาให้เป๊ะ (PIMA)',
        body: 'เพื่อให้ดีดได้แม่นยำโดยไม่ต้องมองมือขวา ให้ใช้วิธีล็อกหน้าที่ประจำสายตามหลักสากล:',
        list: [
          'p (นิ้วโป้ง): เล่นสายเบส (สาย 6, 5, 4)',
          'i (นิ้วชี้): เล่นสาย 3',
          'm (นิ้วกลาง): เล่นสาย 2',
          'a (นิ้วนาง): เล่นสาย 1',
        ],
      },
      {
        heading: 'Tips การวางนิ้ว',
        list: [
          'วางนิ้วใกล้สาย: อย่ายกนิ้วสูงเกินไป ให้ปลายนิ้วเตรียมพร้อมอยู่ใกล้สายเสมอ',
          'ดีดข้ามสายชัดเจน: แยกแรงดีดแต่ละนิ้วให้เป็นอิสระ',
          'ใช้แรงน้อยแต่แม่นยำ: ไม่ต้องดีดแรงจนสายตีกับเฟรต เน้นลงน้ำหนักให้สม่ำเสมอ',
        ],
      },
      {
        heading: '5 ขั้นตอนฝึกเปลี่ยนคอร์ดให้จังหวะลื่นไหล (เช่น G ➔ C)',
        list: [
          '1. หาจุดเชื่อมต่อ: ดูว่าจากคอร์ด G ไป C นิ้วไหนต้องย้ายก่อน (เช่น นิ้วที่กดสายเบส)',
          '2. วน Loop ช้าๆ: ฝึกเปลี่ยนคอร์ด G ไป C และ C กลับมา G วนซ้ำๆ ช้าๆ ให้คุ้นจังหวะ',
          '3. เช็กการวางนิ้วและการดีด: ตรวจสอบว่ามือขวาวางนิ้วถูกต้อง และมือซ้ายเปลี่ยนคอร์ดได้นิ่ง',
          '4. ขยายการซ้อม: ค่อยๆ เพิ่มความเร็วทีละน้อยด้วย Metronome',
          '5. ซ้อมทั้งท่อนเพลง: นำเทคนิคไปใช้กับทั้งท่อนจนเล่นได้อย่างเป็นธรรมชาติ',
        ],
      },
      {
        heading: 'วิธีฝึกให้จังหวะนิ่ง',
        list: [
          'ฝึกสม่ำเสมอ: ซ้อมวันละนิด ดีกว่าซ้อมหนักสัปดาห์ละครั้ง',
          'ใช้ Metronome: เปิดเครื่องให้จังหวะล็อกความเร็วไว้เสมอ',
          'เริ่มช้า เพิ่มเร็ว: เล่นช้าๆ ให้สะอาดก่อน แล้วค่อยๆ ขยับ BPM ขึ้น',
          'ฟังเยอะ เล่นเยอะ: ฟังเพลงต้นฉบับบ่อยๆ เพื่อให้จังหวะซึมซับเข้าไปในหัว',
        ],
      },
    ],
    keyTakeaway: 'จำไว้เสมอ: Fingerstyle ไม่จำเป็นต้องเล่นเร็ว แต่ต้อง “ลื่น” | การเล่นช้าแต่ควบคุมจังหวะได้ ดีกว่าเล่นเร็วแต่จังหวะยังไม่นิ่ง\n\nผลลัพธ์ที่คุณจะได้หลังจากการฝึก:\n• เสียงไพเราะ นุ่มนวล และลื่นไหล\n• เล่นเพลงยากๆ ได้ง่ายขึ้น เพราะพื้นฐานดี\n• มีความมั่นใจเวลาเล่นกีตาร์ต่อหน้าคนอื่นมากขึ้น',
  },
];


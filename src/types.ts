export interface PopularVideo {
  id: string;
  title: string;
  platform: 'youtube' | 'tiktok';
  url: string;
  embedId?: string;
  thumbnailUrl?: string;
  tag?: string;
  views?: string;
}

export interface Track {
  id: string;
  title: string;
  thaiTitle?: string;
  albumId: string;
  albumTitle: string;
  duration: string;
  releaseYear: number;
  tuning: string; // e.g., "Standard (EADGBE)"
  key: string;
  hasTab?: boolean;
  tabDifficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
  audioUrl?: string; // fallback audio
  synthNotes?: SynthNote[]; // notes for web audio player
  tabContent?: string; // ASCII / formatted TAB preview
  spotifyUrl?: string;
  appleMusicUrl?: string;
  youtubeUrl?: string;
  youtubeEmbedId?: string;
  tabExternalLink?: string;
  thumbnailUrl?: string;
  plays: number;
}

export interface SynthNote {
  time: number; // time in seconds or beats
  string: number; // 1 to 6 (1 = high E, 6 = low E)
  fret: number; // 0 to 20
  duration: number; // in seconds
  technique?: 'pluck' | 'slap' | 'harmonic' | 'hammer' | 'pull';
}

export interface Album {
  id: string;
  title: string;
  thaiTitle: string;
  releaseYear: number;
  coverUrl: string;
  description: string;
  spotifyUrl: string;
  appleUrl: string;
  tabLink?: string;
  tracks: Track[];
  genre: string;
}

export interface CourseLesson {
  id: string;
  title: string;
  duration: string;
  isFreePreview?: boolean;
}

export interface Course {
  id: string;
  title: string;
  thaiTitle: string;
  subtitle: string;
  level: 'มือใหม่ (Beginner)' | 'ปานกลาง (Intermediate)' | 'ขั้นสูง (Advanced)' | 'ทุกระดับ (All Levels)' | 'เรียนสด Online (Private)';
  durationHours: number;
  totalLessons: number;
  price: number;
  discountPrice?: number;
  coverUrl: string;
  description: string;
  syllabus: {
    sectionTitle: string;
    lessons: CourseLesson[];
  }[];
  features: string[];
  rating: number;
  reviewsCount: number;
  studentCount: number;
  includesTabBook?: boolean;
  badge?: string;
}

export interface Product {
  id: string;
  name: string;
  thaiName: string;
  category: 'คาโป้ & ปิ๊ก (Capo & Picks)' | 'สาย & อุปกรณ์ (Strings & Gear)' | 'สินค้าสะสม (Merch)' | 'หนังสือ TAB (Tab Books)' | 'เว็บแอป & คลังสเกล (Web App & Tools)';
  price: number;
  originalPrice?: number;
  imageUrl: string;
  description: string;
  inStock: boolean;
  rating: number;
  reviewsCount: number;
  specifications?: string[];
  details?: string[];
  badge?: string;
  externalUrl?: string;
}

export interface CartItem {
  id: string;
  type: 'product' | 'course';
  itemId: string;
  title: string;
  price: number;
  imageUrl: string;
  quantity: number;
  selectedOption?: string;
}

export interface ConcertDate {
  id: string;
  date: string;
  city: string;
  venue: string;
  eventTitle: string;
  ticketStatus: 'เปิดขายบัตร' | 'เหลือน้อย' | 'บัตรหมดแล้ว' | 'เข้าชมฟรี';
  ticketUrl?: string;
}

export interface GearItem {
  name: string;
  url?: string;
  badge?: string;
}

export interface ArtistGear {
  id?: string;
  name: string;
  category: string;
  spec: string;
  description: string;
  items?: GearItem[];
  imageUrl?: string;
  isPrimary?: boolean;
}

export interface InquiryMessage {
  id: string;
  name: string;
  phone: string;
  email: string;
  eventType: string;
  eventDate?: string;
  location?: string;
  notes?: string;
  createdAt: string;
  status: 'unread' | 'read' | 'replied';
}

export interface Achievement {
  year: string;
  title: string;
  category: string;
  imageUrl?: string;
  fbUrl?: string;
  caption?: string;
}

export interface FreeTabItem {
  id: string;
  title: string;
  fileName: string;
  driveUrl: string;
  youtubeUrl?: string;
  badge: string;
  description: string;
  difficulty: 'ง่าย (Beginner)' | 'ปานกลาง (Intermediate)' | 'ยาก (Advanced)';
  tuning: string;
  capo?: string;
}

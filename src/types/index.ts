export type Language = 'id' | 'en';

export interface Translation {
  id: string;
  en: string;
}

export interface Announcement {
  id: string;
  title: Translation;
  content: Translation;
  date: string;
  category: 'general' | 'academic' | 'event';
  pdfUrl?: string;
  createdAt: string;
}

export interface Article {
  id: string;
  title: Translation;
  excerpt: Translation;
  content: Translation;
  author: string;
  date: string;
  imageUrl?: string;
  createdAt: string;
}

export interface Publication {
  id: string;
  title: Translation;
  authors: string;
  journal: string;
  year: string;
  doi?: string;
  url?: string;
  createdAt?: string;
}

export interface MediaItem {
  id: string;
  title: Translation;
  type: 'image' | 'video' | 'document';
  url: string;
  thumbnailUrl?: string;
  date: string;
}

export interface Registration {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  institution?: string;
  program: string;
  documents: {
    name: string;
    url: string;
  }[];
  status: 'pending' | 'reviewed' | 'approved' | 'rejected';
  date?: string;
  createdAt?: string;
}

export interface UserProfile {
  uid: string;
  email: string;
  role: 'superadmin' | 'editor' | 'reviewer';
  displayName: string;
}

export interface SiteSettings {
  siteName: Translation;
  footerText: Translation;
  contactEmail: string;
  socialMedia: {
    instagram?: string;
    twitter?: string;
    facebook?: string;
  };
}

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { NavBar } from './components/NavBar';
import { SiteFooter } from './components/SiteFooter';
import { HomeView } from './views/HomeView';
import { AnnouncementsView } from './views/AnnouncementsView';
import { ArticlesView } from './views/ArticlesView';
import { RegisterView } from './views/RegisterView';
import { LoginView } from './views/LoginView';
import { AdminShell } from './views/admin/AdminShell';
import { DashboardView } from './views/admin/DashboardView';
import { AdminAnnouncements } from './views/admin/AdminAnnouncements';
import { AdminArticles } from './views/admin/AdminArticles';
import { AdminRegistrations } from './views/admin/AdminRegistrations';
import { AdminPublications } from './views/admin/AdminPublications';
import { AdminMedia } from './views/admin/AdminMedia';
import { AdminSettings } from './views/admin/AdminSettings';
import { PublicationsView } from './views/PublicationsView';
import { MediaView } from './views/MediaView';

// Public Layout Wrapper
const PublicLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col min-h-screen bg-white font-sans">
    <NavBar />
    <main className="flex-grow">
      {children}
    </main>
    <SiteFooter />
  </div>
);

export default function App() {
  return (
    <LanguageProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<PublicLayout><HomeView /></PublicLayout>} />
          <Route path="/announcements" element={<PublicLayout><AnnouncementsView /></PublicLayout>} />
          <Route path="/articles" element={<PublicLayout><ArticlesView /></PublicLayout>} />
          <Route path="/publications" element={<PublicLayout><PublicationsView /></PublicLayout>} />
          <Route path="/media" element={<PublicLayout><MediaView /></PublicLayout>} />
          <Route path="/register" element={<PublicLayout><RegisterView /></PublicLayout>} />
          <Route path="/login" element={<LoginView />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminShell />}>
            <Route index element={<DashboardView />} />
            <Route path="announcements" element={<AdminAnnouncements />} />
            <Route path="articles" element={<AdminArticles />} />
            <Route path="publications" element={<AdminPublications />} />
            <Route path="media" element={<AdminMedia />} />
            <Route path="registrations" element={<AdminRegistrations />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </LanguageProvider>
  );
}

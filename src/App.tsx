import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { useSiteI18n } from './i18n/useSiteI18n';
import { DeleteAccountPage } from './pages/DeleteAccountPage';
import { GuidelinesPage } from './pages/GuidelinesPage';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { PrivacyPage } from './pages/PrivacyPage';

function Layout() {
  const { t } = useSiteI18n();

  return (
    <>
      <a className="skip" href="#content">
        {t('skip')}
      </a>
      <Header />
      <main id="content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/community-guidelines" element={<GuidelinesPage />} />
          <Route path="/delete-account" element={<DeleteAccountPage />} />
          <Route path="/ru" element={<HomePage />} />
          <Route path="/ru/privacy" element={<PrivacyPage />} />
          <Route path="/ru/community-guidelines" element={<GuidelinesPage />} />
          <Route path="/ru/delete-account" element={<DeleteAccountPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

import { useState } from 'react';

import { useSiteI18n } from '../i18n/useSiteI18n';

const CONSENT_KEY = 'hive-cookie-consent';

type Consent = 'accepted' | 'rejected';

function readConsent(): Consent | null {
  try {
    const value = localStorage.getItem(CONSENT_KEY);
    return value === 'accepted' || value === 'rejected' ? value : null;
  } catch {
    return 'rejected';
  }
}

function storeConsent(value: Consent) {
  try {
    localStorage.setItem(CONSENT_KEY, value);
  } catch {
    /* Private mode should not block the page. */
  }
}

export function CookieConsent() {
  const { t } = useSiteI18n();
  const [consent, setConsent] = useState<Consent | null>(readConsent);

  if (consent) return null;

  function choose(value: Consent) {
    storeConsent(value);
    setConsent(value);
  }

  return (
    <div className="cookie-bar" role="dialog" aria-labelledby="cookie-title" aria-describedby="cookie-body">
      <div className="cookie-copy">
        <p id="cookie-title">{t('cookies.title')}</p>
        <p id="cookie-body">{t('cookies.body')}</p>
      </div>
      <div className="cookie-actions">
        <button type="button" className="button cookie-reject" onClick={() => choose('rejected')}>
          {t('cookies.reject')}
        </button>
        <button type="button" className="button" onClick={() => choose('accepted')}>
          {t('cookies.accept')}
        </button>
      </div>
    </div>
  );
}

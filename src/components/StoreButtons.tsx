import { useEffect, useId, useState } from 'react';
import type { MouseEvent } from 'react';
import QRCode from 'qrcode';

import { STORE_LINKS } from '../config/stores';
import { useSiteI18n } from '../i18n/useSiteI18n';

const STORE_BADGES = {
  appStore: '/illustrations/app%20store.png',
  googlePlay: '/illustrations/play%20market.png',
} as const;

type StoreId = keyof typeof STORE_LINKS;

function isPhone(): boolean {
  return /iPhone|iPod|Android.+Mobile|Windows Phone|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

type StoreQrDialogProps = {
  url: string;
  name: string;
  onClose: () => void;
};

function StoreQrDialog({ url, name, onClose }: StoreQrDialogProps) {
  const { t } = useSiteI18n();
  const titleId = useId();
  const [qrSrc, setQrSrc] = useState('');

  useEffect(() => {
    let cancelled = false;
    void QRCode.toDataURL(url, { margin: 1, width: 240 }).then((dataUrl) => {
      if (!cancelled) setQrSrc(dataUrl);
    });
    return () => {
      cancelled = true;
    };
  }, [url]);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose();
    }
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  return (
    <div className="qr-overlay" onClick={onClose}>
      <div
        className="qr-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(event) => event.stopPropagation()}
      >
        <h2 id={titleId}>{t('stores.qrTitle', { store: name })}</h2>
        <p>{t('stores.qrBody')}</p>
        {qrSrc ? <img className="qr-code" src={qrSrc} alt="" /> : null}
        <button type="button" className="button" onClick={onClose} autoFocus>
          {t('stores.close')}
        </button>
      </div>
    </div>
  );
}

export function StoreButtons() {
  const { t } = useSiteI18n();
  const [openStore, setOpenStore] = useState<StoreId | null>(null);

  function onBadgeClick(event: MouseEvent<HTMLAnchorElement>, store: StoreId) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    if (isPhone()) return;
    event.preventDefault();
    setOpenStore(store);
  }

  const openUrl = openStore ? STORE_LINKS[openStore] : null;
  const openName = openStore ? t(`stores.${openStore}`) : '';

  return (
    <>
      <div className="stores">
        <a
          className="store store-badge store-live"
          href={STORE_LINKS.appStore}
          aria-label={t('stores.appStore')}
          onClick={(event) => onBadgeClick(event, 'appStore')}
        >
          <img src={STORE_BADGES.appStore} alt="" />
        </a>
        <a
          className="store store-badge store-live"
          href={STORE_LINKS.googlePlay}
          aria-label={t('stores.googlePlay')}
          onClick={(event) => onBadgeClick(event, 'googlePlay')}
        >
          <img src={STORE_BADGES.googlePlay} alt="" />
        </a>
      </div>
      {openStore && openUrl ? (
        <StoreQrDialog url={openUrl} name={openName} onClose={() => setOpenStore(null)} />
      ) : null}
    </>
  );
}

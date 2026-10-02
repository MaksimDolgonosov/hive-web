import { STORE_LINKS } from '../config/stores';
import { useSiteI18n } from '../i18n/useSiteI18n';

type StoreButtonProps = {
  href: string | null;
  name: string;
  soon: string;
};

function StoreButton({ href, name, soon }: StoreButtonProps) {
  if (!href) {
    return (
      <button type="button" className="store" disabled aria-label={`${name}. ${soon}`}>
        <span className="store-name">{name}</span>
        <span className="store-soon">{soon}</span>
      </button>
    );
  }

  return (
    <a className="store store-live" href={href}>
      <span className="store-name">{name}</span>
    </a>
  );
}

export function StoreButtons() {
  const { t } = useSiteI18n();
  const soon = t('stores.comingSoon');

  return (
    <div className="stores">
      <StoreButton href={STORE_LINKS.appStore} name={t('stores.appStore')} soon={soon} />
      <StoreButton href={STORE_LINKS.googlePlay} name={t('stores.googlePlay')} soon={soon} />
    </div>
  );
}

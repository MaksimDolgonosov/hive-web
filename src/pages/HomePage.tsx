import { Seo } from '../components/Seo';
import { HiveMark } from '../components/HiveMark';
import { StoreButtons } from '../components/StoreButtons';
import { useSiteI18n } from '../i18n/useSiteI18n';

export function HomePage() {
  const { t } = useSiteI18n();

  return (
    <>
      <Seo title={t('seo.homeTitle')} description={t('seo.homeDescription')} path="/" />
      <div className="wrap home">
        <section className="hero">
          <HiveMark size={72} />
          <h1>{t('home.title')}</h1>
          <p className="slogan">{t('home.slogan')}</p>
          <p className="lede">{t('home.lead')}</p>
          <StoreButtons />
        </section>

        <section>
          <h2>{t('home.howTitle')}</h2>
          <div className="cards">
            <article className="card">
              <h3>{t('home.cameraTitle')}</h3>
              <p>{t('home.cameraBody')}</p>
            </article>
            <article className="card">
              <h3>{t('home.lifeTitle')}</h3>
              <p>{t('home.lifeBody')}</p>
            </article>
            <article className="card">
              <h3>{t('home.hiveTitle')}</h3>
              <p>{t('home.hiveBody')}</p>
            </article>
          </div>
        </section>

        <section className="privacy-note">
          <h2>{t('home.privacyTitle')}</h2>
          <p>{t('home.privacyBody')}</p>
        </section>
      </div>
    </>
  );
}

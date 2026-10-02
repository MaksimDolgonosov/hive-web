import { Seo } from '../components/Seo';
import { HiveMark } from '../components/HiveMark';
import { StoreButtons } from '../components/StoreButtons';
import { useSiteI18n } from '../i18n/useSiteI18n';

const ART_SIZE = 280;

export function HomePage() {
  const { t, lang } = useSiteI18n();

  const steps = [
    { art: `camera-${lang}`, title: t('home.cameraTitle'), body: t('home.cameraBody') },
    { art: `life-${lang}`, title: t('home.lifeTitle'), body: t('home.lifeBody') },
    { art: 'hive', title: t('home.hiveTitle'), body: t('home.hiveBody') },
  ];

  return (
    <>
      <Seo title={t('seo.homeTitle')} description={t('seo.homeDescription')} path="/" />
      <div className="wrap home">
        <section className="hero">
          <div className="hero-text">
            <HiveMark size={72} />
            <h1>{t('home.title')}</h1>
            <p className="slogan">{t('home.slogan')}</p>
            <p className="lede">{t('home.lead')}</p>
            <StoreButtons />
          </div>
          <div className="hero-art">
            <div className="hero-frame">
              <img
                src="/illustrations/map.webp"
                alt=""
                width={ART_SIZE}
                height={ART_SIZE}
                fetchPriority="high"
              />
            </div>
          </div>
        </section>

        <section className="how">
          <h2>{t('home.howTitle')}</h2>
          <div className="cards">
            {steps.map((step) => (
              <article className="card" key={step.art}>
                <div className="card-art">
                  <img
                    src={`/illustrations/${step.art}.webp`}
                    alt=""
                    width={ART_SIZE}
                    height={ART_SIZE}
                    loading="lazy"
                  />
                </div>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="privacy-note">
          <span className="note-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
              <circle cx="12" cy="10" r="3" />
            </svg>
          </span>
          <div>
            <h2>{t('home.privacyTitle')}</h2>
            <p>{t('home.privacyBody')}</p>
          </div>
        </section>
      </div>
    </>
  );
}

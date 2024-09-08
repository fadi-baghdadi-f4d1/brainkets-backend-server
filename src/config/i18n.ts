import i18next from 'i18next';
import Backend from 'i18next-fs-backend';
import middleware from 'i18next-http-middleware';
import path from 'path';

const initI18next = async () => {
  await i18next
    .use(Backend)
    .use(middleware.LanguageDetector)
    .init({
      fallbackLng: 'en',
      preload: ['en'],
      backend: {
        loadPath: path.join(__dirname, '../locales/{{lng}}/messages.json'),
      },
      // debug: process.env.NODE_ENV === 'development',
      debug: false,
    });
};

export { initI18next, i18next };

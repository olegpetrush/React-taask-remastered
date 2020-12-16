// import { addLocaleData } from 'react-intl';
import enLang from './entries/en-US';
import daLang from './entries/da_DK';

// import {createIntl, createIntlCache, RawIntlProvider} from 'react-intl'

// // This is optional but highly recommended
// // since it prevents memory leak
// const cache = createIntlCache()

// const intl = createIntl({
//   locale: 'fr-FR',
//   messages: {}
// }, cache)

const AppLocale = {
  en: enLang,
  da: daLang,
};
// addLocaleData(AppLocale.en.data);
// addLocaleData(AppLocale.es.data);
// addLocaleData(AppLocale.enrtl.data);

export default AppLocale;

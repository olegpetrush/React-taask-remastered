/* eslint-disable global-require */
import './assets/css/vendor/bootstrap.min.css';
import './assets/css/vendor/bootstrap.rtl.only.min.css';
import 'react-circular-progressbar/dist/styles.css';
import 'react-perfect-scrollbar/dist/css/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-image-lightbox/style.css';
import 'video.js/dist/video-js.css';
import {
  isMultiColorActive,
  defaultColor,
  themeColorStorageKey,
  isDarkSwitchActive,
} from './constants/defaultValues';
import { getCookie, setCookie } from './helpers/Cookies';

const color =
  (isMultiColorActive || isDarkSwitchActive) &&
  localStorage.getItem(themeColorStorageKey)
    ? localStorage.getItem(themeColorStorageKey)
    : defaultColor;

localStorage.setItem(themeColorStorageKey, color);

if(getCookie("first_time_login") === ""){
  setCookie("first_time_login", "false");
}

const render = () => {
  import(`./assets/css/sass/themes/gogo.${color}.scss`).then(() => {
    require('./AppRenderer');
  });
};
render();

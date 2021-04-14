import '../main/index.css';

import MainApi from '../../scripts/api/MainApi';
import NewsApi from '../../scripts/api/NewsApi';
import NewsCard from '../../scripts/components/NewsCard';
import NewsCardList from '../../scripts/components/NewsCardList';
import SavedArticles from '../../scripts/components/SavedArticles';
import {
  root,
  header,
  search,
  preloader,
  conteinerText,
  list, headerNav, headerNavItems,
  formAuhorization,
  formRegistration,
  headerNavButton,
  listButton,
  footer,
  headerMenu,
  searchForm, serverUrl, serverUrlNews,
} from '../../scripts/constants/constants';
import {
  openCloseNav,
  formatDate,

} from '../../scripts/utils/utils';


const listContainerCards = document.querySelector('.list__container');
const headerNavItem = document.querySelectorAll('.header__nav-item');
const headerLogo = document.querySelector('.header__logo');
const listContainerAdd = document.querySelector('.list__container-add');
const headerNavButtonIcon = document.querySelector('.header__nav-button-icon');
const mainApi = new MainApi(serverUrl, formAuhorization, formRegistration);
const headerNavMain = document.querySelectorAll('.header__nav-main');
const abouthAuthor = document.querySelector('.about-author');
const newsApi = new NewsApi(serverUrlNews);

const createCardFunction = () => new NewsCard(
  list, conteinerText, mainApi, createCardFunction, formatDate,
  'article',
);

const savedArticles = new SavedArticles(header,
  list,
  search,
  abouthAuthor,
  conteinerText,
  preloader,
  footer,
  openCloseNav,
  mainApi,
  createCardFunction,
  listContainerCards,
  listContainerAdd);
const newsCardList = new NewsCardList(
  list,
  search,
  preloader,
  newsApi,
  createCardFunction,
  listButton,
);
document.title = localStorage.getItem('nameUser');
header.querySelector('.header__nav-button').textContent = localStorage.getItem('nameUser');


headerNavItem[1].addEventListener('click', () => {
  abouthAuthor.classList.add('about-author_display-none');
  root.classList.remove('root_dark');
  header.classList.remove('header_dark');
  headerMenu.classList.remove('header__menu_close');
  headerNav.classList.remove('header__nav_drop-down-nav');
  headerNavItems.classList.remove('header__nav_drop-down-nav-items');
  headerNavItem[2].classList.remove('header__nav_drop-down-nav-item');
  headerNavMain[0].classList.remove('header__nav_drop-down-nav-main');
  headerNavButton.classList.remove('.header__nav_drop-down-nav-button');
  header.classList.add('header_boxShadow');
  headerLogo.classList.add('header__logo_color');
  headerMenu.classList.add('header__menu_dark');
  headerNavMain[0].classList.add('header__nav-main_color');
  headerNavMain[1].classList.add('header__nav-main_color');
  headerNavButtonIcon.classList.add('header__nav-button-icon_color');
  headerNavButtonIcon.classList.remove('header__nav-button-icon');

  headerNavButtonIcon.classList.add('header__nav-button-icon_dark');
  headerNavButton.classList.add('header__nav-button_color');
  search.classList.add('search_display-none');
  abouthAuthor.classList.add('about-author_display-none');
  conteinerText.classList.add('conteiner-text_display');
  listContainerCards.classList.add('list__container_display-none');
  list.classList.add('list_display');

  savedArticles.createSaveArticles();
});

headerNavItem[2].addEventListener('click', () => {
  window.location.href = '../';
});

headerMenu.addEventListener('click', () => {
  openCloseNav();
});

headerNavItem[0].addEventListener('click', () => {
  window.location.href = './';
});

searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  newsCardList.searchNews();
});

listButton.addEventListener('click', () => {
  newsCardList.addListNews();
});

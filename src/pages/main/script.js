import './index.css';

import MainApi from '../../scripts/api/MainApi';
import NewsApi from '../../scripts/api/NewsApi';
import NewsCard from '../../scripts/components/NewsCard';
import NewsCardList from '../../scripts/components/NewsCardList';
import Form from '../../scripts/components/Form';
import Popup from '../../scripts/components/Popup';


import {
  root,
  header,
  search,
  preloader,
  conteinerText,
  list,
 popupRegistration,
  popupAuthorization,
  formAuhorization,
  formRegistration,
 

  headerNavButton,
  popupButton,
  popupSuccessful,
  listButton,
  headerMenu,searchForm, serverUrl,serverUrlNews, popupText, popupButtonRegistration,
  headerNav,headerNavItems,headerNavItem, headerNavMain, 


  } from '../../scripts/constants/constants';
  import{
    openCloseNav,
    sortingKeywords,formatDate,
  } from '../../scripts/utils/utils';

  




  
const mainApi = new MainApi(serverUrl, formAuhorization, formRegistration);
const createCardFunction = () => new NewsCard(
  list, conteinerText, mainApi, createCardFunction,formatDate , sortingKeywords,
  'main');

  const formAuhorizationValidator = new Form(formAuhorization);
  const formRegistrationValidator = new Form(formRegistration);
const newsApi = new NewsApi(serverUrlNews);
const newsCardList = new NewsCardList(list, search, preloader, newsApi, createCardFunction);
const authorizationPopup = new Popup(popupAuthorization,'popup_display',mainApi,root);
const registrationPopup = new Popup(popupRegistration,'popup_display',mainApi,root);
const successfulPopup = new Popup(popupSuccessful,'popup_display',mainApi,root);




headerNavButton.addEventListener("click", (event) => {
  authorizationPopup.open();
});

 headerNavButton.addEventListener("click", (event) => {
  event.stopPropagation();
  formAuhorizationValidator._errorReset();
  formAuhorization.reset();
  authorizationPopup.open();
  root.classList.remove('root_dark');
  header.classList.remove('header_dark');
  headerMenu.classList.remove('header__menu_close');
  headerNav.classList.remove('header__nav_drop-down-nav');
  headerNavItems.classList.remove('header__nav_drop-down-nav-items');
  headerNavItem[2].classList.remove('header__nav_drop-down-nav-item');
  headerNavMain[0].classList.remove('header__nav_drop-down-nav-main');
  headerNavButton.classList.remove('.header__nav_drop-down-nav-button');
  root.classList.add('root_dark');
  formAuhorizationValidator._checkInputsForms();
  
  
});
popupButton.addEventListener("click", (event) => {
  event.preventDefault();

authorizationPopup.authorization(event);

  authorizationPopup.close();

});



popupText.addEventListener("click", () => {
  registrationPopup.open();
  formRegistrationValidator._errorReset();
  authorizationPopup.close();
  root.classList.add('root_dark');
  formRegistrationValidator._checkInputsForms();
  });

  popupButtonRegistration.addEventListener("click", (event) => {
    event.preventDefault();
    registrationPopup.registration(event);
   registrationPopup.close();
   successfulPopup.open();
  
  });


  
  
  headerMenu.addEventListener("click", (event) => {
    openCloseNav();
  });
  
  




searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  newsCardList.searchNews();
});

listButton.addEventListener("click", () => {
  
  newsCardList.addListNews();
});




formAuhorizationValidator.setEventListeners();
formRegistrationValidator.setEventListeners();





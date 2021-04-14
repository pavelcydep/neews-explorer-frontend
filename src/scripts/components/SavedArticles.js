
export default class SavedArticles {
  constructor(
    header,
    list,
    search,
    abouthAuthor,
    conteinerText,
    preloader,
    footer,
    closeNav,
    mainApi,
    createCardFunction,
    listContainerCards,
    listContainerAdd,
  ) {
    this.header = header;
    this.headerLogo = header.querySelector('.header__logo');
    this.headerMenu = header.querySelector('.header__menu');
    this.headerNavItem = header.querySelectorAll('.header__nav-item');
    this.headerNavMain = header.querySelectorAll('.header__nav-main');
    this.headerNavButton = header.querySelector('.header__nav-button');
    this.list = list;
    this.listTitle = list.querySelector('.list__title');
    this.listButton = list.querySelector('.list__button');
    this.search = search;
    this.abouthAuthor = abouthAuthor;
    this.conteinerText = conteinerText;
    this.containerTextTitle = conteinerText.querySelector('.conteiner-text__title');
    this.containerTextBold = conteinerText.querySelector('.conteiner-text__subtitle-bold');
    this.preloaderResult = preloader.querySelector('.preloader__no-result');
    this.preloaderError = preloader.querySelector('.preloader__error');
    this.footerItem = footer.querySelectorAll('.footer__item');
    this.closeNav = closeNav;
    this.mainApi = mainApi;
    this.createCardFunction = createCardFunction;
    this.listContainerCards = listContainerCards;
    this.listContainerAdd = listContainerAdd;
  }


  createSaveArticles() {
    this.mainApi.getArticles()
      .then((res) => {
        if (res.ok) {
          return res.json().then((json) => {
            this.containerTextTitle.textContent = `${localStorage.getItem('nameUser')}, у вас ${json.length} сохраненных статей`;
            if (json.length === 0) {
              this.list.classList.remove('list_display');
            } else {
              this.containerTextBold.textContent = `${localStorage.getItem('keyword')} и  другим`;
            }
            json.forEach((i) => {
              this.listContainerAdd.appendChild(this.createCardFunction().savedCard(i));
            });
          }).catch((e) => console.log(e));
        }
        return Promise.reject(res.status);
      }).catch((e) => {
        this.containerTextTitle.textContent = `Ошибка на сервере: ${e}`;
      });
  }
}

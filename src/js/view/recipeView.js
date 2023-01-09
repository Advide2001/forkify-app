import View from './view';

class RecipeView extends View {
  _parentElement = document.querySelector('.recipe');
  _data;
  _errorMessage = 'The recipe you requested does not exist';
  _message = '';

  addHandlerRender(handlerFuntion) {
    // window.addEventListener('hashchange', handlerFuntion);
    // window.addEventListener('load', handlerFuntion);
    // Merge n event listeners into one event listener
    ['load', 'hashchange'].forEach(ev => {
      window.addEventListener(ev, handlerFuntion);
    });
  }

  addHandlerUpdateServings(handlerFuntion) {
    this._parentElement.addEventListener('click', e => {
      const btn = e.target.closest('.btn--update-servings');
      if (!btn) return;
      const update = btn.dataset.update;
      if (update > 0) handlerFuntion(update);
      else return;
    });
  }

  addHandlerAddBookmark(handlerFunction) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--bookmark');
      if (!btn) return;
      handlerFunction();
    });
  }

  _generateMarkup() {
    return `
        <figure class="recipe__fig">
          <img src="${this._data.image}" alt="An image of ${
      this._data.title
    }" class="recipe__img" />
          <h1 class="recipe__title">
            <span>${this._data.title}</span>
          </h1>
        </figure>

        <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="src/img/icons.svg#icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">
            ${this._data.cookingTime}</span>
            <span class="recipe__info-text">minutes</span>
          </div>
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="src/img/icons.svg#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${
              this._data.servings
            }</span>
            <span class="recipe__info-text">servings</span>

            <div class="recipe__info-buttons">
              <button class="btn--tiny btn--update-servings" data-update=${
                Number(this._data.servings) - 1
              }>
                <svg>
                  <use href="src/img/icons.svg#icon-minus-circle"></use>
                </svg>
              </button>
              <button class="btn--tiny btn--update-servings" data-update = "${
                Number(this._data.servings) + 1
              }">
                <svg>
                  <use href="src/img/icons.svg#icon-plus-circle"></use>
                </svg>
              </button>
            </div>
          </div>
          <button class="btn--round btn--bookmark">
            <svg class="">
              <use href="src/img/icons.svg#icon-bookmark${
                this._data.bookmarked ? '-fill' : ''
              }"></use>
            </svg>
          </button>
        </div>

        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">
            ${this._data.ingredients
              .map(ingredient => {
                return `<li class="recipe__ingredient">
                          <svg class="recipe__icon">
                            <use href="src/img/icons.svg#icon-check"></use>
                          </svg>
                          <div class="recipe__quantity">${
                            ingredient.quantity > 0 ? ingredient.quantity : ''
                          }</div>
                          <div class="recipe__description">
                            <span class="recipe__unit">${ingredient.unit}</span>
                              ${ingredient.description}
                          </div>
                        </li>`;
              })
              .join('')}
          </ul>
        </div>

        <div class="recipe__directions">
          <h2 class="heading--2">How to cook it</h2>
          <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">${
              this._data.publisher
            }</span>. Please check out
            directions at their website.
          </p>
          <a
            class="btn--small recipe__btn"
            href="${this._data.sourceURL}"
            target="_blank"
          >
            <span>Directions</span>
            <svg class="search__icon">
              <use href="src/img/icons.svg#icon-arrow-right"></use>
            </svg>
          </a>
        </div>`;
  }
}

export default new RecipeView();

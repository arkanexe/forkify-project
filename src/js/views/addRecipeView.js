import View from './View.js';
import icons from '../../img/icons.svg';

class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _message = 'Recipe was successfully uploaded :)';

  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }

  /**
   * Shows or hides the add recipe modal and overlay.
   * @returns {void}
   */
  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  /**
   * Binds the modal open button to the shared toggle handler.
   * @returns {void}
   */
  _addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  }

  /**
   * Binds close interactions to the shared toggle handler.
   * @returns {void}
   */
  _addHandlerHideWindow() {
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }

  /**
   * Subscribes a controller handler to the upload form submit event.
   * The submitted form data is converted into a plain object before being passed on.
   * @param {Function} handler Callback that receives the form data object.
   * @returns {void}
   */
  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);

      handler(data);
    });
  }

  /**
   * Placeholder markup generator required by the base view contract.
   * @returns {void}
   */
  _generateMarkUp() {}
}

export default new AddRecipeView();

import $ from 'jquery';

const closeFlashOnClick = ($flashMessage) => {
  const $closebutton = $flashMessage.find('.close.icon');

  $closebutton.on('click', () => $flashMessage.remove());

  setTimeout(() => {
    $flashMessage.remove();
  }, 3000);
};

export default (requestUrl) => {
  const CART_BUTTON_ID = '#sylius-cart-button';
  const $cartButton = $(CART_BUTTON_ID);
  const $cartPopup = $cartButton.next('.popup');

  $.get(requestUrl, function(data) {
    // Update cart button and popup
    const $data = $(data);
    const $updatedCartButton = $data.find(CART_BUTTON_ID);
    const CART_BUTTON_HTML = $updatedCartButton.html();
    const POPUP_HTML = $updatedCartButton.next('.popup').html();

    $cartButton.html(CART_BUTTON_HTML);
    $cartPopup.html(POPUP_HTML);

    // Load flash message 
    const $flashMessage = $data.find('.sylius-flash-message');
    const $breadCrumbs = $('.breadcrumb');
    $flashMessage.insertAfter($breadCrumbs);

    closeFlashOnClick($flashMessage);
  });
};
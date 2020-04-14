import 'semantic-ui-css/components/api';
import $ from 'jquery';
import updateCart from './_updateCart';

$.fn.extend({
  addToCartEdited() {
    const element = this;
    const url = $(element).attr('action');
    const redirectUrl = $(element).data('redirect');
    const validationElement = $('#sylius-cart-validation-error');

    element.api({
      method: 'POST',
      on: 'submit',
      cache: false,
      url,
      beforeSend(settings) {
        /* eslint-disable-next-line no-param-reassign */
        settings.data = element.serialize();

        return settings;
      },
      onSuccess() {
        validationElement.addClass('hidden');
        updateCart(redirectUrl);
      },
      onFailure(response) {
        validationElement.removeClass('hidden');
        let validationMessage = '';

        Object.entries(response.errors.errors).forEach(([, message]) => {
          validationMessage += message;
        });
        validationElement.html(validationMessage);
        $(element).removeClass('loading');
      },
    });
  },
});

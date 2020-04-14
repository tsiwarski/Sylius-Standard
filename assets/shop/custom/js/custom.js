import $ from 'jquery';
import './_addToCartEdit';

$(function() {
  const $form = $('#sylius-product-adding-to-cart-edited');
  
  if ($form.length) {
    $form.addToCartEdited();
  }
});

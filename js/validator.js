import {adTypeToPrice, MAX_PRICE_FOR_NIGHT, ROOM_GUEST_OPTION} from'./const.js';

const form = document.querySelector('.ad-form');
const adPrice = document.querySelector('#price');
const adType = document.querySelector('#type');
const roomNumber = document.querySelector('#room_number');
const capacity = document.querySelector('#capacity');
const timeIn = document.querySelector('#timein');
const timeOut = document.querySelector('#timeout');
const adTimeInOut = document.querySelector('.ad-form__element--time');


const pristine = window.Pristine(form, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__item--invalid',
  successClass: 'ad-form__item--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'ad-form__error',
});

const validateAdPrice = (value) => value >= adTypeToPrice[adType.value] && value <= MAX_PRICE_FOR_NIGHT;
const getAdTypeErrorMessage = () => `Минимальная цена за ночь: ${adTypeToPrice[adType.value]}`;

pristine.addValidator(
  adPrice,
  validateAdPrice,
  getAdTypeErrorMessage
);

const onAdTypeChange = function () {
  adPrice.min = adTypeToPrice[this.value];
  adPrice.placeholder =  adTypeToPrice[this.value];
  if (adPrice.value) {
    pristine.validate(adPrice);
  }
};

adType.addEventListener('change', onAdTypeChange);

const validateDelivery = () => ROOM_GUEST_OPTION[roomNumber.value].includes(capacity.value);
const getDeliveryErrorMessage = () => 'Выберите другое кол-во гостей :)';

pristine.addValidator(
  capacity,
  validateDelivery,
  getDeliveryErrorMessage
);

roomNumber.addEventListener('change', () => {
  pristine.validate(capacity);
});

const onTimeInOutChange = (evt) => {
  timeIn.value = timeOut.value = evt.target.value;
};

adTimeInOut.addEventListener('change', onTimeInOutChange);

export {adPrice, pristine};

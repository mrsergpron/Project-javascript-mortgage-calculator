import * as Model from "./model.js";
import updateResultsView from "./utils/updateResultsView.js";

import init from "./view/radioPrograms.js";
import costInputInit from "./view/costInput.js";
import costRange from "./view/costRange.js";
import paymentRange from "./view/paymentRange.js";
import paymentInputInit from "./view/paymentInput.js";
import { updateMinFirstPayment, updateMaxFirstPayment } from "./view/utils.js";

window.onload = function () {
  const getData = Model.getData;

  // min / max payment percents
  const min = getData().minPaymentPercent;
  const max = getData().maxPaymentPercent;

  //update min/max percents payment
  updateMinFirstPayment(min);
  updateMaxFirstPayment(max);

  //init programs
  init(getData);

  //init costInput
  const input = costInputInit();

  //init costRange
  const slider = costRange(getData);

  //init paymentInput
  const payment = paymentInputInit();

  //init paymentRange
  const paymentSlider = paymentRange(getData);

  //прослушка событий  на уровне document
  document.addEventListener("updateForm", (event) => {
    Model.setData(event.detail);

    const data = Model.getData();
    const results = Model.getResults();

    //update results block
    updateResultsView(results);

    //updateFormAndSliders
    updateFormAndSliders(data);
  });

  function updateFormAndSliders(data) {
    //update percent
    if (data.onUpdate === "radioProgram") {
      updateMinFirstPayment(data.minPaymentPercent);

      //update percent первоначального взноса
      paymentSlider.noUiSlider.updateOptions({
        range: {
          min: data.minPaymentPercent * 100,
          max: data.maxPaymentPercent * 100,
        },
      });
    }

    //update costRange
    if (data.onUpdate === "costSlider") {
      input.setRawValue(data.cost);

      //обновляем первоначальный взнос
      payment.setRawValue(data.getMinPayment());

      //обновляем % первоначального взноса
      paymentSlider.noUiSlider.set(data.paymentPercent * 100);
    }

    //update costInput
    if (data.onUpdate === "costInput") {
      slider.noUiSlider.set(data.cost);

      //обновляем первоначальный взнос
      payment.setRawValue(data.getMinPayment());

      //обновляем % первоначального взноса
      paymentSlider.noUiSlider.set(data.paymentPercent * 100);
    }

    //update paymentInput
    if (data.onUpdate === "paymentSlider") {
      //обновляем первоначальный взнос
      payment.setRawValue(data.payment);
    }

    //update paymentSlider
    if (data.onUpdate === "paymentInput") {
      //обновляем первоначальный взнос
      paymentSlider.noUiSlider.set(data.paymentPercent * 100);
    }
  }
};

import { getData } from "../model.js";
import updateModel from "../utils/updateModel.js";


function paymentInputInit() {
  const input = document.querySelector("#input-downpayment");
  const params = {
    numeral: true,
    numeralThousandsGroupStyle: "thousand",
    delimiter: " ",
  };

  //подключение библиотеки Cleave https://nosir.github.io/cleave.js/
  const paymentInput = new Cleave(input, params);

  //получаем стартовую цену
  paymentInput.setRawValue(getData().payment);

  //проверка поля на корректность заполнения

  //ввод данных в  input
  input.addEventListener("input", checkInputCost);
  //когда ввели данные и покидаем окно input
  input.addEventListener("change", checkChangeInputCost);

  //ввод данных в  input
  function checkInputCost(event) {
    const value = +paymentInput.getRawValue();

    if (
      paymentInput.getRawValue() < getData().getMinPayment() ||
      paymentInput.getRawValue() > getData().getMaxPayment()
    ) {
      input.closest(".param__details").classList.add("param__details--error");
    } else {
      input
        .closest(".param__details")
        .classList.remove("param__details--error");
    }

    let data = {
      bubbles: true,
      detail: {
        payment: value,
        onUpdate: "paymentInput",
      },
    };

    //update Model
    updateModel(input, data);
    console.log(getData());
  }

  //когда ввели данные и покидаем окно input
  function checkChangeInputCost() {
    +paymentInput.getRawValue();

    if (paymentInput.getRawValue() < getData().getMinPayment()) {
      input
        .closest(".param__details")
        .classList.remove("param__details--error");
      +paymentInput.setRawValue(getData().getMinPayment());
    }
    if (paymentInput.getRawValue() > getData().getMaxPayment()) {
      input
        .closest(".param__details")
        .classList.remove("param__details--error");
      +paymentInput.setRawValue(getData().getMaxPayment());
    }

    let data = {
      bubbles: true,
      detail: {
       payment: +paymentInput.getRawValue(),
        onUpdate: "paymentInput",
      },
    };

    //update Model
    updateModel(input, data);
    console.log(getData());

  
  }

return   paymentInput

}

export default paymentInputInit;

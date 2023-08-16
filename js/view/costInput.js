import { getData } from "../model.js";
import updateModel from "../utils/updateModel.js";

const minPrice = getData().minPrice;
const maxPrice = getData().maxPrice;

function costInputInit() {
  const input = document.querySelector("#input-cost");
  const params = {
    numeral: true,
    numeralThousandsGroupStyle: "thousand",
    delimiter: " ",
  };

  //подключение библиотеки Cleave https://nosir.github.io/cleave.js/
  const costInput = new Cleave(input, params);

  //получаем стартовую цену
  costInput.setRawValue(getData().cost);

  //проверка поля на корректность заполнения

  //ввод данных в  input
  input.addEventListener("input", checkInputCost);
  //когда ввели данные и покидаем окно input
  input.addEventListener("change", checkChangeInputCost);

  //ввод данных в  input
  function checkInputCost(event) {
    const value = +costInput.getRawValue();

    if (
      costInput.getRawValue() < minPrice ||
      costInput.getRawValue() > maxPrice
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
        cost: value,
        onUpdate: "costInput",
      },
    };

    //update Model
    updateModel(input, data);
    console.log(getData());
  }

  //когда ввели данные и покидаем окно input
  function checkChangeInputCost() {
    +costInput.getRawValue();

    if (costInput.getRawValue() < minPrice) {
      input
        .closest(".param__details")
        .classList.remove("param__details--error");
      +costInput.setRawValue(minPrice);
    }
    if (costInput.getRawValue() > maxPrice) {
      input
        .closest(".param__details")
        .classList.remove("param__details--error");
      +costInput.setRawValue(maxPrice);
    }

    let data = {
      bubbles: true,
      detail: {
        cost: +costInput.getRawValue(),
        onUpdate: "costInput",
      },
    };

    //update Model
    updateModel(input, data);
    console.log(getData());

  
  }

return   costInput

}

export default costInputInit;

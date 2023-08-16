import { getData } from "../model.js";
import updateModel from "../utils/updateModel.js";



function timeInputInit() {
  const input = document.querySelector("#input-term");
  const params = {
    numeral: true,
    numeralThousandsGroupStyle: "thousand",
    delimiter: " ",
  };

  //подключение библиотеки Cleave https://nosir.github.io/cleave.js/
  const timeInput = new Cleave(input, params);

  //получаем стартовую цену
  timeInput.setRawValue(getData().time);

  //проверка поля на корректность заполнения

  //ввод данных в  input
  input.addEventListener("input", checkInputCost);
  //когда ввели данные и покидаем окно input
  input.addEventListener("change", checkChangeInputCost);

  //ввод данных в  input
  function checkInputCost(event) {
    const value = +timeInput.getRawValue();

    if (
      timeInput.getRawValue() < getData().minTime ||
      timeInput.getRawValue() > getData().maxTime
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
        onUpdate: "timeInput",
      },
    };

    //update Model
    updateModel(input, data);
    console.log(getData());
  }

  //когда ввели данные и покидаем окно input
  function checkChangeInputCost() {
    +timeInput.getRawValue();

    if (timeInput.getRawValue() < getData().minTime) {
      input
        .closest(".param__details")
        .classList.remove("param__details--error");
      +timeInput.setRawValue(getData().minTime);
    }
    if (timeInput.getRawValue() > getData().maxTime) {
      input
        .closest(".param__details")
        .classList.remove("param__details--error");
      +timeInput.setRawValue(getData().maxTime);
    }

    let data = {
      bubbles: true,
      detail: {
       time: +timeInput.getRawValue(),
        onUpdate: "timeInput",
      },
    };

    //update Model
    updateModel(input, data);
    console.log(getData());

  
  }

return   timeInput

}

export default timeInputInit;

import updateModel from "../utils/updateModel.js";

function init(getData) {

  //проставим данные для кнопок выбора программы по ипотеке
  const { base, it, gov, zero } = getData().programs;
  const rate = getData().selectedProgram;

  //set program rates in radio buttons
  document.getElementById("base-value").value = base;
  document.getElementById("it-value").value = it;
  document.getElementById("gov-value").value = gov;
  document.getElementById("zero-value").value = zero;

  //set program rates in page
  document.getElementById("base-text").innerText = base * 100 + "%";
  document.getElementById("it-text").innerText = it * 100 + "%";
  document.getElementById("gov-text").innerText = gov * 100 + "%";
  document.getElementById("zero-text").innerText = zero * 100 + "%";

  //update results block
  document.querySelector("#total-percent").innerText = rate * 100 + "%";

  //
  const radioBtns = document.querySelectorAll('input[name="program"]');
  radioBtns.forEach((radioBtn) => {
    radioBtn.addEventListener("change", (event) => {
      
      //пользовательское событие
      let data = {
        bubbles: true,
        detail: {
          selectedProgram: parseFloat(event.target.value),
          onUpdate: "radioProgram",
          id: event.target.id,
        },
      };

      updateModel(radioBtn, data);
      console.log("Model from radiobtn", getData());
    });
  });
}

export default init;

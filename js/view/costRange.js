import updateModel from "../utils/updateModel.js";

export default function init(getData) {


  console.log('MODEL:',getData());
 

  const slider = document.getElementById("slider-cost");

  noUiSlider.create(slider, {
    start: getData().cost,
    connect: "lower",
    tooltips: true,
    step: 100000,
    range: {
      min: getData().minPrice,
      "1%": [400000, 100000],
      max: getData().maxPrice,
    },
    format: wNumb({
      decimals: 0,
      prefix: "",
      thousand: " ",
    }),
  });

  slider.noUiSlider.on("slide", function () {
    //получаем значение слайдера
    let sliderValue = slider.noUiSlider.get();
    sliderValue = sliderValue.replace(/ /g, "");
  
  

    let data = {
      bubbles: true,
      detail: {
        cost: sliderValue,
        onUpdate: "costSlider",
      },
    };

    //update Model
    updateModel(slider, data);
    console.log(getData());


  });


  return slider
}

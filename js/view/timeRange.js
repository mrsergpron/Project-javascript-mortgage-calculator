import updateModel from "../utils/updateModel.js";

export default function init(getData) {


  console.log('MODEL:',getData());
 

  const slider = document.getElementById("slider-term");

  noUiSlider.create(slider, {
    start: getData().time,
    connect: "lower",
    tooltips: true,
    step: 1,
    range: {
      min: getData().minTime,
     
      max: getData().maxTime,
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
        time: sliderValue,
        onUpdate: "timeSlider",
      },
    };

    //update Model
    updateModel(slider, data);
    console.log(getData());


  });


  return slider
}

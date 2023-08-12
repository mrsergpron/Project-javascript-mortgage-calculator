import updateModel from "../utils/updateModel.js";

export default function init(getData) {



  const slider = document.getElementById("slider-downpayment");


  noUiSlider.create(slider, {
    start:  getData().paymentPercent * 100,
    connect: "lower",
    tooltips: true,
    step: 1,
    range: {
   
      min: getData().minPaymentPercent * 100,
      max: getData().maxPaymentPercent * 100,
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
        paymentPercent: sliderValue,
        onUpdate: "paymentSlider",
      },
    };

    //update Model
    updateModel(slider, data);
    console.log(getData());


  });


  return slider
}

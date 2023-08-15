import * as Model from "./model.js";
import updateResultsView from "./utils/updateResultsView.js";

import init from "./view/radioPrograms.js";
import costInputInit from "./view/costInput.js";
import costRange from "./view/costRange.js";
import paymentRange from "./view/paymentRange.js";
import paymentInputInit from "./view/paymentInput.js";
import timeInputInit from "./view/timeInput.js";
import timeRange from "./view/timeRange.js";
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


  //init timeInput
  const time = timeInputInit(getData);

   //init timeRange
   const timeSlider = timeRange(getData);

   //выводим первоначальные данные результата
   Model.setData({})
   const results = Model.getResults()
   updateResultsView(results);

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

    //update timetInput
    if (data.onUpdate === "timeSlider") {
      //обновляем первоначальный взнос
      time.setRawValue(data.time);
    }

    //update timeSlider
    if (data.onUpdate === "timeInput") {
      //обновляем первоначальный взнос
      timeSlider.noUiSlider.set(data.time);
    }
  }
  //order form

   // кнопка оставить заявку
   const openFormBtn = document.getElementById('openFormBtn')

   //форма
   const orderForm = document.getElementById('orderForm')

   //кнопка оформить заявку
   const submitFormBtn = document.getElementById('submitFormBtn')


   //открываем форму и скрываем кнопку "оставить заявку"
   openFormBtn.addEventListener('click', function(){
   orderForm.classList.remove('none')
   openFormBtn.classList.add('none')
   })


   //слушаем событие submit  формы
   orderForm.addEventListener('submit', function(event){
    event.preventDefault();


    //собираем данные из формы
    let formData = new FormData(orderForm);

    //получаем данные полей
    console.log(formData.get('name'))
    console.log(formData.get('email'))
    console.log(formData.get('phone'))

    //блокируем  кнопку при отправке данных
    submitFormBtn.setAttribute('disabled', '')
    submitFormBtn.innerText = 'Заявка отправляется...'

    //блокируем поля input  при лтправке данных
    const inputs = orderForm.querySelectorAll('input')
  inputs.forEach((input)=>input.setAttribute('disabled', ''))



    //отправка данных
    //отправляем объекты: data,results, данные формы
  
  const data = Model.getData()
  const results = Model.getResults()

  //текущий адрес нашего сайта
  //document.location.href  = http://127.0.0.1:5500/index.html
  let url = checkUrl(document.location.href)
  console.log('URL', url)


 
  //функция очистки url от названия страницы
  //http://127.0.0.1:5500/
  function checkUrl(url){

    let allArrayDot = url.split('.')
    console.log(url) //http://127.0.0.1:5500/index.html
    console.log(allArrayDot) //['http://127', '0', '0', '1:5500/index', 'html']



    if(allArrayDot[allArrayDot.length -1]==='html' ||allArrayDot[allArrayDot.length -1]==='htm'|| allArrayDot[allArrayDot.length -1]==='php' ||allArrayDot[allArrayDot.length -1]==='js'){
      allArrayDot.pop()
      console.log(allArrayDot) // ['http://127', '0', '0', '1:5500/index']

      let newUrl = allArrayDot.join('.')
      console.log(newUrl) //http://127.0.0.1:5500/index

      let urlArraySlash = newUrl.split('/')
      console.log(urlArraySlash) //  ['http:', '', '127.0.0.1:5500', 'index']
      urlArraySlash.pop()
      console.log(urlArraySlash) //['http:', '', '127.0.0.1:5500']

      newUrl  = urlArraySlash.join('/') + '/'
      console.log(newUrl ) //http://127.0.0.1:5500/


      return newUrl
    }
    return url
  }
 

  //формируем объект данных для передачи на сервер
  const form = {
  name:formData.get('name'),
  email: formData.get('email'),
  phone: formData.get('phone'),
  data, results

}

  //отправка данных на сервер
  async function sendData(url, post) {
    //отправка заголовка
  const headers = {'Content-type':'application/json;charset=utf-8'}
      
  try {
              
     const response = await fetch(url + 'mail.php', 
      
      {method:'POST', 
      body: JSON.stringify(post), headers:headers}) // ждет пока не исполнится запрос на сервер

     if (!response.ok || response.status>=400) {
          throw new Error(`Ошибка по адресу ${url}, статус ошибки ${response.status}`)
      }  // проверка на ошибки
  
      const data = await response.json() // ждет пока не исполнится запрос на сервер
              
     console.log('SendData:', data) // вывод полученных данных в консоль

     //разблокируем  кнопку при отправке данных
    submitFormBtn.removeAttribute('disabled')
    submitFormBtn.innerText = 'Оформить заявку'

    //разблокируем  поля input  при отправке данных
    const inputs = orderForm.querySelectorAll('input')
    inputs.forEach((input)=>input.removeAttribute('disabled'))


    //очищаем поля формы
    orderForm.reset()

    //скрываем форму
    orderForm.classList.add('none')

    //показываем блоки Успешной отправки или ошибки
    if(results==='SUCCESS'){
      document.getElementById('success').classList.remove('none')
    }else {
      document.getElementById('error').classList.remove('none')
    }


  }

  catch(error){console.error(error)}  // пойманные ошибки
}

sendData (url, form)
  
  })
};

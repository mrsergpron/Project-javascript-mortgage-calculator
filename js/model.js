//данные приложения модель MVC

let data = {
  cost: 12000000,
  minPrice: 375000,
  maxPrice: 100000000,
  minPaymentPercent: 0.15,
  maxPaymentPercent: 0.9,
  selectedProgram: 0.1,
  payment: 6000000,
  paymentPercent: 0.5,
  getMinPayment() {
    return this.cost * this.minPaymentPercent;
  },
  getMaxPayment() {
    return this.cost * this.maxPaymentPercent;
  },
  minTime:1,
  maxTime:30,
  time:10,
  programs: {
    base: 0.1,
    it: 0.047,
    gov: 0.067,
    zero: 0.12,
  },
};

let results = { rate: data.selectedProgram };

function getData() {
  return { ...data };
}
function getResults() {
  return { ...results };
}

function setData(newData) {
  if (newData.onUpdate === "radioProgram") {
    if (newData.id === "zero-value") {
      newData.minPaymentPercent = 0;
    } else {
      newData.minPaymentPercent = 0.15;
    }
  }

  //обновление процентов paymentRange
  if (newData.onUpdate === "paymentInput") {
    //пересчет % первоначального взноса
    newData.paymentPercent = (newData.payment * 100) / data.cost / 100;

    //если % больше 90%
    if (newData.paymentPercent > data.maxPaymentPercent) {
      newData.paymentPercent = data.maxPaymentPercent;
      newData.payment = data.cost * data.maxPaymentPercent;
    }
    //если % меньше 15%
    if (newData.paymentPercent < data.minPaymentPercent) {
      newData.paymentPercent = data.minPaymentPercent;
      newData.payment = data.cost * data.minPaymentPercent;
    }
  }

  //обновление процентов первоначального взноса
  if (newData.onUpdate === "paymentSlider") {
    newData.paymentPercent = newData.paymentPercent / 100;
    newData.payment = data.cost * newData.paymentPercent;
  }

  //обновление  первоначального взноса  и его %
  if (newData.onUpdate === "costSlider") {
    newData.payment = newData.cost * data.minPaymentPercent;
    newData.paymentPercent = newData.payment / newData.cost / 100;
  }

  //обновление  первоначального взноса  и его %
  if (newData.onUpdate === "costInput") {
    console.log("costInput");
    newData.payment = newData.cost * data.minPaymentPercent;
    newData.paymentPercent = newData.payment / newData.cost / 100;
  }

  //проверка поля costInput
  if (newData.cost < data.minPrice) {
    newData.cost = data.minPrice;
  }
  if (newData.cost > data.maxPrice) {
    newData.cost = data.maxPrice;
  }

  //рассчет ипотеки 

  //количество месяцев
  const months = data.time * 12
  console.log('months:', months)

  //общая стоимость кредита
  const totalAmount= data.cost  - data.payment
  console.log('totalAmount:', totalAmount)

  //ежемесячная ставка
  const monthRate = data.selectedProgram / 12 
  console.log('monthRate:', monthRate)

  //общая ставка
  const generalRate = (1 + monthRate) ** months
  console.log('generalRate:', generalRate)

  //ежемесячный платеж
  const monthPayment = (totalAmount * monthRate * generalRate) / (generalRate -1)
  console.log('monthPayment:', monthPayment)

  //переплата
  const overPayment = monthPayment * months - totalAmount
  console.log('overPayment:', overPayment )
  

  //обновление данных модели
  data = { ...data, ...newData };
  results = { rate: data.selectedProgram, totalAmount, monthPayment , overPayment };
  console.log('results', results)
}

export { getData, setData, getResults };

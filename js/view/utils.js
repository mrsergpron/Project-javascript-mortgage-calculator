//общие функции для отрисовки view

//изменяем % первоначального взноса

 function updateMinFirstPayment (percent){

    document.getElementById('percents-from').innerText = percent * 100 +'%'
}
 function updateMaxFirstPayment (percent){

    document.getElementById('percents-to').innerText = percent * 100 + '%'

}


export {updateMinFirstPayment, updateMaxFirstPayment}
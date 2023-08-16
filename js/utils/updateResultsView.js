import {priceFormatter} from './formatters.js'

//update results block
function updateResultsView(results) {
document.getElementById("total-percent").innerText =results.rate * 100 + "%";
document.getElementById('total-month-payment').innerText= priceFormatter.format(results.monthPayment) ;
document.getElementById('total-cost').innerText= priceFormatter.format(results.totalAmount) ;
document.getElementById('total-overpayment').innerText= priceFormatter.format(results.overPayment) ;
    

    
    
}

export default updateResultsView;

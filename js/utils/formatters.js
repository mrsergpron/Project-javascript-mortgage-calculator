//форматирования чисел, встроенный класс js
const priceFormatter = new Intl.NumberFormat('ru-Ru',
{style: 'currency',
currency:'RUB',
maximumFractionDigits:2
})

export {priceFormatter}
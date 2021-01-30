// Анимация
const time = 2000;
const step = 1;

function animation(num, element) {
    let logonum = document.querySelector('.header__timer-extra');
    n = 0;
    let t = Math.round(time / (num / step));
    let interval = setInterval(() => {
        n = n + step;
        if (n == num) {
            clearInterval(interval);
        }
        logonum.innerHTML = n;
    }, t);
}
animation(100, ".header__timer-extra");

//  Создаем основной объект с продуктами
const product = {
    plainBurger: {
        name: "Гамбургер простой",
        price: 10000,
        kcall: 400,
        amount: 0,
        get Summ() {
            return this.amount * this.price
        },
        get Kcall() {
            return this.kcall * this.amount
        }
    },
    freshBurger: {
        name: "Гамбургер FRESH",
        price: 20500,
        kcall: 500,
        amount: 0,
        get Summ() {
            return this.amount * this.price
        },
        get Kcall() {
            return this.kcall * this.amount
        }
    },
    freshCombo: {
        name: "FRESH COMBO",
        price: 31900,
        kcall: 700,
        amount: 0,
        get Summ() {
            return this.amount * this.price
        },
        get Kcall() {
            return this.kcall * this.amount
        }
    },
}

// Создаем объект с ингредиентами
const extraProduct = {
    doubleMayonnaise: {
        name: "Двойной майонез",
        price: 500,
        kcall: 50
    },
    lettuce: {
        name: "Салатный лист",
        price: 300,
        kcall: 10
    },
    cheese: {
        name: "Сыр",
        price: 400,
        kcall: 30
    },
}

// Кнопки + и - товара
const btnPlusOrMinus = document.querySelectorAll('.main__product-btn');

// Чекбоксы ингредиентов
const checkExtraProduct = document.querySelectorAll('.main__product-checkbox');

// Кнопка Заказать
const addCart = document.querySelector('.addCart');

// Модальное окно Чека
const receipt = document.querySelector('.receipt');

// Описание Чека
const receiptOut = document.querySelector('.receipt__window-out');

// Основной блок Чека
const receiptWindow = document.querySelector('.receipt__window');

// кнопка Оплатить
const receiptBtn = document.querySelector('.receipt__window-btn');

// Перебираем добавить или отнять продукт
for (let i = 0; i < btnPlusOrMinus.length; i++) {
    btnPlusOrMinus[i].addEventListener("click", function () {
        // если было нажатие, то запустим функцию
        plusOrMinus(this)
    })
}

function plusOrMinus(element) {
    // closest() - метод объекта возвращает указанного потомка
    const parent = element.closest(".main__product");
    // hasAttribute("name") - возвращает true если атрибут есть
    // setAttribute("name", "value") - добавляет атрибут со значением
    // removetAttribute("name") - удаляет атрибут
    // gettAttribute("name") - возвращает значение атрибута
    const parentId = parent.getAttribute("id") // получаем значение атрибута ID секции
    console.log(parentId);
    const elementData = element.getAttribute("data-symbol"); // получаем знак операции из атрибута "data-symbol"
    if (elementData == "+" && product[parentId].amount < 10) {
        product[parentId].amount++;
    } else if (elementData == "-" && product[parentId].amount > 0) {
        product[parentId].amount--;
    }

    const out = parent.querySelector(".main__product-num"); // в секции подключаемся к полю количества товара
    const price = parent.querySelector(".main__product-price span"); // в секции подключаемся к полю цена
    const kcall = parent.querySelector(".main__product-kcall span"); // в секции подключаемся к пол. калории

    out.innerHTML = product[parentId].amount;
    price.innerHTML = product[parentId].Summ;
    kcall.innerHTML = product[parentId].Kcall;
}

// Перебериаем чекбоксы
for (let i = 0; i < checkExtraProduct.length; i++) {
    checkExtraProduct[i].addEventListener("click", function () {
        // если было нажатие то запускаем функция addExtraProduct()
        addExtraProduct(this)
    })
}
// Функция для работы чекбокса
function addExtraProduct(element) {
    const parent = element.closest(".main__product"); // бургер к котрому относится чекбокс
    const parentId = parent.id; // название бургера (ключ)
    const elAtr = element.getAttribute("data-extra") // название чекбокса (ключ)
    product[parentId][elAtr] = element.checked;
    if (product[parentId][elAtr] == true) {
        product[parentId].price += extraProduct[elAtr].price
        product[parentId].kcall += extraProduct[elAtr].kcall
    } else {
        product[parentId].price -= extraProduct[elAtr].price
        product[parentId].kcall -= extraProduct[elAtr].kcall
    }
    const price = parent.querySelector('.main__product-price span');
    const kcall = parent.querySelector('.main__product-kcall span');
    price.innerHTML = product[parentId].Summ;
    kcall.innerHTML = product[parentId].Kcall;
}


// Вывод стоимости заказа
let arrayProduct = [] // выбранная продукция
let totalName = "" // список выбранных продуктов
let totalPrice = 0 // общая стоимость
let totalKcall = 0 // общая калорийность

addCart.addEventListener("click", function () {
    // Перебираем весь объект
    for (const key in product) {
        // po - (productObject) сам продукт с ключами
        const po = product[key]
        // пропускаем только товар с количеством больше 0
        if (po.amount > 0) {
            // добавляем в массив выбранные товары
            arrayProduct.push(po)
        }
    }
})
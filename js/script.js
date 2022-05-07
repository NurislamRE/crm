'use strict';

let goods = [
    {
        "id": 1,
        "name": "Смартфон Xiaomi 11T 8/128GB",
        "price": 27000,
        "description": "Смартфон Xiaomi 11T – это представитель флагманской линейки, выпущенной во второй половине 2021 года. И он полностью соответствует такому позиционированию, предоставляя своим обладателям возможность пользоваться отличными камерами, ни в чем себя не ограничивать при запуске игр и других требовательных приложений.",
        "category": "mobile-phone",
        "discont": false,
        "count": 3,
        "units": "шт",
        "images": {
            "small": "img/smrtxiaomi11t-m.jpg",
            "big": "img/smrtxiaomi11t-b.jpg"
        }
    },
    {
        "id": 2,
        "name": "Радиоуправляемый автомобиль Cheetan",
        "price": 4000,
        "description": "Внедорожник на дистанционном управлении. Скорость 25км/ч. Возраст 7 - 14 лет",
        "category": "toys",
        "discont": 5,
        "count": 1,
        "units": "шт",
        "images": {
            "small": "img/cheetancar-m.jpg",
            "big": "img/cheetancar-b.jpg"
        }
    },
    {
        "id": 3,
        "name": "ТВ приставка MECOOL KI",
        "price": 12400,
        "description": "Всего лишь один шаг сделает ваш телевизор умным, Быстрый и умный MECOOL KI PRO, прекрасно спроектированный, сочетает в себе прочный процессор Cortex-A53 с чипом Amlogic S905D",
        "category": "tv-box",
        "discont": 15,
        "count": 4,
        "units": "шт",
        "images": {
            "small": "img/tvboxmecool-m.jpg",
            "big": "img/tvboxmecool-b.jpg"
        }
    },
    {
        "id": 4,
        "name": "Витая пара PROConnect 01-0043-3-25",
        "price": 22,
        "description": "Витая пара Proconnect 01-0043-3-25 является сетевым кабелем с 4 парами проводов типа UTP, в качестве проводника в которых используется алюминий, плакированный медью CCA. Такая неэкранированная витая пара с одножильными проводами диаметром 0.50 мм широко применяется в процессе сетевых монтажных работ. С ее помощью вы сможете обеспечить развертывание локальной сети в домашних условиях или на предприятии, объединить все необходимое вам оборудование в единую сеть.",
        "category": "cables",
        "discont": false,
        "count": 420,
        "units": "v",
        "images": {
            "small": "img/lan_proconnect43-3-25.jpg",
            "big": "img/lan_proconnect43-3-25-b.jpg"
        }
    }
];

{
    const createRow = (goodNumber, goodObject) => {
        const element = `
    <tr>
        <td class="table__cell ">${goodNumber}</td>
        <td class="table__cell table__cell_left table__cell_name" data-id="${goodObject.id}">
            <span class="table__cell-id">id: ${goodObject.id}</span>${goodObject.name}</td>
        <td class="table__cell table__cell_left">${goodObject.category}</td>
        <td class="table__cell">${goodObject.units}</td>
        <td class="table__cell">${goodObject.count}</td>
        <td class="table__cell">${goodObject.price}</td>
        <td class="table__cell">${goodObject.price * goodObject.count}</td>
        <td class="table__cell table__cell_btn-wrapper">
            <button class="table__btn table__btn_pic"></button>
            <button class="table__btn table__btn_edit"></button>
            <button class="table__btn table__btn_del"></button>
        </td>
    </tr>
        `;
        return element;
    }

    const closeModal = () => {
        const overlay  = document.querySelector('.overlay');
        overlay.classList.remove('active');
    };
    const closeButton = document.querySelector('.modal__close');
    closeButton.addEventListener('click', () => {
        closeModal();
    });

    const renderGoods = arrayGoods => {

        document.querySelector('tbody').innerHTML = "";

        const goods = arrayGoods;
        let goodNumber = 0;

        goods.forEach(goodObject => {
            goodNumber++;
            const element = createRow(goodNumber, goodObject);
            addToBody(element);
        });
    }

    const addToBody = element => {
        const body =  document.querySelector('tbody');
        body.insertAdjacentHTML('beforeend', element);
    }

    const addGodsBtn = document.querySelector('.panel__add-goods');
    const vendorCode_Id = document.querySelector('.vendor-code__id');
    addGodsBtn.addEventListener('click', () => {
        const overlay  = document.querySelector('.overlay');
        overlay.classList.add('active');           
        const vendorCode = Math.round(Math.random() * (10 ** 14));
        vendorCode_Id.textContent = vendorCode;
    });

    const computeTotalPriceOfGoods = goods => {
        let totalPriceOfGoods = goods.reduce((total, item) => {
            console.log(item.discont);
            if (!Number.isNaN(item.discont)) {
                return total + (item.price * item.count - item.discont);
            }
            else return total + (item.price * item.count);
        }, 0);
        const crmTotalPrice = document.querySelector('.crm__total-price');
        crmTotalPrice.textContent = `$ ${totalPriceOfGoods}`;
    };  

    const tbody  = document.querySelector('tbody');
    tbody.addEventListener('click', e => {
        const target = e.target;

        if (target.classList.contains('table__btn_del')) {
            const parentTr = target.closest('tr');
            const id = parentTr.children[1].getAttribute('data-id');
            goods = goods.filter(item => item.id != id);
            parentTr.remove();
            computeTotalPriceOfGoods(goods);
            renderGoods(goods);
        }
    });


    const modalForm = document.querySelector('.modal__form');

    modalForm.discount.addEventListener('change', e => {
        if (e.target.checked) {
            modalForm.discount_count.toggleAttribute('disabled');
            modalForm.discount_count.value = '';
        } else {
            modalForm.discount_count.setAttribute('disabled', 'disabled');
            modalForm.discount_count.value = '';
        }
        
    });

    modalForm.addEventListener('submit', e => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const product = Object.fromEntries(formData);
        console.log(product.discount_count);
        if (typeof product.discount_count === 'undefined'){
            product.discont = 0;
        }
                
            else
                product.discont = product.discount_count;

        product.id = vendorCode_Id.textContent;
        const newRow = createRow(goods.length + 1, product);
        addToBody(newRow);
        goods.push(product);
        computeTotalPriceOfGoods(goods);
        closeModal();
    });

        
    const computeCurrentModalTotalPrice = () => {
        if (!Number.isNaN(modalForm.count.value) && !Number.isNaN(modalForm.price.value)) {
            let totalPrice = modalForm.count.value * modalForm.price.value;
            if (!Number.isNaN(modalForm.discount_count.value))
                totalPrice -= modalForm.discount_count.value;
    
            modalForm.total.textContent = totalPrice;
        }
    };

    modalForm.count.addEventListener('change', computeCurrentModalTotalPrice);
    modalForm.price.addEventListener('change', computeCurrentModalTotalPrice);
    modalForm.discount_count.addEventListener('change', computeCurrentModalTotalPrice);    



    const init = () => {
        computeTotalPriceOfGoods(goods);
        renderGoods(goods);
    }
    init();
}

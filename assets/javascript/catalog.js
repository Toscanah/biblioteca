import { CatalogItem } from "./components/CatalogItem.js";

const catalog = document.getElementById('catalog');

let search = '';
getElements();

const searchForm = document.getElementById('search-form');
const searchInput = searchForm.querySelector('input');

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
});

searchInput.addEventListener('input', () => {
    search = searchInput.value;
    getElements();
});

const cancel = document.getElementById('cancel');
cancel.addEventListener('click', () => {
    searchInput.value = '';
    search = '';
    getElements();
});

document.querySelectorAll('.filter').forEach(element => {
    element.addEventListener('click', () => {
        element.classList.toggle('active-filter');

        if (element.classList.contains('active-filter')) {
            element.innerHTML = `
                <!--<img src="../../assets/images/select.svg"/>-->
                ${element.textContent.trim()}`;
        } else {
            element.innerHTML = `${element.textContent.trim()}`;
        }

        getElements();
    });
});

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } else {
            entry.target.classList.remove('show');
        }
    });
});

function getElements() {
    while (catalog.firstChild) {
        catalog.removeChild(catalog.firstChild);
    }

    fetch('../php/getElements.php', {
        method: 'POST',
        body: JSON.stringify({
            elementFilters: Array.from(document.getElementsByClassName('active-filter'))
                .map(filter => filter.textContent.trim()),
            searchFilters: search,
        })
    })
        .then((response) => response.json())
        .then((products) => {
            console.log(products);
            let currentRow = null;

            const pageNumber = document.querySelector('.index.selected').querySelector('p').textContent - 1;
            const productsPerPage = 10;
            const startIndex = pageNumber * productsPerPage;
            const endIndex = startIndex + productsPerPage;
            const currentProducts = products.slice(startIndex, endIndex);

            if (currentProducts.length === 0) {
                currentRow = document.createElement('div');
                currentRow.classList.add('no-products');
                currentRow.innerHTML = `
                    <h1 style="font-size: 5em;">Nessun prodotto!</h1>
                    <p style="font-size: 1.8em;">prova ad utilizzare un filtro diverso.</p>`;
                catalog.appendChild(currentRow);
            }

            for (let i = 0; i < currentProducts.length; i++) {
                let product = currentProducts[i];

                if (i % 2 === 0) {
                    currentRow = document.createElement('div');
                    currentRow.classList.add('catalog-row');
                    catalog.appendChild(currentRow);
                }

                const item = new CatalogItem(currentRow, product);
                item.createItem();

                setTimeout(() => {
                    observer.observe(item.getContainer());
                }, 100 * i);
            }
        })
        .catch((error) => console.log(error));
}

const login = document.getElementById('login');

function getCookie(name) {
    const cookies = document.cookie.split('; ');
    for (const cookie of cookies) {
        const [cookieName, cookieValue] = cookie.split('=');
        if (cookieName === name) {
            return cookieValue;
        }
    }
    return '';
}

function createInitialsElement(user, url) {
    const initials = document.createElement('h1');
    initials.textContent = user.slice(0, 2).toUpperCase();
    login.href = url;

    if (user === getCookie('staff')) {
        login.style.color = 'red';
    }

    login.appendChild(initials);
}

function createLoginIconElement(url) {
    const loginIcon = document.createElement('img');
    loginIcon.src = '../../assets/images/login_icon.svg';
    login.href = url;
    login.appendChild(loginIcon);
}

function createLogout() {
    const rightCorner = document.getElementById('right-corner');
    const logout = document.createElement('img');
    logout.src = '../../assets/images/logout.svg';
    logout.title = 'Esci';
    logout.addEventListener('click', () => {
        let cookies = document.cookie.split(";");

        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i];
            let eqPos = cookie.indexOf("=");
            let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
        }

        window.location.reload();
    });

    rightCorner.appendChild(logout);
}

const logged = getCookie('logged');
if (logged) {
    const user = getCookie('user');
    const staff = getCookie('staff');

    if (user) {
        createInitialsElement(user, 'user-page.html');
    }

    if (staff) {
        /*const rightCorner = document.getElementById('right-corner');
        const addProduct = document.createElement('img');
        addProduct.src = '../../assets/images/add.svg';
        addProduct.title = 'Aggiungi prodotto';
        addProduct.addEventListener('click', () => {
            window.location.href = 'admin/add-product.html';
        });

        rightCorner.insertBefore(addProduct, rightCorner.firstChild);*/
        createInitialsElement(staff, 'admin/to_be_named.html');
    }

    createLogout();
} else {
    createLoginIconElement('login-page.html');
}
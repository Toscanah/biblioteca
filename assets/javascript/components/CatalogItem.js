export class CatalogItem {
    constructor(parentContainer, product) {
        this.parentContainer = parentContainer;
        this.product = product;
        this.container = null;
    }

    getCookie(name) {
        const cookies = document.cookie.split('; ');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i];
            if (cookie.indexOf(name) === 0) {
                return cookie.substring(name.length + 1);
            }
        }
        return null;
    }

    isLogged() {
        const loggedInCookie = document.cookie
            .split('; ')
            .find(cookie => cookie.startsWith('logged='));
        return loggedInCookie !== undefined;
    }

    createItem() {
        this.createContainer();
        const image = this.createImage();
        const infoDiv = this.createInfoDiv();
        const title = this.createTitle();
        const autors = this.createAutors();
        const rating = this.createRating();
        const infoDialog = this.createInfoDialog(title);
        const button = this.createButton();

        this.container.appendChild(image);
        this.container.appendChild(infoDiv);
        infoDiv.appendChild(title);
        infoDiv.appendChild(autors);
        infoDiv.appendChild(rating);
        infoDiv.appendChild(infoDialog);
        infoDiv.appendChild(button);
        //infoDiv.appendChild(statusMessage);

        this.parentContainer.appendChild(this.container);
    }

    createContainer() {
        this.container = document.createElement('div');
        this.container.classList.add('catalog-item', 'observer-element');
    }

    createImage() {
        const image = document.createElement('img');
        image.src = '../../assets/images/products/' + this.product.foto;
        image.setAttribute('id', 'cover');
        return image;
    }

    createInfoDiv() {
        const infoDiv = document.createElement('div');
        infoDiv.classList.add('item-info');
        return infoDiv;
    }

    createTitle() {
        const title = document.createElement('h1');
        title.classList.add('item-title');
        title.textContent = this.product.titolo;
        return title;
    }

    createAutors() {
        const autors = document.createElement('div');
        autors.classList.add('item-autors');
        autors.innerHTML = `<p>di <b>${this.product.autori}</b></p>`;
        return autors;
    }

    createRating() {
        const rating = document.createElement('div');
        rating.classList.add('item-rating');

        let i = 0;
        for (i = 0; i < parseInt(this.product.rating); i++) {
            let image = document.createElement('img');
            image.src = '../../assets/images/rating.svg';
            rating.innerHTML += image.outerHTML;
        }

        for (let j = i; j < 5; j++) {
            let image = document.createElement('img');
            image.src = '../../assets/images/rating_empty.svg';
            rating.innerHTML += image.outerHTML;
        }

        return rating;
    }

    createInfoDialog(title) {
        const displayInfo = document.createElement('div');
        displayInfo.classList.add('display-info');

        const infoText = document.createElement('div');
        infoText.classList.add('info-text');
        infoText.textContent = 'Mostra informazioni';

        const toggleBtn = document.createElement('img');
        toggleBtn.src = '../../assets/images/arrow_down.svg';
        toggleBtn.classList.add('toggle-btn');

        infoText.addEventListener('click', function () {
            displayInfo.classList.toggle('active');
            toggleBtn.classList.toggle('rotated');
        });

        infoText.appendChild(toggleBtn);
        displayInfo.appendChild(infoText);

        const content = document.createElement('div');
        content.classList.add('content');

        content.innerHTML = `
            <p class="info-item"><img src="../../assets/images/tag.svg"/> ISBN: <b>${this.product.isbn}</b></p>
            <!--<p class="info-item"><img src="../../assets/images/status.svg"/> Stato: <b>${this.product.stato}</b></p>-->
            <p class="info-item"><img src="../../assets/images/type.svg"/> Tipo: <b>${this.product.tipo}</b></p>
            <p class="info-item"><img src="../../assets/images/wrote.svg"/> Anno pubblicazione: <b>${this.product.annoPubblicazione}</b></p>
            <p class="info-item"><img src="../../assets/images/place.svg"> Biblioteca: <b>${this.product.nomeBiblioteca}</b></p>`;


        if (this.product.volume) {
            title.innerHTML += `
                <!--<p class="info-item"><img src="../../assets/images/list.svg"/> Volume: <b>${this.product.volume}</b></p>-->
                (vol. ${this.product.volume})`;
        }

        if (this.product.annoRiferimento) {
            title.innerHTML += `
                <!--<p class="info-item"><img src="../../assets/images/search.svg"/> Anno riferimento: <b>${this.product.annoRiferimento}</b></p>-->
                (${this.product.annoRiferimento})`;
        }

        displayInfo.appendChild(content);
        return displayInfo;
    }

    createButton() {
        const isbn = this.product.isbn;

        if (this.getCookie('staff')) {
            const adminButton = document.createElement('button');
            adminButton.classList.add('mdc-button', 'mdc-button--raised');
            adminButton.setAttribute('id', 'manage');
            adminButton.innerHTML = `
                <span class="mdc-button__ripple"></span>
                <span class="mdc-button__focus-ring"></span>
                <span class="mdc-button__label">GESTISCI PRENOTAZIONI</span>`;
            adminButton.addEventListener('click', (e) => {
                window.location.href = `admin/reservations-page.html?isbn=${isbn}`;
            });

            return adminButton;
        }

        const userButton = document.createElement('button');
        userButton.classList.add('mdc-button', 'mdc-button--raised');
        userButton.setAttribute('id', 'book');
        userButton.innerHTML = `
            <span class="mdc-button__ripple"></span>
            <span class="mdc-button__focus-ring"></span>
            <span class="mdc-button__label">PRENOTA</span>`;
        userButton.addEventListener('click', (e) => {
            var logged = this.isLogged();

            window.location.href = !logged ?
                `login-page.html?from=catalog&isbn=${isbn}` :
                `book-product-page.html?isbn=${isbn}`;
        });

        if (this.product.stato === 'prenotato' || this.product.stato === 'prestato') {
            const div = document.createElement('div');
            
            if (this.getCookie('user')) {
                fetch('../php/isBookByUser.php', {
                    method: 'POST',
                    body: JSON.stringify({
                        userId: this.getCookie('user').charAt(2),
                        elementId: this.product.idElemento,
                    })
                })
                    .then(response => response.json())
                    .then((data) => {
                        console.log(data);
                        if (data.result === true) {
                            div.innerHTML = `
                                <div class="already-booked">
                                    <p class="a"><img src="../../assets/images/excla.svg"/> Prodotto già prenotato</p>
                                </div>`;
                        } else {
                            div.innerHTML = `
                                <div class="already-booked">
                                    <p class="a"><img src="../../assets/images/excla.svg"/> Prodotto già prenotato</p>
                                    <p>Clicca <a href="book-product-page.html?isbn=${isbn}">qui</a> per metterti in coda</p>
                                </div>`;
                        }

                    });
                return div;
            } else {
                div.innerHTML = `
                    <div class="already-booked">
                        <p class="a"><img src="../../assets/images/excla.svg"/> Prodotto già prenotato</p>
                        <p>Clicca <a href="login-page.html?from=catalog&isbn=${isbn}">qui</a> per metterti in coda</p>
                    </div>`

                return div;
            }

        } else {
            return userButton;
        }
    }

    getContainer() {
        return this.container;
    }
}
export class CatalogItem {
    constructor(parentContainer, product) {
        this.parentContainer = parentContainer;
        this.product = product;
        this.container = null;
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
        const infoDialog = this.createInfoDialog();
        const button = this.createButton();

        // TODO: aggiungere funzionalità staff
        // chainare le isbn + titolo per risparmiare un fetch
        // window.location.href = 'admin/reservations.html?isbn=' + isbn
        // window.location.href = 'admin/reservations.html?titolo=' + titolo

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
        autors.innerHTML = `
            <p>di <b>${this.product.autori}</b></p>
        `;
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

    createInfoDialog() {
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

        // TODO: volume per le enciclopedia e anno riferimento per cartine geopoltiche
        content.innerHTML = `
            <p class="info-item"><img src="../../assets/images/tag.svg"/> ISBN: <b>${this.product.isbn}</b></p>
            <!--<p class="info-item"><img src="../../assets/images/status.svg"/> Stato: <b>${this.product.stato}</b></p>-->
            <p class="info-item"><img src="../../assets/images/book_icon.svg"/> Tipo: <b>${this.product.tipo}</b></p>
            <p class="info-item"><img src="../../assets/images/wrote.svg"/> Anno pubblicazione: <b>${this.product.annoPubblicazione}</b></p>`;

        if (this.product.volume) {
            content.innerHTML += `
                <p class="info-item"><img src="../../assets/images/list.svg"/> Volume: <b>${this.product.volume}</b></p>`;
        }

        if (this.product.annoRiferimento) {
            content.innerHTML += `
                <p class="info-item"><img src="../../assets/images/search.svg"/> Anno riferimento: <b>${this.product.annoRiferimento}</b></p>`;
        }


        displayInfo.appendChild(content);

        return displayInfo;
    }

    createButton() {
        const isbn = this.product.isbn;
        const button = document.createElement('button');
        button.classList.add('mdc-button', 'mdc-button--raised');
        button.setAttribute('id', 'book');
        button.innerHTML = `
            <span class="mdc-button__ripple"></span>
            <span class="mdc-button__focus-ring"></span>
            <span class="mdc-button__label">
                ${this.product.stato === 'disponibile' ? 'PRENOTA' : 'INCODATI'}
            </span>`;
        button.addEventListener('click', (e) => {
            var logged = this.isLogged();
            console.log(logged);

            window.location.href = !logged ?
                `login-page.html` :
                `book-product-page.html?isbn=${isbn}`;
        });

        if (this.product.stato === 'prenotato') {
            const div = document.createElement('div');

            div.innerHTML = `
                <div class="already-booked">
                    <p class="a"><img src="../../assets/images/excla.svg"/> Prodotto già in prestito</p>
                    <p>Clicca <a href="">qui</a> per metterti in coda</p>
                </div>`;
            return div;
        }

        return button;
    }

    getContainer() {
        return this.container;
    }
}
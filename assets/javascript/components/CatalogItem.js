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
        const library = this.createLibrary();
        const button = this.createButton(infoDiv);

        // descrizione
        /*const desc = document.createElement('p');
        desc.textContent = this.product.descrizione + 'TODO: da fare meglio le info';
        infoDiv.appendChild(desc);*/

        // TODO: aggiungere funzionalità staff
        // chainare le isbn + titolo per risparmiare un fetch
        // window.location.href = 'admin/reservations.html?isbn=' + isbn
        // window.location.href = 'admin/reservations.html?titolo=' + titolo

        this.container.appendChild(image);
        this.container.appendChild(infoDiv);
        infoDiv.appendChild(title);
        infoDiv.appendChild(library);
        infoDiv.appendChild(button);

        this.parentContainer.appendChild(this.container);
    }

    createContainer() {
        this.container = document.createElement('div');
        this.container.classList.add('catalog-item', 'observer-element');
    }

    createImage() {
        const image = document.createElement('img');
        image.src = '../../assets/images/products/' + this.product.foto;
        return image;
    }

    createInfoDiv() {
        const infoDiv = document.createElement('div');
        infoDiv.classList.add('item-info');
        return infoDiv;
    }

    createTitle() {
        const title = document.createElement('h1');
        title.textContent = this.product.titolo + ' (' + this.product.autori + ')';
        return title;
    }

    createLibrary() {
        const library = document.createElement('h3');
        library.textContent = '- ' + this.product.nomeBiblioteca;
        return library;
    }

    createButton(infoDiv) {
        const isbn = this.product.isbn;
        const button = document.createElement('button');
        button.classList.add('mdc-button', 'mdc-button--raised');
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
                'login-page.html' :
                `book-product-page.html?isbn=${isbn}`;
        });

        if (this.product.stato === 'prenotato') {
            const bookedMsg = document.createElement('div');
            bookedMsg.innerHTML = `
                <p>Questo prodotto è già stato acquistato!</p>
                <p>TODO: messaggio "mettiti in coda"</p>`;
            infoDiv.appendChild(bookedMsg);
        }

        return button;
    }

    getContainer() {
        return this.container;
    }
}
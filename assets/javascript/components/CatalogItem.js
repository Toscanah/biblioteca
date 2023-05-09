export class CatalogItem {
    constructor(parentContainer, product) {
        this.parentContainer = parentContainer;
        this.product = product;
        this.container = null;
    }

    createItem() {
        const container = document.createElement('div');
        this.container = container;
        container.classList.add('catalog-item', 'observer-element');

        // immagine
        const image = document.createElement('img');
        image.src = '../images/products/' + this.product.foto;
        container.appendChild(image);

        // div informazioni
        const infoDiv = document.createElement('div');
        infoDiv.classList.add('item-info');
        container.appendChild(infoDiv);

        // titolo
        const title = document.createElement('h1');
        title.textContent = this.product.titolo + ' (' + this.product.autori + ')';
        infoDiv.appendChild(title);

        // biblioteca
        const library = document.createElement('h3');
        library.textContent = '- ' + this.product.nomeBiblioteca;
        infoDiv.appendChild(library);

        // descrizione
        /*const desc = document.createElement('p');
        desc.textContent = this.product.descrizione + 'TODO: da fare meglio le info';
        infoDiv.appendChild(desc);*/

        const isbn = this.product.isbn;

        const button = document.createElement('button');
        button.classList.add('mdc-button', 'mdc-button--raised');
        button.innerHTML = `
                <span class="mdc-button__ripple"></span>
                <span class="mdc-button__focus-ring"></span>`;
        button.setAttribute('id', 'book');

        // TODO: aggiungere funzionalità staff
        // chainare le isbn + titolo per risparmiare un fetch
        // window.location.href = 'admin/reservations.html?isbn=' + isbn
        // window.location.href = 'admin/reservations.html?titolo=' + titolo

        if (this.product.stato === 'disponibile') {
            button.innerHTML += '<span class="mdc-button__label">PRENOTA</span>';
            button.addEventListener('click', (e) => {
                var logged = sessionStorage.getItem('logged');
                if (!logged) {
                    window.location.href = 'login-page.html';
                }
                window.location.href = 'book-product-page.html?isbn=' + isbn;
            });
        } else if (this.product.stato === 'prenotato') {
            const bookedMsg = document.createElement('div');
            bookedMsg.innerHTML = `
                <p>Questo prodotto è gia' stato acquistato!</p>
                <p>TODO: messaggio "mettiti in coda"</p>`;
            infoDiv.appendChild(bookedMsg);
            button.innerHTML += '<span class="mdc-button__label">INCODATI</span>';
        }

        infoDiv.appendChild(button);
        this.parentContainer.appendChild(container);
    }

    getContainer() {
        return this.container;
    }
}
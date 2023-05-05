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

        // TODO: bottoni
        const button = document.createElement('button');
        const isbn = this.product.isbn;
        button.type = 'submit';
        button.classList.add('mdc-button', 'mdc-button--raised');
        button.innerHTML = `
                <span class="mdc-button__ripple"></span>
                <span class="mdc-button__focus-ring"></span>
                <span class="mdc-button__label">PRENOTA</span>`;
        button.setAttribute('id', 'book');

        if (this.product.stato === 'disponibile') {
            button.addEventListener('click', (e) => {
                // TODO: checckare se l'utente (o staff) è loggato
                // se si, allora OK pagina prenotazione
                // else pagina login

                /** (aggiungere una variabile di sessione in php quando si fa il login)
                 * var variableValue = sessionStorage.getItem('is Logged1');*/

                window.location.href = 'book.html?isbn=' + isbn;
            });
        } else if (this.product.stato === 'prenotato') {
            // TODO: spawnare il bottone "mettiti in coda"
            button.setAttribute('disabled', true);
            button.querySelector('.mdc-button__label').textContent = 'GIA\' PRENOTATO';
        }
        infoDiv.appendChild(button);


        this.parentContainer.appendChild(container);
    }

    getContainer() {
        return this.container;
    }
}
const catalog = document.getElementById('catalog');

// TODO: ordinamento e ricerca?

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } else {
            entry.target.classList.remove('show');
        }
    });
});

fetch('../php/catalog.php', {
    method: 'POST'
})
    .then((response) => response.json())
    .then((products) => {
        let currentRow = null;

        const pageNumber = document.getElementById('page').value;
        const productsPerPage = 10;
        const startIndex = pageNumber * productsPerPage;
        const endIndex = startIndex + productsPerPage;
        const currentProducts = products.slice(startIndex, endIndex);

        for (let i = 0; i < currentProducts.length; i++) {
            let singleProduct = currentProducts[i];
            //console.log(singleProduct);

            if (i % 2 === 0) {
                currentRow = document.createElement('div');
                currentRow.classList.add('catalog-row');
                catalog.appendChild(currentRow);
            }

            const product = document.createElement('div');
            product.classList.add('catalog-item', 'observer-element');


            // immagine
            const image = document.createElement('img');
            image.src = '../images/products/' + singleProduct.foto;
            product.appendChild(image);

            // div informazioni
            const infoDiv = document.createElement('div');
            infoDiv.classList.add('item-info');
            product.appendChild(infoDiv);

            // titolo
            const title = document.createElement('h1');
            title.textContent = singleProduct.titolo + ' (' + singleProduct.autori + ')';
            infoDiv.appendChild(title);

            // biblioteca
            const library = document.createElement('h3');
            library.textContent = '- ' + singleProduct.nomeBiblioteca;
            infoDiv.appendChild(library);

            // descrizione
            const desc = document.createElement('p');
            desc.textContent = singleProduct.descrizione + 'TODO: da fare meglio le info';
            infoDiv.appendChild(desc);

            // bottone prenota
            const button = document.createElement('button');
            button.type = 'submit';
            button.classList.add('mdc-button', 'mdc-button--raised');
            button.innerHTML = `
                <span class="mdc-button__ripple"></span>
                <span class="mdc-button__focus-ring"></span>
                <span class="mdc-button__label">PRENOTA</span>`;
            infoDiv.appendChild(button);

            // animazioni (observer)
            setTimeout(() => {
                observer.observe(product);
            }, 100 * i);

            currentRow.appendChild(product);
        }

    })
    .catch((error) => console.log(error));



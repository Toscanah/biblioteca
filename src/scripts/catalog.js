const catalog = document.getElementById('catalog');

// TODO: ordinamento e ricerca?

fetch('../php/catalog.php', {
    method: 'POST'
})
    .then((response) => response.json())
    .then((products) => {
        console.log(products)
        let currentRow = null;

        for (let i = 0; i < products.length; i++) {
            if (i % 2 === 0) {
                currentRow = document.createElement('div');
                currentRow.classList.add('catalog-row');
                catalog.appendChild(currentRow);
            }

            const product = document.createElement('div');
            product.classList.add('catalog-item');
            product.textContent = products[i].titolo;

            const image = document.createElement('img');
            image.src = '../images/products/' + products[i].foto;
            product.appendChild(image);

            currentRow.appendChild(product);
        }
    })
    .catch((error) => console.log(error));
const publishers = document.getElementById('publishers');

fetch('../../php/admin/getPublishers.php')
    .then(response => response.json())
    .then(data => {
        for (const publisher of data) {
            const pub = document.createElement('li');

            pub.classList.add('mdc-list-item');
            pub.dataset.value = publisher.nome;
            pub.innerHTML = `
                <span class="mdc-list-item__ripple"></span>
                <span class="mdc-list-item__text">${publisher.nome}</span>`;

            publishers.appendChild(pub);
        }
    });

function createItem(name, id) {
    const item = document.createElement('li');

    item.classList.add('mdc-list-item');
    item.dataset.value = id;
    item.innerHTML = `
          <span class="mdc-list-item__ripple"></span>
          <span class="mdc-list-item__text">${name}</span>`;

    return item;
}

function fetchItems(container, list, dataKey) {
    fetch('../../php/admin/getElementPlaces.php', {
        method: 'POST',
        body: JSON.stringify({
            [dataKey]: container
                .querySelector('[aria-selected="true"]')
                .getAttribute('data-value')
        })
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);

            /**
             * PROBLEMA: quando riseleziona per esempio una nuova biblioteca
             * tutti gli altri select rimangono con i valori vecchi
             * il fix sarebbe togliere sia dalla lista delle opzioni
             * sia dal ".mdc-select__selected-text" l'html
             * 
             * problema però: nella funzione io ho solo il container grande della biblioteca
             * e la lista dove mettere le opzioni
             * 
             * allora TODO: reworfare il sistema senza avere il container grande
             * e la lista dove mettere le opzioni, ma avere solamente il container grande
             * e il container grande per poi dove mettere le opzioni.
             * 
             * Cosi posso fare una querySelect e mettere l'html vuoto
             * 
             * (teoricamente potrei fare questa cosa per tutti i select)
             * 
             * 
             */

            if (data && data.length > 0) {
                for (const item of data) {
                    const existingItem = list.querySelector(`[data-value="${item.id}"]`);

                    if (!existingItem) {
                        list.appendChild(createItem(item.info, item.id));
                    }
                }
            } else {
                list.innerHTML = '';
                container.querySelector('.mdc-select__selected-text').innerHTML = '';
            }
        });
}

const libraryContainer = document.getElementById('library-container');
const library = libraryContainer.querySelector('#library');

const roomContainer = document.getElementById('room-container');
const room = roomContainer.querySelector('#room');

const closetContainer = document.getElementById('closet-container');
const closet = closetContainer.querySelector('#closet');

const shelfContainer = document.getElementById('shelf-container');
const shelf = shelfContainer.querySelector('#shelf');

fetch('../../php/admin/getLibraries.php')
    .then(response => response.json())
    .then(data => {
        for (const item of data) {
            library.appendChild(createItem(item.nome, item.id));
        }
    });

libraryContainer.addEventListener('click', () => {
    fetchItems(
        libraryContainer, room, 'library',
    );
});

roomContainer.addEventListener('click', () => {
    fetchItems(
        roomContainer, closet, 'room',
    );
});

closetContainer.addEventListener('click', () => {
    fetchItems(
        closetContainer, shelf, 'closet',
    );
});
const authorRow = document.getElementById('author-row');
const firstAuthor = document.getElementById('first-author');

let counter = 1;

firstAuthor.addEventListener('click', () => {


    let currentAuthor = firstAuthor
        .querySelector('.mdc-list-item.mdc-list-item--selected')
        .querySelector('.mdc-list-item__text').innerHTML;
    console.log("current: " + currentAuthor);
    if (currentAuthor !== 'Seleziona...') {
        //

        if (!authorRow.querySelector('#author' + counter)) {
            counter++;
            var newAuthor = document.createElement('div');
            newAuthor.setAttribute('data-mdc-auto-init', 'MDCSelect');
            newAuthor.classList.add('mdc-select', 'mdc-select--filled', 'field');
            newAuthor.id = 'author' + counter;
            newAuthor.innerHTML = `
            <div class="mdc-select__anchor">
                <span class="mdc-select__ripple"></span>
                <span class="mdc-floating-label mdc-floating-label--float-above">Autore</span>
                <span class="mdc-select__selected-text-container">
                    <span class="mdc-select__selected-text">Seleziona...</span>
                </span>
            <span class="mdc-select__dropdown-icon">
              <svg class="mdc-select__dropdown-icon-graphic" viewBox="7 10 10 5" focusable="false">
                <polygon class="mdc-select__dropdown-icon-inactive" stroke="none" fill-rule="evenodd" points="7 10 12 15 17 10"></polygon>
                <polygon class="mdc-select__dropdown-icon-active" stroke="none" fill-rule="evenodd" points="7 15 12 10 17 15"></polygon>
              </svg>
            </span>
            <span class="mdc-line-ripple"></span>
          </div>
        
          <div class="mdc-select__menu demo-width-class mdc-menu mdc-menu-surface">
            <ul class="mdc-list">
              <li class="mdc-list-item" data-value="">
                <span class="mdc-list-item__ripple"></span>
              </li>
              <li class="mdc-list-item mdc-list-item--selected" data-value="0">
                <span class="mdc-list-item__ripple"></span>
                <span class="mdc-list-item__text">Seleziona...</span>
              </li>
            </ul>
          </div>`;

            authorRow.appendChild(newAuthor);
        }
    } else {
        let existingAuthor = authorRow.querySelector('#author' + counter);
        if (existingAuthor) {
            authorRow.removeChild(existingAuthor);
        }
    }

    /*
        if (prevAuthor !== currentAuthor) {
            // l'utente ha selezionato un autore diverso da prima
            prevAuthor = currentAuthor;
    
            console.log("porco dio");
        } else {
            // utente ha selezionat stesso autore
        }
        */
});


const types = document.getElementById('types');
const infoRow = document.getElementById('info-row');

// TODO: porco dio mancano gli autori

types.addEventListener('click', () => {
    const type = types.querySelector('.mdc-select__selected-text');

    switch (type.innerHTML) {
        case 'Enciclopedia':
            //const 

            /*<label data-mdc-auto-init="MDCTextField" class="mdc-text-field mdc-text-field--filled field">
                <span class="mdc-text-field__ripple"></span>
                <span class="mdc-floating-label">Titolo</span>
                <input required type="text" class="mdc-text-field__input" id="title">
                    <span class="mdc-line-ripple"></span>
            </label>*/


            break;
        case 'Cartina':
            break;
    }

    if (type.innerHTML == "Enciclopedia") {

    }
});

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

function fetchItems(container, listContainer, dataKey) {
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

            if (data && data.length > 0) {
                for (const item of data) {
                    const existingItem = listContainer.querySelector(`[data-value="${item.id}"]`);

                    if (!existingItem) {
                        listContainer.querySelector('.mdc-list').appendChild(createItem(item.info, item.id));
                    }
                }
            } else {
                let listContainers = listContainer.querySelectorAll('.mdc-list-item');
                listContainers.forEach(function (listItem) {
                    var dataValue = listItem.getAttribute('data-value');
                    if (dataValue !== null && dataValue !== '') {
                        listItem.parentNode.removeChild(listItem);
                    }
                });
                listContainer.querySelector('.mdc-select__selected-text').innerHTML = '';
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
        libraryContainer, roomContainer, 'library',
    );
});

roomContainer.addEventListener('click', () => {
    fetchItems(
        roomContainer, closetContainer, 'room',
    );
});

closetContainer.addEventListener('click', () => {
    fetchItems(
        closetContainer, shelfContainer, 'closet',
    );
});
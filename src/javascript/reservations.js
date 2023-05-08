const product = document.getElementById('product');
const urlSearchParams = new URLSearchParams(window.location.search);
const isbn = urlSearchParams.get('isbn');

const table = document.getElementById('bookings-table');
const tableBody = table.getElementsByTagName("tbody")[0];

document.getElementById('title').textContent = 'Prenotazioni per "' + urlSearchParams.get('titolo') + '"';

fetch('../../php/admin/getElement.php', {
    method: 'POST',
    body: JSON.stringify({
        isbn: isbn,
    })
})
    .then(response => response.json())
    .then(element => {
        const image = document.createElement('img');
        image.src = '../../images/products/' + element.foto;
        product.appendChild(image);

        const infoDiv = document.createElement('div');
        infoDiv.classList.add('info-div');
        product.appendChild(infoDiv);

        const title = document.createElement('h1');
        title.textContent = element.titolo;
        title.classList.add('product-title');
        infoDiv.append(title);

        const autors = document.createElement('p');
        autors.classList.add('autor');
        autors.innerHTML = `<b>${element.autori}</b>`;
        infoDiv.append(autors);

        const desc = document.createElement('p');
        desc.textContent = element.descrizione;
        desc.classList.add('desc');
        infoDiv.append(desc);

        const library = document.createElement('div');
        library.innerHTML = `<p class="library-name">${element.nomeBiblioteca}</p>`;
        infoDiv.appendChild(library);

        switch (element.tipo) {
            case 'libro':
                break;
            case 'enciclopedia':
                const volume = document.createElement('p');
                volume.textContent = 'Volume: ' + element.volume;
                infoDiv.appendChild(volume);
                break;
            case 'carta geopolitica':
                const dates = document.createElement('p');
                dates.textContent = element.annoPubblicazione + ' ' + element.annoRiferimento;
                infoDiv.appendChild(dates);
                break;
        }

        fetch('../../php/admin/getBookingsById.php', {
            method: 'POST',
            body: JSON.stringify({
                id: element.idElemento
            })
        })
            .then(response => response.json())
            .then(bookings => {
                console.log(bookings);

                for (let i = 0; i < bookings.length; i++) {

                    let booking = bookings[i];

                    let row = tableBody.insertRow(i);
                    let nCell = row.insertCell(0);
                    let nameCell = row.insertCell(1);
                    let surnameCell = row.insertCell(2);
                    let cfCell = row.insertCell(3);
                    let dateCell = row.insertCell(4);

                    nCell.innerHTML = (i + 1);
                    nameCell.innerHTML = booking.nome;
                    surnameCell.innerHTML = booking.cognome;
                    cfCell.innerHTML = booking.cf;
                    dateCell.innerHTML = booking.data;
                }
            });
    });
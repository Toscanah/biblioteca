const product = document.getElementById('product');
const urlSearchParams = new URLSearchParams(window.location.search);
const isbn = urlSearchParams.get('isbn');
let title2;

const table = document.getElementById('bookings-table');
const tableBody = table.getElementsByTagName("tbody")[0];

const confirmationDialog = document.getElementById('confirmation-dialog');

//document.getElementById('title').textContent = 'Prenotazioni per "' + title + '"';

fetch('../../php/admin/getElement.php', {
    method: 'POST',
    body: JSON.stringify({
        isbn: isbn,
    })
})
    .then(response => response.json())
    .then(element => {
        const image = document.createElement('img');
        image.src = '../../../assets/images/products/' + element.foto;
        product.appendChild(image);

        const infoDiv = document.createElement('div');
        infoDiv.classList.add('info-div');
        product.appendChild(infoDiv);

        const title = document.createElement('h1');
        title2 = element.titolo;
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
                let loanedBookingId;

                let alreadyBookedflag = false;
                const alreadyBookedBooking = bookings.find(
                    (booking) => booking.stato === 'in prestito');

                if (alreadyBookedBooking) {
                    alreadyBookedflag = true;
                    loanedBookingId = alreadyBookedBooking.idPrenotazione;
                }

                const allBookingsTerminated = bookings.every(
                    (booking) => booking.stato === 'terminata');

                if (allBookingsTerminated) {
                    const table = document.getElementById('bookings-table');
                    if (table) {
                        table.remove();
                        const bookingsTitlte = document.getElementById('bookings-title');
                        bookingsTitlte.textContent = 'Nessuna prenotazione!';
                    }
                }

                if (alreadyBookedflag) {
                    const collect = document.getElementById('collect');

                    const collectBtn = document.createElement('button');
                    collectBtn.className = 'mdc-button mdc-button--raised';
                    collectBtn.innerHTML = `
                        <span class="mdc-button__ripple"></span>
                        <span class="mdc-button__focus-ring"></span>
                        <span class="mdc-button__label">RITIRA</span>`;
                    collectBtn.addEventListener('click', () => {
                        fetch('../../php/admin/collectItem.php', {
                            method: 'POST',
                            body: JSON.stringify({
                                id: loanedBookingId,
                                elementId: bookings[0].idElemento
                            })
                        })
                            .then(() => {
                                window.location.reload();
                            });
                    });

                    collect.textContent = 'Questo prodotto e\' gia\' in prestito.';
                    collect.appendChild(collectBtn);
                }

                for (let i = 0; i < bookings.length; i++) {
                    let booking = bookings[i];

                    let row = tableBody.insertRow(i);
                    let nCell = row.insertCell(0);
                    let nameCell = row.insertCell(1);
                    let surnameCell = row.insertCell(2);
                    let cfCell = row.insertCell(3);
                    let dateCell = row.insertCell(4);
                    let actionCell = row.insertCell(5);

                    if (booking.stato === 'da confermare') {
                        nCell.innerHTML = (i + 1);
                        nameCell.innerHTML = booking.nome;
                        surnameCell.innerHTML = booking.cognome;
                        cfCell.innerHTML = booking.cf;
                        dateCell.innerHTML = booking.data;

                        const button = document.createElement('button');
                        button.className = 'mdc-button mdc-button--raised';
                        button.innerHTML = `
                            <span class="mdc-button__ripple"></span>
                            <span class="mdc-button__focus-ring"></span>
                            <span class="mdc-button__label">${alreadyBookedflag ? 'IN PRESTITO' : 'CONFERMA'}</span>`;

                        if (alreadyBookedflag) {
                            button.setAttribute('disabled', 'true');
                        }

                        button.addEventListener('click', () => {
                            confirmationDialog.showModal();
                            confirmationDialog.querySelector('#confirm').innerHTML = `
                                Stai confermando la prenotazione di <b>${booking.nome} ${booking.cognome}</b>
                                per <b>${title2}</b>`;
                            confirmationDialog.querySelector('button').addEventListener('click', () => {
                                fetch('../../php/admin/confirmBooking.php', {
                                    method: 'POST',
                                    body: JSON.stringify({
                                        id: booking.idPrenotazione,
                                        isbn: isbn
                                    })
                                })
                                confirmationDialog.close();
                                //window.location.href = '../catalog-page.html?page=1';
                            });
                        });

                        actionCell.appendChild(button);
                    }
                }
            });
    });

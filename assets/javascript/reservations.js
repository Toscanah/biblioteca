const product = document.getElementById('product');
const urlSearchParams = new URLSearchParams(window.location.search);
const isbn = urlSearchParams.get('isbn');
let title2;

const table = document.getElementById('bookings-table');
const tableBody = table.getElementsByTagName("tbody")[0];

const confirmationDialog = document.getElementById('confirmation-dialog');

function getCookie(name) {
    const cookies = document.cookie.split('; ');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        if (cookie.indexOf(name) === 0) {
            return cookie.substring(name.length + 1);
        }
    }
    return null;
}

fetch('../../php/admin/getElement.php', {
    method: 'POST',
    body: JSON.stringify({
        isbn: isbn,
    })
})
    .then(response => response.json())
    .then(element => {
        console.log(element);

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
        title.id = 'element-title';
        infoDiv.append(title);

        const autors = document.createElement('p');
        autors.classList.add('autor');
        autors.innerHTML = `<b>${element.autori}</b>`;
        infoDiv.append(autors);

        const desc = document.createElement('p');
        desc.textContent = element.descrizione;
        desc.classList.add('desc');
        infoDiv.append(desc);

        // posizionamento
        const pos = document.createElement('p');
        pos.classList.add('pos');
        pos.innerHTML = 'Biblioteca <b>' + element.nomeBiblioteca + '</b>: '
            + '<br>- stanza <b>' + element.stanza + '</b> '
            + '<br>- armadio <b>' + element.armadio + '</b> '
            + '<br>- scaffale <b>' + element.scaffale + '</b>';
        infoDiv.appendChild(pos);


        switch (element.tipo) {
            case 'enciclopedia':
                title.innerHTML += ' (vol ' + element.volume + ')';
                break;
            case 'carta geopolitica':
                title.innerHTML += ' (' + element.annoRiferimento + ')';
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
                        const bookingsTitlte = document.getElementById('no-book');
                        bookingsTitlte.textContent = 'Nessuna prenotazione!';
                    }
                }

                let isAdminFromLibrary = true;

                fetch('../../php/admin/isAdminFromLibrary.php', {
                    method: 'POST',
                    body: JSON.stringify({
                        elementId: bookings[0].idElemento,
                        elementType: bookings[0].tipo,
                        staffId: getCookie('staff').charAt(2)
                    })
                })
                    .then((response) => response.json())
                    .then(data => {
                        console.log(data.result)
                        isAdminFromLibrary = data.result;

                        if (alreadyBookedflag && isAdminFromLibrary) {
                            const collect = document.getElementById('collect');

                            document.querySelector('.bookings-container').remove();

                            const collectBtn = document.createElement('button');
                            collectBtn.className = 'mdc-button mdc-button--raised collect-btn';
                            collectBtn.style.marginLeft = '10px';
                            collectBtn.innerHTML = `
                                <span class="mdc-button__ripple"></span>
                                <span class="mdc-button__focus-ring"></span>
                                <span class="mdc-button__label">RITIRA</span>`;
                            collectBtn.addEventListener('click', () => {
                                const modal = document.getElementById('confirmation-dialog-collect');
                                modal.showModal();

                                const closeBtn = document.getElementById('close-btn-collect');
                                closeBtn.onclick = () => modal.close();

                                modal.querySelector('#confirm-collect').innerHTML = `
                                    Stai ritirando <b>${document.getElementById('element-title').innerHTML}</b>`;

                                    modal.querySelector('button').addEventListener('click', () => {
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
                            });

                            collect.innerHTML = '<b>Questo prodotto e\' in prestito</b>';
                            collect.appendChild(collectBtn);
                        }
                    });


                let counter = 0;

                for (let i = 0; i < bookings.length; i++) {
                    let booking = bookings[i];

                    if (booking.stato === 'da confermare') {
                        counter++;

                        let row = tableBody.appendChild(document.createElement("tr"));
                        let nCell = row.insertCell(0);
                        let nameCell = row.insertCell(1);
                        let surnameCell = row.insertCell(2);
                        let cfCell = row.insertCell(3);
                        let dateCell = row.insertCell(4);
                        let actionCell = row.insertCell(5);

                        nCell.innerHTML = counter;
                        nameCell.innerHTML = booking.nome;
                        surnameCell.innerHTML = booking.cognome;
                        cfCell.innerHTML = booking.cf;
                        dateCell.innerHTML = booking.data;

                        const button = document.createElement('button');
                        button.className = 'mdc-button mdc-button--raised confirm-btn';
                        button.innerHTML = `
                            <span class="mdc-button__ripple"></span>
                            <span class="mdc-button__focus-ring"></span>
                            <span class="mdc-button__label">${alreadyBookedflag ? 'IN PRESTITO' : 'CONFERMA'}</span>`;

                        if (alreadyBookedflag) {
                            button.setAttribute('disabled', 'true');
                        }

                        button.addEventListener('click', () => {
                            confirmationDialog.showModal();
                            const closeBtn = document.getElementById('close-btn');
                            closeBtn.onclick = () => confirmationDialog.close();
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
                                window.location.reload();
                            });
                        });

                        actionCell.appendChild(button);
                    }
                }
            });
    });

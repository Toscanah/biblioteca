const booking = document.getElementById('booking');

const cointainer = document.getElementById('booking');
const urlSearchParams = new URLSearchParams(window.location.search);
const isbn = urlSearchParams.get('isbn');

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

const bookElement = () => {
    const modal = document.querySelector('dialog');
    modal.showModal();
    modal.addEventListener("click", (e) => {
        const dialogDimensions = modal.getBoundingClientRect()
        if (
            e.clientX < dialogDimensions.left ||
            e.clientX > dialogDimensions.right ||
            e.clientY < dialogDimensions.top ||
            e.clientY > dialogDimensions.bottom
        ) {
            modal.close()
        }
    })

    const closeBtn = document.getElementById('close-btn');
    closeBtn.onclick = () => modal.close();

    const cf = modal.querySelector('input#cf');
    const cfConfirm = modal.querySelector('input#cf-confirm');
    const userId = getCookie('user').substring(2);
    fetch('../php/booking/getUserCF.php', {
        method: 'POST',
        body: JSON.stringify({ userId: userId })
    })
        .then((response) => response.json())
        .then((data) => {
            cf.value = data.cf;
            cf.setAttribute('disabled', true);
        });

    const bookBtn = document.getElementById('book-btn');
    bookBtn.onclick = () => {
        if (cf.value === cfConfirm.value) {
            fetch('../php/booking/addBooking.php', {
                method: 'POST',
                body: JSON.stringify({
                    userId: userId,
                    isbn: isbn
                })
            }).then(modal.close());
        } else {
            // CF non combaciano
        }
    };
};

fetch('../php/booking/getElement.php', {
    method: 'POST',
    body: JSON.stringify({ isbn: isbn })
})
    .then(response => response.json())
    .then(element => {
        console.log(element);

        // immagine
        const image = document.createElement('img');
        image.src = '../images/products/' + element.foto;
        booking.appendChild(image);

        // div informazioni
        const infoDiv = document.createElement('div');
        infoDiv.classList.add('info-div');
        booking.appendChild(infoDiv);

        // titolo
        const title = document.createElement('h1');
        title.textContent = element.titolo;
        title.classList.add('title');
        infoDiv.append(title);

        // autori
        const autors = document.createElement('p');
        autors.classList.add('autor');
        autors.innerHTML = `di <b>${element.autori}</b>`;
        infoDiv.append(autors);

        // descrizione
        const desc = document.createElement('p');
        desc.textContent = element.descrizione;
        desc.classList.add('desc');
        infoDiv.append(desc);

        // biblioteca // TODO: sistermare
        const library = document.createElement('div');
        library.innerHTML = `
            <p class="library-name">Biblioteca: ${element.nomeBiblioteca}</p>
            <p class="">${element.nomeBiblioteca + element.via}</p>
        `;
        infoDiv.appendChild(library);

        // TODO: sistermare
        switch (element.tipo) {
            case 'libro':
                break;
            case 'enciclopedia':
                const volume = document.createElement('p');
                volume.textContent = element.volume;
                infoDiv.appendChild(volume);
                break;
            case 'carta geopolitica':
                const dates = document.createElement('p');
                dates.textContent = element.annoPubblicazione + ' ' + element.annoRiferimento;
                infoDiv.appendChild(dates);
                break;
        }

        // bottone prenota
        const button = document.createElement('button');

        button.type = 'submit';
        button.classList.add('mdc-button', 'mdc-button--raised');
        button.innerHTML = `
            <span class="mdc-button__ripple"></span>
            <span class="mdc-button__focus-ring"></span>
            <span class="mdc-button__label">PRENOTA</span>`;
        button.setAttribute('id', 'book');
        button.onclick = bookElement;

        infoDiv.appendChild(button);
    });
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

    const closeBtn = document.getElementById('close-btn');
    closeBtn.onclick = () => modal.close();

    const cf = modal.querySelector('input#cf');
    const cfConfirm = modal.querySelector('input#cf-confirm');
    let userId = getCookie('user');
    if (userId) {
        userId = userId.substring(2);
    }

    // By default, it reads from cookies (if the user clicked "stay logged in")
    // Otherwise, it tries to read from the URL parameter
    if (!userId) {
        userId = urlSearchParams.get('user');
    }

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
            }).then((response) => {
                modal.close();
                window.location.href = 'catalog-page.html?page=1';
            });
        } else {
            const cf = modal.querySelector('#cf-container');

            cf.classList.add('shake-element');
            cf.classList.add('mdc-text-field--invalid');
            setTimeout(() => {
                cf.classList.remove('shake-element', 'mdc-text-field--invalid');
            }, 1000);
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
        image.src = '../../assets/images/products/' + element.foto;
        booking.appendChild(image);

        // div informazioni
        const infoDiv = document.createElement('div');
        infoDiv.classList.add('info-div');
        booking.appendChild(infoDiv);

        // label
        const label = document.createElement('p');
        label.textContent = "stai per prenotare";
        label.style.fontSize = "30px";
        infoDiv.append(label);

        // titolo
        const title = document.createElement('h1');
        title.innerHTML = element.titolo;
        title.classList.add('title');
        infoDiv.append(title);

        // autori
        const autors = document.createElement('p');
        autors.classList.add('autor');
        autors.innerHTML = `di <b>${element.autori}</b>`;
        infoDiv.append(autors);

        switch (element.tipo) {
            case 'enciclopedia':
                title.innerHTML += ' (vol ' + element.volume + ')';
                break;
            case 'carta geopolitica':
                title.innerHTML += ' (' + element.annoRiferimento + ')';
                break;
        }

        // descrizione
        const desc = document.createElement('p');
        desc.textContent = element.descrizione;
        desc.classList.add('desc');
        infoDiv.append(desc);

        const library = document.createElement('div');
        library.innerHTML = `
            <p class="library-name">in <b>${element.nomeBiblioteca + ', ' + element.via}</b></p>`
        infoDiv.appendChild(library);

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
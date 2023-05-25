const title = document.getElementById('title');

const dialog = document.getElementById('confirm');

/*fetch('../php/getUser.php', {
    method: 'POST',
})
    .then(response => response.json())
    .then(data => {
        console.log(data);

        title.innerHTML += " <b>" + data[0].nome + "</b>";
    });*/

const content = document.getElementById('content');

const first = document.getElementById('first');
const second = document.getElementById('second');

createPersonalInfo();

function createPersonalInfo() {
    fetch('../php/getUser.php', {
        method: 'POST',
    })
        .then(response => response.json())
        .then(data => {
            user = data[0];

            const infoDiv = document.createElement('div');
            infoDiv.classList.add('info-div');

            const name = document.createElement('div');
            name.className = 'content-element';
            name.innerHTML = `
                Nome - <b>${user.nome}</b>`;
            infoDiv.appendChild(name);

            const surname = document.createElement('div');
            surname.className = 'content-element';
            surname.innerHTML = `
                Cognome - <b>${user.cognome}</b>`;
            infoDiv.appendChild(surname);

            const email = document.createElement('div');
            email.className = 'content-element';
            email.innerHTML = `
                Email - <b>${user.email}</b>`;
            infoDiv.appendChild(email);

            const cf = document.createElement('div');
            cf.className = 'content-element';
            cf.innerHTML = `
                CF - <b>${user.cf}</b>`;
            infoDiv.appendChild(cf);

            const logoutBtn = document.createElement('button');
            logoutBtn.classList.add('mdc-button', 'mdc-button--raised');
            logoutBtn.style.fontWeight = 'bold';
            logoutBtn.innerHTML = `
                <span class="mdc-button__ripple"></span>
                <span class="mdc-button__focus-ring"></span>
                <span class="mdc-button__label">DISCONNETTITI</span>`;
            logoutBtn.onclick = () => {
                let cookies = document.cookie.split(";");

                for (let i = 0; i < cookies.length; i++) {
                    let cookie = cookies[i];
                    let eqPos = cookie.indexOf("=");
                    let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
                    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
                }

                window.location.href = 'catalog-page.html?page=1';
            }
            infoDiv.appendChild(logoutBtn);

            const changePswDiv = document.createElement('form');
            changePswDiv.classList.add('change-password');

            changePswDiv.innerHTML = '<b>Cambia password</b>';

            const newPass = document.createElement('div');
            newPass.innerHTML = `
                <label data-mdc-auto-init="MDCTextField" class="mdc-text-field mdc-text-field--filled">
                    <span class="mdc-text-field__ripple"></span>
                    <span class="mdc-floating-label">Nuova password</span>
                    <input required type="password" class="mdc-text-field__input" id="password">
                    <i class="material-icons mdc-button__icon" id="toggle-psw1">visibility</i>
                    <span class="mdc-line-ripple"></span>
                </label>`;
            changePswDiv.appendChild(newPass);

            const newPassCfm = document.createElement('div');
            newPassCfm.innerHTML = `
                <label data-mdc-auto-init="MDCTextField" id="error" class="mdc-text-field mdc-text-field--filled">
                    <span class="mdc-text-field__ripple"></span>
                    <span class="mdc-floating-label">Ripeti nuova password</span>
                    <input required type="password" class="mdc-text-field__input" id="password-confirm">
                    <i class="material-icons mdc-button__icon" id="toggle-psw2">visibility</i>
                    <span class="mdc-line-ripple"></span>                
                </label>`;
            changePswDiv.appendChild(newPassCfm);

            const updateBtn = document.createElement('button');
            updateBtn.classList.add('mdc-button', 'mdc-button--raised');
            updateBtn.setAttribute('id', 'update-btn');
            updateBtn.setAttribute("type", "submit");
            updateBtn.innerHTML = `
                <span class="mdc-button__ripple"></span>
                <span class="mdc-button__focus-ring"></span>
                <span class="mdc-button__label">AGGIORNA</span>`;

            changePswDiv.addEventListener('submit', (e) => {
                e.preventDefault();
                const password = document.getElementById('password');
                const passwordConfirm = document.getElementById('password-confirm');

                if (password.value == passwordConfirm.value) {
                    dialog.showModal();

                    const closeBtn = dialog.querySelector('#close-btn');
                    closeBtn.onclick = () => modal.close();

                    const updateBtn = dialog.querySelector('#update-btn-dialog');
                    updateBtn.addEventListener('click', () => {
                        fetch('../php/updatePassword.php', {
                            method: 'POST',
                            body: JSON.stringify({
                                newPassword: password.value
                            })
                        });
                        dialog.close();
                        window.location.reload();
                    });
                } else {
                    const error = document.querySelector('#error');
                    error.classList.add('shake-element');
                    error.classList.add('mdc-text-field--invalid');
                    setTimeout(() => {
                        error.classList.remove('shake-element', 'mdc-text-field--invalid');
                    }, 1000);
                }
            });

            changePswDiv.appendChild(updateBtn);

            content.prepend(infoDiv);
            const divider = document.createElement('div');
            divider.innerHTML = '&nbsp;';
            divider.className = 'vertical-divider';
            content.appendChild(divider);

            content.appendChild(changePswDiv);

            const passwordInput = document.getElementById('password');
            const togglePsw1 = document.getElementById('toggle-psw1');
            togglePsw1.addEventListener('click', () => {
                if (passwordInput.type === 'password') {
                    passwordInput.type = 'text';
                    togglePsw1.innerHTML = 'visibility_off';
                } else {
                    passwordInput.type = 'password';
                    togglePsw1.innerHTML = 'visibility';
                }
            });

            const passwordConfirm = document.getElementById('password-confirm');
            const togglePsw2 = document.getElementById('toggle-psw2');
            togglePsw2.addEventListener('click', () => {
                if (passwordConfirm.type === 'password') {
                    passwordConfirm.type = 'text';
                    togglePsw2.innerHTML = 'visibility_off';
                } else {
                    passwordConfirm.type = 'password';
                    togglePsw2.innerHTML = 'visibility';
                }
            });

            window.mdc.autoInit(document.body);
        });
}

function createBookings() {
    fetch('../php/getBookingsByUser.php', {
        method: 'POST',
        body: JSON.stringify({

        })
    })
        .then(response => response.json())
        .then(data => {

            console.log(data);

            if (data.length == 0) {
                content.innerHTML = '<p class="no-book">Nessuna prenotazione!</p>';
            } else {

                const bookings = document.createElement('div');
                bookings.className = 'bookings'
                bookings.innerHTML = `
                    <table>
                        <thead>
                            <tr>
                                <th>N.</th>
                                <th>Titolo</th>
                                <th>Data prenotazione</th>
                                <th>Stato</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>`;
                const bookingsBody = bookings.querySelector('tbody');

                let i = 0



                for (const booking of data) {
                    i++;
                    let row = bookingsBody.appendChild(document.createElement("tr"));
                    let nCell = row.insertCell(0);
                    let titleCell = row.insertCell(1);
                    let dateCell = row.insertCell(2);
                    let stateCell = row.insertCell(3);

                    nCell.innerHTML = i;
                    titleCell.innerHTML = booking.titolo;
                    dateCell.innerHTML = booking.dataPrenotazione;

                    const state = document.createElement('div');
                    state.innerHTML = booking.stato;
                    state.classList.add('state');
                    if (booking.stato === 'terminata') {
                        state.classList.add('done');
                    } else if (booking.stato === 'da confermare') {
                        state.classList.add('wait');
                    } else if (booking.stato === 'in prestito') {
                        state.classList.add('accepted');
                    }
                    stateCell.innerHTML = state.outerHTML;



                }

                content.appendChild(bookings);
            }
        });
}

first.addEventListener('click', () => {
    second.classList.replace('selected', 'unselected');
    first.classList.replace('unselected', 'selected');

    if (first.classList.contains('selected')) {
        content.innerHTML = '';
        createPersonalInfo();
    }
});

second.addEventListener('click', () => {
    first.classList.replace('selected', 'unselected');
    second.classList.replace('unselected', 'selected');

    if (second.classList.contains('selected')) {
        content.innerHTML = '';
        createBookings();
    }
});


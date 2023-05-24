const registerForm = document.getElementById('register-form');

registerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name');
    const surname = document.getElementById('surname');
    const cf = document.getElementById('cf');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const passwordConfirm = document.getElementById('password-confirm');
    const mainTel = document.getElementById('tel-main');
    const otherTel = document.getElementById('other-tel-input');

    const registerData = {
        name: name.value,
        surname: surname.value,
        cf: cf.value,
        email: email.value,
        password: password.value,
        mainTel: mainTel.value,
        otherTel: otherTel.value
    };

    if (password.value == passwordConfirm.value) {
        fetch('../php/addAccount.php', {
            method: 'POST',
            body: JSON.stringify(registerData)
        })
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                if (result.type === 'already_registered') {
                    const existingErrorMessage = document.querySelector('.error-message');
                    console.log(existingErrorMessage);
                    if (existingErrorMessage) {
                        registerForm.style.height = registerForm.offsetHeight - 25 + 'px';
                        existingErrorMessage.remove();
                    }

                    const errorMessage = document.createElement('p');
                    errorMessage.innerHTML = 'Account gia\' esistente!';
                    errorMessage.classList.add('error-message');
                    registerForm.style.height = registerForm.offsetHeight + 25 + 'px';
                    registerForm.appendChild(errorMessage);

                    setTimeout(() => {
                        errorMessage.classList.add('show');
                    }, 0);
                } else {
                    window.location.href = 'login-page.html';
                }
            });
    } else {
        const existingErrorMessage = document.querySelector('.error-message');
        if (existingErrorMessage) {
            registerForm.style.height = registerForm.offsetHeight - 25 + 'px';
            existingErrorMessage.remove();
        }
        const errorMessage = document.createElement('p');
        errorMessage.innerHTML = 'Le password non corrispondono';
        errorMessage.classList.add('error-message');
        registerForm.style.height = registerForm.offsetHeight + 25 + 'px';
        registerForm.appendChild(errorMessage);
        setTimeout(() => {
            errorMessage.classList.add('show');
        }, 0);
    }
});

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

const telRow = document.getElementById('tel-row');

const telMain = document.getElementById('tel-main');
telMain.addEventListener('input', () => {
    if (telMain.value == '') {
        const otherTelElement = telRow.querySelector('#other-tel');
        if (otherTelElement) {
            telRow.removeChild(otherTelElement);
            telRow.removeChild(otherTelElement);
        }
    }

    if (!document.getElementById('other-tel')) {
        const newTel = document.createElement('label');
        newTel.setAttribute('data-mdc-auto-init', 'MDCTextField');
        newTel.classList.add('mdc-text-field', 'mdc-text-field--filled', 'tel');
        newTel.id = 'other-tel';
        newTel.style.marginLeft = '40px';

        newTel.innerHTML = `
            <span class="mdc-text-field__ripple"></span>
            <span class="mdc-floating-label">Telefono</span>
            <input type="tel" pattern="[0-9]{10}" class="mdc-text-field__input"
                id="other-tel-input">
            <span class="mdc-line-ripple"></span>`;
        telRow.appendChild(newTel);
        window.mdc.autoInit(document.body);
    }
});
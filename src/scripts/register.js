const registerForm = document.getElementById('register-form');

registerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name');
    const surname = document.getElementById('surname');
    const cf = document.getElementById('cf');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const passwordConfirm = document.getElementById('password-confirm');

    const registerData = {
        name: name,
        surname: surname,
        cf: cf,
        email: email,
        password: password
    };

    if (password.value == passwordConfirm.value) {
        fetch('../php/register.php', {
            method: 'POST',
            body: JSON.stringify(registerData)
        })
            .fetch((response) => response.json())
            .fetch((result) => {
                if (result.type == 'already_registered') {
                    const existingErrorMessage = document.querySelector('.error-message');
                    if (existingErrorMessage) {
                        existingErrorMessage.remove();
                    }

                    const errorMessage = document.createElement('p');
                    errorMessage.innerHTML = 'Account già esistente';
                    errorMessage.classList.add('error-message');
                    registerForm.style.height = registerForm.offsetHeight + 25 + 'px';
                    registerForm.appendChild(errorMessage);

                    setTimeout(() => {
                        errorMessage.classList.add('show');
                    }, 0);
                } {
                    window.location.href = 'login.html';
                }
            });
    } else {

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
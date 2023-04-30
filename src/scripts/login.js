const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const remindCheck = document.getElementById('remind-check');

    const loginData = {
        email: email.value,
        password: password.value,
    }

    fetch('../php/login.php', {
        method: 'POST',
        body: JSON.stringify(loginData),
    })
        .then((response) => response.json())
        .then((check) => {
            if (check.user === 'found') {
                console.log("YOTOOO");
                if (remindCheck.checked) {
                    const user = check.info + check.id;
                    let currentDate = new Date();
                    currentDate.setTime(currentDate.getTime() + 30 * 60 * 1000); // 30 minutes in milliseconds
                    let expires = "expires=" + currentDate.toUTCString();
                    document.cookie = `user=${user};expires=${expires.toString()};path=/`;
                }
                window.location.href = 'catalog.html';
            } else {
                const existingErrorMessage = document.querySelector('.error-message');
                if (existingErrorMessage) {
                    existingErrorMessage.remove();
                }

                const errorMessage = document.createElement('p');
                errorMessage.innerHTML = 'Email o password incorretti!';
                errorMessage.classList.add('error-message');
                loginForm.style.height = loginForm.offsetHeight + 25 + 'px';
                loginForm.appendChild(errorMessage);

                setTimeout(() => {
                    errorMessage.classList.add('show');
                }, 0);
            }
        })
        .catch((error) => console.error(error));
});

const passwordInput = document.getElementById('password');
const togglePsw = document.getElementById('toggle-psw');
togglePsw.addEventListener('click', () => {
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        togglePsw.innerHTML = 'visibility_off';
    } else {
        passwordInput.type = 'password';
        togglePsw.innerHTML = 'visibility';
    }
});
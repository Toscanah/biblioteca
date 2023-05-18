const pages = document.querySelectorAll('.index');
const urlSearchParams = new URLSearchParams(window.location.search);

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

    fetch('../php/executeLogin.php', {
        method: 'POST',
        body: JSON.stringify(loginData),
    })
        .then((response) => response.json())
        .then((login) => {
            if (login.user === 'found') {
                const cookieName = login.type === 'user' ? 'user' : 'staff';
                console.log("yo");

                if (remindCheck.checked) {
                    const user = login.info + login.id;
                    const expirationTime = 30 * 60 * 1000; // 30 minutes in milliseconds
                    const currentDate = new Date(Date.now() + expirationTime);
                    const expires = "expires=" + currentDate.toUTCString();
                    document.cookie = `${cookieName}=${user}; ${expires}; path=/`;
                }

                const from = urlSearchParams.get('from');
                if (from === 'catalog') {
                    const isbn = urlSearchParams.get('isbn');
                    const user = login.id;
                    window.location.href = `book-product-page.html?isbn=${isbn}&user=${user}`;
                } else {
                    window.location.href = 'catalog-page.html?page=1';
                }
            } else if (login.user === 'not_found') {
                const existingErrorMessage = document.querySelector('.error-message');
                if (existingErrorMessage) {
                    loginForm.style.height = loginForm.offsetHeight - 25 + 'px';
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

                setTimeout(() => {
                    errorMessage.classList.remove('show');
                }, 3000);

                setTimeout(() => {
                    loginForm.removeChild(errorMessage);
                }, 3600);
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

document.getElementById('register-btn').addEventListener('click', () => {
    window.location.href = 'register-page.html'
});
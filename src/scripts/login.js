const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const login = {
        email: email,
        password: password
    }

    fetch('./php/login.php', {
        method: 'POST',
        body: JSON.stringify(login)
    })
        .then((response) => response.json())
        .then((responseData) => console.log(responseData))
        .catch((error) => console.error(error));
});
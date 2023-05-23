const title = document.getElementById('title');

fetch('../php/getUsername.php', {
    method: 'POST',
})
    .then(response => response.json())
    .then(data => {
        console.log(data);
        title.textContent += " " + data[0].nome;
    });
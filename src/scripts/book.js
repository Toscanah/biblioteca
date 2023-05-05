const booking = document.getElementById('booking');

const cointainer = document.getElementById('booking');
const urlSearchParams = new URLSearchParams(window.location.search);
const isbn = urlSearchParams.get('isbn');

fetch('../php/book.php', {
    body: JSON.stringify(isbn)
})
    .then(response => response.json())
    .then(data => {
        const 
        
        switch (data.tipo) {
            case 'libro':

                break;
            case 'volume':
                break;
            case 'carta':
                break;
        }
    });  
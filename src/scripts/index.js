const elements = document.querySelectorAll('.observer-element');

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } else {
            entry.target.classList.remove('show');
        }
    });
});

// , { threshold: 0.10 }

elements.forEach(element => {
    observer.observe(element);
});

window.addEventListener('load', function () {
    const latitude = 45.6499974;
    const longitude = 13.767330264;

    const mapOptions = {
        center: new google.maps.LatLng(latitude, longitude),
        zoom: 14,
        mapTypeId: google.maps.MapTypeId.SATELLITE
    };

    const map = new google.maps.Map(document.getElementById('map'), mapOptions);
    const markerImage = 'src/images/book64.svg';

    fetch('src/php/map.php', {
        method: 'POST'
    })
        .then(response => response.json())
        .then((sites) => {
            for (let i = 0; i < sites.length; i++) {
                const site = sites[i];
                const latitude = site.latitudine;
                const longitude = site.longitudine;

                const coordinates = new google.maps.LatLng(latitude, longitude);
                const marker = new google.maps.Marker({
                    position: coordinates,
                    map: map,
                    icon: markerImage,
                    url: 'src/pages/biblioteca.html?id=' + site.id
                });

                google.maps.event.addListener(marker, 'click', function () {
                    window.location.href = this.url;
                });
            }
        })
        .catch((error) => console.log(error));
});
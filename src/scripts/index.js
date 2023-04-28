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

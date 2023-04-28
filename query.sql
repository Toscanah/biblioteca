CREATE TABLE tLibro (
    id INT PRIMARY KEY AUTO_INCREMENT,
    isbn INT UNIQUE,
    titolo TEXT,
    descrizione TEXT,
    annoPubblicazione YEAR,
    idCasaEditrice INT,
    idScaffale INT,
    numeroScaffale INT,

    FOREIGN KEY (idCasaEditrice) REFERENCES tCasaEditrice(id),
    FOREIGN KEY (idScaffale) REFERENCES tScaffale(id)
);

CREATE TABLE tAutore (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome TEXT,
    cognome TEXT,
    annoNascita YEAR,
    morteNascita YEAR
)

CREATE TABLE tCasaEditrice (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome TEXT
);


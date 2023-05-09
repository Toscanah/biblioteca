CREATE TABLE tLibro (
    id INT PRIMARY KEY AUTO_INCREMENT,
    isbn TEXT UNIQUE,
    titolo TEXT,
    descrizione TEXT,
    annoPubblicazione YEAR,
    stato TEXT,
    idCasaEditrice INT,
    idScaffale INT,
    numeroScaffale INT
);

CREATE TABLE tVolume (
    id INT PRIMARY KEY AUTO_INCREMENT,
    isbn TEXT UNIQUE,
    titolo TEXT,
    descrizione TEXT,
    annoPubblicazione YEAR,
    stato TEXT,
    volume INT,
    idCasaEditrice INT,
    idScaffale INT,
    numeroScaffale INT
);

CREATE TABLE tCartaGeopolitica (
    id INT PRIMARY KEY AUTO_INCREMENT,
    isbn TEXT UNIQUE,
    titolo TEXT,
    descrizione TEXT,
    annoPubblicazione YEAR,
    annoRiferimento YEAR,
    stato TEXT,
    idCasaEditrice INT,
    idScaffale INT,
    numeroScaffale INT
);

CREATE TABLE tAutore (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome TEXT,
    cognome TEXT,
    annoNascita YEAR,
    annoMorte YEAR
);

CREATE TABLE tProduzione (
    id INT PRIMARY KEY AUTO_INCREMENT,
    idAutore INT,
    isbnOperato TEXT
);

CREATE TABLE tCasaEditrice (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome TEXT
);

CREATE TABLE tScaffale (
    id INT PRIMARY KEY AUTO_INCREMENT,
    scaffale INT,
    idArmadio INT
);

CREATE TABLE tArmadio (
    id INT PRIMARY KEY AUTO_INCREMENT,
    armadio INT,
    idStanza INT
);

CREATE TABLE tStanza (
    id INT PRIMARY KEY AUTO_INCREMENT,
    stanza INT,
    idBiblioteca INT
);

CREATE TABLE tBiblioteca (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome TEXT,
    via TEXT,
    citta TEXT,
    civico TEXT,
    cap INT,
    longitudine FLOAT,
    latitudine FLOAT
);

CREATE TABLE tAddetto (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome TEXT,
    cognome TEXT,
    cf TEXT,
    email TEXT,
    password TEXT,
    idBiblioteca INT
);

CREATE TABLE tUtente (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome TEXT,
    cognome TEXT,
    cf TEXT,
    email TEXT,
    password TEXT
);

CREATE TABLE tTelefono (
    id INT PRIMARY KEY AUTO_INCREMENT,
    telefono TEXT,
    idUtente INT
);

CREATE TABLE tPrenotazione (
    id INT PRIMARY KEY AUTO_INCREMENT,
    isbnOperato TEXT,
    tipoOperato TEXT,
    dataPrenotazione DATE,
    stato TEXT,
    -- stati: "Da confermare", "prodotto concesso" o "prodotto ritirato"
    idUtente INT
);

CREATE TABLE tPrestito (
    id INT PRIMARY KEY AUTO_INCREMENT,
    dataPrestito DATE,
    idPrenotazione INT,
    idAddetto INT
);

CREATE TABLE tRitiro (
    id INT PRIMARY KEY AUTO_INCREMENT,
    dataRitiro DATE,
    idPrenotazione INT,
    idAddetto INT
);

ALTER TABLE
    tLibro
ADD
    FOREIGN KEY(idCasaEditrice) REFERENCES tCasaEditrice(id),
ADD
    FOREIGN KEY(idScaffale) REFERENCES tScaffale(id);

ALTER TABLE
    tVolume
ADD
    FOREIGN KEY(idCasaEditrice) REFERENCES tCasaEditrice(id),
ADD
    FOREIGN KEY(idScaffale) REFERENCES tScaffale(id);

ALTER TABLE
    tCartaGeopolitica
ADD
    FOREIGN KEY(idCasaEditrice) REFERENCES tCasaEditrice(id),
ADD
    FOREIGN KEY(idScaffale) REFERENCES tScaffale(id);

ALTER TABLE
    tProduzione
ADD
    FOREIGN KEY(idAutore) REFERENCES tAutore(id),
ADD
    FOREIGN KEY(isbnOperato) REFERENCES tLibro(isbn),
ADD
    FOREIGN KEY(isbnOperato) REFERENCES tVolume(isbn),
ADD
    FOREIGN KEY(isbnOperato) REFERENCES tCartaGeopolitica(isbn);

ALTER TABLE
    tScaffale
ADD
    FOREIGN KEY(idArmadio) REFERENCES tArmadio(id);

ALTER TABLE
    tArmadio
ADD
    FOREIGN KEY(idStanza) REFERENCES tStanza(id);

ALTER TABLE
    tStanza
ADD
    FOREIGN KEY(idBiblioteca) REFERENCES tBiblioteca(id);

ALTER TABLE
    tAddetto
ADD
    FOREIGN KEY(idBiblioteca) REFERENCES tBiblioteca(id);

ALTER TABLE
    tTelefono
ADD
    FOREIGN KEY(idUtente) REFERENCES tUtente(id);

ALTER TABLE
    tPrenotazione
ADD
    FOREIGN KEY(idUtente) REFERENCES tUtente(id),
ADD
    FOREIGN KEY(isbnOperato) REFERENCES tLibro(isbn),
ADD
    FOREIGN KEY(isbnOperato) REFERENCES tVolume(isbn),
ADD
    FOREIGN KEY(isbnOperato) REFERENCES tCartaGeopolitica(isbn);

ALTER TABLE
    tPrestito
ADD
    FOREIGN KEY(idPrenotazione) REFERENCES tPrenotazione(id),
ADD
    FOREIGN KEY(idAddetto) REFERENCES tAddetto(id);

ALTER TABLE
    tRitiro
ADD
    FOREIGN KEY(idPrenotazione) REFERENCES tPrenotazione(id),
ADD
    FOREIGN KEY(idAddetto) REFERENCES tAddetto(id);
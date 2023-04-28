CREATE TABLE tLibro (
    id INT PRIMARY KEY AUTO_INCREMENT,
    isbn INT UNIQUE,
    titolo TEXT,
    descrizione TEXT,
    annoPubblicazione YEAR,
    stato TEXT,
    idCasaEditrice INT,
    idScaffale INT,
    numeroScaffale INT,
    FOREIGN KEY(idCasaEditrice) REFERENCES tCasaEditrice(id),
    FOREIGN KEY(idScaffale) REFERENCES tScaffale(id)
);

CREATE TABLE tVolume (
    id INT PRIMARY KEY AUTO_INCREMENT,
    isbn INT UNIQUE,
    titolo TEXT,
    descrizione TEXT,
    annoPubblicazione YEAR,
    stato TEXT,
    volume INT,
    idCasaEditrice INT,
    idScaffale INT,
    numeroScaffale INT,
    FOREIGN KEY(idCasaEditrice) REFERENCES tCasaEditrice(id),
    FOREIGN KEY(idScaffale) REFERENCES tScaffale(id)
);

CREATE TABLE tCartaGeopolitica (
    id INT PRIMARY KEY AUTO_INCREMENT,
    isbn INT UNIQUE,
    titolo TEXT,
    descrizione TEXT,
    annoPubblicazione YEAR,
    annoRiferimento YEAR,
    stato TEXT,
    idCasaEditrice INT,
    idScaffale INT,
    numeroScaffale INT,
    FOREIGN KEY(idCasaEditrice) REFERENCES tCasaEditrice(id),
    FOREIGN KEY(idScaffale) REFERENCES tScaffale(id)
);

CREATE TABLE tAutore (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome TEXT,
    cognome TEXT,
    annoNascita YEAR,
    morteNascita YEAR
);

CREATE TABLE tProduzione (
    id INT PRIMARY KEY AUTO_INCREMENT,
    idAutore INT,
    isbnOperato TEXT,
    FOREIGN KEY(idAutore) REFERENCES tAutore(id),
    FOREIGN KEY(isbnOpeato) REFERENCES tLibro(isbn),
    FOREIGN KEY(isbnOpeato) REFERENCES tVolume(isbn),
    FOREIGN KEY(isbnOpeato) REFERENCES tCartaGeopolitica(isbn)
);

CREATE TABLE tCasaEditrice (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome TEXT
);

CREATE TABLE tScaffale (
    id INT PRIMARY KEY AUTO_INCREMENT,
    scaffale INT,
    idArmadio INT,

    FOREIGN KEY(idArmadio) REFERENCES tArmadio(id)
);

CREATE TABLE tArmadio (
    id INT PRIMARY KEY AUTO_INCREMENT,
    armadio INT,
    idStanza INT
);

CREATE TABLE tStanza (
    id INT PRIMARY KEY AUTO_INCREMENT,
    stanza INT,
    idBiblioteca INT,

    FOREIGN KEY(idBiblioteca) REFERENCES tBiblioteca(id)
);

CREATE TABLE tBiblioteca (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome TEXT,
    via TEXT,
    citta TEXT,
    civico TEXT,
    cap INT,
    longitudine TEXT,
    latitudine TEXT
);

CREATE TABLE tAddetto (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome TEXT,
    cognome TEXT,
    cf TEXT,
    email TEXT,
    password TEXT,
    idBiblioteca INT,

    FOREIGN KEY(idBiblioteca) REFERENCES tBiblioteca(id)
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
    idUtente INT,

    FOREIGN KEY(idUtente) REFERENCES tUtente(id)
);

CREATE TABLE tPrenotazione (
    id INT PRIMARY KEY AUTO_INCREMENT,
    isbnProdotto TEXT,
    dataPrenotazione DATE,
    stato TEXT, -- "Da confermare", "prodotto concesso" o "prodotto ritirato"
    -- ha senso fare la tabella prestito?
    -- si potrebbe aggiungere qui due campi "dataConcessione" e "dataRitiro"
    idUtente INT,

    FOREIGN KEY(idUtente) REFERENCES tUtente(id)
);

CREATE TABLE tPrestito (
    id INT PRIMARY KEY AUTO_INCREMENT,
    dataPrestito DATE,
    idPrenotazione INT,
    idAddetto INT,

    FOREIGN KEY(idPrenotazione) REFERENCES tPrenotazione(id),
    FOREIGN KEY(idAddetto) REFERENCES tAddetto(id)
);
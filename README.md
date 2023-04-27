# Biblioteca


# Biblioteca

Si vuole realizzare un sistema informativo per la gestione di una catena di biblioteche.

Ciascuna biblioteca contiene libri, enciclopedie e carte geo-politiche:

- I libri hanno un titolo, un autore, un anno di pubblicazione, un codice ISBN univoco, una casa editrice.
- Le enciclopedie hanno un titolo, uno o più autori, un anno di pubblicazione, una casa editrice, ma a differenza dei libri sono composti di più volumi: ogni volume ha lo stesso titolo dell'opera generale, ed in più viene specificato il numero del volume all'interno dell'enciclopedia.
Ciascun volume ha un codice univoco ISBN identificativo. Va registrato anche di quanti volumi è composta ciascuna enciclopedia per evitare perdite involontarie.
Es: Enciclopedia degli animali, 12 volumi, pubblicata nel 2013
Es: Enciclopedia degli animali VOLUME 1
Es: Enciclopedia degli animali VOLUME 2
...

- Le carte geo-politiche hanno un titolo, una casa editrice, un codice ISBN, uno o più autori, un anno di pubblicazione, ed in più anche l'anno a cui la rappresentazione fa riferimento.
Es: carta dell'italia del 1957, pubblicata nel 1994.

Tutti gli elementi hanno anche indicata la posizione in cui si trovano: in quale biblioteca della catena, in quale stanza, in quale armadio, in quale scaffale, e poi un numero progressivo univoco all'interno dello scaffale.
L'utente può effettuare delle ricerche dal SW per titolo, per anno di pubblicazione o per casa editrice, oppure può semplicemente vedere la lista di elementi presenti nella biblioteca che ha scelto.
Quando l'utente trova l'elemento che vuole prendere in prestito, inserisce il proprio codice fiscale ed effettua una prenotazione.
L'utente deve registrarsi al SW per poterlo usare, deve indicare il codice fiscale, nome, cognome, email, opzionalmente uno o più numeri di telefono o anche nessuno.
Il personale della biblioteca utilizza il SW tramite opportuno login di riconoscimento, l'addetto della biblioteca è assegnato ad una specifica biblioteca della catena.
Il personale della biblioteca può cercare un elemento tramite il SW, vede se l'elemento è presente in biblioteca e quale, se è attualmente in prestito, inoltre vede se è stato prenotato.
Se l'elemento è presente in biblioteca ed è stato prenotato, allora l'addetto della biblioteca registra nel SW che il prestito è concesso a chi ha fatto la prenotazione, viene registrata la data del prestito ed anche l'addetto che l'ha erogato.
Se un elemento è stato prenotato, ma non è presente in biblioteca, l'addetto non fa nulla.
Quando un elemento viene restituito, l'addetto lo cerca nel SW e registra che il prestito è terminato, viene registrata la data, l'addetto che ha ritirato l'elemento, ed l'elemento viene ripristinato come disponibile.
L'addetto della biblioteca deve poter controllare l'elenco delle prenotazioni in attesa di prestito.
Gli addetti di tutte le sedi possono concedere il prestito di un elemento presente in qualsiasi altra sede, però gli addetti di una sede possono registrare la restituzione solo degli elementi relativi alla loro sede.
Il SW controlla se l'utente sta cercando di prenotare un elemento già prenotato, in quel caso registra la richiesta di prenotazione in un elenco, con la data di prenotazione.
Nella home del SW è mostrata una mappa con le posizioni di tutte le biblioteche della catena.

opzionale: gli adetti hanno un interfaccia per inserire la scheda di un elemento nuovo, quando viene acquisito dalla biblioteca e reso disponibile per il prestito.

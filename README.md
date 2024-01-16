# EurisOffice

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.0.

## Struttura
Il progetto è strutturato in tre moduli distinti per organizzare in modo chiaro le funzionalità e facilitare la manutenzione e lo sviluppo. Ogni modulo ha uno scopo specifico per garantire una separazione delle responsabilità e una gestione efficiente del codice.

# App.module
Questo è il modulo principale che funge da punto di atterraggio dell'applicazione Angular.
Contiene il componente principale che costituisce la pagina di atterraggio dell'app.

# Dashboard.module
Questo modulo raggruppa i componenti relativi alla dashboard, inclusi i grafici (chart), la lista (list) e i dettagli (detail).
Fornisce un'organizzazione logica per le funzionalità specifiche della dashboard.

# AddItem.module
Questo modulo gestisce tutto ciò che è necessario per la creazione di un nuovo elemento, inclusa la logica del form.

## Store Detail Component
Questo componente Angular gestisce la visualizzazione dei dettagli di un negozio o di un prodotto basato sui parametri forniti nell'URL. Il componente fa uso di Angular ActivatedRoute per ottenere i parametri dall'URL e del servizio StoreService per recuperare i dati necessari dal backend.

In questa sezione, il componente recupera il storeID dai parametri dell'URL utilizzando ActivatedRoute. Successivamente, verifica se è fornito anche un productID nei parametri. Se presente, il componente carica i dettagli del prodotto tramite una chiamata al servizio getProductById e visualizza i dettagli del prodotto.

Se invece il productID non è presente, il componente imposta il tipo di dettaglio su 'store' e il tipo di elenco su 'product'. Utilizza quindi la funzione forkJoin di RxJS per eseguire chiamate parallele al servizio per ottenere la lista dei prodotti, i dettagli del negozio e i dati del grafico del negozio. Una volta completate tutte le chiamate, i dati vengono assegnati alle variabili appropriate nel componente.

## Dynamic list component

Questo componente è progettato per mostrare una lista dinamica di elementi, che possono essere visualizzati come griglia o pannello. L'utente può aggiungere nuovi elementi e cambiare lo stile di layout tra griglia e pannello. Gli elementi possono rappresentare prodotti o negozi, a seconda del contesto.

Il pulsante "Aggiungi elemento"  consente all'utente di aggiungere nuovi elementi alla lista.
Il pulsante è disabilitato quando la modalità di visualizzazione è impostata su "store" per evitare l'aggiunta di elementi in questa modalità (MISSING API).

C'è un pulsante con un'icona che consente di passare tra le visualizzazioni "griglia" e "pannello".
L'icona cambia dinamicamente tra "grid_view" e "list" in base allo stato corrente della griglia.

Eliminazione di Elementi

Se la modalità di visualizzazione è impostata su "product", viene visualizzato un pulsante di eliminazione per ciascun elemento, consentendo all'utente di eliminare un elemento specifico dalla lista.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

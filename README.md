# Garage Manager

Mini gestionale per officina sviluppato in Angular.

## Obiettivo
Progetto sviluppato per approfondire Angular e RxJS.

## Descrizione
Garage Manager è un'app front-end che simula la gestione di:
- clienti
- veicoli
- appuntamenti
- revisioni

I dati sono gestiti tramite servizi Angular e stream RxJS, simulando il comportamento di un backend reale.

## Funzionalità principali
- CRUD clienti
- CRUD veicoli
- Gestione appuntamenti
- Dashboard con metriche reattive
- Ricerca clienti in tempo reale
- Navigazione tramite Angular Router

## Tecnologie utilizzate
- Angular (standalone components)
- TypeScript
- RxJS (BehaviorSubject, Observable, combineLatest)
- HTML / SCSS

## Architettura
- Componenti standalone
- Stato centralizzato nei service
- Flussi dati gestiti tramite Observable (async pipe nei template)
- Nessun backend (dati mock)

## Avvio del progetto
```bash
npm install
ng serve -o

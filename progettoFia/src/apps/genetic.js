import 'babel-polyfill';
import { CANVAS_WIDTH, CANVAS_HEIGHT } from '../game/constants';
import { Runner } from '../game';
import GeneticModel from '../ai/models/genetic/GeneticModel';
import RandomModel from '../ai/models/random/RandomModel';

//  contiamo 10 Dinosauri = 10;
let runner = null;

const rankList = [];
const geneticModel = new GeneticModel();

let primaVolta = true;

function setup() {
  // Inizializza il gioco Runner. permette d far giocare più dinosauri contemporanemante
  runner = new Runner('.game', {
    DINO_COUNT:30,
    onReset: gestioneReset, // runner.js
    onCrash: gestioneCrash,
    onRunning: gestioneRunning
  });
  // ssegna l'oggetto runner a window.runner per l'accesso globale
  window.runner = runner;
  //  Inizializza tutto nel gioco e avvia il gioco.
  runner.init();
}


function gestioneReset(dinosauro) {
  if (primaVolta) {// se è la prima vota che gioca
    primaVolta = false;
    dinosauro.forEach((dino) => {
      dino.model = new RandomModel();// genero i valori casualmente
      dino.model.init();
    });

  }
  else {
    //  se non e la prima volta allena il modello prima di riavviare.
    // Creamo una
    const arryCromosoma = rankList.map((dino) => dino.model.getCromosoma());
  
     // elimino il rankList in modo che mi posso memorizzare la porssima generazione
    rankList.splice(0);
    //  chiamiamo la fit in modo da pter addestrate i cromosomi e li inserisce nell'array cromosoma
    geneticModel.fit(arryCromosoma);
    dinosauro.forEach((dino, i) => {
      dino.model.setCromosoma(arryCromosoma[i]);
    });
  }
}
//  metodo accetta un array di dinos come argomento. La runner classe crea una serie di dinosauri che possono essere utilizzati per giocare con più dinosauri. 
//  restituisce l'azione da intraprendere.
// La state è la condizione attuale di Runner- contiene la distanza dell'oggetto successivo, la sua larghezza
// e la velocità del gioco. Restituisce 
//  una promessa che è stata risolta utilizzando l'azione che dinoè necessario eseguire.
function gestioneRunning(dino, state) {
  let action = 0;
  if (!dino.jumping) {
    action = dino.model.predizioneSingola(convertiStatoDelGioco(state));//  restituisce  l'azione che deve eseguire 
  }
  return action;
}
// Ogni volta che un dinosauro muore in una generazione, lo inseriamo nella posizione 0 del nostra rankList il migliore
//  Questo assicura che il dinosauro che rimane in posizione 0 sarà il miglior dinosauro.
function gestioneCrash(dino) {
  if (!rankList.includes(dino)) {
    rankList.unshift(dino);//  mette l'ultimo dinosauro sopravissuto al primo posto
  }
}


function convertiStatoDelGioco(state) {// trex group.js
  if (state) {// lo usiamo per prendere lo stato corrente e prendiamo la sua distanza dall'ostacolo, velocità e larghezza
    return [
      state.obstacleX / CANVAS_WIDTH,
      state.obstacleWidth / CANVAS_WIDTH,
      state.speed / 100
    ];
  }
  return [0, 0, 0]; // ritona i migliori vlori(posizione 0) in base alla distanza velocita e larghezza
}

document.addEventListener('DOMContentLoaded', setup);

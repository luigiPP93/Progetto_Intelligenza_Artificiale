import Model from '../Model';

export default class RandomModel extends Model {
  weights = []; //  pesi dei valori: velocità, lunghezza e distanza.  
  biases = [];

  init() {
    this.randomize();
  }
  //  insieme dei velori è un array e contine i valori di velocità, larghezza e distanza e bias     
predizione(insiemeValori) {
    const inputX = insiemeValori[0];
    const y =
      this.weights[0] * inputX[0] +
      this.weights[1] * inputX[1]+
      this.weights[2] * inputX[2] +
      this.biases[0];
    return y < 0 ? 1 : 0;
  }

  // Addestra il modello per un dato insieme di input e le corrispondenti uscite corrette per 1 epoca
  train() {
    this.randomize();
  }

  randomize() {
    this.weights[0] = random();
    this.weights[1] = random();
    this.weights[2] = random();
    this.biases[0] = random();
  }
  getCromosoma() {
    return this.weights.concat(this.biases);
  }

  setCromosoma(cromosoma) {
    this.weights[0] = cromosoma[0];
    this.weights[1] = cromosoma[1];
    this.weights[2] = cromosoma[2];
    this.biases[0] = cromosoma[3];
  }
}

function random() {
  //  return (Math.random()) * 2; non funziona
  return (Math.random()-0.5) * 2;// Per il valore più piccolo che Math.random()restituisce ( 0) otterrai -0.5. E per il valore massimo ( 0.49999...) otterrai ( 0.4999...).
}

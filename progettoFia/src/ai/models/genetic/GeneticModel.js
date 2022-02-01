import Model from '../Model';

export default class GeneticModel extends Model {
  formazione(cromosoma) { //  forma il nostro cromosoma
    const genitori = this.seleziona(cromosoma);// seleziona i ue migliori individui
    const figli = this.crossOver(genitori, cromosoma);// scambia il patrimonio genetio.
    this.mutazione(figli); // mutare il patrimonio genetco
  }

  fit(cromosoma) {
    this.formazione(cromosoma);
  }

  seleziona(cromosoma) {// migliori cromosomi
    const genitori = [cromosoma[0], cromosoma[1]];
    return genitori;
  }

  crossOver(genitori, cromosoma) {
    // Prendo i due migliori individui(due genitori) per generare i figli
    const figli1 = genitori[0];
    const figli2 = genitori[1];
    console.info("figlio 1:",figli1);
    console.info("figlio 2:",figli2);
    // seleziono un punto radomico da dove poi scambio i vari valori
    const crossOverPoint = Math.floor(Math.random() * figli1.length);
    console.info("crosshover: ",crossOverPoint);
    // Scambio tutti i valori degli individui precedenti al punto di crossOver scelto a caso al rigo 26 
    for (let i = 0; i < crossOverPoint; i += 1) {
        const temp = figli1[i];
        figli1[i] = figli2[i];
        figli2[i] = temp;
    }
    //  Cremo array con i due nuovi figli
    const figli = [figli1, figli2];
    //  Sostiusco i figli generati con i con gli ultimi due individui presenti nell'array cromosoma(in quanto sono i peggiori)
    for (let i = 0; i < 2; i += 1) {
      cromosoma[cromosoma.length - i - 1] = figli[i];
    }
    console.info("figlio: ",figli)
    return figli;
  }

  mutazione(cromosoma) {
    //  Per ogni elemento del cromosoma mutuo un parametro tra velocità,lunghezza e distanza e bias con un valore randomico
    cromosoma.forEach(chromosome => {
      const mutationPoint = Math.floor(Math.random() * cromosoma.length);
      chromosome[mutationPoint] = Math.random();
    });
  }
}

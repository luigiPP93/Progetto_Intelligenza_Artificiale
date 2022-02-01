export default class Model {
  init() {
    throw new Error(
    );
  }

  predizione(inputXs) {
    throw new Error(
    );
  }

  predizioneSingola(inputX) {
    return this.predizione([inputX]);
  }

}

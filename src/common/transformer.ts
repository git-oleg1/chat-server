export interface Transformer<I = any, O = any> {
  transform: (input: I) => O;
}

// @flow
type SetStateCompose = (...Array<() => mixed>) => (...Array<*>) => {
  [key: string]: any,
}
export const setStateCompose: SetStateCompose = (...functions) => (...setStateArgs) =>
  functions.reduce(
    ((pV, cV) => ({
      ...pV,
      ...cV(...setStateArgs),
    })),
    {},
  );

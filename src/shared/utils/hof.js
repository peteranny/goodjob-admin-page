// @flow
type EqualityCheck = (any, any) => boolean;

const isArguementsEqual = (equalityCheck: EqualityCheck) => (args: Array<*>, lastArgs: any) => {
  if (lastArgs === null) {
    return false;
  }

  for (let index = 0; index < args.length; index += 1) {
    const ele = args[index];
    const lastEle = lastArgs[index];

    if (!equalityCheck(ele, lastEle)) {
      return false;
    }
  }

  return true;
};

const defaultEqualityCheck = (a: any, b: any): boolean => a === b;

export const memoize = (
  func: () => any,
  equalityCheck: (any, any) => boolean = defaultEqualityCheck
) => {
  let lastArgs = null;
  let result = null;

  const argEqualityCheck = isArguementsEqual(equalityCheck);

  return (...args: Array<*>) => {
    if (argEqualityCheck(args, lastArgs)) {
      return result;
    }

    lastArgs = args.slice();
    result = func(...args);
    return result;
  };
};

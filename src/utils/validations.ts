export const isIdValid = (id: number) => {
  return Number.isInteger(id) && id >= 1;
};

export const isDurationValid = (duration: number) => {
  return Number.isInteger(duration) && duration >= 1 && duration <= 999;
};

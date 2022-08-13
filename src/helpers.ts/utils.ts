export const valueOrEmpty = (value: string | undefined | null) => {
  if (!!value) return value;
  return "";
};

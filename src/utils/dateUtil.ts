export const getTime = (timestamp?: number) => {
  if (timestamp) return new Date(timestamp);
  return new Date();
}

export const getNow = ():Date => getTime();

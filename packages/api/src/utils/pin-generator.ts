// Generates random pin that falls between 1 - 9n (n=length)
// Backfills with zeros if necessary to achieve specified length

function digitFill(length: number, fill: number) {
  return new Array(length).fill(fill).join('');
}

export const orderCodeGenerator = (length: number) => {
  const max = Number(digitFill(length, 9));

  const int = (Math.floor(Math.random() * max) + 1).toString();

  return int.length < length
    ? digitFill(length - int.length, 0).concat(int)
    : int;
};

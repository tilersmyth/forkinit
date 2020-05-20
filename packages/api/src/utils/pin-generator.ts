// Generates random pin that falls between 1 - 9999
// Backfills with zeros if necessary to achieve specified length

export const orderCodeGenerator = (length: number) => {
  const max = Number(
    Array(length)
      .fill(9)
      .join(''),
  );
  const int = Math.floor(Math.random() * max) + 1;
  const intString = int.toString();
  return intString.length < length
    ? new Array(length - intString.length + 1).join('') + int
    : intString;
};

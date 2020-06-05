export const company = (root: any) => {
  console.log("company resolver", root);

  root.company = true;
  return true;
};

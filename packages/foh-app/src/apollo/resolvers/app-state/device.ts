export const device = (root: any) => {
  console.log("device resolver", root);

  root.device = true;
  return true;
};

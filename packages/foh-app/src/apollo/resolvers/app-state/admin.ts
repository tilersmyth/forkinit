export const admin = (root: any) => {
  console.log("admin resolver", root);

  root.admin = true;
  return true;
};

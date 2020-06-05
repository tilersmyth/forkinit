export const staff = (root: any) => {
  console.log("staff resolver", root);
  root.staff = true;
  return true;
};

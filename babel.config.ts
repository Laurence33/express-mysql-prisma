export const presets = [
  ["@babel/preset-env", { targets: { node: "14.17.5" } }],
  "@babel/preset-typescript",
];

export default (api: any) => {
  const isTest = api.env("test");
  // You can use isTest to determine what presets and plugins to use.

  return {
    // ...
  };
};

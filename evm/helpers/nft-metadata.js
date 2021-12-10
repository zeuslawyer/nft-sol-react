/**
 * Generate NFT metadata including image SVG encoded as base64.
 * @param {string} name the unique NFT name
 * @param {string} base64str base64 encoded svg that renders the NFT image
 * @returns stringified JSON object containing the generated NFT metadata.
 */
const generateMetadataJsonString = (name, base64str) => {
  const image = "data:image/svg+xml;base64," + base64str;

  return JSON.stringify({
    name,
    description: "An NFT from the highly acclaimed square collection",
    image,
  });
};

const encodeBase64 = str => {
  return Buffer.from(str).toString("base64");
};

let jsonstr = `{
  name: "EpicLordHamburger",
  description: "An NFT from the highly acclaimed square collection",
  image:"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaW5ZTWluIG1lZXQiIHZpZXdCb3g9IjAgMCAzNTAgMzUwIj4KICAgIDxzdHlsZT4uYmFzZSB7IGZpbGw6IHdoaXRlOyBmb250LWZhbWlseTogc2VyaWY7IGZvbnQtc2l6ZTogMTRweDsgfTwvc3R5bGU+CiAgICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJibGFjayIgLz4KICAgIDx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBjbGFzcz0iYmFzZSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+RXBpY0xvcmRIYW1idXJnZXI8L3RleHQ+Cjwvc3ZnPg==",
}`;

module.exports = { generateMetadataJsonString };

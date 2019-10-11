const TS = "1"
// eslint-disable-next-line
const PRIVATE_KEY = 'c83b409edc5238142b6c35c90e950765a82cd9a7';
const PUBLIC_KEY = 'ba8459e826c5e95745dc72a09cd3d370';
const HASH = "0ac93170a108ef00ce3c5baada8c6d3f" // md5(TS+PRIVATE_KEY+PUBLIC_KEY)

export const API_SUFFIX = `?ts=${TS}&apikey=${PUBLIC_KEY}&hash=${HASH}`;
export const API_URL = "https://gateway.marvel.com/v1/public/";

export default API_URL;
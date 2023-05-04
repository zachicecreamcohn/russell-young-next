import { useRouter } from "next/router";

const CONFIG_VARS = {
  ROOT_URL: process.browser ? `${window.location.protocol}//${window.location.host}` : "",
  CLOUDFLARE_ROOT_URL: "https://imagedelivery.net/5mGz3Xk8mbYIWkWOJDc_Vg",
};

export default CONFIG_VARS;

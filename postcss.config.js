import postcssGlobalData from "@csstools/postcss-global-data";
import postcssCustomMedia from "postcss-custom-media";
import postcssFluid from "postcss-fluid";

export default {
  plugins: [
    postcssGlobalData({ files: ["./src/styles/breakpoints.css"] }),
    postcssCustomMedia(),
    postcssFluid({ min: "360px", max: "1600px" }),
  ],
};

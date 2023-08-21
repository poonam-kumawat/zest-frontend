import tailwind from "tailwindcss";
import tailwindConfig from "./tailwind.config";
import autoprefixer from "autoprefixer";

export default {
  plugins: [tailwind(tailwindConfig), autoprefixer],
};

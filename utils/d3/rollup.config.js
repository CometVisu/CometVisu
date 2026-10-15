import npm from "rollup-plugin-node-resolve";
import terser from '@rollup/plugin-terser';

export default [{
  input: "utils/d3/d3.js",
  output: {
    name: "d3",
    format: "iife",
    file: "source/resource/libs/d3.min.js",
    sourcemap: true,
    plugins: [terser()]
  },
  plugins: [npm({jsnext: true})]
}];
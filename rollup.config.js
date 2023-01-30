import babel from "@rollup/plugin-babel";
import { nodeResolve } from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"

export default {
  input: "src/release.mjs",
  output: {
    dir: "bin",
    format: "cjs",
    banner: "#!/usr/bin/env node",
  },
  plugins: [
    commonjs(),
    nodeResolve({ exportConditions: ['node'], dedupe: ['zx'] }),
    babel({
      babelHelpers: "runtime",
      presets: [
        ["@babel/preset-env", { targets: { node: "16" } }]
      ],
      plugins: [
        ['@babel/plugin-transform-runtime', { useESModules: false }],
      ],
    }),
  ],
};

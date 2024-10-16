// Contents of the file /rollup.config.js
import typescript from 'rollup-plugin-typescript2';
import dts from "rollup-plugin-dts";
import terser from '@rollup/plugin-terser';
const config = [
  {
    input: 'src/lib.ts',
    output: {
      file: 'dist/lib.js',
      format: 'cjs',
      sourcemap: true,
    },
    plugins: [
      typescript(), 
      terser()
    ]
  }, {
    input: 'dist/lib.d.ts',
    output: {
      file: 'dist/lib.d.ts',
      format: 'es'
    },
    plugins: [dts()]
  }
];
export default config;
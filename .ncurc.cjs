module.exports = {
  upgrade: true,
  peer: true,
  reject: [
    'got',
    'tsup', // imcompatible with Vite
  ],
};

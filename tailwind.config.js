/** @type {import('tailwindcss').Config} */
module.exports = {
    presets: [
      require('./my-preset.js'),
    ],
    // This configuration will be merged
    corePlugins: {
      cursor: false
    }
  }
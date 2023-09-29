import { Buffer } from "buffer";

if (typeof window !== "undefined") {
    console.log('object');
  window.global = window.global ?? window;
  window.Buffer = window.Buffer ?? Buffer;
  window.process = window.process ?? { env: {} }; // Minimal process polyfill
}

export {};

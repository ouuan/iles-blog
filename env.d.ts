/* eslint-disable import/prefer-default-export */

/// <reference types="vite/client" />
/// <reference types="iles" />
/// <reference types="vite-plugin-info/client" />

declare module '~build/meta' {
  export const totalSize: number;
  export const sha: string;
  export const committerDate: string;
}

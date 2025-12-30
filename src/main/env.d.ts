/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASE_URL_CAMERA_SERVICE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

const GLOBAL_HOST = import.meta.env.VITE_GLOBAL_HOST;
const BACKEND_HOST = GLOBAL_HOST;
const BACKEND_HOST_DOCKER = import.meta.env.VITE_BACKEND_HOST_DOCKER;
const BACKEND_PORT = import.meta.env.VITE_BACKEND_PORT;
const BACKEND_PORT_DOCKER = import.meta.env.VITE_BACKEND_PORT_DOCKER;

let host = BACKEND_HOST;
let port = BACKEND_PORT;

if (GLOBAL_HOST !== "127.0.0.1") {
  host = BACKEND_HOST_DOCKER;
  port = BACKEND_PORT_DOCKER;
}

const configs = {
  hosts: {
    backend_api: {
      host: host,
      port: port,
    },
  },
};

export default configs;

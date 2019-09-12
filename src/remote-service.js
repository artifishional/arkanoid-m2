import { stream2, RemouteService } from "m2"

const remoteServiceConnection =
  RemouteService.fromWebSocketConnection({
    host: "localhost",
    port: "3000",
  });

export default ({ obtain, signature }) => {

  if(!Object.keys(signature).length) {
    debugger;
  }

  return stream2.fromRemouteService(remoteServiceConnection, signature);
}
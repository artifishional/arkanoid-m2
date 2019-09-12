import { stream2, RemouteService } from "m2"

const remoteServiceConnection =
  RemouteService.fromWebSocketConnection({
    host: "localhost",
    port: "3000",
  });

export default ({ obtain, signature }) => {
  return stream2.fromRemouteService(remoteServiceConnection, signature).store();
}
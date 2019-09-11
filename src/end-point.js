import { stream2, RemouteService } from "m2"

export default () => RemouteService.fromWebSocketConnection({
  host: "http://localhost",
  port: "3000",
});
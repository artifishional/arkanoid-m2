import { stream2, RemouteService } from "m2"

const remoteConnection =
  stream2.fromWSConnection({ uri: 'ws://localhost:8999' });

export default ({ path }) => {
  return remoteConnection.way({ path });
}
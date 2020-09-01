import { stream2 } from 'm2'

const remoteConnection =
  stream2.fromWSConnection({ uri: 'ws://localhost:8999' });

export default ({ path, args }) => {
  return remoteConnection.way({ path, args });
}
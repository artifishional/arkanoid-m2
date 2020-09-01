import { stream2 } from 'air-stream';

export default ({ obtain, player: { id } }) =>
  obtain('@player/player')
    .map(([{ id: x }]) => {
      if (x === id) {
        return obtain('@controller');
      }
      return stream2.emptyChannel();
    })
    .gripFirst()
    .reduceRemote(
      () => {}, obtain(
        '@remote-service',
        { path: 'ship', args: { player: { id } } },
    ));

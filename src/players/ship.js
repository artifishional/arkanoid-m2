import { stream2 as stream } from 'air-stream';

export default ({ obtain, player: { id } }) =>
  obtain('@ups')
    .withlatest([
      obtain('@player/player')
        .map(([{ id: x }]) => {
          if (x === id) {
            return obtain('@controller', { player: { id } });
          }
          return stream.emptyChannel();
        })
        .gripFirst(),
    ])
    .reduce(
      (data) => data, {
        remote: obtain(
          '@remote-service',
          { path: 'ship', args: { player: { id } } }
        )
      },
      { label: 'alpha' }
    );

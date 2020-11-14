import { stream2 } from 'm2';

export default ({ obtain }) =>
  obtain('@game-state')
    .map(([{ game: { ups, startTime } }]) => {
      return stream2
        .ups(ups, startTime)
        .reduce(
          (acc, ups) => acc + ups,
          { remote: obtain('@remote-service', { path: 'ups' }) },
        );
    })
    .gripFirst();

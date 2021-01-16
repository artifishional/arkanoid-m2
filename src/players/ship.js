import { stream2 as stream } from 'air-stream';
import { CANVAS, SHIP } from "../defs";
const { min, max } = Math;

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
      (acc, [ups, [{ axis }]]) => {
        if (axis) {
          let [{ active, x, y, id }] = acc;
          x += axis * SHIP.SPEED;
          x = min(max(-SHIP.WIDTH / 2, x), CANVAS.WIDTH - SHIP.WIDTH / 2);
          const x1 = x + SHIP.WIDTH;
          const y1 = y + SHIP.HEIGHT;
          console.log(ups, x);
          return [{ ...acc[0], active, x, y, x1, y1, id }];
        }
        return acc;
      }, {
        remote: obtain(
          '@remote-service',
          { path: 'ship', args: { player: { id } } }
        )
      },
      { label: 'alpha' }
    )
    .distinct();

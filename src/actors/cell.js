import { CELL } from '../defs';

function cell({ x, y, ...state }) {
  return { x, y, ...state, x1: x + CELL.WIDTH, y1: y + CELL.HEIGHT };
}

const MAPPER = [
  { x: 100, y: 200 }, { x: 200, y: 200 }, { x: 300, y: 200 }, { x: 400, y: 200 }, { x: 500, y: 200 },
  { x: 600, y: 200 }, { x: 700, y: 200 }, { x: 800, y: 200 }, { x: 900, y: 200 }, { x: 2000, y: 200 },
];

export default ({ obtain, player, id, index }) => obtain("@ups")
  .withlatest([obtain("@units")])
  .reduceF(
    [cell({ ...MAPPER[index], id, })],
    ([ { x, y, id } ]) => {
      const x1 = x + CELL.WIDTH;
      const y1 = y + CELL.HEIGHT;
      return [{ x, y, x1, y1, id }];
    }
  );
export default ({ obtain }) =>
  obtain('game-state')
    .factory(
      ({ players }) => players,
      ({ id }) => obtain('ship', { player: { id } }),
      ({ id: a }, { id: b }) => a === b,
    );

export default ({ obtain }) =>
  obtain('@game-state')
    .factory(
      ({ id }) => obtain('@ship', { player: { id } }),
      ([{ players }]) => players,
      ({ id: a }, { id: b }) => a === b,
    );

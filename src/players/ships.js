export default ({ obtain }) =>
  obtain('@game-state')
    .factory(
      ({ id }) => {
          const obs = obtain('@ship', { player: { id } });
          return obs;
      },
      ([{ players }]) => players,
      ({ id: a }, { id: b }) => a === b,
    );

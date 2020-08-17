import { stream2 } from 'air-stream';

export default ({ obtain, player: { id } }) => {
  obtain('@user')
    .map(({ user: { id: x } }) => {
      if (x === id) {
        return obtain('@controller');
      }
      return stream2.emptyChannel();
    })
    .gripFirst();
}

import { stream2 as stream } from 'm2'

export default ({ id }) => {
  
  if (!id) {
    // current player
    return stream.fromCbFunc((cb) => {
      cb([{ kind: 'player', active: false, id: 1 }]);
    }).store();
  }
  debugger;
  return stream.fromCbFunc((cb) => {
    cb([{ kind: 'player', active: false, id }]);
  }).store();
}
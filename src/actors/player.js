import { stream2 as stream } from "m2"

export default ( { id } ) => {
  return stream( null, () => {
    return [{ kind: "player", active: false, id }];
  } );
}
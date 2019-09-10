import { stream2 } from "m2"
import actors from "./actors"
import controller from "./controller"
import {default as defs} from "./defs"
import endpoint from "./end-point"

const MAPPER = [
  ...Array(50)
    .fill(0)
    .map( (_, i) => ({ x: 25 + i % 19 * 100, y: 25 + (i / 19|0) * 100 }) )
];

function cells ({ schema, obtain }) {
  return stream2( null, e => {
	  e( [ MAPPER.map( config => obtain("@actors", { kind: "cell", config }) ) ] );
  } );
}

const units = ({ schema, obtain }) => {

  return stream2(null, (e) => {
    
    const map = new Map();

    //e([ [] ]);

    function handler() {
      e( [  [...map.values()] ] );
    }

    schema.parent.get("actors").then((schema) => schema.sentry.on(([entities]) => {
      
      const added = entities.filter(({ entity }) => !map.has(entity));
      
      added.map( ({ entity }) => {
        entity.on( (data) => {
          map.set(entity, data);
          handler();
        } );
      } );

      handler();

    }));

  })
      .store();

};

//const ups = () => stream2.ups();

//const socket = new WebSocket("ws://localhost:3000");
const ups = ({ obtain }) => stream2.fromEndPoint(obtain("end-point"), "ups");

export default {

  ["end-point"]: endpoint,
  cells,
  defs,
  controller,
  ups,
  units,
  actors,

}
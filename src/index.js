import { stream2 } from "m2"
import actors from "./actors"
import controller from "./controller"
import {default as defs} from "./defs"

const MAPPER = [
  { x: 100,  y: 200 }, { x: 200,  y: 200 },/* { x: 300,  y: 200 },
  { x: 400,  y: 200 }, { x: 500,  y: 200 }, { x: 600,  y: 200 },
  { x: 700,  y: 200 }, { x: 800,  y: 200 }, { x: 900,  y: 200 },
  { x: 1000, y: 200 }, { x: 1100, y: 200 }, { x: 1200, y: 200 },
  { x: 1300, y: 200 }, { x: 1400, y: 200 }, { x: 1500, y: 200 },
  { x: 1600, y: 200 }, { x: 1700, y: 200 }, { x: 1800, y: 200 },*/
];

function cells ({ schema, obtain }) {
  return stream2( null, e => {
	  e( [ MAPPER.map( config => obtain("@actors", { kind: "cell", config }) ) ] );
  } );
}

const units = ({ schema, obtain }) => {

  return stream2(null, (e) => {


    const store = [];
    const map = new Map();

    e([ store ]);

    function handler() {
      e( [  [...map.values()] ] );
    }

    schema.parent.get("actors").then((schema) => schema.sentry.on(([entities]) => {

      const added = entities.filter(({ entity }) => !store.includes(entity));

      store.push(...added);

      added.map( ({ entity }) => {
        entity.on( (data) => {
          map.set(entity, data);
          handler();
        } );
      } );

      handler();

    }));

  });

};

const ups = () => stream2.ups();

export default {

  cells,
  defs,
  controller,
  ups,
  units,
  actors,

}
import { stream } from "m2"
import actors from "./actors"
import controller from "./controller"
import {default as defs} from "./defs"

const MAPPER = [
  { x: 100, y: 200 }, { x: 200, y: 200 }, { x: 300, y: 200 }, { x: 400, y: 200 }, { x: 500, y: 200 },
  { x: 600, y: 200 }, { x: 700, y: 200 }, { x: 800, y: 200 }, { x: 900, y: 200 }, { x: 2000, y: 200 },
];

function cells ({ schema, obtain }) {
  return stream( emt => {
    emt( [ MAPPER.map( config => obtain("@actors", { kind: "cell", config }) ) ] );
  } );
}

const units = ({ schema, obtain }) => {

  return stream((emt) => {


    const store = [];
    const map = new Map();

    emt([ store ]);

    function handler() {
      emt( [  [...map.values()] ] );
    }

    schema.parent.get("actors").then((schema) => schema.sentry.at(([entities]) => {

      const added = entities.filter(({ entity }) => !store.includes(entity));

      store.push(...added);

      added.map( ({ entity }) => {
        entity.at( (data) => {
          map.set(entity, data);
          handler();
        } );
      } );

      handler();

    }));

  });

};

const ups = () => {

  return stream( emt => {
    setInterval( emt, 10, null )
  } );

};

export default {

  cells,
  defs,
  controller,
  ups,
  units,
  actors,

}
import { stream } from "m2"
import actors from "./actors"
import controller from "./controller"
import {default as defs} from "./defs"

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

  defs,
  controller,
  ups,
  units,
  actors,

}
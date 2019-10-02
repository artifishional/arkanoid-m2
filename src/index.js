import { stream2 } from "m2"
import actors from "./actors"
import controller from "./controller"
import {default as defs} from "./defs"
import remoteService from "./remote-service"
stream2.UPS.set(100);
import * as players from "./players"

const MAPPER = [
  ...Array(1)
    .fill(0)
    .map( (_, i) => ({ x: 25 + i % 19 * 100, y: 25 + (i / 19|0) * 100 }) )
];

function cells ({ schema, obtain }) {
  return stream2( null, e => {
	  e( [ MAPPER.map( (_, index) => obtain("@actors", { kind: "cell", index }) ) ] );
  } );
}

const manager = () => {

  return stream2( null, (e) => {
  
    e( [ [  ] ] );
  
  } )
      .store();

};

const units = ({ obtain }) => {

  return manager().reduceF(
    (acc, [ data, action ]) => {
      if(action.name === "create") {
        return [
            [ ...acc, ...action.data.map( signature => actors({ obtain, signature }) ) ],
                action
        ];
      }
    },
      data => data.map( signature => actors({ obtain, signature }))
  );

};

//const ups = () => stream2.ups();

//const socket = new WebSocket("ws://localhost:3000");
const ups = ({ obtain }) => obtain("@remote-service", { name: "ups" });

export default {

  players,
  ["remote-service"]: remoteService,
  cells,
  defs,
  controller,
  ups,
  units,
  actors,

}
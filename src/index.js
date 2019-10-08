import { stream2 } from "m2"
import actors from "./actors"
import controller from "./controller"
import {default as defs} from "./defs"
import remoteService from "./remote-service"
stream2.UPS.set(1);
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

const unitsMR = ( { obtain } ) => {

  return stream2( null, (e) => {
  
  } )
	.reduceF(
      obtain("@remote-service", { name: "units-manager" }),
      (acc, [ data, action ]) => {
	      if(action.name === "create") {
		      return [ [ ...acc, ...action.data ], action ];
	      }
      },
	);

};

const units = ({ obtain }) => {

  return obtain("@units-manager").reduceF(
    (acc, [ data, action ]) => {
      if(action.name === "create") {
        const data = action.data.map( signature => actors({ obtain, signature }) );
        return [ [ ...acc, ...data ], { ...action, data } ];
      }
    },
      data => {
    		return data.map( signature => {
    			return actors({ obtain, signature })
				})
			}
  );

};

const unitsDT = ( { obtain } ) => {
  
	return stream2( null, (e, controller) => {
	  
	    const store = new Map();
	  
	    function handler(unit, data) {
		    store.set(unit, data);
	        e( [ [...store.values()] ] );
        }
		
		e( [ [ ] ] );

			obtain("@units").connect( (hook) => {
			controller.to(hook);
			return ([ data, action ]) => {
				if( !action.name ) {
					data.map( unit => unit.connect(hook => {
						controller.todisconnect(hook);
						return (data) => handler(unit, data);
					}) );
				}
				else if(action.name === "create") {
					action.data.map( unit => {
						unit.connect(
							hook => {
								controller.todisconnect(hook);
								return (data) => handler(unit, data)
							})
						}
					);
				}
			}
		} );
	   
    })
        .store()
	
};

//const ups = () => stream2.ups();

//const socket = new WebSocket("ws://localhost:3000");
const ups = ({ obtain }) => obtain("@remote-service", { name: "ups" });

export default {

	["units-manager"]: unitsMR,
  ["units-data"]: unitsDT,
  players,
  ["remote-service"]: remoteService,
  //cells,
  defs,
  controller,
  ups,
  units,
  actors,

}
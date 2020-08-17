import { stream2 } from "m2"
import actors from "./actors"
import controller from "./controller"
import {default as defs} from "./defs"
import remoteService from "./remote-service"
import * as player from './players'
import { playersMR } from './players';

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

	return stream2( null, (e, controller) => {

		controller.tocommand( (action) => {
			if(action === "player-reaction") {
				e( [ { id: 777 } , { name: "player-login" } ] );
			}
		} );

  } )
	.reduceF(
      obtain("@remote-service", { name: "units-manager" }),
      ([acc], [ data, action ]) => {
	      if(action.name === "create") {
		      return [ [ ...acc, ...action.data ], action ];
	      }
	      else if(action.name === "player-login") {

	      	if(acc.some(({ kind }) => kind === "player")) {
						return ;
					}

	      	const addiction = [
						{ kind: "player", id: data.id },
						{ kind: "shell", player: { id: data.id } },
						{ kind: "ship", player: { id: data.id } },
					];
					return [
						[ ...acc, ...addiction ],
						{ name: "create", data: addiction, }
					];
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

const celld = () => {

	return stream2( null, e => {
		e([ { kind: "cell", active: true, x: 10, y: 10 } ]);
	} );

};

//const ups = () => stream2.ups();

//const socket = new WebSocket("ws://localhost:3000");
const ups = ({ obtain }) => obtain("@remote-service", { name: "ups" });

const gameState = ({ obtain }) => {
	return stream2
		.fromCbFn(() => {})
		.reduceRemote(
			() => {}, obtain('@remote-service', { path: 'game-state' })
		);
};

const intl = () => {
	return stream2.fromFn(() => [{ locale: 'ru' }]);
};

export default {

	intl,
	controller,
	['remote-service']: remoteService,
	defs,
	['game-state']: gameState,
	player,

}
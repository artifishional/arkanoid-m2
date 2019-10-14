import {stream2} from "m2"

export default ({ obtain }) =>
	stream2(null, (e) => {

	})
		.reduceF(
			obtain("@remote-service", { name: "players-manager" }),
			(acc, [ data, action ]) => {
				if(action.name === "login") {
					return [ [ ...acc, ...action.data ], action ];
				}
			},
		)
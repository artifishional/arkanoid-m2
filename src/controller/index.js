import { stream2 as stream } from "m2"

export default ( ) => {
	return stream
		.fromEvent(window, 'keyup keydown')
		.reduce(([{ axis }], { key, type }) => {
			if(type === "keydown") {
				if(key === "ArrowRight") {
					return [ { axis: 1 } ];
				}
				else if(key === "ArrowLeft") {
					return [ { axis: -1 } ];
				}
			}
			else if(type === "keyup") {
				if([
					key === "ArrowRight" && axis === 1,
					key === "ArrowLeft" && axis === -1,
				].some(Boolean)) {
					return [ { axis: 0 } ];
				}
			}
		}, { local: [{ axis: 0 }] })
}
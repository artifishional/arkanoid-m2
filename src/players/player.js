import {stream2} from "m2"

export default ({ id }) => {

	return stream2(null, (e) => {
		e( [ { id } ] );
	}).store();

}
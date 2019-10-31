import {stream2} from "m2"

export default ({ obtain }) => {

	return stream2(null, (e, controller) => {

		obtain("@units-manager").connect(
			hook => {
				controller.to(hook);
				return e;
			});
	});

}
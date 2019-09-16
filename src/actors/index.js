import ship from "./ship"
import shell from "./shell"
import cell from "./cell"

let ACTORS_UNIQUE_ID_COUNTER = 1;

export default ( { obtain, kind, player, config, signature } ) => {

  if(signature.kind === "ship") {
		return ship({ obtain, player, id: ACTORS_UNIQUE_ID_COUNTER++ });
	}
  else if(signature.kind === "shell") {
	  return shell({ obtain, player, id: ACTORS_UNIQUE_ID_COUNTER++ });
  }
	else if(signature.kind === "cell") {
		return cell({ obtain, id: ACTORS_UNIQUE_ID_COUNTER++, config });
	}
  throw "unsupported actor model kind";
  
}
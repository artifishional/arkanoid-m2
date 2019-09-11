import ship from "./ship"
import shell from "./shell"
import cell from "./cell"

let ACTORS_UNIQUE_ID_COUNTER = 1;

export default ( { obtain, player, index, signature: { kind, ...signature } }) => {
  if(kind === "ship") {
		return ship({ obtain, signature, player, id: ACTORS_UNIQUE_ID_COUNTER++ });
	}
  else if(kind === "shell") {
	  return shell({ obtain, signature, player, id: ACTORS_UNIQUE_ID_COUNTER++ });
  }
	else if(kind === "cell") {
		return cell({ obtain, signature, id: ACTORS_UNIQUE_ID_COUNTER++, index });
	}
  throw "unsupported actor model kind";
  
}
import ship from "./ship"
import shell from "./shell"
import cell from "./cell"

let ACTORS_UNIQUE_ID_COUNTER = 1;

export default ( { obtain, kind, player, index } ) => {

  if(kind === "ship") {
		return ship({ obtain, player, id: ACTORS_UNIQUE_ID_COUNTER++ });
	}
  else if(kind === "shell") {
	  return shell({ obtain, player, id: ACTORS_UNIQUE_ID_COUNTER++ });
  }
	else if(kind === "cell") {
		return cell({ obtain, id: ACTORS_UNIQUE_ID_COUNTER++, index });
	}
  throw "unsupported actor model kind";
  
}
import {CANVAS, SHELL, SHIP} from "../defs";

let ACTORS_UNIQUE_ID_COUNTER = 1;
const { min, max, abs } = Math;

export default ( { obtain, kind, player } ) => {

  if(kind === "ship") {
    return obtain("@ups")
        .withlatest([obtain("@units"), obtain("@controller", { id: player })])
        .reduceF(
            [ship({
                x: 1600,
                y: CANVAS.HEIGHT - SHIP.HEIGHT,
                id: ACTORS_UNIQUE_ID_COUNTER++,
            })],
            ([ { x, y, id } ], [,,[{ axis }]]) => {
	            x += axis * SHIP.SPEED;
                x = min(max(-SHIP.WIDTH / 2, x), CANVAS.WIDTH - SHIP.WIDTH / 2);
	            const x1 = x + SHIP.WIDTH;
	            const y1 = y + SHIP.HEIGHT;
                return [{ x, y, x1, y1, id }];
            }
        );
  }
  else if(kind === "shell") {
	  return obtain("@ups")
		  .withlatest([
		      obtain("@units"),
              obtain("@controller", { id: player }),
              obtain("@actors", { kind: "ship" })
          ])
		  .reduceF(
			  [shell({
			      x: 1800,
				  y: 500,
                  speed: { x: 15, y: 10 },
				  id: ACTORS_UNIQUE_ID_COUNTER++,
			  })],
			  ([ { x, y, prev, speed, id } ], [, [ units ] ]) => {
				
				  const _prev = { x, y };
			   
				  x += speed.x;
				  y += speed.y;
				
				  x = min(max(0, x), CANVAS.WIDTH - SHELL.D);
				  y = min(max(0, y), CANVAS.HEIGHT - SHELL.D);
				  
				  let x1 = x + SHELL.D;
				  let y1 = y + SHELL.D;
				
				  const _collision = units.findIndex( ([unit]) => {
				      return id !== unit.id && collision({x, y, x1, y1}, unit)
				  });
				
				
				  if (_collision > -1) {
				      const [ unit ] = units[_collision];
					  let dtx = 0;
					  let dty = 0;
					  if (speed.x > 0) {
						  dtx = prev.x + SHELL.D - unit.x;
					  }
					  else {
						  dtx = prev.x - unit.x1;
                      }
					  if (speed.y > 0) {
						  dty = prev.y + SHELL.D - unit.y;
					  }
					  else {
						  dty = prev.y - unit.y1;
					  }
					  if(abs(dtx / speed.x) < abs(dty / speed.y)) {
						  if (speed.x > 0) {
							  dtx = x1 - unit.x;
						  }
						  else {
							  dtx = x - unit.x1;
						  }
					      x -= dtx;
						  x1 -= dtx;
						  speed = { ...speed, x: -speed.x };
                      }
					  else {
						  if (speed.y > 0) {
							  dty = y1 - unit.y;
						  }
						  else {
							  dty = y - unit.y1;
						  }
						  y -= dty;
						  y1 -= dty;
						  speed = { ...speed, y: -speed.y };
                      }
				  }
				  
				  if(x1 === CANVAS.WIDTH || x === 0) {
					  speed = { ...speed, x: -speed.x };
				  }
				
				  if(y1 === CANVAS.HEIGHT || y === 0) {
					  speed = { ...speed, y: -speed.y };
				  }
				  
				  return [{
				      cx: x + SHELL.R, cy: y + SHELL.R,
                      prev: _prev, x, y, x1, y1, speed, id
				  }];
			  }
		  );
  }
  throw "unsupported actor model kind";
  
}

function ship({ x, y, ...state }) {
    return { x, y, ...state, x1: x + SHIP.WIDTH, y1: y + SHIP.HEIGHT };
}

function shell({ x, y, ...state }) {
	return {
	    x, y, ...state,
        cx: x + SHELL.R, cy: y + SHELL.R,
        //предыдущее состояние здесь не может быть верным
        prev: { x, y },
        x1: x + SHELL.D, y1: y + SHELL.D,
	};
}

function collision(rect1, rect2) {
	return (
        rect1.x < rect2.x1 &&
		rect1.x1 > rect2.x &&
		rect1.y < rect2.y1 &&
		rect1.y1 > rect2.y
    );
}
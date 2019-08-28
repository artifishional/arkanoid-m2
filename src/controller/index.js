import { stream } from "m2"

export default ( { id } ) => {
  return stream( emt => {
    let state = { axis: 0 };
    emt( [ state ] );
    window.addEventListener("keydown", ({ key }) => {
      if(key === "ArrowRight") {
	      emt( [ state = { axis: 1 } ] );
      }
      else if(key === "ArrowLeft") {
          emt( [ state = { axis: -1 } ] );
      }
    });
    window.addEventListener("keyup", ({ key }) => {
      if([
          key === "ArrowRight" && state.axis === 1,
	      key === "ArrowLeft" && state.axis === -1,
      ].some(Boolean)) {
          emt( [ state = { axis: 0 } ] );
      }
    });
  } );
}
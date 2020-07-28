import { stream2 as stream } from "m2"

export const CANVAS = {
	WIDTH: 1920,
	HEIGHT: 1080,
};

export const SHIP = {
	SPEED: 25,
	WIDTH: 250,
	HEIGHT: 50,
};

export const SHELL = {
	R: 30,
	D: 30 * 2,
	SPEED: 25,
};

export const CELL = {
	WIDTH: 50,
	HEIGHT: 50,
};

export default () => stream
	.fromFn(() => [{ CANVAS, SHIP, SHELL, CELL }]);
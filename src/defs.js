import { stream } from "m2"

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

export default () => stream( emt => emt( { CANVAS, SHIP, SHELL } ) );
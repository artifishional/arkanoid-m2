import { stream2 } from "m2"

const ws = new WebSocket("ws://localhost:3000");
export default () => stream2.from(ws);
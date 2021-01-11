import { stream2 as stream } from 'm2';

export default ({ obtain, player: { id } }) => {
	return stream
		.fromEvent(window, 'keyup keydown')
		.filter(({ key }) => ['ArrowRight', 'ArrowLeft'].includes(key))
		.map(({ key , type }) => ({ key , type }))
		.reduce(([{ axis }], { key, type }) => {
			if(type === 'keydown') {
				if(key === 'ArrowRight') {
					return [{ axis: 1 }];
				}
				if(key === 'ArrowLeft') {
					return [{ axis: -1 }];
				}
			}
			if(type === 'keyup') {
				if([
					key === 'ArrowRight' && axis === 1,
					key === 'ArrowLeft' && axis === -1,
				].some(Boolean)) {
					return [{ axis: 0 }];
				}
			}
		}, { remote: obtain(
				'@remote-service',
				{ path: 'controller', args: { player: { id } } }
			) },
			{ label: 'b' },
		);
}

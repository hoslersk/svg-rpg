import { filter } from 'lodash';

export function getCollisions(props) {
	const { x, y, height, width, collisionOffsetX, collisionOffsetY, collisionElements } = props;

	const collisions = filter(collisionElements, element => {
		const withinRightEdge = x + width > element.x;
		const withinLeftEdge = x - collisionOffsetX < element.x + element.width;
		const withinBottomEdge = y + height > element.y;
		const withinTopEdge = y - collisionOffsetY < element.y + element.height;
		return withinRightEdge && withinLeftEdge && withinBottomEdge && withinTopEdge;
	});

	return collisions;
}

export function collision(rect1, rect2) {
  return (
    rect1.x < rect2.x1 &&
    rect1.x1 > rect2.x &&
    rect1.y < rect2.y1 &&
    rect1.y1 > rect2.y
  );
}
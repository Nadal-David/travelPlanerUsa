const squaredDistanceToSegment = (point, start, end) => {
  let x = start[0];
  let y = start[1];
  const dx = end[0] - x;
  const dy = end[1] - y;

  if (dx || dy) {
    const ratio = ((point[0] - x) * dx + (point[1] - y) * dy) / (dx * dx + dy * dy);
    if (ratio > 1) {
      x = end[0];
      y = end[1];
    } else if (ratio > 0) {
      x += dx * ratio;
      y += dy * ratio;
    }
  }

  const pointDx = point[0] - x;
  const pointDy = point[1] - y;
  return pointDx * pointDx + pointDy * pointDy;
};

export const simplifyCoordinates = (coordinates, tolerance = 0.00008) => {
  if (coordinates.length <= 2) return coordinates;
  const threshold = tolerance * tolerance;
  const markers = new Uint8Array(coordinates.length);
  const stack = [[0, coordinates.length - 1]];
  markers[0] = 1;
  markers[coordinates.length - 1] = 1;

  while (stack.length) {
    const [first, last] = stack.pop();
    let furthestIndex = 0;
    let furthestDistance = threshold;
    for (let index = first + 1; index < last; index += 1) {
      const distance = squaredDistanceToSegment(coordinates[index], coordinates[first], coordinates[last]);
      if (distance > furthestDistance) {
        furthestIndex = index;
        furthestDistance = distance;
      }
    }
    if (!furthestIndex) continue;
    markers[furthestIndex] = 1;
    stack.push([first, furthestIndex], [furthestIndex, last]);
  }

  return coordinates.filter((_, index) => markers[index]);
};

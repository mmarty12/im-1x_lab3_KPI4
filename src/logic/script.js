const createCollections = function (inputData) {
  const figurePoints = [];
  const landscapePoints = [];

  const rows = inputData.dimensions.rows;
  const cols = inputData.dimensions.cols;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const char = inputData.grid[i][j];
      const point = { x: j, y: i };

      if (char === 'p') {
        figurePoints.push(point);
      } else if (char === '#') {
        landscapePoints.push(point);
      }
    }
  }
  return { figurePoints, landscapePoints };
};

const createGrid = function (data) {
  try {
    if (data.length === 0 || data[0] === '') {
      throw new Error('Input array is empty');
    }
    const dimensions = data[0].split(' ').map(Number);
    const rows = dimensions[0];
    const cols = dimensions[1];
    const grid = [];
    for (let i = 1; i < data.length; i++) {
      const row = data[i].split('');
      grid.push(row);
    }
    return { dimensions: { rows, cols }, grid };
  } catch (e) {
    throw new Error(`Error: ${e.message}`);
  }
};

class Field {
  constructor(dimensions, figurePoints, landscapePoints) {
    this.dimensions = dimensions;
    this.figurePoints = figurePoints;
    this.landscapePoints = landscapePoints;
  }
}

const moveFigureDown = function (field) {
  const newFigurePoints = field.figurePoints.map((point) => ({
    x: point.x,
    y: point.y + 1,
  }));
  const overlap = newFigurePoints.some((point) =>
    field.landscapePoints.some(
      (landscapePoint) =>
        landscapePoint.x === point.x && landscapePoint.y === point.y
    )
  );
  const outOfBounds = newFigurePoints.some(
    (point) => point.y >= field.dimensions.rows
  );

  if (overlap || outOfBounds) {
    return field;
  }
  return new Field(field.dimensions, newFigurePoints, field.landscapePoints);
};

const convertFieldToText = function (field) {
  const { rows, cols } = field.dimensions;
  const grid = Array.from({ length: rows }, () => Array(cols).fill('.'));

  field.figurePoints.forEach(({ x, y }) => {
    grid[y][x] = 'p';
  });

  field.landscapePoints.forEach(({ x, y }) => {
    grid[y][x] = '#';
  });

  const gridText = grid.map((row) => row.join('')).join('\n');
  return [gridText].join('\n');
};

module.exports = {
  createCollections,
  createGrid,
  Field,
  moveFigureDown,
  convertFieldToText,
};

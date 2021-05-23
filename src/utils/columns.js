export function numberOfColumnsPerRow() {
  const windowWidth = window.innerWidth;

  if (windowWidth >= 1200) {
    return 4;
  } else if (windowWidth >= 992) {
    return 3;
  } else if (windowWidth >= 768) {
    return 2;
  } else {
    return 1;
  }
}

export function positionOnGrid(numberOfColumnsPerRow, itemIndex) {
  let mod = (itemIndex + numberOfColumnsPerRow) % numberOfColumnsPerRow;
  let column = mod === 0 ? numberOfColumnsPerRow : mod;
  let row = Math.ceil((itemIndex + numberOfColumnsPerRow) / numberOfColumnsPerRow) - 1;

  return { column, row };
}

export function calculatePositionForIndex(listingIndex) {
  if (typeof listingIndex !== "number") {
    return null;
  }
  return positionOnGrid(
    numberOfColumnsPerRow(),
    listingIndex + 1 // plus 1 coz it starts with 0
  ).column;
}



// WEBPACK FOOTER //
// ./src/utils/columns.js
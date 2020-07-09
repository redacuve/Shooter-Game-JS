export function getIndexEngineSound(str) {
  switch (str) {
    case 'sprPlayerP51D':
      return 0;
    case 'sprPlayerP47':
      return 1;
    case 'sprPlayerP39':
      return 2;
    default:
      return 0;
  }
}

export function getScorePoints(enemy) {
  switch (enemy.texture.key) {
    case 'sprEneSm':
      return 50;
    case 'sprEneMid':
      return 75;
    case 'sprEneBom':
      return 100;
    default:
      return 0;
  }
}

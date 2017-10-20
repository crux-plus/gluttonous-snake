function checkTwoRectangleIntersection(
  { top: top1=0, right: right1=0, left: left1=0, bottom: bottom1=0 },
  { top: top2=0, right: right2=0, left: left2=0, bottom: bottom2=0 }) {

  let flag = false;
  if (((bottom1 > top2) && (bottom2 > top1)) &&
    ((right2 > left1) && (right1 > left2))) {
    flag = true;
  }
  return flag;
}

function checkTwoSquareIntersection(
  { x: x1=0, y: y1=0, size: size1=0 },
  { x: x2=0, y: y2=0, size: size2=0 }) {

  const rec1 = {
    top: x1,
    left: y1,
    bottom: x1 + size1,
    right: y1 + size1,
  };
  const rec2 = {
    top: x2,
    left: y2,
    bottom: x2 + size2,
    right: y2 + size2,
  };
  return checkTwoRectangleIntersection(rec1, rec2);
}

export {
  checkTwoRectangleIntersection,
  checkTwoSquareIntersection,
};

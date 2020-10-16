/**
 * 判断点是否在区域范围内
 * @param { Object } pointAxis { x: 1, y: 2}
 * @param { Array<Object> } scaleAxis [{x: 250, y: 50}, {x: 765, y: 50}, {x: 250, y: 723},{x: 765, y: 723]
 * @returns { Boolean }
 */
export const judgePointInScale = function(pointAxis, scaleAxis) {
    if (
      pointAxis.x >= scaleAxis[0].x &&
      pointAxis.x <= scaleAxis[1].x &&
      pointAxis.y >= scaleAxis[0].y &&
      pointAxis.y <= scaleAxis[2].y
    ) {
      return true;
    } else {
      return false;
    }
}

/**
 * 获取元素的坐标值
 * @param { Element } element 
 * @returns { Array<Object> } [{x: 250, y: 50}, {x: 765, y: 50}, {x: 250, y: 723},{x: 765, y: 723]
 */
export const getElementAxis = function(element){
    let elementInfo = element.getBoundingClientRect();
    let elementAxis = [
      { x: elementInfo.left, y: elementInfo.top },
      {
        x: elementInfo.left + elementInfo.width,
        y: elementInfo.top,
      },
      {
        x: elementInfo.left,
        y: elementInfo.top + elementInfo.height,
      },
      {
        x: elementInfo.left + elementInfo.width,
        y: elementInfo.top + elementInfo.height,
      },
    ]; 
    return elementAxis
}

export const getElementWidthAndHeight = function(element){
  let elementInfo = element.getBoundingClientRect();
  return{
    width:elementInfo.width,
    height:elementInfo.height
  }
}
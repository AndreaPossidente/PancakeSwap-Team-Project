/**
 *
 * @param {NodeListOf<Element>} elements array di elementi HTML che contengono solo numeri come children
 */
export default function increaseNum(elements) {
  try {
    elements.forEach((element) => {
      let counter = 0;
      const currentNum = Number(element.innerHTML);
      const interval = setInterval(() => {
        if (counter < currentNum) {
          counter += currentNum / 200;
          element.innerHTML = counter.toFixed(3);
        } else {
          clearInterval(interval);
        }
      });
    }, 300);
  } catch (error) {
    console.error(error);
  }
}

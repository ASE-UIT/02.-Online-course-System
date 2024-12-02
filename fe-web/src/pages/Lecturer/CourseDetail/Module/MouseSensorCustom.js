import { MouseSensor } from "@dnd-kit/core";

export class MouseSensor2 extends MouseSensor {
  static activators = [
    {
      eventName: "onMouseDown",
      handler: ({ nativeEvent: event }) => {
        return shouldHandleEvent(event.target);
      },
    },
  ];
}
function shouldHandleEvent(element) {
  // Prevent dragging if the target or any of its parents have data-no-dnd or are non-draggable
  let cur = element;
  while (cur) {
    // Check for data-no-dnd attribute on the current element or any parent
    if (cur.getAttribute("data-no-dnd") === "true" || cur.classList.contains("non-draggable")) {
      return false;
    }
    cur = cur.parentElement;
  }

  return true;
}

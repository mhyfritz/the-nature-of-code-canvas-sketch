export function withMouse(sketch) {
  return initalProps => {
    const { canvas, width, height } = initalProps;
    const mouse = { x: undefined, y: undefined, event: undefined };

    canvas.addEventListener("mousemove", event => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = (event.clientX - rect.left) * (width / rect.width);
      mouse.y = (event.clientY - rect.top) * (height / rect.height);
      mouse.event = event;
    });

    const render = sketch(initalProps);
    return renderProps => {
      renderProps.mouse = mouse;
      render(renderProps);
    };
  };
}

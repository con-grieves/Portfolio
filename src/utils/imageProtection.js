export const protectedImageSx = {
  userSelect: 'none',
  WebkitUserSelect: 'none',
  WebkitUserDrag: 'none',
  pointerEvents: 'none',
};

export const protectedImageWrapperSx = {
  userSelect: 'none',
  WebkitUserSelect: 'none',
  WebkitTouchCallout: 'none',
};

export function blockImageContextMenu(event) {
  event.preventDefault();
}

export function blockImageDrag(event) {
  event.preventDefault();
}

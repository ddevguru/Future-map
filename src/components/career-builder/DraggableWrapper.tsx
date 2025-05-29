import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import Draggable, { DraggableProps, DraggableData, DraggableEvent } from 'react-draggable';

interface DraggableWrapperProps extends Omit<DraggableProps, 'onStop'> {
  onStop?: (cardId: string, e: DraggableEvent, data: DraggableData) => void;
  cardId: string;
}

export const DraggableWrapper = forwardRef<HTMLElement, DraggableWrapperProps>(
  ({ children, cardId, onStop, ...props }, ref) => {
    const nodeRef = useRef<HTMLElement>(null);

    // Expose the nodeRef to the parent via the forwarded ref
    useImperativeHandle(ref, () => nodeRef.current as HTMLElement);

    const handleStop = (e: DraggableEvent, data: DraggableData) => {
      if (onStop) {
        onStop(cardId, e, data);
      }
    };

    return (
      <Draggable {...props} onStop={handleStop} nodeRef={nodeRef}>
        <div ref={nodeRef as React.RefObject<HTMLDivElement>}>{children}</div>
      </Draggable>
    );
  }
);

DraggableWrapper.displayName = 'DraggableWrapper';
import React, { FC, useState, useRef, useEffect, useLayoutEffect } from 'react';
import ReactDOM from 'react-dom';
import { PopupProps } from './types';
import { useOnEscape, useRepositionOnResize, useOnClickOutside } from './hooks';

import styles from './index.css';
import calculatePosition from './Utils';

const getRootPopup = () => {
  let PopupRoot = document.getElementById('popup-root');

  if (PopupRoot === null) {
    PopupRoot = document.createElement('div');
    PopupRoot.setAttribute('id', 'popup-root');
    document.body.appendChild(PopupRoot);
  }

  return PopupRoot;
};

export const Popup: FC<PopupProps> = ({
  trigger = null,
  onOpen = () => {},
  onClose = () => {},
  defaultOpen = false,
  open = false,
  disabled = false,
  nested = false,
  closeOnDocumentClick = true,
  repositionOnResize = true,
  closeOnEscape = true,
  on = ['click'],
  contentStyle = {},
  arrowStyle = {},
  overlayStyle = {},
  className = '',
  position = 'bottom center',
  modal = false,
  lockScroll = false,
  arrow = true,
  offsetX = 0,
  offsetY = 0,
  mouseEnterDelay = 100,
  mouseLeaveDelay = 100,
  keepTooltipInside = false,
  children,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(open || defaultOpen);
  const triggerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);

  const isModal = modal ? true : !trigger;
  const timeOut = useRef<any>(0);

  useLayoutEffect(() => {
    if (isOpen) setPosition();
  }, [isOpen]);

  // for uncontrolled popup we need to sync isOpen with open prop
  useEffect(() => {
    setIsOpen(open && !disabled);
  }, [open]);

  useEffect(() => {
    if (isOpen) {
      onOpen();
      lockScrolll();
    } else {
      onClose();
      resetScroll();
    }
    return () => {
      clearTimeout(timeOut.current);
      resetScroll();
    };
  }, [isOpen]);
  // Actions

  const openPopup = () => {
    if (isOpen || disabled) return;
    setIsOpen(true);
  };

  const closePopup = () => {
    if (!isOpen) return;
    setIsOpen(false);
  };
  const togglePopup = () => setIsOpen(isOpen => !isOpen && !disabled);

  const onMouseEnter = () => {
    clearTimeout(timeOut.current);
    timeOut.current = setTimeout(openPopup, mouseEnterDelay);
  };

  const onMouseLeave = () => {
    clearTimeout(timeOut.current);
    timeOut.current = setTimeout(closePopup, mouseLeaveDelay);
  };
  const lockScrolll = () => {
    if (isModal && lockScroll)
      document.getElementsByTagName('body')[0].style.overflow = 'hidden'; // migrate to document.body
  };

  const resetScroll = () => {
    if (isModal && lockScroll)
      document.getElementsByTagName('body')[0].style.overflow = 'auto';
  };

  // set Position
  const setPosition = () => {
    if (isModal || !isOpen) return;
    if (!triggerRef?.current || !triggerRef?.current || !contentRef?.current)
      return; /// show error as one of ref is undefined
    const trigger = triggerRef.current.getBoundingClientRect();
    const content = contentRef.current.getBoundingClientRect();
    const cords = calculatePosition(
      trigger,
      content,
      position,
      arrow,
      {
        offsetX,
        offsetY,
      },
      keepTooltipInside
    );
    contentRef.current.style.top = `${cords.top + window.scrollY}px`;
    contentRef.current.style.left = `${cords.left + window.scrollX}px`;
    if (arrow && !!arrowRef.current) {
      arrowRef.current.style.transform = cords.transform;
      arrowRef.current.style.setProperty('-ms-transform', cords.transform);
      arrowRef.current.style.setProperty('-webkit-transform', cords.transform);
      arrowRef.current.style.top = arrowStyle.top?.toString() || cords.arrowTop;
      arrowRef.current.style.left =
        arrowStyle.left?.toString() || cords.arrowLeft;
      arrowRef.current.classList.add(`popup-arrow`);
      if (className !== '') {
        arrowRef.current.classList.add(`${className}-arrow`);
      }
    }
  };
  // hooks
  useOnEscape(closePopup, closeOnEscape); // can be optimized if we disabled for hover
  useRepositionOnResize(setPosition, repositionOnResize);
  useOnClickOutside(
    [contentRef, triggerRef],
    closePopup,
    closeOnDocumentClick && !nested
  ); // we need to add a ne
  // render the trigger element and add events
  const renderTrigger = () => {
    console.log('render trigger');

    const triggerProps: any = {
      key: 'T',
      ref: triggerRef,
    };
    const onAsArray = Array.isArray(on) ? on : [on];
    for (let i = 0, len = onAsArray.length; i < len; i++) {
      switch (onAsArray[i]) {
        case 'click':
          triggerProps.onClick = togglePopup;
          break;
        case 'hover':
          triggerProps.onMouseEnter = onMouseEnter;
          triggerProps.onMouseLeave = onMouseLeave;
          break;
        case 'focus':
          triggerProps.onFocus = onMouseEnter;
          break;
        default:
      }
    }

    if (typeof trigger === 'function') {
      const comp = trigger(isOpen);
      return !!trigger && React.cloneElement(comp, triggerProps);
    }

    return !!trigger && React.cloneElement(trigger, triggerProps);
  };

  const addWarperAction = () => {
    const popupContentStyle = isModal
      ? styles.popupContent.modal
      : styles.popupContent.tooltip;

    const childrenElementProps: any = {
      className: `popup-content ${
        className !== '' ? `${className}-content` : ''
      }`,
      style: Object.assign({}, popupContentStyle, contentStyle),
      ref: contentRef,
      onClick: (e: any) => {
        e.stopPropagation();
      },
    };
    if (!modal && on.indexOf('hover') >= 0) {
      childrenElementProps.onMouseEnter = onMouseEnter;
      childrenElementProps.onMouseLeave = onMouseLeave;
    }
    return childrenElementProps;
  };

  const renderContent = () => {
    return (
      <div {...addWarperAction()} key="C">
        {arrow && !isModal && (
          <div
            ref={arrowRef}
            style={Object.assign({}, styles.popupArrow, arrowStyle)}
          />
        )}
        {children && typeof children === 'function'
          ? children(closePopup, isOpen)
          : children}
      </div>
    );
  };

  const overlay = !(on.indexOf('hover') >= 0);
  const ovStyle = isModal ? styles.overlay.modal : styles.overlay.tooltip;

  const content = [
    overlay && (
      <div
        key="O"
        className={`popup-overlay ${
          className !== '' ? `${className}-overlay` : ''
        }`}
        style={Object.assign(ovStyle, overlayStyle)}
        onClick={closeOnDocumentClick && nested ? closePopup : undefined}
      >
        {isModal && renderContent()}
      </div>
    ),
    !isModal && renderContent(),
  ];

  return (
    <>
      {renderTrigger()}
      {isOpen && ReactDOM.createPortal(content, getRootPopup())}
    </>
  );
};

export default Popup;

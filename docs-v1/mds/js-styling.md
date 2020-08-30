---
id: js-styling
position: 1
path: Js Styling
title: React Popup Component - Js Styling
description: A Simple React popup component.Use it as a tooltip,modal,sub-menu and match more ...
---

## js Styling

## Using Styled-Components
```javascript
const StyledPopup = styled(Popup)`
  // use your custom style for ".popup-overlay"
  &-overlay {
   ...
  }
  // use your custom style for ".popup-content"
  &-content {
   ...
  }
`

const Modal = () => (
  <StyledPopup
    trigger={<button className="button"> Open Modal </button>}
    modal
    closeOnDocumentClick
  >
    <span> Modal content </span>
  </StyledPopup>
);

render(<Modal />);
```

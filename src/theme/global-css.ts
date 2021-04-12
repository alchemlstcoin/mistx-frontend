import { css } from '@emotion/react';

export const GlobalStyles = css`
  /*
    This will hide the focus indicator if the element receives focus    via the mouse,
    but it will still show up on keyboard focus.
  */
  .js-focus-visible :focus:not([data-focus-visible-added]) {
    outline: none;
    box-shadow: none;
  }
  .bn-onboard-custom.bn-onboard-dark-mode {
    background: #2f3747 !important;
  }
  .bn-onboard-custom.bn-onboard-dark-mode-background-hover:hover,
  .bn-onboard-custom.bn-onboard-dark-mode-background {
    background: #1a202c !important;
  }
  .bn-onboard-custom.bn-onboard-dark-mode-link {
    color: #0b86f4 !important;
    border-color: #0b86f4 !important;
  }
  .bn-onboard-selected-wallet {
    background: #0b86f4 !important;
  }
  .bn-onboard-custom.bn-onboard-modal {
    z-index: 999 !important;
  }
`;

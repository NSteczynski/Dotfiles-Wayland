// ==UserScript==
// @name        Pepper
// @include     *://*.pepper.pl/*
// ==/UserScript==

/* ~/.config/qutebrowser/greasemonkey/pepper.css.js :: */

  // #*AdSlotPortal, #sidebarTopAdSlotPortal, #sidebarBottomAdSlotPortal {
GM_addStyle(`
  div[id*="AdSlotPortal"] {
    display: none !important;
  }
`);

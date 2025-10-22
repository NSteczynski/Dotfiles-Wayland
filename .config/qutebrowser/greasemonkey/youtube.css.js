// ==UserScript==
// @name        YouTube
// @include     *://*.youtube.com/*
// ==/UserScript==

/* ~/.config/qutebrowser/greasemonkey/youtube.css.js :: */

GM_addStyle(`
  ytd-ad-slot-renderer, .ytd-companion-slot-renderer,
  .ytd-action-companion-ad-renderer, .ytd-ad-slot-renderer,
  .ytd-promoted-sparkles-web-renderer {
    display: none !important;
  }
`);

const manip = (actions) => {
    actions.forEach(({ selector, action, func }) => {
        let elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            if(element!==null && element!==undefined){
                if(element.style.display!=="none"){
                    if (action === 'remove') {
                        element.remove();
                    } else if (action === 'hide') {
                        element.style.display = "none";
                    } else if (action === 'click') {
                        element.click();
                    } else if (action === 'remove-run') {
                        element.remove();
                        eval(func);
                    }
                }
            }
        });
    });
};
 
const playVid = () => {
    const video = document.querySelector("video");
    if(video!==null){
        if(!video.playing && video.currentTime<1){
            video.play();
        }
    }
}
 
setInterval(() => {
    try{
        manip([
            { selector: "tp-yt-paper-dialog:has(#feedback.ytd-enforcement-message-view-model)", action: 'remove-run', func: playVid()},
            { selector: ".ytp-ad-overlay-close-button", action: 'click' },
            { selector: ".style-scope.ytd-watch-next-secondary-results-renderer.sparkles-light-cta.GoogleActiveViewElement", action: 'hide' },
            { selector: ".style-scope.ytd-item-section-renderer.sparkles-light-cta", action: 'hide' },
            { selector: ".ytp-ad-message-container", action: 'hide' },
            { selector: ".style-scope.ytd-companion-slot-renderer", action: 'remove' },
            { selector: "#masthead-ad", action: 'remove' },
            { selector: "ytd-ad-slot-renderer", action: 'remove' },
            { selector: "ytd-reel-shelf-renderer", action: 'remove' },
            { selector: "ytd-player-legacy-desktop-watch-ads-renderer", action: 'hide'},
            { selector: ".ytp-ad-player-overlay-layout", action: 'hide' },
            { selector: "ytd-reel-video-renderer:has(.ytd-ad-slot-renderer)", action: "remove"},
            { selector: "ytd-in-feed-ad-layout-renderer", action: 'remove' },
            { selector: "ytd-engagement-panel-section-list-renderer[target-id='engagement-panel-ads']", action: 'hide' },
            { selector: "ytd-popup-container:has(a[href='/premium'])", action: 'hide' },
            { selector: "yt-mealbar-promo-renderer", action: 'hide' }
        ]);
 
        let videoStream = document.querySelector("video"),
            skipAdButton = document.querySelector(`.ytp-skip-ad-button,.ytp-ad-skip-button,.ytp-ad-skip-button-modern`);
 
 
        if (videoStream) {
            let ad = document.querySelector(".video-ads.ytp-ad-module").firstChild || document.querySelector(".ytp-exp-ppp-update.ad-created.ad-showing.ad-interrupting");
            if (ad !== null) {
                if(ad.childElementCount > 0){
                    videoStream.playbackRate = 16;
                    if (!isNaN(videoStream.duration) && isFinite(videoStream.duration) &&
                        !isNaN(videoStream.currentTime) && isFinite(videoStream.currentTime)) {
                        videoStream.currentTime += videoStream.duration;
                    }
                    videoStream.muted = true;
                }
                else{
                    videoStream.muted = false;
                }
            }else{
                videoStream.muted = false;
            }
        }
 
        if (skipAdButton !== null) {
            skipAdButton.click();
        }
    }catch(e){}
}, 100);

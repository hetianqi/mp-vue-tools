var SCROLLBAR_WIDTH;
var BODY_SCROLLBAR_WIDTH;

export default function getScrollbarWidth(isBody) {
    var body = document.querySelector('body');

    if (isBody) {
        if (typeof SCROLLBAR_WIDTH === 'undefined') {
            body.className = body.className + ' mp-body-scrollbar-measure';
            BODY_SCROLLBAR_WIDTH = window.innerWidth - body.clientWidth;
            BODY_SCROLLBAR_WIDTH = isFinite(BODY_SCROLLBAR_WIDTH) ? BODY_SCROLLBAR_WIDTH : 0;
            body.className = body.className.replace(' mpui-body-scrollbar-measure', '');
        }
        return BODY_SCROLLBAR_WIDTH;
    } else {
        if (typeof SCROLLBAR_WIDTH === 'undefined') {
          var div = document.createElement('div');
          div.className = 'mp-scrollbar-measure';
          body.appendChild(div);
          SCROLLBAR_WIDTH = div.offsetWidth - div.clientWidth;
          SCROLLBAR_WIDTH = isFinite(SCROLLBAR_WIDTH) ? SCROLLBAR_WIDTH : 0;
          body.removeChild(div);
        }
        return SCROLLBAR_WIDTH;
    }
}
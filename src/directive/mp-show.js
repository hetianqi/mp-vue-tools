import { addClass, removeClass } from '../lib/dom-util';

const HIDDENCLASSNAME = 'hidden';

function mpShowDirective(el, { value }) {
    if (value) {
        removeClass(el, HIDDENCLASSNAME);
    } else {
        addClass(el, HIDDENCLASSNAME);
    }
};

mpShowDirective.directiveName = 'mp-show';

export default mpShowDirective;
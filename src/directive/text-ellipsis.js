import { addClass } from '../lib/dom-util';

function textEllipsisDirective(el, { value }) {
    addClass(el, 'text-ellipsis');
    el.setAttribute('title', value);
    el.textContent = value;
};

textEllipsisDirective.directiveName = 'text-ellipsis';

export default textEllipsisDirective;
const HIDDENCLASSNAME = 'hidden';

function mpShowDirective(el, { value }) {
    if (value) {
        el.classList.remove(HIDDENCLASSNAME);
    } else {
        el.classList.add(HIDDENCLASSNAME);
    }
};

mpShowDirective.directiveName = 'mp-show';

export default mpShowDirective;
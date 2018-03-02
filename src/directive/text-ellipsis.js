function textEllipsisDirective(el, { value }) {
    el.classList.add('text-ellipsis');
    el.setAttribute('title', value);
    el.textContent = value;
};

textEllipsisDirective.directiveName = 'text-ellipsis';

export default textEllipsisDirective;
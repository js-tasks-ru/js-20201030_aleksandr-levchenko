class Tooltip {

    static instance;

    constructor() {
        if (Tooltip.instance) {
            return Tooltip.instance;
        }

        Tooltip.instance = this;
    }

    initialize() {
        this.initEvent();
    }

    render(title = '') {
        this.element = this.getTemplate(title);

        document.body.append(this.element);
    }

    getTemplate(title) {
        const element = document.createElement('div');
        element.innerHTML = `<div class="tooltip">${title}</div>`
        return element.firstElementChild;
    }

    initEvent() {
        document.addEventListener("pointerover", this.showTooltip);
        document.addEventListener("pointerout", this.hideTooltip);
    }

    showTooltip = (event) => {
        const target = event.target;
        const tooltip = target.dataset.tooltip;

        if(!tooltip) return;

        this.render(tooltip);
        this.moveTooltip(event);

        document.addEventListener('pointermove', this.moveTooltip)
    }

    moveTooltip = (event) => {
        const left = event.clientX + 10 + 'px';
        const top = event.clientY + 10 + 'px';

        this.element.style.left = left;
        this.element.style.top = top;
    }

    hideTooltip = () => {
        this.removeTooltip();
    }

    removeTooltip() {
        if (!this.element) return;

        this.element.remove();
        this.element = null;

        document.removeEventListener('pointermove', this.moveTooltip);
    }

    destroy() {
        document.removeEventListener("pointerover", this.showTooltip);
        document.removeEventListener("pointerout", this.hideTooltip);
        this.removeTooltip();
    }
}

const tooltip = new Tooltip();

export default tooltip;

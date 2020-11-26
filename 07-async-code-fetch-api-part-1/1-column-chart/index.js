import fetchJson from './utils/fetch-json.js';
export default class ColumnChart {
    element;
    subElements = {};
    data = [];
    chartHeight = 50;

    constructor({
        url = 'api/dashboard/orders',
        range = {from: new Date('2020-04-06'), to: new Date('2020-05-06')},
        label = '',
        link = '#',
        value = ''
    } = {}) {
        this.url = url;
        this.range = range;
        this.label = label;
        this.link = link;
        this.value = value;

        this.render();
        this.update(this.range.from, this.range.to);
    }

    getColumnBody(data) {
        const maxValue = Math.max(...data);
        const scale = this.chartHeight / maxValue;

        return data
            .map((item) => {
                const percent = ((item / maxValue) * 100).toFixed(0);

                return `<div style="--value: ${Math.floor(
                    item * scale
                )}" data-tooltip="${percent}%"></div>`;
            })
            .join("");
    }

    getLink() {
        return this.link ?
            `<a class="column-chart__link" href="${this.link}">View all</a>` :
            "";
    }

    get template() {
        return `
            <div class="column-chart column-chart_loading" style="--chart-height: ${this.chartHeight
                }">
            <div class="column-chart__title">
                Total ${this.label}
                ${this.getLink()}
            </div>
            <div class="column-chart__container">
                <div data-element="header" class="column-chart__header">
                ${this.value}
                </div>
                <div data-element="body" class="column-chart__chart">
                ${this.getColumnBody(this.data)}
                </div>
            </div>
            </div>
        `;
    }

    render() {

        const element = document.createElement("div");
        element.innerHTML = this.template;
        this.element = element.firstElementChild;

        this.subElements = this.getSubElements(this.element);
    }

    getSubElements(element) {
        const elements = element.querySelectorAll("[data-element]");

        return [...elements].reduce((accum, subElement) => {
            accum[subElement.dataset.element] = subElement;

            return accum;
        }, {});
    }

    async update(from = new Date(), to = new Date()) {
        if (this.element) this.element.classList.add('column-chart_loading');
        this.clearHeaderBody();

        const url = this.getUrl({from, to});
        const data = await fetchJson(url);

        if (data && Object.values(data).length)
            this.fillBodyData(Object.values(data));
    }

    getUrl(range) {
        const {from, to} = range;

        const url = new URL(`https://course-js.javascript.ru/${this.url}`);
        url.searchParams.set('from', from);
        url.searchParams.set('to', to);

        return url;
    }

    clearHeaderBody() {
        this.subElements.header.textContent = '';
        this.subElements.body.innerHTML = '';
    }

    getValue(data) {
        const value = data.reduce((accum, currentValue) => accum + currentValue);
        return this.label === 'sales' ? '$'+ value : value;
    }

    fillBodyData(data) {
        this.subElements.header.textContent  = this.getValue(data);
        this.subElements.body.innerHTML = this.getColumnBody(data);

        this.element.classList.remove('column-chart_loading');
    }

    remove() {
        if (this.element) this.element.remove();
    }

    destroy() {
        this.remove();
        this.element = null;
        this.subElements = {};
    }
}

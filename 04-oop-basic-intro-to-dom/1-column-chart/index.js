export default class ColumnChart {

    constructor({data = [], label = '', value = '', link = ''} = {}) {
        this.data = data;
        this.label = label;
        this.value = value;
        this.link = link;
        this.chartHeight = 50;

        this.render();
    }

    render() {
        const maxValue = Math.max(...this.data);
        const scale = 50 / maxValue;
        const column_chart = document.createElement('div');

        column_chart.className = 'column-chart';
        column_chart.innerHTML = `
            <div class="column-chart__title" style="--chart-height: ${this.chartHeight}">
                Total ${this.label}
            </div>
            <div class="column-chart__container">
                <div data-element="header" class="column-chart__header">${this.value}</div>
                <div data-element="body" class="column-chart__chart">
                </div>
            </div>
        `;

        this.element = column_chart;

        const column_chart__title = column_chart.querySelector('.column-chart__title');
        const column_chart__chart = column_chart.querySelector('.column-chart__chart');

        if (this.link) {
            column_chart__title.insertAdjacentHTML(
                'beforeend',
                `<a href="${this.link}" class="column-chart__link">View all</a>`)
        }
        if (this.data.length === 0) {
            column_chart.classList.add('column-chart_loading');
        }

        for(const item of this.data) {
            column_chart__chart.insertAdjacentHTML(
                'beforeend',
                `<div style="--value: ${Math.floor(item * scale)}" data-tooltip="${(item / maxValue * 100).toFixed(0) + '%'}"></div>`);
        }
    }

    update() {
        const charts = document.querySelector('.column-chart');
        if (charts) charts.remove();
    }

    remove() {
        this.element.remove();
    }

    destroy() {
        this.remove();
    }
}

export default class SortableTable {
    subElements = {};

    constructor(
        header = [],
        {
            data = [],
            sorted = {
                id: header.find(item => item.sortable).id,
                order: 'asc'
            }
        } = {}) {

        this.header = header;
        this.data = data;
        this.sorted = sorted;

        this.render();
        this.initEvent();
    }

    initEvent() {
        const header = this.subElements.header;
        header.addEventListener("pointerdown", this.clickSort, false);
    }

    clickSort = (e) => {
        const column = e.target.closest('[data-sortable="true"]');

        if (!column) return;

        const {id, order} = column.dataset;
        const orders = {
            asc: "asc",
            desc: "desc",
            getOrder(order) {
                return order === this.desc ? this.asc : this.desc;
            }
        }
        const arrow = column.querySelector('.sortable-table__sort-arrow');

        if (!arrow) {
            column.append(this.subElements.arrow);
        }

        column.dataset.order = orders.getOrder(order);

        const sortedData = this.sortData(id, orders.getOrder(order));
        this.subElements.body.innerHTML = this.getfillBodyTemplate(sortedData);
    }

    get headerTemplate() {
        return `
            <div data-element="header" class="sortable-table__header sortable-table__row" вф>
                ${this.fillHeaderTemplate}
            </div>`;
    }

    get fillHeaderTemplate() {
        return this.header.map((element) => this.getheaderElement(element)).join("");
    }

    getheaderElement(element) {
        return `
            <div class="sortable-table__cell" data-id="${element.id}" data-sortable="${element.sortable}" data-order="">
                <span>${element.title}</span>
                ${this.fillArrows(element.id)}
            </div>
        `;
    }

    fillArrows(id) {
        return this.sorted.id === id ? `
            <span data-element="arrow" class="sortable-table__sort-arrow">
                <span class="sort-arrow"></span>
            </span>` : '';
    }

    get bodyTemplate() {
        return `
            <div data-element="body" class="sortable-table__body">
                ${this.getfillBodyTemplate(this.data)}
            </div>`;
    }

    getfillBodyTemplate(data) {
        return data.map((element) => {
            return `
                <a href="/products/${element.id}" class="sortable-table__row">
                    ${this.fillElementBody(element)}
                </a>`;}).join("");
    }

    fillElementBody(element) {
        const cells = this.header.map(({id, template}) => {
            return {
                id,
                template,
            };
        });

        return cells.map(({id, template}) => {
            return template ?
                template(element[id]) :
                `<div class="sortable-table__cell">${element[id]}</div>`;
            }).join("");
    }

    get template() {
        const element = document.createElement("div");
        element.innerHTML = `
            <div data-element="productsContainer" class="products-list__container">
                <div class="sortable-table">
                    ${this.headerTemplate}
                    ${this.bodyTemplate}
                </div>
            </div>
        `;

        return element.firstElementChild;
    }

    render() {
        this.element = this.template;
        this.subElements = this.getSubElements(this.element);
    }

    sortData(field, order) {
        const arr = [...this.data];
        const column = this.header.find((item) => item.id === field);
        const {
            sortType,
            customSorting
        } = column;

        const direction = {
            asc: 1,
            desc: -1,
        };

        if (!direction[order]) return;

        return arr.sort((a, b) => {
            switch (sortType) {
                case "number":
                    return direction[order] * (a[field] - b[field]);
                case "string":
                    return direction[order] * a[field].localeCompare(b[field], ["ru", "en"], {caseFirst: "upper"});
                case "custom":
                    return direction[order] * customSorting(a, b);
                default:
                    return direction[order] * (a[field] - b[field]);
            }
        });
    }

    getSubElements(element) {
        const elements = element.querySelectorAll("[data-element]");

        return [...elements].reduce((accum, subElement) => {
            accum[subElement.dataset.element] = subElement;

            return accum;
        }, {});
    }

    remove() {
        this.element.remove();
    }

    destroy() {
        this.remove();
    }
}

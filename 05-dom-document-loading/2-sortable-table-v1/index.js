export default class SortableTable {
    subElements = {};

    constructor(header = [], { data = [] } = {} ) {
        this.header = header;
        this.data = data;

        this.render();
    }

    get headerTemplate() {
        return `
            <div data-element="header" class="sortable-table__header sortable-table__row">
                ${this.fillHeaderTemplate}
            </div>`;
    }

    get fillHeaderTemplate() {
        return this.header.map((element) => this.getheaderElement(element)).join("");
    }

    getheaderElement(element) {
        return `
            <div class="sortable-table__cell" data-id="${element.id}" data-sortable="${element.sortable}">
                <span>${element.title}</span>
                ${this.fillArrows()}
            </div>
        `;
    }

    fillArrows() {
        return `
            <span data-element="arrow" class="sortable-table__sort-arrow">
                <span class="sort-arrow"></span>
            </span>`;
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

    sort(field, order) {
        const sortedData = this.sortData(field, order);

        const allColumns = this.element.querySelectorAll(
            ".sortable-table__cell[data-id]"
        );
        const currentColumn = this.element.querySelector(
            `.sortable-table__cell[data-id="${field}"]`
        );

        allColumns.forEach((column) => {
            column.dataset.order = "";
        });

        currentColumn.dataset.order = order;

        this.subElements.body.innerHTML = this.getfillBodyTemplate(sortedData);
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

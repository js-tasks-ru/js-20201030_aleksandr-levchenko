export default class NotificationMessage {

    static notification;

    constructor(message = '' , {duration = 1000, type = 'error'} = {}) {

        if(NotificationMessage.notification) {
            NotificationMessage.notification.remove();
        }

        this.message = message;
        this.duration = duration;
        this.durationSecond = (duration / 1000) + 's';
        this.type = type;

        this.render();
    }

    get template () {
        return `<div class="notification ${this.type}" style="--value:${this.durationSecond}">
                <div class="timer"></div>
                    <div class="inner-wrapper">
                        <div class="notification-header">${this.type}</div>
                        <div class="notification-body">
                            ${this.message}
                        </div>
                </div>
            </div>`;
    }

    render() {
        const element = document.createElement('div');
        element.innerHTML = this.template;
        this.element = element.firstElementChild;

        NotificationMessage.notification = this.element;
    }

    show(parent = document.body) {
        parent.append(this.element);

        setTimeout(() => {
            this.remove();
        }, this.duration);
    }

    remove() {
        this.element.remove();
    }

    destroy() {
        this.remove();
        this.notification = null;
    }
}

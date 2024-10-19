var L;
(function (L) {
    let Control;
    (function (Control) {
        class MessageboxOptions {
            constructor() {
                this.position = 'bottomcenter';
                this.timeout = 5000;
            }
        }
        Control.MessageboxOptions = MessageboxOptions;
        class Messagebox extends L.Control {
            constructor(options) {
                options = options || new MessageboxOptions();
                super(options);
                this.options = options;
            }
            onAdd(map) {
                this._container = L.DomUtil.create('div', 'leaflet-control-messagebox');
                L.DomEvent.disableClickPropagation(this._container);
                this._container.style.display = 'none';
                map.on("gis:notify", this.show, this);
                return this._container;
            }
            show(event) {
                var elem = this._container;
                elem.innerHTML = event.message;
                if (event.clickable)
                    elem.classList.add('gis-clickable');
                const messageClass = event.class;
                if (messageClass)
                    elem.classList.add(messageClass);
                elem.style.display = 'block';
                if (typeof this.timeoutID == 'number') {
                    clearTimeout(this.timeoutID);
                }
                this.timeoutID = setTimeout(function () {
                    elem.style.display = 'none';
                    elem.classList.remove(messageClass);
                    if (event.clickable)
                        elem.classList.remove('gis-clickable');
                }, event.timeout || this.options.timeout);
            }
        }
        Control.Messagebox = Messagebox;
    })(Control = L.Control || (L.Control = {}));
    L.Map.mergeOptions({
        messagebox: false,
        messageboxOptions: new Control.MessageboxOptions()
    });
    L.Map.addInitHook(function () {
        if (this.options.messagebox) {
            this.messagebox = new Control.Messagebox(this.options.messageboxOptions);
            this.addControl(this.messagebox);
        }
    });
    let control;
    (function (control) {
        function messagebox(options) {
            return new Control.Messagebox(options);
        }
        control.messagebox = messagebox;
    })(control = L.control || (L.control = {}));
})(L || (L = {}));
//# sourceMappingURL=leaflet.messagebox.js.map
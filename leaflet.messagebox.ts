namespace L {
    export interface Evented {
        on(type: 'gis:notify', fn: ((event: Control.MessageEvent) => void), context: Control.Messagebox): Evented;
        fire(type: 'gis:notify', data: Control.MessageEvent, propagate?: boolean): Evented;
    }
    namespace Control {    
        export class MessageboxOptions implements ControlOptions {
            position: ControlPosition = 'bottomcenter'
            timeout: number = 5000
        }
        export interface MessageEvent {
            message: string;
            class: string;
            timeout: number;
            clickable: boolean;
        }

        export class Messagebox extends L.Control {
            options: MessageboxOptions;
            timeoutID: number;
            _container: HTMLElement;

            constructor(options?: MessageboxOptions) {
                options = options || new MessageboxOptions();
                super(options);
                this.options = options;
            }
            onAdd(map: Map) {
                this._container = L.DomUtil.create('div', 'leaflet-control-messagebox');
                L.DomEvent.disableClickPropagation(this._container);
                this._container.style.display = 'none';
                map.on("gis:notify", this.show, this);
                return this._container;
            }

            show(event: MessageEvent) {
                var elem = this._container;
                elem.innerHTML = event.message;
                if (event.clickable) elem.classList.add('gis-clickable');
                const messageClass = event.class;
                if (messageClass) elem.classList.add(messageClass)
                elem.style.display = 'block';

                if (typeof this.timeoutID == 'number') {
                    clearTimeout(this.timeoutID);
                }
                this.timeoutID = setTimeout(function () {
                    elem.style.display = 'none';
                    elem.classList.remove(messageClass);
                    if (event.clickable) elem.classList.remove('gis-clickable');
                }, event.timeout || this.options.timeout);
            }
        }
    }

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
    namespace control { 
        export function messagebox (options) {
            return new Control.Messagebox(options);
        }
    }
}
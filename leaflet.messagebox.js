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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGVhZmxldC5tZXNzYWdlYm94LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibGVhZmxldC5tZXNzYWdlYm94LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQVUsQ0FBQyxDQTRFVjtBQTVFRCxXQUFVLENBQUM7SUFVUCxJQUFpQixPQUFPLENBZ0R2QjtJQWhERCxXQUFpQixPQUFPO1FBQ3BCLE1BQWEsaUJBQWlCO1lBQTlCO2dCQUNJLGFBQVEsR0FBb0IsY0FBYyxDQUFBO2dCQUMxQyxZQUFPLEdBQVcsSUFBSSxDQUFBO1lBQzFCLENBQUM7U0FBQTtRQUhZLHlCQUFpQixvQkFHN0IsQ0FBQTtRQVFELE1BQWEsVUFBVyxTQUFRLENBQUMsQ0FBQyxPQUFPO1lBS3JDLFlBQVksT0FBMkI7Z0JBQ25DLE9BQU8sR0FBRyxPQUFPLElBQUksSUFBSSxpQkFBaUIsRUFBRSxDQUFDO2dCQUM3QyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ2YsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7WUFDM0IsQ0FBQztZQUNRLEtBQUssQ0FBQyxHQUFRO2dCQUNuQixJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSw0QkFBNEIsQ0FBQyxDQUFDO2dCQUN4RSxDQUFDLENBQUMsUUFBUSxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDcEQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztnQkFDdkMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDdEMsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO1lBQzNCLENBQUM7WUFFRCxJQUFJLENBQUMsS0FBbUI7Z0JBQ3BCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7Z0JBQzNCLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQztnQkFDL0IsSUFBSSxLQUFLLENBQUMsU0FBUztvQkFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQztnQkFDekQsTUFBTSxZQUFZLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQztnQkFDakMsSUFBSSxZQUFZO29CQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFBO2dCQUNsRCxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7Z0JBRTdCLElBQUksT0FBTyxJQUFJLENBQUMsU0FBUyxJQUFJLFFBQVEsRUFBRTtvQkFDbkMsWUFBWSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztpQkFDaEM7Z0JBQ0QsSUFBSSxDQUFDLFNBQVMsR0FBRyxVQUFVLENBQUM7b0JBQ3hCLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztvQkFDNUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7b0JBQ3BDLElBQUksS0FBSyxDQUFDLFNBQVM7d0JBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUM7Z0JBQ2hFLENBQUMsRUFBRSxLQUFLLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDOUMsQ0FBQztTQUNKO1FBbkNZLGtCQUFVLGFBbUN0QixDQUFBO0lBQ0wsQ0FBQyxFQWhEZ0IsT0FBTyxHQUFQLFNBQU8sS0FBUCxTQUFPLFFBZ0R2QjtJQUVELENBQUMsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDO1FBQ2YsVUFBVSxFQUFFLEtBQUs7UUFDakIsaUJBQWlCLEVBQUUsSUFBSSxPQUFPLENBQUMsaUJBQWlCLEVBQUU7S0FDckQsQ0FBQyxDQUFDO0lBRUgsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUM7UUFDZCxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFO1lBQ3pCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxPQUFPLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQztZQUN6RSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUNwQztJQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0gsSUFBaUIsT0FBTyxDQUl2QjtJQUpELFdBQWlCLE9BQU87UUFDcEIsU0FBZ0IsVUFBVSxDQUFFLE9BQW9DO1lBQzVELE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzNDLENBQUM7UUFGZSxrQkFBVSxhQUV6QixDQUFBO0lBQ0wsQ0FBQyxFQUpnQixPQUFPLEdBQVAsU0FBTyxLQUFQLFNBQU8sUUFJdkI7QUFDTCxDQUFDLEVBNUVTLENBQUMsS0FBRCxDQUFDLFFBNEVWIn0=
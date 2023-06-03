# esp32-web-interface

GpioModel => GpioInterface => WebSocketLayer => device

GpioModel provides getters/setters on GPIO fields
GpioInterface expose CRUD operations on GPIOs
WebSocketLayer talks to device `/gpio` service 
var Events = (function(){
    'use strict';

    //  ## Events
    //
    //      function Car(){
    //          Events.call(this);
    //      }
    //
    //      Car.prototype = Object.create(Events.prototype);
    //      Car.prototype.constructor = Car;
    //
    //      var myCar = new Car();
    //      myCar instanceof Car    //=> true
    //      myCar instanceof Events //=> true
    //      car.constructor == Car  //=> true
    function Events(){
        var self = this;
        if (self._events && Object.keys(self._events).length > 0){
            throw ('Cannot add Events to target, it\'s already extended');
        }

        // add the _events object to the instance
        self._events = {};
    }

    Events.prototype.bind = function bind(eventName, listener){
        var events = this._events,
            results = eventName.split(' ').map(function(name){
                events[name] = events[name] || [];
                return events[name].push(listener);
            });

        return results;
    };

    // alias
    Events.prototype.on = Events.prototype.bind;

    Events.prototype.trigger = function trigger(eventName){
        var self = this,
            args = Array.prototype.slice.call(arguments, 1),
            listeners = self._events[eventName] || [];

        listeners.forEach(function(callback){
            callback.apply(self, args);
        });

        // return the same value as the original implementation
        return listeners.length > 0 ? true : undefined;
    };

    Events.prototype.one = function once(eventName, listener){
        var self = this;
        self.bind(eventName, function singleUseListener(){
            self.unbind(eventName, singleUseListener);
            listener.apply(self, arguments);
        });
    };

    Events.prototype.unbind = function(eventName, listener){
        var self = this,
            index;

        // if there is no eventName argument, then unbind all event listeners from this object
        if (!eventName){
            self._events = {};
            return self;
        }

        // if there is no listener, then unbind all listeners for this event
        if (!listener){
            self._events[eventName] = [];
            return self;
        }

        // remove listener
        index = self._events[eventName].indexOf(listener);

        if ( index !== -1){
            self._events[eventName].splice(index, 1);
        }

        return self;
    };

    return Events;
}());

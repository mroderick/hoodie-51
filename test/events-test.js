(function(){
    'use strict';

    buster.spec.expose();

    var EVENT = 'some-event';

    describe("Events", function(){

        var events;

        beforeEach(function() {
             events = new window.Events();
        });

        describe(".bind(event, listener)", function() {

            it("should bind the listener to the event", function(){
                var listener = sinon.spy();

                events.bind(EVENT, listener);
                events.trigger(EVENT);

                expect(listener.called).toBe(true);
            });

            it("should allow multiple events", function() {
                var listener = sinon.spy();

                events.bind('test1 test2', listener);
                events.trigger('test1');
                events.trigger('test2');

                expect(listener.callCount).toEqual(2);
            });

        });

        describe(".one(event, listener)", function() {

            it("should bind listener to one occurence of event", function() {
                var listener = sinon.spy();

                events.one(EVENT, listener);
                events.trigger(EVENT);
                events.trigger(EVENT);

                expect(listener.callCount).toEqual(1);
            });
        });

        describe(".trigger(event, args...)", function() {

            it("should call subscribed listeners", function() {
                var listener1 = sinon.spy(),
                    listener2 = sinon.spy();

                events.bind(EVENT, listener1);
                events.bind(EVENT, listener2);
                events.trigger(EVENT);

                expect(listener1.called).toBe(true);
                expect(listener2.called).toBe(true);
            });

            it("should pass arguments", function() {
                var listener = sinon.spy();

                events.bind(EVENT, listener);
                events.trigger(EVENT, 'arg1', 'arg2', 'arg3');

                expect(listener.calledWith('arg1', 'arg2', 'arg3')).toBe(true);
            });
        });

        describe(".unbind(event, listener)", function(){

            when("listener passed", function() {
                it("should unsubscribe the listener", function() {
                    var listener = sinon.spy();

                    events.bind(EVENT, listener);
                    events.unbind(EVENT, listener);
                    events.trigger(EVENT);

                    expect(listener.called).toBe(false);
                });
            });

            when("no listeners passed", function() {
                it("should unsubscribe all listeners", function() {
                    var listener1 = sinon.spy(),
                        listener2 = sinon.spy();

                    events.bind(EVENT, listener1);
                    events.bind(EVENT, listener2);
                    events.unbind(EVENT);
                    events.trigger(EVENT);

                    expect(listener1.called).toBe(false);
                    expect(listener2.called).toBe(false);
                });
            });
        });
    });

    describe('Events - Inheritance', function(){
        function Car(){
            Events.call(this);
        }

        Car.prototype = Object.create(Events.prototype);
        Car.prototype.constructor = Car;

        var car;

        beforeEach(function(){
            car = new Car();
        });

        it('must provide \'bind\' method', function(){
            expect(car.bind).toBeFunction();
        });

        it('must provide \'one\' method', function(){
            expect(car.one).toBeFunction();
        });

        it('must provide \'trigger\' method', function(){
            expect(car.trigger).toBeFunction();
        });

        it('must provide \'unbind\' method', function(){
            expect(car.unbind).toBeFunction();
        });

        describe('separation', function(){
            function Plane(){
                Events.call(this);
            }

            Plane.prototype = Object.create(Events.prototype);
            Plane.prototype.constructor = Plane;

            var plane;

            beforeEach(function(){
                plane = new Plane();
            });

            it('must ensure events are not shared', function(){
                var carListener   = sinon.spy(),
                    planeListener = sinon.spy();

                car.bind(EVENT, carListener);
                plane.bind(EVENT , planeListener);

                plane.trigger(EVENT);

                expect(carListener.called).toBe(false);
                expect(planeListener.called).toBe(true);
            });
        });
    });
}());

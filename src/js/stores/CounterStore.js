var alt = require('../alt');
var CounterActions = require('../actions/CounterActions');

class CounterStore {

    constructor() {
        this.counters = [];

        this.bindListeners({
            handleCountersFetched: CounterActions.FETCH_COUNTERS,
            handleCounterCreated: CounterActions.CREATE_COUNTER,
            handleCounterIncremented: CounterActions.INCREMENT_COUNTER,
            handleCounterDecremented: CounterActions.DECREMENT_COUNTER,
            handleCounterDeleted: CounterActions.DELETE_COUNTER
        });
    }

    handleCountersFetched(counters) {
        this.counters = counters;
    }

    handleCounterCreated(counters) {
        this.counters = counters;
    }

    handleCounterIncremented(counters) {
        this.counters = counters;
    }

    handleCounterDecremented(counters) {
        this.counters = counters;
    }

    handleCounterDeleted(counters) {
        this.counters = counters;
    }
}

module.exports = alt.createStore(CounterStore, 'CounterStore');
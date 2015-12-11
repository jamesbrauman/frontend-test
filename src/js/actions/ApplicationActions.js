var alt = require('../alt');
var CounterActions = require('./CounterActions');

class ApplicationActions {

    initializeApplication() {
        CounterActions.fetchCounters();
    }

}

alt.createActions(ApplicationActions, exports);
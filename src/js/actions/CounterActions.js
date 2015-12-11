var alt = require('../alt');
var superagent = require('superagent');

class CounterActions {

    fetchCounters() {
        superagent
            .get('/api/v1/counters')
            .end((err, res) => {
                if (res.ok) {
                    this.dispatch(res.body);
                }
            });
    }

    createCounter(title) {
        superagent
            .post('/api/v1/counter')
            .send({title: title})
            .end((err, res) => {
                if (res.ok) {
                    this.dispatch(res.body);
                }
            });
    }

    incrementCounter(id) {
        superagent
            .post('/api/v1/counter/inc')
            .send({id: id})
            .end((err, res) => {
                if (res.ok) {
                    this.dispatch(res.body);
                }
            });
    }

    decrementCounter(id) {
        superagent
            .post('/api/v1/counter/dec')
            .send({id: id})
            .end((err, res) => {
                if (res.ok) {
                    this.dispatch(res.body);
                }
            });
    }

    deleteCounter(id) {
        superagent
            .del('/api/v1/counter')
            .send({id: id})
            .end((err, res) => {
                if (res.ok) {
                    this.dispatch(res.body);
                }
            });
    }
}

alt.createActions(CounterActions, exports);
var React = require('react');
var NewCounterInput = require('./NewCounterInput');
var CounterList = require('./CounterList');
var CounterSum = require('./CounterSum');
var ApplicationActions = require('../actions/ApplicationActions');
var CounterStore = require('../stores/CounterStore');

class Application extends React.Component {

    synchronizeState() {
        this.setState(CounterStore.getState());
    }

    componentWillMount() {
        this.synchronizeState();
    }

    componentDidMount() {
        CounterStore.listen(this.synchronizeState.bind(this));
        ApplicationActions.initializeApplication();
    }

    componentWillUnmount() {
        CounterStore.unlisten(this.synchronizeState.bind(this));
    }

    render() {
        return (
            <div className="application">
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12">
                            <h1 className="text-xs-center">Flippa Counter App</h1>
                            <NewCounterInput />
                            { this.state.counters.length > 0 ? <CounterList counters={this.state.counters} /> : null }
                            <CounterSum counters={this.state.counters} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

module.exports = Application;
var React = require('react');

class CounterSum extends React.Component {

    calculateTotal() {
        if (this.props.counters.length == 0) {
            return 0;
        } else {
            return this.props.counters.reduce((prev, currentCounter) => {
                return prev + currentCounter.count;
            }, 0);
        }
    }

    render() {
        return (
            <div className="counter-sum">
                <h3><span className="label label-pill label-info">The total of all counters equals <span className="counter-total">{this.calculateTotal()}</span></span></h3>
            </div>
        );
    }

}

module.exports = CounterSum;
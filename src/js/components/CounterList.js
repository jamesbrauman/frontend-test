var React = require('react');
var CounterListItem = require('./CounterListItem');

class CounterList extends React.Component {

    render() {
        return (
            <div className="card">
                <ul className="counter-list list-group list-group-flush">
                    {
                        this.props.counters.map((counter) => {
                            return <CounterListItem key={counter.id} id={counter.id} title={counter.title} count={counter.count} />
                        })
                    }
                </ul>
            </div>
        );
    }

}

module.exports = CounterList;
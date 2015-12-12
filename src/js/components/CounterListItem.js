var React = require('react');
var CounterActions = require('../actions/CounterActions');

class CounterListItem extends React.Component {

    constructor(props) {
        super(props);

        this.handleIncrement = this.handleIncrement.bind(this);
        this.handleDecrement = this.handleDecrement.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleIncrement() {
        CounterActions.incrementCounter(this.props.id);
    }

    handleDecrement() {
        CounterActions.decrementCounter(this.props.id);
    }

    handleDelete() {
        CounterActions.deleteCounter(this.props.id);
    }

    render() {
        return (
            <li className="list-group-item">
                <h4>{this.props.title}</h4>
                <div className="btn-group btn-group-sm">
                    <button type="button" className="increment-button btn btn-primary" onClick={this.handleIncrement}><i className="fa fa-plus-circle"></i></button>
                    <span className="counter-count textual info">{this.props.count}</span>
                    <button type="button" className="decrement-button btn btn-primary" onClick={this.handleDecrement} disabled={this.props.count <=  0}><i className="fa fa-minus-circle"></i></button>
                    <button type="button" className="delete-button btn btn-danger" onClick={this.handleDelete}><i className="fa fa-trash"></i></button>
                </div>
            </li>
        );
    }

}

module.exports = CounterListItem;
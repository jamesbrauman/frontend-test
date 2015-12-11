var React = require('react');
var CounterActions = require('../actions/CounterActions');

class NewCounterInput extends React.Component {

    constructor(props) {
        super(props);

        this.onTitleChange = this.onTitleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {title: ''};
    }

    onTitleChange(e) {
        this.setState({title: e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();

        CounterActions.createCounter(this.state.title);

        this.setState({title: ''});
    }

    render() {
        return (
            <div className="card card-block new-counter-input">
                <form onSubmit={this.handleSubmit}>
                    <label className="sr-only" htmlFor="counter-title">Email address</label>
                    <div className="input-group">
                        <input type="text" required className="form-control" id="counter-title" placeholder="Enter counter title..." value={this.title} onChange={this.onTitleChange}/>
                            <span className="input-group-btn">
                                <button className="btn btn-success" type="submit">Add Counter</button>
                            </span>
                    </div>
                </form>
            </div>
        );
    }

}

module.exports = NewCounterInput;
var Card = React.createClass({
  handleClick() {
    if(this.state.hidden) return;
    if(!this.props.game.state.turnStarted) {
      alert("You must roll before you can select cards.");
      return;
    }
    if(this.state.selected) {
      this.setState({
        selected: false
      });
    } else {
      this.setState({
        selected: true
      });
    }
  },
  hide() {
    this.setState({
      selected: false,
      hidden: true
    });
  },
  getInitialState() {
    return {
      selected: false,
      hidden: false
    }
  },
  render() {
    var className = "card";
    if(this.state.hidden) {
      className += " hidden";
    } else if(this.state.selected) {
      className += " selected";
    }
    return (
      <div className={className} onClick={this.handleClick}>{this.props.number}</div>
    );
  }
});

var CardList = React.createClass({
  endTurn() {
    var cardTotal = 0;
    for(var i=1; i<10; i++) {
      if(this.refs["card-"+i].state.selected) {
        cardTotal += i;
      }
    }
    this.setState({
      cardTotal: cardTotal
    }, this.props.game.endTurn);
  },
  removeSelected() {
    var onlyOne = this.refs["card-1"].state.selected;
    for(var i=1; i<10; i++) {
      if(this.refs["card-"+i].state.selected) {
        this.refs["card-"+i].hide();
        if(i!=1) onlyOne = false;
      }
    }
    if(onlyOne) this.props.game.handleOnlyOne();
  },
  incrementTurnNumber() {
    this.setState({
      turnNumber: this.state.turnNumber + 1
    });
  },
  endGame() {
    var gameScore = 0;
    for(var i=1; i<10; i++) {
      if(!this.refs["card-"+i].state.hidden) {
        gameScore += i;
      }
    }
    alert("You scored "+gameScore);
  },
  getInitialState() {
    return {
      cardTotal: 0,
      turnNumber: 0
    };
  },
  render() {
    var cards = [];
    var turnNumber;
    for(var i=1; i<10; i++) {
      cards.push(<li key={i}><Card ref={"card-"+i} key={i} number={i} game={this.props.game} /></li>);
    }
    if(this.state.turnNumber) {
      turnNumber = " "+this.state.turnNumber;
    }
    return (
      <div>
        <ul className="card-list">
          {cards}
        </ul>
        <button onClick={this.endTurn}>
          End turn{turnNumber}
        </button>
      </div>
    );
  }
});

var Die = React.createClass({
  roll () {
    var number = Math.floor(Math.random()*6+1);
    this.setState({
      number: number
    });
    return number;
  },
  getInitialState() {
    return {
      number: 1
    };
  },
  render() {
    return (
      <div className="die">{this.state.number}</div>
    );
  }
});

var Dice = React.createClass({
  roll() {
    if(this.props.game.state.turnStarted) {
      alert("You can't roll again until you finish your turn.");
    } else {
      var diceTotal = 0;
      for(var i=0; i<2; i++) {
        diceTotal += this.refs["die-"+i].roll();
      }
      this.setState({
        diceTotal: diceTotal
      });
      this.props.game.startTurn();
    }
  },
  endGame() {
    this.props.game.endGame();
  },
  handleOnlyOne() {
    this.setState({
      numberOfDice: 1
    });
  },
  getInitialState() {
    return {
      diceTotal: 0,
      numberOfDice: 2
    }
  },
  render() {
    var dice = [];
    for(var i=0; i<this.state.numberOfDice; i++) {
      dice.push(<li key={i}><Die ref={"die-"+i} key={i} /></li>);
    }
    return (
      <div>
        <ul className="dice">
          {dice}
        </ul>
        <button onClick={this.roll} className="roll-button">
          Roll
        </button>
        <button onClick={this.endGame}>
          End Game
        </button>
      </div>
    );
  }
});

var Game = React.createClass({
  startTurn() {
    this.setState({
      turnStarted: true
    });
    this.refs.cardList.incrementTurnNumber();
  },
  endTurn() {
    if(this.refs.cardList.state.cardTotal === this.refs.dice.state.diceTotal) {
      this.handleEqual();
    } else {
      alert("the sum of your cards doesn't add up to the sum of your dice");
    }
  },
  handleEqual() {
    this.refs.cardList.removeSelected();
    this.setState({
      turnStarted: false
    });
  },
  handleOnlyOne() {
    this.refs.dice.handleOnlyOne();
  },
  endGame() {
    this.refs.cardList.endGame();
  },
  getInitialState: function() {
    return {
      turnStarted: false
    };
  },
  render: function() {
    return (
      <div className="game">
        <h1>Shut The Box</h1>
        <CardList ref="cardList" game={this} />
        <Dice ref="dice" game={this} />
      </div>
    );
  }
});

ReactDOM.render(
  <Game />,
  document.getElementById('content')
);
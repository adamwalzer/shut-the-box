jest.dontMock('../js/app');

var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');

setTimeout(function() {
  require('../js/app');

  describe('app', () => {

    it('the card should have a 1 on it', () => {

      // Render a game
      var game = TestUtils.renderIntoDocument(
        <Game />
      );
      // Render a card
      var card = TestUtils.renderIntoDocument(
        <Card number={1} game={game} />
      );

      var cardNode = ReactDOM.findDOMNode(card);

      // Simulate a click and verify that it did not work since the turn is not started
      TestUtils.Simulate.click(
        TestUtils.findRenderedDOMComponentWithTag(card, 'div')
      );
      expect(cardNode.className).toEqual('card');
    });

  });

},1);
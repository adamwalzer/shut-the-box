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

      // Simulate a roll and then a click of a card to show that card now gets selected
      TestUtils.Simulate.click(
        TestUtils.findRenderedDOMComponentWithClass(game, 'roll-button')
      );
      TestUtils.Simulate.click(
        TestUtils.findRenderedDOMComponentWithTag(card, 'div')
      );
      expect(cardNode.className).toEqual('card selected');
    });

  });

},1);
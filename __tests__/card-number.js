jest.dontMock('../js/app');

var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');

setTimeout(function() {
  require('../js/app');

  describe('app', () => {

    it('the card should have a 1 on it', () => {

      // Render a card
      var card = TestUtils.renderIntoDocument(
        <Card number={1} game={game} />
      );

      var cardNode = ReactDOM.findDOMNode(card);

      expect(cardNode.textContent).toEqual('1');
    });

  });

},1);
(function () {

  var botName = 'yaw-bot'

  var BotClass = function () {
    // <<Initialize bot state here>>

    return {
      name: botName,
      play: function (drawnCard, remainingDeckSize, moveType) {
        //
        // moveType will be either 'normal', 'war', 'normal-gamble', or 'war-gamble'
        //
        // Return 'accept' to play the drawn card, or 'gamble' to draw a different card.
        //
        // console.log(drawnCard);
        // console.log(remainingDeckSize);
        // console.log(moveType);
        // more conservative gamble > 8
        if (drawnCard.value < 7 && moveType != "normal-gamble" && moveType != "war-gamble") {
          return "gamble";
        }
        else if (drawnCard.value > 7 && moveType === "war") {
          return "accept";
        }
        else {
          return "accept";
        }
      },
      handleRoundResult: function (didIWin, loot) {
        // TODO: Whatever you want. You can do aanything
      }
    }
  }

  BotClass.botName = botName

  var isNodeJs = typeof module != "undefined" && module !== null && module.exports
  if (isNodeJs) {
    module.exports = BotClass
  }
  else {
    BotRegistry.register(botName, BotClass)
  }
})()

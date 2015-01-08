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
        console.log(didIWin);
        console.log(loot[1])
        console.log(loot[0]["value"]);
        var oppPlus = 0;
        var oppMinus = 0;
        var oppNeutral = 0;
        var mePlus = 0;
        var meMinus = 0;
        var meNeutral = 0;

        // yaw's values
        switch (loot[1].isMine) {
          case loot[1].value < 5:
            meMinus += 1;
            break;
          case loot[1].value >= 5 && loot[1].value < 10:
            meNeutral += 1;
            break;
          case loot[1].value > 9:
            mePlus += 1;
            break;
        }

        // oppponent's values
        switch (loot[0].isMine === "undefined"){
            case loot[0].value < 5:
            oppMinus += 1;
            break;
          case loot[0].value >= 5 && loot[0].value < 10:
            oppNeutral += 1;
            break;
          case loot[0].value > 9:
            oppPlus += 1;
            break;
        }
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

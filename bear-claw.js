(function () {

  var botName = 'BearClaw'

  var BotClass = function () {
    // <<Initialize bot state here>>
    var myHand = []
    var myTotal = 0
    var highCard = []
    var theirHand = []
    var theirTotal = 0
    var theirHighCard = []
    return {
      name: botName,
      play: function (drawnCard, remainingDeckSize, moveType) {
        //
        // moveType will be either 'normal', 'war', 'normal-gamble', or 'war-gamble'
        //
        // Return 'accept' to play the drawn card, or 'gamble' to draw a different card.
        //
        if (moveType == 'normal' || moveType == 'war'){
          if (theirTotal >= 0 && myTotal >= 0){ 
            if (drawnCard.value <= 5 && (theirTotal/myTotal < 0.4)){
              return 'gamble'
            } else if (drawnCard.value <= 6 && (theirTotal/myTotal > 0.76)){
              return 'gamble'
            } else {
              return 'accept'
            }
          } else {
            return 'accept'
          }
        } else {
          return 'accept'
        }
      },
      handleRoundResult: function (didIWin, loot) {
        // TODO: Whatever you want. You can do aanything
        // console.log("Loot: ", loot);
        if (didIWin == true){
          myHand.push(loot);
          // console.log("my hand: ", myHand);
          for(var i in loot){ 
            if (loot[i].name != undefined){
              highCard.push(loot[i].name);
            }
            myTotal += loot[i].value;
            if (!loot[i].isMine){
              theirTotal -= loot[i].value;
            }
            // console.log("my high cards: ", highCard); 
          }
          // console.log("My win: ", myTotal, "their total: ", theirTotal);
        } else {
          theirHand.push(loot);
          // console.log("their hand: ", theirHand);
          for(var i in loot){ 
            if (loot[i].name != undefined){
              theirHighCard.push(loot[i].name);
            }
            theirTotal += loot[i].value; 
            if (loot[i].isMine){
              myTotal -= loot[i].value;
            }
            // console.log("their high cards: ", theirHighCard)
          }
          // console.log("Their win: ", theirTotal, "my total: ", myTotal);
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

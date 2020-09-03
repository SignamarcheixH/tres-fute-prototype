<!DOCTYPE html>

<html>
    <head>
        <meta charset="utf-8">
        <title>tres-fute</title>
        <link rel="stylesheet" href="dist/main.min.css">
        <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
        <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    </head>
    <body>
        <div id="vue-game-master">
            <game-board 
              :key="boardGameKey"
              :chosen-dices="chosenDices"
              :current-dices="livingDices"
              :dead-dices="deadDices"
              :player-data="playerData"
              @clicked="openActionMenu"
              :action="doAction"
              :class="{ 'pointer-events-none' : turn.mode != 'select' }"></game-board>
            <div id="canvas">
              <h3>Dés vivants</h3>
              <div class="roll-dices">
                <div class="dice"
                     :class="color"
                     v-for="(value, color) in livingDices">{{ value }}</div>
              </div>
              <button @click="rollDices" :disabled="turn.mode != 'roll'">Roll Dices</button>
              <h3>Dés écartés</h3>
              <div class="dead-dices">
                <div class="dice" :class="color" v-for="(value, color) in deadDices">{{ value }}</div>
              </div>
            </div>
            <action-menu 
              :actions="actions"
              :position="actionMenuPosition"
              :is-open="actionMenuOpen"
              @close="closeActionMenu"
              @action="doAction">
            </action-menu>
        </div>
      <script src="dist/main-vue.min.js"></script>
      <script src="dist/main.min.js"></script>
      <script type="text/javascript" defer="defer">
        dice_initialize(document.body);
      </script>
    </body>
</html>

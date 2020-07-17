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
            <game-board :current-dices="livingDices" :player-data="playerData" @clicked="openActionMenu"></game-board>
            <div id="canvas">
              <div class="roll-dices">
                <div class="dice" :class="color" v-for="(value, color) in livingDices">{{ value }}</div>
              </div>
              <button @click="rollDices">Roll Dices</button>
            </div>
            <action-menu 
              :actions="actions"
              :class="{ active: actionMenuOpen }"
              :position="actionMenuPosition">
            </action-menu>
        </div>
      <script src="dist/main-vue.min.js"></script>
      <script src="dist/main.min.js"></script>
      <script type="text/javascript" defer="defer">
        dice_initialize(document.body);
      </script>
    </body>
</html>

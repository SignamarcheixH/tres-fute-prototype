"use strict";Vue.component("action-menu",{props:{actions:{type:Array,default:[]},position:{type:Object,default:{}}},data:function(){return{}},methods:{clicked:function(){this.$emit("click",this)}},mounted:function(){},watch:{},template:"<div class=\"action-menu\" :style=\"{ left: position.x + 'px', top: position.y + 'px' }\"></div>"});
"use strict";Vue.component("game-board",{props:{playerData:{},currentDices:{}},data:function(){return{zonesActions:{cases:["pickWithColoredDice","pickWithWhiteDice","tick"]},fields:{turnIcons:["reroll","additional","reroll","both","three-players","one-two-players"],yellowGrid:{values:[[3,6,5,0],[2,1,0,5],[1,0,2,4],[0,3,4,6]],rewards:{rows:["blue","orange 4","green","fox"],columns:[10,14,16,20],diagonal:"additional"}},blueGrid:{values:[[0,2,3,4],[5,6,7,8],[9,10,11,12]],rewards:{rows:["orange 5","yellow","fox"],columns:["reroll","green","purple 6","additional"]},points:[1,2,4,7,11,16,22,29,37,46,56]},greenGrid:{values:[{value:1,points:1},{value:2,points:3},{value:3,points:6},{value:4,reward:"additional",points:10},{value:5,points:15},{value:1,reward:"blue",points:21},{value:2,reward:"fox",points:28},{value:3,points:36},{value:4,reward:"purple 6",points:45},{value:5,reward:"reroll",points:55},{value:6,points:66}]},orangeGrid:{values:[{},{},{reward:"reroll"},{multiplier:2},{reward:"yellow"},{reward:"additional"},{multiplier:2},{reward:"fox"},{multiplier:2},{reward:"purple 6"},{multiplier:3}]},purpleGrid:{values:[{},{},{reward:"reroll"},{reward:"blue"},{reward:"additional"},{reward:"yellow"},{reward:"fox"},{reward:"reroll"},{reward:"green"},{reward:"orange 6"},{reward:"additional"}]}}}},methods:{clicked:function(t){this.$emit("clicked",t)},isDisabled:function(t,i,e,n){var d=2<arguments.length&&void 0!==e?e:null,l=3<arguments.length&&void 0!==n?n:null;switch(t){case"green":return this.playerData.green.length!=d||!(this.currentDices.green>=i.value||this.currentDices.white>=i.value);case"blue":var s=this.currentDices.blue+this.currentDices.white;return this.playerData.blue[l][d]||s!=i;case"yellow":return this.playerData.yellow[l][d]||this.currentDices.yellow!=i&&this.currentDices.white!=i;case"orange":return!(this.playerData.orange.length==d);case"purple":return this.playerData.purple.length!=d||!(this.currentDices.purple>=this.playerData.purple[this.playerData.purple.length-1]||this.currentDices.white>=this.playerData.purple[this.playerData.purple.length-1])}}},mounted:function(){},template:'<div class="board-game">\n\t<div class="gaming-data">\n\t\t<div class="dices">\n\t\t\t<div class="dice-square">\n\t\t\t\t<div class="inner"></div>\n\t\t\t</div>\n\t\t\t<div class="dice-square">\n\t\t\t\t<div class="inner"></div>\n\t\t\t</div>\n\t\t\t<div class="dice-square">\n\t\t\t\t<div class="inner"></div>\n\t\t\t</div>\n\t\t</div>\n\t\t<div class="rows">\n\t\t\t<ul class="turns">\n\t\t\t\t<li v-for="(turnIcon, index) in fields.turnIcons" class="turn-item">\n\t\t\t\t\t<div class="index">{{ (index + 1) }}</div>\n\t\t\t\t\t<div class="icon">\n\t\t\t\t\t\t<div :class="turnIcon" class="inner"></div>\n\t\t\t\t\t</div>\n\t\t\t\t</li>\n\t\t\t</ul>\n\t\t\t<div class="reroll-power">\n\t\t\t\t<div class="icon">\n\t\t\t\t\t<div class="inner reroll"></div>\n\t\t\t\t</div>\t\n\t\t\t\t<ul>\n\t\t\t\t\t<li v-for="index in 7" class="power-circle"></li>\n\t\t\t\t</ul>\n\t\t\t</div>\n\t\t\t<div class="additional-dice-power">\n\t\t\t\t<div class="icon">\n\t\t\t\t\t<div class="inner additional"></div>\n\t\t\t\t</div>\t\n\t\t\t\t<ul>\n\t\t\t\t\t<li v-for="index in 7" class="power-circle"></li>\n\t\t\t\t</ul>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\t<div class="yellow-blue-grids">\n\t\t<div class="yellow-grid">\n\t\t\t<ul v-for="(row, indexRow) in fields.yellowGrid.values" :data-index="indexRow" class="value-row">\n\t\t\t\t<zone \n\t\t\t\t   \tv-for="(item, indexCol) in row"\n\t\t\t\t   \t:data-row="indexRow"\n\t\t\t\t   \t:data-col="indexCol"\n\t\t\t\t   \t:data-value="item"\n\t\t\t\t   \t@click="clicked"\n\t\t\t\t   \t:actions="zonesActions.cases"\n\t\t\t\t   \t:disabled="isDisabled(\'yellow\', item, indexCol, indexRow)">\n\t\t\t\t\t<div v-if="item">{{ item }}</div>\n\t\t\t\t\t<div v-else>X</div>\n\t\t\t\t</zone>\n\t\t\t\t<div class="reward" :class="fields.yellowGrid.rewards.rows[indexRow]">\n\t\t\t\t\t<div class="inner" :class="fields.yellowGrid.rewards.rows[indexRow]"></div>\n\t\t\t\t</div>\n\t\t\t</ul>\n\t\t\t<div class="column-reward">\n\t\t\t\t<div v-for="item in fields.yellowGrid.rewards.columns" class="reward">\n\t\t\t\t\t<div class="inner">\n\t\t\t\t\t\t<div>{{ item }}</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class="diagonal-reward additional"></div>\n\t\t\t</div>\n\t\t</div>\n\t\t<div class="blue-grid">\n\t\t\t<ul class="points">\n\t\t\t\t<li v-for="(item, index) in fields.blueGrid.points"> \n\t\t\t\t\t<div class="reward">\n\t\t\t\t\t\t<div class="inner">\n\t\t\t\t\t\t\t<div>{{ item }}</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="index">{{ index }}</div>\n\t\t\t\t</li>\n\t\t\t</ul>\n\t\t\t<div class="rows">\n\t\t\t\t<ul v-for="(row, indexRow) in fields.blueGrid.values" :data-index="indexRow" class="value-row">\n\t\t\t\t\t<zone \n\t\t\t\t\t \tv-for="(item, indexCol) in row" \n\t\t\t\t\t \t:data-row="indexRow" \n\t\t\t\t\t \t:data-col="indexCol"\n\t\t\t\t\t \t:data-value="item"\n\t\t\t\t\t \t@click="clicked"\n\t\t\t\t\t \t:actions="zonesActions.cases"\n\t\t\t\t\t \t:disabled="isDisabled(\'blue\', item, indexCol, indexRow)">\n\t\t\t\t\t\t<div v-if="item">{{ item }}</div>\n\t\t\t\t\t\t<div v-else class="dices"></div>\n\t\t\t\t\t</zone>\n\t\t\t\t\t<div class="reward" :class="fields.blueGrid.rewards.rows[indexRow]">\n\t\t\t\t\t\t<div class="inner" :class="fields.blueGrid.rewards.rows[indexRow]"></div>\n\t\t\t\t\t</div>\n\t\t\t\t</ul>\n\t\t\t\t<div class="column-reward">\n\t\t\t\t\t<div v-for="item in fields.blueGrid.rewards.columns">\n\t\t\t\t\t\t<div class="reward" :class="item">\n\t\t\t\t\t\t\t<div class="inner" :class="item"></div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\t<div class="green-grid">\n\t\t<div class="icon">\n\t\t\t<div class="inner"></div>\n\t\t</div>\n\t\t<ul>\n\t\t\t<zone \n\t\t\t\tv-for="(item, index) in fields.greenGrid.values" \n\t\t\t\t:data-value="item.value" \n\t\t\t\t:data-index="index"\n\t\t\t\t@click="clicked"\n\t\t\t\t:actions="zonesActions.cases"\n\t\t\t\t:disabled="isDisabled(\'green\', item, index)">\n\t\t\t\t<div class="points">\n\t\t\t\t\t<div class="inner">\n\t\t\t\t\t\t<div>{{ item.points }}</div>\n\t\t\t\t\t</div>\t\n\t\t\t\t</div>\n\t\t\t\t<div class="value">\n\t\t\t\t\t<div class="inner">≥{{ item.value }}</div>\n\t\t\t\t</div>\n\t\t\t\t<div v-if="item.reward" class="reward" :class="item.reward">\n\t\t\t\t\t<div class="inner" :class="item.reward"></div>\n\t\t\t\t</div>\n\t\t\t</zone>\n\t\t</ul>\n\t</div>\n\t<div class="orange-grid">\n\t\t<div class="icon">\n\t\t\t<div class="inner"></div>\n\t\t</div>\n\t\t<ul>\n\t\t\t<zone \n\t\t\t\tv-for="(item, index) in fields.orangeGrid.values"\n\t\t\t\t@click="clicked"\n\t\t\t\t:actions="zonesActions.cases"\n\t\t\t\t:disabled="isDisabled(\'orange\', item, index)">\n\t\t\t\t<div v-if="item.multiplier" class="multiplier">x{{ item.multiplier }}</div>\n\t\t\t\t<div v-if="item.reward" class="reward" :class="item.reward">\n\t\t\t\t\t<div class="inner" :class="item.reward"></div>\n\t\t\t\t</div>\n\t\t\t</zone>\n\t\t</ul>\n\t</div>\n\t<div class="purple-grid">\n\t\t<div class="icon">\n\t\t\t<div class="inner"></div>\n\t\t</div>\n\t\t<ul>\n\t\t\t<zone \n\t\t\t\tv-for="(item, index) in fields.purpleGrid.values"\n\t\t\t\t@click="clicked"\n\t\t\t\t:actions="zonesActions.cases"\n\t\t\t\t:disabled="isDisabled(\'purple\', item, index)">\n\t\t\t\t<div v-if="item.reward" class="reward" :class="item.reward">\n\t\t\t\t\t<div class="inner" :class="item.reward"></div>\n\t\t\t\t</div>\n\t\t\t\t<div class="arrow"></div>\n\t\t\t</zone>\n\t\t</ul>\n\t</div>\n</div>'});
"use strict";Vue.component("zone",{props:{actions:{type:Array,default:[]},disabled:!1},data:function(){return{}},methods:{clicked:function(){this.$emit("click",this)}},mounted:function(){},watch:{},template:'<li class="zone" @click="clicked" :class="{ done: disabled }">\n\t<slot></slot>\n</li>'});
"use strict";function _slicedToArray(e,t){return _arrayWithHoles(e)||_iterableToArrayLimit(e,t)||_unsupportedIterableToArray(e,t)||_nonIterableRest()}function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _unsupportedIterableToArray(e,t){if(e){if("string"==typeof e)return _arrayLikeToArray(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?_arrayLikeToArray(e,t):void 0}}function _arrayLikeToArray(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function _iterableToArrayLimit(e,t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e)){var r=[],n=!0,o=!1,i=void 0;try{for(var a,l=e[Symbol.iterator]();!(n=(a=l.next()).done)&&(r.push(a.value),!t||r.length!==t);n=!0);}catch(e){o=!0,i=e}finally{try{n||null==l.return||l.return()}finally{if(o)throw i}}return r}}function _arrayWithHoles(e){if(Array.isArray(e))return e}document.getElementById("vue-game-master")&&new Vue({el:"#vue-game-master",data:{livingDices:{yellow:"",blue:"",green:"",orange:"",purple:"",white:""},deadDices:{},playerData:{powers:{},yellow:[[0,1,0,0],[1,0,0,0],[0,0,0,0],[0,0,0,0]],blue:[[666,0,0,0],[0,0,1,1],[0,0,0,0]],green:[3,4],orange:[2,6,5,12],purple:[2,2,4]},actions:[],actionMenuOpen:!1,actionMenuPosition:{x:0,y:0}},mounted:function(){},methods:{getRandomInt:function(e){return Math.floor(Math.random()*Math.floor(e))},rollDices:function(){for(var e=0,t=Object.entries(this.livingDices);e<t.length;e++){var r=_slicedToArray(t[e],2),n=r[0];r[1];this.livingDices[n]=this.getRandomInt(6)+1}},openActionMenu:function(e){this.actionMenuOpen=!0,this.actionMenuPosition.x=e.$el.getBoundingClientRect().left+window.scrollX+e.$el.getBoundingClientRect().width/2,this.actionMenuPosition.y=e.$el.getBoundingClientRect().top+window.scrollY+e.$el.getBoundingClientRect().height/2,console.log(e.$props)}}});
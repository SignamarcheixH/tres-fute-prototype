"use strict";Vue.component("action-menu",{props:{isOpen:{type:Boolean,default:!1},actions:{type:Array,default:function(){return[]}},position:{type:Object,default:{}}},data:function(){return{}},methods:{actionChosen:function(e){this.$emit("action",e)},clicked:function(){this.$emit("click",this)},close:function(){this.$emit("close",this)},getIconUrl:function(e){switch(e){case"yellow":return"/ressources/yellow-dice-icon.png";case"blue":return"/ressources/blue-dice-icon.png";case"green":return"/ressources/green-dice-icon.png";case"orange":return"/ressources/orange-dice-icon.png";case"purple":return"/ressources/purple-dice-icon.png";case"white":return"/ressources/white-dice-icon.png";case"tick":return"/ressources/tick-icon.png"}}},watch:{actions:function(){}},template:'<div class="action-menu-wrapper" @click.self="close" :class="{ active: isOpen }">\n  <div class="action-menu" :style="{ left: position.x + \'px\', top: position.y + \'px\' }">\n    <div class="action" v-for="(value, index) in actions" @click="actionChosen(value)">\n    \t<div :style="{ \'background-image\': \'url(\'+ getIconUrl(value)+\')\'}" class="icon"/>\n    </div>\n  </div>\n</div>'});
"use strict";Vue.component("game-board",{props:{playerData:{},currentDices:{},chosenDices:{},deadDices:{}},data:function(){return{zonesActions:{powers:["tick"],yellowCases:["yellow","white","tick"],blueCases:["blue","white","tick"],greenCases:["green","white","tick"],orangeCases:["orange","white","tick"],purpleCases:["purple","white","tick"]},fields:{turnIcons:["reroll","additional","reroll","both","three-players","one-two-players"],yellowGrid:{values:[[3,6,5,0],[2,1,0,5],[1,0,2,4],[0,3,4,6]],rewards:{rows:["blue","orange 4","green","fox"],columns:[10,14,16,20],diagonal:"additional"}},blueGrid:{values:[[0,2,3,4],[5,6,7,8],[9,10,11,12]],rewards:{rows:["orange 5","yellow","fox"],columns:["reroll","green","purple 6","additional"]},points:[1,2,4,7,11,16,22,29,37,46,56]},greenGrid:{values:[{value:1,points:1},{value:2,points:3},{value:3,points:6},{value:4,reward:"additional",points:10},{value:5,points:15},{value:1,reward:"blue",points:21},{value:2,reward:"fox",points:28},{value:3,points:36},{value:4,reward:"purple 6",points:45},{value:5,reward:"reroll",points:55},{value:6,points:66}]},orangeGrid:{values:[{},{},{reward:"reroll"},{multiplier:2},{reward:"yellow"},{reward:"additional"},{multiplier:2},{reward:"fox"},{multiplier:2},{reward:"purple 6"},{multiplier:3}]},purpleGrid:{values:[{},{},{reward:"reroll"},{reward:"blue"},{reward:"additional"},{reward:"yellow"},{reward:"fox"},{reward:"reroll"},{reward:"green"},{reward:"orange 6"},{reward:"additional"}]}}}},methods:{clicked:function(t){t.disabled||this.$emit("clicked",t)},findDice:function(t){if(this.currentDices[t])return this.currentDices[t];if(this.deadDices[t])return this.deadDices[t];for(var e in this.chosenDices)if(this.chosenDices[e].color==t)return this.chosenDices[e].value},isDisabled:function(t,e,i,n){var s=2<arguments.length&&void 0!==i?i:null,l=3<arguments.length&&void 0!==n?n:null;switch(t){case"green":return this.playerData.green.length!=s||!(this.currentDices.green>=e.value||this.currentDices.white>=e.value);case"blue":var d=this.findDice("blue")+this.findDice("white");return this.playerData.blue[l][s]||d!=e;case"yellow":return this.playerData.yellow[l][s]||this.currentDices.yellow!=e&&this.currentDices.white!=e;case"orange":return this.currentDices.hasOwnProperty("orange")||this.currentDices.hasOwnProperty("white")?!(this.playerData.orange.length==s):!0;case"purple":return this.playerData.purple.length!=s||!(this.currentDices.purple>=this.playerData.purple[this.playerData.purple.length-1]||this.currentDices.white>=this.playerData.purple[this.playerData.purple.length-1])}}},mounted:function(){},template:'<div class="board-game">\n\t<div class="gaming-data">\n\t\t<div class="dices">\n\t\t\t<div class="dice-square">\n\t\t\t\t<div class="inner" :class="chosenDices.first.color"><span>{{ chosenDices.first.value }}</span></div>\n\t\t\t</div>\n\t\t\t<div class="dice-square">\n\t\t\t\t<div class="inner" :class="chosenDices.second.color"><span>{{ chosenDices.second.value }}</span></div>\n\t\t\t</div>\n\t\t\t<div class="dice-square">\n\t\t\t\t<div class="inner" :class="chosenDices.third.color"><span>{{ chosenDices.third.value }}</span></div>\n\t\t\t</div>\n\t\t</div>\n\t\t<div class="rows">\n\t\t\t<ul class="turns">\n\t\t\t\t<li v-for="(turnIcon, index) in fields.turnIcons" class="turn-item">\n\t\t\t\t\t<div class="index">{{ (index + 1) }}</div>\n\t\t\t\t\t<div class="icon">\n\t\t\t\t\t\t<div :class="turnIcon" class="inner"></div>\n\t\t\t\t\t</div>\n\t\t\t\t</li>\n\t\t\t</ul>\n\t\t\t<div class="reroll-power">\n\t\t\t\t<div class="icon">\n\t\t\t\t\t<div class="inner reroll"></div>\n\t\t\t\t</div>\t\n\t\t\t\t<ul>\n\t\t\t\t\t<zone \n\t\t\t\t\t\tv-for="index in 7" \n\t\t\t\t\t\tclass="power-circle tralala"\n\t\t\t\t\t\t:class="playerData.powers.reroll[index]"\n\t\t\t\t\t\t:actions="zonesActions.powers"\n\t\t\t\t\t\t@click="clicked"\n\t\t\t\t\t>\n\t\t\t\t\t</zone>\n\x3c!-- \t\t\t\t\t<li v-for="index in 7" class="power-circle" :class="playerData.powers.reroll[index]"></li>\n --\x3e\t\t\t</ul>\n\t\t\t</div>\n\t\t\t<div class="additional-dice-power">\n\t\t\t\t<div class="icon">\n\t\t\t\t\t<div class="inner additional"></div>\n\t\t\t\t</div>\t\n\t\t\t\t<ul>\n\t\t\t\t\t<li v-for="index in 7" class="power-circle" :class="playerData.powers.additional[index]"></li>\n\t\t\t\t</ul>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\t<div class="yellow-blue-grids">\n\t\t<div class="yellow-grid">\n\t\t\t<ul v-for="(row, indexRow) in fields.yellowGrid.values" :data-index="indexRow" class="value-row">\n\t\t\t\t<zone \n\t\t\t\t   \tv-for="(item, indexCol) in row"\n\t\t\t\t   \t:data-row="indexRow"\n\t\t\t\t   \t:data-col="indexCol"\n\t\t\t\t   \t:data-value="item"\n\t\t\t\t   \tdata-color="yellow"\n\t\t\t\t   \t@click="clicked"\n\t\t\t\t   \t:actions="zonesActions.yellowCases"\n\t\t\t\t   \t:disabled="isDisabled(\'yellow\', item, indexCol, indexRow)"\n\t\t\t\t>\n\t\t\t\t\t<div v-if="playerData.yellow[indexRow][indexCol]">X</div>\n\t\t\t\t\t<div v-else-if="item">{{ item }}</div>\n\t\t\t\t\t<div v-else>X</div>\n\t\t\t\t</zone>\n\t\t\t\t<div class="reward" :class="fields.yellowGrid.rewards.rows[indexRow]">\n\t\t\t\t\t<div class="inner" :class="fields.yellowGrid.rewards.rows[indexRow]"></div>\n\t\t\t\t</div>\n\t\t\t</ul>\n\t\t\t<div class="column-reward">\n\t\t\t\t<div v-for="item in fields.yellowGrid.rewards.columns" class="reward">\n\t\t\t\t\t<div class="inner">\n\t\t\t\t\t\t<div>{{ item }}</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class="diagonal-reward additional"></div>\n\t\t\t</div>\n\t\t</div>\n\t\t<div class="blue-grid">\n\t\t\t<ul class="points">\n\t\t\t\t<li v-for="(item, index) in fields.blueGrid.points"> \n\t\t\t\t\t<div class="reward">\n\t\t\t\t\t\t<div class="inner">\n\t\t\t\t\t\t\t<div>{{ item }}</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="index">{{ index }}</div>\n\t\t\t\t</li>\n\t\t\t</ul>\n\t\t\t<div class="rows">\n\t\t\t\t<ul v-for="(row, indexRow) in fields.blueGrid.values" :data-index="indexRow" class="value-row">\n\t\t\t\t\t<zone \n\t\t\t\t\t \tv-for="(item, indexCol) in row" \n\t\t\t\t\t \t:data-row="indexRow" \n\t\t\t\t\t \t:data-col="indexCol"\n\t\t\t\t\t \t:data-value="item"\n\t\t\t\t\t \tdata-color="blue"\n\t\t\t\t\t \t@click="clicked"\n\t\t\t\t\t \t:actions="zonesActions.blueCases"\n\t\t\t\t\t \t:disabled="isDisabled(\'blue\', item, indexCol, indexRow)">\n\t\t\t\t\t\t<div v-if="playerData.blue[indexRow][indexCol]">X</div>\n\t\t\t\t\t\t<div v-else-if="item">{{ item }}</div>\n\t\t\t\t\t\t<div v-else class="dices"></div>\n\t\t\t\t\t</zone>\n\t\t\t\t\t<div class="reward" :class="fields.blueGrid.rewards.rows[indexRow]">\n\t\t\t\t\t\t<div class="inner" :class="fields.blueGrid.rewards.rows[indexRow]"></div>\n\t\t\t\t\t</div>\n\t\t\t\t</ul>\n\t\t\t\t<div class="column-reward">\n\t\t\t\t\t<div v-for="item in fields.blueGrid.rewards.columns">\n\t\t\t\t\t\t<div class="reward" :class="item">\n\t\t\t\t\t\t\t<div class="inner" :class="item"></div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\t<div class="green-grid">\n\t\t<div class="icon">\n\t\t\t<div class="inner"></div>\n\t\t</div>\n\t\t<ul>\n\t\t\t<zone \n\t\t\t\tv-for="(item, index) in fields.greenGrid.values" \n\t\t\t\t:data-value="item.value" \n\t\t\t\t:data-index="index"\n\t\t\t\tdata-color="green"\n\t\t\t\t@click="clicked"\n\t\t\t\t:actions="zonesActions.greenCases"\n\t\t\t\t:disabled="isDisabled(\'green\', item, index)">\n\t\t\t\t<div class="points">\n\t\t\t\t\t<div class="inner">\n\t\t\t\t\t\t<div>{{ item.points }}</div>\n\t\t\t\t\t</div>\t\n\t\t\t\t</div>\n\t\t\t\t<div class="value">\n\t\t\t\t\t<div class="inner" v-if="index < playerData.green.length">X</div>\n\t\t\t\t\t<div class="inner" v-else>≥{{ item.value }}</div>\n\t\t\t\t</div>\n\t\t\t\t<div v-if="item.reward" class="reward" :class="item.reward">\n\t\t\t\t\t<div class="inner" :class="item.reward"></div>\n\t\t\t\t</div>\n\t\t\t</zone>\n\t\t</ul>\n\t</div>\n\t<div class="orange-grid">\n\t\t<div class="icon">\n\t\t\t<div class="inner"></div>\n\t\t</div>\n\t\t<ul>\n\t\t\t<zone \n\t\t\t\tv-for="(item, index) in fields.orangeGrid.values"\n\t\t\t\t@click="clicked"\n\t\t\t\tdata-color="orange"\n\t\t\t\t:data-index="index"\n\t\t\t\t:actions="zonesActions.orangeCases"\n\t\t\t\t:disabled="isDisabled(\'orange\', item, index)">\n\t\t\t\t<div v-if="index < playerData.orange.length" class="multiplier">{{ playerData.orange[index] }}</div>\n\t\t\t\t<div v-else-if="item.multiplier" class="multiplier">x{{ item.multiplier }}</div>\n\t\t\t\t<div v-else class="multiplier"></div>\n\t\t\t\t<div v-if="item.reward" class="reward" :class="item.reward">\n\t\t\t\t\t<div class="inner" :class="item.reward"></div>\n\t\t\t\t</div>\n\t\t\t</zone>\n\t\t</ul>\n\t</div>\n\t<div class="purple-grid">\n\t\t<div class="icon">\n\t\t\t<div class="inner"></div>\n\t\t</div>\n\t\t<ul>\n\t\t\t<zone \n\t\t\t\tv-for="(item, index) in fields.purpleGrid.values"\n\t\t\t\t@click="clicked"\n\t\t\t\t:data-index="index"\n\t\t\t\tdata-color="purple"\n\t\t\t\t:actions="zonesActions.purpleCases"\n\t\t\t\t:disabled="isDisabled(\'purple\', item, index)">\n\t\t\t\t<div v-if="index < playerData.purple.length">{{ playerData.purple[index] }}</div>\n\t\t\t\t<div v-if="item.reward" class="reward" :class="item.reward">\n\t\t\t\t\t<div class="inner" :class="item.reward"></div>\n\t\t\t\t</div>\n\t\t\t\t<div class="arrow"></div>\n\t\t\t</zone>\n\t\t</ul>\n\t</div>\n</div>'});
"use strict";Vue.component("zone",{props:{actions:{type:Array,default:[]},disabled:!1},data:function(){return{}},methods:{clicked:function(){this.$emit("click",this)}},mounted:function(){},watch:{},template:'<li class="zone" @click="clicked" :class="{ done: disabled }">\n\t<slot></slot>\n</li>'});
"use strict";function _slicedToArray(e,t){return _arrayWithHoles(e)||_iterableToArrayLimit(e,t)||_unsupportedIterableToArray(e,t)||_nonIterableRest()}function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _unsupportedIterableToArray(e,t){if(e){if("string"==typeof e)return _arrayLikeToArray(e,t);var i=Object.prototype.toString.call(e).slice(8,-1);return"Object"===i&&e.constructor&&(i=e.constructor.name),"Map"===i||"Set"===i?Array.from(e):"Arguments"===i||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)?_arrayLikeToArray(e,t):void 0}}function _arrayLikeToArray(e,t){(null==t||t>e.length)&&(t=e.length);for(var i=0,s=new Array(t);i<t;i++)s[i]=e[i];return s}function _iterableToArrayLimit(e,t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e)){var i=[],s=!0,r=!1,n=void 0;try{for(var o,a=e[Symbol.iterator]();!(s=(o=a.next()).done)&&(i.push(o.value),!t||i.length!==t);s=!0);}catch(e){r=!0,n=e}finally{try{s||null==a.return||a.return()}finally{if(r)throw n}}return i}}function _arrayWithHoles(e){if(Array.isArray(e))return e}document.getElementById("vue-game-master")&&new Vue({el:"#vue-game-master",data:{turn:{mode:"roll"},boardGameKey:0,livingDices:{yellow:-1,blue:-1,green:-1,orange:-1,purple:-1,white:-1},deadDices:{},chosenDices:{first:{color:"",value:""},second:{color:"",value:""},third:{color:"",value:""}},playerData:{powers:{reroll:["unused","unused","used"],additional:["used","used","unused"]},yellow:[[0,1,0,0],[1,0,0,0],[0,0,0,0],[0,0,0,0]],blue:[[-1,0,0,0],[0,0,1,1],[0,0,0,0]],green:[3,4],orange:[2,6,5,12],purple:[2,2,4]},activeZone:null,actions:[],actionMenuOpen:!1,actionMenuPosition:{x:0,y:0}},mounted:function(){},methods:{setModeTo:function(e){this.turn.mode=e},setDicesAside:function(e){for(var t in this.livingDices)this.livingDices[t]<e&&(this.deadDices[t]=this.livingDices[t],delete this.livingDices[t])},rerender:function(){this.boardGameKey+=1},getDiceValue:function(e){return this.livingDices[e]},selectDices:function(e){this.chosenDices.first.value?this.chosenDices.second.value?(this.chosenDices.third.value=this.getDiceValue(e),this.chosenDices.third.color=e):(this.chosenDices.second.value=this.getDiceValue(e),this.chosenDices.second.color=e):(this.chosenDices.first.value=this.getDiceValue(e),this.chosenDices.first.color=e),delete this.livingDices[e],this.setModeTo("roll")},doAction:function(e){var t=this.activeZone.$attrs["data-row"],i=this.activeZone.$attrs["data-col"];switch(e){case"yellow":this.playerData.yellow[t][i]=1,this.setDicesAside(this.getDiceValue("yellow")),this.selectDices("yellow");break;case"blue":this.playerData.blue[t][i]=1,this.setDicesAside(this.getDiceValue("blue")),this.selectDices("blue");break;case"green":this.playerData.green.push(this.livingDices.green),this.setDicesAside(this.getDiceValue("green")),this.selectDices("green");break;case"orange":this.playerData.orange.push(this.livingDices.orange),this.setDicesAside(this.getDiceValue("orange")),this.selectDices("orange");break;case"purple":this.playerData.purple.push(this.livingDices.purple),this.setDicesAside(this.getDiceValue("purple")),this.selectDices("purple");break;case"white":switch(this.activeZone.$attrs["data-color"]){case"yellow":this.playerData.yellow[t][i]=1;break;case"blue":this.playerData.blue[t][i]=1;break;case"green":this.playerData.green.push(this.livingDices.white);break;case"orange":this.playerData.orange.push(this.livingDices.white);break;case"purple":this.playerData.purple.push(this.livingDices.white)}this.setDicesAside(this.getDiceValue("white")),this.selectDices("white")}this.setDicesAside(),this.rerender(),this.closeActionMenu()},getRandomInt:function(e){return Math.floor(Math.random()*Math.floor(e))},rollDices:function(){for(var e=0,t=Object.entries(this.livingDices);e<t.length;e++){var i=_slicedToArray(t[e],2),s=i[0];i[1];this.livingDices[s]=this.getRandomInt(6)+1}this.setModeTo("select")},openActionMenu:function(e){var t=this;this.activeZone=e,this.actionMenuOpen=!0,this.actionMenuPosition.x=e.$el.getBoundingClientRect().left+window.scrollX+e.$el.getBoundingClientRect().width/2,this.actionMenuPosition.y=e.$el.getBoundingClientRect().top+window.scrollY+e.$el.getBoundingClientRect().height/2,console.log(e.$props),this.actions=e.$props.actions.filter(function(e){return t.livingDices.hasOwnProperty(e)||"tick"===e})},closeActionMenu:function(){this.actionMenuOpen=!1}},watch:{"chosenDices.third.value":function(){console.log("FIN DU TOUR")}}});
if (document.getElementById("vue-game-master")) {
  new Vue({
    el: '#vue-game-master',
    data: {
      turn: {
        mode: 'roll'
      },
      boardGameKey: 0,
      livingDices: {
        yellow: -1,
        blue: -1,
        green: -1,
        orange: -1,
        purple: -1,
        white: -1
      },
      deadDices: {},
      chosenDices: {
        first: {
          color: '',
          value: ''
        },
        second: {
          color: '',
          value: ''
        },
        third: {
          color: '',
          value: ''
        }
      },
      playerData: {
        powers: {
          reroll: ['unused', 'unused', 'used'],
          additional: ['used', 'used', 'unused']
        },
        yellow: [
          [0, 1, 0, 0],
          [1, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0]
        ],
        blue: [
          [-1, 0, 0, 0],
          [0, 0, 1, 1],
          [0, 0, 0, 0],
        ],
        green: [3, 4],
        orange: [2, 6, 5, 12],
        purple: [2, 2, 4]
      },
      activeZone: null,
      actions: [],
      actionMenuOpen: false,
      actionMenuPosition: {
        x: 0,
        y: 0
      }
    },
    mounted() {},
    methods: {
      setModeTo(mode) {
        this.turn.mode = mode
      },
      setDicesAside(threshold) {
        for(let color in this.livingDices) {
          if(this.livingDices[color] < threshold) {
            this.deadDices[color] = this.livingDices[color]
            delete this.livingDices[color]
          }
        }
      },
      rerender() {
        this.boardGameKey += 1
      },
      getDiceValue(color) {
        return this.livingDices[color]
      },
      selectDices(color) {
        if(!this.chosenDices.first.value) {
          this.chosenDices.first.value = this.getDiceValue(color)
          this.chosenDices.first.color = color
        } else if(!this.chosenDices.second.value) {
          this.chosenDices.second.value = this.getDiceValue(color)
          this.chosenDices.second.color = color
        } else {
          this.chosenDices.third.value = this.getDiceValue(color)
          this.chosenDices.third.color = color
        }
        delete this.livingDices[color]
        this.setModeTo('roll')
      },
      doAction(value) {
        const indexRow = this.activeZone.$attrs['data-row']
        const indexCol = this.activeZone.$attrs['data-col']
        switch(value) {
          case 'yellow':
            this.playerData.yellow[indexRow][indexCol] = 1
            this.setDicesAside(this.getDiceValue('yellow'))
            this.selectDices('yellow')
            break;
          case 'blue':
            this.playerData.blue[indexRow][indexCol] = 1
            this.setDicesAside(this.getDiceValue('blue'))
            this.selectDices('blue')
            break;
          case 'green':
            this.playerData.green.push(this.livingDices.green)
            this.setDicesAside(this.getDiceValue('green'))
            this.selectDices('green')
            break;
          case 'orange':
            this.playerData.orange.push(this.livingDices.orange)
            this.setDicesAside(this.getDiceValue('orange'))
            this.selectDices('orange')
            break;
          case 'purple':
            this.playerData.purple.push(this.livingDices.purple)
            this.setDicesAside(this.getDiceValue('purple'))
            this.selectDices('purple')
            break;
          case 'white':
            switch(this.activeZone.$attrs['data-color']) {
              case 'yellow':
                this.playerData.yellow[indexRow][indexCol] = 1
                break;
              case 'blue':
                this.playerData.blue[indexRow][indexCol] = 1
                break;
              case 'green':
                this.playerData.green.push(this.livingDices.white)
                break;
              case 'orange':
                this.playerData.orange.push(this.livingDices.white)
                break;
              case 'purple':
                this.playerData.purple.push(this.livingDices.white)
                break;
            }
            this.setDicesAside(this.getDiceValue('white'))
            this.selectDices('white')
            break;
          case 'tick':
            break;
        }
        this.setDicesAside()
        this.rerender()
        this.closeActionMenu()
      },
      getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
      },
      rollDices() {
        for(const [key, value] of Object.entries(this.livingDices)) {
          this.livingDices[key] = this.getRandomInt(6) + 1
        }
        this.setModeTo('select')
      },
      openActionMenu(zone) {
        this.activeZone = zone
        this.actionMenuOpen = true
        this.actionMenuPosition.x = (zone.$el.getBoundingClientRect().left + window.scrollX) + (zone.$el.getBoundingClientRect().width/2)
        this.actionMenuPosition.y = (zone.$el.getBoundingClientRect().top + window.scrollY) + (zone.$el.getBoundingClientRect().height/2)
        console.log(zone.$props)
        this.actions = zone.$props.actions.filter((el) => (this.livingDices.hasOwnProperty(el) || el === ('tick')))
      },
      closeActionMenu() {
        this.actionMenuOpen = false
      }
    },
    watch: {
      'chosenDices.third.value': (oldVal, newVal) => {
        console.log("FIN DU TOUR")
      }
    }
  })
} 
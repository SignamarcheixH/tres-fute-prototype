Vue.component('game-board', {
    // delimiters: ['[[', ']]'],
    // mixins: [eventHubMixin, languageMixin],
    props: {
      playerData: {},
      currentDices: {}
    },
    data: () => {
      return {
        zonesActions: {
          cases: [
            'pickWithColoredDice',
            'pickWithWhiteDice',
            'tick'
          ]
        },
        fields: {
          turnIcons: ['reroll', 'additional', 'reroll', 'both', 'three-players', 'one-two-players'],
          yellowGrid: {
            values: [
              [3, 6, 5, 0],
              [2, 1, 0, 5],
              [1, 0, 2, 4],
              [0, 3, 4, 6]
            ],
            rewards: {
              rows: ['blue', 'orange 4', 'green', 'fox'],
              columns: [10, 14, 16, 20],
              diagonal: 'additional'
            }
          },
          blueGrid: {
            values: [
              [0, 2, 3, 4],
              [5, 6, 7, 8],
              [9, 10, 11, 12]
            ],
            rewards: {
              rows: ['orange 5', 'yellow', 'fox'],
              columns: ['reroll', 'green', 'purple 6', 'additional']
            },
            points: [1, 2, 4, 7, 11, 16, 22, 29, 37, 46, 56]
          },
          greenGrid: {
            values: [
              {
                value: 1,
                points: 1
              },
              {
                value: 2,
                points: 3
              },
              {
                value: 3,
                points: 6
              },
              {
                value: 4,
                reward: 'additional',
                points: 10
              },
              {
                value: 5,
                points: 15
              },
              {
                value: 1,
                reward: 'blue',
                points: 21
              },
              {
                value: 2,
                reward: 'fox',
                points: 28
              },
              {
                value: 3,
                points: 36
              },
              {
                value: 4,
                reward: 'purple 6',
                points: 45
              },
              {
                value: 5,
                reward: 'reroll',
                points: 55
              },
              {
                value: 6,
                points: 66
              }
            ]
          },
          orangeGrid: {
            values: [
              {},
              {},
              {
                reward: 'reroll'
              },
              {
                multiplier: 2
              },
              {
                reward: 'yellow'
              },
              {
                reward: 'additional'
              },
              {
                multiplier: 2
              },
              {
                reward: 'fox'
              },
              {
                multiplier: 2
              },
              {
                reward: 'purple 6'
              },
              {
                multiplier: 3
              }
            ]
          },
          purpleGrid: {
            values: [
              {},
              {},
              {
                reward: 'reroll'
              },
              {
                reward: 'blue'
              },
              {
                reward: 'additional'
              },
              {
                reward: 'yellow'
              },
              {
                reward: 'fox'
              },
              {
                reward: 'reroll'
              },
              {
                reward: 'green'
              },
              {
                reward: 'orange 6'
              },
              {
                reward: 'additional'
              }
            ]
          }
        }
      } 
    },
    methods: {
      clicked(val) {
        this.$emit('clicked', val)
      },
      isDisabled(color, item, indexCol=null, indexRow=null) {
        switch(color) {
          case 'green':
            return (this.playerData.green.length == indexCol) ? !((this.currentDices.green >= item.value) || (this.currentDices.white >= item.value)) : true
            break
          case 'blue':
            let total = this.currentDices.blue + this.currentDices.white
            return (this.playerData.blue[indexRow][indexCol] || (total != item))      
            break
          case 'yellow':
            return (this.playerData.yellow[indexRow][indexCol]) || ((this.currentDices.yellow != item) && (this.currentDices.white != item))
            break
          case 'orange':
            return !(this.playerData.orange.length == indexCol)
            break
          case 'purple':
            return (this.playerData.purple.length == indexCol) ? !((this.currentDices.purple >= this.playerData.purple[this.playerData.purple.length - 1]) || (this.currentDices.white >= this.playerData.purple[this.playerData.purple.length - 1])) : true
            break
        }
      }
    },
    mounted() {},
    template: 'game-board.component.html' 
  })  
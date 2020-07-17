if (document.getElementById("vue-game-master")) {
  new Vue({
    // mixins: [baseMixin, eventHubMixin, headerMixin, languageMixin],
    el: '#vue-game-master',
    data: {
      livingDices: {
        yellow: '',
        blue: '',
        green: '',
        orange: '',
        purple: '',
        white: ''
      },
      deadDices: {},
      playerData: {
        powers: {},
        yellow: [
          [0, 1, 0, 0],
          [1, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0]
        ],
        blue: [
          [666, 0, 0, 0],
          [0, 0, 1, 1],
          [0, 0, 0, 0],
        ],
        green: [3, 4],
        orange: [2, 6, 5, 12],
        purple: [2, 2, 4]
      },
      actions: [],
      actionMenuOpen: false,
      actionMenuPosition: {
        x: 0,
        y: 0
      }
    },
    mounted() {},
    methods: {
      getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
      },
      rollDices() {
        for(const [key, value] of Object.entries(this.livingDices)) {
          this.livingDices[key] = this.getRandomInt(6) + 1
        }
      },
      openActionMenu(zone) {
        this.actionMenuOpen = true
        this.actionMenuPosition.x = (zone.$el.getBoundingClientRect().left + window.scrollX) + (zone.$el.getBoundingClientRect().width/2)
        this.actionMenuPosition.y = (zone.$el.getBoundingClientRect().top + window.scrollY) + (zone.$el.getBoundingClientRect().height/2)
        console.log(zone.$props)
      }
    }
  })
} 
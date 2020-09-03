Vue.component('action-menu', {
    props: {
        isOpen: {
            type: Boolean,
            default: false
        },
        actions: {
            type: Array,
            default: () => []
        },
        position: {
            type: Object,
            default: {}
        }
    },
    data: () => {
      return {
      } 
    },
    methods: {
        actionChosen(action) {
            this.$emit('action', action)
        },
        clicked() {
            this.$emit('click', this)
        },
        close() {
            this.$emit('close', this)
        },
        getIconUrl(action) {
            switch(action) {
                case 'yellow':
                    return '/ressources/yellow-dice-icon.png'
                    break;
                case 'blue':
                    return '/ressources/blue-dice-icon.png'
                    break
                case 'green':
                    return '/ressources/green-dice-icon.png'
                    break
                case 'orange':
                    return '/ressources/orange-dice-icon.png'
                    break
                case 'purple':
                    return '/ressources/purple-dice-icon.png'
                    break
                case 'white':
                    return '/ressources/white-dice-icon.png'
                    break
                case 'tick':
                    return '/ressources/tick-icon.png'
                    break
            }
        }
    },
    watch: {
        actions: function (val) {
            
        },
    },
    template: 'action-menu.component.html' 
})  
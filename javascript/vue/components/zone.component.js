Vue.component('zone', {
    // delimiters: ['[[', ']]'],
    // mixins: [eventHubMixin, languageMixin],
    props: {
        actions: {
          type: Array,
          default: []
        },
        disabled: false
    },
    data: () => {
      return {} 
    },
    methods: {
        clicked() {
            this.$emit('click', this)
        }
    },
    mounted() {},
    watch: {},
    template: 'zone.component.html' 
})  
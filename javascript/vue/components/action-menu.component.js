Vue.component('action-menu', {
    // delimiters: ['[[', ']]'],
    // mixins: [eventHubMixin, languageMixin],
    props: {
        actions: {
            type: Array,
            default: []
        },
        position: {
            type: Object,
            default: {}
        }
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
    template: 'action-menu.component.html' 
})  
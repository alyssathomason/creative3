let app = new Vue({
    el: '#app',
    data: {
        max: '',
        current: '',
        loading: true,
        countryName: '',
        capital: '',
        location: '',
        income: ''
    },
    computed: {},
    created() {
        jQuery(document).ready(function() {
            jQuery('#vmap').vectorMap({
                map: 'world_en',
                backgroundColor: '#a5bfdd',
                borderColor: '#818181',
                borderOpacity: 0.25,
                borderWidth: 1,
                color: '#f4f3f0',
                enableZoom: true,
                hoverColor: '#c9dfaf',
                hoverOpacity: null,
                normalizeFunction: 'linear',
                scaleColors: ['#b6d6ff', '#005ace'],
                selectedColor: '#c9dfaf',
                selectedRegions: null,
                showTooltip: true,
                onRegionClick: function(element, code, region) {
                    app.country(code);
                }
            });
        });
    },

    methods: {
        async country(code) {
            try {
                this.loading = true;
                const response = await axios.get('http://api.worldbank.org/v2/country/' + code + '?format=json');
                this.current = response.data[1][0];
                console.log("response returned");
                this.loading = false;
            } catch (error) {
                console.log(error);
            }
        }
    }
});
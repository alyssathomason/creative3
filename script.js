Vue.component('star-rating', VueStarRating.default);


let app = new Vue({
    el: '#app',
    data: {
        max: '',
        number: '',
        current: {
            title: '',
            img: '',
            alt: ''
        },
        loading: true,
        addedName: '',
        addedComment: '',
        currTime: '',
        comments: {},
        ratings: {
            // sum: '',
            // total: ''
        },
        rSum: '',
        rTotal: '',
        averageRating: ''
    },
    computed: {
        month() {
            var month = new Array;
            if (this.current.month === undefined)
                return '';
            month[0] = "January";
            month[1] = "February";
            month[2] = "March";
            month[3] = "April";
            month[4] = "May";
            month[5] = "June";
            month[6] = "July";
            month[7] = "August";
            month[8] = "September";
            month[9] = "October";
            month[10] = "November";
            month[11] = "December";
            return month[this.current.month - 1];
        }
    },
    created() {
        this.xkcd();
    },
    watch: {
        number(value, oldvalue) {
            if (oldvalue === '') {
                this.max = value;
            } else {
                this.xkcd();
            }
        }
    },
    methods: {
        async xkcd() {
            try {
                this.loading = true;
                const response = await axios.get('https://xkcdapi.now.sh/' + this.number);
                this.current = response.data;
                this.loading = false;
                this.number = response.data.num;
            } catch (error) {
                console.log(error);
            }
        },
        firstComic() {
            this.number = 1;
        },
        previousComic() {
            this.number = this.current.num - 1;
            if (this.number < 1)
                this.number = 1;
        },
        nextComic() {
            this.number = this.current.num + 1;
            if (this.number > this.max)
                this.number = this.max
        },
        lastComic() {
            this.number = this.max;
        },
        getRandom(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum and minimum are inclusive
        },
        randomComic() {
            this.number = this.getRandom(1, this.max);
        },
        addComment() {
            if (!(this.number in this.comments))
                Vue.set(app.comments, this.number, new Array);
            this.currTime = moment().format('MMMM Do YYYY, h:mm:ss a');
            this.comments[this.number].push({
                author: this.addedName,
                text: this.addedComment,
                time: this.currTime
            });
            this.addedName = '';
            this.addedComment = '';
            this.currTime = '';
        },
        // setRating(rating) {
        //     if (!(this.number in this.ratings)) {
        //         Vue.set(app.ratings, this.number, new Array);
        //         rSum = '';
        //         rTotal = '';
        //     }

        //     this.ratings[this.number].push({
        //         sum: this.rSum,
        //         total: this.rTotal
        //             // avgRating: this.averageRating
        //     });
        //     this.rSum += this.rating;
        //     this.rTotal += 1;
        //     this.averageRating = (this.rSum / this.rTotal);
        // }
        setRating(rating) {
            if (!(this.number in this.ratings))
                Vue.set(this.ratings, this.number, {
                    sum: 0,
                    total: 0,
                    averageRating: this.averageRating,
                });
            this.ratings[this.number].sum += rating;
            rSum = this.ratings[this.number].sum;
            this.ratings[this.number].total += 1;
            rTotal = this.ratings[this.number].total;
            this.averageRating = rSum / rTotal;
        }
    }
});
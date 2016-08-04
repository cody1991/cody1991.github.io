var app = new Vue({
    el: '#app',
    methods: {
        greet: function() {
            alert(this.message);
        },
        say: function(msg) {
            alert(msg);
        },
        createPerson: function() {
            this.people.push(this.newPerson);
            this.newPerson = {
                name: 'default',
                age: 0,
                sex: 'Male',
                grade: {
                    num: 0
                }
            }
        },
        deletePerson: function(index) {
            this.people.splice(index, 1);
        }
    },
    data: {
        newPerson: {
            name: 'default',
            age: 0,
            sex: 'Male',
            grade: {
                num: 0
            }
        },
        message: 'Hello world',
        age: 28,
        yes: true,
        no: false,
        pageCount: 10,
        activeNumber: 2,
        people: [{
            name: 'Jack',
            age: 30,
            sex: 'Male',
            grade: {
                num: 4
            }
        }, {
            name: 'Bill',
            age: 26,
            sex: 'Male',
            grade: {
                num: 1
            }
        }, {
            name: 'Tracy',
            age: 22,
            sex: 'Female',
            grade: {
                num: 3
            }
        }, {
            name: 'Chris',
            age: 36,
            sex: 'Male',
            grade: {
                num: 2
            }
        }]
    }
});

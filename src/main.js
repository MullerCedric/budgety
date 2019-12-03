import Vue from 'vue'

new Vue({
    el: '#app',
    data: {
        budget: {
            income: [],
            expenses: [],
        },
        currentEntry: {
            type: 'inc',
            desc: '',
            val: '',
        },
    },
    computed: {
        budgetValue() {
            return this.formatValue(this.totalBudget);
        },
        incomeValue() {
            return this.formatValue(this.totalIncome);
        },
        expensesValue() {
            return this.formatValue(this.totalExpenses);
        },
        totalBudget() {
            return this.total('income') + this.total('expenses');
        },
        totalIncome() {
            return this.total('income');
        },
        totalExpenses() {
            return this.total('expenses');
        },
        currentDate() {
            const options = {
                year: "numeric",
                month: "long",
            };
            return new Intl.DateTimeFormat('fr-BE', options).format(new Date());
        }
    },
    methods: {
        formatNumber(x) {
            return x.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});
        },
        formatValue(val) {
            return val > 0 ? '+' + this.formatNumber(val) : this.formatNumber(val);
        },
        total(key) {
            return this.budget[key].reduce(function (a, b) {
                return a + b.value;
            }, 0);
        },
        percent(val) {
            if (this.totalIncome == 0) return '0%';
            return Math.floor((Math.abs(val) / this.totalIncome) * 100) + '%';
        },
        resetData() {
            this.currentEntry.type = 'inc';
            this.currentEntry.desc = '';
            this.currentEntry.val = '';
        },
        handleForm() {
            if (!this.currentEntry.val) return;
            let key = this.currentEntry.type === 'inc' ? 'income' : 'expenses';
            this.budget[key].push({
                desc: this.currentEntry.desc,
                value: this.currentEntry.type === 'inc' ?
                    Math.abs(parseInt(this.currentEntry.val)) :
                    -Math.abs(parseInt(this.currentEntry.val)),
            });
            this.resetData();
        },
        deleteEntry(label, index) {
            this.budget[label].splice(index, 1);
        }
    }
});

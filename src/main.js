import Vue from 'vue'

new Vue({
    el: '#app',
    data: {
        budget: {
            income: [],
            expenses: [],
        },
        currentType: 'inc',
        currentDesc: '',
        currentVal: '',
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
                return +a + +b.value;
            }, 0);
        },
        percent(val) {
            if (this.totalBudget == 0) return '0%';
            return Math.floor((val / this.totalBudget) * 100) + '%';
        },
        resetData() {
            this.currentType = 'inc';
            this.currentDesc = '';
            this.currentVal = '';
        },
        handleForm() {
            if (!this.currentVal) return;
            let key = this.currentType === 'inc' ? 'income' : 'expenses';
            this.budget[key].push({
                desc: this.currentDesc,
                value: this.currentType === 'inc' ? parseInt(this.currentVal) : -parseInt(this.currentVal),
            });
            this.resetData();
        }
    }
});

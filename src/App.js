import React, {Component} from 'react';
import './normalize.css';
import './style.css';
import Total from './components/total/Total';
import History from './components/history/History';
import Operation from './components/operation/Operation';

class App extends Component {
    
    /* Временное хранилище */ 
    state = {
        transactions: [],
        description: '',
        amount: '',
        allIncomeState: 0,
        allExpensesState: 0,
        balance: 0
    }

    /* Генератор уникального ID */
    genUniqID() {
        return `cmr${(+new Date).toString()}`;
    }

    /////// Домашка ////////

    /* Баланс */
    getBalance() {
        const balance = this.state.allIncomeState - this.state.allExpensesState;
        this.setState({
            balance
        });
    }


    calculate(type) {
        /* 
        type === true - доходы
        type === false - расходы
        */

        const sum = this.state.transactions.reduce((accum, item) => item.add === type ? accum + item.amount : accum, 0);
        
        if (type) {

            this.setState({
                allIncomeState: sum
            }, this.getBalance);

        } else {

            this.setState({
                allExpensesState: sum
            }, this.getBalance);
        
        }

    }

    /////// Конец домашки ///////////


    /* Добавление новых значений в хранилище */
    addTransaction = (add) => {

        /* Создание копии массива */
        const transactions = [...this.state.transactions];

        /* Формирование нового элемента объекта */
        const transaction = {
            id: this.genUniqID(),
            description: this.state.description,
            amount: +this.state.amount,
            add
        };

        /* Добавление элемента в хранилище */
        transactions.push(transaction);

        /* Обновляем значение transactions. И очищаем description / amount */
        this.setState({ 
            transactions,
            description: '',
            amount: '' 
        }, () => {
            /* Обновление общей статистики, после того state обновится */
            this.calculate(true);
            this.calculate(false);
        });


    }

    /* Обновление хранилище при вводе в поле инпут */
    addAmount = (e) => {
        this.setState({
            amount: e.target.value
        });
    }

    addDescription = (e) => {
        this.setState({
            description: e.target.value
        });
    }
    /* ------------- */

    



    

    render() {
        return (
            <>
                <header>
                    <h1>Кошелек</h1>
                    <h2>Калькулятор расходов</h2>
                </header>
                <main>
                    <div className="container">
                        <Total 
                            balance={this.state.balance}
                            allIncomeState={this.state.allIncomeState}
                            allExpensesState={this.state.allExpensesState}
                        />
                        <History 
                            transactions={this.state.transactions}
                        />
                        <Operation 
                            addTransaction={this.addTransaction}
                            addAmount={this.addAmount}
                            addDescription={this.addDescription}
                            amount={this.state.amount}
                            description={this.state.description}
                        />
                    </div>
                </main>
            </>
        );
    }
}

export default App;

import React from 'react';

export default class App extends React.Component{
    constructor(props){
        super(props);
        this.state={
           cardName :  '',
           result : 'result'
        }
    }
    submitCard(){
        var typeList = ['VISA', 'MasterCard', 'Discover', 'AMEX'];
        var cardType = 'Unknown';
        var card = this.state.cardName;
        for (let i = 0; i < typeList.length; i++) {
            cardType = this.firstCheck(card, typeList[i]) ? typeList[i] : 'Unknown';
            if (cardType !== 'Unknown') break;
        }

        this.setState({
            result :this.secondCheck(card) ?
            `${cardType}: ${card}   (valid)` : `${cardType}: ${card}  (Invalid)`
        })
    }

    firstCheck(card, type) {
        var result;
        switch (type) {
            case 'MasterCard':
                result = card.length == 16 &&
                    parseInt(card.substring(0, 2)) >= 51 &&
                    parseInt(card.substring(0, 2)) <= 55;
                break;
            case "AMEX":
                result = card.length == 15 &&
                    (card.substring(0, 2) == 34 || card.substring(0, 2) == 37);
                break;
            case 'Discover':
                result = card.length == 16 &&
                    card.substring(0, 4) == 6011;
                break;
            case 'VISA':
                result = (card.length == 13 || card.length == 16) &&
                    card.substring(0, 1) == 4;
                break;
            default:
                break;
        }
        return result;
    }

    secondCheck(card) {
        var counter = 0;
        var sum = 0;
        for (let i = card.length; i > 0; i--) {
            var output = counter % 2 ? card.substr(i - 1, 1) * 2 : card.substr(i - 1, 1);
            if (output > 9) {
                var temp = output.toString().split('').map(Number).reduce(function (a, b) {
                    return a + b;
                }, 0);
                output = temp;
            }
            counter++;
            sum += parseInt(output);
        }
        return sum % 10 == 0;
    }

    handleChange(event){
        this.setState({
            cardName : event.target.value
        })
        
    }
    render(){
        return (
            <div>
                <header>
              <h1>Compare The Price</h1>
            </header>
            <section>
              <h3>Check Credit Card</h3>
              <div className="main">
                <div className="form-group">
                 <label>Card</label>
                 <input type="number" 
                 value={this.state.cardName} 
                 className="form-control"
                 onChange={this.handleChange.bind(this)}
                  id="card" name="card"/>
                </div> 
                <button onClick={this.submitCard.bind(this)} 
                 disabled = {!this.state.cardName}
                 id="check" className = "btn">Check</button>
                <div className="form-group">
                 <span id="result"
                  className = "result"
                  >{this.state.result}</span>
                </div>                 
              </div>
            </section>
            </div>            
        )
    }
}

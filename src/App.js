import React, { Component } from 'react';
import ReactTable from "react-table";
import 'react-table/react-table.css'
import './App.css';
import axios from 'axios';


class App extends Component {
  constructor(props) {
    super(props);
    // this.goldenRetriever = this.goldenRetriever(cryptocurrency).bind(this);
    this.state = {
      cryptos: [],
      oldcryptos: [],
      newcryptos: [],
      miscdata: [],
      newercryptos:[],
      cryptodata: [],
    };

  }
  // added this function because cryptocompare conveniently does not allow us to call every currency we need in one api call
  async get_data(currency){
    return await axios.get('https://min-api.cryptocompare.com/data/dayAvg?fsym='
        + currency + '&tsym=USD&toTs=1392382854&tryConversion=false&extraParams=your_app_name').then(res => {
          // const cryptodata = res.data;]
         
         console.log(res.data.USD);
         console.log("I was supplied with "+currency)
         
       });
  }

  componentDidMount() {
    this.goldenRetriever = (cryptocurrency)=> {
      // var cryptodata = []
      axios.get('https://min-api.cryptocompare.com/data/dayAvg?fsym='
        + cryptocurrency + '&tsym=USD&toTs=1392382854&tryConversion=false&extraParams=your_app_name').then(res => {
          const cryptodata = res.data;
          this.setState({cryptodata :cryptodata});
       });
      
       return this.state.cryptodata.USD;
    }
    // console.log("component was mounted" + this.goldenRetriever("BTC"))
    axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,OMG,XMR,ZEC,XLM,STRAT,LTC,NEO,ADA,ICX,WAVES,ETH,STEEM,EOS,DASH,IOTA,XRP,BAT,XVG,TRX&tsyms=USD')
      .then(res => {
        const cryptos = res.data;
        console.log(cryptos);
        this.setState({ cryptos: cryptos });
      })
    axios.get('c')
      .then(res => {
        const oldcryptos = res.data;
        console.log(oldcryptos);
        this.setState({ oldcryptos: oldcryptos });
      })
    // axios.get('https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,OMG,XMR,ZEC,XLM,STRAT,LTC,NEO,ADA,ICX,WAVES,ETH,STEEM,EOS,DASH,IOTA,XRP,BAT,XVG,TRX&tsyms=USD')
    // .then(res => {
    //   const miscdata = res.data;
    //   console.log(miscdata);
    //   this.setState({miscdata: miscdata});
    // })
    const linksArray = ['https://min-api.cryptocompare.com/data/dayAvg?fsym=BTC&tsym=USD&toTs=1392382854&tryConversion=false&extraParams=your_app_name','https://min-api.cryptocompare.com/data/dayAvg?fsym=OMG&tsym=USD&toTs=1392382854&tryConversion=false&extraParams=your_app_name','https://min-api.cryptocompare.com/data/dayAvg?fsym=BTC&tsym=USD&toTs=1392382854&tryConversion=false&extraParams=your_app_name','https://min-api.cryptocompare.com/data/dayAvg?fsym=XMR&tsym=USD&toTs=1392382854&tryConversion=false&extraParams=your_app_name']
    axios.all(linksArray.map(l => axios.get(l)))
    .then(axios.spread(function (...res) {
      const newercryptos = res
      // all requests are now complete
      console.log("This is newer crptos" + res);
      this.setState({ newercryptos: newercryptos });
    }));
    // axios.all([
    //   axios.get('https://min-api.cryptocompare.com/data/dayAvg?fsym=BTC&tsym=USD&toTs=1392382854&tryConversion=false&extraParams=your_app_name'),
    //   axios.get('https://min-api.cryptocompare.com/data/dayAvg?fsym=OMG&tsym=USD&toTs=1392382854&tryConversion=false&extraParams=your_app_name'),
    //   axios.get('https://min-api.cryptocompare.com/data/dayAvg?fsym=XMR&tsym=USD&toTs=1392382854&tryConversion=false&extraParams=your_app_name'),
    //   axios.get('https://min-api.cryptocompare.com/data/dayAvg?fsym=ZEC&tsym=USD&toTs=1392382854&tryConversion=false&extraParams=your_app_name'),
    //   axios.get('https://min-api.cryptocompare.com/data/dayAvg?fsym=XLM&tsym=USD&toTs=1392382854&tryConversion=false&extraParams=your_app_name'),
    //   axios.get('https://min-api.cryptocompare.com/data/dayAvg?fsym=STRAT&tsym=USD&toTs=1392382854&tryConversion=false&extraParams=your_app_name'),
    //   axios.get('https://min-api.cryptocompare.com/data/dayAvg?fsym=LTC&tsym=USD&toTs=1392382854&tryConversion=false&extraParams=your_app_name'),
    //   axios.get('https://min-api.cryptocompare.com/data/dayAvg?fsym=NEO&tsym=USD&toTs=1392382854&tryConversion=false&extraParams=your_app_name'),
    //   axios.get('https://min-api.cryptocompare.com/data/dayAvg?fsym=ADA&tsym=USD&toTs=1392382854&tryConversion=false&extraParams=your_app_name'),
    //   axios.get('https://min-api.cryptocompare.com/data/dayAvg?fsym=ICX&tsym=USD&toTs=1392382854&tryConversion=false&extraParams=your_app_name'),
    //   axios.get('https://min-api.cryptocompare.com/data/dayAvg?fsym=WAVES&tsym=USD&toTs=1392382854&tryConversion=false&extraParams=your_app_name'),
    //   axios.get('https://min-api.cryptocompare.com/data/dayAvg?fsym=ETH&tsym=USD&toTs=1392382854&tryConversion=false&extraParams=your_app_name'),
    //   axios.get('https://min-api.cryptocompare.com/data/dayAvg?fsym=STEEM&tsym=USD&toTs=1392382854&tryConversion=false&extraParams=your_app_name'),
    //   axios.get('https://min-api.cryptocompare.com/data/dayAvg?fsym=EOS&tsym=USD&toTs=1392382854&tryConversion=false&extraParams=your_app_name'),
    //   axios.get('https://min-api.cryptocompare.com/data/dayAvg?fsym=DASH&tsym=USD&toTs=1392382854&tryConversion=false&extraParams=your_app_name'),
    //   axios.get('https://min-api.cryptocompare.com/data/dayAvg?fsym=IOTA&tsym=USD&toTs=1392382854&tryConversion=false&extraParams=your_app_name'),
    //   axios.get('https://min-api.cryptocompare.com/data/dayAvg?fsym=XRP&tsym=USD&toTs=1392382854&tryConversion=false&extraParams=your_app_name'),
    //   axios.get('https://min-api.cryptocompare.com/data/dayAvg?fsym=BAT&tsym=USD&toTs=1392382854&tryConversion=false&extraParams=your_app_name'),
    //   axios.get('https://min-api.cryptocompare.com/data/dayAvg?fsym=XVG&tsym=USD&toTs=1392382854&tryConversion=false&extraParams=your_app_name'),
    //   axios.get('https://min-api.cryptocompare.com/data/dayAvg?fsym=TRX&tsym=USD&toTs=1392382854&tryConversion=false&extraParams=your_app_name'),
    // ])
    //   .then(axios.spread(
    //     (btcRes, omgRes, xmrRes, zecRes, xlmRes, stratRes, ltcRes, neoRes, adaRes, icxRes, wavesRes, ethRes, steemRes, eosRes, dashRes, iotaRes, xrpRes, batRes, xvgRes, trxRes) => {
    //       console.log("this is btcres " + btcRes)
        // const newcryptos = btcRes
        // newcryptos.push(omgRes)
        // newcryptos.push(xmrRes)
        // newcryptos.push(zecRes)
        // newcryptos.push(xlmRes)
        // newcryptos.push(stratRes)
        // newcryptos.push(ltcRes)
        // newcryptos.push(neoRes)
        // newcryptos.push(adaRes)
        // newcryptos.push(icxRes)
        // newcryptos.push(wavesRes)
        // newcryptos.push(ethRes)
        // newcryptos.push(steemRes)
        // newcryptos.push(eosRes)
        // newcryptos.push(dashRes)
        // newcryptos.push(iotaRes)
        // newcryptos.push(xrpRes)
        // newcryptos.push(batRes)
        // newcryptos.push(xvgRes)
        // newcryptos.push(trxRes)

        // console.log(newcryptos);
        // this.setState({newcryptos: newcryptos});
      // }));



  }



  render() {
    console.log("hi")
    // console.log("this is golden " + this.goldenRetriever("BTC"));
    // console.log(this.goldenRetriever("BTC")-5);
    // console.log(this.state.cryptos);
    // console.log(this.state.oldcryptos);

    // Using the data given as example, I assume userGroup will be dynamic and will change over time.
    // you can import 
    const userGroup = [{
      full_name: 'Hattie',
      loading: '...',
      uid: '01',
      data: {
        // usd_value: this.state.cryptos['XMR'].USD,
        cryptocurrency_name: 'Bitcoin',
        cryptocurrency_icon_URL: '../images/xmr.png',
        cryptocurrency_trading_symbol: 'BTC',
        cryptocurrency_token_balance: 0.0159952,
        crypto_price: 663.3
      }
    }, {

      full_name: 'Ella',
      loading: '...',
      uid: '02',
      data: {
        // usd_value: this.state.cryptos['XMR'].USD,
        cryptocurrency_name: 'Monero',
        cryptocurrency_icon_URL: '../images/bat.png',
        cryptocurrency_trading_symbol: 'XMR',
        cryptocurrency_token_balance: 0.0159952,
        crypto_price: 0
      }
    }, {
      full_name: 'Flora',
      loading: '...',
      uid: '03',
      data: {
        // usd_value: this.state.cryptos['XMR'].USD,
        cryptocurrency_name: 'OmiseGO',
        cryptocurrency_icon_URL: '../images/eos.png',
        cryptocurrency_trading_symbol: 'OMG',
        cryptocurrency_token_balance: 0.319904,
        crypto_price: 0
      }
    }, {
      full_name: 'Hilda',
      loading: '...',
      uid: '04',
      data: {
        // usd_value: this.state.cryptos['XMR'].USD,
        cryptocurrency_name: 'Zcash',
        cryptocurrency_icon_URL: '../images/eos.png',
        cryptocurrency_trading_symbol: 'ZEC',
        cryptocurrency_token_balance: 0.319904,
        crypto_price: 0
      }
    }, {
      full_name: 'Betsy',
      loading: '...',
      uid: '05',
      data: {
        // usd_value: this.state.cryptos['XMR'].USD,
        cryptocurrency_name: 'Stellar Lumens',
        cryptocurrency_icon_URL: '../images/eos.png',
        cryptocurrency_trading_symbol: 'XLM',
        cryptocurrency_token_balance: 11.9964,
        crypto_price: 0
      }
    }, {
      full_name: 'Inez',
      loading: '...',
      uid: '06',
      data: {
        // usd_value: this.state.cryptos['XMR'].USD,
        cryptocurrency_name: 'Stratis',
        cryptocurrency_icon_URL: '../images/eos.png',
        cryptocurrency_trading_symbol: 'STRAT',
        cryptocurrency_token_balance: 0.559832
      }
    }, {
      full_name: 'Beulah',
      loading: '...',
      uid: '07',
      data: {
        // usd_value: this.state.cryptos['XMR'].USD,
        cryptocurrency_name: 'Litecoin',
        cryptocurrency_icon_URL: '../images/eos.png',
        cryptocurrency_trading_symbol: 'LTC',
        cryptocurrency_token_balance: 15.35,
        crypto_price: 0.25
      }
    }, {
      full_name: 'Gladys',
      loading: '...',
      uid: '08',
      data: {
        // usd_value: this.state.cryptos['XMR'].USD,
        cryptocurrency_name: 'NEO',
        cryptocurrency_icon_URL: '../images/eos.png',
        cryptocurrency_trading_symbol: 'NEO',
        cryptocurrency_token_balance: 0.049985
      }
    }, {
      full_name: 'Camille',
      loading: '...',
      uid: '09',
      data: {
        // usd_value: this.state.cryptos['XMR'].USD,
        cryptocurrency_name: 'Cardano',
        cryptocurrency_icon_URL: '../images/eos.png',
        cryptocurrency_trading_symbol: 'ADA',
        cryptocurrency_token_balance: 13.9958
      }
    }, {
      full_name: 'Celia',
      loading: '...',
      uid: '10',
      data: {
        // usd_value: this.state.cryptos['XMR'].USD,
        cryptocurrency_name: 'Icon',
        cryptocurrency_icon_URL: '../images/eos.png',
        cryptocurrency_trading_symbol: 'ICX',
        cryptocurrency_token_balance: 1.309607,
        crypto_price: 0
      }
    }, {
      full_name: 'Edith',
      loading: '...',
      uid: '11',
      data: {
        // usd_value: this.state.cryptos['XMR'].USD,
        cryptocurrency_name: 'Waves',
        cryptocurrency_icon_URL: '../images/eos.png',
        cryptocurrency_trading_symbol: 'WAVES',
        cryptocurrency_token_balance: 0.819754
      }
    }, {
      full_name: 'Betty',
      loading: '...',
      uid: '12',
      data: {
        // usd_value: this.state.cryptos['XMR'].USD,
        cryptocurrency_name: 'Ethereum',
        cryptocurrency_icon_URL: '../images/eos.png',
        cryptocurrency_trading_symbol: 'ETH',
        cryptocurrency_token_balance: 0.0059,
        crypto_price: 0
      }
    }, {
      full_name: 'Agnes',
      loading: '...',
      uid: '13',
      data: {
        // usd_value: this.state.cryptos['XMR'].USD,
        cryptocurrency_name: 'Steem',
        cryptocurrency_icon_URL: '../images/eos.png',
        cryptocurrency_trading_symbol: 'STEEM',
        cryptocurrency_token_balance: 1.189643,
        crypto_price: 0
      }
    }, {
      full_name: 'Ellen',
      loading: '...',
      uid: '14',
      data: {
        // usd_value: this.state.cryptos['XMR'].USD,
        cryptocurrency_name: 'EOS',
        cryptocurrency_icon_URL: '../images/eos.png',
        cryptocurrency_trading_symbol: 'EOS',
        cryptocurrency_token_balance: 0.49985,
        crypto_price: 0
      }
    }, {
      full_name: 'Carmen',
      loading: '...',
      uid: '15',
      data: {
        // usd_value: this.state.cryptos['XMR'].USD,
        cryptocurrency_name: 'Dash',
        cryptocurrency_icon_URL: '../images/eos.png',
        cryptocurrency_trading_symbol: 'DASH',
        cryptocurrency_token_balance: 0.0079976,
        crypto_price: 0.25
      }
    }, {
      full_name: 'Gladys',
      loading: '...',
      uid: '16',
      data: {
        // usd_value: this.state.cryptos['XMR'].USD,
        cryptocurrency_name: 'MIOTA',
        cryptocurrency_icon_URL: '../images/eos.png',
        cryptocurrency_trading_symbol: 'IOTA',
        cryptocurrency_token_balance: 2.9991,
        crypto_price: 0
      }
    }, {
      full_name: 'Eloise',
      loading: '...',
      uid: '17',
      data: {
        // usd_value: this.state.cryptos['XMR'].USD,
        cryptocurrency_name: 'Ripple',
        cryptocurrency_icon_URL: '../images/eos.png',
        cryptocurrency_trading_symbol: 'XRP',
        cryptocurrency_token_balance: 4.9985,
        crypto_price: 0
      }
    }, {
      full_name: 'Belle',
      loading: '...',
      uid: '18',
      data: {
        // usd_value: this.state.cryptos['XMR'].USD,
        cryptocurrency_name: 'Basic Attention Token',
        cryptocurrency_icon_URL: '../images/eos.png',
        cryptocurrency_trading_symbol: 'BAT',
        cryptocurrency_token_balance: 12.9961
      }
    }, {
      full_name: 'Anita',
      loading: '...',
      uid: '19',
      data: {
        // usd_value: this.state.cryptos['XMR'].USD,
        cryptocurrency_name: 'Verge',
        cryptocurrency_icon_URL: '../images/eos.png',
        cryptocurrency_trading_symbol: 'XVG',
        cryptocurrency_token_balance: 82.9751,
        crypto_price: 0
      }
    }, {
      full_name: 'Greta',
      loading: '...',
      uid: '20',
      data: {
        // usd_value: this.state.cryptos['XMR'].USD,
        cryptocurrency_name: 'TRON',
        cryptocurrency_icon_URL: '../images/eos.png',
        cryptocurrency_trading_symbol: 'TRX',
        cryptocurrency_token_balance: 99.97,
        crypto_price: 0
      }
    }
    ];
    const convertedObject = Object.values(userGroup);
    var columns = []
    if (this.state.cryptos.length === 0) {
      console.log("empty")
      columns = [{
        Header: 'User ID',
        accessor: 'uid'
      }, {
        Header: 'User Name',
        accessor: 'full_name',
        Cell: props => <span className='number'>{props.value}</span>
      }, {

        Header: 'Crypto Trading Symbol',
        accessor: 'data.cryptocurrency_trading_symbol',
        Header: props => <span>Crypto Icon</span>,
        accessor: 'data.cryptocurrency_icon_URL'
      }, {

        Header: 'Crypto Name',

        accessor: 'data.cryptocurrency_name'
      }, {

        Header: 'Amount of coin/Token',
        accessor: 'data.cryptocurrency_token_balance'
      }, {

        Header: 'USD Value',
        accessor: 'loading'
      }, {

        Header: '% change in price since Feb 14, 2018',
        accessor: 'full_name'
      }, {

        Header: '% difference of current price and price on 2/14/18',
        accessor: 'full_name'
      }, {

        Header: 'USD value of % changed since 2/14/18',
        accessor: 'full_name'
      }]

    } else {
      console.log("not empty")

      // console.log(this.state.oldcryptos)
      // var troll = this.state.cryptos['XMR'].USD

      // console.log(troll)
      // console.log(this.state.oldcryptos);
      columns = [{
        Header: 'User ID',
        accessor: 'uid'
      }, {
        Header: 'User Name',
        accessor: 'full_name',
        Cell: props => <span className='number'>{props.value}</span>
      }, {

        Header: 'Crypto Trading Symbol',
        accessor: 'data.cryptocurrency_trading_symbol'
      }, {
        id: 'friendName5',
        Header: props => <span>Crypto Icon</span>,
        accessor: d => (d.data.cryptocurrency_icon_URL),
        Cell: d => <span className='number'>{d.original.cryptocurrency_icon_URL}</span>

      }, {

        Header: 'Crypto Name',

        accessor: 'data.cryptocurrency_name'
      }, {

        Header: 'Amount of coin/Token',
        accessor: 'data.cryptocurrency_token_balance'
      }, {
        id: 'friendName',
        Header: 'USD Value',

        accessor: d => (this.state.cryptos[d.data.cryptocurrency_trading_symbol].USD * d.data.cryptocurrency_token_balance) // Round up to required decimal places
      }, {
        id: 'friendName2',
        Header: '% change in price since Feb 14, 2018',
        // accessor:(  (d) => {

        //   const b =  axios.get('https://min-api.cryptocompare.com/data/dayAvg?fsym='
        //     + d.data.cryptocurrency_trading_symbol + '&tsym=USD&toTs=1392382854&tryConversion=false&extraParams=your_app_name')
            

        //    if ([b].USD === undefined) {
        //      //do something here
        //      console.log("it is undefined")
            
        //    } else{
        //      console.log("it is defined")
        //     return b.USD
        //   }
            
        // })
        accessor: d => ((this.state.cryptos[d.data.cryptocurrency_trading_symbol].USD-(d.data.crypto_price))/d.data.crypto_price*100)
    
      }, {
        id: 'friendName3',
        Header: '% difference of current price and price on 2/14/18',
        accessor: d => ((this.state.cryptos[d.data.cryptocurrency_trading_symbol].USD-(d.data.crypto_price))/d.data.crypto_price*100)
      }, {
        id: 'friendName4',
        Header: 'USD value of % changed since 2/14/18',
        accessor: d => (((this.state.cryptos[d.data.cryptocurrency_trading_symbol].USD-(d.data.crypto_price))/d.data.crypto_price*100)*this.state.cryptos[d.data.cryptocurrency_trading_symbol].USD)
      }]
    }





    return <ReactTable
      data={userGroup}
      columns={columns}
    />
  }
}

export default App;

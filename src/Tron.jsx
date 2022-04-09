import React from 'react';


class RApp extends React.Component {
  state = {
    tronWeb: {
        installed: false,
        loggedIn: false,
    },
    loading: true,
    account: "",
    balance: 0,
    tronPower: 0,
    tfVotes: 0
  }

  componentDidMount() {
    const loadWatcher = setInterval( async () => {
        if(window.tronWeb && window.tronWeb.ready) {
            clearInterval(loadWatcher);
            const installed = !!window.tronWeb;
            const tronWebState = {
                installed: installed,
                loggedIn: true
            };

            
            this.setState({
                tronWeb: tronWebState,
                account: window.tronWeb.defaultAddress.base58
            });
            this.fetchInfo(window.tronWeb.defaultAddress.base58)

            window.tronWeb.on('addressChanged', (addr) =>{
                const { account } = this.state;
                // reload address
                if (account !== addr.base58) {
                    this.setState({
                        loading: true,
                        account: addr.base58,
                        balance: 0,
                        
                    }, this.fetchInfo(addr))
                }
                
            })
        }
    }, 200)
  }

  fetchInfo = async addr =>{
    const acc = await window.tronWeb.trx.getAccount();

    this.setState({
      loading: false,
      balance: (acc.balance/1000000),
      
    })
  }

  renderInfo = () => {
    const {
      loading,
      account,
      
    } = this.state;
    if (loading) {
      return <p>
        Loading...
      </p>
    }
    return <p>
        Account: {account} <br/>
      
    </p>
    
  }

  render() {
    const {
      tronWeb: {
        installed,
        loggedIn
      }
    } = this.state;

    return (
      <div className="App">
        <header className="App-header">
       
          { !installed && <p>
            Please install TronLink
            </p>
          }
          { installed && !loggedIn && <p>
            Please unlock TronLink
            </p>
          }

          { installed && loggedIn && 
            this.renderInfo()
          }
        </header>
      </div>
    );
  }
}

export default RApp;
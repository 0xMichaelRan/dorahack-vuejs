<template>
  <div class="navs">
    <div class='header'>
      <div class="logo">logo</div>
      <div class="user" @click='handleClick'>user</div>
    </div>
  </div>
</template>

<script>
import Web3 from 'web3'
let web3
import common from '../common'
export default {
  components: {

  },
  data() {
    return {
      url: 'https://login-with-metamask-backend.herokuapp.com/api',
      menu: [
        {
          value: 'Market',
          path: 'market'
        },
        {
          value: 'Trade',
          path: 'trade'
        },
        {
          value: 'Administrative Analytics',
          path: 'administrative'
        }
      ]
    }
  },
  watch: { },
  methods: { 
    go (name) {
      if (!name) return
      this.$router.push({name})
    }
  },
  created() { },
  mounted() { },
  computed: { },
  methods: {
    async handleClick(){
      // Check if MetaMask is installed
		if (!window.ethereum) {
			window.alert('Please install MetaMask first.');
			return;
		}
    
		if (!web3) {
			try {
				// Request account access if needed
				await window.ethereum.enable();

				// We don't know window.web3 version, so we use our own instance of Web3
				// with the injected provider given by MetaMask
				web3 = new Web3(window.ethereum)
			} catch (error) {
				window.alert('You need to allow MetaMask.');
				return;
			}
		}
    console.log('web3',web3.eth)
		const coinbase = await web3.eth.getCoinbase();
		if (!coinbase) {
			window.alert('Please activate MetaMask first.');
			return;
		}

		const publicAddress = coinbase.toLowerCase();
		// setLoading(true);
    
		// Look if user with current publicAddress is already present on backend
		fetch(
			`${this.url}/users?publicAddress=${publicAddress}`
		)
			.then((response) => response.json())
			// If yes, retrieve it. If no, create it.
			.then((users) =>
				users.length ? users[0] : this.handleSignup(publicAddress)
        //  this.handleSignup(publicAddress)
			)
			// Popup MetaMask confirmation modal to sign message
			.then(this.handleSignMessage)
			// Send signature to backend on the /auth route
			.then(this.handleAuthenticate)
			// Pass accessToken back to parent component (to save it in localStorage)
			.then(this.onLoggedIn)
			.catch((err) => {
				window.alert(err);
				// setLoading(false);
			});
    },
    handleSignup(publicAddress){
      return fetch(`${this.url}/users`, {
        body: JSON.stringify({ publicAddress }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      }).then((response) => response.json());
    },
    async handleSignMessage(publicAddress,nonce){
      console.log('nonce',nonce)
      try {
        const signature = await web3.eth.personal.sign(
          `I am signing my one-time nonce: ${nonce}`,
          publicAddress,
          '' // MetaMask will ignore the password argument here
        );

        return { publicAddress, signature };
      } catch (err) {
        throw new Error(
          'You need to sign the message to be able to log in.'
        );
      }
    },
    handleAuthenticate(publicAddress,signature,){
      return fetch(`${process.env.REACT_APP_BACKEND_URL}/auth`, {
        body: JSON.stringify({ publicAddress, signature }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      }).then((response) => response.json());
    }
  }
}
</script>
<style lang="less" scoped>
@import '../assets/style.less';
@media screen and (max-width: 1440px) {

}

.nav {
  display: flex;
  min-width: 1408px;
  height: 22px;
  margin: 0 auto;
  padding: 14px 16px;
  background: #FFFFFF;
}

.nav ul {
  display: flex;
}

.nav li {
  margin: 0 30px;
  color: #49505A;
  font-size: 14px;
  cursor: pointer;
}

.constants {
  width: 50%;
  display: flex;
  align-items: center;
}

.u {
  width: 50%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.u .usr-name {
  margin-left: 15px;
  font-size: 12px;
}

.logo {
  width: 144px;
  height: 20px;
  background: url(../assets/images/logo.png) no-repeat;
  background-size: contain;
}

.ff {
  background-color: #fff;
}
.header{
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px -5px 15px -1px #888888;
  background: #fff;
  .logo{
    width: 142px;
    height: 56px;
    margin-left: 24px;
    text-align: center;
    line-height: 56px;
    background-image: linear-gradient(to right, #6DB9C6, #369FBA);
    color: #fff;
    border-radius: 28px;
  }
  .user{
    width: 36px;
    height: 36px;
    margin-right: 48px
  }
}
</style>
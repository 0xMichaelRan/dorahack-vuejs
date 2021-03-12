<template>
  <div class='market'>
    
  <div class="tab">
    <div class="card" @click='changeCard(1)'>最新</div>
    <div class="card" @click='changeCard(2)'>投票</div>
    <div class="card">上传作品</div>
    <div id="demo">
        <vue-metamask 
            userMessage="msg" 
            @onComplete="onComplete"
        >
        </vue-metamask>
    </div>  
  </div>
  
  <div class="main">
    <div class="welcome" v-show='current === 1'>
      <span class="pic">
        <img class='picture' src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg1.artimg.net%2F202102%2FRvoVl1fPrS5isRv745cDY2r3WQCkBGXS9fT0BTdq.jpg&refer=http%3A%2F%2Fimg1.artimg.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1617614426&t=172e045b6383689b49ae81547e92e8be" alt="" style="height: 100%">
      </span>
      <div class="text">
        <div class="title">Artist: Beeple</div>
        <p>Beeple is Mike Winkelmann, a graphic designer from Charleston, SC, USA who does a variety of digital artwork including short films, Creative Commons VJ loops, everydays and VR / AR work. </p>
        <p><br> </p>
        <p>After he began releasing a set of widely used Creative Commons VJ loops he has worked on concert visuals for Justin Bieber, One Direction, Katy Perry, Nicki Minaj, Eminem, Zedd, deadmau5 and many more. </p>
        <p><br> </p>
        <p>One of the originators of the current "everyday" movement in 3D graphics, he has been creating a picture everyday from start to finish and posting it online for over ten years without missing a single day.</p>
      </div>
    </div>
    <div class="welcome" v-show='current === 2'>
      <span class="pic">
        <img class='picture' src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg1.artimg.net%2F202102%2FRvoVl1fPrS5isRv745cDY2r3WQCkBGXS9fT0BTdq.jpg&refer=http%3A%2F%2Fimg1.artimg.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1617614426&t=172e045b6383689b49ae81547e92e8be" alt="" style="height: 100%">
      </span>
      <div class="text">
        <div class="title">待上架艺术品</div>
        <p>Please prepare some token for voting. </p>
        <p><br> </p>
        <p>请使用官方BSC钱包投票。 </p>
        <p><br> </p>
        <p></p>
      </div>
    </div>

    <div class="cardList">
      <div class="works" v-for='(item,index) in cardList' :key='index' v-show='current === 1'>
        <img class='picture' :src='item.imageUrl' alt="" @click='toDetail(item.imageUrl, item.id)'>
        <div class="name">{{item.name}}</div>
        <div class="authorAndPricd">
          <span class='userId'>{{item.userId}}</span>
          <div v-show='item.status === "on_auction"'>
            <span class='price' style="background: #00ACA9;">可竞拍</span>
          </div>
          <div v-show='item.status === "finished"'>
            <span class='price'>已结束</span>
          </div>
        </div>
      </div>

      <div class="works2" v-for='(item,index) in cardList2' :key='index' v-show='current === 2'>
        <img class='picture' :src='item.url' alt="" @click='handleSignMessage(index)'>
      </div>
    </div>
  </div>
  
  </div>
  
</template>

<script>
var Web3 = require("web3")
import axios from 'axios'
import VueMetamask from 'vue-metamask';

export default {
  data(){
    return {
      url:'http://localhost:9091/dorahack/artwork/all-new-arts',
      current: 1,
      cardList2: [],
      cardList: [
        {
          name:'beeple大神作品',
          userId: 'michael',
          price: '12.34',
          url: '1',
        },
        {
          name:'beeple大神作品',
          userId: 'michael',
          price: '12.34',
          url: '2',
        },
        {
          name:'beeple大神作品',
          userId: 'michael',
          price: '12.34',
          url: '3',
        },
        {
          name:'beeple大神作品',
          userId: 'michael',
          price: '12.34',
          url: '4',
        },
         {
          name:'beeple大神作品',
          userId: 'michael',
          price: '12.34',
          url: '5',
        },
        {
          name:'beeple大神作品',
          userId: 'michael',
          price: '12.34',
          url: '6',
        },
        {
          name:'beeple大神作品',
          userId: 'michael',
          price: '12.34',
          url: '7',
        },
         {
          name:'beeple大神作品',
          userId: 'michael',
          price: '12.34',
          url: '8',
        },
        {
          name:'beeple大神作品',
          userId: 'michael',
          price: '12.34',
          url: '9',
        },
        {
          name:'beeple大神作品',
          userId: 'michael',
          price: '12.34',
          url: '10',
        },
        {
          name:'beeple大神作品',
          userId: 'michael',
          price: '12.34',
          url: '11',
        },
        {
          name:'beeple大神作品',
          userId: 'michael',
          price: '12.34',
          url: '12',
        },
      ]
    }
  },
  created(){
    this.getList()
    if (typeof web3 !== 'undefined') {
      web3 = new Web3(web3.currentProvider);
    } else {
      // set the provider you want from Web3.providers
      web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"));
    }
  },
  methods: {
    getList(){
      axios.get(this.url).then(res => {
          console.log('res',res)
          if(res.data.code === '0'){
            this.cardList2 = [
              {
                url:"http://sudasuta.com/wp-content/uploads/2019/06/sudasuta-Beeple1.jpg",
              },
              {
                url:"http://sudasuta.com/wp-content/uploads/2019/06/sudasuta-Beeple2.jpg",
              },
              {
                url:"http://sudasuta.com/wp-content/uploads/2019/06/sudasuta-Beeple3.jpg",
              },
              {
                url:"http://sudasuta.com/wp-content/uploads/2019/06/sudasuta-Beeple4.jpg",
              },
              {
                url:"http://sudasuta.com/wp-content/uploads/2019/06/sudasuta-Beeple5.jpg",
              },
              {
                url:"http://sudasuta.com/wp-content/uploads/2019/06/sudasuta-Beeple6.jpg",
              },
              {
                url:"http://sudasuta.com/wp-content/uploads/2019/06/sudasuta-Beeple7.jpg",
              },
              {
                url:"http://sudasuta.com/wp-content/uploads/2019/06/sudasuta-Beeple8.jpg",
              },
              {
                url:"http://sudasuta.com/wp-content/uploads/2019/06/sudasuta-Beeple9.jpg",
              },
              {
                url:"http://sudasuta.com/wp-content/uploads/2019/06/sudasuta-Beeple10.jpg",
              },
              {
                url:"http://sudasuta.com/wp-content/uploads/2019/06/sudasuta-Beeple11.jpg",
              },
              {
                url:"http://sudasuta.com/wp-content/uploads/2019/06/sudasuta-Beeple12.jpg",
              },
              {
                url:"http://sudasuta.com/wp-content/uploads/2019/06/sudasuta-Beeple13.jpg",
              },
              {
                url:"http://sudasuta.com/wp-content/uploads/2019/06/sudasuta-Beeple14.jpg",
              },
              {
                url:"http://sudasuta.com/wp-content/uploads/2019/06/sudasuta-Beeple15.jpg",
              },
              {
                url:"http://sudasuta.com/wp-content/uploads/2019/06/sudasuta-Beeple16.jpg",
              },
              {
                url:"http://sudasuta.com/wp-content/uploads/2019/06/sudasuta-Beeple17.jpg",
              },
              {
                url:"http://sudasuta.com/wp-content/uploads/2019/06/sudasuta-Beeple18.jpg",
              },
              {
                url:"http://sudasuta.com/wp-content/uploads/2019/06/sudasuta-Beeple19.jpg",
              },
              {
                url:"http://sudasuta.com/wp-content/uploads/2019/06/sudasuta-Beeple20.jpg",
              },
            ]
            this.cardList = res.data.data

          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    changeCard(idx){
      this.current = idx
    },
    toDetail(url,id){
      this.$router.push({path: '/detail',query:{imgUrl:url,artId:id}})
    },
    onComplete(data){
        console.log('data:', data);
    },
    handleSignMessage(index){
        console.log('sign msg:', index);
        // const msgParams = JSON.stringify({
        //   domain: {
        //     // Defining the chain aka Rinkeby testnet or Ethereum Main Net
        //     chainId: 1,
        //     // Give a user friendly name to the specific contract you are signing for.
        //     name: 'Ether Mail',
        //     // If name isn't enough add verifying contract to make sure you are establishing contracts with the proper entity
        //     verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
        //     // Just let's you know the latest version. Definitely make sure the field name is correct.
        //     version: '1',
        //   },

        //   // Defining the message signing data content.
        //   message: {
        //     /*
        //       - Anything you want. Just a JSON Blob that encodes the data you want to send
        //       - No required fields
        //       - This is DApp Specific
        //       - Be as explicit as possible when building out the message schema.
        //     */
        //     contents: 'Hello, Bob!',
        //     attachedMoneyInEth: 4.2,
        //     from: {
        //       name: 'Cow',
        //       wallets: [
        //         '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
        //         '0xDeaDbeefdEAdbeefdEadbEEFdeadbeEFdEaDbeeF',
        //       ],
        //     },
        //     to: [
        //       {
        //         name: 'Bob',
        //         wallets: [
        //           '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
        //           '0xB0BdaBea57B0BDABeA57b0bdABEA57b0BDabEa57',
        //           '0xB0B0b0b0b0b0B000000000000000000000000000',
        //         ],
        //       },
        //     ],
        //   },
        //   // Refers to the keys of the *types* object below.
        //   primaryType: 'Mail',
        //   types: {
        //     // TODO: Clarify if EIP712Domain refers to the domain the contract is hosted on
        //     EIP712Domain: [
        //       { name: 'name', type: 'string' },
        //       { name: 'version', type: 'string' },
        //       { name: 'chainId', type: 'uint256' },
        //       { name: 'verifyingContract', type: 'address' },
        //     ],
        //     // Not an EIP712Domain definition
        //     Group: [
        //       { name: 'name', type: 'string' },
        //       { name: 'members', type: 'Person[]' },
        //     ],
        //     // Refer to PrimaryType
        //     Mail: [
        //       { name: 'from', type: 'Person' },
        //       { name: 'to', type: 'Person[]' },
        //       { name: 'contents', type: 'string' },
        //     ],
        //     // Not an EIP712Domain definition
        //     Person: [
        //       { name: 'name', type: 'string' },
        //       { name: 'wallets', type: 'address[]' },
        //     ],
        //   },
        // });
        
        // var from = web3.eth.accounts[0];

        // var params = [from, msgParams];
        // var method = 'eth_signTypedData_v4';

        // web3.currentProvider.sendAsync(
        //   {
        //     method,
        //     params,
        //     from,
        //   },
        //   function (err, result) {
        //     if (err) return console.dir(err);
        //     if (result.error) {
        //       alert(result.error.message);
        //     }
        //     if (result.error) return console.error('ERROR', result);
        //     console.log('TYPED SIGNED:' + JSON.stringify(result.result));

        //     const recovered = sigUtil.recoverTypedSignature_v4({
        //       data: JSON.parse(msgParams),
        //       sig: result.result,
        //     });

        //     if (
        //       ethUtil.toChecksumAddress(recovered) === ethUtil.toChecksumAddress(from)
        //     ) {
        //       alert('Successfully recovered signer as ' + from);
        //     } else {
        //       alert(
        //         'Failed to verify signer when comparing ' + result + ' to ' + from
        //       );
        //     }
        //   }
        // );
    },
  },
  components: {
      VueMetamask,
  },
}
</script>

<style lang="less" scoped>
.market{
  width: 100%;
}

.tab{
  width: 552px;
  height: 60px;
  display: flex;
  margin: 50px auto 40px !important; 
  .card{
    width: 144px;
    height: 60px;
    line-height: 60px;
    text-align: center;
    margin-left: 60px;
    border-radius: 14px;
    background: #fff;
    cursor: pointer;
  }
}
.tab:first-child{
  margin-left: 0px
}
.main{
  padding: 0px 80px;
  box-sizing: border-box;
  .welcome{
    padding: 52px 40px;
    margin-bottom: 40px;
    width: 100%;
    height: 270px;  
    box-sizing: border-box;
    display: flex;
    box-shadow: 2px 0px 7px 6px #e6e8e8;
    .pic{
      display: inline-block;
      width: 120px;
      height: 120px;
      margin-right: 40px;
      background: url(../assets/images/2.png) no-repeat;
      background-size: 100% 100%;
    }
    .text{
      text-align: left;
      .title{
        color: #313F43;
        font-size: 32px;
        margin-bottom: 10px;
        font-weight: bold;
      }
      p{
        color: #8B929A;
        font-size: 14px;;
      }
    }
  }
  .cardList{
    display: flex;
    flex-wrap: wrap;
    .works{
      width: 24%;
      height: 350px;
      box-sizing: border-box;
      padding: 20px;
      background: #fff;
      margin-bottom: 10px;
      margin-right: 1%;
      .picture{
        width: 100%;
        height: 210px;
        border: 1px dashed #888888;
        cursor: pointer;
      }
      .name{
        width: 100%;
        margin: 20px 0px;
        font-size: 18px;
        color: #313F43;
        text-align: left;
      }
      .authorAndPricd{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-left: 40px;
        background: url(../assets/images/1.png) no-repeat;
        background-size: 32px;
        background-position: left center;
        .author{
          color: #bec0c2;
          font-size: 14px;
        }
        .price{
          font-size: 16px;
          border-radius: 6px;
          padding-left: 10px;
          padding-right: 10px;
          padding-top: 5px;
          padding-bottom: 5px;
        }
      }
      &:hover{
        border-radius: 12px;
        box-shadow: 0px 2px 4px 0px #313f43;
      }
    }
    .works2{
      width: 15%;
      height: 150px;
      box-sizing: border-box;
      padding: 10px;
      background: #fff;
      margin-bottom: 3px;
      margin-right: 1%;
      .picture{
        width: 100%;
        height: 160px;
        border: 1px dashed #888888;
        cursor: pointer;
      }
    }
  }
}
</style>
<template>
  <div class='detail'>
    <div class="info">
      <div class="leftPic">
        <img class='picture' :src="this.url" alt="">
      </div>
      <div class="main">
        <p class='author'>艺术家<span class='authorName'> beeple </span>创作</p>
        <p class='title'> {{artName}} </p>
        <p class='idAndHash'>ID:1000300002 ▪ Hesh:<span class='hash'>#0xd92e ... 7fa96</span></p>
        <p class='source'>由 <span class='owner'>{{ownerId}}</span>拥有</p>
        <p class="descripe">Colorful and playful characters will help you create awesome websites and applications. "我不是那种会认为世界即将终结的人，不会有那种一切都会变得一团糟，20年后我们还是被限制在地上吃着烂泥的想法。我一般是很乐观的，我认为我们的社会会继续发展下去——可怕的事情正在发生，但也有很多美好的事情正在发生。（绝不是redmi软广！）"</p>
        <p class='opera'><span class="label">标签</span><span class="link">链接</span></p>
        <p class="priceAndTime">
          <span>历史价格</span>
        </p>
        <div class="price-chart" style="width=100%">
          <img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3361691419,17368972&fm=15&gp=0.jpg">
        </div>

        <div v-show='this.status === "on_auction"'>
          <p class='highestPrice'>当前最高价TODO<span style="color:red;"> $12,999 </span></p>
          <div class="Bidding" @click='submitPostBid()'>出 价</div>
        </div>
        <div v-show='this.status === "finished"'>
          <p class='highestPrice'>最近成交价TODO<span style="color:green;"> $12,999 </span></p>
          <div class="Bidding" style='background: #26152d;'>该藏品还没上架，请等待下一轮</div>
        </div>

      </div>
    </div>
    <div class="list">
      <ul>
        <li class='title'>
          <span>竞拍记录</span>
          <span>
            <div v-show='this.status === "on_auction"'>
              <span>倒计时：<i>{{time.hour}}: {{time.minute}}: {{time.secends}}</i></span>
            </div>
          </span>
        </li>
        <li class="strip" v-for='(item,index) in historyList' :key='index'>
          <span class='name'><i class='icon'></i>{{item.name}}</span>
          <span class='price'><span class="unit"> $ </span>{{item.price}}</span>
          <span class='ids'><span class="inInner">{{item.id}}</span></span>
          <span class='time'>{{item.time}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data(){
    return {
      queryArtUrl:'http://localhost:9091/dorahack/artwork/id?id=',
      queryAuctionUrl:'http://localhost:9091/dorahack/auction/id/round/latest?artId=',
      artName: "default-art-name",
      ownerId: "default-owner-id",
      listingRound: "0",
      auctionRound: "0",
      status: "void",
      auctionStartTime: "0",
      auctionEndTime: "0",
      historyList:[
        {
          name: 'creator_name',
          price: '100.00',
          id: '#0xd92e ... 7fa96',
          time:{
            hour: 999,
            minute: 60,
            secends: 60
          },
        },
      ],
      time:{
        hour: 8,
        minute: 43,
        secends: 26
      },
    }
  },
  created(){
    this.url = this.$route.query.imgUrl
    this.artId = this.$route.query.artId
    console.log('url is ',this.url)
    this.getList()
  },
  methods: {
    submitPostBid(){
      var url = "http://localhost:9091/dorahack/auction/id/round/id/bid?artId=1367773191933771778&auctionRound=1&bidPrice=114&bidUserId=mike_jordan"
      axios.post(url, {
          artId: '1367773191933771778',
          auctionRound: '1',
          bidPrice: '112',
          bidUserId: 'mike_jordan'
        }).then((response) => {
          console.log("返回的值"+response.data)
        }).catch((response) => {
          console.log("错误"+response)
        })
    },
    getList(){
      axios.get(this.queryArtUrl + this.artId).then(res => {
        console.log('res', res)
        if(res.data.code === '0'){
          var data = res.data.data
          this.artName = data.name
          this.ownerId = data.userId
          this.listingRound = data.listingRound
          // this.status = data.status == 'on_auction' ? '竞拍中' : '已被购买'
          this.status = data.status;

              // if this is Auction page, then get queryAuctionUrl()
              if (this.status == 'on_auction') {
                axios.get(this.queryAuctionUrl + this.artId).then(res => {
                  console.log('res', res)
                  if(res.data.code === '0'){
                    var data = res.data.data
                    this.auctionRound = data[0].auctionRound
                    this.auctionStartTime = data[0].startTime
                    this.auctionEndTime = data[0].endTime

                    var date1=new Date();
                    var nowTime = [
                      "2021",
                      date1.getMonth(),
                      date1.getDay(),
                      date1.getHours(),
                      date1.getMinutes(),
                      date1.getSeconds(),
                    ]

                    this.time.hour = this.auctionEndTime[2] - nowTime[2]
                    this.time.minute = this.auctionEndTime[3] - nowTime[3]
                    this.time.hour = this.auctionEndTime[4] - nowTime[4]

                    // for each data[], get bidUesrId, bidPrice, bidTime
                    var ll = [];
                    for(var i=0; i<data.length; i++){
                      ll[i] = []
                      ll[i].name = data[i].bidUesrId
                      ll[i].price = data[i].bidPrice
                      ll[i].time = this.calculateTimeDiff(nowTime, data[i].bidTime)
                    }
                    this.historyList = ll;
                  }
                })
                .catch(error => {
                  console.log(error)
                })
              }
              // else if this is TransHistory page, then get from transHistory table
              // TODO

        }
      })
      .catch(error => {
        console.log(error)
      })
    },
    calculateTimeDiff(time1, time2) {
      var diff = 
        // (time1[1] - time2[1]) + "/" + 
        (time1[2] - time2[2]) + "天 " +
        (time1[3] - time2[3]) + "小时 " +
        (time1[4] - time2[4]) + "分钟 " +
        (time1[5] - time2[5]) + "秒 "
      return diff 
    },
  },
  mounted(){
    let self = this
    let intervalId = setInterval(function(){
      self.time.secends--
      if(self.time.secends <= 0){
        self.time.secends = 60
        self.time.minute--
        if(self.time.minute<=0){
          self.time.minute = 59
          self.time.hour--
          if(self.time.hour === 0){
            clearInterval(intervalId)
            intervalId = null
          }
        }
      }
    },1000)
  }

}
</script>

<style lang='less' scoped>
.detail{
  padding: 60px 80px;
  box-sizing: border-box;
  width: 100%;
  .info{
    height: 790px;
    display: flex;
    text-align: left;
    .leftPic{
      box-sizing: border-box;
      width: 720px;
      height: 790px;
      background-color: #06101C;
      padding-top: 90px;
      .picture{
        width: 720px;
        height: 540px;
      }
    }
    .main{
      margin-left:40px;
      .author{
        color: #313F43;
        font-size: 16px;
        margin-bottom: 23px;
        margin-top: 12px;
        .authorName{
          color: #00ACA9
        }
      }
      .title{
        color: #06101C;
        font-size: 32px;
        margin-bottom: 16px;
      }
      .idAndHash,.source{
        color:#8B929A;
        font-size: 14px;
        margin-bottom: 15px;
        .hash,.owner{
          color: #00ACA9;
        }
      }
      .descripe{
        margin-top: 10px;
        margin-bottom: 19px;
        font-size: 16px;
        color:#313F43;
      }
      .opera{
        font-weight: bold;
        color: #06101C;
        font-size: 16px;
        margin-bottom: 28px;
        .label{
          margin-right: 40px
        }
      }
      .priceAndTime{
        color: #06101C;
        font-size: 16px;
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
      }
      .price-chart{
        width: 100%;
        height: 274px;
        border-radius: 16px;
        margin-bottom: 33px;
      }
      .highestPrice{
        color: #313F43;
        font-size: 21px;
        margin-bottom: 18px;
      }
      .Bidding{
        width: 100%;
        height: 60px;
        background: #00ACA9;
        text-align: center;
        line-height: 60px;
        color: #fff;
        border-radius: 12px;
        font-size: 21px;
      }
    }
  }
  .list{
    margin-top: 20px;
    li{
      padding: 0px 40px;
      height: 75px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #E6E8EB;
    }
    .title{
      display: flex;
      justify-content: space-between;
      i{
        color: #F84E58;
        font-size: 22px;
        margin-right: 33px;
      }
      .state{
        display: inline-block;
        width: 80px;
        height: 34px;
        line-height: 34px;
        text-align: center;
        background: #fcdadc;
        border-radius: 17px;
        color: #F84E58;
      }
    }
    .strip{
      font-size: 16px;
      justify-content: space-between;
      .name{
        width: 20%;
        display: flex;
        align-items: center;
        .icon{
          display: inline-block;
          width: 22px;
          height: 22px;
          margin-right: 2px;
          border-radius: 50%;
          background-color: #D8D8D8;
        }
      }
      .price{
        width: 20%;
        text-align: center;
        display: flex;
        .unit{
          margin-right: 5px;
          color: #d0d2d4;
        }
      }
      .ids{
        width: 40%;
        display: flex;
        .inInner{
          height: 40px;
          width: 60%;
          background: #e2f1f5;
          color: #3EA3BC;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 16px;
        }
      }
      .time{
        display: flex;
        width: 20%;
        text-align: center;
      }
    }
  }
}
</style>
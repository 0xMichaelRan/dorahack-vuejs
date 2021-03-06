<template>
  <div class='detail'>
    <div class="info">
      <div class="leftPic">
        <img class='picture' :src="this.url" alt="">
      </div>
      <div class="main">
        <p class='author'>艺术家<span class='authorName'>小摩多</span>创作</p>
        <p class='title'>走进人间#2/207</p>
        <p class='idAndHash'>ID:1000300002 ▪ Hesh:<span class='hash'>#0xd92e ... 7fa96</span></p>
        <p class='source'>由 <span class='owner'>leonkrypt</span>拥有</p>
        <p class="descripe">Colorful and playful characters will help you create awesome websites and applications</p>
        <p class='opera'><span class="label">标签</span><span class="link">链接</span></p>
        <p class="priceAndTime">
          <span>历史价格</span>
          <span>全部时间</span>
        </p>
        <div class="blank"></div>
        <p class='highestPrice'>当前最高价 $1234.54</p>
        <div class="Bidding">竞拍</div>
      </div>
    </div>
    <div class="list">
      <ul>
        <li class='title'>
          <span>竞拍记录</span>
          <span>
            <span>倒计时：<i>{{time.hour}}: {{time.minute}}: {{time.secends}}</i></span>
            <span class='state'>竞拍中</span>
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
export default {
  data(){
    return {
      url:'',
      historyList:[
        {
          name: '成琦冰',
          price: '993.49',
          id: '#0xd92e ... 7fa96',
          time: '2分钟前'
        },
        {
          name: '祖富璐',
          price: '886.8',
          id: '#0xd92e ... 7fa96',
          time: '52分钟前'
        },
        {
          name: '闵珊志',
          price: '993.49',
          id: '#0xd92e ... 7fa96',
          time: '3小时32分钟前'
        },
        {
          name: '字凡',
          price: '993.49',
          id: '#0xd92e ... 7fa96',
          time: '2分钟前'
        }
      ],
      time:{
        hour: 8,
        minute: 43,
        secends: 26
      }
    }
  },
  created(){
    this.url = this.$route.query.imgUrl
    console.log('url',this.url)
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
    height: 720px;
    display: flex;
    text-align: left;
    .leftPic{
      box-sizing: border-box;
      width: 720px;
      height: 720px;
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
        margin-top: 14px;
        margin-bottom: 29px;
        font-size: 16px;
        color:#313F43;
      }
      .opera{
        font-weight: bold;
        color: #06101C;
        font-size: 16px;
        margin-bottom: 48px;
        .label{
          margin-right: 40px
        }
      }
      .priceAndTime{
        color: #06101C;
        font-size: 16px;
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
      }
      .blank{
        width: 100%;
        height: 214px;
        background: #E6E8EB;
        border-radius: 16px;
        margin-bottom: 33px;
      }
      .highestPrice{
        color: #313F43;
        font-size: 12px;
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
        font-size: 28px;
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
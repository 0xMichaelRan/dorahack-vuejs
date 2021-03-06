<template>
  <div class='market'>
    
  <div class="tab">
    <div class="card" @click='changeCard(1)'>最新</div>
    <div class="card" @click='changeCard(2)'>全部</div>
    <div class="card">投票</div>
  </div>
  
  <div class="main">
    <div class="welcome" v-show='current === 1'>
      <span class="pic"></span>
      <div class="text">
        <div class="title">Alexandra Zutto</div>
        <p>Welcome to my design portfolio on Dribbble</p>
        <p>Welcome to my design portfolio on Dribbble Welcome to my design portfolio on Dribbble</p>
        <p>Welcome to my design portfolio on Dribbble</p>
        <p>Welcome to my design portfolio on Dribbble Welcome to my design portfolio on Dribbble</p>
        <p>Welcome to my design portfolio on Dribbble</p>
      </div>
    </div>

    <div class="cardList">
      <div class="works" v-for='(item,index) in cardList' :key='index'>
        <img class='picture' :src='item.imageUrl' alt="" @click='toDetail(item.imageUrl)'>
        <div class="name">{{item.name}}</div>
        <div class="authorAndPricd">
          <span class='author'>michael</span>
          <span class='price'>12.34</span>
        </div>
      </div>
    </div>
  </div>
  
  </div>
  
</template>

<script>
import axios from 'axios'
export default {
  data(){
    return {
      url:'http://localhost:9091/dorahack/artwork/all-new-arts',
      current: 1,
      cardList: [
        {
          name:'beeple大神作品',
          author: 'michael',
          price: '12.34',
          url: '1',
        },
        {
          name:'beeple大神作品',
          author: 'michael',
          price: '12.34',
          url: '2',
        },
        {
          name:'beeple大神作品',
          author: 'michael',
          price: '12.34',
          url: '3',
        },
        {
          name:'beeple大神作品',
          author: 'michael',
          price: '12.34',
          url: '4',
        },
         {
          name:'beeple大神作品',
          author: 'michael',
          price: '12.34',
          url: '5',
        },
        {
          name:'beeple大神作品',
          author: 'michael',
          price: '12.34',
          url: '6',
        },
        {
          name:'beeple大神作品',
          author: 'michael',
          price: '12.34',
          url: '7',
        },
         {
          name:'beeple大神作品',
          author: 'michael',
          price: '12.34',
          url: '8',
        },
        {
          name:'beeple大神作品',
          author: 'michael',
          price: '12.34',
          url: '9',
        },
        {
          name:'beeple大神作品',
          author: 'michael',
          price: '12.34',
          url: '10',
        },
        {
          name:'beeple大神作品',
          author: 'michael',
          price: '12.34',
          url: '11',
        },
        {
          name:'beeple大神作品',
          author: 'michael',
          price: '12.34',
          url: '12',
        },
      ]
    }
  },
  created(){
    this.getList()
  },
  methods: {
    getList(){
      axios.get(this.url).then(res => {
          console.log('res',res)
          if(res.data.code === '0'){
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
    toDetail(url){
      this.$router.push({path: '/detail',query:{imgUrl:url}})
    }
    

  }
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
    height: 240px;  
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
          color: #00ACA9;
          font-size: 22px;
          
        }
      }
      &:hover{
        border-radius: 12px;
        box-shadow: 0px 2px 4px 0px #313f43;
      }
    }
  }
}
</style>
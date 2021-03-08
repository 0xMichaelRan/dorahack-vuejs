# Dorahack 参赛产品：Magi Platform（前端）

For source code of the backend, visit: https://github.com/michaelran16/dorahack-spring-boot/

![](http://github.com/michaelran16/dorahack-vuejs/raw/main/src/assets/long-logo.png)

__Magi 是一个不同于 OpeaSea, Rarible 的新型 Nft 拍卖平台。__

当下的流行的Nft marketplace包括Opeaseas，Rarible和Mintbase都存在一下一些问题：

1. 流通情况差。因每次拍卖jump price过高，长期持有，导致无流通量。
2. 艺术品的表现形式单一。多数都没集成ipfs，多数都是上传一张照片，和有限的几个文字标签。
3. 头部效应过于严重。多数艺术家无法被发掘。
4. 利益分润模式不够合理。 Speculation属性高。同时因为交易量小，经济模型流转起来困难。

Magi通过新型的拍卖形式，解决上述问题。具体方案如下。

1. 解决jump price问题。
2. 解决流通性差，长期hodl无交易量问题。
3. 解决艺术品过多，投资者无法选择问题。
4. 艺术品存储至 Ipfs
5. 更加合理的 token economics 和 利益共同者绑定

团队成员从2017年之前专注区块链跨境支付场景和线上交易簿系统开发。成员曾经雇主包括Facebook，Stellar，敦煌网等。

![](http://github.com/michaelran16/dorahack-vuejs/raw/main/src/assets/logo.png)

# Tokenomics

## 新艺术品上架规则

- 每周只上架数量 dw，上新起拍价 ps

算法调节 + 持币社区投票

## 拍卖规则

- 每一轮拍卖时间 itv，价格硬顶 pc

算法调节 + 持币社区投票

## 拍卖成功后的买家支付

- 支付时限 bt，分成 inc

Initially set as 97/1/1/1

（部分核心逻辑暂时保密，细节请联系官方账号）https://twitter.com/Magi22206010

## 数据库设计

一，个人数据表 user_table

  1. user_id （自动生成）
  2. user_full_name：全名
  3. matamask_address：以太坊地址
  4. user_profile_url: 头像链接
  5. user_bio 个人描述
  6. user_email_address: 邮箱

二，藏品表 artwork_table

  1. art_id （自动生成）
  2. eth_address：区块链上的地址
  3. owner_id 对应 user_id
  4. staus 藏品状态：正在拍（on_auction），拍完完成并等待支付（pending_payment），持有状态不再拍卖（finished）
  5. art_name 艺术品名称（设置后不可更改）
  6. listing_round 艺术品第几轮上新（设置后不可更改）
  7. image_url：上传艺术品照片（设置后不可更改）
  8. thumbnail_url：艺术品缩略图照片（设置后不可更改）
  9. properties 藏品属性 map { key -> value }（设置后不可更改）

三，竞拍出价表 auction_table

  1. art_id 艺术品ID
  2. auction_round 第几轮拍卖（设置后不可更改）
  3. bid_user_id  出价人ID
  4. auction_status: 竞拍已结束(finished)，竞拍进行中(happening)
  5. start_time 拍卖开始时间（设置后不可更改）
  6. end_time 拍卖结束时间（设置后不可更改）
  7. start_bid_price 本轮起拍价（设置后不可更改）
  8. bid_cap_price 本轮价格硬顶（设置后不可更改）
  9. bid_price 出价价格
  10. bid_time 出价时间
  11. is_highest_bid 出价状态：被超过(false)，当前最高价(true)

四，交易历史表 trans_history

  1. art_id 艺术品ID
  2. auction_round 第几轮拍卖
  3. seller_id 卖出者
  4. highest_bid_user_id  出价人：0代表无人出价
  5. highest_bid_price 最高出价：0代表无人出价
  6. payment_deadline 支付截止时间
  7. payment_status 支付状态：pending，failed，success

# Backlog 功能需求表

1. Presentation of an artwork（IPFS）
  - Option to modify the properties?
  - 启用 IPFS

2. Cancel a bid
  - 是否考虑让用户提前充钱进来?
  - 退款逻辑（及手续费）

3. Transfer my NFT to a friend
  - 不通过我们平台的transfer，那我们的数据库如何记录？
  - 以bsc为准还是以mysql为准

4. 如果多人出价=硬顶价竞拍到，藏品的归属权逻辑？
  - 按出价的先后顺序
  - 随机分配？
  - 在区块链支付时抢（浪费gas fee）

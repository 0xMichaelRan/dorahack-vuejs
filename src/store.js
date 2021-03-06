import common from './common'
import vuex from 'vuex'
import Vue from 'vue'

let loginData = {}
loginData[common.STORAGE_TOKEN] = ''
loginData[common.STORAGE_NAME] = ''

let getToken = () => {
    let token = loginData[common.STORAGE_TOKEN]
    if (token) {
        return token
    }
    loginData[common.STORAGE_TOKEN] = read(common.STORAGE_TOKEN)
    if (loginData[common.STORAGE_TOKEN]) {
        return loginData[common.STORAGE_TOKEN]
    }
}

let setToken = (token) => {
    loginData[common.STORAGE_TOKEN] = token
    save(common.STORAGE_TOKEN, token)
}

let getEncrypt = () => {
    let encrypt = loginData[common.STORAGE_TOKEN_ENCRYPT]
    if (encrypt) {
        return encrypt
    }
    loginData[common.STORAGE_TOKEN_ENCRYPT] = read(common.STORAGE_TOKEN_ENCRYPT)
    if (loginData[common.STORAGE_TOKEN_ENCRYPT]) {
        return loginData[common.STORAGE_TOKEN_ENCRYPT]
    }
}

let setEncrypt = (encrypt) => {
    loginData[common.STORAGE_TOKEN_ENCRYPT] = encrypt
    save(common.STORAGE_TOKEN_ENCRYPT, encrypt)
}


let getName = () => {
    let name = loginData[common.STORAGE_NAME]
    if (name) {
        return name
    }
    loginData[common.STORAGE_NAME] = read(common.STORAGE_NAME)
    if (loginData[common.STORAGE_NAME]) {
        return loginData[common.STORAGE_NAME]
    }
}

/**
 * 保存数据，目前以localStorage方式保存
 * @param {Object} key
 * @param {Object} value
 */
function save(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

/**
 * 读取数据，目前以localStorage的方式读取
 * @param {Object} key
 */
function read(key) {
    return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : ''
}
/**
 * 格式化日期
 * @param val 时间戳 接受单位为毫秒
 * @param type 1：完整显示，2：不显示年,3:不显示分秒
 */
let formatDate = function(val, type) {
    type = type || 1
    let result = ''
    let timestamp = val
    let d = new Date()
    d.setTime(timestamp)
    let year = d.getFullYear()
    let month = pad(d.getMonth() + 1)
    let day = pad(d.getDate())
    let housrs = pad(d.getHours())
    let minutes = pad(d.getMinutes())
    let seconds = pad(d.getSeconds())
    switch (type) {
        case 1:
            result = year + '-' + month + '-' + day + ' ' + housrs + ':' + minutes + ':' + seconds
            break
        case 2:
            result = month + '-' + day + ' ' + housrs + ':' + minutes
            break
        case 3:
            result = year + '-' + month + '-' + day
            break
        case 4:
            result = minutes + ':' + seconds
            break
        case 5:
            result = year + '-' + month + '-' + day + ' ' + housrs + ':' + minutes
            break
        default:
            result = year + '-' + month + '-' + day + ' ' + housrs + ':' + minutes + ':' + seconds
            break
    }
    return result
}

/**
 * 补零
 * @param num
 * @returns {string}
 */
let pad = function(num) {
    return new Array(2 - ('' + num).length + 1).join(0) + num
}
Vue.use(vuex)
let store = new vuex.Store({
    state: {
        accountId: '',
        record: '',
        merchantId: '',
        shop: '',
        shopList: '',
        cardList: '',
        tixian: '',
        account: '',
        selectedCard: '',
        shopType: '',
        enterpriseId: '',
        ebayInfo: '',
        authStatus: '',
        userInfo: '',
        shopEbayID: '',
        TXsource: '',
        PaypalAddTab: '',
    },
    mutations: {
        setAuthStatus(state, authStatus) {
            state.authStatus = authStatus
        },
        setAccountId(state, accountId) {
            state.accountId = accountId
        },
        setRecord(state, record) {
            state.record = record
            localStorage.setItem('record', JSON.stringify(record))
        },
        setMerchantId(state, merchantId) {
            state.merchantId = merchantId
        },
        setShop(state, shop) {
            state.shop = shop
            localStorage.setItem('shop', JSON.stringify(shop))
        },
        setShopList(state, shopList) {
            state.shopList = shopList
            localStorage.setItem('shopList', JSON.stringify(shopList))
        },
        setCardList(state, cardList) {
            state.cardList = cardList
            localStorage.setItem('cardList', JSON.stringify(cardList))
        },
        setTixian(state, tixian) {
            state.tixian = tixian
            localStorage.setItem('tixian', JSON.stringify(tixian))
        },
        setAccount(state, account) {
            state.account = account
            localStorage.setItem('account', JSON.stringify(account))
        },
        setSelectedCard(state, selectedCard) {
            state.selectedCard = selectedCard
            localStorage.setItem('selectedCard', JSON.stringify(selectedCard))
        },
        setShopType(state, shopType) {
            state.shopType = shopType
            localStorage.setItem('shopType', JSON.stringify(shopType))
        },
        setEnterpriseId(state, enterpriseId) {
            state.enterpriseId = enterpriseId
            localStorage.setItem('enterpriseId', JSON.stringify(enterpriseId))
        },
        setEbayInfo(state, ebayInfo) {
            state.ebayInfo = ebayInfo
            localStorage.setItem('ebayInfo', JSON.stringify(ebayInfo))
        },
        setFinRecordId(state, finRecordId) {
            state.finRecordId = finRecordId
            localStorage.setItem('finRecordId', JSON.stringify(finRecordId))
        },
        setPaypalAccNo(state, paypalAccNo) {
            state.paypalAccNo = paypalAccNo
            localStorage.setItem('paypalAccNo', JSON.stringify(paypalAccNo))
        },
        setUserInfo(state, userInfo) {
            state.userInfo = userInfo
            localStorage.setItem('userInfo', JSON.stringify(userInfo))
        },
        setTXsource(state, TXsource) {
            state.TXsource = TXsource
            localStorage.setItem('TXsource', JSON.stringify(TXsource))
        },
        setPaypalAddTab(state, PaypalAddTab) {
            state.PaypalAddTab = PaypalAddTab
            localStorage.setItem('PaypalAddTab', JSON.stringify(PaypalAddTab))
        },
        setShopEbayID(state, shopEbayID) {
            state.shopEbayID = shopEbayID
        },
    }
})
let commit = (method, param) => {
    store.commit(method, param)
}
let getState = (name) => {
    let value = localStorage.getItem(name)
    return store.state[name] || (value ? JSON.parse(value) : null)
}

export default {
    getToken,
    setToken,
    getEncrypt,
    setEncrypt,
    read,
    save,
    formatDate,
    getName,
    store,
    commit,
    getState,
}
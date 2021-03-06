let ENVIRONMENT = 'SANDBOX' // `ONLINE` SANDBOX TEST
/**
 *
 * @type {{API_HOST: string, STORAGE_NAME: string, TEST_FLAG: boolean, STORAGE_TOKEN: string, ERROR_MSG_COMMON: string, ENVIRONMENT: string, TOKEN_NAME: string, STORAGE_TOKEN_ENCRYPT: string, API_PATH: string}}
 */
let obj = {
    ENVIRONMENT: ENVIRONMENT,
    /** 服务器相关 */
    API_HOST: 'http://192.168.31.205:9001/',
    // API_HOST: 'http://13.250.35.194/service-adam',

    // API_HOST: ENVIRONMENT == 'ONLINE' ? 'https://kuajing.camelfin.com/tradeloanweb/' :
    //     (ENVIRONMENT == 'SANDBOX' ? 'http://172.24.20.31/tradeloanweb/' : 'http://192.168.47.8:7003/tradeloanweb'), // 刘辉

    API_PATH: 'or',

    // HTTP_SUCCESS: '000000',
    // CODE_ID: '1274518339', // 统计代码ID
    // IMG_HOST: '',
    /** 是否测试模式 */
    TEST_FLAG: false,
    /** 存储相关 */
    STORAGE_TOKEN: ENVIRONMENT == 'ONLINE' ? 'elsid' :
        (ENVIRONMENT == 'SANDBOX' ? 'elsid' : 'elsid'),
    STORAGE_NAME: 'name',
    TOKEN_NAME: 'elsid',
    STORAGE_TOKEN_ENCRYPT: 'dttokenencrypt',
    /** 错误提示 */
    ERROR_MSG_COMMON: '系统异常',
    /**用户不操作时间**/
    logoutTime: 300,
    /** 左侧菜单栏 */
    leftMenuMap: [
        {
            title: 'Activate My Account',
            path: 'activeAccount',
            map:[],
            key: ['096D7A14']
        },
        {
            title: 'Dashboard',
            path: 'dashboard',
            map:[],
            key: 1,
        },
        {
            title: 'Wallets',
            path: 'wallet',
            key: 0,
            show: false,
            map:[
                {
                    title: 'Balances',
                    path: 'balances',
                    map: [],
                    key: ['4F15121D']
                },
                {
                    title: 'Wallets',
                    path: 'wallet',
                    map: [],
                    key: ['6FA22359','3E669FC2']
                },
                {
                    title: 'Transactions',
                    path: 'transactions',
                    map: [],
                    key: ['773E1BDB']
                },
            ]
        },
        {
            title: 'Payouts',
            path: 'payOut',
            key: 0,
            show: false,
            map:[
                {
                    title: 'Payouts',
                    path: 'payOut',
                    map: [],
                    key: ['7D53AE2D'],
                },
                {
                    title: 'Beneficiaries',
                    path: 'beneficiaries',
                    map: [],
                    key: ['A06B0297','803598E3']
                },
                {
                    title: 'Senders',
                    path: 'senders',
                    map: [],
                    key: ['A1059625','A040E8E8']
                }
            ]
        },
        {
            title: 'FX Conversion',
            path: 'fxConversion',
            map:[],
            key: ['AEE5E22D']
        },
        {
            title: 'Administration',
            path: 'adam',
            key: 0,
            show: false,
            map:[
                {
                    title: 'User Administration',
                    path: 'adam',
                    map: [],
                    key: ['B235B1CC']
                },
                {
                    title: 'Wallet Access Administration',
                    path: 'adamAccess',
                    map: [],
                    key: ['BDCB8E7F']
                },
                {
                    title: 'My Profile',
                    path: 'adamProfile',
                    map: [],
                    key: ['FE3FC5E2']
                },
            ],
        },
    ]
}

export default obj
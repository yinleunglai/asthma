require('./utils/service');

const Promise = require('./libs/bluebird');
const {apiRoot, appId} = require('./utils/api');

const imageRoot = 'http://deac.medclass.cn';

const user = {
    username: 'louisGan',
    name: '小王',
    sex: '女',
    email: '123456789@qq.com',
    phone: '13893221214',
    address: '朝阳门',
    certificate_category: '护照',
    certificate_code: '023203842374923472389',
    province: '北京',
    city: '北京',
    department_first: '内科',
    department_second: '血液科',
    title: '职称',
    unit: '北京中日医院',
    addr: '这是我的通信地址',
    code: '730000',
    doctor_certificate_code: '19239127391287312873'
};

App({
    onLaunch() {
        const that = this;
        Promise.all([wx.pro.login(), wx.pro.getUserInfo()]).then((results) => {
            const {code} = results[0];
            const {encryptedData, iv} = results[1];
            return wx.pro.request({url: `${apiRoot}/weixin?code=${code}&encryptedData=${encodeURIComponent(encryptedData)}&iv=${encodeURIComponent(iv)}`})
        }).then((data) => {
            console.log(data);
        }).catch((err) => {
            console.log(err);
        });
        wx.pro.setStorage('user', user).then((user) => {
            console.log('success:');
        }).catch((err) => {
            console.log(err);
        });
        wx.pro.getSystemInfo().then((res) => {
            that.globalData.systemInfo = res;
        }).catch((err) => {
            console.log(err);
        });
    },
    globalData: {
        userInfo: null,
        imageRoot,
        systemInfo: null
    }
})

function getSecretInfo(session_key, encryptedData, iv) {
    const pc = new WXBizDataCrypt(appId, session_key)
    const data = pc.decryptData(encryptedData, iv)
    return data;
}

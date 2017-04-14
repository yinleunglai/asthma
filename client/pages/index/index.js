const app = getApp();
const {
    apiRoot,
    banner,
    qulityVideo,
    recommendedCourse
} = require('../../utils/api');

Page({
    data: {
        // imageRoot: 'https://101.200.228.228:9999',
        imageRoot: app.globalData.imageRoot,
        apiRoot,
        indicatorDots: false,
        autoplay: true,
        interval: 3000,
        duration: 1000,
        circular: true,
        winWidth: 0,
        winHeight: 0,
        pixelRatio:2,
        banners: [],
        qulityVideos: [],
        recommendedCourses: []
    },
    onLoad() {
        var that = this
        wx.pro.request({
            url: banner,
        }).then((data) => {
            that.setData({
                banners: data.banners
            });
        }).catch((err) => {
            console.log(err);
        });
        wx.pro.request({
            url: qulityVideo,
        }).then((data) => {
            that.setData({
                qulityVideos: data.videos
            });
        }).catch((err) => {
            console.log(err);
        });
        wx.pro.request({
            url: recommendedCourse,
        }).then((data) => {
            that.setData({
                recommendedCourses: data.recommendedCourses
            });
        }).catch((err) => {
            console.log(err);
        });
        wx.pro.getSystemInfo()
            .then((res) => {
                console.log(res);
                that.setData({
                    winWidth: res.windowWidth,
                    winHeight: res.windowHeight,
                    pixelRatio: res.pixelRatio
                });
            }).catch((err) => {
                console.log(err);
            });
    },
    gotoCollege() {
        wx.switchTab({
            url: "../college/index"
        })
    }
})

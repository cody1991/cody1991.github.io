var lib = {
    urlParams: function(url) {
        var urlParamsList = {};
        var params = url.search.replace(/^\?/, "").split('&'); //分开成各个不同的对像，去掉'&'
        for (var i = 0; i < params.length; i++) {
            var param = params[i];
            var temp = param.split("=");
            urlParamsList[temp[0]] = decodeURI(temp[1]);
        }
        return urlParamsList;
    },
    getPlatform: function() {
        var browser = {
            versions: function() {
                var u = navigator.userAgent,
                    app = navigator.appVersion;
                return {
                    trident: u.indexOf('Trident') > -1, //IE内核
                    presto: u.indexOf('Presto') > -1, //opera内核
                    webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                    gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
                    mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
                    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                    android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
                    iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
                    iPad: u.indexOf('iPad') > -1, //是否iPad
                    webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
                };
            }(),
            language: (navigator.browserLanguage || navigator.language).toLowerCase()
        };
        if (browser.versions.android) {
            return 'android'
        }
        if (browser.versions.ios || browser.versions.iPhone || browser.versions.iPad) {
            return 'ios';
        }
    },
    isWeiXin: function() {
        var ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
            return true;
        }
        return false;
    },
    isQQ: function() {
        var ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/qq/i) == 'qq') {
            return true;
        }
        return false;
    },
    isWeibo: function() {
        var ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/weibo/i) == 'weibo') {
            return true;
        }
        return false;
    },
    inApp: true
};

if (!lib.urlParams(window.location)['source']) {
    console.log('在APP内');
    lib.inApp = true;
} else {
    console.log('不在APP内');
    lib.inApp = false;

}
window.onload = function() {

    var attachFastClick = Origami.fastclick;
    attachFastClick(document.body);

    var windowLocation = window.location,
        selfUserID = lib.urlParams(windowLocation)['userID'],
        selfSessionID = lib.urlParams(windowLocation)['sessionID'], //过期认证
        selfSessionToken = lib.urlParams(windowLocation)['sessionToken'],
        selfPeerID = lib.urlParams(windowLocation)['peerID'];

    var app = new Vue({
        el: '#app',
        data: {
            anchorInfo: [],
            livingInfo: [],
            // getAnchorInfoUrl: "http://test.a.impingo.me/activity/getAnchorInfo",
            // getLiveStatusUrl: "http://test.a.impingo.me/activity/getLiveStatus",
            // queryVoteStatusUrl: "http://test.a.impingo.me/activity/queryVoteStatus",
            // singerVoteUrl: "http://test.a.impingo.me/activity/singerVote",
            getAnchorInfoUrl: "http://a.impingo.me/activity/getAnchorInfo",
            getLiveStatusUrl: "http://a.impingo.me/activity/getLiveStatus",
            queryVoteStatusUrl: "http://a.impingo.me/activity/queryVoteStatus",
            singerVoteUrl: "http://a.impingo.me/activity/singerVote",
            setIntervalGetLiveStatus: null,
            setIntervalGetAnchorInfo: null,
            intervalDuration: 60 * 1000,
            anchorUserID: '',
            todayHadVote: false
        },
        ready: function() {
            this.getAnchorInfo();
            this.getLiveStatus();
            this.queryVoteStatus();
            this.initSetTimeout();
        },
        filters: {
            getUserImg: function(val) {
                return 'http://a.impingo.me/static/activity/singer/resource/' + val + '.jpg'
            },
            getLiving: function(val, anchor) {
                var curUserID = anchor.userID,
                    isLiving = false;
                this.livingInfo.forEach(function(living) {
                    if (living.createUserID === curUserID) {
                        if (living.state == "1") {
                            isLiving = true;
                        }
                        return;
                    }
                });
                return isLiving;
            },
            getVoteStatus: function(val, anchor) {
                if (anchor.userID == this.anchorUserID) {
                    // 可支持
                    return true;
                } else {
                    // 不可支持
                    return false;
                }
            }
        },
        methods: {
            // supportCntFn: function(a, b) {
            //     return (parseInt(b.supportCnt, 10) - parseInt(a.supportCnt, 10) >= 0);
            // },
            initSetTimeout: function() {
                var that = this;
                setIntervalGetAnchorInfo = setInterval(function() {
                    that.getAnchorInfo();
                }, that.intervalDuration);
                setIntervalGetLiveStatus = setInterval(function() {
                    that.getLiveStatus();
                }, that.intervalDuration);
            },
            jumpLive: function(anchor) {
                var curUserID = anchor.userID,
                    curRoomID,
                    isLiving = false;
                this.livingInfo.forEach(function(living) {
                    if (living.createUserID === curUserID) {
                        if (living.state == "1") {
                            isLiving = true;
                            curRoomID = living.roomID;
                        }
                        return;
                    }
                });

                console.log(lib.inApp);
                console.log(isLiving);

                if (lib.inApp && isLiving) {
                    console.log('跳转直播间');
                    if (window.pingo_js) {
                        window.pingo_js.jumpPage('live://' + curRoomID);
                    }
                    return;
                }

                if (!lib.inApp && isLiving) {
                    console.log('跳转H5视频直播地址');
                    console.log(curRoomID);
                    // window.location.href = 'http://test.api.impingo.me/miniSite/livePage?liveID=' + curRoomID; // H5直播地址
                    window.location.href = 'http://api.impingo.me/miniSite/livePage?liveID=' + curRoomID; // H5直播地址
                    return;
                }
            },
            jumpVideo: function(anchor) {
                var curUserID = anchor.userID,
                    curRoomID,
                    isLiving = false;
                this.livingInfo.forEach(function(living) {
                    if (living.createUserID === curUserID) {
                        if (living.state == "1") {
                            isLiving = true;
                            curRoomID = living.roomID;
                        }
                        return;
                    }
                });

                console.log(lib.inApp);
                console.log(isLiving);

                console.log('跳转视频地址');
                window.location.href = 'http://api.impingo.me/static/singer/preselection-live.html?userID=' + curUserID; // 视频地址
                return;


            },
            jumpProfile: function(userID) {
                console.log(userID);
                if (window.pingo_js) {
                    window.pingo_js.jumpPage('profile://' + userID);
                }
            },
            singerVote: function(anchor) {
                var getUserID = selfUserID,
                    getTargetUserID = anchor.userID;

                if (!lib.inApp) {
                    window.location.href = 'http://www.impingo.me/wx_appdown.html?source=singer';
                    return;
                }

                if (this.todayHadVote) {
                    console.info('每日仅支持一次！');
                    return;
                }

                this.$http.jsonp(this.singerVoteUrl + '?userID=' + getUserID + '&targetUserID=' + getTargetUserID + '&sessionID=' + selfSessionID + '&sessionToken=' + selfSessionToken + '&peerID=' + selfPeerID)
                    .then(function(res) {
                        var rtnData = res.data,
                            that = this;
                        if (rtnData.rtn == 0) {
                            // console.info(rtnData.msg);
                            Vue.set(anchor, 'showAdd', true);
                            anchor.supportCnt++;
                            this.anchorUserID = getTargetUserID;
                            this.todayHadVote = true;

                            clearInterval(setIntervalGetAnchorInfo);

                            // 点击投票，动画（2秒）以后，重新拉取直播状态以及直播信息
                            setTimeout(function() {
                                that.getAnchorInfo();
                                that.getLiveStatus();

                                setIntervalGetAnchorInfo = setInterval(function() {
                                    that.getAnchorInfo();
                                }, that.intervalDuration);
                            }, 2000);

                        } else if (rtnData.rtn == 2 || rtnData.rtn == 3) {
                            console.info(rtnData.msg);
                        }
                    })
                    .catch(function(res) {
                        console.info('网络失败');
                    });
            },
            queryVoteStatus: function() {
                if (lib.inApp) {
                    this.queryVoteStatusUrl += '?userID=' + selfUserID + '&sessionID=' + selfSessionID + '&sessionToken=' + selfSessionToken + '&peerID=' + selfPeerID;
                }

                this.$http.jsonp(this.queryVoteStatusUrl)
                    .then(function(res) {
                        var rtnData = res.data;
                        if (rtnData.rtn == 0) {
                            this.todayHadVote = false;
                            console.log(1);
                            // 未支持，可投票。
                        } else if (rtnData.rtn == 1) {
                            this.todayHadVote = true;
                            this.anchorUserID = rtnData.data.anchorUserID;
                        }
                    })
                    .catch(function(res) {
                        console.info('网络失败');
                    });
            },
            getLiveStatus: function() {
                if (lib.inApp) {
                    this.getLiveStatusUrl += '?userID=' + selfUserID + '&sessionID=' + selfSessionID + '&sessionToken=' + selfSessionToken + '&peerID=' + selfPeerID;
                }

                this.$http.jsonp(this.getLiveStatusUrl)
                    .then(function(res) {
                        var that = this;
                        var rtnData = res.data;
                        if (rtnData.rtn == 0) {
                            this.$set('livingInfo', rtnData.data);
                        }
                    })
                    .catch(function(res) {
                        console.info('网络失败');
                    });
            },
            getAnchorInfo: function() {
                if (lib.inApp) {
                    this.getAnchorInfoUrl += '?userID=' + selfUserID + '&sessionID=' + selfSessionID + '&sessionToken=' + selfSessionToken + '&peerID=' + selfPeerID;
                }
                this.$http.jsonp(this.getAnchorInfoUrl)
                    .then(function(res) {
                        var rtnData = res.data;
                        if (rtnData.rtn == 0) {
                            this.$set('anchorInfo', rtnData.data);
                        }
                    })
                    .catch(function(res) {
                        console.info('网络失败');
                    });
            }
        }
    })
}

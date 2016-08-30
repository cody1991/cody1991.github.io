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
    }
};

window.onload = function() {

    var attachFastClick = Origami.fastclick;
    attachFastClick(document.body);

    var windowLocation = window.location,
        selfUserID = lib.urlParams(windowLocation)['userID'];

    var app = new Vue({
        el: '#app',
        data: {
            anchorInfo: [],
            livingInfo: [],
            getAnchorInfoUrl: "http://a.impingo.me/activity/getAnchorInfo",
            getLiveStatusUrl: "http://a.impingo.me/activity/getLiveStatus",
        },
        ready: function() {
            this.getAnchorInfo();
            this.getLiveStatus();
        },
        methods: {
            getAnchorInfo: function() {
                this.$http.jsonp(this.getAnchorInfoUrl)
                    .then(function(res) {
                        console.log(res);
                        var rtnData = res.data;
                        if (rtnData.rtn == 0) {
                            this.$set('anchorInfo', rtnData.data);
                        }
                    })
                    .catch(function(res) {
                        console.info('网络失败');
                    });
            },
            getLiveStatus: function() {
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
                    }
                });
                return isLiving;
            },
        },
    })
}

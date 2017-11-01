/**
 * Created by XYC on 2017/10/13.
 */
/*
 * Summer JavaScript Library
 * Copyright (c) 2016 yonyou.com
 * Author: gct@yonyou.com
 * Version: 0.3.0.20171011.1101
 */


(function(w){
    w.UM = w.UM ? w.UM : {};
    var UM = w.UM || {};
    function Win() {
        if (sessionStorage.hasAjax) {
            sessionStorage.clear();
        }
        // 获取缓存hash路径
        var hashArr = sessionStorage.hashArr;
        this.hashArr = hashArr && JSON.parse(hashArr) || [];

        // settings为动态的,defaults静态变量
        this.settings = $.extend({}, this.defaults);

        // 动画animation事件监听
        this.endCurrent = false;
        this.endNext = false;
        this.animEndEventName = "webkitAnimationEnd";
        this.outClass = "";
        this.inClass = "";

        this._init();
    }
    Win.prototype = {
        constructor: Win,
        defaults: {
            target: null,
            isReverse: 0,
            transition: "um"
        },
        _init: function() {
            var settings = this.settings;
            //1、先去掉active
            var indexPage = $(".um-win.active").length;
            if(indexPage) {
                indexPage = $(".um-win.active").eq(0).index();
                $(".um-win.active").removeClass("active");
            }

            //2、data缓存原class
            $.each($(".um-win"), function() {
                var $this = $(this);
                $this.data("originalClassList", $this.attr("class"));
            });

            //3、重新设置active
            var act = $(sessionStorage.initActivePageId);
            if (act.length && act.hasClass("um-win")) {
                act.addClass("active");
            } else {
                $(".um-win").eq(indexPage).addClass("active");
            }
        },
        // 更新当前页指向
        _updateCurrent: function() {
            this.currPage = $(".um-win.active").eq(0);
            this.currId = this.currPage.attr("id");
        },
        // 改变页面
        changePage: function(options) {
            //1、获取setting
            //var options;
            if(typeof options === "string") {//#xxx形式
                options = {
                    target: options
                }
            }
            this.settings = $.extend(this.settings, options);

            //2、
            this._updateCurrent();
            if (this._checkSettings()) {
                this._pageAnimate();

                this.hashArr.push(this.currId);
                this._cacheActivePageId(this.settings.target.slice(1));
                if (this.hashArr.length) {
                    sessionStorage.hashArr = JSON.stringify(this.hashArr);
                }
            }
        },
        // 缓存可视页面id
        _cacheActivePageId: function(id) {
            sessionStorage.initActivePageId = "#" + id;
        },
        // um-back 返回
        back: function() {
            var len = this.hashArr.length,
                lastHash;
            if (len) {
                // 获取上条hash
                lastHash = this.hashArr[len - 1];

                this._updateCurrent();
                this.settings.target = "#" + lastHash;
                this.settings.isReverse = 1;
                this._pageAnimate();

                this._cacheActivePageId(lastHash);
                this.hashArr.pop();
                sessionStorage.hashArr = JSON.stringify(this.hashArr);

                this.settings.isReverse = 0; //全局变量，重置为默认值
            }
        },
        _checkSettings: function() {
            var settings = this.settings;

            //1、检查target
            var target = settings.target;
            var $target = $(target);
            if (!target || !$target || !$target.length || sessionStorage.initActivePageId === target) {
                return false; // 防止如首页链接到首页的错误导航
            }

            //2、检查当前page有无id
            if (!this.currId && this.currPage.hasClass("um-win")) {
                alert("请填写当前页page id,否则无法返回该页");
                return false;
            }
            return true;
        },
        _pageAnimate: function() {
            var settings = this.settings,
                _this = this,
                target = $(settings["target"]),
                currPage = this.currPage,
                animEndEventName = _this.animEndEventName,
                zi = target.index() < currPage.index();

            target.trigger("beforePageIn");//先新入
            currPage.trigger("beforePageOut");//后旧出

            // 设置较大的zindex,放置被覆盖
            if(zi && !settings.isReverse) {//目标小于当前，并且不反向
                target.addClass("um-win-forward");
            }
            if(!zi && settings.isReverse) {//目标大于当前，并且反向
                currPage.addClass("um-win-forward");
            }

            target.addClass("active");//目标页面设置为active
            // set in out Class
            _this._setTransitionClass(settings["transition"]);

            if (currPage.length) {
                currPage.addClass(_this.outClass).on(animEndEventName, function() {
                    currPage.off(animEndEventName);
                    _this.endCurrent = true;
                    if (_this.endNext) {
                        _this._resetPage(target, currPage);
                    }
                });
            }

            target.addClass(_this.inClass).on(animEndEventName, function() {
                target.off(animEndEventName);
                _this.endNext = true;
                if (_this.endCurrent) {
                    _this._resetPage(target, currPage);
                }
                setTimeout(function() {
                    target.trigger("afterPageIn");
                    currPage.trigger("afterPageOut");
                }, 300);
            });
        },

        _setTransitionClass: function(flag) {
            var isReverse = this.settings.isReverse;
            switch (flag) {
                case "um":
                    this.outClass = 'out um-left-out';
                    this.inClass = 'in um-right-in';
                    if (isReverse) {
                        this.outClass = 'out um-right-out';
                        this.inClass = 'in um-left-in';
                    }
                    break;
                case "f7":
                    this.outClass = 'um-center-to-left';
                    this.inClass = 'um-right-to-center';
                    if (isReverse) {
                        this.outClass = 'um-center-to-right';
                        this.inClass = 'um-left-to-center';
                    }
                    break;
                case "pop":
                    this.outClass = 'um-noeffect';
                    this.inClass = 'um-moveFromBottom';
                    if (isReverse) {
                        this.outClass = 'um-moveToBottom';
                        this.inClass = 'um-noeffect';
                    }
                    break;
                case "stretch":
                    this.outClass = 'um-left-out'; //um-scaleLeftOut
                    this.inClass = 'um-scaleRightIn';
                    if (isReverse) {
                        this.outClass = 'um-right-out'; //um-scaleRightOut
                        this.inClass = 'um-scaleLeftIn';
                    }
                    break;
                case "drop":
                    this.outClass = 'um-noeffect';
                    this.inClass = 'um-moveFromTop';
                    if (isReverse) {
                        this.outClass = 'um-moveToTop';
                        this.inClass = 'um-noeffect';
                    }
                    break;
                case "slideup":
                    this.outClass = 'um-moveToTop';
                    this.inClass = 'um-moveFromBottom';
                    if (isReverse) {
                        this.outClass = 'um-moveToBottom';
                        this.inClass = 'um-moveFromTop';
                    }
                    break;
                case "fade": // fade
                    this.outClass = 'um-fadeOut';
                    this.inClass = 'um-fadeIn';
                    break;
                case "slide_scale":
                    this.outClass = 'um-scaleDown';
                    this.inClass = 'um-moveFromRight';
                    if (isReverse) {
                        this.outClass = 'um-scaleDown';
                        this.inClass = 'um-moveFromLeft';
                    }
                    break;
                case "scale_down_up":
                    this.outClass = 'um-scaleDownUp';
                    this.inClass = 'um-scaleUp';
                    if (isReverse) {
                        this.outClass = 'um-scaleDown';
                        this.inClass = 'um-scaleUpDown';
                    }
                    break;
                case "drop":
                    this.outClass = 'um-noeffect';
                    this.inClass = 'um-moveFromTop';
                    if (isReverse) {
                        this.outClass = 'um-moveToTop';
                        this.inClass = 'um-noeffect';
                    }
                    break;
                case "rotate":
                    this.outClass = 'um-rotateOutNewspaper';
                    this.inClass = 'um-rotateInNewspaper';
                    break;
                case "push_left":
                    this.outClass = 'um-rotatePushLeft';
                    this.inClass = 'um-moveFromRight';
                    if (isReverse) {
                        this.outClass = 'um-rotatePushRight';
                        this.inClass = 'um-moveFromLeft';
                    }
                    break;
                case "push_top":
                    this.outClass = 'um-rotatePushTop';
                    this.inClass = 'um-rotatePullBottom';
                    if (isReverse) {
                        this.outClass = 'um-rotatePushBottom';
                        this.inClass = 'um-rotatePullTop';
                    }
                    break;
                default:
                    this.outClass = 'out um-left-out';
                    this.inClass = 'in um-right-in';
                    if (isReverse) {
                        this.outClass = 'out um-right-out';
                        this.inClass = 'in um-left-in';
                    }
                    break;
            }
        },
        _resetPage: function($target, $currpage) {
            var settings = this.settings;
            this.endCurrent = false;
            this.endNext = false;
            $currpage.attr('class', $currpage.data('originalClassList'));
            $target.attr('class', $target.data('originalClassList') + ' ' + "active");
        }
    }


    UM.win = new Win();
    //$(".um-win").eq(0).addClass("active")
})(window);

// 必须去除点击事件默认事件，否则会修改hash值，造成页面闪动
$(document).on("click", "a[href^=#]", function(e){
    e.preventDefault();
    // click必须去除点击事件默认行为，否则会修改hash值，造成页面闪动
    //}).on(eventType.up, "a[href^=#]", function(e) {
    // 如果是touchstart,touchend事件不能去除默认行为,否则无法绑定click以及mouse事件
    var $this = $(this),
        target = $this.attr("href"),
        isback = $this.hasClass("um-back"),
        dataTarget = $(this).data("target"),
        transition = $(this).data("transition") || UM.page.defaults.transition,
        link = $(this).data("url");
    isReverse = (isback || $this.data("reverse")) ? 1 : 0;
    try {
        if (isback) {
            UM.page.back();
        } else if (target.indexOf("##") >= 0) {
            return;
        } else if ($(target).length) {
            if ($this.parents(".um-sidebar").length) {
                $(".overlay").trigger(UM.UI.eventType.down);
            }
            UM.page.changePage({
                target: target,
                isReverse: isReverse,
                transition: transition
            });
        } else if (link) { // 只针对a标签
            var uid;
            $.get(link).done(function(html) {
                if (!html) return;
                var html = $(html);
                uid = html[0].id;
                if (!uid) {
                    uid = "page" + (new Date()).getTime();
                    html.attr("id", uid);
                }
                $("body").append(html);
                html.data("originalClassList", html.attr("class"));
                var target = "#" + uid;
                UModal.loading(null, 300, function() {
                    UM.page.changePage({
                        target: target
                    });
                })

                if ($this.data("cache") == false) {
                    $(target).on("afterPageOut", function() {
                        $(this).remove();
                    })
                } else {
                    $this.attr("href", "#" + uid);
                    link = null;
                }
                // 有页面请求就不缓存路径，避免出错
                sessionStorage.hasAjax = 1;
            }).fail(function() {
                console.log("链接错误...");
            });
        } else if(dataTarget=='share'){
            UM.share.open('#' + dataTarget);
        }
    } catch (e) {
        console.log(e);
    }
})


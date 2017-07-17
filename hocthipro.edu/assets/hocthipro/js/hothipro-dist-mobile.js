function EpiUser(e, t, n) {
    this.userId = e, this.displayName = t, this.network = n
}

function helloLogout(e) {
    $.removeCookie(EpiLib.userCookieName, {
        path: "/"
    }) && (EpiLib.user = null, hello(e).logout().then(function() {
        $("#social-login").show(), $("#social-profile > span").html(""), $("#social-profile").hide(), $("#site-header .fake-btn > a.profile").click(), "recommend" === EpiLib.pageType ? document.location = "/" : helloOn()
    }, function(e) {
        console("Signed out error: " + e.error.message)
    }))
}

function helloShowProfile(e) {
    $("#social-login").hide(), $("#social-profile").show(), $("#social-profile > span").html(e.displayName), $("#site-header .profile-zone .account > span").html(e.displayName), $("#site-header .profile-zone .recommend > a").attr("href", "/de-xuat.epi"), $("#site-header .profile-zone .logout > a").attr("href", 'javascript:helloLogout("' + e.network + '")')
}

function helloLogin(e) {
    $("#login-modal").trigger("reveal:close"), hello(e).login({
        scope: "email"
    })
}

function helloOn() {
    hello.on("auth.login", function(e) {
        hello(e.network).api("/me").then(function(t) {
            null == EpiLib.user && $.post("http://" + EpiLib.apiHost + "/nocache/externalregister.aspx", {
                socialId: e.network + "_" + t.id,
                email: t.email,
                firstName: t.first_name,
                lastName: t.last_name,
                displayName: t.name,
                avatar: t.thumbnail,
                gender: t.gender,
                birthday: t.birthday,
                language: null != t.language ? t.language : t.locale
            }, function(n) {
                var i = new EpiUser(n.userId, t.name, e.network);
                EpiLib.user = i, helloShowProfile(i), $.cookie(EpiLib.userCookieName, JSON.stringify(i), {
                    expires: 1,
                    path: "/"
                })
            })
        })
    })
}

function Page() {
        function e() {
            EpiLib.loadPlugin("shuffle", "/mobile/js/plugins/shuffle/jquery.shuffle.js", function() {
                $(".article-list").shuffle({
                    itemSelector: ".article-list > .item",
                    speed: 0
                })
            })
        }
        var t = this;
        this.initSearchBox = function() {
            var e;
            $(".search-zone").submit(function(t) {
                if (t.preventDefault(), e = $(this).find(".search-keyword").val(), "" !== e) {
                    e = e.replace(/ /g, "-");
                    var n = "/tim-kiem/" + encodeURIComponent(e.toLowerCase()) + ".epi";
                    window.location = n
                } else alert("Bạn phải gõ từ khóa tìm kiếm !");
                return !1
            }), "search" === EpiLib.pageType && (e = document.title.replace(" - BAOMOI.COM", ""), $(".search-zone .search-keyword").val(e))
        }, this.initUI = function() {
            if ("/" === window.location.pathname && $(".navigation ul > li.hot").addClass("active"), 0 === window.location.pathname.indexOf("/tin-moi")) $(".navigation ul > li.news").addClass("active");
            else if (0 === window.location.pathname.indexOf("/tin-anh")) $(".navigation ul > li.photo").addClass("active");
            else if (0 === window.location.pathname.indexOf("/su-kien")) $(".navigation ul > li.topics").addClass("active");
            else if (0 === window.location.pathname.indexOf("/tin-video")) $(".navigation ul > li.video").addClass("active");
            else if ("undefined" != typeof window.cate_id) {
                var e = $(".navigation a[data-id=" + window.cate_id + "]");
                e && $(e).parents("li").addClass("active")
            }
            $(".nav-hamburger").append($("<ul>").append($(".navigation ul").html())), $(".nav-hamburger li.active li.active").closest(".parent.active").removeClass("active"), $(".nav-hamburger li.parent > .more").click(function() {
                $(this).parent().toggleClass("expand")
            }), $("#site-footer .navigation ul").length > 0 && $("#site-header .navigation ul>li.parent:not(.hamburger) > a").each(function() {
                $("#site-footer .navigation ul").append("<li class='parent'><a href='" + this.href + "'>" + this.text + "</a></li>")
            }), $(".fake-btn > a").click(function(e) {
                var t = "";
                $(this).hasClass("search") && (t = "search"), $(this).hasClass("profile") && (t = "profile"), $(this).hasClass("category") && (t = "category"), "" !== t && (e.preventDefault(), $(".fake-btn > a:not(." + t + ")").removeClass("active"), $(".hdr-content ." + t + "-zone").toggleClass("active"), "category" !== t && $(".hdr-content :not(." + t + "-zone)").removeClass("active"), $(this).toggleClass("active"))
            }), $("a.go-desktop").click(function() {
                var e = $(this).attr("data-target-host");
                window.location.replace(e + window.location.pathname + "#bm_web")
            }), EpiLib.loadPlugin("reveal", "/mobile/js/plugins/jquery.reveal/jquery.reveal.js?v=0.22", function() {
                EpiLib.loadStyle("reveal", "/mobile/js/plugins/jquery.reveal/reveal.css?v=0.22")
            })
        }, this.initEvents = function() {
            $("article a.like").each(function() {
                var e = $(this).closest("article").attr("data-aid");
                if ($.cookie("liked_" + e)) {
                    $(this).addClass("liked");
                    var t = $(this).find("span"),
                        n = parseInt(t.text());
                    t.text(isNaN(n) ? "Đã bình chọn" : n + 1)
                }
            }), $(document).on("click touch", "article a.like", function(e) {
                e.preventDefault();
                var t = this;
                if ($(t).hasClass("liked")) return !1;
                var n = EpiLib.getUserId();
                if (null == n) $("#social-login").click();
                else {
                    var i = $(t).closest("article").attr("data-aid");
                    if (i) {
                        var a = $.cookie("liked_" + i);
                        a ? alert("Bạn đã bình chọn nội dung này rồi!") : $.post("http://" + EpiLib.logHost + "/like.aspx", {
                            id: i,
                            userid: n
                        }).done(function() {
                            $.cookie("liked_" + i, 1, {
                                expires: 1,
                                path: "/"
                            });
                            var e = $(t).find("span"),
                                n = parseInt(e.text());
                            e.text(isNaN(n) ? "Đã bình chọn" : n + 1)
                        }).always(function() {
                            $(t).addClass("liked")
                        })
                    }
                }
                return !1
            })
        }, this.setupNextPage = function() {
            var e = 1,
                t = 5,
                n = !1,
                i = $("#main_PagingList1_pager .next"),
                a = i.attr("href"),
                r = $("#loading");
            $(window).bind("scroll", function() {
                if ($(window).scrollTop() >= $(document).height() - $(window).height() - 300) {
                    if (n !== !1) return;
                    if (e < t) {
                        i.hide(), r.show(), n = !0, e++;
                        var o = parseInt(a.match(/trang(\d+)/gim)[0].replace("trang", "")) + 1;
                        a = a.replace(/trang(\d+)/gim, "trang" + o), $.get(a + "?more=1", function(e) {
                            if ($(e).length > 0) {
                                var t = $("<div>").html(e);
                                Page.formatingArticles(t), Page.initDeferredImages(t), Page.replaceRedirectLinkInDesktop(t);
                                var o = t.find("article");
                                $(".article-list").append(o), $(".article-list").shuffle("appended", o), i.attr("href", a)
                            } else i.attr("href", "");
                            n = !1, r.hide()
                        })
                    } else i.show()
                }
            })
        }, this.initArticle = function() {
            var e = 0,
                t = 0,
                n = "";
            "undefined" != typeof window.article_id && (e = window.article_id), "undefined" != typeof window.cate_id && (t = window.cate_id), "undefined" != typeof window.cate_path && (n = window.cate_path);
            var i = 6,
                a = $("<div>"),
                r = "content.aspx?method=hotnews&size=" + (i + 1).toString() + "&catid=" + t + "&imgsize=m150",
                o = $("#hotnews-box");
            Page.renderArticles(r, a, function() {
                var t = $(a).find("article[data-aid=" + e + "]");
                t.length > 0 ? t.remove() : $(a).find("article").last().remove();
                var n = $(a).find("article"),
                    i = 0;
                $.each(o.find("article.pr"), function(e, t) {
                    $(t).before(n[i]), $(t).before(n[i + 1]), i += 2
                });
                for (var r = i; r < n.length; r++) o.append(n[r])
            }), i = 8;
            var s = $("<div>");
            r = "content.aspx?method=mostrecent&size=" + (i + 1).toString() + "&catid=" + t + "&imgsize=m150";
            var l = $("#mostrecent-box");
            if (Page.renderArticles(r, s, function() {
                    var t = $(s).find("article[data-aid=" + e + "]");
                    t.length > 0 ? t.remove() : $(s).find("article").last().remove();
                    var n = $(s).find("article"),
                        i = 0;
                    $.each(l.find("article.pr"), function(e, t) {
                        $(t).before(n[i]), $(t).before(n[i + 1]), i += 2
                    });
                    for (var a = i; a < n.length; a++) l.append(n[a])
                }), $("#related-box")) {
                var c = $("#related-box");
                if (0 === c.find("article").length) {
                    var d = $("#main_hlRelatedTitle");
                    d.text("Tin khác"), d.attr("href", "/tin-nong.epi"), r = "content.aspx?method=hotnews&size=3&imgsize=m150", Page.renderArticles(r, c, function() {
                        var t = c.find("article[data-aid=" + e + "]");
                        t.length > 0 ? t.remove() : c.find("article").last().remove()
                    })
                }
            }
            var u = EpiLib.getUserId();
            if (null == u && (u = $.cookie("oa2UserId")), null != u) Page.loadRecommendBox(u, e, 5);
            else {
                var p = $.cookie("zoanid");
                void 0 != p && "" !== p && $.post("http://data.baomoi.com/nocache/externalregister.aspx", {
                    socialId: "oa_" + p
                }, function(t) {
                    t.userId && (u = t.userId), null != u && ($.cookie("oa2UserId", u, {
                        expires: 7,
                        path: "/"
                    }), Page.loadRecommendBox(u, e, 5))
                })
            }
            if (EpiLib.loadPlugin("photoswipe", "/mobile/js/plugins/photoswipe/photoswipe.min.js?v=0.01", function() {
                    EpiLib.loadPlugin("photoswipe-skin", "/mobile/js/plugins/photoswipe/photoswipe-ui-default.min.js"), EpiLib.loadStyle("photoswipe", "/mobile/js/plugins/photoswipe/photoswipe.css?v=0.01"), EpiLib.loadStyle("photoswipe-skin", "/mobile/js/plugins/photoswipe/default-skin/default-skin.css"), $(".article-body .body img").wrap(function(e) {
                        var t = $(this).attr("src");
                        return t = t.replace("/m300x/", "/m1024/"), t = t.replace("/m420x/", "/m1024/"), t = t.replace("/m600x/", "/m1024/"), "<a class='photo' href='" + t + "' data-index='" + e + "' />"
                    }), $(".article-body .body").each(function() {
                        var e = $(this),
                            t = function() {
                                var t = [];
                                return e.find("a.photo").each(function() {
                                    var e = {
                                        src: $(this).attr("href"),
                                        w: 0,
                                        h: 0
                                    };
                                    t.push(e)
                                }), t
                            },
                            n = t(),
                            i = $(".pswp")[0];
                        e.on("click", "a.photo", function(e) {
                            e.preventDefault();
                            var t = $(this).data("index"),
                                a = {
                                    index: t,
                                    showAnimationDuration: 0,
                                    hideAnimationDuration: 0,
                                    tapToClose: !0,
                                    shareEl: !1,
                                    captionEl: !1
                                },
                                r = new PhotoSwipe(i, PhotoSwipeUI_Default, n, a);
                            r.init()
                        })
                    })
                }), $(".body p.body-video video").length > 0 || $(".body p.body-video-youtube iframe").length > 0) {
                $(".body p.body-video video").each(function() {
                    if ($(this).attr("controls") || $(this).prop("controls", !0), $(this).attr("width") || $(this).attr("width", "100%"), !$(this).attr("poster")) {
                        var e = /za.zdn.vn\/.*?\/.*?\/(.*?)\.mp4/im,
                            t = e.exec($(this).find("source").attr("data-src"));
                        null != t && $(this).attr("poster", "http://" + (window.article_id % 2 + 1) + ".i.baomoi.xdn.vn/poster/" + t[1] + ".jpg")
                    }
                });
                var f, h, m, g, v, y, b, w, x = document.querySelectorAll(".body p.body-video video");
                for (f = 0; f < x.length; f++) {
                    var k = x[f],
                        S = k.getAttribute("poster");
                    h = k.getElementsByTagName("source")[0].getAttribute("data-src"), v = null != k.getAttribute("auto_play"), m = k.getAttribute("data-width"), g = k.getAttribute("data-height"), g = m > 0 && g > 0 ? k.clientWidth * g / m : k.clientHeight, m = k.clientWidth, null != S && "undefined" !== S || (S = ""), y = h + "|mobile-video|" + S + "|" + +v + "|" + document.title + "|" + m + "|" + g + "|" + n + "|" + e, b = "http://s.baomoi.xdn.vn/zplayer/index_17041700.html#" + encodeURI(y), w = '<iframe width="' + m + '" height="' + g + '" frameborder=0 allowfullscreen scrolling="no" src="' + b + '"></ifarme>', k.outerHTML = w
                }
                var L = document.querySelectorAll(".body-video-youtube iframe");
                for (f = 0; f < L.length; f++) {
                    h = L[f].getAttribute("data-src");
                    var _ = L[f];
                    _.innerHTML = "", m = _.clientWidth, g = _.clientHeight, v = null != _.getAttribute("auto_play"), y = h + "|mobile-youtube||" + +v + "|" + document.title + "|" + m + "|" + g + "|" + n + "|" + e, b = "http://s.baomoi.xdn.vn/zplayer/index_17041700.html#" + encodeURI(y), w = '<iframe width="' + m + '" height="' + g + '" frameborder=0 allowfullscreen scrolling="no" src="' + b + '"></ifarme>', _.outerHTML = w
                }
            }
            var T = EpiLib.getMetaContent("og:title"),
                C = EpiLib.getMetaContent("og:description"),
                E = (EpiLib.getMetaContent("og:image:url"), EpiLib.getMetaContent("og:url"));
            $(document).on("click touch", ".rrssb-buttons a", {}, function() {
                var e = $(this).attr("data-href"),
                    t = $($(this).parent()).attr("class").replace("rrssb-", "");
                switch (ga && ga("send", {
                    hitType: "event",
                    eventCategory: "mobile-social-" + t,
                    eventAction: "share",
                    eventLabel: EpiLib.getMetaContent("og:title")
                }), t) {
                    case "facebook":
                        if ("undefined" !== window.FB) {
                            var n = window.FB;
                            n.init({
                                appId: "128990640458592",
                                status: !0,
                                xfbml: !0,
                                version: "v2.7"
                            }), n.ui({
                                method: "share",
                                title: T,
                                description: C,
                                href: E + "?utm_source=mobile&utm_medium=facebook&utm_campaign=share"
                            }, function(e) {
                                var t = document.createElement("img");
                                e && !e.error_code ? (t.src = "http://log.baomoi.com/log.aspx?key=mobile_facebook_share:success&value=" + window.article_id + "&rand=" + Math.random(), ga && ga("send", {
                                    hitType: "event",
                                    eventCategory: "mobile_facebook_share",
                                    eventAction: "success",
                                    eventLabel: EpiLib.getMetaContent("og:title")
                                })) : (ga && ga("send", {
                                    hitType: "event",
                                    eventCategory: "mobile_facebook_share",
                                    eventAction: "error",
                                    eventLabel: EpiLib.getMetaContent("og:title")
                                }), t.src = "http://log.baomoi.com/log.aspx?key=mobile_facebook_share:error&value=" + window.article_id + "&rand=" + Math.random()), t.setAttribute("style", "width:50px; height:50px;position:absolute;display:none;top:-100px;"), document.body.appendChild(t)
                            })
                        }
                        break;
                    default:
                        $(this).hasClass("popup") && EpiLib.popupCenter(e, $(this).find(".rrssb-text").html(), 580, 470)
                }
                return !1
            })
        }, this.initTracking = function() {
            var e = EpiLib.getUrlParam("utm_source");
            if ("zalo" === e) {
                var t = EpiLib.getUrlParam("utm_medium"),
                    n = EpiLib.getUrlParam("utm_campaign");
                $("a").each(function() {
                    var e = this.href;
                    0 === e.indexOf("http") && e.indexOf("utm_source") < 0 && (this.href = e + (e.indexOf("?") < 0 ? "?" : "&") + "utm_source=zalo&utm_medium=" + t + "&utm_campaign=" + n)
                })
            }
            var i = "undefined" != typeof window.cate_path ? window.cate_path : EpiLib.pageType;
            $(document).on("click touch", "[data-track] a, a[data-track]", function() {
                var e = $(this).closest("[data-track]");
                if (e.length && this.href.indexOf("#") === -1) {
                    var t = e.attr("data-track");
                    "|" === t.substring(0, 1) && (t = i + t), this.href = this.href + "#" + t
                }
            })
        }, this.init = function() {
            if (t.initUI(), t.initSearchBox(), t.initEvents(), "article" === EpiLib.pageType && t.initArticle(), "recommend" === EpiLib.pageType) {
                var n = null;
                if (null != EpiLib.user) {
                    var i = hello(EpiLib.user.network).getAuthResponse(),
                        a = (new Date).getTime() / 1e3;
                    i && i.access_token && i.expires > a && (n = i.access_token)
                }
                if (null == n) null !== EpiLib.user && helloLogout(EpiLib.user.network), document.location = "/";
                else if (null != EpiLib.getUserId()) {
                    var r = 24,
                        o = $("<div>"),
                        s = "searches/recommend.aspx?userid=" + EpiLib.getUserId() + "&size=" + (3 * r).toString() + "&includes=3&apptype=2&imgsize=m150&token=" + n;
                    Page.renderArticles(s, o, function() {
                        var t = $(o).find(".item"),
                            n = $(".article-list"),
                            i = t.length;
                        if (i > 0)
                            for (var a = []; a.length < r && a.length < i;) {
                                var s = Math.floor(Math.random() * i);
                                a.indexOf(s) === -1 && (a.push(s), n.append(t[s]))
                            }
                        o.remove(), 0 === i ? $(".article-list").append($("<div>", {
                            "class": "no-results",
                            text: "Không tìm thấy kết quả phù hợp!"
                        })) : "smartphone" !== EpiLib.device.type && e()
                    })
                }
            } else "smartphone" !== EpiLib.device.type && ($(".article-list .item").length > 0 && e(), $("#main_PagingList1_pager .next").length && ($("#main_PagingList1_pager").children().hide(), this.setupNextPage())), Page.formatingArticles($(document)), Page.initDeferredImages($(document));
            return Page.replaceRedirectLinkInDesktop($(document)), t.initTracking(), t
        }
    }! function(e, t) {
        "object" == typeof module && "object" == typeof module.exports ? module.exports = e.document ? t(e, !0) : function(e) {
            if (!e.document) throw new Error("jQuery requires a window with a document");
            return t(e)
        } : t(e)
    }("undefined" != typeof window ? window : this, function(e, t) {
        function n(e) {
            var t = "length" in e && e.length,
                n = ae.type(e);
            return "function" !== n && !ae.isWindow(e) && (!(1 !== e.nodeType || !t) || ("array" === n || 0 === t || "number" == typeof t && t > 0 && t - 1 in e))
        }

        function i(e, t, n) {
            if (ae.isFunction(t)) return ae.grep(e, function(e, i) {
                return !!t.call(e, i, e) !== n
            });
            if (t.nodeType) return ae.grep(e, function(e) {
                return e === t !== n
            });
            if ("string" == typeof t) {
                if (pe.test(t)) return ae.filter(t, e, n);
                t = ae.filter(t, e)
            }
            return ae.grep(e, function(e) {
                return ae.inArray(e, t) >= 0 !== n
            })
        }

        function a(e, t) {
            do e = e[t]; while (e && 1 !== e.nodeType);
            return e
        }

        function r(e) {
            var t = we[e] = {};
            return ae.each(e.match(be) || [], function(e, n) {
                t[n] = !0
            }), t
        }

        function o() {
            he.addEventListener ? (he.removeEventListener("DOMContentLoaded", s, !1), e.removeEventListener("load", s, !1)) : (he.detachEvent("onreadystatechange", s), e.detachEvent("onload", s))
        }

        function s() {
            (he.addEventListener || "load" === event.type || "complete" === he.readyState) && (o(), ae.ready())
        }

        function l(e, t, n) {
            if (void 0 === n && 1 === e.nodeType) {
                var i = "data-" + t.replace(_e, "-$1").toLowerCase();
                if (n = e.getAttribute(i), "string" == typeof n) {
                    try {
                        n = "true" === n || "false" !== n && ("null" === n ? null : +n + "" === n ? +n : Le.test(n) ? ae.parseJSON(n) : n)
                    } catch (e) {}
                    ae.data(e, t, n)
                } else n = void 0
            }
            return n
        }

        function c(e) {
            var t;
            for (t in e)
                if (("data" !== t || !ae.isEmptyObject(e[t])) && "toJSON" !== t) return !1;
            return !0
        }

        function d(e, t, n, i) {
            if (ae.acceptData(e)) {
                var a, r, o = ae.expando,
                    s = e.nodeType,
                    l = s ? ae.cache : e,
                    c = s ? e[o] : e[o] && o;
                if (c && l[c] && (i || l[c].data) || void 0 !== n || "string" != typeof t) return c || (c = s ? e[o] = V.pop() || ae.guid++ : o), l[c] || (l[c] = s ? {} : {
                    toJSON: ae.noop
                }), ("object" == typeof t || "function" == typeof t) && (i ? l[c] = ae.extend(l[c], t) : l[c].data = ae.extend(l[c].data, t)), r = l[c], i || (r.data || (r.data = {}), r = r.data), void 0 !== n && (r[ae.camelCase(t)] = n), "string" == typeof t ? (a = r[t], null == a && (a = r[ae.camelCase(t)])) : a = r, a
            }
        }

        function u(e, t, n) {
            if (ae.acceptData(e)) {
                var i, a, r = e.nodeType,
                    o = r ? ae.cache : e,
                    s = r ? e[ae.expando] : ae.expando;
                if (o[s]) {
                    if (t && (i = n ? o[s] : o[s].data)) {
                        ae.isArray(t) ? t = t.concat(ae.map(t, ae.camelCase)) : t in i ? t = [t] : (t = ae.camelCase(t), t = t in i ? [t] : t.split(" ")), a = t.length;
                        for (; a--;) delete i[t[a]];
                        if (n ? !c(i) : !ae.isEmptyObject(i)) return
                    }(n || (delete o[s].data, c(o[s]))) && (r ? ae.cleanData([e], !0) : ne.deleteExpando || o != o.window ? delete o[s] : o[s] = null)
                }
            }
        }

        function p() {
            return !0
        }

        function f() {
            return !1
        }

        function h() {
            try {
                return he.activeElement
            } catch (e) {}
        }

        function m(e) {
            var t = Oe.split("|"),
                n = e.createDocumentFragment();
            if (n.createElement)
                for (; t.length;) n.createElement(t.pop());
            return n
        }

        function g(e, t) {
            var n, i, a = 0,
                r = typeof e.getElementsByTagName !== Se ? e.getElementsByTagName(t || "*") : typeof e.querySelectorAll !== Se ? e.querySelectorAll(t || "*") : void 0;
            if (!r)
                for (r = [], n = e.childNodes || e; null != (i = n[a]); a++) !t || ae.nodeName(i, t) ? r.push(i) : ae.merge(r, g(i, t));
            return void 0 === t || t && ae.nodeName(e, t) ? ae.merge([e], r) : r
        }

        function v(e) {
            Ne.test(e.type) && (e.defaultChecked = e.checked)
        }

        function y(e, t) {
            return ae.nodeName(e, "table") && ae.nodeName(11 !== t.nodeType ? t : t.firstChild, "tr") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e
        }

        function b(e) {
            return e.type = (null !== ae.find.attr(e, "type")) + "/" + e.type, e
        }

        function w(e) {
            var t = Ge.exec(e.type);
            return t ? e.type = t[1] : e.removeAttribute("type"), e
        }

        function x(e, t) {
            for (var n, i = 0; null != (n = e[i]); i++) ae._data(n, "globalEval", !t || ae._data(t[i], "globalEval"))
        }

        function k(e, t) {
            if (1 === t.nodeType && ae.hasData(e)) {
                var n, i, a, r = ae._data(e),
                    o = ae._data(t, r),
                    s = r.events;
                if (s) {
                    delete o.handle, o.events = {};
                    for (n in s)
                        for (i = 0, a = s[n].length; a > i; i++) ae.event.add(t, n, s[n][i])
                }
                o.data && (o.data = ae.extend({}, o.data))
            }
        }

        function S(e, t) {
            var n, i, a;
            if (1 === t.nodeType) {
                if (n = t.nodeName.toLowerCase(), !ne.noCloneEvent && t[ae.expando]) {
                    a = ae._data(t);
                    for (i in a.events) ae.removeEvent(t, i, a.handle);
                    t.removeAttribute(ae.expando)
                }
                "script" === n && t.text !== e.text ? (b(t).text = e.text, w(t)) : "object" === n ? (t.parentNode && (t.outerHTML = e.outerHTML), ne.html5Clone && e.innerHTML && !ae.trim(t.innerHTML) && (t.innerHTML = e.innerHTML)) : "input" === n && Ne.test(e.type) ? (t.defaultChecked = t.checked = e.checked, t.value !== e.value && (t.value = e.value)) : "option" === n ? t.defaultSelected = t.selected = e.defaultSelected : ("input" === n || "textarea" === n) && (t.defaultValue = e.defaultValue)
            }
        }

        function L(t, n) {
            var i, a = ae(n.createElement(t)).appendTo(n.body),
                r = e.getDefaultComputedStyle && (i = e.getDefaultComputedStyle(a[0])) ? i.display : ae.css(a[0], "display");
            return a.detach(), r
        }

        function _(e) {
            var t = he,
                n = Ze[e];
            return n || (n = L(e, t), "none" !== n && n || (Ye = (Ye || ae("<iframe frameborder='0' width='0' height='0'/>")).appendTo(t.documentElement), t = (Ye[0].contentWindow || Ye[0].contentDocument).document, t.write(), t.close(), n = L(e, t), Ye.detach()), Ze[e] = n), n
        }

        function T(e, t) {
            return {
                get: function() {
                    var n = e();
                    if (null != n) return n ? void delete this.get : (this.get = t).apply(this, arguments)
                }
            }
        }

        function $(e, t) {
            if (t in e) return t;
            for (var n = t.charAt(0).toUpperCase() + t.slice(1), i = t, a = pt.length; a--;)
                if (t = pt[a] + n, t in e) return t;
            return i
        }

        function C(e, t) {
            for (var n, i, a, r = [], o = 0, s = e.length; s > o; o++) i = e[o], i.style && (r[o] = ae._data(i, "olddisplay"), n = i.style.display, t ? (r[o] || "none" !== n || (i.style.display = ""), "" === i.style.display && Ce(i) && (r[o] = ae._data(i, "olddisplay", _(i.nodeName)))) : (a = Ce(i), (n && "none" !== n || !a) && ae._data(i, "olddisplay", a ? n : ae.css(i, "display"))));
            for (o = 0; s > o; o++) i = e[o], i.style && (t && "none" !== i.style.display && "" !== i.style.display || (i.style.display = t ? r[o] || "" : "none"));
            return e
        }

        function E(e, t, n) {
            var i = lt.exec(t);
            return i ? Math.max(0, i[1] - (n || 0)) + (i[2] || "px") : t
        }

        function N(e, t, n, i, a) {
            for (var r = n === (i ? "border" : "content") ? 4 : "width" === t ? 1 : 0, o = 0; 4 > r; r += 2) "margin" === n && (o += ae.css(e, n + $e[r], !0, a)), i ? ("content" === n && (o -= ae.css(e, "padding" + $e[r], !0, a)), "margin" !== n && (o -= ae.css(e, "border" + $e[r] + "Width", !0, a))) : (o += ae.css(e, "padding" + $e[r], !0, a), "padding" !== n && (o += ae.css(e, "border" + $e[r] + "Width", !0, a)));
            return o
        }

        function A(e, t, n) {
            var i = !0,
                a = "width" === t ? e.offsetWidth : e.offsetHeight,
                r = et(e),
                o = ne.boxSizing && "border-box" === ae.css(e, "boxSizing", !1, r);
            if (0 >= a || null == a) {
                if (a = tt(e, t, r), (0 > a || null == a) && (a = e.style[t]), it.test(a)) return a;
                i = o && (ne.boxSizingReliable() || a === e.style[t]), a = parseFloat(a) || 0
            }
            return a + N(e, t, n || (o ? "border" : "content"), i, r) + "px"
        }

        function j(e, t, n, i, a) {
            return new j.prototype.init(e, t, n, i, a)
        }

        function I() {
            return setTimeout(function() {
                ft = void 0
            }), ft = ae.now()
        }

        function D(e, t) {
            var n, i = {
                    height: e
                },
                a = 0;
            for (t = t ? 1 : 0; 4 > a; a += 2 - t) n = $e[a], i["margin" + n] = i["padding" + n] = e;
            return t && (i.opacity = i.width = e), i
        }

        function H(e, t, n) {
            for (var i, a = (bt[t] || []).concat(bt["*"]), r = 0, o = a.length; o > r; r++)
                if (i = a[r].call(n, t, e)) return i
        }

        function O(e, t, n) {
            var i, a, r, o, s, l, c, d, u = this,
                p = {},
                f = e.style,
                h = e.nodeType && Ce(e),
                m = ae._data(e, "fxshow");
            n.queue || (s = ae._queueHooks(e, "fx"), null == s.unqueued && (s.unqueued = 0, l = s.empty.fire, s.empty.fire = function() {
                s.unqueued || l()
            }), s.unqueued++, u.always(function() {
                u.always(function() {
                    s.unqueued--, ae.queue(e, "fx").length || s.empty.fire()
                })
            })), 1 === e.nodeType && ("height" in t || "width" in t) && (n.overflow = [f.overflow, f.overflowX, f.overflowY], c = ae.css(e, "display"), d = "none" === c ? ae._data(e, "olddisplay") || _(e.nodeName) : c, "inline" === d && "none" === ae.css(e, "float") && (ne.inlineBlockNeedsLayout && "inline" !== _(e.nodeName) ? f.zoom = 1 : f.display = "inline-block")), n.overflow && (f.overflow = "hidden", ne.shrinkWrapBlocks() || u.always(function() {
                f.overflow = n.overflow[0], f.overflowX = n.overflow[1], f.overflowY = n.overflow[2]
            }));
            for (i in t)
                if (a = t[i], mt.exec(a)) {
                    if (delete t[i], r = r || "toggle" === a, a === (h ? "hide" : "show")) {
                        if ("show" !== a || !m || void 0 === m[i]) continue;
                        h = !0
                    }
                    p[i] = m && m[i] || ae.style(e, i)
                } else c = void 0;
            if (ae.isEmptyObject(p)) "inline" === ("none" === c ? _(e.nodeName) : c) && (f.display = c);
            else {
                m ? "hidden" in m && (h = m.hidden) : m = ae._data(e, "fxshow", {}), r && (m.hidden = !h), h ? ae(e).show() : u.done(function() {
                    ae(e).hide()
                }), u.done(function() {
                    var t;
                    ae._removeData(e, "fxshow");
                    for (t in p) ae.style(e, t, p[t])
                });
                for (i in p) o = H(h ? m[i] : 0, i, u), i in m || (m[i] = o.start, h && (o.end = o.start, o.start = "width" === i || "height" === i ? 1 : 0))
            }
        }

        function q(e, t) {
            var n, i, a, r, o;
            for (n in e)
                if (i = ae.camelCase(n), a = t[i], r = e[n], ae.isArray(r) && (a = r[1], r = e[n] = r[0]), n !== i && (e[i] = r, delete e[n]), o = ae.cssHooks[i], o && "expand" in o) {
                    r = o.expand(r), delete e[i];
                    for (n in r) n in e || (e[n] = r[n], t[n] = a)
                } else t[i] = a
        }

        function P(e, t, n) {
            var i, a, r = 0,
                o = yt.length,
                s = ae.Deferred().always(function() {
                    delete l.elem
                }),
                l = function() {
                    if (a) return !1;
                    for (var t = ft || I(), n = Math.max(0, c.startTime + c.duration - t), i = n / c.duration || 0, r = 1 - i, o = 0, l = c.tweens.length; l > o; o++) c.tweens[o].run(r);
                    return s.notifyWith(e, [c, r, n]), 1 > r && l ? n : (s.resolveWith(e, [c]), !1)
                },
                c = s.promise({
                    elem: e,
                    props: ae.extend({}, t),
                    opts: ae.extend(!0, {
                        specialEasing: {}
                    }, n),
                    originalProperties: t,
                    originalOptions: n,
                    startTime: ft || I(),
                    duration: n.duration,
                    tweens: [],
                    createTween: function(t, n) {
                        var i = ae.Tween(e, c.opts, t, n, c.opts.specialEasing[t] || c.opts.easing);
                        return c.tweens.push(i), i
                    },
                    stop: function(t) {
                        var n = 0,
                            i = t ? c.tweens.length : 0;
                        if (a) return this;
                        for (a = !0; i > n; n++) c.tweens[n].run(1);
                        return t ? s.resolveWith(e, [c, t]) : s.rejectWith(e, [c, t]), this
                    }
                }),
                d = c.props;
            for (q(d, c.opts.specialEasing); o > r; r++)
                if (i = yt[r].call(c, e, d, c.opts)) return i;
            return ae.map(d, H, c), ae.isFunction(c.opts.start) && c.opts.start.call(e, c), ae.fx.timer(ae.extend(l, {
                elem: e,
                anim: c,
                queue: c.opts.queue
            })), c.progress(c.opts.progress).done(c.opts.done, c.opts.complete).fail(c.opts.fail).always(c.opts.always)
        }

        function M(e) {
            return function(t, n) {
                "string" != typeof t && (n = t, t = "*");
                var i, a = 0,
                    r = t.toLowerCase().match(be) || [];
                if (ae.isFunction(n))
                    for (; i = r[a++];) "+" === i.charAt(0) ? (i = i.slice(1) || "*", (e[i] = e[i] || []).unshift(n)) : (e[i] = e[i] || []).push(n)
            }
        }

        function B(e, t, n, i) {
            function a(s) {
                var l;
                return r[s] = !0, ae.each(e[s] || [], function(e, s) {
                    var c = s(t, n, i);
                    return "string" != typeof c || o || r[c] ? o ? !(l = c) : void 0 : (t.dataTypes.unshift(c), a(c), !1)
                }), l
            }
            var r = {},
                o = e === Ut;
            return a(t.dataTypes[0]) || !r["*"] && a("*")
        }

        function R(e, t) {
            var n, i, a = ae.ajaxSettings.flatOptions || {};
            for (i in t) void 0 !== t[i] && ((a[i] ? e : n || (n = {}))[i] = t[i]);
            return n && ae.extend(!0, e, n), e
        }

        function F(e, t, n) {
            for (var i, a, r, o, s = e.contents, l = e.dataTypes;
                "*" === l[0];) l.shift(), void 0 === a && (a = e.mimeType || t.getResponseHeader("Content-Type"));
            if (a)
                for (o in s)
                    if (s[o] && s[o].test(a)) {
                        l.unshift(o);
                        break
                    }
            if (l[0] in n) r = l[0];
            else {
                for (o in n) {
                    if (!l[0] || e.converters[o + " " + l[0]]) {
                        r = o;
                        break
                    }
                    i || (i = o)
                }
                r = r || i
            }
            return r ? (r !== l[0] && l.unshift(r), n[r]) : void 0
        }

        function U(e, t, n, i) {
            var a, r, o, s, l, c = {},
                d = e.dataTypes.slice();
            if (d[1])
                for (o in e.converters) c[o.toLowerCase()] = e.converters[o];
            for (r = d.shift(); r;)
                if (e.responseFields[r] && (n[e.responseFields[r]] = t), !l && i && e.dataFilter && (t = e.dataFilter(t, e.dataType)), l = r, r = d.shift())
                    if ("*" === r) r = l;
                    else if ("*" !== l && l !== r) {
                if (o = c[l + " " + r] || c["* " + r], !o)
                    for (a in c)
                        if (s = a.split(" "), s[1] === r && (o = c[l + " " + s[0]] || c["* " + s[0]])) {
                            o === !0 ? o = c[a] : c[a] !== !0 && (r = s[0], d.unshift(s[1]));
                            break
                        }
                if (o !== !0)
                    if (o && e["throws"]) t = o(t);
                    else try {
                        t = o(t)
                    } catch (e) {
                        return {
                            state: "parsererror",
                            error: o ? e : "No conversion from " + l + " to " + r
                        }
                    }
            }
            return {
                state: "success",
                data: t
            }
        }

        function z(e, t, n, i) {
            var a;
            if (ae.isArray(t)) ae.each(t, function(t, a) {
                n || Jt.test(e) ? i(e, a) : z(e + "[" + ("object" == typeof a ? t : "") + "]", a, n, i)
            });
            else if (n || "object" !== ae.type(t)) i(e, t);
            else
                for (a in t) z(e + "[" + a + "]", t[a], n, i)
        }

        function W() {
            try {
                return new e.XMLHttpRequest
            } catch (e) {}
        }

        function J() {
            try {
                return new e.ActiveXObject("Microsoft.XMLHTTP")
            } catch (e) {}
        }

        function G(e) {
            return ae.isWindow(e) ? e : 9 === e.nodeType && (e.defaultView || e.parentWindow)
        }
        var V = [],
            X = V.slice,
            Q = V.concat,
            K = V.push,
            Y = V.indexOf,
            Z = {},
            ee = Z.toString,
            te = Z.hasOwnProperty,
            ne = {},
            ie = "1.11.3",
            ae = function(e, t) {
                return new ae.fn.init(e, t)
            },
            re = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
            oe = /^-ms-/,
            se = /-([\da-z])/gi,
            le = function(e, t) {
                return t.toUpperCase()
            };
        ae.fn = ae.prototype = {
            jquery: ie,
            constructor: ae,
            selector: "",
            length: 0,
            toArray: function() {
                return X.call(this)
            },
            get: function(e) {
                return null != e ? 0 > e ? this[e + this.length] : this[e] : X.call(this)
            },
            pushStack: function(e) {
                var t = ae.merge(this.constructor(), e);
                return t.prevObject = this, t.context = this.context, t
            },
            each: function(e, t) {
                return ae.each(this, e, t)
            },
            map: function(e) {
                return this.pushStack(ae.map(this, function(t, n) {
                    return e.call(t, n, t)
                }))
            },
            slice: function() {
                return this.pushStack(X.apply(this, arguments))
            },
            first: function() {
                return this.eq(0)
            },
            last: function() {
                return this.eq(-1)
            },
            eq: function(e) {
                var t = this.length,
                    n = +e + (0 > e ? t : 0);
                return this.pushStack(n >= 0 && t > n ? [this[n]] : [])
            },
            end: function() {
                return this.prevObject || this.constructor(null)
            },
            push: K,
            sort: V.sort,
            splice: V.splice
        }, ae.extend = ae.fn.extend = function() {
            var e, t, n, i, a, r, o = arguments[0] || {},
                s = 1,
                l = arguments.length,
                c = !1;
            for ("boolean" == typeof o && (c = o, o = arguments[s] || {}, s++), "object" == typeof o || ae.isFunction(o) || (o = {}), s === l && (o = this, s--); l > s; s++)
                if (null != (a = arguments[s]))
                    for (i in a) e = o[i], n = a[i], o !== n && (c && n && (ae.isPlainObject(n) || (t = ae.isArray(n))) ? (t ? (t = !1, r = e && ae.isArray(e) ? e : []) : r = e && ae.isPlainObject(e) ? e : {}, o[i] = ae.extend(c, r, n)) : void 0 !== n && (o[i] = n));
            return o
        }, ae.extend({
            expando: "jQuery" + (ie + Math.random()).replace(/\D/g, ""),
            isReady: !0,
            error: function(e) {
                throw new Error(e)
            },
            noop: function() {},
            isFunction: function(e) {
                return "function" === ae.type(e)
            },
            isArray: Array.isArray || function(e) {
                return "array" === ae.type(e)
            },
            isWindow: function(e) {
                return null != e && e == e.window
            },
            isNumeric: function(e) {
                return !ae.isArray(e) && e - parseFloat(e) + 1 >= 0
            },
            isEmptyObject: function(e) {
                var t;
                for (t in e) return !1;
                return !0
            },
            isPlainObject: function(e) {
                var t;
                if (!e || "object" !== ae.type(e) || e.nodeType || ae.isWindow(e)) return !1;
                try {
                    if (e.constructor && !te.call(e, "constructor") && !te.call(e.constructor.prototype, "isPrototypeOf")) return !1
                } catch (e) {
                    return !1
                }
                if (ne.ownLast)
                    for (t in e) return te.call(e, t);
                for (t in e);
                return void 0 === t || te.call(e, t)
            },
            type: function(e) {
                return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? Z[ee.call(e)] || "object" : typeof e
            },
            globalEval: function(t) {
                t && ae.trim(t) && (e.execScript || function(t) {
                    e.eval.call(e, t)
                })(t)
            },
            camelCase: function(e) {
                return e.replace(oe, "ms-").replace(se, le)
            },
            nodeName: function(e, t) {
                return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
            },
            each: function(e, t, i) {
                var a, r = 0,
                    o = e.length,
                    s = n(e);
                if (i) {
                    if (s)
                        for (; o > r && (a = t.apply(e[r], i), a !== !1); r++);
                    else
                        for (r in e)
                            if (a = t.apply(e[r], i), a === !1) break
                } else if (s)
                    for (; o > r && (a = t.call(e[r], r, e[r]), a !== !1); r++);
                else
                    for (r in e)
                        if (a = t.call(e[r], r, e[r]), a === !1) break; return e
            },
            trim: function(e) {
                return null == e ? "" : (e + "").replace(re, "")
            },
            makeArray: function(e, t) {
                var i = t || [];
                return null != e && (n(Object(e)) ? ae.merge(i, "string" == typeof e ? [e] : e) : K.call(i, e)), i
            },
            inArray: function(e, t, n) {
                var i;
                if (t) {
                    if (Y) return Y.call(t, e, n);
                    for (i = t.length, n = n ? 0 > n ? Math.max(0, i + n) : n : 0; i > n; n++)
                        if (n in t && t[n] === e) return n
                }
                return -1
            },
            merge: function(e, t) {
                for (var n = +t.length, i = 0, a = e.length; n > i;) e[a++] = t[i++];
                if (n !== n)
                    for (; void 0 !== t[i];) e[a++] = t[i++];
                return e.length = a, e
            },
            grep: function(e, t, n) {
                for (var i, a = [], r = 0, o = e.length, s = !n; o > r; r++) i = !t(e[r], r), i !== s && a.push(e[r]);
                return a
            },
            map: function(e, t, i) {
                var a, r = 0,
                    o = e.length,
                    s = n(e),
                    l = [];
                if (s)
                    for (; o > r; r++) a = t(e[r], r, i), null != a && l.push(a);
                else
                    for (r in e) a = t(e[r], r, i), null != a && l.push(a);
                return Q.apply([], l)
            },
            guid: 1,
            proxy: function(e, t) {
                var n, i, a;
                return "string" == typeof t && (a = e[t], t = e, e = a), ae.isFunction(e) ? (n = X.call(arguments, 2), i = function() {
                    return e.apply(t || this, n.concat(X.call(arguments)))
                }, i.guid = e.guid = e.guid || ae.guid++, i) : void 0
            },
            now: function() {
                return +new Date
            },
            support: ne
        }), ae.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(e, t) {
            Z["[object " + t + "]"] = t.toLowerCase()
        });
        var ce = function(e) {
            function t(e, t, n, i) {
                var a, r, o, s, l, c, u, f, h, m;
                if ((t ? t.ownerDocument || t : B) !== j && A(t), t = t || j, n = n || [], s = t.nodeType, "string" != typeof e || !e || 1 !== s && 9 !== s && 11 !== s) return n;
                if (!i && D) {
                    if (11 !== s && (a = ye.exec(e)))
                        if (o = a[1]) {
                            if (9 === s) {
                                if (r = t.getElementById(o), !r || !r.parentNode) return n;
                                if (r.id === o) return n.push(r), n
                            } else if (t.ownerDocument && (r = t.ownerDocument.getElementById(o)) && P(t, r) && r.id === o) return n.push(r), n
                        } else {
                            if (a[2]) return Y.apply(n, t.getElementsByTagName(e)), n;
                            if ((o = a[3]) && x.getElementsByClassName) return Y.apply(n, t.getElementsByClassName(o)), n
                        }
                    if (x.qsa && (!H || !H.test(e))) {
                        if (f = u = M, h = t, m = 1 !== s && e, 1 === s && "object" !== t.nodeName.toLowerCase()) {
                            for (c = _(e), (u = t.getAttribute("id")) ? f = u.replace(we, "\\$&") : t.setAttribute("id", f), f = "[id='" + f + "'] ", l = c.length; l--;) c[l] = f + p(c[l]);
                            h = be.test(e) && d(t.parentNode) || t, m = c.join(",")
                        }
                        if (m) try {
                            return Y.apply(n, h.querySelectorAll(m)), n
                        } catch (e) {} finally {
                            u || t.removeAttribute("id")
                        }
                    }
                }
                return $(e.replace(le, "$1"), t, n, i)
            }

            function n() {
                function e(n, i) {
                    return t.push(n + " ") > k.cacheLength && delete e[t.shift()], e[n + " "] = i
                }
                var t = [];
                return e
            }

            function i(e) {
                return e[M] = !0, e
            }

            function a(e) {
                var t = j.createElement("div");
                try {
                    return !!e(t)
                } catch (e) {
                    return !1
                } finally {
                    t.parentNode && t.parentNode.removeChild(t), t = null
                }
            }

            function r(e, t) {
                for (var n = e.split("|"), i = e.length; i--;) k.attrHandle[n[i]] = t
            }

            function o(e, t) {
                var n = t && e,
                    i = n && 1 === e.nodeType && 1 === t.nodeType && (~t.sourceIndex || G) - (~e.sourceIndex || G);
                if (i) return i;
                if (n)
                    for (; n = n.nextSibling;)
                        if (n === t) return -1;
                return e ? 1 : -1
            }

            function s(e) {
                return function(t) {
                    var n = t.nodeName.toLowerCase();
                    return "input" === n && t.type === e
                }
            }

            function l(e) {
                return function(t) {
                    var n = t.nodeName.toLowerCase();
                    return ("input" === n || "button" === n) && t.type === e
                }
            }

            function c(e) {
                return i(function(t) {
                    return t = +t, i(function(n, i) {
                        for (var a, r = e([], n.length, t), o = r.length; o--;) n[a = r[o]] && (n[a] = !(i[a] = n[a]))
                    })
                })
            }

            function d(e) {
                return e && "undefined" != typeof e.getElementsByTagName && e
            }

            function u() {}

            function p(e) {
                for (var t = 0, n = e.length, i = ""; n > t; t++) i += e[t].value;
                return i
            }

            function f(e, t, n) {
                var i = t.dir,
                    a = n && "parentNode" === i,
                    r = F++;
                return t.first ? function(t, n, r) {
                    for (; t = t[i];)
                        if (1 === t.nodeType || a) return e(t, n, r)
                } : function(t, n, o) {
                    var s, l, c = [R, r];
                    if (o) {
                        for (; t = t[i];)
                            if ((1 === t.nodeType || a) && e(t, n, o)) return !0
                    } else
                        for (; t = t[i];)
                            if (1 === t.nodeType || a) {
                                if (l = t[M] || (t[M] = {}), (s = l[i]) && s[0] === R && s[1] === r) return c[2] = s[2];
                                if (l[i] = c, c[2] = e(t, n, o)) return !0
                            }
                }
            }

            function h(e) {
                return e.length > 1 ? function(t, n, i) {
                    for (var a = e.length; a--;)
                        if (!e[a](t, n, i)) return !1;
                    return !0
                } : e[0]
            }

            function m(e, n, i) {
                for (var a = 0, r = n.length; r > a; a++) t(e, n[a], i);
                return i
            }

            function g(e, t, n, i, a) {
                for (var r, o = [], s = 0, l = e.length, c = null != t; l > s; s++)(r = e[s]) && (!n || n(r, i, a)) && (o.push(r), c && t.push(s));
                return o
            }

            function v(e, t, n, a, r, o) {
                return a && !a[M] && (a = v(a)), r && !r[M] && (r = v(r, o)), i(function(i, o, s, l) {
                    var c, d, u, p = [],
                        f = [],
                        h = o.length,
                        v = i || m(t || "*", s.nodeType ? [s] : s, []),
                        y = !e || !i && t ? v : g(v, p, e, s, l),
                        b = n ? r || (i ? e : h || a) ? [] : o : y;
                    if (n && n(y, b, s, l), a)
                        for (c = g(b, f), a(c, [], s, l), d = c.length; d--;)(u = c[d]) && (b[f[d]] = !(y[f[d]] = u));
                    if (i) {
                        if (r || e) {
                            if (r) {
                                for (c = [], d = b.length; d--;)(u = b[d]) && c.push(y[d] = u);
                                r(null, b = [], c, l)
                            }
                            for (d = b.length; d--;)(u = b[d]) && (c = r ? ee(i, u) : p[d]) > -1 && (i[c] = !(o[c] = u));
                        }
                    } else b = g(b === o ? b.splice(h, b.length) : b), r ? r(null, o, b, l) : Y.apply(o, b)
                })
            }

            function y(e) {
                for (var t, n, i, a = e.length, r = k.relative[e[0].type], o = r || k.relative[" "], s = r ? 1 : 0, l = f(function(e) {
                        return e === t
                    }, o, !0), c = f(function(e) {
                        return ee(t, e) > -1
                    }, o, !0), d = [function(e, n, i) {
                        var a = !r && (i || n !== C) || ((t = n).nodeType ? l(e, n, i) : c(e, n, i));
                        return t = null, a
                    }]; a > s; s++)
                    if (n = k.relative[e[s].type]) d = [f(h(d), n)];
                    else {
                        if (n = k.filter[e[s].type].apply(null, e[s].matches), n[M]) {
                            for (i = ++s; a > i && !k.relative[e[i].type]; i++);
                            return v(s > 1 && h(d), s > 1 && p(e.slice(0, s - 1).concat({
                                value: " " === e[s - 2].type ? "*" : ""
                            })).replace(le, "$1"), n, i > s && y(e.slice(s, i)), a > i && y(e = e.slice(i)), a > i && p(e))
                        }
                        d.push(n)
                    }
                return h(d)
            }

            function b(e, n) {
                var a = n.length > 0,
                    r = e.length > 0,
                    o = function(i, o, s, l, c) {
                        var d, u, p, f = 0,
                            h = "0",
                            m = i && [],
                            v = [],
                            y = C,
                            b = i || r && k.find.TAG("*", c),
                            w = R += null == y ? 1 : Math.random() || .1,
                            x = b.length;
                        for (c && (C = o !== j && o); h !== x && null != (d = b[h]); h++) {
                            if (r && d) {
                                for (u = 0; p = e[u++];)
                                    if (p(d, o, s)) {
                                        l.push(d);
                                        break
                                    }
                                c && (R = w)
                            }
                            a && ((d = !p && d) && f--, i && m.push(d))
                        }
                        if (f += h, a && h !== f) {
                            for (u = 0; p = n[u++];) p(m, v, o, s);
                            if (i) {
                                if (f > 0)
                                    for (; h--;) m[h] || v[h] || (v[h] = Q.call(l));
                                v = g(v)
                            }
                            Y.apply(l, v), c && !i && v.length > 0 && f + n.length > 1 && t.uniqueSort(l)
                        }
                        return c && (R = w, C = y), m
                    };
                return a ? i(o) : o
            }
            var w, x, k, S, L, _, T, $, C, E, N, A, j, I, D, H, O, q, P, M = "sizzle" + 1 * new Date,
                B = e.document,
                R = 0,
                F = 0,
                U = n(),
                z = n(),
                W = n(),
                J = function(e, t) {
                    return e === t && (N = !0), 0
                },
                G = 1 << 31,
                V = {}.hasOwnProperty,
                X = [],
                Q = X.pop,
                K = X.push,
                Y = X.push,
                Z = X.slice,
                ee = function(e, t) {
                    for (var n = 0, i = e.length; i > n; n++)
                        if (e[n] === t) return n;
                    return -1
                },
                te = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
                ne = "[\\x20\\t\\r\\n\\f]",
                ie = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
                ae = ie.replace("w", "w#"),
                re = "\\[" + ne + "*(" + ie + ")(?:" + ne + "*([*^$|!~]?=)" + ne + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + ae + "))|)" + ne + "*\\]",
                oe = ":(" + ie + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + re + ")*)|.*)\\)|)",
                se = new RegExp(ne + "+", "g"),
                le = new RegExp("^" + ne + "+|((?:^|[^\\\\])(?:\\\\.)*)" + ne + "+$", "g"),
                ce = new RegExp("^" + ne + "*," + ne + "*"),
                de = new RegExp("^" + ne + "*([>+~]|" + ne + ")" + ne + "*"),
                ue = new RegExp("=" + ne + "*([^\\]'\"]*?)" + ne + "*\\]", "g"),
                pe = new RegExp(oe),
                fe = new RegExp("^" + ae + "$"),
                he = {
                    ID: new RegExp("^#(" + ie + ")"),
                    CLASS: new RegExp("^\\.(" + ie + ")"),
                    TAG: new RegExp("^(" + ie.replace("w", "w*") + ")"),
                    ATTR: new RegExp("^" + re),
                    PSEUDO: new RegExp("^" + oe),
                    CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + ne + "*(even|odd|(([+-]|)(\\d*)n|)" + ne + "*(?:([+-]|)" + ne + "*(\\d+)|))" + ne + "*\\)|)", "i"),
                    bool: new RegExp("^(?:" + te + ")$", "i"),
                    needsContext: new RegExp("^" + ne + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + ne + "*((?:-\\d)?\\d*)" + ne + "*\\)|)(?=[^-]|$)", "i")
                },
                me = /^(?:input|select|textarea|button)$/i,
                ge = /^h\d$/i,
                ve = /^[^{]+\{\s*\[native \w/,
                ye = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
                be = /[+~]/,
                we = /'|\\/g,
                xe = new RegExp("\\\\([\\da-f]{1,6}" + ne + "?|(" + ne + ")|.)", "ig"),
                ke = function(e, t, n) {
                    var i = "0x" + t - 65536;
                    return i !== i || n ? t : 0 > i ? String.fromCharCode(i + 65536) : String.fromCharCode(i >> 10 | 55296, 1023 & i | 56320)
                },
                Se = function() {
                    A()
                };
            try {
                Y.apply(X = Z.call(B.childNodes), B.childNodes), X[B.childNodes.length].nodeType
            } catch (e) {
                Y = {
                    apply: X.length ? function(e, t) {
                        K.apply(e, Z.call(t))
                    } : function(e, t) {
                        for (var n = e.length, i = 0; e[n++] = t[i++];);
                        e.length = n - 1
                    }
                }
            }
            x = t.support = {}, L = t.isXML = function(e) {
                var t = e && (e.ownerDocument || e).documentElement;
                return !!t && "HTML" !== t.nodeName
            }, A = t.setDocument = function(e) {
                var t, n, i = e ? e.ownerDocument || e : B;
                return i !== j && 9 === i.nodeType && i.documentElement ? (j = i, I = i.documentElement, n = i.defaultView, n && n !== n.top && (n.addEventListener ? n.addEventListener("unload", Se, !1) : n.attachEvent && n.attachEvent("onunload", Se)), D = !L(i), x.attributes = a(function(e) {
                    return e.className = "i", !e.getAttribute("className")
                }), x.getElementsByTagName = a(function(e) {
                    return e.appendChild(i.createComment("")), !e.getElementsByTagName("*").length
                }), x.getElementsByClassName = ve.test(i.getElementsByClassName), x.getById = a(function(e) {
                    return I.appendChild(e).id = M, !i.getElementsByName || !i.getElementsByName(M).length
                }), x.getById ? (k.find.ID = function(e, t) {
                    if ("undefined" != typeof t.getElementById && D) {
                        var n = t.getElementById(e);
                        return n && n.parentNode ? [n] : []
                    }
                }, k.filter.ID = function(e) {
                    var t = e.replace(xe, ke);
                    return function(e) {
                        return e.getAttribute("id") === t
                    }
                }) : (delete k.find.ID, k.filter.ID = function(e) {
                    var t = e.replace(xe, ke);
                    return function(e) {
                        var n = "undefined" != typeof e.getAttributeNode && e.getAttributeNode("id");
                        return n && n.value === t
                    }
                }), k.find.TAG = x.getElementsByTagName ? function(e, t) {
                    return "undefined" != typeof t.getElementsByTagName ? t.getElementsByTagName(e) : x.qsa ? t.querySelectorAll(e) : void 0
                } : function(e, t) {
                    var n, i = [],
                        a = 0,
                        r = t.getElementsByTagName(e);
                    if ("*" === e) {
                        for (; n = r[a++];) 1 === n.nodeType && i.push(n);
                        return i
                    }
                    return r
                }, k.find.CLASS = x.getElementsByClassName && function(e, t) {
                    return D ? t.getElementsByClassName(e) : void 0
                }, O = [], H = [], (x.qsa = ve.test(i.querySelectorAll)) && (a(function(e) {
                    I.appendChild(e).innerHTML = "<a id='" + M + "'></a><select id='" + M + "-\f]' msallowcapture=''><option selected=''></option></select>", e.querySelectorAll("[msallowcapture^='']").length && H.push("[*^$]=" + ne + "*(?:''|\"\")"), e.querySelectorAll("[selected]").length || H.push("\\[" + ne + "*(?:value|" + te + ")"), e.querySelectorAll("[id~=" + M + "-]").length || H.push("~="), e.querySelectorAll(":checked").length || H.push(":checked"), e.querySelectorAll("a#" + M + "+*").length || H.push(".#.+[+~]")
                }), a(function(e) {
                    var t = i.createElement("input");
                    t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("name", "D"), e.querySelectorAll("[name=d]").length && H.push("name" + ne + "*[*^$|!~]?="), e.querySelectorAll(":enabled").length || H.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), H.push(",.*:")
                })), (x.matchesSelector = ve.test(q = I.matches || I.webkitMatchesSelector || I.mozMatchesSelector || I.oMatchesSelector || I.msMatchesSelector)) && a(function(e) {
                    x.disconnectedMatch = q.call(e, "div"), q.call(e, "[s!='']:x"), O.push("!=", oe)
                }), H = H.length && new RegExp(H.join("|")), O = O.length && new RegExp(O.join("|")), t = ve.test(I.compareDocumentPosition), P = t || ve.test(I.contains) ? function(e, t) {
                    var n = 9 === e.nodeType ? e.documentElement : e,
                        i = t && t.parentNode;
                    return e === i || !(!i || 1 !== i.nodeType || !(n.contains ? n.contains(i) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(i)))
                } : function(e, t) {
                    if (t)
                        for (; t = t.parentNode;)
                            if (t === e) return !0;
                    return !1
                }, J = t ? function(e, t) {
                    if (e === t) return N = !0, 0;
                    var n = !e.compareDocumentPosition - !t.compareDocumentPosition;
                    return n ? n : (n = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1, 1 & n || !x.sortDetached && t.compareDocumentPosition(e) === n ? e === i || e.ownerDocument === B && P(B, e) ? -1 : t === i || t.ownerDocument === B && P(B, t) ? 1 : E ? ee(E, e) - ee(E, t) : 0 : 4 & n ? -1 : 1)
                } : function(e, t) {
                    if (e === t) return N = !0, 0;
                    var n, a = 0,
                        r = e.parentNode,
                        s = t.parentNode,
                        l = [e],
                        c = [t];
                    if (!r || !s) return e === i ? -1 : t === i ? 1 : r ? -1 : s ? 1 : E ? ee(E, e) - ee(E, t) : 0;
                    if (r === s) return o(e, t);
                    for (n = e; n = n.parentNode;) l.unshift(n);
                    for (n = t; n = n.parentNode;) c.unshift(n);
                    for (; l[a] === c[a];) a++;
                    return a ? o(l[a], c[a]) : l[a] === B ? -1 : c[a] === B ? 1 : 0
                }, i) : j
            }, t.matches = function(e, n) {
                return t(e, null, null, n)
            }, t.matchesSelector = function(e, n) {
                if ((e.ownerDocument || e) !== j && A(e), n = n.replace(ue, "='$1']"), !(!x.matchesSelector || !D || O && O.test(n) || H && H.test(n))) try {
                    var i = q.call(e, n);
                    if (i || x.disconnectedMatch || e.document && 11 !== e.document.nodeType) return i
                } catch (e) {}
                return t(n, j, null, [e]).length > 0
            }, t.contains = function(e, t) {
                return (e.ownerDocument || e) !== j && A(e), P(e, t)
            }, t.attr = function(e, t) {
                (e.ownerDocument || e) !== j && A(e);
                var n = k.attrHandle[t.toLowerCase()],
                    i = n && V.call(k.attrHandle, t.toLowerCase()) ? n(e, t, !D) : void 0;
                return void 0 !== i ? i : x.attributes || !D ? e.getAttribute(t) : (i = e.getAttributeNode(t)) && i.specified ? i.value : null
            }, t.error = function(e) {
                throw new Error("Syntax error, unrecognized expression: " + e)
            }, t.uniqueSort = function(e) {
                var t, n = [],
                    i = 0,
                    a = 0;
                if (N = !x.detectDuplicates, E = !x.sortStable && e.slice(0), e.sort(J), N) {
                    for (; t = e[a++];) t === e[a] && (i = n.push(a));
                    for (; i--;) e.splice(n[i], 1)
                }
                return E = null, e
            }, S = t.getText = function(e) {
                var t, n = "",
                    i = 0,
                    a = e.nodeType;
                if (a) {
                    if (1 === a || 9 === a || 11 === a) {
                        if ("string" == typeof e.textContent) return e.textContent;
                        for (e = e.firstChild; e; e = e.nextSibling) n += S(e)
                    } else if (3 === a || 4 === a) return e.nodeValue
                } else
                    for (; t = e[i++];) n += S(t);
                return n
            }, k = t.selectors = {
                cacheLength: 50,
                createPseudo: i,
                match: he,
                attrHandle: {},
                find: {},
                relative: {
                    ">": {
                        dir: "parentNode",
                        first: !0
                    },
                    " ": {
                        dir: "parentNode"
                    },
                    "+": {
                        dir: "previousSibling",
                        first: !0
                    },
                    "~": {
                        dir: "previousSibling"
                    }
                },
                preFilter: {
                    ATTR: function(e) {
                        return e[1] = e[1].replace(xe, ke), e[3] = (e[3] || e[4] || e[5] || "").replace(xe, ke), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4)
                    },
                    CHILD: function(e) {
                        return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || t.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && t.error(e[0]), e
                    },
                    PSEUDO: function(e) {
                        var t, n = !e[6] && e[2];
                        return he.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : n && pe.test(n) && (t = _(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3))
                    }
                },
                filter: {
                    TAG: function(e) {
                        var t = e.replace(xe, ke).toLowerCase();
                        return "*" === e ? function() {
                            return !0
                        } : function(e) {
                            return e.nodeName && e.nodeName.toLowerCase() === t
                        }
                    },
                    CLASS: function(e) {
                        var t = U[e + " "];
                        return t || (t = new RegExp("(^|" + ne + ")" + e + "(" + ne + "|$)")) && U(e, function(e) {
                            return t.test("string" == typeof e.className && e.className || "undefined" != typeof e.getAttribute && e.getAttribute("class") || "")
                        })
                    },
                    ATTR: function(e, n, i) {
                        return function(a) {
                            var r = t.attr(a, e);
                            return null == r ? "!=" === n : !n || (r += "", "=" === n ? r === i : "!=" === n ? r !== i : "^=" === n ? i && 0 === r.indexOf(i) : "*=" === n ? i && r.indexOf(i) > -1 : "$=" === n ? i && r.slice(-i.length) === i : "~=" === n ? (" " + r.replace(se, " ") + " ").indexOf(i) > -1 : "|=" === n && (r === i || r.slice(0, i.length + 1) === i + "-"))
                        }
                    },
                    CHILD: function(e, t, n, i, a) {
                        var r = "nth" !== e.slice(0, 3),
                            o = "last" !== e.slice(-4),
                            s = "of-type" === t;
                        return 1 === i && 0 === a ? function(e) {
                            return !!e.parentNode
                        } : function(t, n, l) {
                            var c, d, u, p, f, h, m = r !== o ? "nextSibling" : "previousSibling",
                                g = t.parentNode,
                                v = s && t.nodeName.toLowerCase(),
                                y = !l && !s;
                            if (g) {
                                if (r) {
                                    for (; m;) {
                                        for (u = t; u = u[m];)
                                            if (s ? u.nodeName.toLowerCase() === v : 1 === u.nodeType) return !1;
                                        h = m = "only" === e && !h && "nextSibling"
                                    }
                                    return !0
                                }
                                if (h = [o ? g.firstChild : g.lastChild], o && y) {
                                    for (d = g[M] || (g[M] = {}), c = d[e] || [], f = c[0] === R && c[1], p = c[0] === R && c[2], u = f && g.childNodes[f]; u = ++f && u && u[m] || (p = f = 0) || h.pop();)
                                        if (1 === u.nodeType && ++p && u === t) {
                                            d[e] = [R, f, p];
                                            break
                                        }
                                } else if (y && (c = (t[M] || (t[M] = {}))[e]) && c[0] === R) p = c[1];
                                else
                                    for (;
                                        (u = ++f && u && u[m] || (p = f = 0) || h.pop()) && ((s ? u.nodeName.toLowerCase() !== v : 1 !== u.nodeType) || !++p || (y && ((u[M] || (u[M] = {}))[e] = [R, p]), u !== t)););
                                return p -= a, p === i || p % i === 0 && p / i >= 0
                            }
                        }
                    },
                    PSEUDO: function(e, n) {
                        var a, r = k.pseudos[e] || k.setFilters[e.toLowerCase()] || t.error("unsupported pseudo: " + e);
                        return r[M] ? r(n) : r.length > 1 ? (a = [e, e, "", n], k.setFilters.hasOwnProperty(e.toLowerCase()) ? i(function(e, t) {
                            for (var i, a = r(e, n), o = a.length; o--;) i = ee(e, a[o]), e[i] = !(t[i] = a[o])
                        }) : function(e) {
                            return r(e, 0, a)
                        }) : r
                    }
                },
                pseudos: {
                    not: i(function(e) {
                        var t = [],
                            n = [],
                            a = T(e.replace(le, "$1"));
                        return a[M] ? i(function(e, t, n, i) {
                            for (var r, o = a(e, null, i, []), s = e.length; s--;)(r = o[s]) && (e[s] = !(t[s] = r))
                        }) : function(e, i, r) {
                            return t[0] = e, a(t, null, r, n), t[0] = null, !n.pop()
                        }
                    }),
                    has: i(function(e) {
                        return function(n) {
                            return t(e, n).length > 0
                        }
                    }),
                    contains: i(function(e) {
                        return e = e.replace(xe, ke),
                            function(t) {
                                return (t.textContent || t.innerText || S(t)).indexOf(e) > -1
                            }
                    }),
                    lang: i(function(e) {
                        return fe.test(e || "") || t.error("unsupported lang: " + e), e = e.replace(xe, ke).toLowerCase(),
                            function(t) {
                                var n;
                                do
                                    if (n = D ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang")) return n = n.toLowerCase(), n === e || 0 === n.indexOf(e + "-");
                                while ((t = t.parentNode) && 1 === t.nodeType);
                                return !1
                            }
                    }),
                    target: function(t) {
                        var n = e.location && e.location.hash;
                        return n && n.slice(1) === t.id
                    },
                    root: function(e) {
                        return e === I
                    },
                    focus: function(e) {
                        return e === j.activeElement && (!j.hasFocus || j.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
                    },
                    enabled: function(e) {
                        return e.disabled === !1
                    },
                    disabled: function(e) {
                        return e.disabled === !0
                    },
                    checked: function(e) {
                        var t = e.nodeName.toLowerCase();
                        return "input" === t && !!e.checked || "option" === t && !!e.selected
                    },
                    selected: function(e) {
                        return e.parentNode && e.parentNode.selectedIndex, e.selected === !0
                    },
                    empty: function(e) {
                        for (e = e.firstChild; e; e = e.nextSibling)
                            if (e.nodeType < 6) return !1;
                        return !0
                    },
                    parent: function(e) {
                        return !k.pseudos.empty(e)
                    },
                    header: function(e) {
                        return ge.test(e.nodeName)
                    },
                    input: function(e) {
                        return me.test(e.nodeName)
                    },
                    button: function(e) {
                        var t = e.nodeName.toLowerCase();
                        return "input" === t && "button" === e.type || "button" === t
                    },
                    text: function(e) {
                        var t;
                        return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase())
                    },
                    first: c(function() {
                        return [0]
                    }),
                    last: c(function(e, t) {
                        return [t - 1]
                    }),
                    eq: c(function(e, t, n) {
                        return [0 > n ? n + t : n]
                    }),
                    even: c(function(e, t) {
                        for (var n = 0; t > n; n += 2) e.push(n);
                        return e
                    }),
                    odd: c(function(e, t) {
                        for (var n = 1; t > n; n += 2) e.push(n);
                        return e
                    }),
                    lt: c(function(e, t, n) {
                        for (var i = 0 > n ? n + t : n; --i >= 0;) e.push(i);
                        return e
                    }),
                    gt: c(function(e, t, n) {
                        for (var i = 0 > n ? n + t : n; ++i < t;) e.push(i);
                        return e
                    })
                }
            }, k.pseudos.nth = k.pseudos.eq;
            for (w in {
                    radio: !0,
                    checkbox: !0,
                    file: !0,
                    password: !0,
                    image: !0
                }) k.pseudos[w] = s(w);
            for (w in {
                    submit: !0,
                    reset: !0
                }) k.pseudos[w] = l(w);
            return u.prototype = k.filters = k.pseudos, k.setFilters = new u, _ = t.tokenize = function(e, n) {
                var i, a, r, o, s, l, c, d = z[e + " "];
                if (d) return n ? 0 : d.slice(0);
                for (s = e, l = [], c = k.preFilter; s;) {
                    (!i || (a = ce.exec(s))) && (a && (s = s.slice(a[0].length) || s), l.push(r = [])), i = !1, (a = de.exec(s)) && (i = a.shift(), r.push({
                        value: i,
                        type: a[0].replace(le, " ")
                    }), s = s.slice(i.length));
                    for (o in k.filter) !(a = he[o].exec(s)) || c[o] && !(a = c[o](a)) || (i = a.shift(), r.push({
                        value: i,
                        type: o,
                        matches: a
                    }), s = s.slice(i.length));
                    if (!i) break
                }
                return n ? s.length : s ? t.error(e) : z(e, l).slice(0)
            }, T = t.compile = function(e, t) {
                var n, i = [],
                    a = [],
                    r = W[e + " "];
                if (!r) {
                    for (t || (t = _(e)), n = t.length; n--;) r = y(t[n]), r[M] ? i.push(r) : a.push(r);
                    r = W(e, b(a, i)), r.selector = e
                }
                return r
            }, $ = t.select = function(e, t, n, i) {
                var a, r, o, s, l, c = "function" == typeof e && e,
                    u = !i && _(e = c.selector || e);
                if (n = n || [], 1 === u.length) {
                    if (r = u[0] = u[0].slice(0), r.length > 2 && "ID" === (o = r[0]).type && x.getById && 9 === t.nodeType && D && k.relative[r[1].type]) {
                        if (t = (k.find.ID(o.matches[0].replace(xe, ke), t) || [])[0], !t) return n;
                        c && (t = t.parentNode), e = e.slice(r.shift().value.length)
                    }
                    for (a = he.needsContext.test(e) ? 0 : r.length; a-- && (o = r[a], !k.relative[s = o.type]);)
                        if ((l = k.find[s]) && (i = l(o.matches[0].replace(xe, ke), be.test(r[0].type) && d(t.parentNode) || t))) {
                            if (r.splice(a, 1), e = i.length && p(r), !e) return Y.apply(n, i), n;
                            break
                        }
                }
                return (c || T(e, u))(i, t, !D, n, be.test(e) && d(t.parentNode) || t), n
            }, x.sortStable = M.split("").sort(J).join("") === M, x.detectDuplicates = !!N, A(), x.sortDetached = a(function(e) {
                return 1 & e.compareDocumentPosition(j.createElement("div"))
            }), a(function(e) {
                return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href")
            }) || r("type|href|height|width", function(e, t, n) {
                return n ? void 0 : e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
            }), x.attributes && a(function(e) {
                return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value")
            }) || r("value", function(e, t, n) {
                return n || "input" !== e.nodeName.toLowerCase() ? void 0 : e.defaultValue
            }), a(function(e) {
                return null == e.getAttribute("disabled")
            }) || r(te, function(e, t, n) {
                var i;
                return n ? void 0 : e[t] === !0 ? t.toLowerCase() : (i = e.getAttributeNode(t)) && i.specified ? i.value : null
            }), t
        }(e);
        ae.find = ce, ae.expr = ce.selectors, ae.expr[":"] = ae.expr.pseudos, ae.unique = ce.uniqueSort, ae.text = ce.getText, ae.isXMLDoc = ce.isXML, ae.contains = ce.contains;
        var de = ae.expr.match.needsContext,
            ue = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
            pe = /^.[^:#\[\.,]*$/;
        ae.filter = function(e, t, n) {
            var i = t[0];
            return n && (e = ":not(" + e + ")"), 1 === t.length && 1 === i.nodeType ? ae.find.matchesSelector(i, e) ? [i] : [] : ae.find.matches(e, ae.grep(t, function(e) {
                return 1 === e.nodeType
            }))
        }, ae.fn.extend({
            find: function(e) {
                var t, n = [],
                    i = this,
                    a = i.length;
                if ("string" != typeof e) return this.pushStack(ae(e).filter(function() {
                    for (t = 0; a > t; t++)
                        if (ae.contains(i[t], this)) return !0
                }));
                for (t = 0; a > t; t++) ae.find(e, i[t], n);
                return n = this.pushStack(a > 1 ? ae.unique(n) : n), n.selector = this.selector ? this.selector + " " + e : e, n
            },
            filter: function(e) {
                return this.pushStack(i(this, e || [], !1))
            },
            not: function(e) {
                return this.pushStack(i(this, e || [], !0))
            },
            is: function(e) {
                return !!i(this, "string" == typeof e && de.test(e) ? ae(e) : e || [], !1).length
            }
        });
        var fe, he = e.document,
            me = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
            ge = ae.fn.init = function(e, t) {
                var n, i;
                if (!e) return this;
                if ("string" == typeof e) {
                    if (n = "<" === e.charAt(0) && ">" === e.charAt(e.length - 1) && e.length >= 3 ? [null, e, null] : me.exec(e), !n || !n[1] && t) return !t || t.jquery ? (t || fe).find(e) : this.constructor(t).find(e);
                    if (n[1]) {
                        if (t = t instanceof ae ? t[0] : t, ae.merge(this, ae.parseHTML(n[1], t && t.nodeType ? t.ownerDocument || t : he, !0)), ue.test(n[1]) && ae.isPlainObject(t))
                            for (n in t) ae.isFunction(this[n]) ? this[n](t[n]) : this.attr(n, t[n]);
                        return this
                    }
                    if (i = he.getElementById(n[2]), i && i.parentNode) {
                        if (i.id !== n[2]) return fe.find(e);
                        this.length = 1, this[0] = i
                    }
                    return this.context = he, this.selector = e, this
                }
                return e.nodeType ? (this.context = this[0] = e, this.length = 1, this) : ae.isFunction(e) ? "undefined" != typeof fe.ready ? fe.ready(e) : e(ae) : (void 0 !== e.selector && (this.selector = e.selector, this.context = e.context), ae.makeArray(e, this))
            };
        ge.prototype = ae.fn, fe = ae(he);
        var ve = /^(?:parents|prev(?:Until|All))/,
            ye = {
                children: !0,
                contents: !0,
                next: !0,
                prev: !0
            };
        ae.extend({
            dir: function(e, t, n) {
                for (var i = [], a = e[t]; a && 9 !== a.nodeType && (void 0 === n || 1 !== a.nodeType || !ae(a).is(n));) 1 === a.nodeType && i.push(a), a = a[t];
                return i
            },
            sibling: function(e, t) {
                for (var n = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && n.push(e);
                return n
            }
        }), ae.fn.extend({
            has: function(e) {
                var t, n = ae(e, this),
                    i = n.length;
                return this.filter(function() {
                    for (t = 0; i > t; t++)
                        if (ae.contains(this, n[t])) return !0
                })
            },
            closest: function(e, t) {
                for (var n, i = 0, a = this.length, r = [], o = de.test(e) || "string" != typeof e ? ae(e, t || this.context) : 0; a > i; i++)
                    for (n = this[i]; n && n !== t; n = n.parentNode)
                        if (n.nodeType < 11 && (o ? o.index(n) > -1 : 1 === n.nodeType && ae.find.matchesSelector(n, e))) {
                            r.push(n);
                            break
                        }
                return this.pushStack(r.length > 1 ? ae.unique(r) : r)
            },
            index: function(e) {
                return e ? "string" == typeof e ? ae.inArray(this[0], ae(e)) : ae.inArray(e.jquery ? e[0] : e, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
            },
            add: function(e, t) {
                return this.pushStack(ae.unique(ae.merge(this.get(), ae(e, t))))
            },
            addBack: function(e) {
                return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
            }
        }), ae.each({
            parent: function(e) {
                var t = e.parentNode;
                return t && 11 !== t.nodeType ? t : null
            },
            parents: function(e) {
                return ae.dir(e, "parentNode")
            },
            parentsUntil: function(e, t, n) {
                return ae.dir(e, "parentNode", n)
            },
            next: function(e) {
                return a(e, "nextSibling")
            },
            prev: function(e) {
                return a(e, "previousSibling")
            },
            nextAll: function(e) {
                return ae.dir(e, "nextSibling")
            },
            prevAll: function(e) {
                return ae.dir(e, "previousSibling")
            },
            nextUntil: function(e, t, n) {
                return ae.dir(e, "nextSibling", n)
            },
            prevUntil: function(e, t, n) {
                return ae.dir(e, "previousSibling", n)
            },
            siblings: function(e) {
                return ae.sibling((e.parentNode || {}).firstChild, e)
            },
            children: function(e) {
                return ae.sibling(e.firstChild)
            },
            contents: function(e) {
                return ae.nodeName(e, "iframe") ? e.contentDocument || e.contentWindow.document : ae.merge([], e.childNodes)
            }
        }, function(e, t) {
            ae.fn[e] = function(n, i) {
                var a = ae.map(this, t, n);
                return "Until" !== e.slice(-5) && (i = n), i && "string" == typeof i && (a = ae.filter(i, a)), this.length > 1 && (ye[e] || (a = ae.unique(a)), ve.test(e) && (a = a.reverse())), this.pushStack(a)
            }
        });
        var be = /\S+/g,
            we = {};
        ae.Callbacks = function(e) {
            e = "string" == typeof e ? we[e] || r(e) : ae.extend({}, e);
            var t, n, i, a, o, s, l = [],
                c = !e.once && [],
                d = function(r) {
                    for (n = e.memory && r, i = !0, o = s || 0, s = 0, a = l.length, t = !0; l && a > o; o++)
                        if (l[o].apply(r[0], r[1]) === !1 && e.stopOnFalse) {
                            n = !1;
                            break
                        }
                    t = !1, l && (c ? c.length && d(c.shift()) : n ? l = [] : u.disable())
                },
                u = {
                    add: function() {
                        if (l) {
                            var i = l.length;
                            ! function t(n) {
                                ae.each(n, function(n, i) {
                                    var a = ae.type(i);
                                    "function" === a ? e.unique && u.has(i) || l.push(i) : i && i.length && "string" !== a && t(i)
                                })
                            }(arguments), t ? a = l.length : n && (s = i, d(n))
                        }
                        return this
                    },
                    remove: function() {
                        return l && ae.each(arguments, function(e, n) {
                            for (var i;
                                (i = ae.inArray(n, l, i)) > -1;) l.splice(i, 1), t && (a >= i && a--, o >= i && o--)
                        }), this
                    },
                    has: function(e) {
                        return e ? ae.inArray(e, l) > -1 : !(!l || !l.length)
                    },
                    empty: function() {
                        return l = [], a = 0, this
                    },
                    disable: function() {
                        return l = c = n = void 0, this
                    },
                    disabled: function() {
                        return !l
                    },
                    lock: function() {
                        return c = void 0, n || u.disable(), this
                    },
                    locked: function() {
                        return !c
                    },
                    fireWith: function(e, n) {
                        return !l || i && !c || (n = n || [], n = [e, n.slice ? n.slice() : n], t ? c.push(n) : d(n)), this
                    },
                    fire: function() {
                        return u.fireWith(this, arguments), this
                    },
                    fired: function() {
                        return !!i
                    }
                };
            return u
        }, ae.extend({
            Deferred: function(e) {
                var t = [
                        ["resolve", "done", ae.Callbacks("once memory"), "resolved"],
                        ["reject", "fail", ae.Callbacks("once memory"), "rejected"],
                        ["notify", "progress", ae.Callbacks("memory")]
                    ],
                    n = "pending",
                    i = {
                        state: function() {
                            return n
                        },
                        always: function() {
                            return a.done(arguments).fail(arguments), this
                        },
                        then: function() {
                            var e = arguments;
                            return ae.Deferred(function(n) {
                                ae.each(t, function(t, r) {
                                    var o = ae.isFunction(e[t]) && e[t];
                                    a[r[1]](function() {
                                        var e = o && o.apply(this, arguments);
                                        e && ae.isFunction(e.promise) ? e.promise().done(n.resolve).fail(n.reject).progress(n.notify) : n[r[0] + "With"](this === i ? n.promise() : this, o ? [e] : arguments)
                                    })
                                }), e = null
                            }).promise()
                        },
                        promise: function(e) {
                            return null != e ? ae.extend(e, i) : i
                        }
                    },
                    a = {};
                return i.pipe = i.then, ae.each(t, function(e, r) {
                    var o = r[2],
                        s = r[3];
                    i[r[1]] = o.add, s && o.add(function() {
                        n = s
                    }, t[1 ^ e][2].disable, t[2][2].lock), a[r[0]] = function() {
                        return a[r[0] + "With"](this === a ? i : this, arguments), this
                    }, a[r[0] + "With"] = o.fireWith
                }), i.promise(a), e && e.call(a, a), a
            },
            when: function(e) {
                var t, n, i, a = 0,
                    r = X.call(arguments),
                    o = r.length,
                    s = 1 !== o || e && ae.isFunction(e.promise) ? o : 0,
                    l = 1 === s ? e : ae.Deferred(),
                    c = function(e, n, i) {
                        return function(a) {
                            n[e] = this, i[e] = arguments.length > 1 ? X.call(arguments) : a, i === t ? l.notifyWith(n, i) : --s || l.resolveWith(n, i)
                        }
                    };
                if (o > 1)
                    for (t = new Array(o), n = new Array(o), i = new Array(o); o > a; a++) r[a] && ae.isFunction(r[a].promise) ? r[a].promise().done(c(a, i, r)).fail(l.reject).progress(c(a, n, t)) : --s;
                return s || l.resolveWith(i, r), l.promise()
            }
        });
        var xe;
        ae.fn.ready = function(e) {
            return ae.ready.promise().done(e), this
        }, ae.extend({
            isReady: !1,
            readyWait: 1,
            holdReady: function(e) {
                e ? ae.readyWait++ : ae.ready(!0)
            },
            ready: function(e) {
                if (e === !0 ? !--ae.readyWait : !ae.isReady) {
                    if (!he.body) return setTimeout(ae.ready);
                    ae.isReady = !0, e !== !0 && --ae.readyWait > 0 || (xe.resolveWith(he, [ae]), ae.fn.triggerHandler && (ae(he).triggerHandler("ready"), ae(he).off("ready")))
                }
            }
        }), ae.ready.promise = function(t) {
            if (!xe)
                if (xe = ae.Deferred(), "complete" === he.readyState) setTimeout(ae.ready);
                else if (he.addEventListener) he.addEventListener("DOMContentLoaded", s, !1), e.addEventListener("load", s, !1);
            else {
                he.attachEvent("onreadystatechange", s), e.attachEvent("onload", s);
                var n = !1;
                try {
                    n = null == e.frameElement && he.documentElement
                } catch (e) {}
                n && n.doScroll && ! function e() {
                    if (!ae.isReady) {
                        try {
                            n.doScroll("left")
                        } catch (t) {
                            return setTimeout(e, 50)
                        }
                        o(), ae.ready()
                    }
                }()
            }
            return xe.promise(t)
        };
        var ke, Se = "undefined";
        for (ke in ae(ne)) break;
        ne.ownLast = "0" !== ke, ne.inlineBlockNeedsLayout = !1, ae(function() {
                var e, t, n, i;
                n = he.getElementsByTagName("body")[0], n && n.style && (t = he.createElement("div"), i = he.createElement("div"), i.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", n.appendChild(i).appendChild(t), typeof t.style.zoom !== Se && (t.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1", ne.inlineBlockNeedsLayout = e = 3 === t.offsetWidth, e && (n.style.zoom = 1)), n.removeChild(i))
            }),
            function() {
                var e = he.createElement("div");
                if (null == ne.deleteExpando) {
                    ne.deleteExpando = !0;
                    try {
                        delete e.test
                    } catch (e) {
                        ne.deleteExpando = !1
                    }
                }
                e = null
            }(), ae.acceptData = function(e) {
                var t = ae.noData[(e.nodeName + " ").toLowerCase()],
                    n = +e.nodeType || 1;
                return (1 === n || 9 === n) && (!t || t !== !0 && e.getAttribute("classid") === t)
            };
        var Le = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
            _e = /([A-Z])/g;
        ae.extend({
            cache: {},
            noData: {
                "applet ": !0,
                "embed ": !0,
                "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
            },
            hasData: function(e) {
                return e = e.nodeType ? ae.cache[e[ae.expando]] : e[ae.expando], !!e && !c(e)
            },
            data: function(e, t, n) {
                return d(e, t, n)
            },
            removeData: function(e, t) {
                return u(e, t)
            },
            _data: function(e, t, n) {
                return d(e, t, n, !0)
            },
            _removeData: function(e, t) {
                return u(e, t, !0)
            }
        }), ae.fn.extend({
            data: function(e, t) {
                var n, i, a, r = this[0],
                    o = r && r.attributes;
                if (void 0 === e) {
                    if (this.length && (a = ae.data(r), 1 === r.nodeType && !ae._data(r, "parsedAttrs"))) {
                        for (n = o.length; n--;) o[n] && (i = o[n].name, 0 === i.indexOf("data-") && (i = ae.camelCase(i.slice(5)), l(r, i, a[i])));
                        ae._data(r, "parsedAttrs", !0)
                    }
                    return a
                }
                return "object" == typeof e ? this.each(function() {
                    ae.data(this, e)
                }) : arguments.length > 1 ? this.each(function() {
                    ae.data(this, e, t)
                }) : r ? l(r, e, ae.data(r, e)) : void 0
            },
            removeData: function(e) {
                return this.each(function() {
                    ae.removeData(this, e)
                })
            }
        }), ae.extend({
            queue: function(e, t, n) {
                var i;
                return e ? (t = (t || "fx") + "queue", i = ae._data(e, t), n && (!i || ae.isArray(n) ? i = ae._data(e, t, ae.makeArray(n)) : i.push(n)), i || []) : void 0
            },
            dequeue: function(e, t) {
                t = t || "fx";
                var n = ae.queue(e, t),
                    i = n.length,
                    a = n.shift(),
                    r = ae._queueHooks(e, t),
                    o = function() {
                        ae.dequeue(e, t)
                    };
                "inprogress" === a && (a = n.shift(), i--), a && ("fx" === t && n.unshift("inprogress"), delete r.stop, a.call(e, o, r)), !i && r && r.empty.fire()
            },
            _queueHooks: function(e, t) {
                var n = t + "queueHooks";
                return ae._data(e, n) || ae._data(e, n, {
                    empty: ae.Callbacks("once memory").add(function() {
                        ae._removeData(e, t + "queue"), ae._removeData(e, n)
                    })
                })
            }
        }), ae.fn.extend({
            queue: function(e, t) {
                var n = 2;
                return "string" != typeof e && (t = e, e = "fx", n--), arguments.length < n ? ae.queue(this[0], e) : void 0 === t ? this : this.each(function() {
                    var n = ae.queue(this, e, t);
                    ae._queueHooks(this, e), "fx" === e && "inprogress" !== n[0] && ae.dequeue(this, e)
                })
            },
            dequeue: function(e) {
                return this.each(function() {
                    ae.dequeue(this, e)
                })
            },
            clearQueue: function(e) {
                return this.queue(e || "fx", [])
            },
            promise: function(e, t) {
                var n, i = 1,
                    a = ae.Deferred(),
                    r = this,
                    o = this.length,
                    s = function() {
                        --i || a.resolveWith(r, [r])
                    };
                for ("string" != typeof e && (t = e, e = void 0), e = e || "fx"; o--;) n = ae._data(r[o], e + "queueHooks"), n && n.empty && (i++, n.empty.add(s));
                return s(), a.promise(t)
            }
        });
        var Te = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
            $e = ["Top", "Right", "Bottom", "Left"],
            Ce = function(e, t) {
                return e = t || e, "none" === ae.css(e, "display") || !ae.contains(e.ownerDocument, e)
            },
            Ee = ae.access = function(e, t, n, i, a, r, o) {
                var s = 0,
                    l = e.length,
                    c = null == n;
                if ("object" === ae.type(n)) {
                    a = !0;
                    for (s in n) ae.access(e, t, s, n[s], !0, r, o)
                } else if (void 0 !== i && (a = !0, ae.isFunction(i) || (o = !0), c && (o ? (t.call(e, i), t = null) : (c = t, t = function(e, t, n) {
                        return c.call(ae(e), n)
                    })), t))
                    for (; l > s; s++) t(e[s], n, o ? i : i.call(e[s], s, t(e[s], n)));
                return a ? e : c ? t.call(e) : l ? t(e[0], n) : r
            },
            Ne = /^(?:checkbox|radio)$/i;
        ! function() {
            var e = he.createElement("input"),
                t = he.createElement("div"),
                n = he.createDocumentFragment();
            if (t.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", ne.leadingWhitespace = 3 === t.firstChild.nodeType, ne.tbody = !t.getElementsByTagName("tbody").length, ne.htmlSerialize = !!t.getElementsByTagName("link").length, ne.html5Clone = "<:nav></:nav>" !== he.createElement("nav").cloneNode(!0).outerHTML, e.type = "checkbox", e.checked = !0, n.appendChild(e), ne.appendChecked = e.checked, t.innerHTML = "<textarea>x</textarea>", ne.noCloneChecked = !!t.cloneNode(!0).lastChild.defaultValue, n.appendChild(t), t.innerHTML = "<input type='radio' checked='checked' name='t'/>", ne.checkClone = t.cloneNode(!0).cloneNode(!0).lastChild.checked, ne.noCloneEvent = !0, t.attachEvent && (t.attachEvent("onclick", function() {
                    ne.noCloneEvent = !1
                }), t.cloneNode(!0).click()), null == ne.deleteExpando) {
                ne.deleteExpando = !0;
                try {
                    delete t.test
                } catch (e) {
                    ne.deleteExpando = !1
                }
            }
        }(),
        function() {
            var t, n, i = he.createElement("div");
            for (t in {
                    submit: !0,
                    change: !0,
                    focusin: !0
                }) n = "on" + t, (ne[t + "Bubbles"] = n in e) || (i.setAttribute(n, "t"), ne[t + "Bubbles"] = i.attributes[n].expando === !1);
            i = null
        }();
        var Ae = /^(?:input|select|textarea)$/i,
            je = /^key/,
            Ie = /^(?:mouse|pointer|contextmenu)|click/,
            De = /^(?:focusinfocus|focusoutblur)$/,
            He = /^([^.]*)(?:\.(.+)|)$/;
        ae.event = {
            global: {},
            add: function(e, t, n, i, a) {
                var r, o, s, l, c, d, u, p, f, h, m, g = ae._data(e);
                if (g) {
                    for (n.handler && (l = n, n = l.handler, a = l.selector), n.guid || (n.guid = ae.guid++), (o = g.events) || (o = g.events = {}), (d = g.handle) || (d = g.handle = function(e) {
                            return typeof ae === Se || e && ae.event.triggered === e.type ? void 0 : ae.event.dispatch.apply(d.elem, arguments)
                        }, d.elem = e), t = (t || "").match(be) || [""], s = t.length; s--;) r = He.exec(t[s]) || [], f = m = r[1], h = (r[2] || "").split(".").sort(), f && (c = ae.event.special[f] || {}, f = (a ? c.delegateType : c.bindType) || f, c = ae.event.special[f] || {}, u = ae.extend({
                        type: f,
                        origType: m,
                        data: i,
                        handler: n,
                        guid: n.guid,
                        selector: a,
                        needsContext: a && ae.expr.match.needsContext.test(a),
                        namespace: h.join(".")
                    }, l), (p = o[f]) || (p = o[f] = [], p.delegateCount = 0, c.setup && c.setup.call(e, i, h, d) !== !1 || (e.addEventListener ? e.addEventListener(f, d, !1) : e.attachEvent && e.attachEvent("on" + f, d))), c.add && (c.add.call(e, u), u.handler.guid || (u.handler.guid = n.guid)), a ? p.splice(p.delegateCount++, 0, u) : p.push(u), ae.event.global[f] = !0);
                    e = null
                }
            },
            remove: function(e, t, n, i, a) {
                var r, o, s, l, c, d, u, p, f, h, m, g = ae.hasData(e) && ae._data(e);
                if (g && (d = g.events)) {
                    for (t = (t || "").match(be) || [""], c = t.length; c--;)
                        if (s = He.exec(t[c]) || [], f = m = s[1], h = (s[2] || "").split(".").sort(), f) {
                            for (u = ae.event.special[f] || {}, f = (i ? u.delegateType : u.bindType) || f, p = d[f] || [], s = s[2] && new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"), l = r = p.length; r--;) o = p[r], !a && m !== o.origType || n && n.guid !== o.guid || s && !s.test(o.namespace) || i && i !== o.selector && ("**" !== i || !o.selector) || (p.splice(r, 1), o.selector && p.delegateCount--, u.remove && u.remove.call(e, o));
                            l && !p.length && (u.teardown && u.teardown.call(e, h, g.handle) !== !1 || ae.removeEvent(e, f, g.handle), delete d[f])
                        } else
                            for (f in d) ae.event.remove(e, f + t[c], n, i, !0);
                    ae.isEmptyObject(d) && (delete g.handle, ae._removeData(e, "events"))
                }
            },
            trigger: function(t, n, i, a) {
                var r, o, s, l, c, d, u, p = [i || he],
                    f = te.call(t, "type") ? t.type : t,
                    h = te.call(t, "namespace") ? t.namespace.split(".") : [];
                if (s = d = i = i || he, 3 !== i.nodeType && 8 !== i.nodeType && !De.test(f + ae.event.triggered) && (f.indexOf(".") >= 0 && (h = f.split("."), f = h.shift(), h.sort()), o = f.indexOf(":") < 0 && "on" + f, t = t[ae.expando] ? t : new ae.Event(f, "object" == typeof t && t), t.isTrigger = a ? 2 : 3, t.namespace = h.join("."), t.namespace_re = t.namespace ? new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, t.result = void 0, t.target || (t.target = i), n = null == n ? [t] : ae.makeArray(n, [t]), c = ae.event.special[f] || {}, a || !c.trigger || c.trigger.apply(i, n) !== !1)) {
                    if (!a && !c.noBubble && !ae.isWindow(i)) {
                        for (l = c.delegateType || f, De.test(l + f) || (s = s.parentNode); s; s = s.parentNode) p.push(s), d = s;
                        d === (i.ownerDocument || he) && p.push(d.defaultView || d.parentWindow || e)
                    }
                    for (u = 0;
                        (s = p[u++]) && !t.isPropagationStopped();) t.type = u > 1 ? l : c.bindType || f, r = (ae._data(s, "events") || {})[t.type] && ae._data(s, "handle"), r && r.apply(s, n), r = o && s[o], r && r.apply && ae.acceptData(s) && (t.result = r.apply(s, n), t.result === !1 && t.preventDefault());
                    if (t.type = f, !a && !t.isDefaultPrevented() && (!c._default || c._default.apply(p.pop(), n) === !1) && ae.acceptData(i) && o && i[f] && !ae.isWindow(i)) {
                        d = i[o], d && (i[o] = null), ae.event.triggered = f;
                        try {
                            i[f]()
                        } catch (e) {}
                        ae.event.triggered = void 0, d && (i[o] = d)
                    }
                    return t.result
                }
            },
            dispatch: function(e) {
                e = ae.event.fix(e);
                var t, n, i, a, r, o = [],
                    s = X.call(arguments),
                    l = (ae._data(this, "events") || {})[e.type] || [],
                    c = ae.event.special[e.type] || {};
                if (s[0] = e, e.delegateTarget = this, !c.preDispatch || c.preDispatch.call(this, e) !== !1) {
                    for (o = ae.event.handlers.call(this, e, l), t = 0;
                        (a = o[t++]) && !e.isPropagationStopped();)
                        for (e.currentTarget = a.elem, r = 0;
                            (i = a.handlers[r++]) && !e.isImmediatePropagationStopped();)(!e.namespace_re || e.namespace_re.test(i.namespace)) && (e.handleObj = i, e.data = i.data, n = ((ae.event.special[i.origType] || {}).handle || i.handler).apply(a.elem, s), void 0 !== n && (e.result = n) === !1 && (e.preventDefault(), e.stopPropagation()));
                    return c.postDispatch && c.postDispatch.call(this, e), e.result
                }
            },
            handlers: function(e, t) {
                var n, i, a, r, o = [],
                    s = t.delegateCount,
                    l = e.target;
                if (s && l.nodeType && (!e.button || "click" !== e.type))
                    for (; l != this; l = l.parentNode || this)
                        if (1 === l.nodeType && (l.disabled !== !0 || "click" !== e.type)) {
                            for (a = [], r = 0; s > r; r++) i = t[r], n = i.selector + " ", void 0 === a[n] && (a[n] = i.needsContext ? ae(n, this).index(l) >= 0 : ae.find(n, this, null, [l]).length), a[n] && a.push(i);
                            a.length && o.push({
                                elem: l,
                                handlers: a
                            })
                        }
                return s < t.length && o.push({
                    elem: this,
                    handlers: t.slice(s)
                }), o
            },
            fix: function(e) {
                if (e[ae.expando]) return e;
                var t, n, i, a = e.type,
                    r = e,
                    o = this.fixHooks[a];
                for (o || (this.fixHooks[a] = o = Ie.test(a) ? this.mouseHooks : je.test(a) ? this.keyHooks : {}), i = o.props ? this.props.concat(o.props) : this.props, e = new ae.Event(r),
                    t = i.length; t--;) n = i[t], e[n] = r[n];
                return e.target || (e.target = r.srcElement || he), 3 === e.target.nodeType && (e.target = e.target.parentNode), e.metaKey = !!e.metaKey, o.filter ? o.filter(e, r) : e
            },
            props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
            fixHooks: {},
            keyHooks: {
                props: "char charCode key keyCode".split(" "),
                filter: function(e, t) {
                    return null == e.which && (e.which = null != t.charCode ? t.charCode : t.keyCode), e
                }
            },
            mouseHooks: {
                props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
                filter: function(e, t) {
                    var n, i, a, r = t.button,
                        o = t.fromElement;
                    return null == e.pageX && null != t.clientX && (i = e.target.ownerDocument || he, a = i.documentElement, n = i.body, e.pageX = t.clientX + (a && a.scrollLeft || n && n.scrollLeft || 0) - (a && a.clientLeft || n && n.clientLeft || 0), e.pageY = t.clientY + (a && a.scrollTop || n && n.scrollTop || 0) - (a && a.clientTop || n && n.clientTop || 0)), !e.relatedTarget && o && (e.relatedTarget = o === e.target ? t.toElement : o), e.which || void 0 === r || (e.which = 1 & r ? 1 : 2 & r ? 3 : 4 & r ? 2 : 0), e
                }
            },
            special: {
                load: {
                    noBubble: !0
                },
                focus: {
                    trigger: function() {
                        if (this !== h() && this.focus) try {
                            return this.focus(), !1
                        } catch (e) {}
                    },
                    delegateType: "focusin"
                },
                blur: {
                    trigger: function() {
                        return this === h() && this.blur ? (this.blur(), !1) : void 0
                    },
                    delegateType: "focusout"
                },
                click: {
                    trigger: function() {
                        return ae.nodeName(this, "input") && "checkbox" === this.type && this.click ? (this.click(), !1) : void 0
                    },
                    _default: function(e) {
                        return ae.nodeName(e.target, "a")
                    }
                },
                beforeunload: {
                    postDispatch: function(e) {
                        void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result)
                    }
                }
            },
            simulate: function(e, t, n, i) {
                var a = ae.extend(new ae.Event, n, {
                    type: e,
                    isSimulated: !0,
                    originalEvent: {}
                });
                i ? ae.event.trigger(a, null, t) : ae.event.dispatch.call(t, a), a.isDefaultPrevented() && n.preventDefault()
            }
        }, ae.removeEvent = he.removeEventListener ? function(e, t, n) {
            e.removeEventListener && e.removeEventListener(t, n, !1)
        } : function(e, t, n) {
            var i = "on" + t;
            e.detachEvent && (typeof e[i] === Se && (e[i] = null), e.detachEvent(i, n))
        }, ae.Event = function(e, t) {
            return this instanceof ae.Event ? (e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && e.returnValue === !1 ? p : f) : this.type = e, t && ae.extend(this, t), this.timeStamp = e && e.timeStamp || ae.now(), void(this[ae.expando] = !0)) : new ae.Event(e, t)
        }, ae.Event.prototype = {
            isDefaultPrevented: f,
            isPropagationStopped: f,
            isImmediatePropagationStopped: f,
            preventDefault: function() {
                var e = this.originalEvent;
                this.isDefaultPrevented = p, e && (e.preventDefault ? e.preventDefault() : e.returnValue = !1)
            },
            stopPropagation: function() {
                var e = this.originalEvent;
                this.isPropagationStopped = p, e && (e.stopPropagation && e.stopPropagation(), e.cancelBubble = !0)
            },
            stopImmediatePropagation: function() {
                var e = this.originalEvent;
                this.isImmediatePropagationStopped = p, e && e.stopImmediatePropagation && e.stopImmediatePropagation(), this.stopPropagation()
            }
        }, ae.each({
            mouseenter: "mouseover",
            mouseleave: "mouseout",
            pointerenter: "pointerover",
            pointerleave: "pointerout"
        }, function(e, t) {
            ae.event.special[e] = {
                delegateType: t,
                bindType: t,
                handle: function(e) {
                    var n, i = this,
                        a = e.relatedTarget,
                        r = e.handleObj;
                    return (!a || a !== i && !ae.contains(i, a)) && (e.type = r.origType, n = r.handler.apply(this, arguments), e.type = t), n
                }
            }
        }), ne.submitBubbles || (ae.event.special.submit = {
            setup: function() {
                return !ae.nodeName(this, "form") && void ae.event.add(this, "click._submit keypress._submit", function(e) {
                    var t = e.target,
                        n = ae.nodeName(t, "input") || ae.nodeName(t, "button") ? t.form : void 0;
                    n && !ae._data(n, "submitBubbles") && (ae.event.add(n, "submit._submit", function(e) {
                        e._submit_bubble = !0
                    }), ae._data(n, "submitBubbles", !0))
                })
            },
            postDispatch: function(e) {
                e._submit_bubble && (delete e._submit_bubble, this.parentNode && !e.isTrigger && ae.event.simulate("submit", this.parentNode, e, !0))
            },
            teardown: function() {
                return !ae.nodeName(this, "form") && void ae.event.remove(this, "._submit")
            }
        }), ne.changeBubbles || (ae.event.special.change = {
            setup: function() {
                return Ae.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (ae.event.add(this, "propertychange._change", function(e) {
                    "checked" === e.originalEvent.propertyName && (this._just_changed = !0)
                }), ae.event.add(this, "click._change", function(e) {
                    this._just_changed && !e.isTrigger && (this._just_changed = !1), ae.event.simulate("change", this, e, !0)
                })), !1) : void ae.event.add(this, "beforeactivate._change", function(e) {
                    var t = e.target;
                    Ae.test(t.nodeName) && !ae._data(t, "changeBubbles") && (ae.event.add(t, "change._change", function(e) {
                        !this.parentNode || e.isSimulated || e.isTrigger || ae.event.simulate("change", this.parentNode, e, !0)
                    }), ae._data(t, "changeBubbles", !0))
                })
            },
            handle: function(e) {
                var t = e.target;
                return this !== t || e.isSimulated || e.isTrigger || "radio" !== t.type && "checkbox" !== t.type ? e.handleObj.handler.apply(this, arguments) : void 0
            },
            teardown: function() {
                return ae.event.remove(this, "._change"), !Ae.test(this.nodeName)
            }
        }), ne.focusinBubbles || ae.each({
            focus: "focusin",
            blur: "focusout"
        }, function(e, t) {
            var n = function(e) {
                ae.event.simulate(t, e.target, ae.event.fix(e), !0)
            };
            ae.event.special[t] = {
                setup: function() {
                    var i = this.ownerDocument || this,
                        a = ae._data(i, t);
                    a || i.addEventListener(e, n, !0), ae._data(i, t, (a || 0) + 1)
                },
                teardown: function() {
                    var i = this.ownerDocument || this,
                        a = ae._data(i, t) - 1;
                    a ? ae._data(i, t, a) : (i.removeEventListener(e, n, !0), ae._removeData(i, t))
                }
            }
        }), ae.fn.extend({
            on: function(e, t, n, i, a) {
                var r, o;
                if ("object" == typeof e) {
                    "string" != typeof t && (n = n || t, t = void 0);
                    for (r in e) this.on(r, t, n, e[r], a);
                    return this
                }
                if (null == n && null == i ? (i = t, n = t = void 0) : null == i && ("string" == typeof t ? (i = n, n = void 0) : (i = n, n = t, t = void 0)), i === !1) i = f;
                else if (!i) return this;
                return 1 === a && (o = i, i = function(e) {
                    return ae().off(e), o.apply(this, arguments)
                }, i.guid = o.guid || (o.guid = ae.guid++)), this.each(function() {
                    ae.event.add(this, e, i, n, t)
                })
            },
            one: function(e, t, n, i) {
                return this.on(e, t, n, i, 1)
            },
            off: function(e, t, n) {
                var i, a;
                if (e && e.preventDefault && e.handleObj) return i = e.handleObj, ae(e.delegateTarget).off(i.namespace ? i.origType + "." + i.namespace : i.origType, i.selector, i.handler), this;
                if ("object" == typeof e) {
                    for (a in e) this.off(a, t, e[a]);
                    return this
                }
                return (t === !1 || "function" == typeof t) && (n = t, t = void 0), n === !1 && (n = f), this.each(function() {
                    ae.event.remove(this, e, n, t)
                })
            },
            trigger: function(e, t) {
                return this.each(function() {
                    ae.event.trigger(e, t, this)
                })
            },
            triggerHandler: function(e, t) {
                var n = this[0];
                return n ? ae.event.trigger(e, t, n, !0) : void 0
            }
        });
        var Oe = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
            qe = / jQuery\d+="(?:null|\d+)"/g,
            Pe = new RegExp("<(?:" + Oe + ")[\\s/>]", "i"),
            Me = /^\s+/,
            Be = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
            Re = /<([\w:]+)/,
            Fe = /<tbody/i,
            Ue = /<|&#?\w+;/,
            ze = /<(?:script|style|link)/i,
            We = /checked\s*(?:[^=]|=\s*.checked.)/i,
            Je = /^$|\/(?:java|ecma)script/i,
            Ge = /^true\/(.*)/,
            Ve = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
            Xe = {
                option: [1, "<select multiple='multiple'>", "</select>"],
                legend: [1, "<fieldset>", "</fieldset>"],
                area: [1, "<map>", "</map>"],
                param: [1, "<object>", "</object>"],
                thead: [1, "<table>", "</table>"],
                tr: [2, "<table><tbody>", "</tbody></table>"],
                col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
                td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
                _default: ne.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
            },
            Qe = m(he),
            Ke = Qe.appendChild(he.createElement("div"));
        Xe.optgroup = Xe.option, Xe.tbody = Xe.tfoot = Xe.colgroup = Xe.caption = Xe.thead, Xe.th = Xe.td, ae.extend({
            clone: function(e, t, n) {
                var i, a, r, o, s, l = ae.contains(e.ownerDocument, e);
                if (ne.html5Clone || ae.isXMLDoc(e) || !Pe.test("<" + e.nodeName + ">") ? r = e.cloneNode(!0) : (Ke.innerHTML = e.outerHTML, Ke.removeChild(r = Ke.firstChild)), !(ne.noCloneEvent && ne.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || ae.isXMLDoc(e)))
                    for (i = g(r), s = g(e), o = 0; null != (a = s[o]); ++o) i[o] && S(a, i[o]);
                if (t)
                    if (n)
                        for (s = s || g(e), i = i || g(r), o = 0; null != (a = s[o]); o++) k(a, i[o]);
                    else k(e, r);
                return i = g(r, "script"), i.length > 0 && x(i, !l && g(e, "script")), i = s = a = null, r
            },
            buildFragment: function(e, t, n, i) {
                for (var a, r, o, s, l, c, d, u = e.length, p = m(t), f = [], h = 0; u > h; h++)
                    if (r = e[h], r || 0 === r)
                        if ("object" === ae.type(r)) ae.merge(f, r.nodeType ? [r] : r);
                        else if (Ue.test(r)) {
                    for (s = s || p.appendChild(t.createElement("div")), l = (Re.exec(r) || ["", ""])[1].toLowerCase(), d = Xe[l] || Xe._default, s.innerHTML = d[1] + r.replace(Be, "<$1></$2>") + d[2], a = d[0]; a--;) s = s.lastChild;
                    if (!ne.leadingWhitespace && Me.test(r) && f.push(t.createTextNode(Me.exec(r)[0])), !ne.tbody)
                        for (r = "table" !== l || Fe.test(r) ? "<table>" !== d[1] || Fe.test(r) ? 0 : s : s.firstChild, a = r && r.childNodes.length; a--;) ae.nodeName(c = r.childNodes[a], "tbody") && !c.childNodes.length && r.removeChild(c);
                    for (ae.merge(f, s.childNodes), s.textContent = ""; s.firstChild;) s.removeChild(s.firstChild);
                    s = p.lastChild
                } else f.push(t.createTextNode(r));
                for (s && p.removeChild(s), ne.appendChecked || ae.grep(g(f, "input"), v), h = 0; r = f[h++];)
                    if ((!i || -1 === ae.inArray(r, i)) && (o = ae.contains(r.ownerDocument, r), s = g(p.appendChild(r), "script"), o && x(s), n))
                        for (a = 0; r = s[a++];) Je.test(r.type || "") && n.push(r);
                return s = null, p
            },
            cleanData: function(e, t) {
                for (var n, i, a, r, o = 0, s = ae.expando, l = ae.cache, c = ne.deleteExpando, d = ae.event.special; null != (n = e[o]); o++)
                    if ((t || ae.acceptData(n)) && (a = n[s], r = a && l[a])) {
                        if (r.events)
                            for (i in r.events) d[i] ? ae.event.remove(n, i) : ae.removeEvent(n, i, r.handle);
                        l[a] && (delete l[a], c ? delete n[s] : typeof n.removeAttribute !== Se ? n.removeAttribute(s) : n[s] = null, V.push(a))
                    }
            }
        }), ae.fn.extend({
            text: function(e) {
                return Ee(this, function(e) {
                    return void 0 === e ? ae.text(this) : this.empty().append((this[0] && this[0].ownerDocument || he).createTextNode(e))
                }, null, e, arguments.length)
            },
            append: function() {
                return this.domManip(arguments, function(e) {
                    if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                        var t = y(this, e);
                        t.appendChild(e)
                    }
                })
            },
            prepend: function() {
                return this.domManip(arguments, function(e) {
                    if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                        var t = y(this, e);
                        t.insertBefore(e, t.firstChild)
                    }
                })
            },
            before: function() {
                return this.domManip(arguments, function(e) {
                    this.parentNode && this.parentNode.insertBefore(e, this)
                })
            },
            after: function() {
                return this.domManip(arguments, function(e) {
                    this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
                })
            },
            remove: function(e, t) {
                for (var n, i = e ? ae.filter(e, this) : this, a = 0; null != (n = i[a]); a++) t || 1 !== n.nodeType || ae.cleanData(g(n)), n.parentNode && (t && ae.contains(n.ownerDocument, n) && x(g(n, "script")), n.parentNode.removeChild(n));
                return this
            },
            empty: function() {
                for (var e, t = 0; null != (e = this[t]); t++) {
                    for (1 === e.nodeType && ae.cleanData(g(e, !1)); e.firstChild;) e.removeChild(e.firstChild);
                    e.options && ae.nodeName(e, "select") && (e.options.length = 0)
                }
                return this
            },
            clone: function(e, t) {
                return e = null != e && e, t = null == t ? e : t, this.map(function() {
                    return ae.clone(this, e, t)
                })
            },
            html: function(e) {
                return Ee(this, function(e) {
                    var t = this[0] || {},
                        n = 0,
                        i = this.length;
                    if (void 0 === e) return 1 === t.nodeType ? t.innerHTML.replace(qe, "") : void 0;
                    if (!("string" != typeof e || ze.test(e) || !ne.htmlSerialize && Pe.test(e) || !ne.leadingWhitespace && Me.test(e) || Xe[(Re.exec(e) || ["", ""])[1].toLowerCase()])) {
                        e = e.replace(Be, "<$1></$2>");
                        try {
                            for (; i > n; n++) t = this[n] || {}, 1 === t.nodeType && (ae.cleanData(g(t, !1)), t.innerHTML = e);
                            t = 0
                        } catch (e) {}
                    }
                    t && this.empty().append(e)
                }, null, e, arguments.length)
            },
            replaceWith: function() {
                var e = arguments[0];
                return this.domManip(arguments, function(t) {
                    e = this.parentNode, ae.cleanData(g(this)), e && e.replaceChild(t, this)
                }), e && (e.length || e.nodeType) ? this : this.remove()
            },
            detach: function(e) {
                return this.remove(e, !0)
            },
            domManip: function(e, t) {
                e = Q.apply([], e);
                var n, i, a, r, o, s, l = 0,
                    c = this.length,
                    d = this,
                    u = c - 1,
                    p = e[0],
                    f = ae.isFunction(p);
                if (f || c > 1 && "string" == typeof p && !ne.checkClone && We.test(p)) return this.each(function(n) {
                    var i = d.eq(n);
                    f && (e[0] = p.call(this, n, i.html())), i.domManip(e, t)
                });
                if (c && (s = ae.buildFragment(e, this[0].ownerDocument, !1, this), n = s.firstChild, 1 === s.childNodes.length && (s = n), n)) {
                    for (r = ae.map(g(s, "script"), b), a = r.length; c > l; l++) i = s, l !== u && (i = ae.clone(i, !0, !0), a && ae.merge(r, g(i, "script"))), t.call(this[l], i, l);
                    if (a)
                        for (o = r[r.length - 1].ownerDocument, ae.map(r, w), l = 0; a > l; l++) i = r[l], Je.test(i.type || "") && !ae._data(i, "globalEval") && ae.contains(o, i) && (i.src ? ae._evalUrl && ae._evalUrl(i.src) : ae.globalEval((i.text || i.textContent || i.innerHTML || "").replace(Ve, "")));
                    s = n = null
                }
                return this
            }
        }), ae.each({
            appendTo: "append",
            prependTo: "prepend",
            insertBefore: "before",
            insertAfter: "after",
            replaceAll: "replaceWith"
        }, function(e, t) {
            ae.fn[e] = function(e) {
                for (var n, i = 0, a = [], r = ae(e), o = r.length - 1; o >= i; i++) n = i === o ? this : this.clone(!0), ae(r[i])[t](n), K.apply(a, n.get());
                return this.pushStack(a)
            }
        });
        var Ye, Ze = {};
        ! function() {
            var e;
            ne.shrinkWrapBlocks = function() {
                if (null != e) return e;
                e = !1;
                var t, n, i;
                return n = he.getElementsByTagName("body")[0], n && n.style ? (t = he.createElement("div"), i = he.createElement("div"), i.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", n.appendChild(i).appendChild(t), typeof t.style.zoom !== Se && (t.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1", t.appendChild(he.createElement("div")).style.width = "5px", e = 3 !== t.offsetWidth), n.removeChild(i), e) : void 0
            }
        }();
        var et, tt, nt = /^margin/,
            it = new RegExp("^(" + Te + ")(?!px)[a-z%]+$", "i"),
            at = /^(top|right|bottom|left)$/;
        e.getComputedStyle ? (et = function(t) {
            return t.ownerDocument.defaultView.opener ? t.ownerDocument.defaultView.getComputedStyle(t, null) : e.getComputedStyle(t, null)
        }, tt = function(e, t, n) {
            var i, a, r, o, s = e.style;
            return n = n || et(e), o = n ? n.getPropertyValue(t) || n[t] : void 0, n && ("" !== o || ae.contains(e.ownerDocument, e) || (o = ae.style(e, t)), it.test(o) && nt.test(t) && (i = s.width, a = s.minWidth, r = s.maxWidth, s.minWidth = s.maxWidth = s.width = o, o = n.width, s.width = i, s.minWidth = a, s.maxWidth = r)), void 0 === o ? o : o + ""
        }) : he.documentElement.currentStyle && (et = function(e) {
            return e.currentStyle
        }, tt = function(e, t, n) {
            var i, a, r, o, s = e.style;
            return n = n || et(e), o = n ? n[t] : void 0, null == o && s && s[t] && (o = s[t]), it.test(o) && !at.test(t) && (i = s.left, a = e.runtimeStyle, r = a && a.left, r && (a.left = e.currentStyle.left), s.left = "fontSize" === t ? "1em" : o, o = s.pixelLeft + "px", s.left = i, r && (a.left = r)), void 0 === o ? o : o + "" || "auto"
        }), ! function() {
            function t() {
                var t, n, i, a;
                n = he.getElementsByTagName("body")[0], n && n.style && (t = he.createElement("div"), i = he.createElement("div"), i.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", n.appendChild(i).appendChild(t), t.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute", r = o = !1, l = !0, e.getComputedStyle && (r = "1%" !== (e.getComputedStyle(t, null) || {}).top, o = "4px" === (e.getComputedStyle(t, null) || {
                    width: "4px"
                }).width, a = t.appendChild(he.createElement("div")), a.style.cssText = t.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", a.style.marginRight = a.style.width = "0", t.style.width = "1px", l = !parseFloat((e.getComputedStyle(a, null) || {}).marginRight), t.removeChild(a)), t.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", a = t.getElementsByTagName("td"), a[0].style.cssText = "margin:0;border:0;padding:0;display:none", s = 0 === a[0].offsetHeight, s && (a[0].style.display = "", a[1].style.display = "none", s = 0 === a[0].offsetHeight), n.removeChild(i))
            }
            var n, i, a, r, o, s, l;
            n = he.createElement("div"), n.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", a = n.getElementsByTagName("a")[0], (i = a && a.style) && (i.cssText = "float:left;opacity:.5", ne.opacity = "0.5" === i.opacity, ne.cssFloat = !!i.cssFloat, n.style.backgroundClip = "content-box", n.cloneNode(!0).style.backgroundClip = "", ne.clearCloneStyle = "content-box" === n.style.backgroundClip, ne.boxSizing = "" === i.boxSizing || "" === i.MozBoxSizing || "" === i.WebkitBoxSizing, ae.extend(ne, {
                reliableHiddenOffsets: function() {
                    return null == s && t(), s
                },
                boxSizingReliable: function() {
                    return null == o && t(), o
                },
                pixelPosition: function() {
                    return null == r && t(), r
                },
                reliableMarginRight: function() {
                    return null == l && t(), l
                }
            }))
        }(), ae.swap = function(e, t, n, i) {
            var a, r, o = {};
            for (r in t) o[r] = e.style[r], e.style[r] = t[r];
            a = n.apply(e, i || []);
            for (r in t) e.style[r] = o[r];
            return a
        };
        var rt = /alpha\([^)]*\)/i,
            ot = /opacity\s*=\s*([^)]*)/,
            st = /^(none|table(?!-c[ea]).+)/,
            lt = new RegExp("^(" + Te + ")(.*)$", "i"),
            ct = new RegExp("^([+-])=(" + Te + ")", "i"),
            dt = {
                position: "absolute",
                visibility: "hidden",
                display: "block"
            },
            ut = {
                letterSpacing: "0",
                fontWeight: "400"
            },
            pt = ["Webkit", "O", "Moz", "ms"];
        ae.extend({
            cssHooks: {
                opacity: {
                    get: function(e, t) {
                        if (t) {
                            var n = tt(e, "opacity");
                            return "" === n ? "1" : n
                        }
                    }
                }
            },
            cssNumber: {
                columnCount: !0,
                fillOpacity: !0,
                flexGrow: !0,
                flexShrink: !0,
                fontWeight: !0,
                lineHeight: !0,
                opacity: !0,
                order: !0,
                orphans: !0,
                widows: !0,
                zIndex: !0,
                zoom: !0
            },
            cssProps: {
                "float": ne.cssFloat ? "cssFloat" : "styleFloat"
            },
            style: function(e, t, n, i) {
                if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                    var a, r, o, s = ae.camelCase(t),
                        l = e.style;
                    if (t = ae.cssProps[s] || (ae.cssProps[s] = $(l, s)), o = ae.cssHooks[t] || ae.cssHooks[s], void 0 === n) return o && "get" in o && void 0 !== (a = o.get(e, !1, i)) ? a : l[t];
                    if (r = typeof n, "string" === r && (a = ct.exec(n)) && (n = (a[1] + 1) * a[2] + parseFloat(ae.css(e, t)), r = "number"), null != n && n === n && ("number" !== r || ae.cssNumber[s] || (n += "px"), ne.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (l[t] = "inherit"), !(o && "set" in o && void 0 === (n = o.set(e, n, i))))) try {
                        l[t] = n
                    } catch (e) {}
                }
            },
            css: function(e, t, n, i) {
                var a, r, o, s = ae.camelCase(t);
                return t = ae.cssProps[s] || (ae.cssProps[s] = $(e.style, s)), o = ae.cssHooks[t] || ae.cssHooks[s], o && "get" in o && (r = o.get(e, !0, n)), void 0 === r && (r = tt(e, t, i)), "normal" === r && t in ut && (r = ut[t]), "" === n || n ? (a = parseFloat(r), n === !0 || ae.isNumeric(a) ? a || 0 : r) : r
            }
        }), ae.each(["height", "width"], function(e, t) {
            ae.cssHooks[t] = {
                get: function(e, n, i) {
                    return n ? st.test(ae.css(e, "display")) && 0 === e.offsetWidth ? ae.swap(e, dt, function() {
                        return A(e, t, i)
                    }) : A(e, t, i) : void 0
                },
                set: function(e, n, i) {
                    var a = i && et(e);
                    return E(e, n, i ? N(e, t, i, ne.boxSizing && "border-box" === ae.css(e, "boxSizing", !1, a), a) : 0)
                }
            }
        }), ne.opacity || (ae.cssHooks.opacity = {
            get: function(e, t) {
                return ot.test((t && e.currentStyle ? e.currentStyle.filter : e.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : t ? "1" : ""
            },
            set: function(e, t) {
                var n = e.style,
                    i = e.currentStyle,
                    a = ae.isNumeric(t) ? "alpha(opacity=" + 100 * t + ")" : "",
                    r = i && i.filter || n.filter || "";
                n.zoom = 1, (t >= 1 || "" === t) && "" === ae.trim(r.replace(rt, "")) && n.removeAttribute && (n.removeAttribute("filter"), "" === t || i && !i.filter) || (n.filter = rt.test(r) ? r.replace(rt, a) : r + " " + a)
            }
        }), ae.cssHooks.marginRight = T(ne.reliableMarginRight, function(e, t) {
            return t ? ae.swap(e, {
                display: "inline-block"
            }, tt, [e, "marginRight"]) : void 0
        }), ae.each({
            margin: "",
            padding: "",
            border: "Width"
        }, function(e, t) {
            ae.cssHooks[e + t] = {
                expand: function(n) {
                    for (var i = 0, a = {}, r = "string" == typeof n ? n.split(" ") : [n]; 4 > i; i++) a[e + $e[i] + t] = r[i] || r[i - 2] || r[0];
                    return a
                }
            }, nt.test(e) || (ae.cssHooks[e + t].set = E)
        }), ae.fn.extend({
            css: function(e, t) {
                return Ee(this, function(e, t, n) {
                    var i, a, r = {},
                        o = 0;
                    if (ae.isArray(t)) {
                        for (i = et(e), a = t.length; a > o; o++) r[t[o]] = ae.css(e, t[o], !1, i);
                        return r
                    }
                    return void 0 !== n ? ae.style(e, t, n) : ae.css(e, t)
                }, e, t, arguments.length > 1)
            },
            show: function() {
                return C(this, !0)
            },
            hide: function() {
                return C(this)
            },
            toggle: function(e) {
                return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function() {
                    Ce(this) ? ae(this).show() : ae(this).hide()
                })
            }
        }), ae.Tween = j, j.prototype = {
            constructor: j,
            init: function(e, t, n, i, a, r) {
                this.elem = e, this.prop = n, this.easing = a || "swing", this.options = t, this.start = this.now = this.cur(), this.end = i, this.unit = r || (ae.cssNumber[n] ? "" : "px")
            },
            cur: function() {
                var e = j.propHooks[this.prop];
                return e && e.get ? e.get(this) : j.propHooks._default.get(this)
            },
            run: function(e) {
                var t, n = j.propHooks[this.prop];
                return this.options.duration ? this.pos = t = ae.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : j.propHooks._default.set(this), this
            }
        }, j.prototype.init.prototype = j.prototype, j.propHooks = {
            _default: {
                get: function(e) {
                    var t;
                    return null == e.elem[e.prop] || e.elem.style && null != e.elem.style[e.prop] ? (t = ae.css(e.elem, e.prop, ""), t && "auto" !== t ? t : 0) : e.elem[e.prop]
                },
                set: function(e) {
                    ae.fx.step[e.prop] ? ae.fx.step[e.prop](e) : e.elem.style && (null != e.elem.style[ae.cssProps[e.prop]] || ae.cssHooks[e.prop]) ? ae.style(e.elem, e.prop, e.now + e.unit) : e.elem[e.prop] = e.now
                }
            }
        }, j.propHooks.scrollTop = j.propHooks.scrollLeft = {
            set: function(e) {
                e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
            }
        }, ae.easing = {
            linear: function(e) {
                return e
            },
            swing: function(e) {
                return .5 - Math.cos(e * Math.PI) / 2
            }
        }, ae.fx = j.prototype.init, ae.fx.step = {};
        var ft, ht, mt = /^(?:toggle|show|hide)$/,
            gt = new RegExp("^(?:([+-])=|)(" + Te + ")([a-z%]*)$", "i"),
            vt = /queueHooks$/,
            yt = [O],
            bt = {
                "*": [function(e, t) {
                    var n = this.createTween(e, t),
                        i = n.cur(),
                        a = gt.exec(t),
                        r = a && a[3] || (ae.cssNumber[e] ? "" : "px"),
                        o = (ae.cssNumber[e] || "px" !== r && +i) && gt.exec(ae.css(n.elem, e)),
                        s = 1,
                        l = 20;
                    if (o && o[3] !== r) {
                        r = r || o[3], a = a || [], o = +i || 1;
                        do s = s || ".5", o /= s, ae.style(n.elem, e, o + r); while (s !== (s = n.cur() / i) && 1 !== s && --l)
                    }
                    return a && (o = n.start = +o || +i || 0, n.unit = r, n.end = a[1] ? o + (a[1] + 1) * a[2] : +a[2]), n
                }]
            };
        ae.Animation = ae.extend(P, {
                tweener: function(e, t) {
                    ae.isFunction(e) ? (t = e, e = ["*"]) : e = e.split(" ");
                    for (var n, i = 0, a = e.length; a > i; i++) n = e[i], bt[n] = bt[n] || [], bt[n].unshift(t)
                },
                prefilter: function(e, t) {
                    t ? yt.unshift(e) : yt.push(e)
                }
            }), ae.speed = function(e, t, n) {
                var i = e && "object" == typeof e ? ae.extend({}, e) : {
                    complete: n || !n && t || ae.isFunction(e) && e,
                    duration: e,
                    easing: n && t || t && !ae.isFunction(t) && t
                };
                return i.duration = ae.fx.off ? 0 : "number" == typeof i.duration ? i.duration : i.duration in ae.fx.speeds ? ae.fx.speeds[i.duration] : ae.fx.speeds._default, (null == i.queue || i.queue === !0) && (i.queue = "fx"), i.old = i.complete, i.complete = function() {
                    ae.isFunction(i.old) && i.old.call(this), i.queue && ae.dequeue(this, i.queue)
                }, i
            }, ae.fn.extend({
                fadeTo: function(e, t, n, i) {
                    return this.filter(Ce).css("opacity", 0).show().end().animate({
                        opacity: t
                    }, e, n, i)
                },
                animate: function(e, t, n, i) {
                    var a = ae.isEmptyObject(e),
                        r = ae.speed(t, n, i),
                        o = function() {
                            var t = P(this, ae.extend({}, e), r);
                            (a || ae._data(this, "finish")) && t.stop(!0)
                        };
                    return o.finish = o, a || r.queue === !1 ? this.each(o) : this.queue(r.queue, o)
                },
                stop: function(e, t, n) {
                    var i = function(e) {
                        var t = e.stop;
                        delete e.stop, t(n)
                    };
                    return "string" != typeof e && (n = t, t = e, e = void 0), t && e !== !1 && this.queue(e || "fx", []), this.each(function() {
                        var t = !0,
                            a = null != e && e + "queueHooks",
                            r = ae.timers,
                            o = ae._data(this);
                        if (a) o[a] && o[a].stop && i(o[a]);
                        else
                            for (a in o) o[a] && o[a].stop && vt.test(a) && i(o[a]);
                        for (a = r.length; a--;) r[a].elem !== this || null != e && r[a].queue !== e || (r[a].anim.stop(n), t = !1, r.splice(a, 1));
                        (t || !n) && ae.dequeue(this, e)
                    })
                },
                finish: function(e) {
                    return e !== !1 && (e = e || "fx"), this.each(function() {
                        var t, n = ae._data(this),
                            i = n[e + "queue"],
                            a = n[e + "queueHooks"],
                            r = ae.timers,
                            o = i ? i.length : 0;
                        for (n.finish = !0, ae.queue(this, e, []), a && a.stop && a.stop.call(this, !0), t = r.length; t--;) r[t].elem === this && r[t].queue === e && (r[t].anim.stop(!0), r.splice(t, 1));
                        for (t = 0; o > t; t++) i[t] && i[t].finish && i[t].finish.call(this);
                        delete n.finish
                    })
                }
            }), ae.each(["toggle", "show", "hide"], function(e, t) {
                var n = ae.fn[t];
                ae.fn[t] = function(e, i, a) {
                    return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(D(t, !0), e, i, a)
                }
            }), ae.each({
                slideDown: D("show"),
                slideUp: D("hide"),
                slideToggle: D("toggle"),
                fadeIn: {
                    opacity: "show"
                },
                fadeOut: {
                    opacity: "hide"
                },
                fadeToggle: {
                    opacity: "toggle"
                }
            }, function(e, t) {
                ae.fn[e] = function(e, n, i) {
                    return this.animate(t, e, n, i)
                }
            }), ae.timers = [], ae.fx.tick = function() {
                var e, t = ae.timers,
                    n = 0;
                for (ft = ae.now(); n < t.length; n++) e = t[n], e() || t[n] !== e || t.splice(n--, 1);
                t.length || ae.fx.stop(), ft = void 0
            }, ae.fx.timer = function(e) {
                ae.timers.push(e), e() ? ae.fx.start() : ae.timers.pop()
            }, ae.fx.interval = 13, ae.fx.start = function() {
                ht || (ht = setInterval(ae.fx.tick, ae.fx.interval))
            }, ae.fx.stop = function() {
                clearInterval(ht), ht = null
            }, ae.fx.speeds = {
                slow: 600,
                fast: 200,
                _default: 400
            }, ae.fn.delay = function(e, t) {
                return e = ae.fx ? ae.fx.speeds[e] || e : e, t = t || "fx", this.queue(t, function(t, n) {
                    var i = setTimeout(t, e);
                    n.stop = function() {
                        clearTimeout(i)
                    }
                })
            },
            function() {
                var e, t, n, i, a;
                t = he.createElement("div"), t.setAttribute("className", "t"), t.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", i = t.getElementsByTagName("a")[0], n = he.createElement("select"), a = n.appendChild(he.createElement("option")), e = t.getElementsByTagName("input")[0], i.style.cssText = "top:1px", ne.getSetAttribute = "t" !== t.className, ne.style = /top/.test(i.getAttribute("style")), ne.hrefNormalized = "/a" === i.getAttribute("href"), ne.checkOn = !!e.value, ne.optSelected = a.selected, ne.enctype = !!he.createElement("form").enctype, n.disabled = !0, ne.optDisabled = !a.disabled, e = he.createElement("input"), e.setAttribute("value", ""), ne.input = "" === e.getAttribute("value"), e.value = "t", e.setAttribute("type", "radio"), ne.radioValue = "t" === e.value
            }();
        var wt = /\r/g;
        ae.fn.extend({
            val: function(e) {
                var t, n, i, a = this[0];
                return arguments.length ? (i = ae.isFunction(e), this.each(function(n) {
                    var a;
                    1 === this.nodeType && (a = i ? e.call(this, n, ae(this).val()) : e, null == a ? a = "" : "number" == typeof a ? a += "" : ae.isArray(a) && (a = ae.map(a, function(e) {
                        return null == e ? "" : e + ""
                    })), t = ae.valHooks[this.type] || ae.valHooks[this.nodeName.toLowerCase()], t && "set" in t && void 0 !== t.set(this, a, "value") || (this.value = a))
                })) : a ? (t = ae.valHooks[a.type] || ae.valHooks[a.nodeName.toLowerCase()], t && "get" in t && void 0 !== (n = t.get(a, "value")) ? n : (n = a.value, "string" == typeof n ? n.replace(wt, "") : null == n ? "" : n)) : void 0
            }
        }), ae.extend({
            valHooks: {
                option: {
                    get: function(e) {
                        var t = ae.find.attr(e, "value");
                        return null != t ? t : ae.trim(ae.text(e))
                    }
                },
                select: {
                    get: function(e) {
                        for (var t, n, i = e.options, a = e.selectedIndex, r = "select-one" === e.type || 0 > a, o = r ? null : [], s = r ? a + 1 : i.length, l = 0 > a ? s : r ? a : 0; s > l; l++)
                            if (n = i[l], !(!n.selected && l !== a || (ne.optDisabled ? n.disabled : null !== n.getAttribute("disabled")) || n.parentNode.disabled && ae.nodeName(n.parentNode, "optgroup"))) {
                                if (t = ae(n).val(), r) return t;
                                o.push(t)
                            }
                        return o
                    },
                    set: function(e, t) {
                        for (var n, i, a = e.options, r = ae.makeArray(t), o = a.length; o--;)
                            if (i = a[o], ae.inArray(ae.valHooks.option.get(i), r) >= 0) try {
                                i.selected = n = !0
                            } catch (e) {
                                i.scrollHeight
                            } else i.selected = !1;
                        return n || (e.selectedIndex = -1), a
                    }
                }
            }
        }), ae.each(["radio", "checkbox"], function() {
            ae.valHooks[this] = {
                set: function(e, t) {
                    return ae.isArray(t) ? e.checked = ae.inArray(ae(e).val(), t) >= 0 : void 0
                }
            }, ne.checkOn || (ae.valHooks[this].get = function(e) {
                return null === e.getAttribute("value") ? "on" : e.value
            })
        });
        var xt, kt, St = ae.expr.attrHandle,
            Lt = /^(?:checked|selected)$/i,
            _t = ne.getSetAttribute,
            Tt = ne.input;
        ae.fn.extend({
            attr: function(e, t) {
                return Ee(this, ae.attr, e, t, arguments.length > 1)
            },
            removeAttr: function(e) {
                return this.each(function() {
                    ae.removeAttr(this, e)
                })
            }
        }), ae.extend({
            attr: function(e, t, n) {
                var i, a, r = e.nodeType;
                if (e && 3 !== r && 8 !== r && 2 !== r) return typeof e.getAttribute === Se ? ae.prop(e, t, n) : (1 === r && ae.isXMLDoc(e) || (t = t.toLowerCase(), i = ae.attrHooks[t] || (ae.expr.match.bool.test(t) ? kt : xt)), void 0 === n ? i && "get" in i && null !== (a = i.get(e, t)) ? a : (a = ae.find.attr(e, t), null == a ? void 0 : a) : null !== n ? i && "set" in i && void 0 !== (a = i.set(e, n, t)) ? a : (e.setAttribute(t, n + ""), n) : void ae.removeAttr(e, t))
            },
            removeAttr: function(e, t) {
                var n, i, a = 0,
                    r = t && t.match(be);
                if (r && 1 === e.nodeType)
                    for (; n = r[a++];) i = ae.propFix[n] || n, ae.expr.match.bool.test(n) ? Tt && _t || !Lt.test(n) ? e[i] = !1 : e[ae.camelCase("default-" + n)] = e[i] = !1 : ae.attr(e, n, ""), e.removeAttribute(_t ? n : i)
            },
            attrHooks: {
                type: {
                    set: function(e, t) {
                        if (!ne.radioValue && "radio" === t && ae.nodeName(e, "input")) {
                            var n = e.value;
                            return e.setAttribute("type", t), n && (e.value = n), t
                        }
                    }
                }
            }
        }), kt = {
            set: function(e, t, n) {
                return t === !1 ? ae.removeAttr(e, n) : Tt && _t || !Lt.test(n) ? e.setAttribute(!_t && ae.propFix[n] || n, n) : e[ae.camelCase("default-" + n)] = e[n] = !0, n
            }
        }, ae.each(ae.expr.match.bool.source.match(/\w+/g), function(e, t) {
            var n = St[t] || ae.find.attr;
            St[t] = Tt && _t || !Lt.test(t) ? function(e, t, i) {
                var a, r;
                return i || (r = St[t], St[t] = a, a = null != n(e, t, i) ? t.toLowerCase() : null, St[t] = r), a
            } : function(e, t, n) {
                return n ? void 0 : e[ae.camelCase("default-" + t)] ? t.toLowerCase() : null
            }
        }), Tt && _t || (ae.attrHooks.value = {
            set: function(e, t, n) {
                return ae.nodeName(e, "input") ? void(e.defaultValue = t) : xt && xt.set(e, t, n)
            }
        }), _t || (xt = {
            set: function(e, t, n) {
                var i = e.getAttributeNode(n);
                return i || e.setAttributeNode(i = e.ownerDocument.createAttribute(n)), i.value = t += "", "value" === n || t === e.getAttribute(n) ? t : void 0
            }
        }, St.id = St.name = St.coords = function(e, t, n) {
            var i;
            return n ? void 0 : (i = e.getAttributeNode(t)) && "" !== i.value ? i.value : null
        }, ae.valHooks.button = {
            get: function(e, t) {
                var n = e.getAttributeNode(t);
                return n && n.specified ? n.value : void 0
            },
            set: xt.set
        }, ae.attrHooks.contenteditable = {
            set: function(e, t, n) {
                xt.set(e, "" !== t && t, n)
            }
        }, ae.each(["width", "height"], function(e, t) {
            ae.attrHooks[t] = {
                set: function(e, n) {
                    return "" === n ? (e.setAttribute(t, "auto"), n) : void 0
                }
            }
        })), ne.style || (ae.attrHooks.style = {
            get: function(e) {
                return e.style.cssText || void 0
            },
            set: function(e, t) {
                return e.style.cssText = t + ""
            }
        });
        var $t = /^(?:input|select|textarea|button|object)$/i,
            Ct = /^(?:a|area)$/i;
        ae.fn.extend({
            prop: function(e, t) {
                return Ee(this, ae.prop, e, t, arguments.length > 1)
            },
            removeProp: function(e) {
                return e = ae.propFix[e] || e, this.each(function() {
                    try {
                        this[e] = void 0, delete this[e]
                    } catch (e) {}
                })
            }
        }), ae.extend({
            propFix: {
                "for": "htmlFor",
                "class": "className"
            },
            prop: function(e, t, n) {
                var i, a, r, o = e.nodeType;
                if (e && 3 !== o && 8 !== o && 2 !== o) return r = 1 !== o || !ae.isXMLDoc(e), r && (t = ae.propFix[t] || t, a = ae.propHooks[t]), void 0 !== n ? a && "set" in a && void 0 !== (i = a.set(e, n, t)) ? i : e[t] = n : a && "get" in a && null !== (i = a.get(e, t)) ? i : e[t]
            },
            propHooks: {
                tabIndex: {
                    get: function(e) {
                        var t = ae.find.attr(e, "tabindex");
                        return t ? parseInt(t, 10) : $t.test(e.nodeName) || Ct.test(e.nodeName) && e.href ? 0 : -1
                    }
                }
            }
        }), ne.hrefNormalized || ae.each(["href", "src"], function(e, t) {
            ae.propHooks[t] = {
                get: function(e) {
                    return e.getAttribute(t, 4)
                }
            }
        }), ne.optSelected || (ae.propHooks.selected = {
            get: function(e) {
                var t = e.parentNode;
                return t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex), null
            }
        }), ae.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
            ae.propFix[this.toLowerCase()] = this
        }), ne.enctype || (ae.propFix.enctype = "encoding");
        var Et = /[\t\r\n\f]/g;
        ae.fn.extend({
            addClass: function(e) {
                var t, n, i, a, r, o, s = 0,
                    l = this.length,
                    c = "string" == typeof e && e;
                if (ae.isFunction(e)) return this.each(function(t) {
                    ae(this).addClass(e.call(this, t, this.className))
                });
                if (c)
                    for (t = (e || "").match(be) || []; l > s; s++)
                        if (n = this[s], i = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(Et, " ") : " ")) {
                            for (r = 0; a = t[r++];) i.indexOf(" " + a + " ") < 0 && (i += a + " ");
                            o = ae.trim(i), n.className !== o && (n.className = o)
                        }
                return this
            },
            removeClass: function(e) {
                var t, n, i, a, r, o, s = 0,
                    l = this.length,
                    c = 0 === arguments.length || "string" == typeof e && e;
                if (ae.isFunction(e)) return this.each(function(t) {
                    ae(this).removeClass(e.call(this, t, this.className))
                });
                if (c)
                    for (t = (e || "").match(be) || []; l > s; s++)
                        if (n = this[s], i = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(Et, " ") : "")) {
                            for (r = 0; a = t[r++];)
                                for (; i.indexOf(" " + a + " ") >= 0;) i = i.replace(" " + a + " ", " ");
                            o = e ? ae.trim(i) : "", n.className !== o && (n.className = o)
                        }
                return this
            },
            toggleClass: function(e, t) {
                var n = typeof e;
                return "boolean" == typeof t && "string" === n ? t ? this.addClass(e) : this.removeClass(e) : this.each(ae.isFunction(e) ? function(n) {
                    ae(this).toggleClass(e.call(this, n, this.className, t), t)
                } : function() {
                    if ("string" === n)
                        for (var t, i = 0, a = ae(this), r = e.match(be) || []; t = r[i++];) a.hasClass(t) ? a.removeClass(t) : a.addClass(t);
                    else(n === Se || "boolean" === n) && (this.className && ae._data(this, "__className__", this.className), this.className = this.className || e === !1 ? "" : ae._data(this, "__className__") || "")
                })
            },
            hasClass: function(e) {
                for (var t = " " + e + " ", n = 0, i = this.length; i > n; n++)
                    if (1 === this[n].nodeType && (" " + this[n].className + " ").replace(Et, " ").indexOf(t) >= 0) return !0;
                return !1
            }
        }), ae.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(e, t) {
            ae.fn[t] = function(e, n) {
                return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
            }
        }), ae.fn.extend({
            hover: function(e, t) {
                return this.mouseenter(e).mouseleave(t || e)
            },
            bind: function(e, t, n) {
                return this.on(e, null, t, n)
            },
            unbind: function(e, t) {
                return this.off(e, null, t)
            },
            delegate: function(e, t, n, i) {
                return this.on(t, e, n, i)
            },
            undelegate: function(e, t, n) {
                return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
            }
        });
        var Nt = ae.now(),
            At = /\?/,
            jt = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
        ae.parseJSON = function(t) {
            if (e.JSON && e.JSON.parse) return e.JSON.parse(t + "");
            var n, i = null,
                a = ae.trim(t + "");
            return a && !ae.trim(a.replace(jt, function(e, t, a, r) {
                return n && t && (i = 0), 0 === i ? e : (n = a || t, i += !r - !a, "")
            })) ? Function("return " + a)() : ae.error("Invalid JSON: " + t)
        }, ae.parseXML = function(t) {
            var n, i;
            if (!t || "string" != typeof t) return null;
            try {
                e.DOMParser ? (i = new DOMParser, n = i.parseFromString(t, "text/xml")) : (n = new ActiveXObject("Microsoft.XMLDOM"), n.async = "false", n.loadXML(t))
            } catch (e) {
                n = void 0
            }
            return n && n.documentElement && !n.getElementsByTagName("parsererror").length || ae.error("Invalid XML: " + t), n
        };
        var It, Dt, Ht = /#.*$/,
            Ot = /([?&])_=[^&]*/,
            qt = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
            Pt = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
            Mt = /^(?:GET|HEAD)$/,
            Bt = /^\/\//,
            Rt = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
            Ft = {},
            Ut = {},
            zt = "*/".concat("*");
        try {
            Dt = location.href
        } catch (e) {
            Dt = he.createElement("a"), Dt.href = "", Dt = Dt.href
        }
        It = Rt.exec(Dt.toLowerCase()) || [], ae.extend({
            active: 0,
            lastModified: {},
            etag: {},
            ajaxSettings: {
                url: Dt,
                type: "GET",
                isLocal: Pt.test(It[1]),
                global: !0,
                processData: !0,
                async: !0,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                accepts: {
                    "*": zt,
                    text: "text/plain",
                    html: "text/html",
                    xml: "application/xml, text/xml",
                    json: "application/json, text/javascript"
                },
                contents: {
                    xml: /xml/,
                    html: /html/,
                    json: /json/
                },
                responseFields: {
                    xml: "responseXML",
                    text: "responseText",
                    json: "responseJSON"
                },
                converters: {
                    "* text": String,
                    "text html": !0,
                    "text json": ae.parseJSON,
                    "text xml": ae.parseXML
                },
                flatOptions: {
                    url: !0,
                    context: !0
                }
            },
            ajaxSetup: function(e, t) {
                return t ? R(R(e, ae.ajaxSettings), t) : R(ae.ajaxSettings, e)
            },
            ajaxPrefilter: M(Ft),
            ajaxTransport: M(Ut),
            ajax: function(e, t) {
                function n(e, t, n, i) {
                    var a, d, v, y, w, k = t;
                    2 !== b && (b = 2, s && clearTimeout(s), c = void 0, o = i || "", x.readyState = e > 0 ? 4 : 0, a = e >= 200 && 300 > e || 304 === e, n && (y = F(u, x, n)), y = U(u, y, x, a), a ? (u.ifModified && (w = x.getResponseHeader("Last-Modified"), w && (ae.lastModified[r] = w), w = x.getResponseHeader("etag"), w && (ae.etag[r] = w)), 204 === e || "HEAD" === u.type ? k = "nocontent" : 304 === e ? k = "notmodified" : (k = y.state, d = y.data, v = y.error, a = !v)) : (v = k, (e || !k) && (k = "error", 0 > e && (e = 0))), x.status = e, x.statusText = (t || k) + "", a ? h.resolveWith(p, [d, k, x]) : h.rejectWith(p, [x, k, v]), x.statusCode(g), g = void 0, l && f.trigger(a ? "ajaxSuccess" : "ajaxError", [x, u, a ? d : v]), m.fireWith(p, [x, k]), l && (f.trigger("ajaxComplete", [x, u]), --ae.active || ae.event.trigger("ajaxStop")))
                }
                "object" == typeof e && (t = e, e = void 0), t = t || {};
                var i, a, r, o, s, l, c, d, u = ae.ajaxSetup({}, t),
                    p = u.context || u,
                    f = u.context && (p.nodeType || p.jquery) ? ae(p) : ae.event,
                    h = ae.Deferred(),
                    m = ae.Callbacks("once memory"),
                    g = u.statusCode || {},
                    v = {},
                    y = {},
                    b = 0,
                    w = "canceled",
                    x = {
                        readyState: 0,
                        getResponseHeader: function(e) {
                            var t;
                            if (2 === b) {
                                if (!d)
                                    for (d = {}; t = qt.exec(o);) d[t[1].toLowerCase()] = t[2];
                                t = d[e.toLowerCase()]
                            }
                            return null == t ? null : t
                        },
                        getAllResponseHeaders: function() {
                            return 2 === b ? o : null
                        },
                        setRequestHeader: function(e, t) {
                            var n = e.toLowerCase();
                            return b || (e = y[n] = y[n] || e, v[e] = t), this
                        },
                        overrideMimeType: function(e) {
                            return b || (u.mimeType = e), this
                        },
                        statusCode: function(e) {
                            var t;
                            if (e)
                                if (2 > b)
                                    for (t in e) g[t] = [g[t], e[t]];
                                else x.always(e[x.status]);
                            return this
                        },
                        abort: function(e) {
                            var t = e || w;
                            return c && c.abort(t), n(0, t), this
                        }
                    };
                if (h.promise(x).complete = m.add, x.success = x.done, x.error = x.fail, u.url = ((e || u.url || Dt) + "").replace(Ht, "").replace(Bt, It[1] + "//"), u.type = t.method || t.type || u.method || u.type, u.dataTypes = ae.trim(u.dataType || "*").toLowerCase().match(be) || [""], null == u.crossDomain && (i = Rt.exec(u.url.toLowerCase()), u.crossDomain = !(!i || i[1] === It[1] && i[2] === It[2] && (i[3] || ("http:" === i[1] ? "80" : "443")) === (It[3] || ("http:" === It[1] ? "80" : "443")))), u.data && u.processData && "string" != typeof u.data && (u.data = ae.param(u.data, u.traditional)), B(Ft, u, t, x), 2 === b) return x;
                l = ae.event && u.global, l && 0 === ae.active++ && ae.event.trigger("ajaxStart"), u.type = u.type.toUpperCase(), u.hasContent = !Mt.test(u.type), r = u.url, u.hasContent || (u.data && (r = u.url += (At.test(r) ? "&" : "?") + u.data, delete u.data), u.cache === !1 && (u.url = Ot.test(r) ? r.replace(Ot, "$1_=" + Nt++) : r + (At.test(r) ? "&" : "?") + "_=" + Nt++)), u.ifModified && (ae.lastModified[r] && x.setRequestHeader("If-Modified-Since", ae.lastModified[r]), ae.etag[r] && x.setRequestHeader("If-None-Match", ae.etag[r])), (u.data && u.hasContent && u.contentType !== !1 || t.contentType) && x.setRequestHeader("Content-Type", u.contentType), x.setRequestHeader("Accept", u.dataTypes[0] && u.accepts[u.dataTypes[0]] ? u.accepts[u.dataTypes[0]] + ("*" !== u.dataTypes[0] ? ", " + zt + "; q=0.01" : "") : u.accepts["*"]);
                for (a in u.headers) x.setRequestHeader(a, u.headers[a]);
                if (u.beforeSend && (u.beforeSend.call(p, x, u) === !1 || 2 === b)) return x.abort();
                w = "abort";
                for (a in {
                        success: 1,
                        error: 1,
                        complete: 1
                    }) x[a](u[a]);
                if (c = B(Ut, u, t, x)) {
                    x.readyState = 1, l && f.trigger("ajaxSend", [x, u]), u.async && u.timeout > 0 && (s = setTimeout(function() {
                        x.abort("timeout")
                    }, u.timeout));
                    try {
                        b = 1, c.send(v, n)
                    } catch (e) {
                        if (!(2 > b)) throw e;
                        n(-1, e)
                    }
                } else n(-1, "No Transport");
                return x
            },
            getJSON: function(e, t, n) {
                return ae.get(e, t, n, "json")
            },
            getScript: function(e, t) {
                return ae.get(e, void 0, t, "script")
            }
        }), ae.each(["get", "post"], function(e, t) {
            ae[t] = function(e, n, i, a) {
                return ae.isFunction(n) && (a = a || i, i = n, n = void 0), ae.ajax({
                    url: e,
                    type: t,
                    dataType: a,
                    data: n,
                    success: i
                })
            }
        }), ae._evalUrl = function(e) {
            return ae.ajax({
                url: e,
                type: "GET",
                dataType: "script",
                async: !1,
                global: !1,
                "throws": !0
            })
        }, ae.fn.extend({
            wrapAll: function(e) {
                if (ae.isFunction(e)) return this.each(function(t) {
                    ae(this).wrapAll(e.call(this, t))
                });
                if (this[0]) {
                    var t = ae(e, this[0].ownerDocument).eq(0).clone(!0);
                    this[0].parentNode && t.insertBefore(this[0]), t.map(function() {
                        for (var e = this; e.firstChild && 1 === e.firstChild.nodeType;) e = e.firstChild;
                        return e
                    }).append(this)
                }
                return this
            },
            wrapInner: function(e) {
                return this.each(ae.isFunction(e) ? function(t) {
                    ae(this).wrapInner(e.call(this, t))
                } : function() {
                    var t = ae(this),
                        n = t.contents();
                    n.length ? n.wrapAll(e) : t.append(e)
                })
            },
            wrap: function(e) {
                var t = ae.isFunction(e);
                return this.each(function(n) {
                    ae(this).wrapAll(t ? e.call(this, n) : e)
                })
            },
            unwrap: function() {
                return this.parent().each(function() {
                    ae.nodeName(this, "body") || ae(this).replaceWith(this.childNodes)
                }).end()
            }
        }), ae.expr.filters.hidden = function(e) {
            return e.offsetWidth <= 0 && e.offsetHeight <= 0 || !ne.reliableHiddenOffsets() && "none" === (e.style && e.style.display || ae.css(e, "display"))
        }, ae.expr.filters.visible = function(e) {
            return !ae.expr.filters.hidden(e)
        };
        var Wt = /%20/g,
            Jt = /\[\]$/,
            Gt = /\r?\n/g,
            Vt = /^(?:submit|button|image|reset|file)$/i,
            Xt = /^(?:input|select|textarea|keygen)/i;
        ae.param = function(e, t) {
            var n, i = [],
                a = function(e, t) {
                    t = ae.isFunction(t) ? t() : null == t ? "" : t, i[i.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
                };
            if (void 0 === t && (t = ae.ajaxSettings && ae.ajaxSettings.traditional), ae.isArray(e) || e.jquery && !ae.isPlainObject(e)) ae.each(e, function() {
                a(this.name, this.value)
            });
            else
                for (n in e) z(n, e[n], t, a);
            return i.join("&").replace(Wt, "+")
        }, ae.fn.extend({
            serialize: function() {
                return ae.param(this.serializeArray())
            },
            serializeArray: function() {
                return this.map(function() {
                    var e = ae.prop(this, "elements");
                    return e ? ae.makeArray(e) : this
                }).filter(function() {
                    var e = this.type;
                    return this.name && !ae(this).is(":disabled") && Xt.test(this.nodeName) && !Vt.test(e) && (this.checked || !Ne.test(e))
                }).map(function(e, t) {
                    var n = ae(this).val();
                    return null == n ? null : ae.isArray(n) ? ae.map(n, function(e) {
                        return {
                            name: t.name,
                            value: e.replace(Gt, "\r\n")
                        }
                    }) : {
                        name: t.name,
                        value: n.replace(Gt, "\r\n")
                    }
                }).get()
            }
        }), ae.ajaxSettings.xhr = void 0 !== e.ActiveXObject ? function() {
            return !this.isLocal && /^(get|post|head|put|delete|options)$/i.test(this.type) && W() || J()
        } : W;
        var Qt = 0,
            Kt = {},
            Yt = ae.ajaxSettings.xhr();
        e.attachEvent && e.attachEvent("onunload", function() {
            for (var e in Kt) Kt[e](void 0, !0)
        }), ne.cors = !!Yt && "withCredentials" in Yt, Yt = ne.ajax = !!Yt, Yt && ae.ajaxTransport(function(e) {
            if (!e.crossDomain || ne.cors) {
                var t;
                return {
                    send: function(n, i) {
                        var a, r = e.xhr(),
                            o = ++Qt;
                        if (r.open(e.type, e.url, e.async, e.username, e.password), e.xhrFields)
                            for (a in e.xhrFields) r[a] = e.xhrFields[a];
                        e.mimeType && r.overrideMimeType && r.overrideMimeType(e.mimeType), e.crossDomain || n["X-Requested-With"] || (n["X-Requested-With"] = "XMLHttpRequest");
                        for (a in n) void 0 !== n[a] && r.setRequestHeader(a, n[a] + "");
                        r.send(e.hasContent && e.data || null), t = function(n, a) {
                            var s, l, c;
                            if (t && (a || 4 === r.readyState))
                                if (delete Kt[o], t = void 0, r.onreadystatechange = ae.noop, a) 4 !== r.readyState && r.abort();
                                else {
                                    c = {}, s = r.status, "string" == typeof r.responseText && (c.text = r.responseText);
                                    try {
                                        l = r.statusText
                                    } catch (e) {
                                        l = ""
                                    }
                                    s || !e.isLocal || e.crossDomain ? 1223 === s && (s = 204) : s = c.text ? 200 : 404
                                }
                            c && i(s, l, c, r.getAllResponseHeaders())
                        }, e.async ? 4 === r.readyState ? setTimeout(t) : r.onreadystatechange = Kt[o] = t : t()
                    },
                    abort: function() {
                        t && t(void 0, !0)
                    }
                }
            }
        }), ae.ajaxSetup({
            accepts: {
                script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
            },
            contents: {
                script: /(?:java|ecma)script/
            },
            converters: {
                "text script": function(e) {
                    return ae.globalEval(e), e
                }
            }
        }), ae.ajaxPrefilter("script", function(e) {
            void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = "GET", e.global = !1)
        }), ae.ajaxTransport("script", function(e) {
            if (e.crossDomain) {
                var t, n = he.head || ae("head")[0] || he.documentElement;
                return {
                    send: function(i, a) {
                        t = he.createElement("script"), t.async = !0, e.scriptCharset && (t.charset = e.scriptCharset), t.src = e.url, t.onload = t.onreadystatechange = function(e, n) {
                            (n || !t.readyState || /loaded|complete/.test(t.readyState)) && (t.onload = t.onreadystatechange = null, t.parentNode && t.parentNode.removeChild(t), t = null, n || a(200, "success"))
                        }, n.insertBefore(t, n.firstChild)
                    },
                    abort: function() {
                        t && t.onload(void 0, !0)
                    }
                }
            }
        });
        var Zt = [],
            en = /(=)\?(?=&|$)|\?\?/;
        ae.ajaxSetup({
            jsonp: "callback",
            jsonpCallback: function() {
                var e = Zt.pop() || ae.expando + "_" + Nt++;
                return this[e] = !0, e
            }
        }), ae.ajaxPrefilter("json jsonp", function(t, n, i) {
            var a, r, o, s = t.jsonp !== !1 && (en.test(t.url) ? "url" : "string" == typeof t.data && !(t.contentType || "").indexOf("application/x-www-form-urlencoded") && en.test(t.data) && "data");
            return s || "jsonp" === t.dataTypes[0] ? (a = t.jsonpCallback = ae.isFunction(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback, s ? t[s] = t[s].replace(en, "$1" + a) : t.jsonp !== !1 && (t.url += (At.test(t.url) ? "&" : "?") + t.jsonp + "=" + a), t.converters["script json"] = function() {
                return o || ae.error(a + " was not called"), o[0]
            }, t.dataTypes[0] = "json", r = e[a], e[a] = function() {
                o = arguments
            }, i.always(function() {
                e[a] = r, t[a] && (t.jsonpCallback = n.jsonpCallback, Zt.push(a)), o && ae.isFunction(r) && r(o[0]), o = r = void 0
            }), "script") : void 0
        }), ae.parseHTML = function(e, t, n) {
            if (!e || "string" != typeof e) return null;
            "boolean" == typeof t && (n = t, t = !1), t = t || he;
            var i = ue.exec(e),
                a = !n && [];
            return i ? [t.createElement(i[1])] : (i = ae.buildFragment([e], t, a), a && a.length && ae(a).remove(), ae.merge([], i.childNodes))
        };
        var tn = ae.fn.load;
        ae.fn.load = function(e, t, n) {
            if ("string" != typeof e && tn) return tn.apply(this, arguments);
            var i, a, r, o = this,
                s = e.indexOf(" ");
            return s >= 0 && (i = ae.trim(e.slice(s, e.length)), e = e.slice(0, s)), ae.isFunction(t) ? (n = t, t = void 0) : t && "object" == typeof t && (r = "POST"), o.length > 0 && ae.ajax({
                url: e,
                type: r,
                dataType: "html",
                data: t
            }).done(function(e) {
                a = arguments, o.html(i ? ae("<div>").append(ae.parseHTML(e)).find(i) : e)
            }).complete(n && function(e, t) {
                o.each(n, a || [e.responseText, t, e])
            }), this
        }, ae.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(e, t) {
            ae.fn[t] = function(e) {
                return this.on(t, e)
            }
        }), ae.expr.filters.animated = function(e) {
            return ae.grep(ae.timers, function(t) {
                return e === t.elem
            }).length
        };
        var nn = e.document.documentElement;
        ae.offset = {
            setOffset: function(e, t, n) {
                var i, a, r, o, s, l, c, d = ae.css(e, "position"),
                    u = ae(e),
                    p = {};
                "static" === d && (e.style.position = "relative"), s = u.offset(), r = ae.css(e, "top"), l = ae.css(e, "left"), c = ("absolute" === d || "fixed" === d) && ae.inArray("auto", [r, l]) > -1, c ? (i = u.position(), o = i.top, a = i.left) : (o = parseFloat(r) || 0, a = parseFloat(l) || 0), ae.isFunction(t) && (t = t.call(e, n, s)), null != t.top && (p.top = t.top - s.top + o), null != t.left && (p.left = t.left - s.left + a), "using" in t ? t.using.call(e, p) : u.css(p)
            }
        }, ae.fn.extend({
            offset: function(e) {
                if (arguments.length) return void 0 === e ? this : this.each(function(t) {
                    ae.offset.setOffset(this, e, t)
                });
                var t, n, i = {
                        top: 0,
                        left: 0
                    },
                    a = this[0],
                    r = a && a.ownerDocument;
                return r ? (t = r.documentElement, ae.contains(t, a) ? (typeof a.getBoundingClientRect !== Se && (i = a.getBoundingClientRect()), n = G(r), {
                    top: i.top + (n.pageYOffset || t.scrollTop) - (t.clientTop || 0),
                    left: i.left + (n.pageXOffset || t.scrollLeft) - (t.clientLeft || 0)
                }) : i) : void 0
            },
            position: function() {
                if (this[0]) {
                    var e, t, n = {
                            top: 0,
                            left: 0
                        },
                        i = this[0];
                    return "fixed" === ae.css(i, "position") ? t = i.getBoundingClientRect() : (e = this.offsetParent(), t = this.offset(), ae.nodeName(e[0], "html") || (n = e.offset()), n.top += ae.css(e[0], "borderTopWidth", !0), n.left += ae.css(e[0], "borderLeftWidth", !0)), {
                        top: t.top - n.top - ae.css(i, "marginTop", !0),
                        left: t.left - n.left - ae.css(i, "marginLeft", !0)
                    }
                }
            },
            offsetParent: function() {
                return this.map(function() {
                    for (var e = this.offsetParent || nn; e && !ae.nodeName(e, "html") && "static" === ae.css(e, "position");) e = e.offsetParent;
                    return e || nn
                })
            }
        }), ae.each({
            scrollLeft: "pageXOffset",
            scrollTop: "pageYOffset"
        }, function(e, t) {
            var n = /Y/.test(t);
            ae.fn[e] = function(i) {
                return Ee(this, function(e, i, a) {
                    var r = G(e);
                    return void 0 === a ? r ? t in r ? r[t] : r.document.documentElement[i] : e[i] : void(r ? r.scrollTo(n ? ae(r).scrollLeft() : a, n ? a : ae(r).scrollTop()) : e[i] = a)
                }, e, i, arguments.length, null)
            }
        }), ae.each(["top", "left"], function(e, t) {
            ae.cssHooks[t] = T(ne.pixelPosition, function(e, n) {
                return n ? (n = tt(e, t), it.test(n) ? ae(e).position()[t] + "px" : n) : void 0
            })
        }), ae.each({
            Height: "height",
            Width: "width"
        }, function(e, t) {
            ae.each({
                padding: "inner" + e,
                content: t,
                "": "outer" + e
            }, function(n, i) {
                ae.fn[i] = function(i, a) {
                    var r = arguments.length && (n || "boolean" != typeof i),
                        o = n || (i === !0 || a === !0 ? "margin" : "border");
                    return Ee(this, function(t, n, i) {
                        var a;
                        return ae.isWindow(t) ? t.document.documentElement["client" + e] : 9 === t.nodeType ? (a = t.documentElement, Math.max(t.body["scroll" + e], a["scroll" + e], t.body["offset" + e], a["offset" + e], a["client" + e])) : void 0 === i ? ae.css(t, n, o) : ae.style(t, n, i, o)
                    }, t, r ? i : void 0, r, null)
                }
            })
        }), ae.fn.size = function() {
            return this.length
        }, ae.fn.andSelf = ae.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function() {
            return ae
        });
        var an = e.jQuery,
            rn = e.$;
        return ae.noConflict = function(t) {
            return e.$ === ae && (e.$ = rn), t && e.jQuery === ae && (e.jQuery = an), ae
        }, typeof t === Se && (e.jQuery = e.$ = ae), ae
    }),
    function(e) {
        "function" == typeof define && define.amd ? define(["jquery"], e) : "object" == typeof exports ? module.exports = e(require("jquery")) : e(jQuery)
    }(function(e) {
        function t(e) {
            return s.raw ? e : encodeURIComponent(e)
        }

        function n(e) {
            return s.raw ? e : decodeURIComponent(e)
        }

        function i(e) {
            return t(s.json ? JSON.stringify(e) : String(e))
        }

        function a(e) {
            0 === e.indexOf('"') && (e = e.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\"));
            try {
                return e = decodeURIComponent(e.replace(o, " ")), s.json ? JSON.parse(e) : e
            } catch (e) {}
        }

        function r(t, n) {
            var i = s.raw ? t : a(t);
            return e.isFunction(n) ? n(i) : i
        }
        var o = /\+/g,
            s = e.cookie = function(a, o, l) {
                if (arguments.length > 1 && !e.isFunction(o)) {
                    if (l = e.extend({}, s.defaults, l), "number" == typeof l.expires) {
                        var c = l.expires,
                            d = l.expires = new Date;
                        d.setMilliseconds(d.getMilliseconds() + 864e5 * c)
                    }
                    return document.cookie = [t(a), "=", i(o), l.expires ? "; expires=" + l.expires.toUTCString() : "", l.path ? "; path=" + l.path : "", l.domain ? "; domain=" + l.domain : "", l.secure ? "; secure" : ""].join("")
                }
                for (var u = a ? void 0 : {}, p = document.cookie ? document.cookie.split("; ") : [], f = 0, h = p.length; f < h; f++) {
                    var m = p[f].split("="),
                        g = n(m.shift()),
                        v = m.join("=");
                    if (a === g) {
                        u = r(v, o);
                        break
                    }
                    a || void 0 === (v = r(v)) || (u[g] = v)
                }
                return u
            };
        s.defaults = {}, e.removeCookie = function(t, n) {
            return e.cookie(t, "", e.extend({}, n, {
                expires: -1
            })), !e.cookie(t)
        }
    }), "object" != typeof JSON && (JSON = {}),
    function() {
        "use strict";

        function f(e) {
            return e < 10 ? "0" + e : e
        }

        function quote(e) {
            return escapable.lastIndex = 0, escapable.test(e) ? '"' + e.replace(escapable, function(e) {
                var t = meta[e];
                return "string" == typeof t ? t : "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
            }) + '"' : '"' + e + '"'
        }

        function str(e, t) {
            var n, i, a, r, o, s = gap,
                l = t[e];
            switch (l && "object" == typeof l && "function" == typeof l.toJSON && (l = l.toJSON(e)), "function" == typeof rep && (l = rep.call(t, e, l)), typeof l) {
                case "string":
                    return quote(l);
                case "number":
                    return isFinite(l) ? String(l) : "null";
                case "boolean":
                case "null":
                    return String(l);
                case "object":
                    if (!l) return "null";
                    if (gap += indent, o = [], "[object Array]" === Object.prototype.toString.apply(l)) {
                        for (r = l.length, n = 0; n < r; n += 1) o[n] = str(n, l) || "null";
                        return a = 0 === o.length ? "[]" : gap ? "[\n" + gap + o.join(",\n" + gap) + "\n" + s + "]" : "[" + o.join(",") + "]", gap = s, a
                    }
                    if (rep && "object" == typeof rep)
                        for (r = rep.length, n = 0; n < r; n += 1) "string" == typeof rep[n] && (i = rep[n], a = str(i, l), a && o.push(quote(i) + (gap ? ": " : ":") + a));
                    else
                        for (i in l) Object.prototype.hasOwnProperty.call(l, i) && (a = str(i, l), a && o.push(quote(i) + (gap ? ": " : ":") + a));
                    return a = 0 === o.length ? "{}" : gap ? "{\n" + gap + o.join(",\n" + gap) + "\n" + s + "}" : "{" + o.join(",") + "}", gap = s, a
            }
        }
        "function" != typeof Date.prototype.toJSON && (Date.prototype.toJSON = function() {
            return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null
        }, String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function() {
            return this.valueOf()
        });
        var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
            escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
            gap, indent, meta = {
                "\b": "\\b",
                "\t": "\\t",
                "\n": "\\n",
                "\f": "\\f",
                "\r": "\\r",
                '"': '\\"',
                "\\": "\\\\"
            },
            rep;
        "function" != typeof JSON.stringify && (JSON.stringify = function(e, t, n) {
            var i;
            if (gap = "", indent = "", "number" == typeof n)
                for (i = 0; i < n; i += 1) indent += " ";
            else "string" == typeof n && (indent = n);
            if (rep = t, !t || "function" == typeof t || "object" == typeof t && "number" == typeof t.length) return str("", {
                "": e
            });
            throw new Error("JSON.stringify")
        }), "function" != typeof JSON.parse && (JSON.parse = function(text, reviver) {
            function walk(e, t) {
                var n, i, a = e[t];
                if (a && "object" == typeof a)
                    for (n in a) Object.prototype.hasOwnProperty.call(a, n) && (i = walk(a, n), void 0 !== i ? a[n] = i : delete a[n]);
                return reviver.call(e, t, a)
            }
            var j;
            if (text = String(text), cx.lastIndex = 0, cx.test(text) && (text = text.replace(cx, function(e) {
                    return "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
                })), /^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) return j = eval("(" + text + ")"), "function" == typeof reviver ? walk({
                "": j
            }, "") : j;
            throw new SyntaxError("JSON.parse")
        })
    }(),
    function(e, t) {
        "use strict";
        var n = e.History = e.History || {},
            i = e.jQuery;
        if ("undefined" != typeof n.Adapter) throw new Error("History.js Adapter has already been loaded...");
        n.Adapter = {
            bind: function(e, t, n) {
                i(e).bind(t, n)
            },
            trigger: function(e, t, n) {
                i(e).trigger(t, n)
            },
            extractEventData: function(e, n, i) {
                var a = n && n.originalEvent && n.originalEvent[e] || i && i[e] || t;
                return a
            },
            onDomLoad: function(e) {
                i(e)
            }
        }, "undefined" != typeof n.init && n.init()
    }(window),
    function(e) {
        "use strict";
        var t = e.document,
            n = e.setTimeout || n,
            i = e.clearTimeout || i,
            a = e.setInterval || a,
            r = e.History = e.History || {};
        if ("undefined" != typeof r.initHtml4) throw new Error("History.js HTML4 Support has already been loaded...");
        r.initHtml4 = function() {
            return "undefined" == typeof r.initHtml4.initialized && (r.initHtml4.initialized = !0, r.enabled = !0, r.savedHashes = [], r.isLastHash = function(e) {
                var t, n = r.getHashByIndex();
                return t = e === n
            }, r.isHashEqual = function(e, t) {
                return e = encodeURIComponent(e).replace(/%25/g, "%"), t = encodeURIComponent(t).replace(/%25/g, "%"), e === t
            }, r.saveHash = function(e) {
                return !r.isLastHash(e) && (r.savedHashes.push(e), !0)
            }, r.getHashByIndex = function(e) {
                var t = null;
                return t = "undefined" == typeof e ? r.savedHashes[r.savedHashes.length - 1] : e < 0 ? r.savedHashes[r.savedHashes.length + e] : r.savedHashes[e]
            }, r.discardedHashes = {}, r.discardedStates = {}, r.discardState = function(e, t, n) {
                var i, a = r.getHashByState(e);
                return i = {
                    discardedState: e,
                    backState: n,
                    forwardState: t
                }, r.discardedStates[a] = i, !0
            }, r.discardHash = function(e, t, n) {
                var i = {
                    discardedHash: e,
                    backState: n,
                    forwardState: t
                };
                return r.discardedHashes[e] = i, !0
            }, r.discardedState = function(e) {
                var t, n = r.getHashByState(e);
                return t = r.discardedStates[n] || !1
            }, r.discardedHash = function(e) {
                var t = r.discardedHashes[e] || !1;
                return t
            }, r.recycleState = function(e) {
                var t = r.getHashByState(e);
                return r.discardedState(e) && delete r.discardedStates[t], !0
            }, r.emulated.hashChange && (r.hashChangeInit = function() {
                r.checkerFunction = null;
                var n, i, o, s, l = "",
                    c = Boolean(r.getHash());
                return r.isInternetExplorer() ? (n = "historyjs-iframe", i = t.createElement("iframe"), i.setAttribute("id", n), i.setAttribute("src", "#"), i.style.display = "none", t.body.appendChild(i), i.contentWindow.document.open(), i.contentWindow.document.close(), o = "", s = !1, r.checkerFunction = function() {
                    if (s) return !1;
                    s = !0;
                    var t = r.getHash(),
                        n = r.getHash(i.contentWindow.document);
                    return t !== l ? (l = t, n !== t && (o = n = t, i.contentWindow.document.open(), i.contentWindow.document.close(), i.contentWindow.document.location.hash = r.escapeHash(t)), r.Adapter.trigger(e, "hashchange")) : n !== o && (o = n, c && "" === n ? r.back() : r.setHash(n, !1)), s = !1, !0
                }) : r.checkerFunction = function() {
                    var t = r.getHash() || "";
                    return t !== l && (l = t, r.Adapter.trigger(e, "hashchange")), !0
                }, r.intervalList.push(a(r.checkerFunction, r.options.hashChangeInterval)), !0
            }, r.Adapter.onDomLoad(r.hashChangeInit)), r.emulated.pushState && (r.onHashChange = function(t) {
                var n, i = t && t.newURL || r.getLocationHref(),
                    a = r.getHashByUrl(i),
                    o = null,
                    s = null;
                return r.isLastHash(a) ? (r.busy(!1), !1) : (r.doubleCheckComplete(), r.saveHash(a), a && r.isTraditionalAnchor(a) ? (r.Adapter.trigger(e, "anchorchange"), r.busy(!1), !1) : (o = r.extractState(r.getFullUrl(a || r.getLocationHref()), !0), r.isLastSavedState(o) ? (r.busy(!1), !1) : (s = r.getHashByState(o), n = r.discardedState(o), n ? (r.getHashByIndex(-2) === r.getHashByState(n.forwardState) ? r.back(!1) : r.forward(!1), !1) : (r.pushState(o.data, o.title, encodeURI(o.url), !1), !0))))
            }, r.Adapter.bind(e, "hashchange", r.onHashChange), r.pushState = function(t, n, i, a) {
                if (i = encodeURI(i).replace(/%25/g, "%"), r.getHashByUrl(i)) throw new Error("History.js does not support states with fragment-identifiers (hashes/anchors).");
                if (a !== !1 && r.busy()) return r.pushQueue({
                    scope: r,
                    callback: r.pushState,
                    args: arguments,
                    queue: a
                }), !1;
                r.busy(!0);
                var o = r.createStateObject(t, n, i),
                    s = r.getHashByState(o),
                    l = r.getState(!1),
                    c = r.getHashByState(l),
                    d = r.getHash(),
                    u = r.expectedStateId == o.id;
                return r.storeState(o), r.expectedStateId = o.id, r.recycleState(o), r.setTitle(o), s === c ? (r.busy(!1), !1) : (r.saveState(o), u || r.Adapter.trigger(e, "statechange"), !r.isHashEqual(s, d) && !r.isHashEqual(s, r.getShortUrl(r.getLocationHref())) && r.setHash(s, !1), r.busy(!1), !0)
            }, r.replaceState = function(t, n, i, a) {
                if (i = encodeURI(i).replace(/%25/g, "%"), r.getHashByUrl(i)) throw new Error("History.js does not support states with fragment-identifiers (hashes/anchors).");
                if (a !== !1 && r.busy()) return r.pushQueue({
                    scope: r,
                    callback: r.replaceState,
                    args: arguments,
                    queue: a
                }), !1;
                r.busy(!0);
                var o = r.createStateObject(t, n, i),
                    s = r.getHashByState(o),
                    l = r.getState(!1),
                    c = r.getHashByState(l),
                    d = r.getStateByIndex(-2);
                return r.discardState(l, o, d), s === c ? (r.storeState(o), r.expectedStateId = o.id, r.recycleState(o), r.setTitle(o), r.saveState(o), r.Adapter.trigger(e, "statechange"), r.busy(!1)) : r.pushState(o.data, o.title, o.url, !1), !0
            }), r.emulated.pushState && r.getHash() && !r.emulated.hashChange && r.Adapter.onDomLoad(function() {
                r.Adapter.trigger(e, "hashchange")
            }), void 0)
        }, "undefined" != typeof r.init && r.init()
    }(window),
    function(e, t) {
        "use strict";
        var n = e.console || t,
            i = e.document,
            a = e.navigator,
            r = !1,
            o = e.setTimeout,
            s = e.clearTimeout,
            l = e.setInterval,
            c = e.clearInterval,
            d = e.JSON,
            u = e.alert,
            p = e.History = e.History || {},
            f = e.history;
        try {
            r = e.sessionStorage, r.setItem("TEST", "1"), r.removeItem("TEST")
        } catch (e) {
            r = !1
        }
        if (d.stringify = d.stringify || d.encode, d.parse = d.parse || d.decode, "undefined" != typeof p.init) throw new Error("History.js Core has already been loaded...");
        p.init = function() {
            return "undefined" != typeof p.Adapter && ("undefined" != typeof p.initCore && p.initCore(), "undefined" != typeof p.initHtml4 && p.initHtml4(), !0)
        }, p.initCore = function() {
            if ("undefined" != typeof p.initCore.initialized) return !1;
            if (p.initCore.initialized = !0, p.options = p.options || {}, p.options.hashChangeInterval = p.options.hashChangeInterval || 100, p.options.safariPollInterval = p.options.safariPollInterval || 500, p.options.doubleCheckInterval = p.options.doubleCheckInterval || 500, p.options.disableSuid = p.options.disableSuid || !1, p.options.storeInterval = p.options.storeInterval || 1e3, p.options.busyDelay = p.options.busyDelay || 250, p.options.debug = p.options.debug || !1, p.options.initialTitle = p.options.initialTitle || i.title, p.options.html4Mode = p.options.html4Mode || !1, p.options.delayInit = p.options.delayInit || !1, p.intervalList = [], p.clearAllIntervals = function() {
                    var e, t = p.intervalList;
                    if ("undefined" != typeof t && null !== t) {
                        for (e = 0; e < t.length; e++) c(t[e]);
                        p.intervalList = null
                    }
                }, p.debug = function() {
                    (p.options.debug || !1) && p.log.apply(p, arguments)
                }, p.log = function() {
                    var e, t, a, r, o, s = "undefined" != typeof n && "undefined" != typeof n.log && "undefined" != typeof n.log.apply,
                        l = i.getElementById("log");
                    for (s ? (r = Array.prototype.slice.call(arguments), e = r.shift(), "undefined" != typeof n.debug ? n.debug.apply(n, [e, r]) : n.log.apply(n, [e, r])) : e = "\n" + arguments[0] + "\n", t = 1, a = arguments.length; t < a; ++t) {
                        if (o = arguments[t], "object" == typeof o && "undefined" != typeof d) try {
                            o = d.stringify(o)
                        } catch (e) {}
                        e += "\n" + o + "\n"
                    }
                    return l ? (l.value += e + "\n-----\n", l.scrollTop = l.scrollHeight - l.clientHeight) : s || u(e), !0
                }, p.getInternetExplorerMajorVersion = function() {
                    var e = p.getInternetExplorerMajorVersion.cached = "undefined" != typeof p.getInternetExplorerMajorVersion.cached ? p.getInternetExplorerMajorVersion.cached : function() {
                        for (var e = 3, t = i.createElement("div"), n = t.getElementsByTagName("i");
                            (t.innerHTML = "<!--[if gt IE " + ++e + "]><i></i><![endif]-->") && n[0];);
                        return e > 4 && e
                    }();
                    return e
                }, p.isInternetExplorer = function() {
                    var e = p.isInternetExplorer.cached = "undefined" != typeof p.isInternetExplorer.cached ? p.isInternetExplorer.cached : Boolean(p.getInternetExplorerMajorVersion());
                    return e
                }, p.options.html4Mode ? p.emulated = {
                    pushState: !0,
                    hashChange: !0
                } : p.emulated = {
                    pushState: !Boolean(e.history && e.history.pushState && e.history.replaceState && !/ Mobile\/([1-7][a-z]|(8([abcde]|f(1[0-8]))))/i.test(a.userAgent) && !/AppleWebKit\/5([0-2]|3[0-2])/i.test(a.userAgent)),
                    hashChange: Boolean(!("onhashchange" in e || "onhashchange" in i) || p.isInternetExplorer() && p.getInternetExplorerMajorVersion() < 8)
                }, p.enabled = !p.emulated.pushState, p.bugs = {
                    setHash: Boolean(!p.emulated.pushState && "Apple Computer, Inc." === a.vendor && /AppleWebKit\/5([0-2]|3[0-3])/.test(a.userAgent)),
                    safariPoll: Boolean(!p.emulated.pushState && "Apple Computer, Inc." === a.vendor && /AppleWebKit\/5([0-2]|3[0-3])/.test(a.userAgent)),
                    ieDoubleCheck: Boolean(p.isInternetExplorer() && p.getInternetExplorerMajorVersion() < 8),
                    hashEscape: Boolean(p.isInternetExplorer() && p.getInternetExplorerMajorVersion() < 7)
                }, p.isEmptyObject = function(e) {
                    for (var t in e)
                        if (e.hasOwnProperty(t)) return !1;
                    return !0
                }, p.cloneObject = function(e) {
                    var t, n;
                    return e ? (t = d.stringify(e), n = d.parse(t)) : n = {}, n
                }, p.getRootUrl = function() {
                    var e = i.location.protocol + "//" + (i.location.hostname || i.location.host);
                    return i.location.port && (e += ":" + i.location.port), e += "/"
                }, p.getBaseHref = function() {
                    var e = i.getElementsByTagName("base"),
                        t = null,
                        n = "";
                    return 1 === e.length && (t = e[0], n = t.href.replace(/[^\/]+$/, "")), n = n.replace(/\/+$/, ""), n && (n += "/"), n
                }, p.getBaseUrl = function() {
                    var e = p.getBaseHref() || p.getBasePageUrl() || p.getRootUrl();
                    return e
                }, p.getPageUrl = function() {
                    var e, t = p.getState(!1, !1),
                        n = (t || {}).url || p.getLocationHref();
                    return e = n.replace(/\/+$/, "").replace(/[^\/]+$/, function(e) {
                        return /\./.test(e) ? e : e + "/"
                    })
                }, p.getBasePageUrl = function() {
                    var e = p.getLocationHref().replace(/[#\?].*/, "").replace(/[^\/]+$/, function(e) {
                        return /[^\/]$/.test(e) ? "" : e
                    }).replace(/\/+$/, "") + "/";
                    return e
                }, p.getFullUrl = function(e, t) {
                    var n = e,
                        i = e.substring(0, 1);
                    return t = "undefined" == typeof t || t, /[a-z]+\:\/\//.test(e) || (n = "/" === i ? p.getRootUrl() + e.replace(/^\/+/, "") : "#" === i ? p.getPageUrl().replace(/#.*/, "") + e : "?" === i ? p.getPageUrl().replace(/[\?#].*/, "") + e : t ? p.getBaseUrl() + e.replace(/^(\.\/)+/, "") : p.getBasePageUrl() + e.replace(/^(\.\/)+/, "")), n.replace(/\#$/, "")
                }, p.getShortUrl = function(e) {
                    var t = e,
                        n = p.getBaseUrl(),
                        i = p.getRootUrl();
                    return p.emulated.pushState && (t = t.replace(n, "")), t = t.replace(i, "/"), p.isTraditionalAnchor(t) && (t = "./" + t), t = t.replace(/^(\.\/)+/g, "./").replace(/\#$/, "")
                }, p.getLocationHref = function(e) {
                    return e = e || i, e.URL === e.location.href ? e.location.href : e.location.href === decodeURIComponent(e.URL) ? e.URL : e.location.hash && decodeURIComponent(e.location.href.replace(/^[^#]+/, "")) === e.location.hash ? e.location.href : e.URL.indexOf("#") == -1 && e.location.href.indexOf("#") != -1 ? e.location.href : e.URL || e.location.href
                }, p.store = {}, p.idToState = p.idToState || {}, p.stateToId = p.stateToId || {}, p.urlToId = p.urlToId || {}, p.storedStates = p.storedStates || [], p.savedStates = p.savedStates || [], p.normalizeStore = function() {
                    p.store.idToState = p.store.idToState || {}, p.store.urlToId = p.store.urlToId || {}, p.store.stateToId = p.store.stateToId || {}
                }, p.getState = function(e, t) {
                    "undefined" == typeof e && (e = !0), "undefined" == typeof t && (t = !0);
                    var n = p.getLastSavedState();
                    return !n && t && (n = p.createStateObject()), e && (n = p.cloneObject(n), n.url = n.cleanUrl || n.url), n
                }, p.getIdByState = function(e) {
                    var t, n = p.extractId(e.url);
                    if (!n)
                        if (t = p.getStateString(e), "undefined" != typeof p.stateToId[t]) n = p.stateToId[t];
                        else if ("undefined" != typeof p.store.stateToId[t]) n = p.store.stateToId[t];
                    else {
                        for (; n = (new Date).getTime() + String(Math.random()).replace(/\D/g, ""), "undefined" != typeof p.idToState[n] || "undefined" != typeof p.store.idToState[n];);
                        p.stateToId[t] = n, p.idToState[n] = e
                    }
                    return n
                }, p.normalizeState = function(e) {
                    var t, n;
                    return e && "object" == typeof e || (e = {}), "undefined" != typeof e.normalized ? e : (e.data && "object" == typeof e.data || (e.data = {}), t = {}, t.normalized = !0, t.title = e.title || "", t.url = p.getFullUrl(e.url ? e.url : p.getLocationHref()), t.hash = p.getShortUrl(t.url), t.data = p.cloneObject(e.data), t.id = p.getIdByState(t), t.cleanUrl = t.url.replace(/\??\&_suid.*/, ""), t.url = t.cleanUrl, n = !p.isEmptyObject(t.data), (t.title || n) && p.options.disableSuid !== !0 && (t.hash = p.getShortUrl(t.url).replace(/\??\&_suid.*/, ""), /\?/.test(t.hash) || (t.hash += "?"), t.hash += "&_suid=" + t.id), t.hashedUrl = p.getFullUrl(t.hash), (p.emulated.pushState || p.bugs.safariPoll) && p.hasUrlDuplicate(t) && (t.url = t.hashedUrl), t)
                }, p.createStateObject = function(e, t, n) {
                    var i = {
                        data: e,
                        title: t,
                        url: n
                    };
                    return i = p.normalizeState(i)
                }, p.getStateById = function(e) {
                    e = String(e);
                    var n = p.idToState[e] || p.store.idToState[e] || t;
                    return n
                }, p.getStateString = function(e) {
                    var t, n, i;
                    return t = p.normalizeState(e), n = {
                        data: t.data,
                        title: e.title,
                        url: e.url
                    }, i = d.stringify(n)
                }, p.getStateId = function(e) {
                    var t, n;
                    return t = p.normalizeState(e), n = t.id
                }, p.getHashByState = function(e) {
                    var t, n;
                    return t = p.normalizeState(e), n = t.hash
                }, p.extractId = function(e) {
                    var t, n, i, a;
                    return a = e.indexOf("#") != -1 ? e.split("#")[0] : e, n = /(.*)\&_suid=([0-9]+)$/.exec(a), i = n ? n[1] || e : e, t = n ? String(n[2] || "") : "", t || !1
                }, p.isTraditionalAnchor = function(e) {
                    var t = !/[\/\?\.]/.test(e);
                    return t
                }, p.extractState = function(e, t) {
                    var n, i, a = null;
                    return t = t || !1, n = p.extractId(e), n && (a = p.getStateById(n)), a || (i = p.getFullUrl(e), n = p.getIdByUrl(i) || !1, n && (a = p.getStateById(n)), !a && t && !p.isTraditionalAnchor(e) && (a = p.createStateObject(null, null, i))), a
                }, p.getIdByUrl = function(e) {
                    var n = p.urlToId[e] || p.store.urlToId[e] || t;
                    return n
                }, p.getLastSavedState = function() {
                    return p.savedStates[p.savedStates.length - 1] || t
                }, p.getLastStoredState = function() {
                    return p.storedStates[p.storedStates.length - 1] || t
                }, p.hasUrlDuplicate = function(e) {
                    var t, n = !1;
                    return t = p.extractState(e.url), n = t && t.id !== e.id
                }, p.storeState = function(e) {
                    return p.urlToId[e.url] = e.id, p.storedStates.push(p.cloneObject(e)), e
                }, p.isLastSavedState = function(e) {
                    var t, n, i, a = !1;
                    return p.savedStates.length && (t = e.id, n = p.getLastSavedState(), i = n.id, a = t === i), a
                }, p.saveState = function(e) {
                    return !p.isLastSavedState(e) && (p.savedStates.push(p.cloneObject(e)), !0)
                }, p.getStateByIndex = function(e) {
                    var t = null;
                    return t = "undefined" == typeof e ? p.savedStates[p.savedStates.length - 1] : e < 0 ? p.savedStates[p.savedStates.length + e] : p.savedStates[e]
                }, p.getCurrentIndex = function() {
                    var e = null;
                    return e = p.savedStates.length < 1 ? 0 : p.savedStates.length - 1
                }, p.getHash = function(e) {
                    var t, n = p.getLocationHref(e);
                    return t = p.getHashByUrl(n)
                }, p.unescapeHash = function(e) {
                    var t = p.normalizeHash(e);
                    return t = decodeURIComponent(t)
                }, p.normalizeHash = function(e) {
                    var t = e.replace(/[^#]*#/, "").replace(/#.*/, "");
                    return t
                }, p.setHash = function(e, t) {
                    var n, a;
                    return t !== !1 && p.busy() ? (p.pushQueue({
                        scope: p,
                        callback: p.setHash,
                        args: arguments,
                        queue: t
                    }), !1) : (p.busy(!0), n = p.extractState(e, !0), n && !p.emulated.pushState ? p.pushState(n.data, n.title, n.url, !1) : p.getHash() !== e && (p.bugs.setHash ? (a = p.getPageUrl(), p.pushState(null, null, a + "#" + e, !1)) : i.location.hash = e), p)
                }, p.escapeHash = function(t) {
                    var n = p.normalizeHash(t);
                    return n = e.encodeURIComponent(n), p.bugs.hashEscape || (n = n.replace(/\%21/g, "!").replace(/\%26/g, "&").replace(/\%3D/g, "=").replace(/\%3F/g, "?")), n
                }, p.getHashByUrl = function(e) {
                    var t = String(e).replace(/([^#]*)#?([^#]*)#?(.*)/, "$2");
                    return t = p.unescapeHash(t)
                }, p.setTitle = function(e) {
                    var t, n = e.title;
                    n || (t = p.getStateByIndex(0), t && t.url === e.url && (n = t.title || p.options.initialTitle));
                    try {
                        i.getElementsByTagName("title")[0].innerHTML = n.replace("<", "&lt;").replace(">", "&gt;").replace(" & ", " &amp; ")
                    } catch (e) {}
                    return i.title = n, p
                }, p.queues = [], p.busy = function(e) {
                    if ("undefined" != typeof e ? p.busy.flag = e : "undefined" == typeof p.busy.flag && (p.busy.flag = !1), !p.busy.flag) {
                        s(p.busy.timeout);
                        var t = function() {
                            var e, n, i;
                            if (!p.busy.flag)
                                for (e = p.queues.length - 1; e >= 0; --e) n = p.queues[e], 0 !== n.length && (i = n.shift(), p.fireQueueItem(i), p.busy.timeout = o(t, p.options.busyDelay))
                        };
                        p.busy.timeout = o(t, p.options.busyDelay)
                    }
                    return p.busy.flag
                }, p.busy.flag = !1, p.fireQueueItem = function(e) {
                    return e.callback.apply(e.scope || p, e.args || [])
                }, p.pushQueue = function(e) {
                    return p.queues[e.queue || 0] = p.queues[e.queue || 0] || [], p.queues[e.queue || 0].push(e), p
                }, p.queue = function(e, t) {
                    return "function" == typeof e && (e = {
                        callback: e
                    }), "undefined" != typeof t && (e.queue = t), p.busy() ? p.pushQueue(e) : p.fireQueueItem(e), p
                }, p.clearQueue = function() {
                    return p.busy.flag = !1, p.queues = [], p
                }, p.stateChanged = !1, p.doubleChecker = !1, p.doubleCheckComplete = function() {
                    return p.stateChanged = !0, p.doubleCheckClear(), p
                }, p.doubleCheckClear = function() {
                    return p.doubleChecker && (s(p.doubleChecker), p.doubleChecker = !1), p
                }, p.doubleCheck = function(e) {
                    return p.stateChanged = !1, p.doubleCheckClear(), p.bugs.ieDoubleCheck && (p.doubleChecker = o(function() {
                        return p.doubleCheckClear(), p.stateChanged || e(), !0
                    }, p.options.doubleCheckInterval)), p
                }, p.safariStatePoll = function() {
                    var t, n = p.extractState(p.getLocationHref());
                    if (!p.isLastSavedState(n)) return t = n, t || (t = p.createStateObject()), p.Adapter.trigger(e, "popstate"), p
                }, p.back = function(e) {
                    return e !== !1 && p.busy() ? (p.pushQueue({
                        scope: p,
                        callback: p.back,
                        args: arguments,
                        queue: e
                    }), !1) : (p.busy(!0), p.doubleCheck(function() {
                        p.back(!1)
                    }), f.go(-1), !0)
                }, p.forward = function(e) {
                    return e !== !1 && p.busy() ? (p.pushQueue({
                        scope: p,
                        callback: p.forward,
                        args: arguments,
                        queue: e
                    }), !1) : (p.busy(!0), p.doubleCheck(function() {
                        p.forward(!1)
                    }), f.go(1), !0)
                }, p.go = function(e, t) {
                    var n;
                    if (e > 0)
                        for (n = 1; n <= e; ++n) p.forward(t);
                    else {
                        if (!(e < 0)) throw new Error("History.go: History.go requires a positive or negative integer passed.");
                        for (n = -1; n >= e; --n) p.back(t)
                    }
                    return p
                }, p.emulated.pushState) {
                var h = function() {};
                p.pushState = p.pushState || h, p.replaceState = p.replaceState || h
            } else p.onPopState = function(t, n) {
                var i, a, r = !1,
                    o = !1;
                return p.doubleCheckComplete(), i = p.getHash(), i ? (a = p.extractState(i || p.getLocationHref(), !0), a ? p.replaceState(a.data, a.title, a.url, !1) : (p.Adapter.trigger(e, "anchorchange"), p.busy(!1)), p.expectedStateId = !1, !1) : (r = p.Adapter.extractEventData("state", t, n) || !1, o = r ? p.getStateById(r) : p.expectedStateId ? p.getStateById(p.expectedStateId) : p.extractState(p.getLocationHref()), o || (o = p.createStateObject(null, null, p.getLocationHref())), p.expectedStateId = !1, p.isLastSavedState(o) ? (p.busy(!1), !1) : (p.storeState(o), p.saveState(o), p.setTitle(o), p.Adapter.trigger(e, "statechange"), p.busy(!1), !0))
            }, p.Adapter.bind(e, "popstate", p.onPopState), p.pushState = function(t, n, i, a) {
                if (p.getHashByUrl(i) && p.emulated.pushState) throw new Error("History.js does not support states with fragement-identifiers (hashes/anchors).");
                if (a !== !1 && p.busy()) return p.pushQueue({
                    scope: p,
                    callback: p.pushState,
                    args: arguments,
                    queue: a
                }), !1;
                p.busy(!0);
                var r = p.createStateObject(t, n, i);
                return p.isLastSavedState(r) ? p.busy(!1) : (p.storeState(r), p.expectedStateId = r.id, f.pushState(r.id, r.title, r.url), p.Adapter.trigger(e, "popstate")), !0
            }, p.replaceState = function(t, n, i, a) {
                if (p.getHashByUrl(i) && p.emulated.pushState) throw new Error("History.js does not support states with fragement-identifiers (hashes/anchors).");
                if (a !== !1 && p.busy()) return p.pushQueue({
                    scope: p,
                    callback: p.replaceState,
                    args: arguments,
                    queue: a
                }), !1;
                p.busy(!0);
                var r = p.createStateObject(t, n, i);
                return p.isLastSavedState(r) ? p.busy(!1) : (p.storeState(r), p.expectedStateId = r.id, f.replaceState(r.id, r.title, r.url), p.Adapter.trigger(e, "popstate")), !0
            };
            if (r) {
                try {
                    p.store = d.parse(r.getItem("History.store")) || {}
                } catch (e) {
                    p.store = {}
                }
                p.normalizeStore()
            } else p.store = {}, p.normalizeStore();
            p.Adapter.bind(e, "unload", p.clearAllIntervals), p.saveState(p.storeState(p.extractState(p.getLocationHref(), !0))), r && (p.onUnload = function() {
                var e, t, n;
                try {
                    e = d.parse(r.getItem("History.store")) || {}
                } catch (t) {
                    e = {}
                }
                e.idToState = e.idToState || {}, e.urlToId = e.urlToId || {}, e.stateToId = e.stateToId || {};
                for (t in p.idToState) p.idToState.hasOwnProperty(t) && (e.idToState[t] = p.idToState[t]);
                for (t in p.urlToId) p.urlToId.hasOwnProperty(t) && (e.urlToId[t] = p.urlToId[t]);
                for (t in p.stateToId) p.stateToId.hasOwnProperty(t) && (e.stateToId[t] = p.stateToId[t]);
                p.store = e, p.normalizeStore(), n = d.stringify(e);
                try {
                    r.setItem("History.store", n)
                } catch (e) {
                    if (e.code !== DOMException.QUOTA_EXCEEDED_ERR) throw e;
                    r.length && (r.removeItem("History.store"), r.setItem("History.store", n))
                }
            }, p.intervalList.push(l(p.onUnload, p.options.storeInterval)), p.Adapter.bind(e, "beforeunload", p.onUnload), p.Adapter.bind(e, "unload", p.onUnload)), p.emulated.pushState || (p.bugs.safariPoll && p.intervalList.push(l(p.safariStatePoll, p.options.safariPollInterval)), "Apple Computer, Inc." !== a.vendor && "Mozilla" !== (a.appCodeName || "") || (p.Adapter.bind(e, "hashchange", function() {
                p.Adapter.trigger(e, "popstate")
            }), p.getHash() && p.Adapter.onDomLoad(function() {
                p.Adapter.trigger(e, "hashchange")
            })))
        }, (!p.options || !p.options.delayInit) && p.init()
    }(window), Object.create || (Object.create = function() {
        function e() {}
        return function(t) {
            if (1 != arguments.length) throw new Error("Object.create implementation only accepts one parameter.");
            return e.prototype = t, new e
        }
    }()), Object.keys || (Object.keys = function(e, t, n) {
        n = [];
        for (t in e) n.hasOwnProperty.call(e, t) && n.push(t);
        return n
    }), Array.prototype.indexOf || (Array.prototype.indexOf = function(e) {
        for (var t = 0; t < this.length; t++)
            if (this[t] === e) return t;
        return -1
    }), Array.prototype.forEach || (Array.prototype.forEach = function(e) {
        if (void 0 === this || null === this) throw new TypeError;
        var t = Object(this),
            n = t.length >>> 0;
        if ("function" != typeof e) throw new TypeError;
        for (var i = arguments.length >= 2 ? arguments[1] : void 0, a = 0; n > a; a++) a in t && e.call(i, t[a], a, t);
        return this
    }), Array.prototype.filter || (Array.prototype.filter = function(e, t) {
        var n = [];
        return this.forEach(function(i, a, r) {
            e.call(t || void 0, i, a, r) && n.push(i)
        }), n
    }), Array.prototype.map || (Array.prototype.map = function(e, t) {
        var n = [];
        return this.forEach(function(i, a, r) {
            n.push(e.call(t || void 0, i, a, r))
        }), n
    }), Array.isArray || (Array.isArray = function(e) {
        return "[object Array]" === Object.prototype.toString.call(e)
    }), "object" != typeof window || "object" != typeof window.location || window.location.assign || (window.location.assign = function(e) {
        window.location = e
    }), Function.prototype.bind || (Function.prototype.bind = function(e) {
        function t() {}
        if ("function" != typeof this) throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
        var n = [].slice,
            i = n.call(arguments, 1),
            a = this,
            r = function() {
                return a.apply(this instanceof t ? this : e || window, i.concat(n.call(arguments)))
            };
        return t.prototype = this.prototype, r.prototype = new t, r
    });
var hello = function(e) {
    return hello.use(e)
};
hello.utils = {
        extend: function(e) {
            return Array.prototype.slice.call(arguments, 1).forEach(function(t) {
                if (e instanceof Object && t instanceof Object && e !== t)
                    for (var n in t) e[n] = hello.utils.extend(e[n], t[n]);
                else e = t
            }), e
        }
    }, hello.utils.extend(hello, {
        settings: {
            redirect_uri: window.location.href.split("#")[0],
            response_type: "token",
            display: "popup",
            state: "",
            oauth_proxy: "https://auth-server.herokuapp.com/proxy",
            timeout: 2e4,
            default_service: null,
            force: null,
            page_uri: window.location.href
        },
        services: {},
        use: function(e) {
            var t = Object.create(this);
            return t.settings = Object.create(this.settings), e && (t.settings.default_service = e), t.utils.Event.call(t), t
        },
        init: function(e, t) {
            var n = this.utils;
            if (!e) return this.services;
            for (var i in e) e.hasOwnProperty(i) && "object" != typeof e[i] && (e[i] = {
                id: e[i]
            });
            n.extend(this.services, e);
            for (i in this.services) this.services.hasOwnProperty(i) && (this.services[i].scope = this.services[i].scope || {});
            return t && (n.extend(this.settings, t), "redirect_uri" in t && (this.settings.redirect_uri = n.url(t.redirect_uri).href)), this
        },
        login: function() {
            function e(e, t) {
                hello.emit(e, t)
            }

            function t(e) {
                return e
            }
            var n, i = this,
                a = i.utils,
                r = a.error,
                o = a.Promise(),
                s = a.args({
                    network: "s",
                    options: "o",
                    callback: "f"
                }, arguments),
                l = s.options = a.merge(i.settings, s.options || {});
            if (s.network = s.network || i.settings.default_service, o.proxy.then(s.callback, s.callback), o.proxy.then(e.bind(this, "auth.login auth"), e.bind(this, "auth.failed auth")), "string" != typeof s.network || !(s.network in i.services)) return o.reject(r("invalid_network", "The provided network was not recognized"));
            var c = i.services[s.network],
                d = a.globalEvent(function(e) {
                    var t;
                    t = e ? JSON.parse(e) : r("cancelled", "The authentication was not completed"), t.error ? o.reject(t) : (a.store(t.network, t), o.fulfill({
                        network: t.network,
                        authResponse: t
                    }))
                }),
                u = a.url(l.redirect_uri).href,
                p = c.oauth.response_type || l.response_type;
            /\bcode\b/.test(p) && !c.oauth.grant && (p = p.replace(/\bcode\b/, "token")), s.qs = {
                client_id: encodeURIComponent(c.id),
                response_type: encodeURIComponent(p),
                redirect_uri: encodeURIComponent(u),
                display: l.display,
                scope: "basic",
                state: {
                    client_id: c.id,
                    network: s.network,
                    display: l.display,
                    callback: d,
                    state: l.state,
                    redirect_uri: u
                }
            };
            var f = a.store(s.network),
                h = (l.scope || "").toString();
            if (h = (h ? h + "," : "") + s.qs.scope, f && "scope" in f && f.scope instanceof String && (h += "," + f.scope), s.qs.state.scope = a.unique(h.split(/[,\s]+/)).join(","), s.qs.scope = h.replace(/[^,\s]+/gi, function(e) {
                    if (e in c.scope) return c.scope[e];
                    for (var t in i.services) {
                        var n = i.services[t].scope;
                        if (n && e in n) return ""
                    }
                    return e
                }).replace(/[,\s]+/gi, ","), s.qs.scope = a.unique(s.qs.scope.split(/,+/)).join(c.scope_delim || ","), l.force === !1 && f && "access_token" in f && f.access_token && "expires" in f && f.expires > (new Date).getTime() / 1e3) {
                var m = a.diff(f.scope || [], s.qs.state.scope || []);
                if (0 === m.length) return o.fulfill({
                    unchanged: !0,
                    network: s.network,
                    authResponse: f
                }), o
            }
            if ("page" === l.display && l.page_uri && (s.qs.state.page_uri = a.url(l.page_uri).href), "login" in c && "function" == typeof c.login && c.login(s), (!/\btoken\b/.test(p) || parseInt(c.oauth.version, 10) < 2 || "none" === l.display && c.oauth.grant && f && f.refresh_token) && (s.qs.state.oauth = c.oauth, s.qs.state.oauth_proxy = l.oauth_proxy), s.qs.state = encodeURIComponent(JSON.stringify(s.qs.state)), 1 === parseInt(c.oauth.version, 10) ? n = a.qs(l.oauth_proxy, s.qs, t) : "none" === l.display && c.oauth.grant && f && f.refresh_token ? (s.qs.refresh_token = f.refresh_token, n = a.qs(l.oauth_proxy, s.qs, t)) : n = a.qs(c.oauth.auth, s.qs, t), "none" === l.display) a.iframe(n);
            else if ("popup" === l.display) var g = a.popup(n, u, l.window_width || 500, l.window_height || 550),
                v = setInterval(function() {
                    if ((!g || g.closed) && (clearInterval(v), !o.state)) {
                        var e = r("cancelled", "Login has been cancelled");
                        g || (e = r("blocked", "Popup was blocked")), e.network = s.network, o.reject(e)
                    }
                }, 100);
            else window.location = n;
            return o.proxy
        },
        logout: function() {
            function e(e, t) {
                hello.emit(e, t)
            }
            var t = this,
                n = t.utils,
                i = n.error,
                a = n.Promise(),
                r = n.args({
                    name: "s",
                    options: "o",
                    callback: "f"
                }, arguments);
            if (r.options = r.options || {}, a.proxy.then(r.callback, r.callback), a.proxy.then(e.bind(this, "auth.logout auth"), e.bind(this, "error")), r.name = r.name || this.settings.default_service, !r.name || r.name in t.services)
                if (r.name && n.store(r.name)) {
                    var o = function(e) {
                            n.store(r.name, ""), a.fulfill(hello.utils.merge({
                                network: r.name
                            }, e || {}))
                        },
                        s = {};
                    if (r.options.force) {
                        var l = t.services[r.name].logout;
                        if (l)
                            if ("function" == typeof l && (l = l(o)), "string" == typeof l) n.iframe(l), s.force = null, s.message = "Logout success on providers site was indeterminate";
                            else if (void 0 === l) return a.proxy
                    }
                    o(s)
                } else a.reject(i("invalid_session", "There was no session to remove"));
            else a.reject(i("invalid_network", "The network was unrecognized"));
            return a.proxy
        },
        getAuthResponse: function(e) {
            return e = e || this.settings.default_service, e && e in this.services ? this.utils.store(e) || null : null
        },
        events: {}
    }), hello.utils.extend(hello.utils, {
        error: function(e, t) {
            return {
                error: {
                    code: e,
                    message: t
                }
            }
        },
        qs: function(e, t, n) {
            if (t) {
                var i;
                for (var a in t)
                    if (e.indexOf(a) > -1) {
                        var r = "[\\?\\&]" + a + "=[^\\&]*";
                        i = new RegExp(r), e = e.replace(i, "")
                    }
            }
            return e + (this.isEmpty(t) ? "" : (e.indexOf("?") > -1 ? "&" : "?") + this.param(t, n))
        },
        param: function(e, t) {
            var n, i, a = {};
            if ("string" == typeof e) {
                if (t = t || decodeURIComponent, i = e.replace(/^[\#\?]/, "").match(/([^=\/\&]+)=([^\&]+)/g))
                    for (var r = 0; r < i.length; r++) n = i[r].match(/([^=]+)=(.*)/), a[n[1]] = t(n[2]);
                return a
            }
            t = t || encodeURIComponent;
            var o = e;
            a = [];
            for (var s in o) o.hasOwnProperty(s) && o.hasOwnProperty(s) && a.push([s, "?" === o[s] ? "?" : t(o[s])].join("="));
            return a.join("&")
        },
        store: function(e) {
            function t() {
                var t = {};
                try {
                    t = JSON.parse(e.getItem("hello")) || {}
                } catch (e) {}
                return t
            }

            function n(t) {
                e.setItem("hello", JSON.stringify(t))
            }
            var i = [e, window.sessionStorage],
                a = 0;
            for (e = i[a++]; e;) try {
                e.setItem(a, a), e.removeItem(a);
                break
            } catch (t) {
                e = i[a++]
            }
            return e || (e = {
                    getItem: function(e) {
                        e += "=";
                        for (var t = document.cookie.split(";"), n = 0; n < t.length; n++) {
                            var i = t[n].replace(/(^\s+|\s+$)/, "");
                            if (i && 0 === i.indexOf(e)) return i.substr(e.length)
                        }
                        return null
                    },
                    setItem: function(e, t) {
                        document.cookie = e + "=" + t
                    }
                }),
                function(e, i) {
                    var a = t();
                    if (e && void 0 === i) return a[e] || null;
                    if (e && null === i) try {
                        delete a[e]
                    } catch (t) {
                        a[e] = null
                    } else {
                        if (!e) return a;
                        a[e] = i
                    }
                    return n(a), a || null
                }
        }(window.localStorage),
        append: function(e, t, n) {
            var i = "string" == typeof e ? document.createElement(e) : e;
            if ("object" == typeof t)
                if ("tagName" in t) n = t;
                else
                    for (var a in t)
                        if (t.hasOwnProperty(a))
                            if ("object" == typeof t[a])
                                for (var r in t[a]) t[a].hasOwnProperty(r) && (i[a][r] = t[a][r]);
                            else "html" === a ? i.innerHTML = t[a] : /^on/.test(a) ? i[a] = t[a] : i.setAttribute(a, t[a]);
            return "body" === n ? ! function e() {
                document.body ? document.body.appendChild(i) : setTimeout(e, 16)
            }() : "object" == typeof n ? n.appendChild(i) : "string" == typeof n && document.getElementsByTagName(n)[0].appendChild(i), i
        },
        iframe: function(e) {
            this.append("iframe", {
                src: e,
                style: {
                    position: "absolute",
                    left: "-1000px",
                    bottom: 0,
                    height: "1px",
                    width: "1px"
                }
            }, "body")
        },
        merge: function() {
            var e = Array.prototype.slice.call(arguments);
            return e.unshift({}), this.extend.apply(null, e)
        },
        args: function(e, t) {
            var n = {},
                i = 0,
                a = null,
                r = null;
            for (r in e)
                if (e.hasOwnProperty(r)) break;
            if (1 === t.length && "object" == typeof t[0] && "o!" != e[r])
                for (r in t[0])
                    if (e.hasOwnProperty(r) && r in e) return t[0];
            for (r in e)
                if (e.hasOwnProperty(r))
                    if (a = typeof t[i], "function" == typeof e[r] && e[r].test(t[i]) || "string" == typeof e[r] && (e[r].indexOf("s") > -1 && "string" === a || e[r].indexOf("o") > -1 && "object" === a || e[r].indexOf("i") > -1 && "number" === a || e[r].indexOf("a") > -1 && "object" === a || e[r].indexOf("f") > -1 && "function" === a)) n[r] = t[i++];
                    else if ("string" == typeof e[r] && e[r].indexOf("!") > -1) return !1;
            return n
        },
        url: function(e) {
            if (e) {
                if (window.URL && URL instanceof Function && 0 !== URL.length) return new URL(e, window.location);
                var t = document.createElement("a");
                return t.href = e, t
            }
            return window.location
        },
        diff: function(e, t) {
            return t.filter(function(t) {
                return -1 === e.indexOf(t)
            })
        },
        unique: function(e) {
            return Array.isArray(e) ? e.filter(function(t, n) {
                return e.indexOf(t) === n
            }) : []
        },
        isEmpty: function(e) {
            if (!e) return !0;
            if (Array.isArray(e)) return !e.length;
            if ("object" == typeof e)
                for (var t in e)
                    if (e.hasOwnProperty(t)) return !1;
            return !0
        },
        Promise: function() {
            var e = 0,
                t = 1,
                n = 2,
                i = function(t) {
                    return this instanceof i ? (this.id = "Thenable/1.0.6", this.state = e, this.fulfillValue = void 0, this.rejectReason = void 0, this.onFulfilled = [], this.onRejected = [], this.proxy = {
                        then: this.then.bind(this)
                    }, void("function" == typeof t && t.call(this, this.fulfill.bind(this), this.reject.bind(this)))) : new i(t)
                };
            i.prototype = {
                fulfill: function(e) {
                    return a(this, t, "fulfillValue", e)
                },
                reject: function(e) {
                    return a(this, n, "rejectReason", e)
                },
                then: function(e, t) {
                    var n = this,
                        a = new i;
                    return n.onFulfilled.push(s(e, a, "fulfill")), n.onRejected.push(s(t, a, "reject")), r(n), a.proxy
                }
            };
            var a = function(t, n, i, a) {
                    return t.state === e && (t.state = n, t[i] = a, r(t)), t
                },
                r = function(e) {
                    e.state === t ? o(e, "onFulfilled", e.fulfillValue) : e.state === n && o(e, "onRejected", e.rejectReason)
                },
                o = function(e, t, n) {
                    if (0 !== e[t].length) {
                        var i = e[t];
                        e[t] = [];
                        var a = function() {
                            for (var e = 0; e < i.length; e++) i[e](n)
                        };
                        "object" == typeof process && "function" == typeof process.nextTick ? process.nextTick(a) : "function" == typeof setImmediate ? setImmediate(a) : setTimeout(a, 0)
                    }
                },
                s = function(e, t, n) {
                    return function(i) {
                        if ("function" != typeof e) t[n].call(t, i);
                        else {
                            var a;
                            try {
                                a = e(i)
                            } catch (e) {
                                return void t.reject(e)
                            }
                            l(t, a)
                        }
                    }
                },
                l = function(e, t) {
                    if (e === t || e.proxy === t) return void e.reject(new TypeError("cannot resolve promise with itself"));
                    var n;
                    if ("object" == typeof t && null !== t || "function" == typeof t) try {
                        n = t.then
                    } catch (t) {
                        return void e.reject(t)
                    }
                    if ("function" != typeof n) e.fulfill(t);
                    else {
                        var i = !1;
                        try {
                            n.call(t, function(n) {
                                i || (i = !0, n === t ? e.reject(new TypeError("circular thenable chain")) : l(e, n))
                            }, function(t) {
                                i || (i = !0, e.reject(t))
                            })
                        } catch (t) {
                            i || e.reject(t)
                        }
                    }
                };
            return i
        }(),
        Event: function() {
            var e = /[\s\,]+/;
            return this.parent = {
                events: this.events,
                findEvents: this.findEvents,
                parent: this.parent,
                utils: this.utils
            }, this.events = {}, this.on = function(t, n) {
                if (n && "function" == typeof n)
                    for (var i = t.split(e), a = 0; a < i.length; a++) this.events[i[a]] = [n].concat(this.events[i[a]] || []);
                return this
            }, this.off = function(e, t) {
                return this.findEvents(e, function(e, n) {
                    t && this.events[e][n] !== t || (this.events[e][n] = null)
                }), this
            }, this.emit = function(e) {
                var t = Array.prototype.slice.call(arguments, 1);
                t.push(e);
                for (var n = function(n, i) {
                        t[t.length - 1] = "*" === n ? e : n, this.events[n][i].apply(this, t)
                    }, i = this; i && i.findEvents;) i.findEvents(e + ",*", n), i = i.parent;
                return this
            }, this.emitAfter = function() {
                var e = this,
                    t = arguments;
                return setTimeout(function() {
                    e.emit.apply(e, t)
                }, 0), this
            }, this.findEvents = function(t, n) {
                var i = t.split(e);
                for (var a in this.events)
                    if (this.events.hasOwnProperty(a) && i.indexOf(a) > -1)
                        for (var r = 0; r < this.events[a].length; r++) this.events[a][r] && n.call(this, a, r)
            }, this
        },
        globalEvent: function(e, t) {
            return t = t || "_hellojs_" + parseInt(1e12 * Math.random(), 10).toString(36), window[t] = function() {
                var n;
                try {
                    n = e.apply(this, arguments)
                } catch (e) {
                    console.error(e)
                }
                if (n) try {
                    delete window[t]
                } catch (e) {}
            }, t
        },
        popup: function(e, t, n, i) {
            var a = document.documentElement,
                r = void 0 !== window.screenLeft ? window.screenLeft : screen.left,
                o = void 0 !== window.screenTop ? window.screenTop : screen.top,
                s = window.innerWidth || a.clientWidth || screen.width,
                l = window.innerHeight || a.clientHeight || screen.height,
                c = (s - n) / 2 + r,
                d = (l - i) / 2 + o,
                u = function(e) {
                    var a = window.open(e, "_blank", "resizeable=true,scrollbars,height=" + i + ",width=" + n + ",left=" + c + ",top=" + d);
                    if (a && a.addEventListener) {
                        var r = hello.utils.url(t),
                            o = r.origin || r.protocol + "//" + r.hostname;
                        a.addEventListener("loadstart", function(e) {
                            var t = e.url;
                            if (0 === t.indexOf(o)) {
                                var n = hello.utils.url(t),
                                    i = {
                                        location: {
                                            assign: function(e) {
                                                a.addEventListener("exit", function() {
                                                    setTimeout(function() {
                                                        u(e)
                                                    }, 1e3)
                                                })
                                            },
                                            search: n.search,
                                            hash: n.hash,
                                            href: n.href
                                        },
                                        close: function() {
                                            a.close && a.close()
                                        }
                                    };
                                hello.utils.responseHandler(i, window), i.close()
                            }
                        })
                    }
                    return a && a.focus && a.focus(), a
                };
            return -1 !== navigator.userAgent.indexOf("Safari") && -1 === navigator.userAgent.indexOf("Chrome") && (e = t + "#oauth_redirect=" + encodeURIComponent(encodeURIComponent(e))), u(e)
        },
        responseHandler: function(e, t) {
            function n(e, t, n) {
                if (r.store(e.network, e), !("display" in e && "page" === e.display)) {
                    if (n) {
                        var a = e.callback;
                        try {
                            delete e.callback
                        } catch (e) {}
                        if (r.store(e.network, e), a in n) {
                            var o = JSON.stringify(e);
                            try {
                                n[a](o)
                            } catch (e) {}
                        }
                    }
                    i()
                }
            }

            function i() {
                try {
                    e.close()
                } catch (e) {}
                e.addEventListener && e.addEventListener("load", function() {
                    e.close()
                })
            }
            var a, r = this,
                o = e.location;
            if (a = r.param(o.search), a && (a.code && a.state || a.oauth_token && a.proxy_url)) {
                var s = JSON.parse(a.state);
                a.redirect_uri = s.redirect_uri || o.href.replace(/[\?\#].*$/, "");
                var l = (s.oauth_proxy || a.proxy_url) + "?" + r.param(a);
                return void o.assign(l)
            }
            if (a = r.merge(r.param(o.search || ""), r.param(o.hash || "")), a && "state" in a) {
                try {
                    var c = JSON.parse(a.state);
                    r.extend(a, c)
                } catch (e) {
                    console.error("Could not decode state parameter")
                }
                if ("access_token" in a && a.access_token && a.network) a.expires_in && 0 !== parseInt(a.expires_in, 10) || (a.expires_in = 0), a.expires_in = parseInt(a.expires_in, 10), a.expires = (new Date).getTime() / 1e3 + (a.expires_in || 31536e3), n(a, e, t);
                else if ("error" in a && a.error && a.network) a.error = {
                    code: a.error,
                    message: a.error_message || a.error_description
                }, n(a, e, t);
                else if (a.callback && a.callback in t) {
                    var d = !!("result" in a && a.result) && JSON.parse(a.result);
                    t[a.callback](d), i()
                }
                a.page_uri && o.assign(a.page_uri)
            } else if ("oauth_redirect" in a) return void o.assign(decodeURIComponent(a.oauth_redirect))
        }
    }), hello.utils.Event.call(hello), hello.utils.responseHandler(window, window.opener || window.parent),
    function(e) {
        var t = {},
            n = {};
        e.on("auth.login, auth.logout", function(n) {
                n && "object" == typeof n && n.network && (t[n.network] = e.utils.store(n.network) || {})
            }),
            function i() {
                var a = (new Date).getTime() / 1e3,
                    r = function(t) {
                        e.emit("auth." + t, {
                            network: o,
                            authResponse: s
                        })
                    };
                for (var o in e.services)
                    if (e.services.hasOwnProperty(o)) {
                        if (!e.services[o].id) continue;
                        var s = e.utils.store(o) || {},
                            l = e.services[o],
                            c = t[o] || {};
                        if (s && "callback" in s) {
                            var d = s.callback;
                            try {
                                delete s.callback
                            } catch (e) {}
                            e.utils.store(o, s);
                            try {
                                window[d](s)
                            } catch (e) {}
                        }
                        if (s && "expires" in s && s.expires < a) {
                            var u = l.refresh || s.refresh_token;
                            !u || o in n && !(n[o] < a) ? u || o in n || (r("expired"), n[o] = !0) : (e.emit("notice", o + " has expired trying to resignin"), e.login(o, {
                                display: "none",
                                force: !1
                            }), n[o] = a + 600);
                            continue
                        }
                        if (c.access_token === s.access_token && c.expires === s.expires) continue;
                        !s.access_token && c.access_token ? r("logout") : s.access_token && !c.access_token ? r("login") : s.expires !== c.expires && r("update"), t[o] = s, o in n && delete n[o]
                    }
                setTimeout(i, 1e3)
            }()
    }(hello), hello.api = function() {
        function e(e) {
            e = e.replace(/\@\{([a-z\_\-]+)(\|.*?)?\}/gi, function(e, t, n) {
                var o = n ? n.replace(/^\|/, "") : "";
                return t in r.query ? (o = r.query[t], delete r.query[t]) : n || a.reject(i("missing_attribute", "The attribute " + t + " is missing from the request")), o
            }), e.match(/^https?:\/\//) || (e = c.base + e), r.url = e, n.request(r, function(e, t) {
                if (e === !0 ? e = {
                        success: !0
                    } : e || (e = {}), "delete" === r.method && (e = !e || n.isEmpty(e) ? {
                        success: !0
                    } : e), c.wrap && (r.path in c.wrap || "default" in c.wrap)) {
                    var i = r.path in c.wrap ? r.path : "default",
                        o = ((new Date).getTime(), c.wrap[i](e, t, r));
                    o && (e = o)
                }
                e && "paging" in e && e.paging.next && ("?" === e.paging.next[0] ? e.paging.next = r.path + e.paging.next : e.paging.next += "#" + r.path), !e || "error" in e ? a.reject(e) : a.fulfill(e)
            })
        }
        var t = this,
            n = t.utils,
            i = n.error,
            a = n.Promise(),
            r = n.args({
                path: "s!",
                query: "o",
                method: "s",
                data: "o",
                timeout: "i",
                callback: "f"
            }, arguments);
        r.method = (r.method || "get").toLowerCase(), r.headers = r.headers || {}, r.query = r.query || {}, ("get" === r.method || "delete" === r.method) && (n.extend(r.query, r.data), r.data = {});
        var o = r.data = r.data || {};
        if (a.then(r.callback, r.callback), !r.path) return a.reject(i("invalid_path", "Missing the path parameter from the request"));
        r.path = r.path.replace(/^\/+/, "");
        var s = (r.path.split(/[\/\:]/, 2) || [])[0].toLowerCase();
        if (s in t.services) {
            r.network = s;
            var l = new RegExp("^" + s + ":?/?");
            r.path = r.path.replace(l, "")
        }
        r.network = t.settings.default_service = r.network || t.settings.default_service;
        var c = t.services[r.network];
        if (!c) return a.reject(i("invalid_network", "Could not match the service requested: " + r.network));
        if (r.method in c && r.path in c[r.method] && c[r.method][r.path] === !1) return a.reject(i("invalid_path", "The provided path is not available on the selected network"));
        r.oauth_proxy || (r.oauth_proxy = t.settings.oauth_proxy), "proxy" in r || (r.proxy = r.oauth_proxy && c.oauth && 1 === parseInt(c.oauth.version, 10)), "timeout" in r || (r.timeout = t.settings.timeout);
        var d = t.getAuthResponse(r.network);
        d && d.access_token && (r.query.access_token = d.access_token);
        var u, p = r.path;
        r.options = n.clone(r.query), r.data = n.clone(o);
        var f = c[{
            "delete": "del"
        }[r.method] || r.method] || {};
        if ("get" === r.method) {
            var h = p.split(/[\?#]/)[1];
            h && (n.extend(r.query, n.param(h)), p = p.replace(/\?.*?(#|$)/, "$1"))
        }
        return (u = p.match(/#(.+)/, "")) ? (p = p.split("#")[0], r.path = u[1]) : p in f ? (r.path = p, p = f[p]) : "default" in f && (p = f["default"]), r.redirect_uri = t.settings.redirect_uri, r.oauth = c.oauth, r.xhr = c.xhr, r.jsonp = c.jsonp, r.form = c.form, "function" == typeof p ? p(r, e) : e(p), a.proxy
    }, hello.utils.extend(hello.utils, {
        request: function(e, t) {
            function n(e, t) {
                var n;
                e.oauth && 1 === parseInt(e.oauth.version, 10) && (n = e.query.access_token, delete e.query.access_token, e.proxy = !0), !e.data || "get" !== e.method && "delete" !== e.method || (i.extend(e.query, e.data), e.data = null);
                var a = i.qs(e.url, e.query);
                e.proxy && (a = i.qs(e.oauth_proxy, {
                    path: a,
                    access_token: n || "",
                    then: e.proxy_response_type || ("get" === e.method.toLowerCase() ? "redirect" : "proxy"),
                    method: e.method.toLowerCase(),
                    suppress_response_codes: !0
                })), t(a)
            }
            var i = this,
                a = i.error;
            if (i.isEmpty(e.data) || "FileList" in window || !i.hasBinary(e.data) || (e.xhr = !1, e.jsonp = !1), "withCredentials" in new XMLHttpRequest && (!("xhr" in e) || e.xhr && ("function" != typeof e.xhr || e.xhr(e, e.query)))) return void n(e, function(n) {
                var a = i.xhr(e.method, n, e.headers, e.data, t);
                a.onprogress = e.onprogress || null, a.upload && e.onuploadprogress && (a.upload.onprogress = e.onuploadprogress)
            });
            var r = e.query;
            if (e.query = i.clone(e.query), e.callbackID = i.globalEvent(), e.jsonp !== !1) {
                if (e.query.callback = e.callbackID, "function" == typeof e.jsonp && e.jsonp(e, e.query), "get" === e.method) return void n(e, function(n) {
                    i.jsonp(n, t, e.callbackID, e.timeout)
                });
                e.query = r
            }
            if (e.form !== !1) {
                e.query.redirect_uri = e.redirect_uri, e.query.state = JSON.stringify({
                    callback: e.callbackID
                });
                var o;
                if ("function" == typeof e.form && (o = e.form(e, e.query)), "post" === e.method && o !== !1) return void n(e, function(n) {
                    i.post(n, e.data, o, t, e.callbackID, e.timeout)
                })
            }
            t(a("invalid_request", "There was no mechanism for handling this request"))
        },
        domInstance: function(e, t) {
            var n = "HTML" + (e || "").replace(/^[a-z]/, function(e) {
                return e.toUpperCase()
            }) + "Element";
            return !!t && (window[n] ? t instanceof window[n] : window.Element ? t instanceof window.Element && (!e || t.tagName && t.tagName.toLowerCase() === e) : !(t instanceof Object || t instanceof Array || t instanceof String || t instanceof Number) && t.tagName && t.tagName.toLowerCase() === e)
        },
        clone: function(e) {
            if (null === e || "object" != typeof e || e instanceof Date || "nodeName" in e || this.isBinary(e)) return e;
            if (Array.isArray(e)) return e.map(this.clone);
            var t = {};
            for (var n in e) t[n] = this.clone(e[n]);
            return t
        },
        xhr: function(e, t, n, i, a) {
            function r(e) {
                for (var t, n = {}, i = /([a-z\-]+):\s?(.*);?/gi; t = i.exec(e);) n[t[1]] = t[2];
                return n
            }
            var o = new XMLHttpRequest,
                s = this.error,
                l = !1;
            "blob" === e && (l = e, e = "GET"), e = e.toUpperCase(), o.onload = function() {
                var t = o.response;
                try {
                    t = JSON.parse(o.responseText)
                } catch (e) {
                    401 === o.status && (t = s("access_denied", o.statusText))
                }
                var n = r(o.getAllResponseHeaders());
                n.statusCode = o.status, a(t || ("GET" === e ? s("empty_response", "Could not get resource") : {}), n)
            }, o.onerror = function() {
                var e = o.responseText;
                try {
                    e = JSON.parse(o.responseText)
                } catch (e) {}
                a(e || s("access_denied", "Could not get resource"))
            };
            var c;
            if ("GET" === e || "DELETE" === e) i = null;
            else if (!(!i || "string" == typeof i || i instanceof FormData || i instanceof File || i instanceof Blob)) {
                var d = new FormData;
                for (c in i) i.hasOwnProperty(c) && (i[c] instanceof HTMLInputElement ? "files" in i[c] && i[c].files.length > 0 && d.append(c, i[c].files[0]) : i[c] instanceof Blob ? d.append(c, i[c], i.name) : d.append(c, i[c]));
                i = d
            }
            if (o.open(e, t, !0), l && ("responseType" in o ? o.responseType = l : o.overrideMimeType("text/plain; charset=x-user-defined")), n)
                for (c in n) o.setRequestHeader(c, n[c]);
            return o.send(i), o
        },
        jsonp: function(e, t, n, i) {
            var a, r = this,
                o = r.error,
                s = 0,
                l = document.getElementsByTagName("head")[0],
                c = o("server_error", "server_error"),
                d = function() {
                    s++ || window.setTimeout(function() {
                        t(c), l.removeChild(u)
                    }, 0)
                };
            n = r.globalEvent(function(e) {
                return c = e, !0
            }, n), e = e.replace(new RegExp("=\\?(&|$)"), "=" + n + "$1");
            var u = r.append("script", {
                id: n,
                name: n,
                src: e,
                async: !0,
                onload: d,
                onerror: d,
                onreadystatechange: function() {
                    /loaded|complete/i.test(this.readyState) && d()
                }
            });
            window.navigator.userAgent.toLowerCase().indexOf("opera") > -1 && (a = r.append("script", {
                text: "document.getElementById('" + callbackId + "').onerror();"
            }), u.async = !1), i && window.setTimeout(function() {
                c = o("timeout", "timeout"), d()
            }, i), l.appendChild(u), a && l.appendChild(a)
        },
        post: function(e, t, n, i, a, r) {
            var o, s = this,
                l = s.error,
                c = document,
                d = null,
                u = [],
                p = 0,
                f = null,
                h = 0,
                m = function(e) {
                    h++ || i(e)
                };
            s.globalEvent(m, a);
            var g;
            try {
                g = c.createElement('<iframe name="' + a + '">')
            } catch (e) {
                g = c.createElement("iframe")
            }
            if (g.name = a, g.id = a, g.style.display = "none", n && n.callbackonload && (g.onload = function() {
                    m({
                        response: "posted",
                        message: "Content was posted"
                    })
                }), r && setTimeout(function() {
                    m(l("timeout", "The post operation timed out"))
                }, r), c.body.appendChild(g), s.domInstance("form", t)) {
                for (d = t.form, p = 0; p < d.elements.length; p++) d.elements[p] !== t && d.elements[p].setAttribute("disabled", !0);
                t = d
            }
            if (s.domInstance("form", t))
                for (d = t, p = 0; p < d.elements.length; p++) d.elements[p].disabled || "file" !== d.elements[p].type || (d.encoding = d.enctype = "multipart/form-data", d.elements[p].setAttribute("name", "file"));
            else {
                for (f in t) t.hasOwnProperty(f) && s.domInstance("input", t[f]) && "file" === t[f].type && (d = t[f].form, d.encoding = d.enctype = "multipart/form-data");
                d || (d = c.createElement("form"), c.body.appendChild(d), o = d);
                var v;
                for (f in t)
                    if (t.hasOwnProperty(f)) {
                        var y = s.domInstance("input", t[f]) || s.domInstance("textArea", t[f]) || s.domInstance("select", t[f]);
                        if (y && t[f].form === d) y && t[f].name !== f && (t[f].setAttribute("name", f), t[f].name = f);
                        else {
                            var b = d.elements[f];
                            if (v)
                                for (b instanceof NodeList || (b = [b]), p = 0; p < b.length; p++) b[p].parentNode.removeChild(b[p]);
                            v = c.createElement("input"), v.setAttribute("type", "hidden"), v.setAttribute("name", f), v.value = y ? t[f].value : s.domInstance(null, t[f]) ? t[f].innerHTML || t[f].innerText : t[f], d.appendChild(v)
                        }
                    }
                for (p = 0; p < d.elements.length; p++) v = d.elements[p], v.name in t || v.getAttribute("disabled") === !0 || (v.setAttribute("disabled", !0), u.push(v))
            }
            d.setAttribute("method", "POST"), d.setAttribute("target", a), d.target = a, d.setAttribute("action", e), setTimeout(function() {
                d.submit(), setTimeout(function() {
                    try {
                        o && o.parentNode.removeChild(o)
                    } catch (e) {
                        try {
                            console.error("HelloJS: could not remove iframe")
                        } catch (e) {}
                    }
                    for (var e = 0; e < u.length; e++) u[e] && (u[e].setAttribute("disabled", !1), u[e].disabled = !1)
                }, 0)
            }, 100)
        },
        hasBinary: function(e) {
            for (var t in e)
                if (e.hasOwnProperty(t) && this.isBinary(e[t])) return !0;
            return !1
        },
        isBinary: function(e) {
            return e instanceof Object && (this.domInstance("input", e) && "file" === e.type || "FileList" in window && e instanceof window.FileList || "File" in window && e instanceof window.File || "Blob" in window && e instanceof window.Blob)
        },
        toBlob: function(e) {
            var t = /^data\:([^;,]+(\;charset=[^;,]+)?)(\;base64)?,/i,
                n = e.match(t);
            if (!n) return e;
            for (var i = atob(e.replace(t, "")), a = [], r = 0; r < i.length; r++) a.push(i.charCodeAt(r));
            return new Blob([new Uint8Array(a)], {
                type: n[1]
            })
        }
    }),
    function(e) {
        var t = e.api,
            n = e.utils;
        n.extend(n, {
            dataToJSON: function(e) {
                var t = this,
                    n = window,
                    i = e.data;
                if (t.domInstance("form", i) ? i = t.nodeListToJSON(i.elements) : "NodeList" in n && i instanceof NodeList ? i = t.nodeListToJSON(i) : t.domInstance("input", i) && (i = t.nodeListToJSON([i])), ("File" in n && i instanceof n.File || "Blob" in n && i instanceof n.Blob || "FileList" in n && i instanceof n.FileList) && (i = {
                        file: i
                    }), !("FormData" in n && i instanceof n.FormData))
                    for (var a in i)
                        if (i.hasOwnProperty(a))
                            if ("FileList" in n && i[a] instanceof n.FileList) 1 === i[a].length && (i[a] = i[a][0]);
                            else {
                                if (t.domInstance("input", i[a]) && "file" === i[a].type) continue;
                                t.domInstance("input", i[a]) || t.domInstance("select", i[a]) || t.domInstance("textArea", i[a]) ? i[a] = i[a].value : t.domInstance(null, i[a]) && (i[a] = i[a].innerHTML || i[a].innerText)
                            }
                return e.data = i, i
            },
            nodeListToJSON: function(e) {
                for (var t = {}, n = 0; n < e.length; n++) {
                    var i = e[n];
                    !i.disabled && i.name && (t[i.name] = "file" === i.type ? i : i.value || i.innerHTML)
                }
                return t
            }
        }), e.api = function() {
            var e = n.args({
                path: "s!",
                method: "s",
                data: "o",
                timeout: "i",
                callback: "f"
            }, arguments);
            return e.data && n.dataToJSON(e), t.call(this, e);
        }
    }(hello),
    function(e) {
        function t(e) {
            e && "error" in e && (e.error = {
                code: "server_error",
                message: e.error.message || e.error
            })
        }

        function n(t, n, i) {
            if (!("object" != typeof t || "undefined" != typeof Blob && t instanceof Blob || "undefined" != typeof ArrayBuffer && t instanceof ArrayBuffer || "error" in t)) {
                var a = t.root + t.path.replace(/\&/g, "%26");
                t.thumb_exists && (t.thumbnail = e.settings.oauth_proxy + "?path=" + encodeURIComponent("https://api-content.dropbox.com/1/thumbnails/" + a + "?format=jpeg&size=m") + "&access_token=" + i.query.access_token), t.type = t.is_dir ? "folder" : t.mime_type, t.name = t.path.replace(/.*\//g, ""), t.is_dir ? t.files = "metadata/" + a : (t.downloadLink = e.settings.oauth_proxy + "?path=" + encodeURIComponent("https://api-content.dropbox.com/1/files/" + a) + "&access_token=" + i.query.access_token, t.file = "https://api-content.dropbox.com/1/files/" + a), t.id || (t.id = t.path.replace(/^\//, ""))
            }
        }

        function i(e) {
            return function(t, n) {
                delete t.query.limit, n(e)
            }
        }
        e.init({
            dropbox: {
                name: "Dropbox",
                oauth: {
                    version: "1.0",
                    auth: "https://www.dropbox.com/1/oauth/authorize",
                    request: "https://api.dropbox.com/1/oauth/request_token",
                    token: "https://api.dropbox.com/1/oauth/access_token"
                },
                login: function(e) {
                    e.options.window_width = 1e3, e.options.window_height = 1e3
                },
                base: "https://api.dropbox.com/1/",
                root: "sandbox",
                get: {
                    me: "account/info",
                    "me/files": i("metadata/@{root|sandbox}/@{parent}"),
                    "me/folder": i("metadata/@{root|sandbox}/@{id}"),
                    "me/folders": i("metadata/@{root|sandbox}/"),
                    "default": function(e, t) {
                        e.path.match("https://api-content.dropbox.com/1/files/") && (e.method = "blob"), t(e.path)
                    }
                },
                post: {
                    "me/files": function(t, n) {
                        var i = t.data.parent,
                            a = t.data.name;
                        t.data = {
                            file: t.data.file
                        }, "string" == typeof t.data.file && (t.data.file = e.utils.toBlob(t.data.file)), n("https://api-content.dropbox.com/1/files_put/@{root|sandbox}/" + i + "/" + a)
                    },
                    "me/folders": function(t, n) {
                        var i = t.data.name;
                        t.data = {}, n("fileops/create_folder?root=@{root|sandbox}&" + e.utils.param({
                            path: i
                        }))
                    }
                },
                del: {
                    "me/files": "fileops/delete?root=@{root|sandbox}&path=@{id}",
                    "me/folder": "fileops/delete?root=@{root|sandbox}&path=@{id}"
                },
                wrap: {
                    me: function(e) {
                        if (t(e), !e.uid) return e;
                        e.name = e.display_name;
                        var n = e.name.split(" ");
                        return e.first_name = n.shift(), e.last_name = n.join(" "), e.id = e.uid, delete e.uid, delete e.display_name, e
                    },
                    "default": function(e, i, a) {
                        return t(e), e.is_dir && e.contents && (e.data = e.contents, delete e.contents, e.data.forEach(function(t) {
                            t.root = e.root, n(t, i, a)
                        })), n(e, i, a), e.is_deleted && (e.success = !0), e
                    }
                },
                xhr: function(e) {
                    if (e.data && e.data.file) {
                        var t = e.data.file;
                        t && (e.data = t.files ? t.files[0] : t)
                    }
                    return "delete" === e.method && (e.method = "post"), !0
                },
                form: function(e, t) {
                    delete t.state, delete t.redirect_uri
                }
            }
        })
    }(hello),
    function(e) {
        function t(e) {
            return e.id && (e.thumbnail = e.picture = "https://graph.facebook.com/" + e.id + "/picture"), e
        }

        function n(e) {
            return "data" in e && e.data.forEach(t), e
        }

        function i(e, t, n) {
            if ("boolean" == typeof e && (e = {
                    success: e
                }), e && "data" in e) {
                var i = n.query.access_token;
                e.data.forEach(function(e) {
                    e.picture && (e.thumbnail = e.picture), e.pictures = (e.images || []).sort(function(e, t) {
                        return e.width - t.width
                    }), e.cover_photo && (e.thumbnail = a + e.cover_photo + "/picture?access_token=" + i), "album" === e.type && (e.files = e.photos = a + e.id + "/photos"), e.can_upload && (e.upload_location = a + e.id + "/photos")
                })
            }
            return e
        }
        e.init({
            facebook: {
                name: "Facebook",
                oauth: {
                    version: 2,
                    auth: "https://www.facebook.com/dialog/oauth/",
                    grant: "https://graph.facebook.com/oauth/access_token"
                },
                scope: {
                    basic: "public_profile",
                    email: "email",
                    birthday: "user_birthday",
                    events: "user_events",
                    photos: "user_photos,user_videos",
                    videos: "user_photos,user_videos",
                    friends: "user_friends",
                    files: "user_photos,user_videos",
                    publish_files: "user_photos,user_videos,publish_actions",
                    publish: "publish_actions",
                    offline_access: "offline_access"
                },
                refresh: !0,
                login: function(e) {
                    e.options.force && (e.qs.auth_type = "reauthenticate"), e.options.auth_type && (e.qs.auth_type = e.options.auth_type), e.options.window_width = 580, e.options.window_height = 400
                },
                logout: function(t) {
                    var n = e.utils.globalEvent(t),
                        i = encodeURIComponent(e.settings.redirect_uri + "?" + e.utils.param({
                            callback: n,
                            result: JSON.stringify({
                                force: !0
                            }),
                            state: "{}"
                        })),
                        a = (e.utils.store("facebook") || {}).access_token;
                    return e.utils.iframe("https://www.facebook.com/logout.php?next=" + i + "&access_token=" + a), !!a && void 0
                },
                base: "https://graph.facebook.com/",
                get: {
                    me: "me",
                    "me/friends": "me/friends",
                    "me/following": "me/friends",
                    "me/followers": "me/friends",
                    "me/share": "me/feed",
                    "me/like": "me/likes",
                    "me/files": "me/albums",
                    "me/albums": "me/albums",
                    "me/album": "@{id}/photos",
                    "me/photos": "me/photos",
                    "me/photo": "@{id}",
                    "friend/albums": "@{id}/albums",
                    "friend/photos": "@{id}/photos"
                },
                post: {
                    "me/share": "me/feed",
                    "me/photo": "@{id}"
                },
                wrap: {
                    me: t,
                    "me/friends": n,
                    "me/following": n,
                    "me/followers": n,
                    "me/albums": i,
                    "me/photos": i,
                    "me/files": i,
                    "default": i
                },
                xhr: function(t, n) {
                    return ("get" === t.method || "post" === t.method) && (n.suppress_response_codes = !0), "post" === t.method && t.data && "string" == typeof t.data.file && (t.data.file = e.utils.toBlob(t.data.file)), !0
                },
                jsonp: function(t, n) {
                    var i = t.method;
                    "get" === i || e.utils.hasBinary(t.data) ? "delete" === t.method && (n.method = "delete", t.method = "post") : (t.data.method = i, t.method = "get")
                },
                form: function() {
                    return {
                        callbackonload: !0
                    }
                }
            }
        });
        var a = "https://graph.facebook.com/"
    }(hello),
    function(e) {
        function t(t, n, i) {
            var a = (i ? "" : "flickr:") + "?method=" + t + "&api_key=" + e.services.flickr.id + "&format=json";
            for (var r in n) n.hasOwnProperty(r) && (a += "&" + r + "=" + n[r]);
            return a
        }

        function n(t) {
            var n = e.getAuthResponse("flickr");
            t(n && n.user_nsid ? n.user_nsid : null)
        }

        function i(e, i) {
            return i || (i = {}),
                function(a, r) {
                    n(function(n) {
                        i.user_id = n, r(t(e, i, !0))
                    })
                }
        }

        function a(e, t) {
            var n = "https://www.flickr.com/images/buddyicon.gif";
            return e.nsid && e.iconserver && e.iconfarm && (n = "https://farm" + e.iconfarm + ".staticflickr.com/" + e.iconserver + "/buddyicons/" + e.nsid + (t ? "_" + t : "") + ".jpg"), n
        }

        function r(e, t, n, i, a) {
            return a = a ? "_" + a : "", "https://farm" + t + ".staticflickr.com/" + n + "/" + e + "_" + i + a + ".jpg"
        }

        function o(e) {
            e && e.stat && "ok" != e.stat.toLowerCase() && (e.error = {
                code: "invalid_request",
                message: e.message
            })
        }

        function s(e) {
            if (e.photoset || e.photos) {
                var t = "photoset" in e ? "photoset" : "photos";
                e = c(e, t), u(e), e.data = e.photo, delete e.photo;
                for (var n = 0; n < e.data.length; n++) {
                    var i = e.data[n];
                    i.name = i.title, i.picture = r(i.id, i.farm, i.server, i.secret, ""), i.pictures = l(i.id, i.farm, i.server, i.secret), i.source = r(i.id, i.farm, i.server, i.secret, "b"), i.thumbnail = r(i.id, i.farm, i.server, i.secret, "m")
                }
            }
            return e
        }

        function l(e, t, n, i) {
            var a = 2048,
                o = [{
                    id: "t",
                    max: 100
                }, {
                    id: "m",
                    max: 240
                }, {
                    id: "n",
                    max: 320
                }, {
                    id: "",
                    max: 500
                }, {
                    id: "z",
                    max: 640
                }, {
                    id: "c",
                    max: 800
                }, {
                    id: "b",
                    max: 1024
                }, {
                    id: "h",
                    max: 1600
                }, {
                    id: "k",
                    max: 2048
                }, {
                    id: "o",
                    max: a
                }];
            return o.map(function(a) {
                return {
                    source: r(e, t, n, i, a.id),
                    width: a.max,
                    height: a.max
                }
            })
        }

        function c(e, t) {
            return t in e ? e = e[t] : "error" in e || (e.error = {
                code: "invalid_request",
                message: e.message || "Failed to get data from Flickr"
            }), e
        }

        function d(e) {
            if (o(e), e.contacts) {
                e = c(e, "contacts"), u(e), e.data = e.contact, delete e.contact;
                for (var t = 0; t < e.data.length; t++) {
                    var n = e.data[t];
                    n.id = n.nsid, n.name = n.realname || n.username, n.thumbnail = a(n, "m")
                }
            }
            return e
        }

        function u(e) {
            e.page && e.pages && e.page !== e.pages && (e.paging = {
                next: "?page=" + ++e.page
            })
        }
        e.init({
            flickr: {
                name: "Flickr",
                oauth: {
                    version: "1.0a",
                    auth: "https://www.flickr.com/services/oauth/authorize?perms=read",
                    request: "https://www.flickr.com/services/oauth/request_token",
                    token: "https://www.flickr.com/services/oauth/access_token"
                },
                base: "https://api.flickr.com/services/rest",
                get: {
                    me: i("flickr.people.getInfo"),
                    "me/friends": i("flickr.contacts.getList", {
                        per_page: "@{limit|50}"
                    }),
                    "me/following": i("flickr.contacts.getList", {
                        per_page: "@{limit|50}"
                    }),
                    "me/followers": i("flickr.contacts.getList", {
                        per_page: "@{limit|50}"
                    }),
                    "me/albums": i("flickr.photosets.getList", {
                        per_page: "@{limit|50}"
                    }),
                    "me/album": i("flickr.photosets.getPhotos", {
                        photoset_id: "@{id}"
                    }),
                    "me/photos": i("flickr.people.getPhotos", {
                        per_page: "@{limit|50}"
                    })
                },
                wrap: {
                    me: function(e) {
                        if (o(e), e = c(e, "person"), e.id) {
                            if (e.realname) {
                                e.name = e.realname._content;
                                var t = e.name.split(" ");
                                e.first_name = t.shift(), e.last_name = t.join(" ")
                            }
                            e.thumbnail = a(e, "l"), e.picture = a(e, "l")
                        }
                        return e
                    },
                    "me/friends": d,
                    "me/followers": d,
                    "me/following": d,
                    "me/albums": function(e) {
                        return o(e), e = c(e, "photosets"), u(e), e.photoset && (e.data = e.photoset, e.data.forEach(function(e) {
                            e.name = e.title._content, e.photos = "https://api.flickr.com/services/rest" + t("flickr.photosets.getPhotos", {
                                photoset_id: e.id
                            }, !0)
                        }), delete e.photoset), e
                    },
                    "me/photos": function(e) {
                        return o(e), s(e)
                    },
                    "default": function(e) {
                        return o(e), s(e)
                    }
                },
                xhr: !1,
                jsonp: function(e, t) {
                    "get" == e.method && (delete t.callback, t.jsoncallback = e.callbackID)
                }
            }
        })
    }(hello),
    function(e) {
        function t(e) {
            !e.meta || 400 !== e.meta.code && 401 !== e.meta.code || (e.error = {
                code: "access_denied",
                message: e.meta.errorDetail
            })
        }

        function n(e) {
            e && e.id && (e.thumbnail = e.photo.prefix + "100x100" + e.photo.suffix, e.name = e.firstName + " " + e.lastName, e.first_name = e.firstName, e.last_name = e.lastName, e.contact && e.contact.email && (e.email = e.contact.email))
        }

        function i(e, t) {
            var n = t.access_token;
            return delete t.access_token, t.oauth_token = n, t.v = 20121125, !0
        }
        e.init({
            foursquare: {
                name: "Foursquare",
                oauth: {
                    version: 2,
                    auth: "https://foursquare.com/oauth2/authenticate",
                    grant: "https://foursquare.com/oauth2/access_token"
                },
                refresh: !0,
                base: "https://api.foursquare.com/v2/",
                get: {
                    me: "users/self",
                    "me/friends": "users/self/friends",
                    "me/followers": "users/self/friends",
                    "me/following": "users/self/friends"
                },
                wrap: {
                    me: function(e) {
                        return t(e), e && e.response && (e = e.response.user, n(e)), e
                    },
                    "default": function(e) {
                        return t(e), e && "response" in e && "friends" in e.response && "items" in e.response.friends && (e.data = e.response.friends.items, e.data.forEach(n), delete e.response), e
                    }
                },
                xhr: i,
                jsonp: i
            }
        })
    }(hello),
    function(e) {
        function t(e, t) {
            var n = t ? t.statusCode : e && "meta" in e && "status" in e.meta && e.meta.status;
            (401 === n || 403 === n) && (e.error = {
                code: "access_denied",
                message: e.message || (e.data ? e.data.message : "Could not get response")
            }, delete e.message)
        }

        function n(e) {
            e.id && (e.thumbnail = e.picture = e.avatar_url, e.name = e.login)
        }

        function i(e, t) {
            if (e.data && e.data.length && t && t.Link) {
                var n = t.Link.match(/<(.*?)>;\s*rel=\"next\"/);
                n && (e.paging = {
                    next: n[1]
                })
            }
        }
        e.init({
            github: {
                name: "GitHub",
                oauth: {
                    version: 2,
                    auth: "https://github.com/login/oauth/authorize",
                    grant: "https://github.com/login/oauth/access_token",
                    response_type: "code"
                },
                scope: {
                    basic: "",
                    email: "user:email"
                },
                base: "https://api.github.com/",
                get: {
                    me: "user",
                    "me/friends": "user/following?per_page=@{limit|100}",
                    "me/following": "user/following?per_page=@{limit|100}",
                    "me/followers": "user/followers?per_page=@{limit|100}",
                    "me/like": "user/starred?per_page=@{limit|100}"
                },
                wrap: {
                    me: function(e, i) {
                        return t(e, i), n(e), e
                    },
                    "default": function(e, a, r) {
                        return t(e, a), Array.isArray(e) && (e = {
                            data: e
                        }), e.data && (i(e, a, r), e.data.forEach(n)), e
                    }
                },
                xhr: function(e) {
                    return "get" !== e.method && e.data && (e.headers = e.headers || {}, e.headers["Content-Type"] = "application/json", "object" == typeof e.data && (e.data = JSON.stringify(e.data))), !0
                }
            }
        })
    }(hello),
    function(e) {
        function t(e) {
            return parseInt(e, 10)
        }

        function n(e) {
            return d(e), e.data = e.items, delete e.items, e
        }

        function i(e) {
            return e.error ? void 0 : (e.name || (e.name = e.title || e.message), e.picture || (e.picture = e.thumbnailLink), e.thumbnail || (e.thumbnail = e.thumbnailLink), "application/vnd.google-apps.folder" === e.mimeType && (e.type = "folder", e.files = "https://www.googleapis.com/drive/v2/files?q=%22" + e.id + "%22+in+parents"), e)
        }

        function a(e) {
            return {
                source: e.url,
                width: e.width,
                height: e.height
            }
        }

        function r(e) {
            e.data = e.feed.entry.map(c), delete e.feed
        }

        function o(e) {
            if (d(e), "feed" in e && "entry" in e.feed) e.data = e.feed.entry.map(c), delete e.feed;
            else {
                if ("entry" in e) return c(e.entry);
                "items" in e ? (e.data = e.items.map(i), delete e.items) : i(e)
            }
            return e
        }

        function s(e) {
            e.name = e.displayName || e.name, e.picture = e.picture || (e.image ? e.image.url : null), e.thumbnail = e.picture
        }

        function l(e, t, n) {
            if (d(e), "feed" in e && "entry" in e.feed) {
                for (var i = n.query.access_token, a = 0; a < e.feed.entry.length; a++) {
                    var r = e.feed.entry[a];
                    if (r.id = r.id.$t, r.name = r.title.$t, delete r.title, r.gd$email && (r.email = r.gd$email && r.gd$email.length > 0 ? r.gd$email[0].address : null, r.emails = r.gd$email, delete r.gd$email), r.updated && (r.updated = r.updated.$t), r.link) {
                        var o = r.link.length > 0 ? r.link[0].href : null;
                        o && r.link[0].gd$etag && (o += (o.indexOf("?") > -1 ? "&" : "?") + "access_token=" + i, r.picture = o, r.thumbnail = o), delete r.link
                    }
                    r.category && delete r.category
                }
                e.data = e.feed.entry, delete e.feed
            }
            return e
        }

        function c(e) {
            var t, n = e.media$group,
                i = n.media$content.length ? n.media$content[0] : {},
                r = n.media$content || [],
                o = n.media$thumbnail || [],
                s = r.concat(o).map(a).sort(function(e, t) {
                    return e.width - t.width
                }),
                l = 0,
                c = {
                    id: e.id.$t,
                    name: e.title.$t,
                    description: e.summary.$t,
                    updated_time: e.updated.$t,
                    created_time: e.published.$t,
                    picture: i ? i.url : null,
                    pictures: s,
                    images: [],
                    thumbnail: i ? i.url : null,
                    width: i.width,
                    height: i.height
                };
            if ("link" in e)
                for (l = 0; l < e.link.length; l++) {
                    var d = e.link[l];
                    if (d.rel.match(/\#feed$/)) {
                        c.upload_location = c.files = c.photos = d.href;
                        break
                    }
                }
            if ("category" in e && e.category.length)
                for (t = e.category, l = 0; l < t.length; l++) t[l].scheme && t[l].scheme.match(/\#kind$/) && (c.type = t[l].term.replace(/^.*?\#/, ""));
            return "media$thumbnail" in n && n.media$thumbnail.length && (t = n.media$thumbnail, c.thumbnail = t[0].url, c.images = t.map(a)), t = n.media$content, t && t.length && c.images.push(a(t[0])), c
        }

        function d(e) {
            if ("feed" in e && e.feed.openSearch$itemsPerPage) {
                var n = t(e.feed.openSearch$itemsPerPage.$t),
                    i = t(e.feed.openSearch$startIndex.$t),
                    a = t(e.feed.openSearch$totalResults.$t);
                a > i + n && (e.paging = {
                    next: "?start=" + (i + n)
                })
            } else "nextPageToken" in e && (e.paging = {
                next: "?pageToken=" + e.nextPageToken
            })
        }

        function u() {
            function e(e) {
                var n = new FileReader;
                n.onload = function(n) {
                    t(btoa(n.target.result), e.type + r + "Content-Transfer-Encoding: base64")
                }, n.readAsBinaryString(e)
            }

            function t(e, t) {
                n.push(r + "Content-Type: " + t + r + r + e), a--, s()
            }
            var n = [],
                i = (1e10 * Math.random()).toString(32),
                a = 0,
                r = "\r\n",
                o = r + "--" + i,
                s = function() {},
                l = /^data\:([^;,]+(\;charset=[^;,]+)?)(\;base64)?,/i;
            this.append = function(n, i) {
                "string" != typeof n && "length" in Object(n) || (n = [n]);
                for (var o = 0; o < n.length; o++) {
                    a++;
                    var s = n[o];
                    if ("undefined" != typeof File && s instanceof File || "undefined" != typeof Blob && s instanceof Blob) e(s);
                    else if ("string" == typeof s && s.match(l)) {
                        var c = s.match(l);
                        t(s.replace(l, ""), c[1] + r + "Content-Transfer-Encoding: base64")
                    } else t(s, i)
                }
            }, this.onready = function(e) {
                (s = function() {
                    0 === a && (n.unshift(""), n.push("--"), e(n.join(o), i), n = [])
                })()
            }
        }

        function p(e, t) {
            var n = {};
            e.data && "undefined" != typeof HTMLInputElement && e.data instanceof HTMLInputElement && (e.data = {
                file: e.data
            }), !e.data.name && Object(Object(e.data.file).files).length && "post" === e.method && (e.data.name = e.data.file.files[0].name), "post" === e.method ? e.data = {
                title: e.data.name,
                parents: [{
                    id: e.data.parent || "root"
                }],
                file: e.data.file
            } : (n = e.data, e.data = {}, n.parent && (e.data.parents = [{
                id: e.data.parent || "root"
            }]), n.file && (e.data.file = n.file), n.name && (e.data.title = n.name));
            var i;
            if ("file" in e.data && (i = e.data.file, delete e.data.file, "object" == typeof i && "files" in i && (i = i.files), !i || !i.length)) return void t({
                error: {
                    code: "request_invalid",
                    message: "There were no files attached with this request to upload"
                }
            });
            var a = new u;
            a.append(JSON.stringify(e.data), "application/json"), i && a.append(i), a.onready(function(i, a) {
                e.headers["content-type"] = 'multipart/related; boundary="' + a + '"', e.data = i, t("upload/drive/v2/files" + (n.id ? "/" + n.id : "") + "?uploadType=multipart")
            })
        }

        function f(e) {
            if ("object" == typeof e.data) try {
                e.data = JSON.stringify(e.data), e.headers["content-type"] = "application/json"
            } catch (e) {}
        }
        var h = "https://www.google.com/m8/feeds/contacts/default/full?v=3.0&alt=json&max-results=@{limit|1000}&start-index=@{start|1}";
        e.init({
            google: {
                name: "Google Plus",
                oauth: {
                    version: 2,
                    auth: "https://accounts.google.com/o/oauth2/auth",
                    grant: "https://accounts.google.com/o/oauth2/token"
                },
                scope: {
                    basic: "https://www.googleapis.com/auth/plus.me profile",
                    email: "email",
                    birthday: "",
                    events: "",
                    photos: "https://picasaweb.google.com/data/",
                    videos: "http://gdata.youtube.com",
                    friends: "https://www.google.com/m8/feeds, https://www.googleapis.com/auth/plus.login",
                    files: "https://www.googleapis.com/auth/drive.readonly",
                    publish: "",
                    publish_files: "https://www.googleapis.com/auth/drive",
                    create_event: "",
                    offline_access: ""
                },
                scope_delim: " ",
                login: function(e) {
                    "none" === e.qs.display && (e.qs.display = ""), "code" === e.qs.response_type && (e.qs.access_type = "offline"), e.options.force && (e.qs.approval_prompt = "force")
                },
                base: "https://www.googleapis.com/",
                get: {
                    me: "plus/v1/people/me",
                    "me/friends": "plus/v1/people/me/people/visible?maxResults=@{limit|100}",
                    "me/following": h,
                    "me/followers": h,
                    "me/contacts": h,
                    "me/share": "plus/v1/people/me/activities/public?maxResults=@{limit|100}",
                    "me/feed": "plus/v1/people/me/activities/public?maxResults=@{limit|100}",
                    "me/albums": "https://picasaweb.google.com/data/feed/api/user/default?alt=json&max-results=@{limit|100}&start-index=@{start|1}",
                    "me/album": function(e, t) {
                        var n = e.query.id;
                        delete e.query.id, t(n.replace("/entry/", "/feed/"))
                    },
                    "me/photos": "https://picasaweb.google.com/data/feed/api/user/default?alt=json&kind=photo&max-results=@{limit|100}&start-index=@{start|1}",
                    "me/files": "drive/v2/files?q=%22@{parent|root}%22+in+parents+and+trashed=false&maxResults=@{limit|100}",
                    "me/folders": "drive/v2/files?q=%22@{id|root}%22+in+parents+and+mimeType+=+%22application/vnd.google-apps.folder%22+and+trashed=false&maxResults=@{limit|100}",
                    "me/folder": "drive/v2/files?q=%22@{id|root}%22+in+parents+and+trashed=false&maxResults=@{limit|100}"
                },
                post: {
                    "me/files": p,
                    "me/folders": function(e, t) {
                        e.data = {
                            title: e.data.name,
                            parents: [{
                                id: e.data.parent || "root"
                            }],
                            mimeType: "application/vnd.google-apps.folder"
                        }, t("drive/v2/files")
                    }
                },
                put: {
                    "me/files": p
                },
                del: {
                    "me/files": "drive/v2/files/@{id}",
                    "me/folder": "drive/v2/files/@{id}"
                },
                wrap: {
                    me: function(e) {
                        return e.id && (e.last_name = e.family_name || (e.name ? e.name.familyName : null), e.first_name = e.given_name || (e.name ? e.name.givenName : null), e.emails && e.emails.length && (e.email = e.emails[0].value), s(e)), e
                    },
                    "me/friends": function(e) {
                        return e.items && (d(e), e.data = e.items, e.data.forEach(s), delete e.items), e
                    },
                    "me/contacts": l,
                    "me/followers": l,
                    "me/following": l,
                    "me/share": n,
                    "me/feed": n,
                    "me/albums": o,
                    "me/photos": r,
                    "default": o
                },
                xhr: function(e) {
                    return ("post" === e.method || "put" === e.method) && f(e), !0
                },
                form: !1
            }
        })
    }(hello),
    function(e) {
        function t(e) {
            return {
                source: e.url,
                width: e.width,
                height: e.height
            }
        }

        function n(e) {
            e && "meta" in e && "error_type" in e.meta && (e.error = {
                code: e.meta.error_type,
                message: e.meta.error_message
            })
        }

        function i(e) {
            return r(e), e && "data" in e && e.data.forEach(a), e
        }

        function a(e) {
            e.id && (e.thumbnail = e.profile_picture, e.name = e.full_name || e.username)
        }

        function r(e) {
            "pagination" in e && (e.paging = {
                next: e.pagination.next_url
            }, delete e.pagination)
        }
        e.init({
            instagram: {
                name: "Instagram",
                oauth: {
                    version: 2,
                    auth: "https://instagram.com/oauth/authorize/",
                    grant: "https://api.instagram.com/oauth/access_token"
                },
                refresh: !0,
                scope: {
                    basic: "basic",
                    friends: "relationships",
                    publish: "likes comments"
                },
                scope_delim: " ",
                login: function(e) {
                    e.qs.display = ""
                },
                base: "https://api.instagram.com/v1/",
                get: {
                    me: "users/self",
                    "me/feed": "users/self/feed?count=@{limit|100}",
                    "me/photos": "users/self/media/recent?min_id=0&count=@{limit|100}",
                    "me/friends": "users/self/follows?count=@{limit|100}",
                    "me/following": "users/self/follows?count=@{limit|100}",
                    "me/followers": "users/self/followed-by?count=@{limit|100}",
                    "friend/photos": "users/@{id}/media/recent?min_id=0&count=@{limit|100}"
                },
                post: {
                    "me/like": function(e, t) {
                        var n = e.data.id;
                        e.data = {}, t("media/" + n + "/likes")
                    }
                },
                del: {
                    "me/like": "media/@{id}/likes"
                },
                wrap: {
                    me: function(e) {
                        return n(e), "data" in e && (e.id = e.data.id, e.thumbnail = e.data.profile_picture, e.name = e.data.full_name || e.data.username), e
                    },
                    "me/friends": i,
                    "me/following": i,
                    "me/followers": i,
                    "me/photos": function(e) {
                        return n(e), r(e), "data" in e && (e.data = e.data.filter(function(e) {
                            return "image" === e.type
                        }), e.data.forEach(function(e) {
                            e.name = e.caption ? e.caption.text : null, e.thumbnail = e.images.thumbnail.url, e.picture = e.images.standard_resolution.url, e.pictures = Object.keys(e.images).map(function(n) {
                                var i = e.images[n];
                                return t(i)
                            }).sort(function(e, t) {
                                return e.width - t.width
                            })
                        })), e
                    },
                    "default": function(e) {
                        return r(e), e
                    }
                },
                xhr: function(e) {
                    var t = e.method,
                        n = "get" !== t;
                    return n && ("post" !== t && "put" !== t || !e.query.access_token || (e.data.access_token = e.query.access_token, delete e.query.access_token), e.proxy = n), n
                },
                form: !1
            }
        })
    }(hello),
    function(e) {
        function t(e) {
            e && "errorCode" in e && (e.error = {
                code: e.status,
                message: e.message
            })
        }

        function n(e) {
            return e.error ? void 0 : (e.first_name = e.firstName, e.last_name = e.lastName, e.name = e.formattedName || e.first_name + " " + e.last_name, e.thumbnail = e.pictureUrl, e.email = e.emailAddress, e)
        }

        function i(e) {
            return t(e), a(e), e.values && (e.data = e.values.map(n), delete e.values), e
        }

        function a(e) {
            "_count" in e && "_start" in e && e._count + e._start < e._total && (e.paging = {
                next: "?start=" + (e._start + e._count) + "&count=" + e._count
            })
        }

        function r(e, t) {
            "{}" === JSON.stringify(e) && 200 === t.statusCode && (e.success = !0)
        }

        function o(e) {
            e.access_token && (e.oauth2_access_token = e.access_token, delete e.access_token)
        }

        function s(e, t) {
            e.headers["x-li-format"] = "json";
            var n = e.data.id;
            e.data = ("delete" !== e.method).toString(), e.method = "put", t("people/~/network/updates/key=" + n + "/is-liked")
        }
        e.init({
            linkedin: {
                oauth: {
                    version: 2,
                    response_type: "code",
                    auth: "https://www.linkedin.com/uas/oauth2/authorization",
                    grant: "https://www.linkedin.com/uas/oauth2/accessToken"
                },
                refresh: !0,
                scope: {
                    basic: "r_basicprofile",
                    email: "r_emailaddress",
                    friends: "r_network",
                    publish: "rw_nus"
                },
                scope_delim: " ",
                base: "https://api.linkedin.com/v1/",
                get: {
                    me: "people/~:(picture-url,first-name,last-name,id,formatted-name,email-address)",
                    "me/friends": "people/~/connections?count=@{limit|500}",
                    "me/followers": "people/~/connections?count=@{limit|500}",
                    "me/following": "people/~/connections?count=@{limit|500}",
                    "me/share": "people/~/network/updates?count=@{limit|250}"
                },
                post: {
                    "me/share": function(e, t) {
                        var n = {
                            visibility: {
                                code: "anyone"
                            }
                        };
                        e.data.id ? n.attribution = {
                            share: {
                                id: e.data.id
                            }
                        } : (n.comment = e.data.message, e.data.picture && e.data.link && (n.content = {
                            "submitted-url": e.data.link,
                            "submitted-image-url": e.data.picture
                        })), e.data = JSON.stringify(n), t("people/~/shares?format=json")
                    },
                    "me/like": s
                },
                del: {
                    "me/like": s
                },
                wrap: {
                    me: function(e) {
                        return t(e), n(e), e
                    },
                    "me/friends": i,
                    "me/following": i,
                    "me/followers": i,
                    "me/share": function(e) {
                        return t(e), a(e), e.values && (e.data = e.values.map(n), e.data.forEach(function(e) {
                            e.message = e.headline
                        }), delete e.values), e
                    },
                    "default": function(e, n) {
                        t(e), r(e, n), a(e)
                    }
                },
                jsonp: function(e, t) {
                    o(t), "get" === e.method && (t.format = "jsonp", t["error-callback"] = e.callbackID)
                },
                xhr: function(e, t) {
                    return "get" !== e.method && (o(t), e.headers["Content-Type"] = "application/json", e.headers["x-li-format"] = "json", e.proxy = !0, !0)
                }
            }
        })
    }(hello),
    function(e) {
        function t(e, t) {
            var n = t.access_token;
            return delete t.access_token, t.oauth_token = n, t["_status_code_map[302]"] = 200, !0
        }

        function n(e) {
            return e.id && (e.picture = e.avatar_url, e.thumbnail = e.avatar_url, e.name = e.username || e.full_name), e
        }

        function i(e) {
            "next_href" in e && (e.paging = {
                next: e.next_href
            })
        }
        e.init({
            soundcloud: {
                name: "SoundCloud",
                oauth: {
                    version: 2,
                    auth: "https://soundcloud.com/connect",
                    grant: "https://soundcloud.com/oauth2/token"
                },
                base: "https://api.soundcloud.com/",
                get: {
                    me: "me.json",
                    "me/friends": "me/followings.json",
                    "me/followers": "me/followers.json",
                    "me/following": "me/followings.json",
                    "default": function(e, t) {
                        t(e.path + ".json")
                    }
                },
                wrap: {
                    me: function(e) {
                        return n(e), e
                    },
                    "default": function(e) {
                        return Array.isArray(e) && (e = {
                            data: e.map(n)
                        }), i(e), e
                    }
                },
                xhr: t,
                jsonp: t
            }
        })
    }(hello),
    function(e) {
        function t(e) {
            if (e.id) {
                if (e.name) {
                    var t = e.name.split(" ");
                    e.first_name = t.shift(), e.last_name = t.join(" ")
                }
                e.thumbnail = e.profile_image_url_https || e.profile_image_url
            }
            return e
        }

        function n(e) {
            return i(e), a(e), e.users && (e.data = e.users.map(t), delete e.users), e
        }

        function i(e) {
            if (e.errors) {
                var t = e.errors[0];
                e.error = {
                    code: "request_failed",
                    message: t.message
                }
            }
        }

        function a(e) {
            "next_cursor_str" in e && (e.paging = {
                next: "?cursor=" + e.next_cursor_str
            })
        }

        function r(e) {
            return Array.isArray(e) ? {
                data: e
            } : e
        }
        var o = "https://api.twitter.com/";
        e.init({
            twitter: {
                oauth: {
                    version: "1.0a",
                    auth: o + "oauth/authenticate",
                    request: o + "oauth/request_token",
                    token: o + "oauth/access_token"
                },
                login: function(e) {
                    var t = "?force_login=true";
                    this.oauth.auth = this.oauth.auth.replace(t, "") + (e.options.force ? t : "")
                },
                base: o + "1.1/",
                get: {
                    me: "account/verify_credentials.json",
                    "me/friends": "friends/list.json?count=@{limit|200}",
                    "me/following": "friends/list.json?count=@{limit|200}",
                    "me/followers": "followers/list.json?count=@{limit|200}",
                    "me/share": "statuses/user_timeline.json?count=@{limit|200}",
                    "me/like": "favorites/list.json?count=@{limit|200}"
                },
                post: {
                    "me/share": function(e, t) {
                        var n = e.data;
                        e.data = null, n.file ? (e.data = {
                            status: n.message,
                            "media[]": n.file
                        }, t("statuses/update_with_media.json")) : t(n.id ? "statuses/retweet/" + n.id + ".json" : "statuses/update.json?include_entities=1&status=" + n.message)
                    },
                    "me/like": function(e, t) {
                        var n = e.data.id;
                        e.data = null, t("favorites/create.json?id=" + n)
                    }
                },
                del: {
                    "me/like": function() {
                        p.method = "post";
                        var e = p.data.id;
                        p.data = null, callback("favorites/destroy.json?id=" + e)
                    }
                },
                wrap: {
                    me: function(e) {
                        return i(e), t(e), e
                    },
                    "me/friends": n,
                    "me/followers": n,
                    "me/following": n,
                    "me/share": function(e) {
                        return i(e), a(e), !e.error && "length" in e ? {
                            data: e
                        } : e
                    },
                    "default": function(e) {
                        return e = r(e), a(e), e
                    }
                },
                xhr: function(e) {
                    return "get" !== e.method
                }
            }
        })
    }(hello),
    function(e) {
        function t(e) {
            return "data" in e && e.data.forEach(function(e) {
                e.picture && (e.thumbnail = e.picture), e.images && (e.pictures = e.images.map(n).sort(function(e, t) {
                    return e.width - t.width
                }))
            }), e
        }

        function n(e) {
            return {
                width: e.width,
                height: e.height,
                source: e.source
            }
        }

        function i(e) {
            return "data" in e && e.data.forEach(function(e) {
                e.photos = e.files = "https://apis.live.net/v5.0/" + e.id + "/photos"
            }), e
        }

        function a(e, t, n) {
            if (e.id) {
                var i = n.query.access_token;
                if (e.emails && (e.email = e.emails.preferred), e.is_friend !== !1) {
                    var a = e.user_id || e.id;
                    e.thumbnail = e.picture = "https://apis.live.net/v5.0/" + a + "/picture?access_token=" + i
                }
            }
            return e
        }

        function r(e, t, n) {
            return "data" in e && e.data.forEach(function(e) {
                a(e, t, n)
            }), e
        }
        e.init({
            windows: {
                name: "Windows live",
                oauth: {
                    version: 2,
                    auth: "https://login.live.com/oauth20_authorize.srf",
                    grant: "https://login.live.com/oauth20_token.srf"
                },
                refresh: !0,
                logout: function() {
                    return "http://login.live.com/oauth20_logout.srf?ts=" + (new Date).getTime()
                },
                scope: {
                    basic: "wl.signin,wl.basic",
                    email: "wl.emails",
                    birthday: "wl.birthday",
                    events: "wl.calendars",
                    photos: "wl.photos",
                    videos: "wl.photos",
                    friends: "wl.contacts_emails",
                    files: "wl.skydrive",
                    publish: "wl.share",
                    publish_files: "wl.skydrive_update",
                    create_event: "wl.calendars_update,wl.events_create",
                    offline_access: "wl.offline_access"
                },
                base: "https://apis.live.net/v5.0/",
                get: {
                    me: "me",
                    "me/friends": "me/friends",
                    "me/following": "me/contacts",
                    "me/followers": "me/friends",
                    "me/contacts": "me/contacts",
                    "me/albums": "me/albums",
                    "me/album": "@{id}/files",
                    "me/photo": "@{id}",
                    "me/files": "@{parent|me/skydrive}/files",
                    "me/folders": "@{id|me/skydrive}/files",
                    "me/folder": "@{id|me/skydrive}/files"
                },
                post: {
                    "me/albums": "me/albums",
                    "me/album": "@{id}/files/",
                    "me/folders": "@{id|me/skydrive/}",
                    "me/files": "@{parent|me/skydrive/}/files"
                },
                del: {
                    "me/album": "@{id}",
                    "me/photo": "@{id}",
                    "me/folder": "@{id}",
                    "me/files": "@{id}"
                },
                wrap: {
                    me: a,
                    "me/friends": r,
                    "me/contacts": r,
                    "me/followers": r,
                    "me/following": r,
                    "me/albums": i,
                    "me/photos": t,
                    "default": t
                },
                xhr: function(t) {
                    return "get" === t.method || "delete" === t.method || e.utils.hasBinary(t.data) || ("string" == typeof t.data.file ? t.data.file = e.utils.toBlob(t.data.file) : (t.data = JSON.stringify(t.data), t.headers = {
                        "Content-Type": "application/json"
                    })), !0
                },
                jsonp: function(t) {
                    "get" === t.method || e.utils.hasBinary(t.data) || (t.data.method = t.method, t.method = "get")
                }
            }
        })
    }(hello),
    function(e) {
        function t(e) {
            e && "meta" in e && "error_type" in e.meta && (e.error = {
                code: e.meta.error_type,
                message: e.meta.error_message
            })
        }

        function n(e) {
            if (t(e), e.query && e.query.results && e.query.results.profile) {
                e = e.query.results.profile, e.id = e.guid, e.last_name = e.familyName, e.first_name = e.givenName || e.nickname;
                var n = [];
                e.first_name && n.push(e.first_name), e.last_name && n.push(e.last_name), e.name = n.join(" "), e.email = e.emails && e.emails[0] ? e.emails[0].handle : null, e.thumbnail = e.image ? e.image.imageUrl : null
            }
            return e
        }

        function i(e, n, i) {
            return t(e), r(e, n, i), e.query && e.query.results && e.query.results.contact && (e.data = e.query.results.contact, delete e.query, Array.isArray(e.data) || (e.data = [e.data]), e.data.forEach(a)), e
        }

        function a(e) {
            e.id = null, e.fields.forEach(function(t) {
                "email" === t.type && (e.email = t.value), "name" === t.type && (e.first_name = t.value.givenName, e.last_name = t.value.familyName, e.name = t.value.givenName + " " + t.value.familyName), "yahooid" === t.type && (e.id = t.value)
            })
        }

        function r(e, t, n) {
            e.query && e.query.count && n.options && (e.paging = {
                next: "?start=" + (e.query.count + (+n.options.start || 1))
            })
        }

        function o(e) {
            return "https://query.yahooapis.com/v1/yql?q=" + (e + " limit @{limit|100} offset @{start|0}").replace(/\s/g, "%20") + "&format=json"
        }
        e.init({
            yahoo: {
                oauth: {
                    version: "1.0a",
                    auth: "https://api.login.yahoo.com/oauth/v2/request_auth",
                    request: "https://api.login.yahoo.com/oauth/v2/get_request_token",
                    token: "https://api.login.yahoo.com/oauth/v2/get_token"
                },
                login: function(e) {
                    e.options.window_width = 560;
                    try {
                        delete e.qs.state.scope
                    } catch (e) {}
                },
                base: "https://social.yahooapis.com/v1/",
                get: {
                    me: o("select * from social.profile(0) where guid=me"),
                    "me/friends": o("select * from social.contacts(0) where guid=me"),
                    "me/following": o("select * from social.contacts(0) where guid=me")
                },
                wrap: {
                    me: n,
                    "me/friends": i,
                    "me/following": i,
                    "default": function(e) {
                        return r(e), e
                    }
                }
            }
        })
    }(hello), "function" == typeof define && define.amd && define(function() {
        return hello
    }), "object" == typeof module && module.exports && (module.exports = hello),
    function() {
        for (var e, t = ["assert", "assert", "cd", "clear", "count", "countReset", "debug", "dir", "dirxml", "dirxml", "dirxml", "error", "error", "exception", "group", "group", "groupCollapsed", "groupCollapsed", "groupEnd", "info", "info", "log", "log", "markTimeline", "profile", "profileEnd", "profileEnd", "select", "table", "table", "time", "time", "timeEnd", "timeEnd", "timeEnd", "timeEnd", "timeEnd", "timeStamp", "timeline", "timelineEnd", "trace", "trace", "trace", "trace", "trace", "warn"], n = t.length, i = window.console = window.console || {}, a = function() {}; n--;) e = t[n], i[e] || (i[e] = a)
    }();
var EpiLib = {
    device: {
        platform: "unknown",
        name: "unknown",
        type: "unknown",
        browser: "unknown"
    },
    pageType: "",
    debugMode: !1,
    apiHost: "data.baomoi.com",
    logHost: "log.baomoi.com",
    userCookieName: "EpiUser",
    user: null
};
EpiLib.getUserId = function() {
    return null != EpiLib.user ? EpiLib.user.userId : null
}, EpiLib.getDevice = function() {
    var e = navigator.userAgent.toLowerCase(),
        t = {
            platform: "unknown",
            name: "unknown",
            type: "unknown",
            browser: "unknown"
        };
    return e.indexOf("ipad") > -1 ? (t.platform = "ios", t.name = "ipad", t.type = "tablet") : e.indexOf("iphone") > -1 ? (t.platform = "ios", t.name = "iphone", t.type = "smartphone") : e.indexOf("android") > -1 ? (t.platform = "android", t.type = e.indexOf("mobile") > -1 ? "smartphone" : "tablet") : e.indexOf("windows phone") > -1 ? (t.platform = "windows", t.type = "smartphone") : e.indexOf("mobile") > -1 ? t.type = "smartphone" : t.type = "desktop", e.indexOf("msie") > -1 || e.indexOf("edge") > -1 ? t.browser = "ie" : e.indexOf("chrome") > -1 ? t.browser = "chrome" : e.indexOf("firefox") > -1 ? t.browser = "firefox" : e.indexOf("safari") > -1 && e.indexOf("chrome") < 0 && (t.browser = "safari"), t
}, EpiLib.getPageType = function() {
    var e, t = window.location.pathname;
    return e = "/" === t || /default.aspx*/i.test(t) ? "home" : /\/(tim-kiem|tag)\/[^\.]*/i.test(t) ? "search" : /\/(tin-nong\.epi)/i.test(t) ? "popular" : /\/(tin-moi\.epi)/i.test(t) ? "mostrecent" : /\/(de-xuat\.epi)/i.test(t) ? "recommend" : /\/(su-kien\.epi)/i.test(t) ? "topics" : /\/c\/[0-9]+\.epi/i.test(t) ? "article" : "category"
}, EpiLib.loadPlugin = function(e, t, n) {
    var i = "http://s.baomoi.xdn.vn";
    if ($("body").hasClass(e)) return void(n && n());
    var a = t.search("http://") < 0 ? i + t : t;
    jQuery.ajax({
        url: a,
        dataType: "script",
        cache: !0
    }).done(function() {
        $("body").addClass(e), n && n()
    })
}, EpiLib.loadStyle = function(e, t) {
    var n = "http://s.baomoi.xdn.vn",
        i = t.search("http://") < 0 ? n + t : t,
        a = $("#" + e);
    a.length > 0 || (a = $("<link>", {
        rel: "stylesheet",
        type: "text/css",
        href: i,
        media: "all",
        id: e
    }), $("head").append(a), log("Style loaded: " + i))
}, window.getCookie || (window.getCookie = function(e) {
    var t = document.cookie.match(new RegExp(e + "=([^;]+)"));
    return t ? t[1] : null
}), window.getUrlParam || (window.getUrlParam = function(e) {
    var t = new RegExp("[?&]" + e + "=([^&#]*)").exec(window.location.href);
    return null == t ? null : t[1] || 0
}), window.log || (window.log = function() {
    if (EpiLib.debugMode === !0)
        if (log.history = log.history || [],
            log.history.push(arguments), "undefined" != typeof console && "function" == typeof console.log)
            if (window.opera)
                for (var e = 0; e < arguments.length;) console.log("Item " + (e + 1) + ": " + arguments[e]), e++;
            else 1 === Array.prototype.slice.call(arguments).length && "string" == typeof Array.prototype.slice.call(arguments)[0] ? console.log(Array.prototype.slice.call(arguments).toString()) : console.log(Array.prototype.slice.call(arguments));
    else if (Function.prototype.bind || "undefined" == typeof console || "object" != typeof console.log)
        if (document.getElementById("firebug-lite")) setTimeout(function() {
            log(Array.prototype.slice.call(arguments))
        }, 500);
        else {
            var t = document.createElement("script");
            t.type = "text/javascript", t.id = "firebug-lite", t.src = "https://getfirebug.com/firebug-lite.js", document.getElementsByTagName("HEAD")[0].appendChild(t), setTimeout(function() {
                log(Array.prototype.slice.call(arguments))
            }, 2e3)
        } else Function.prototype.call.call(console.log, console, Array.prototype.slice.call(arguments))
}), EpiLib.now = function() {
    return +new Date
}, EpiLib.formatTime = function(e, t) {
    var n, i, a, r, o, s, l;
    return l = "date" === jQuery.type(e) ? e : parseInt(e) < 1e4 ? new Date(e) : new Date(1e3 * (parseInt(e) - 25200)), s = null == t || null == t.prefix ? "" : t.prefix, t && t.friendly === !0 && (n = EpiLib.now() - l.getTime(), i = Math.floor(n / 1e3 / 60 / 60 / 24), n -= 1e3 * i * 60 * 60 * 24, a = Math.floor(n / 1e3 / 60 / 60), n -= 1e3 * a * 60 * 60, r = Math.floor(n / 1e3 / 60), 0 === i) ? a > 0 ? s + a + " giờ" : s + r + " phút" : (i = (l.getDate() < 10 ? "0" : "") + l.getDate(), o = (l.getMonth() < 9 ? "0" : "") + (l.getMonth() + 1), s + " " + i + "/" + o + "/" + l.getFullYear() % 2e3)
}, EpiLib.getUrlParam = function(e) {
    var t = new RegExp("[?&]" + e + "=([^&#]*)").exec(window.location.href);
    return null == t ? null : t[1] || 0
}, EpiLib.toLocation = function(e) {
    var t = document.createElement("a");
    return t.href = e, t
}, EpiLib.truncateText = function(e, t, n) {
    if (null == e) return "";
    if (n = n || "&hellip;", e.length < t) return e;
    var i = e.substr(0, t).match(/([^A-Za-z0-9_]*)[A-Za-z0-9_]*$/);
    if (!i) return n;
    var a = t - i[0].length;
    return /[\s\(\[\{]/.test(e[a]) && a--, (a ? e.substr(0, a + 1) : "") + n
}, EpiLib.convert2KoDau = function(e) {
    if (null == e) return "";
    var t = e;
    return t = t.toLowerCase(), t = t.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a"), t = t.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e"), t = t.replace(/ì|í|ị|ỉ|ĩ/g, "i"), t = t.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o"), t = t.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u"), t = t.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y"), t = t.replace(/đ/g, "d"), t = t.replace(/!|@|\$|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\"| |\"|\&|\#|\[|\]|~/g, "-"), t = t.replace(/-+-/g, "-"), t = t.replace(/^\-+|\-+$/g, "")
}, EpiLib.replaceUrlParam = function(e, t, n) {
    var i = new RegExp("([?&])(" + t + "=).*?(&|$)"),
        a = e;
    return e.search(i) >= 0 ? a = "" !== n ? e.replace(i, "$1$2" + n + "$3") : e.replace(i, "") : "" !== n && (a = a + (a.indexOf("?") > 0 ? "&" : "?") + t + "=" + n), a
}, EpiLib.popupCenter = function(e, t, n, i) {
    var a = void 0 !== window.screenLeft ? window.screenLeft : screen.left,
        r = void 0 !== window.screenTop ? window.screenTop : screen.top,
        o = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width,
        s = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height,
        l = o / 2 - n / 2 + a,
        c = s / 3 - i / 3 + r,
        d = window.open(e, t, "scrollbars=yes, width=" + n + ", height=" + i + ", top=" + c + ", left=" + l);
    window.focus && d.focus()
}, EpiLib.getMetaContent = function(e) {
    for (var t = document.getElementsByTagName("meta"), n = 0; n < t.length; n++)
        if (t[n].getAttribute("property") === e) return t[n].getAttribute("content");
    return ""
}, EpiLib.Base64 = {
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    encode: function(e) {
        var t, n, i, a, r, o, s, l = "",
            c = 0;
        for (e = EpiLib.Base64._utf8_encode(e); c < e.length;) t = e.charCodeAt(c++), n = e.charCodeAt(c++), i = e.charCodeAt(c++), a = t >> 2, r = (3 & t) << 4 | n >> 4, o = (15 & n) << 2 | i >> 6, s = 63 & i, isNaN(n) ? o = s = 64 : isNaN(i) && (s = 64), l = l + this._keyStr.charAt(a) + this._keyStr.charAt(r) + this._keyStr.charAt(o) + this._keyStr.charAt(s);
        return l
    },
    decode: function(e) {
        var t, n, i, a, r, o, s, l = "",
            c = 0;
        for (e = e.replace(/[^A-Za-z0-9+\/=]/g, ""); c < e.length;) a = this._keyStr.indexOf(e.charAt(c++)), r = this._keyStr.indexOf(e.charAt(c++)), o = this._keyStr.indexOf(e.charAt(c++)), s = this._keyStr.indexOf(e.charAt(c++)), t = a << 2 | r >> 4, n = (15 & r) << 4 | o >> 2, i = (3 & o) << 6 | s, l += String.fromCharCode(t), 64 !== o && (l += String.fromCharCode(n)), 64 !== s && (l += String.fromCharCode(i));
        return EpiLib.Base64._utf8_decode(l)
    },
    _utf8_encode: function(e) {
        e = e.replace(/rn/g, "n");
        var t, n;
        for (t = "", n = 0; n < e.length; n++) {
            var i = e.charCodeAt(n);
            128 > i ? t += String.fromCharCode(i) : i > 127 && 2048 > i ? (t += String.fromCharCode(i >> 6 | 192), t += String.fromCharCode(63 & i | 128)) : (t += String.fromCharCode(i >> 12 | 224), t += String.fromCharCode(i >> 6 & 63 | 128), t += String.fromCharCode(63 & i | 128))
        }
        return t
    },
    _utf8_decode: function(e) {
        var t, n, i, a, r, o;
        for (a = "", r = 0, o = t = n = 0; r < e.length;) o = e.charCodeAt(r), 128 > o ? (a += String.fromCharCode(o), r++) : o > 191 && 224 > o ? (n = e.charCodeAt(r + 1), a += String.fromCharCode((31 & o) << 6 | 63 & n), r += 2) : (n = e.charCodeAt(r + 1), i = e.charCodeAt(r + 2), a += String.fromCharCode((15 & o) << 12 | (63 & n) << 6 | 63 & i), r += 3);
        return a
    }
}, EpiLib.device = EpiLib.getDevice(), EpiLib.pageType = EpiLib.getPageType(), null != $.cookie(EpiLib.userCookieName) && (EpiLib.user = JSON.parse($.cookie(EpiLib.userCookieName))), hello.init({
    facebook: "128990640458592",
    google: "271376364475-3e33kk4lblm2299v5entjn6oh2bss7ti.apps.googleusercontent.com"
}, {
    scope: "email",
    redirect_uri: "/login-redirect.html"
}), null != EpiLib.user ? helloShowProfile(EpiLib.user) : helloOn(), Page.renderArticle = function(e) {
    function t(e) {
        return (4096 & e) > 0 ? '<i class="spr live-icon"></i>' : (2 & e) > 0 ? '<i class="spr video-icon"></i>' : ""
    }
    var n = e.contentId,
        i = e.title,
        a = e.url.replace("www.baomoi.com", "m.baomoi.com"),
        r = e.date,
        o = e.avatarUrl,
        s = e.description,
        l = e.contentTypes,
        c = $("<a>", {
            href: a
        });
    if (o) {
        var d = $("<figure>"),
            u = e.avatarWidth,
            p = e.avatarHeight;
        if (u > 0 && p > 0) {
            var f = 278,
                h = Math.round(278 * p / u),
                m = $("<img>", {
                    "data-src": o,
                    src: o
                });
            m.attr("width", f), m.attr("height", h), d.append(m), d.appendTo(c)
        }
    }
    var g = $("<header>");
    g.appendTo(c), g.append($("<h2>", {
        text: i
    }));
    var v = $("<p>", {
        "class": "meta"
    });
    if (e.publisherName && v.append($("<span>", {
            text: e.publisherName
        })), v.append($("<time>", {
            "class": "friendly",
            datetime: r
        })).append(t(l)), v.appendTo(g), !o && s) {
        var y = $("<div>", {
            "class": "summary",
            text: s
        });
        y.appendTo(g)
    }
    return $("<article>", {
        "data-aid": n,
        "class": "item" + (o ? "" : " no-fig")
    }).append(c)
}, Page.replaceRedirectLinkInDesktop = function(e) {
    if ("desktop" === EpiLib.device.type)
        for (var t = e.find("article >a"), n = 0; n < t.length; n++) $(t[n]).attr("href", $(t[n]).attr("href").replace("/c/", "/r/")), $(t[n]).attr("target", "_blank")
}, Page.formatingArticles = function(e) {
    for (var t = e.find("time.friendly"), n = 0, i = t.length; n < i; n++) {
        var a = t.eq(n),
            r = a.html() + EpiLib.formatTime(a.attr("datetime"), {
                friendly: !0
            });
        a.html(r)
    }
}, Page.renderArticles = function(e, t, n) {
    var i = "http://" + EpiLib.apiHost + "/" + e,
        a = $("#loading");
    a.show(), $.getJSON(i).done(function(e) {
        e.result && !e.error && ($.each(e.result, function(e, n) {
            var i = Page.renderArticle(n, e);
            i.appendTo(t)
        }), Page.formatingArticles(t), Page.initDeferredImages(t), Page.replaceRedirectLinkInDesktop(t), a.hide(), n && n())
    })
}, Page.initDeferredImages = function(e) {
    for (var t = e.find("img"), n = 0; n < t.length; n++)
        if (t[n].getAttribute("data-src")) {
            var i = t[n].getAttribute("data-src");
            "chrome" === EpiLib.device.browser && (/i.baomoi.xdn.vn/i.test(i) || /za.zdn.vn/i.test(i)) && (i += ".webp"), "smartphone" !== EpiLib.device.type && ("article" === EpiLib.pageType && (i = i.replace("/m450x/", "/m660x/")), i = i.replace("/m150/", "/m450x/")), t[n].setAttribute("src", i)
        }
}, Page.loadRecommendBox = function(e, t, n) {
    var i = $("<div>"),
        a = "searches/recommend.aspx?userId=" + e + "&size=" + (3 * n).toString() + "&includes=1&imgsize=m150";
    Page.renderArticles(a, i, function() {
        var e = $(i).find("article[data-aid=" + t + "]");
        e.length > 0 && e.remove();
        var a = $(i).find(".item"),
            r = $("#recommend-box .content-list"),
            o = a.length;
        if (o > 0) {
            for (var s = []; s.length < n && s.length < o;) {
                var l = Math.floor(Math.random() * o);
                s.indexOf(l) === -1 && (s.push(l), r.append(a[l]))
            }
            $("#recommend-box").show()
        }
        i.remove()
    })
};
var baomoiPage = new Page;
baomoiPage.init(), window.getCookie || (window.getCookie = function(e) {
    var t = document.cookie.match(new RegExp(e + "=([^;]+)"));
    return t ? t[1] : null
}), window.setCookie || (window.setCookie = function(e, t, n) {
    var i = new Date;
    i.setTime(i.getTime() + 24 * n * 60 * 60 * 1e3);
    var a = "expires=" + i.toGMTString();
    document.cookie = e + "=" + t + "; " + a
}), window.getUrlParam || (window.getUrlParam = function(e) {
    var t = new RegExp("[?&]" + e + "=([^&#]*)").exec(window.location.href);
    return null == t ? null : t[1] || 0
}), window.bmLog = function() {
    var e, t, n = null,
        i = null;
    null != window.getCookie("EpiUser") && (i = JSON.parse(unescape(window.getCookie("EpiUser"))).userId), null == i && (i = window.getCookie("oa2UserId"));
    var a = document.querySelectorAll(".bm-track");
    for (e = 0; e < a.length; e++) {
        var r = a[e].getAttribute("data-value"),
            o = a[e].getAttribute("data-key");
        if (0 === o.indexOf("mobile_article") && null == n) {
            n = r;
            var s = window.getUrlParam("utm_source"),
                l = window.getUrlParam("utm_medium"),
                c = window.getUrlParam("utm_campaign");
            null != s && null != l && null != c && (o = s + "_" + l + "_" + c + ":" + o)
        }
        var d = null != n && null != i ? "&userid=" + i : "";
        t = document.createElement("img"), t.src = "http://log.baomoi.com/log.aspx?key=" + o + (null != r ? "&value=" + r : "") + d + "&rand=" + Math.random(), t.setAttribute("style", "width:50px; height:50px;position:absolute;display:none;top:-100px;"), document.body.appendChild(t)
    }
    var u = document.querySelectorAll(".ext-track");
    for (e = 0; e < u.length; e++) {
        var p = u[e].getAttribute("data-i"),
            f = u[e].getAttribute("data-u"),
            h = u[e].getAttribute("data-r"),
            m = document.createElement("iframe");
        m.src = "http://log.baomoi.com/extlog.aspx?i=" + p + "&u=" + f + "&r=" + h + "&t=" + document.title, m.scrolling = "no", m.frameborder = "0", m.allowtransparency = "true", m.width = "1px", m.height = "1px", m.setAttribute("style", "width:50px; height:50px;position:absolute;display:none;top:-100px;"), document.body.appendChild(m)
    }
    var g = window.getCookie("zoanid");
    if (null != g && (t = document.createElement("img"), t.src = "http://log.baomoi.com/log.aspx?key=zalow_all&rand=" + Math.random(), t.setAttribute("style", "width:50px; height:50px;position:absolute;display:none;top:-100px;"), document.body.appendChild(t), null != n && (t = document.createElement("img"), t.src = "http://log.baomoi.com/log.aspx?key=zalow_article&value=" + n + "&rand=" + Math.random(), t.setAttribute("style", "width:50px; height:50px;position:absolute;display:none;top:-100px;"), document.body.appendChild(t))), "" !== window.location.hash) {
        var v = window.location.hash.substring(1);
        "" !== v && (v = "mobiletrack|" + v, v = v.replace(/\|/g, "/"), "function" == typeof History.replaceState && History.replaceState({}, document.title, window.location.href.replace(window.location.hash, "")), t = document.createElement("img"), window.article_id ? t.src = "http://log.baomoi.com/log.aspx?key=" + v + "&value=" + window.article_id + "&rand=" + Math.random() : t.src = "http://log.baomoi.com/log.aspx?key=" + v + "&rand=" + Math.random(), t.setAttribute("style", "width:50px; height:50px;position:absolute;display:none;top:-100px;"), document.body.appendChild(t))
    }
}, window.bmLog();
/**
 * Hilo 1.0.0 for standalone
 * Copyright 2016 alibaba.com
 * Licensed under the MIT License
 */
! function(t) {
    var e = function() {
        var i = t,
            n = document,
            r = n.documentElement,
            a = 0;
        return { getUid: function(t) {
                var e = ++a;
                if (t) {
                    var i = t.charCodeAt(t.length - 1);
                    return i >= 48 && 57 >= i && (t += "_"), t + e }
                return e }, viewToString: function(t) {
                for (var e, i = t; i;) e = e ? i.id + "." + e : i.id, i = i.parent;
                return e }, copy: function(t, e, i) {
                for (var n in e)(!i || t.hasOwnProperty(n) || void 0 !== t[n]) && (t[n] = e[n]);
                return t }, browser: function() {
                var t = navigator.userAgent,
                    e = { iphone: /iphone/i.test(t), ipad: /ipad/i.test(t), ipod: /ipod/i.test(t), ios: /iphone|ipad|ipod/i.test(t), android: /android/i.test(t), webkit: /webkit/i.test(t), chrome: /chrome/i.test(t), safari: /safari/i.test(t), firefox: /firefox/i.test(t), ie: /msie/i.test(t), opera: /opera/i.test(t), supportTouch: "ontouchstart" in i, supportCanvas: null != n.createElement("canvas").getContext, supportStorage: !1, supportOrientation: "orientation" in i, supportDeviceMotion: "ondevicemotion" in i };
                try {
                    var a = "hilo";
                    localStorage.setItem(a, a), localStorage.removeItem(a), e.supportStorage = !0 } catch (s) {}
                var o = e.jsVendor = e.webkit ? "webkit" : e.firefox ? "Moz" : e.opera ? "O" : e.ie ? "ms" : "",
                    h = e.cssVendor = "-" + o + "-",
                    l = n.createElement("div"),
                    c = l.style,
                    u = void 0 != c[o + "Transform"],
                    d = void 0 != c[o + "Perspective"];
                return d && (l.id = "test3d", c = n.createElement("style"), c.textContent = "@media (" + h + "transform-3d){#test3d{height:3px}}", n.head.appendChild(c), r.appendChild(l), d = 3 == l.offsetHeight, n.head.removeChild(c), r.removeChild(l)), e.supportTransform = u, e.supportTransform3D = d, e }(), event: function() {
                var t = "ontouchstart" in i;
                return { POINTER_START: t ? "touchstart" : "mousedown", POINTER_MOVE: t ? "touchmove" : "mousemove", POINTER_END: t ? "touchend" : "mouseup" } }(), align: { TOP_LEFT: "TL", TOP: "T", TOP_RIGHT: "TR", LEFT: "L", CENTER: "C", RIGHT: "R", BOTTOM_LEFT: "BL", BOTTOM: "B", BOTTOM_RIGHT: "BR" }, getElementRect: function(t) {
                try {
                    var e = t.getBoundingClientRect() } catch (n) { e = { top: t.offsetTop, left: t.offsetLeft, width: t.offsetWidth, height: t.offsetHeight } }
                var a = (i.pageXOffset || r.scrollLeft) - (r.clientLeft || 0) || 0,
                    s = (i.pageYOffset || r.scrollTop) - (r.clientTop || 0) || 0,
                    o = i.getComputedStyle ? getComputedStyle(t) : t.currentStyle,
                    h = parseInt,
                    l = h(o.paddingLeft) + h(o.borderLeftWidth) || 0,
                    c = h(o.paddingTop) + h(o.borderTopWidth) || 0,
                    u = h(o.paddingRight) + h(o.borderRightWidth) || 0,
                    d = h(o.paddingBottom) + h(o.borderBottomWidth) || 0,
                    f = e.top || 0,
                    p = e.left || 0;
                return { left: p + a + l, top: f + s + c, width: e.right - u - p - l, height: e.bottom - d - f - c } }, createElement: function(t, e) {
                var i, r, a, s = n.createElement(t);
                for (i in e)
                    if (r = e[i], "style" === i)
                        for (a in r) s.style[a] = r[a];
                    else s[i] = r;
                return s }, getElement: function(t) {
                return n.getElementById(t) }, setElementStyleByView: function(t) {
                var i = t.drawable,
                    n = i.domElement.style,
                    r = t._stateCache || (t._stateCache = {}),
                    a = e.browser.jsVendor,
                    s = "px",
                    o = !1;
                if (this.cacheStateIfChanged(t, ["visible"], r) && (n.display = t.visible ? "" : "none"), this.cacheStateIfChanged(t, ["alpha"], r) && (n.opacity = t.alpha), t.visible && !(t.alpha <= 0)) { this.cacheStateIfChanged(t, ["width"], r) && (n.width = t.width + s), this.cacheStateIfChanged(t, ["height"], r) && (n.height = t.height + s), this.cacheStateIfChanged(t, ["depth"], r) && (n.zIndex = t.depth + 1), (o = this.cacheStateIfChanged(t, ["pivotX", "pivotY"], r)) && (n[a + "TransformOrigin"] = t.pivotX + s + " " + t.pivotY + s), (this.cacheStateIfChanged(t, ["x", "y", "rotation", "scaleX", "scaleY"], r) || o) && (n[a + "Transform"] = this.getTransformCSS(t)), this.cacheStateIfChanged(t, ["background"], r) && (n.backgroundColor = t.background), n.pointerEvents || (n.pointerEvents = "none");
                    var h = i.image;
                    if (h) {
                        var l = h.src;
                        l !== r.image && (r.image = l, n.backgroundImage = "url(" + l + ")");
                        var c = i.rect;
                        if (c) {
                            var u = c[0],
                                d = c[1];
                            u !== r.sx && (r.sx = u, n.backgroundPositionX = -u + s), d !== r.sy && (r.sy = d, n.backgroundPositionY = -d + s) } }
                    var f = t.mask;
                    if (f) {
                        var p = f.drawable.domElement.style.backgroundImage;
                        p !== r.maskImage && (r.maskImage = p, n[a + "MaskImage"] = p, n[a + "MaskRepeat"] = "no-repeat");
                        var v = f.x,
                            m = f.y;
                        (v !== r.maskX || m !== r.maskY) && (r.maskX = v, r.maskY = m, n[a + "MaskPosition"] = v + s + " " + m + s) } } }, cacheStateIfChanged: function(t, e, i) {
                var n, r, a, s, o = !1;
                for (n = 0, r = e.length; r > n; n++) a = e[n], s = t[a], s != i[a] && (i[a] = s, o = !0);
                return o }, getTransformCSS: function(t) {
                var e = this.browser.supportTransform3D,
                    i = e ? "3d" : "";
                return "translate" + i + "(" + (t.x - t.pivotX) + "px, " + (t.y - t.pivotY) + (e ? "px, 0px)" : "px)") + "rotate" + i + (e ? "(0, 0, 1, " : "(") + t.rotation + "deg)scale" + i + "(" + t.scaleX + ", " + t.scaleY + (e ? ", 1)" : ")") } } }();
    t.Hilo = e }(window),
function(t) {
    var e = t.Hilo,
        i = function() {
            var t = function(t) { t = t || {};
                    var i = t.hasOwnProperty("constructor") ? t.constructor : function() {};
                    return e.call(i, t), i },
                e = function(t) {
                    var e, n, a = {};
                    for (e in t) n = t[e], i.hasOwnProperty(e) ? i[e].call(this, n) : a[e] = n;
                    r(this.prototype, a) },
                i = { Extends: function(t) {
                        var e = this.prototype,
                            i = n(t.prototype);
                        r(this, t), r(i, e), i.constructor = this, this.prototype = i, this.superclass = t.prototype }, Mixes: function(t) { t instanceof Array || (t = [t]);
                        for (var e, i = this.prototype; e = t.shift();) r(i, e.prototype || e) }, Statics: function(t) { r(this, t) } },
                n = function() {
                    if (Object.__proto__) return function(t) {
                        return { __proto__: t } };
                    var t = function() {};
                    return function(e) {
                        return t.prototype = e, new t } }(),
                r = function(t) {
                    for (var e = 1, i = arguments.length; i > e; e++) {
                        var n, r = arguments[e];
                        for (var a in r) {
                            var o = r[a];!o || "object" != typeof o || void 0 === o.value && "function" != typeof o.get && "function" != typeof o.set ? t[a] = o : (n = n || {}, n[a] = o) }
                        n && s(t, n) }
                    return t };
            try {
                var a = Object.defineProperty,
                    s = Object.defineProperties;
                a({}, "$", { value: 0 }) } catch (o) { "__defineGetter__" in Object && (a = function(t, e, i) {
                    return "value" in i && (t[e] = i.value), "get" in i && t.__defineGetter__(e, i.get), "set" in i && t.__defineSetter__(e, i.set), t }, s = function(t, e) {
                    for (var i in e) e.hasOwnProperty(i) && a(t, i, e[i]);
                    return t }) }
            return { create: t, mix: r } }();
    e.Class = i }(window),
function(t) {
    var e = t.Hilo,
        i = e.Class,
        n = i.create({ constructor: function(t, e, i, n, r, a) { this.a = t, this.b = e, this.c = i, this.d = n, this.tx = r, this.ty = a }, concat: function(t) {
                var e = arguments,
                    i = this.a,
                    n = this.b,
                    r = this.c,
                    a = this.d,
                    s = this.tx,
                    o = this.ty;
                if (e.length >= 6) var h = e[0],
                    l = e[1],
                    c = e[2],
                    u = e[3],
                    d = e[4],
                    f = e[5];
                else h = t.a, l = t.b, c = t.c, u = t.d, d = t.tx, f = t.ty;
                return this.a = i * h + n * c, this.b = i * l + n * u, this.c = r * h + a * c, this.d = r * l + a * u, this.tx = s * h + o * c + d, this.ty = s * l + o * u + f, this }, rotate: function(t) {
                var e = Math.sin(t),
                    i = Math.cos(t),
                    n = this.a,
                    r = this.b,
                    a = this.c,
                    s = this.d,
                    o = this.tx,
                    h = this.ty;
                return this.a = n * i - r * e, this.b = n * e + r * i, this.c = a * i - s * e, this.d = a * e + s * i, this.tx = o * i - h * e, this.ty = o * e + h * i, this }, scale: function(t, e) {
                return this.a *= t, this.d *= e, this.c *= t, this.b *= e, this.tx *= t, this.ty *= e, this }, translate: function(t, e) {
                return this.tx += t, this.ty += e, this }, identity: function() {
                return this.a = this.d = 1, this.b = this.c = this.tx = this.ty = 0, this }, invert: function() {
                var t = this.a,
                    e = this.b,
                    i = this.c,
                    n = this.d,
                    r = this.tx,
                    a = t * n - e * i;
                return this.a = n / a, this.b = -e / a, this.c = -i / a, this.d = t / a, this.tx = (i * this.ty - n * r) / a, this.ty = -(t * this.ty - e * r) / a, this }, transformPoint: function(t, e, i) {
                var n = t.x * this.a + t.y * this.c + this.tx,
                    r = t.x * this.b + t.y * this.d + this.ty;
                return e && (n = n + .5 >> 0, r = r + .5 >> 0), i ? { x: n, y: r } : (t.x = n, t.y = r, t) } });
    e.Matrix = n }(window),
function(t) {
    var e = t.Hilo,
        i = e.Class,
        n = { _listeners: null, on: function(t, e, i) {
                for (var n = this._listeners = this._listeners || {}, r = n[t] = n[t] || [], a = 0, s = r.length; s > a; a++) {
                    var o = r[a];
                    if (o.listener === e) return }
                return r.push({ listener: e, once: i }), this }, off: function(t, e) {
                if (0 == arguments.length) return this._listeners = null, this;
                var i = this._listeners && this._listeners[t];
                if (i) {
                    if (1 == arguments.length) return delete this._listeners[t], this;
                    for (var n = 0, r = i.length; r > n; n++) {
                        var a = i[n];
                        if (a.listener === e) { i.splice(n, 1), 0 === i.length && delete this._listeners[t];
                            break } } }
                return this }, fire: function(t, e) {
                var i, n; "string" == typeof t ? n = t : (i = t, n = t.type);
                var a = this._listeners;
                if (!a) return !1;
                var s = a[n];
                if (s) {
                    if (s = s.slice(0), i = i || new r(n, this, e), i._stopped) return !1;
                    for (var o = 0; o < s.length; o++) {
                        var h = s[o];
                        h.listener.call(this, i), h.once && s.splice(o--, 1) }
                    return 0 == s.length && delete a[n], !0 }
                return !1 } },
        r = i.create({ constructor: function(t, e, i) { this.type = t, this.target = e, this.detail = i, this.timeStamp = +new Date }, type: null, target: null, detail: null, timeStamp: 0, stopImmediatePropagation: function() { this._stopped = !0 } }),
        a = t.Event;
    if (a) {
        var s = a.prototype,
            o = s.stopImmediatePropagation;
        s.stopImmediatePropagation = function() { o && o.call(this), this._stopped = !0 } }
    e.EventMixin = n }(window),
function(t) {
    var e = t.Hilo,
        i = e.Class,
        n = i.create({ constructor: function(t) { this.init(t) }, image: null, rect: null, init: function(t) {
                var i = this,
                    r = i.image;
                n.isDrawable(t) ? i.image = t : e.copy(i, t, !0);
                var a = i.image;
                if ("string" == typeof a) {
                    if (!r || a !== r.getAttribute("src")) { i.image = null;
                        var s = new Image;
                        return s.onload = function() { s.onload = null, i.init(s) }, void(s.src = a) }
                    a = i.image = r }
                a && !i.rect && (i.rect = [0, 0, a.width, a.height]) }, Statics: { isDrawable: function(t) {
                    if (!t || !t.tagName) return !1;
                    var e = t.tagName.toLowerCase();
                    return "img" === e || "canvas" === e || "video" === e } } });
    e.Drawable = n }(window),
function(t) {
    var e = t.Hilo,
        i = e.Class,
        n = i.create({ constructor: function(t) { t = t || {}, e.copy(this, t, !0) }, renderType: null, canvas: null, stage: null, startDraw: function(t) {}, draw: function(t) {}, endDraw: function(t) {}, transform: function() {}, hide: function() {}, remove: function(t) {}, clear: function(t, e, i, n) {}, resize: function(t, e) {} });
    e.Renderer = n }(window),
function(t) {
    var e = t.Hilo,
        i = e.Class,
        n = e.Renderer,
        r = i.create({ Extends: n, constructor: function(t) { r.superclass.constructor.call(this, t), this.context = this.canvas.getContext("2d") }, renderType: "canvas", context: null, startDraw: function(t) {
                return t.visible && t.alpha > 0 ? (t === this.stage && this.context.clearRect(0, 0, t.width, t.height), this.context.save(), !0) : !1 }, draw: function(t) {
                var e = this.context,
                    i = t.width,
                    n = t.height,
                    r = t.background;
                r && (e.fillStyle = r, e.fillRect(0, 0, i, n));
                var a = t.drawable,
                    s = a && a.image;
                if (s) {
                    var o = a.rect,
                        h = o[2],
                        l = o[3],
                        c = o[4],
                        u = o[5];
                    if (!h || !l) return;
                    i || n || (i = t.width = h, n = t.height = l), (c || u) && e.translate(c - .5 * h, u - .5 * l), e.drawImage(s, o[0], o[1], h, l, 0, 0, i, n) } }, endDraw: function(t) { this.context.restore() }, transform: function(t) {
                var i = t.drawable;
                if (i && i.domElement) return void e.setElementStyleByView(t);
                var n = this.context,
                    r = t.scaleX,
                    a = t.scaleY;
                if (t === this.stage) {
                    var s = this.canvas.style,
                        o = t._scaleX,
                        h = t._scaleY;
                    (!o && 1 != r || o && o != r) && (t._scaleX = r, s.width = r * t.width + "px"), (!h && 1 != a || h && h != a) && (t._scaleY = a, s.height = a * t.height + "px") } else {
                    var l = t.x,
                        c = t.y,
                        u = t.pivotX,
                        d = t.pivotY,
                        f = t.rotation % 360,
                        p = t.mask;
                    p && (p._render(this), n.clip());
                    var v = t.align;
                    if (v)
                        if ("function" == typeof v) t.align();
                        else {
                            var m = t.parent;
                            if (m) {
                                var g = t.width,
                                    _ = t.height,
                                    x = m.width,
                                    y = m.height;
                                switch (v) {
                                    case "TL":
                                        l = 0, c = 0;
                                        break;
                                    case "T":
                                        l = x - g >> 1, c = 0;
                                        break;
                                    case "TR":
                                        l = x - g, c = 0;
                                        break;
                                    case "L":
                                        l = 0, c = y - _ >> 1;
                                        break;
                                    case "C":
                                        l = x - g >> 1, c = y - _ >> 1;
                                        break;
                                    case "R":
                                        l = x - g, c = y - _ >> 1;
                                        break;
                                    case "BL":
                                        l = 0, c = y - _;
                                        break;
                                    case "B":
                                        l = x - g >> 1, c = y - _;
                                        break;
                                    case "BR":
                                        l = x - g, c = y - _ } } }(0 != l || 0 != c) && n.translate(l, c), 0 != f && n.rotate(f * Math.PI / 180), (1 != r || 1 != a) && n.scale(r, a), (0 != u || 0 != d) && n.translate(-u, -d) }
                t.alpha > 0 && (n.globalAlpha *= t.alpha) }, remove: function(t) {
                var e = t.drawable,
                    i = e && e.domElement;
                if (i) {
                    var n = i.parentNode;
                    n && n.removeChild(i) } }, clear: function(t, e, i, n) { this.context.clearRect(t, e, i, n) }, resize: function(t, e) { this.canvas.width = t, this.canvas.height = e } });
    e.CanvasRenderer = r }(window),
function(t) {
    var e = t.Hilo,
        i = e.Class,
        n = e.Renderer,
        r = e.Drawable,
        a = function() {
            function t(t, i) {
                var n = t.tagName || "div",
                    r = i.image,
                    a = t.width || r && r.width,
                    s = t.height || r && r.height,
                    o = e.createElement(n),
                    h = o.style;
                if (t.id && (o.id = t.id), h.position = "absolute", h.left = (t.left || 0) + "px", h.top = (t.top || 0) + "px", h.width = a + "px", h.height = s + "px", "canvas" == n) {
                    if (o.width = a, o.height = s, r) {
                        var l = o.getContext("2d"),
                            c = i.rect || [0, 0, a, s];
                        l.drawImage(r, c[0], c[1], c[2], c[3], t.x || 0, t.y || 0, t.width || c[2], t.height || c[3]) } } else if (h.opacity = void 0 != t.alpha ? t.alpha : 1, (t === this.stage || t.clipChildren) && (h.overflow = "hidden"), r && r.src) { h.backgroundImage = "url(" + r.src + ")";
                    var u = t.rectX || 0,
                        d = t.rectY || 0;
                    h.backgroundPosition = -u + "px " + -d + "px" }
                return o }
            return i.create({ Extends: n, constructor: function(t) { a.superclass.constructor.call(this, t) }, renderType: "dom", startDraw: function(e) {
                    var i = e.drawable = e.drawable || new r;
                    return i.domElement = i.domElement || t(e, i), !0 }, draw: function(t) {
                    var e = t.parent,
                        i = t.drawable.domElement,
                        n = i.parentNode;
                    if (e) {
                        var r = e.drawable.domElement;
                        if (r != n && r.appendChild(i), !t.width && !t.height) {
                            var a = t.drawable.rect;
                            a && (a[2] || a[3]) && (t.width = a[2], t.height = a[3]) } } else t !== this.stage || n || (i.style.overflow = "hidden", this.canvas.appendChild(i)) }, transform: function(t) {
                    if (e.setElementStyleByView(t), t === this.stage) {
                        var i = this.canvas.style,
                            n = t._scaleX,
                            r = t._scaleY,
                            a = t.scaleX,
                            s = t.scaleY;
                        (!n && 1 != a || n && n != a) && (t._scaleX = a, i.width = a * t.width + "px"), (!r && 1 != s || r && r != s) && (t._scaleY = s, i.height = s * t.height + "px") } }, remove: function(t) {
                    var e = t.drawable,
                        i = e && e.domElement;
                    if (i) {
                        var n = i.parentNode;
                        n && n.removeChild(i) } }, hide: function(t) {
                    var e = t.drawable && t.drawable.domElement;
                    e && (e.style.display = "none") }, resize: function(t, e) {
                    var i = this.canvas.style;
                    i.width = t + "px", i.height = e + "px", "absolute" != i.position && (i.position = "relative") } }) }();
    e.DOMRenderer = a }(window),
function(t) {
    var e = t.Hilo,
        i = e.Class,
        n = e.Renderer,
        r = e.Matrix,
        a = Math.PI / 180,
        s = i.create({ Extends: n, Statics: { MAX_BATCH_NUM: 2e3, ATTRIBUTE_NUM: 5, isSupport: null }, renderType: "webgl", gl: null, constructor: function(e) { t.__render = this, s.superclass.constructor.call(this, e);
                var i = this.gl = this.canvas.getContext("webgl") || this.canvas.getContext("experimental-webgl");
                this.maxBatchNum = s.MAX_BATCH_NUM, this.positionStride = 4 * s.ATTRIBUTE_NUM;
                var n = this.maxBatchNum * s.ATTRIBUTE_NUM * 4,
                    r = 6 * this.maxBatchNum;
                this.positions = new Float32Array(n), this.indexs = new Uint16Array(r);
                for (var a = 0, o = 0; r > a; a += 6, o += 4) this.indexs[a + 0] = o + 0, this.indexs[a + 1] = o + 1, this.indexs[a + 2] = o + 2, this.indexs[a + 3] = o + 1, this.indexs[a + 4] = o + 2, this.indexs[a + 5] = o + 3;
                this.batchIndex = 0, this.sprites = [], i.blendFunc(i.ONE, i.ONE_MINUS_SRC_ALPHA), i.clearColor(0, 0, 0, 0), i.disable(i.DEPTH_TEST), i.disable(i.CULL_FACE), i.enable(i.BLEND), this._initShaders(), this.defaultShader.active(), this.positionBuffer = i.createBuffer(), this.indexBuffer = i.createBuffer(), i.bindBuffer(i.ELEMENT_ARRAY_BUFFER, this.indexBuffer), i.bufferData(i.ELEMENT_ARRAY_BUFFER, this.indexs, i.STATIC_DRAW), i.bindBuffer(i.ARRAY_BUFFER, this.positionBuffer), i.bufferData(i.ARRAY_BUFFER, this.positions, i.DYNAMIC_DRAW), i.vertexAttribPointer(this.a_position, 2, i.FLOAT, !1, this.positionStride, 0), i.vertexAttribPointer(this.a_TexCoord, 2, i.FLOAT, !1, this.positionStride, 8), i.vertexAttribPointer(this.a_alpha, 1, i.FLOAT, !1, this.positionStride, 16) }, context: null, startDraw: function(t) {
                return t.visible && t.alpha > 0 ? (t === this.stage && this.clear(), !0) : !1 }, draw: function(t) {
                var e = (this.context, t.width),
                    i = t.height,
                    n = (t.background, t.drawable),
                    r = n && n.image;
                if (r) { this.gl;
                    r.texture || this.activeShader.uploadTexture(r);
                    var a = n.rect,
                        s = a[2],
                        o = a[3];
                    a[4], a[5];
                    e || i || (e = t.width = s, i = t.height = o), this.batchIndex >= this.maxBatchNum && this._renderBatches();
                    var h = this._createVertexs(r, a[0], a[1], s, o, 0, 0, e, i),
                        l = this.batchIndex * this.positionStride,
                        c = this.positions,
                        u = t.__webglRenderAlpha;
                    c[l + 0] = h[0], c[l + 1] = h[1], c[l + 2] = h[2], c[l + 3] = h[3], c[l + 4] = u, c[l + 5] = h[4], c[l + 6] = h[5], c[l + 7] = h[6], c[l + 8] = h[7], c[l + 9] = u, c[l + 10] = h[8], c[l + 11] = h[9], c[l + 12] = h[10], c[l + 13] = h[11], c[l + 14] = u, c[l + 15] = h[12], c[l + 16] = h[13], c[l + 17] = h[14], c[l + 18] = h[15], c[l + 19] = u;
                    for (var d = t.__webglWorldMatrix, f = 0; 4 > f; f++) {
                        var p = c[l + 5 * f],
                            v = c[l + 5 * f + 1];
                        c[l + 5 * f] = d.a * p + d.c * v + d.tx, c[l + 5 * f + 1] = d.b * p + d.d * v + d.ty }
                    t.texture = r.texture, this.sprites[this.batchIndex++] = t } }, endDraw: function(t) { t === this.stage && this._renderBatches() }, transform: function(t) {
                var i = t.drawable;
                if (i && i.domElement) return void e.setElementStyleByView(t);
                var n = (this.context, t.scaleX),
                    a = t.scaleY;
                if (t === this.stage) {
                    var s = this.canvas.style,
                        o = t._scaleX,
                        h = t._scaleY;
                    (!o && 1 != n || o && o != n) && (t._scaleX = n, s.width = n * t.width + "px"), (!h && 1 != a || h && h != a) && (t._scaleY = a, s.height = a * t.height + "px"), t.__webglWorldMatrix = t.__webglWorldMatrix || new r(1, 0, 0, 1, 0, 0) } else t.__webglWorldMatrix = t.__webglWorldMatrix || new r(1, 0, 0, 1, 0, 0), this._setConcatenatedMatrix(t, t.parent);
                t.alpha > 0 && (t.parent && t.parent.__webglRenderAlpha ? t.__webglRenderAlpha = t.alpha * t.parent.__webglRenderAlpha : t.__webglRenderAlpha = t.alpha) }, remove: function(t) {
                var e = t.drawable,
                    i = e && e.domElement;
                if (i) {
                    var n = i.parentNode;
                    n && n.removeChild(i) } }, clear: function(t, e, i, n) { this.gl.clear(this.gl.COLOR_BUFFER_BIT) }, resize: function(t, e) {
                (this.width !== t || this.height !== e) && (this.width = this.canvas.width = t, this.height = this.canvas.height = e, this.gl.viewport(0, 0, t, e), this.canvasHalfWidth = .5 * t, this.canvasHalfHeight = .5 * e, this._uploadProjectionTransform(!0)) }, _renderBatches: function() {
                var t = this.gl;
                t.bufferSubData(t.ARRAY_BUFFER, 0, this.positions.subarray(0, this.batchIndex * this.positionStride));
                for (var e = 0, i = 0, n = null, r = 0; r < this.batchIndex; r++) {
                    var a = this.sprites[r];
                    n && n !== a.texture && (this._renderBatch(e, r), e = r, i = 1), n = a.texture }
                this._renderBatch(e, this.batchIndex), this.batchIndex = 0 }, _renderBatch: function(t, e) {
                var i = this.gl,
                    n = e - t;
                n > 0 && (i.bindTexture(i.TEXTURE_2D, this.sprites[t].texture), i.drawElements(i.TRIANGLES, 6 * n, i.UNSIGNED_SHORT, 6 * t * 2)) }, _uploadProjectionTransform: function(t) {
                (!this._projectionTransformElements || t) && (this._projectionTransformElements = new Float32Array([1 / this.canvasHalfWidth, 0, 0, 0, -1 / this.canvasHalfHeight, 0, -1, 1, 1])), this.gl.uniformMatrix3fv(this.u_projectionTransform, !1, this._projectionTransformElements) }, _initShaders: function() {
                var t = "            attribute vec2 a_position;\n            attribute vec2 a_TexCoord;\n            attribute float a_alpha;\n            uniform mat3 u_projectionTransform;\n            varying vec2 v_TexCoord;\n            varying float v_alpha;\n            void main(){\n                gl_Position =  vec4((u_projectionTransform * vec3(a_position, 1.0)).xy, 1.0, 1.0);\n                v_TexCoord = a_TexCoord;\n                v_alpha = a_alpha;\n            }\n        ",
                    e = "\n            precision mediump float;\n            uniform sampler2D u_Sampler;\n            varying vec2 v_TexCoord;\n            varying float v_alpha;\n            void main(){\n                gl_FragColor = texture2D(u_Sampler, v_TexCoord) * v_alpha;\n            }\n        ";
                this.defaultShader = new h(this, { v: t, f: e }, { attributes: ["a_position", "a_TexCoord", "a_alpha"], uniforms: ["u_projectionTransform", "u_Alpha", "u_Sampler"] }) }, _createVertexs: function(t, e, i, n, r, a, s, o, h) {
                var l = this.__tempVertexs || [],
                    c = t.width,
                    u = t.height;
                n /= c, r /= u, e /= c, i /= u, o = o, h = h, a = a, s = s, n + e > 1 && (n = 1 - e), r + i > 1 && (r = 1 - i);
                var d = 0;
                return l[d++] = a, l[d++] = s, l[d++] = e, l[d++] = i, l[d++] = a + o, l[d++] = s, l[d++] = e + n, l[d++] = i, l[d++] = a, l[d++] = s + h, l[d++] = e, l[d++] = i + r, l[d++] = a + o, l[d++] = s + h, l[d++] = e + n, l[d++] = i + r, l }, _setConcatenatedMatrix: function(t, e) {
                var i = t.__webglWorldMatrix,
                    n = 1,
                    r = 0,
                    s = t.rotation % 360,
                    o = t.pivotX,
                    h = t.pivotY,
                    l = t.scaleX,
                    c = t.scaleY;
                if (s) {
                    var u = s * a;
                    n = Math.cos(u), r = Math.sin(u) }
                i.a = n * l, i.b = r * l, i.c = -r * c, i.d = n * c, i.tx = t.x - i.a * o - i.c * h, i.ty = t.y - i.b * o - i.d * h, i.concat(e.__webglWorldMatrix) } }),
        o = {},
        h = function(t, e, i) { this.renderer = t, this.gl = t.gl, this.program = this._createProgram(this.gl, e.v, e.f), i = i || {}, this.attributes = i.attributes || [], this.uniforms = i.uniforms || [] };
    h.prototype = { active: function() {
            var t = this,
                e = t.renderer,
                i = t.gl,
                n = t.program;
            n && i && (e.activeShader = t, i.useProgram(n), t.attributes.forEach(function(t) { e[t] = i.getAttribLocation(n, t), i.enableVertexAttribArray(e[t]) }), t.uniforms.forEach(function(t) { e[t] = i.getUniformLocation(n, t) }), (t.width !== e.width || t.height !== e.height) && (t.width = e.width, t.height = e.height, e._uploadProjectionTransform())) }, uploadTexture: function(t) {
            var e = this.gl,
                i = this.renderer;
            if (o[t.src]) t.texture = o[t.src];
            else {
                var n = e.createTexture(),
                    r = i.u_Sampler;
                e.activeTexture(e.TEXTURE0), e.bindTexture(e.TEXTURE_2D, n), e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL, 1), e.texImage2D(e.TEXTURE_2D, 0, e.RGBA, e.RGBA, e.UNSIGNED_BYTE, t), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, e.LINEAR), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, e.LINEAR), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e.CLAMP_TO_EDGE), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.CLAMP_TO_EDGE), e.uniform1i(r, 0), e.bindTexture(e.TEXTURE_2D, null), t.texture = n, o[t.src] = n } }, _createProgram: function(t, e, i) {
            var n = this._createShader(t, t.VERTEX_SHADER, e),
                r = this._createShader(t, t.FRAGMENT_SHADER, i);
            if (!n || !r) return null;
            var a = t.createProgram();
            if (a) { t.attachShader(a, n), t.attachShader(a, r), t.linkProgram(a), t.deleteShader(r), t.deleteShader(n);
                var s = t.getProgramParameter(a, t.LINK_STATUS);
                if (!s) {
                    var o = t.getProgramInfoLog(a);
                    return console.log("Failed to link program: " + o), t.deleteProgram(a), null } }
            return a }, _createShader: function(t, e, i) {
            var n = t.createShader(e);
            if (n) { t.shaderSource(n, i), t.compileShader(n);
                var r = t.getShaderParameter(n, t.COMPILE_STATUS);
                if (!r) {
                    var a = t.getShaderInfoLog(n);
                    return console.log("Failed to compile shader: " + a), t.deleteShader(n), null } }
            return n } }, s.isSupport = function() {
        if (void 0 !== this._isSupport) return this._isSupport;
        var t = document.createElement("canvas");
        return t.getContext && (t.getContext("webgl") || t.getContext("experimental-webgl")) ? this._isSupport = !0 : this._isSupport = !1, this._isSupport }, e.WebGLRenderer = s }(window),
function(t) {
    var e = t.Hilo,
        i = e.Class,
        n = e.EventMixin,
        r = e.Matrix,
        a = function() {
            function t(t, e, i) {
                for (var n, r, a, s, o = 0, h = !1, l = 0, c = i.length; c > l; l++) {
                    var u = i[l],
                        d = i[(l + 1) % c];
                    if (u.y == d.y && e == u.y && (u.x > d.x ? (n = d.x, r = u.x) : (n = u.x, r = d.x), t >= n && r >= t)) h = !0;
                    else if (u.y > d.y ? (a = d.y, s = u.y) : (a = u.y, s = d.y), !(a > e || e > s)) {
                        var f = (e - u.y) * (d.x - u.x) / (d.y - u.y) + u.x;
                        if (f > t ? o++ : f == t && (h = !0), u.x > t && u.y == e) {
                            var p = i[(c + l - 1) % c];
                            (p.y < e && d.y > e || p.y > e && d.y < e) && o++ } } }
                return h || o % 2 == 1 }

            function a(t, e) {
                var i = s(t, e, { overlap: -(1 / 0), normal: { x: 0, y: 0 } });
                return i ? s(e, t, i) : !1 }

            function s(t, e, i) {
                for (var n, r, a, s, o, h, l, c, u, d = t.length, f = e.length, p = { x: 0, y: 0 }, v = 0; d > v; v++) { n = t[v], r = t[d - 1 > v ? v + 1 : 0], p.x = n.y - r.y, p.y = r.x - n.x, a = Math.sqrt(p.x * p.x + p.y * p.y), p.x /= a, p.y /= a, s = o = t[0].x * p.x + t[0].y * p.y;
                    for (var m = 1; d > m; m++) c = t[m].x * p.x + t[m].y * p.y, c > o ? o = c : s > c && (s = c);
                    for (h = l = e[0].x * p.x + e[0].y * p.y, m = 1; f > m; m++) c = e[m].x * p.x + e[m].y * p.y, c > l ? l = c : h > c && (h = c);
                    if (h > s ? (u = h - o, p.x = -p.x, p.y = -p.y) : u = s - l, u >= 0) return !1;
                    u > i.overlap && (i.overlap = u, i.normal.x = p.x, i.normal.y = p.y) }
                return i }
            return i.create({ Mixes: n, constructor: function(t) { t = t || {}, this.id = this.id || t.id || e.getUid("View"), e.copy(this, t, !0) }, id: null, x: 0, y: 0, width: 0, height: 0, alpha: 1, rotation: 0, visible: !0, pivotX: 0, pivotY: 0, scaleX: 1, scaleY: 1, pointerEnabled: !0, background: null, mask: null, align: null, drawable: null, boundsArea: null, parent: null, depth: -1, getStage: function() {
                    for (var t, e = this; t = e.parent;) e = t;
                    return e.canvas ? e : null }, getScaledWidth: function() {
                    return this.width * this.scaleX }, getScaledHeight: function() {
                    return this.height * this.scaleY }, addTo: function(t, e) {
                    return "number" == typeof e ? t.addChildAt(this, e) : t.addChild(this), this }, removeFromParent: function() {
                    var t = this.parent;
                    return t && t.removeChild(this), this }, getBounds: function() {
                    for (var t, e, i, n, r, a, s, o = this.width, h = this.height, l = this.getConcatenatedMatrix(), c = this.boundsArea || [{ x: 0, y: 0 }, { x: o, y: 0 }, { x: o, y: h }, { x: 0, y: h }], u = [], d = 0, f = c.length; f > d; d++) t = l.transformPoint(c[d], !0, !0), e = t.x, i = t.y, 0 == d ? (n = r = e, a = s = i) : (n > e ? n = e : e > r && (r = e), a > i ? a = i : i > s && (s = i)), u[d] = t;
                    return u.x = n, u.y = a, u.width = r - n, u.height = s - a, u }, getConcatenatedMatrix: function(t) {
                    for (var e = new r(1, 0, 0, 1, 0, 0), i = this; i != t && i.parent; i = i.parent) {
                        var n = 1,
                            a = 0,
                            s = i.rotation % 360,
                            o = i.pivotX,
                            h = i.pivotY,
                            l = i.scaleX,
                            c = i.scaleY;
                        if (s) {
                            var u = s * Math.PI / 180;
                            n = Math.cos(u), a = Math.sin(u) }
                        0 != o && (e.tx -= o), 0 != h && (e.ty -= h), e.concat(n * l, a * l, -a * c, n * c, i.x, i.y) }
                    return e }, hitTestPoint: function(e, i, n) {
                    var r = this.getBounds(),
                        a = e >= r.x && e <= r.x + r.width && i >= r.y && i <= r.y + r.height;
                    return a && n && (a = t(e, i, r)), a }, hitTestObject: function(t, e) {
                    var i = this.getBounds(),
                        n = t.getBounds(),
                        r = i.x <= n.x + n.width && n.x <= i.x + i.width && i.y <= n.y + n.height && n.y <= i.y + i.height;
                    return r && e && (r = a(i, n)), !!r }, _render: function(t, e) { this.onUpdate && this.onUpdate(e) === !1 || !t.startDraw(this) || (t.transform(this), this.render(t, e), t.endDraw(this)) }, _fireMouseEvent: function(t) {
                    if (t.eventCurrentTarget = this, this.fire(t), "mousemove" == t.type) {
                        if (!this.__mouseOver) { this.__mouseOver = !0;
                            var i = e.copy({}, t);
                            i.type = "mouseover", this.fire(i) } } else "mouseout" == t.type && (this.__mouseOver = !1);
                    var n = this.parent;
                    t._stopped || t._stopPropagationed || !n || ("mouseout" == t.type || "touchout" == t.type ? n.hitTestPoint(t.stageX, t.stageY, !0) || n._fireMouseEvent(t) : n._fireMouseEvent(t)) }, onUpdate: null, render: function(t, e) { t.draw(this) }, toString: function() {
                    return e.viewToString(this) } }) }();
    e.View = a }(window),
function(t) {
    var e = t.Hilo,
        i = (e.Class, e.Drawable),
        n = e.createElement("canvas"),
        r = n.getContext("2d"),
        a = { _cacheDirty: !0, cache: function(t) {
                (t || this._cacheDirty || !this._cacheImage) && this.updateCache() }, updateCache: function() { n.width = this.width, n.height = this.height, this._draw(r), this._cacheImage = new Image, this._cacheImage.src = n.toDataURL(), this.drawable = this.drawable || new i, this.drawable.init(this._cacheImage), this._cacheDirty = !1 }, setCacheDirty: function(t) { this._cacheDirty = t } };
    e.CacheMixin = a }(window),
function(t) {
    var e = t.Hilo,
        i = e.Class,
        n = e.View,
        r = i.create({ Extends: n, constructor: function(t) { t = t || {}, this.id = this.id || t.id || e.getUid("Container"), r.superclass.constructor.call(this, t), this.children ? this._updateChildren() : this.children = [] }, children: null, pointerChildren: !0, clipChildren: !1, getNumChildren: function() {
                return this.children.length }, addChildAt: function(t, e) {
                var i = this.children,
                    n = i.length,
                    r = t.parent;
                e = 0 > e ? 0 : e > n ? n : e;
                var a = this.getChildIndex(t);
                if (a == e) return this;
                if (a >= 0 ? (i.splice(a, 1), e = e == n ? n - 1 : e) : r && r.removeChild(t), i.splice(e, 0, t), 0 > a) this._updateChildren(e);
                else {
                    var s = e > a ? a : e,
                        o = e > a ? e : a;
                    this._updateChildren(s, o + 1) }
                return this }, addChild: function(t) {
                for (var e = this.children.length, i = arguments, n = 0, r = i.length; r > n; n++) this.addChildAt(i[n], e + n);
                return this }, removeChildAt: function(t) {
                var e = this.children;
                if (0 > t || t >= e.length) return null;
                var i = e[t];
                if (i) {
                    if (!i.__renderer)
                        for (var n = i; n = n.parent;) {
                            if (n.renderer) { i.__renderer = n.renderer;
                                break }
                            if (n.__renderer) { i.__renderer = n.__renderer;
                                break } }
                    i.__renderer && i.__renderer.remove(i), i.parent = null, i.depth = -1 }
                return e.splice(t, 1), this._updateChildren(t), i }, removeChild: function(t) {
                return this.removeChildAt(this.getChildIndex(t)) }, removeChildById: function(t) {
                for (var e, i = this.children, n = 0, r = i.length; r > n; n++)
                    if (e = i[n], e.id === t) return this.removeChildAt(n), e;
                return null }, removeAllChildren: function() {
                for (; this.children.length;) this.removeChildAt(0);
                return this }, getChildAt: function(t) {
                var e = this.children;
                return 0 > t || t >= e.length ? null : e[t] }, getChildById: function(t) {
                for (var e, i = this.children, n = 0, r = i.length; r > n; n++)
                    if (e = i[n], e.id === t) return e;
                return null }, getChildIndex: function(t) {
                return this.children.indexOf(t) }, setChildIndex: function(t, e) {
                var i = this.children,
                    n = i.indexOf(t);
                if (n >= 0 && n != e) {
                    var r = i.length;
                    e = 0 > e ? 0 : e >= r ? r - 1 : e, i.splice(n, 1), i.splice(e, 0, t), this._updateChildren() }
                return this }, swapChildren: function(t, e) {
                var i = this.children,
                    n = this.getChildIndex(t),
                    r = this.getChildIndex(e);
                t.depth = r, i[r] = t, e.depth = n, i[n] = e }, swapChildrenAt: function(t, e) {
                var i = this.children,
                    n = this.getChildAt(t),
                    r = this.getChildAt(e);
                n.depth = e, i[e] = n, r.depth = t, i[t] = r }, sortChildren: function(t) {
                var e = t,
                    i = this.children;
                if ("string" == typeof e) {
                    var n = e;
                    e = function(t, e) {
                        return e[n] - t[n] } }
                i.sort(e), this._updateChildren() }, _updateChildren: function(t, e) {
                for (var i, n = this.children, t = t || 0, e = e || n.length, r = t; e > r; r++) i = n[r], i.depth = r + 1, i.parent = this }, contains: function(t) {
                for (; t = t.parent;)
                    if (t === this) return !0;
                return !1 }, getViewAtPoint: function(t, e, i, n, r) {
                for (var a, s, o = n ? [] : null, h = this.children, l = h.length - 1; l >= 0; l--)
                    if (a = h[l], !(!a || !a.visible || a.alpha <= 0 || r && !a.pointerEnabled))
                        if (a.children && a.children.length && (!r || a.pointerChildren) && (s = a.getViewAtPoint(t, e, i, n, r)), s) {
                            if (!n) return s;
                            s.length && (o = o.concat(s)) } else if (a.hitTestPoint(t, e, i)) {
                    if (!n) return a;
                    o.push(a) }
                return n && o.length ? o : null }, render: function(t, e) { r.superclass.render.call(this, t, e);
                var i, n, a, s = this.children.slice(0);
                for (i = 0, n = s.length; n > i; i++) a = s[i], a.parent === this && a._render(t, e) } });
    e.Container = r }(window),
function(t) {
    var e = t.Hilo,
        i = e.Class,
        n = e.Container,
        r = e.CanvasRenderer,
        a = e.DOMRenderer,
        s = e.WebGLRenderer,
        o = i.create({ Extends: n, constructor: function(t) { t = t || {}, this.id = this.id || t.id || e.getUid("Stage"), o.superclass.constructor.call(this, t), this._initRenderer(t);
                var i = this.width,
                    n = this.height,
                    r = this.updateViewport();
                t.width || (i = r && r.width || 320), t.height || (n = r && r.height || 480), this.resize(i, n, !0) }, canvas: null, renderer: null, paused: !1, viewport: null, _initRenderer: function(t) {
                var i = t.canvas,
                    n = t.container,
                    o = t.renderType || "canvas";
                if ("string" == typeof i && (i = e.getElement(i)), "string" == typeof n && (n = e.getElement(n)), i) i.getContext || (o = "dom");
                else {
                    var h = "dom" === o ? "div" : "canvas";
                    i = e.createElement(h, { style: { position: "absolute" } }) }
                this.canvas = i, n && n.appendChild(i);
                var l = { canvas: i, stage: this };
                switch (o) {
                    case "dom":
                        this.renderer = new a(l);
                        break;
                    case "webgl":
                        s.isSupport() ? this.renderer = new s(l) : this.renderer = new r(l);
                        break;
                    case "canvas":
                    default:
                        this.renderer = new r(l) } }, addTo: function(t) {
                var e = this.canvas;
                return e.parentNode !== t && t.appendChild(e), this }, tick: function(t) { this.paused || this._render(this.renderer, t) }, enableDOMEvent: function(t, e) {
                for (var i = this, n = i.canvas, r = "string" == typeof t ? [t] : t, e = e !== !1, a = i._domListener || (i._domListener = function(t) { i._onDOMEvent(t) }), s = 0; s < r.length; s++) {
                    var t = r[s];
                    e ? n.addEventListener(t, a, !1) : n.removeEventListener(t, a) }
                return i }, _onDOMEvent: function(t) {
                var i = t.type,
                    n = t,
                    r = 0 == i.indexOf("touch"),
                    a = t;
                if (r) {
                    var s = t.touches,
                        o = t.changedTouches;
                    a = s && s.length ? s[0] : o && o.length ? o[0] : null }
                var h = a.pageX || a.clientX,
                    l = a.pageY || a.clientY,
                    c = this.viewport || this.updateViewport();
                n.stageX = h = (h - c.left) / this.scaleX, n.stageY = l = (l - c.top) / this.scaleY, n.stopPropagation = function() { this._stopPropagationed = !0 };
                var u = this.getViewAtPoint(h, l, !0, !1, !0) || this,
                    d = this.canvas,
                    f = this._eventTarget,
                    p = "mouseout" === i;
                if (f && (f != u && (!f.contains || !f.contains(u)) || p)) {
                    var v = "touchmove" === i ? "touchout" : "mousemove" === i || p || !u ? "mouseout" : null;
                    if (v) {
                        var m = e.copy({}, n);
                        m.type = v, m.eventTarget = f, f._fireMouseEvent(m) }
                    n.lastEventTarget = f, this._eventTarget = null }
                if (u && u.pointerEnabled && "mouseout" !== i && (n.eventTarget = this._eventTarget = u, u._fireMouseEvent(n)), !r) {
                    var g = u && u.pointerEnabled && u.useHandCursor ? "pointer" : "";
                    d.style.cursor = g }
                e.browser.android && "touchmove" === i && t.preventDefault() }, updateViewport: function() {
                var t = this.canvas,
                    i = null;
                return t.parentNode && (i = this.viewport = e.getElementRect(t)), i }, resize: function(t, e, i) {
                (i || this.width !== t || this.height !== e) && (this.width = t, this.height = e, this.renderer.resize(t, e), this.updateViewport()) } });
    e.Stage = o }(window),
function(t) {
    var e = t.Hilo,
        i = e.Class,
        n = e.View,
        r = e.Drawable,
        a = i.create({ Extends: n, constructor: function(t) {
                if (t = t || {}, this.id = this.id || t.id || e.getUid("Bitmap"), a.superclass.constructor.call(this, t), this.drawable = new r(t), !this.width || !this.height) {
                    var i = this.drawable.rect;
                    i && (this.width = i[2], this.height = i[3]) } }, setImage: function(t, e) {
                return this.drawable.init({ image: t, rect: e }), e && (this.width = e[2], this.height = e[3]), this } });
    e.Bitmap = a }(window),
function(t) {
    var e = t.Hilo,
        i = e.Class,
        n = e.View,
        r = e.Drawable,
        a = i.create({
            Extends: n,
            constructor: function(t) { t = t || {}, this.id = this.id || t.id || e.getUid("Sprite"), a.superclass.constructor.call(this, t), this._frames = [], this._frameNames = {}, this.drawable = new r, t.frames && this.addFrame(t.frames) },
            _frames: null,
            _frameNames: null,
            _frameElapsed: 0,
            _firstRender: !0,
            paused: !1,
            loop: !0,
            timeBased: !1,
            interval: 1,
            currentFrame: 0,
            getNumFrames: function() {
                return this._frames ? this._frames.length : 0 },
            addFrame: function(t, e) {
                var i = null != e ? e : this._frames.length;
                if (t instanceof Array)
                    for (var n = 0, r = t.length; r > n; n++) this.setFrame(t[n], i + n);
                else this.setFrame(t, i);
                return this },
            setFrame: function(t, e) {
                var i = this._frames,
                    n = i.length;
                return e = 0 > e ? 0 : e > n ? n : e, i[e] = t, t.name && (this._frameNames[t.name] = t), (0 == e && !this.width || !this.height) && (this.width = t.rect[2], this.height = t.rect[3]), this },
            getFrame: function(t) {
                if ("number" == typeof t) {
                    var e = this._frames;
                    return 0 > t || t >= e.length ? null : e[t] }
                return this._frameNames[t] },
            getFrameIndex: function(t) {
                var e = this._frames,
                    i = e.length,
                    n = -1;
                if ("number" == typeof t) n = t;
                else {
                    var r = "string" == typeof t ? this._frameNames[t] : t;
                    if (r)
                        for (var a = 0; i > a; a++)
                            if (r === e[a]) { n = a;
                                break } }
                return n },
            play: function() {
                return this.paused = !1, this },
            stop: function() {
                return this.paused = !0, this },
            "goto": function(t, e) {
                var i = this._frames.length,
                    n = this.getFrameIndex(t);
                return this.currentFrame = 0 > n ? 0 : n >= i ? i - 1 : n, this.paused = e, this._firstRender = !0, this },
            _render: function(t, e) {
                var i, n = this.currentFrame;
                if (this._firstRender ? (i = n, this._firstRender = !1) : i = this._nextFrame(e), i != n) { this.currentFrame = i;
                    var r = this._frames[i].callback;
                    r && r.call(this) }
                this.onEnterFrame && this.onEnterFrame(i),
                    this.drawable.init(this._frames[i]), a.superclass._render.call(this, t, e)
            },
            _nextFrame: function(t) {
                var e = this._frames,
                    i = e.length,
                    n = this.currentFrame,
                    r = e[n],
                    a = r.duration || this.interval,
                    s = this._frameElapsed,
                    o = 0 != n || this.drawable ? s + (this.timeBased ? t : 1) : 0;
                return s = this._frameElapsed = a > o ? o : 0, (r.stop || !this.loop && n >= i - 1) && this.stop(), this.paused || 0 != s || (null != r.next ? n = this.getFrameIndex(r.next) : n >= i - 1 ? n = 0 : this.drawable && n++), n },
            setFrameCallback: function(t, e) {
                return t = this.getFrame(t), t && (t.callback = e), this },
            onEnterFrame: null
        });
    e.Sprite = a
}(window),
function(t) {
    var e = t.Hilo,
        i = e.Class,
        n = e.View,
        r = e.Drawable,
        a = i.create({ Extends: n, constructor: function(t) { t = t || {}, this.id = this.id || t.id || e.getUid("DOMElement"), a.superclass.constructor.call(this, t), this.drawable = new r;
                var i = this.drawable.domElement = t.element || e.createElement("div");
                i.id = this.id }, _render: function(t, e) { this.onUpdate && this.onUpdate(e) === !1 || (t.transform(this), this.visible && this.alpha > 0 && this.render(t, e)) }, render: function(t, e) {
                var i = t.canvas;
                if (i.getContext) {
                    var n, r = this.drawable.domElement,
                        a = this.depth,
                        s = i.nextSibling;
                    if (r.parentNode) return;
                    for (; s && 3 != s.nodeType && (n = parseInt(s.style.zIndex) || 0, !(0 >= n || n > a));) s = s.nextSibling;
                    i.parentNode.insertBefore(this.drawable.domElement, s) } else t.draw(this) } });
    e.DOMElement = a }(window),
function(t) {
    var e = t.Hilo,
        i = e.Class,
        n = e.View,
        r = e.CacheMixin,
        a = function() {
            var t = document.createElement("canvas"),
                s = t.getContext && t.getContext("2d");
            return i.create({ Extends: n, Mixes: r, constructor: function(t) { t = t || {}, this.id = this.id || t.id || e.getUid("Graphics"), a.superclass.constructor.call(this, t), this._actions = [] }, lineWidth: 1, lineAlpha: 1, lineCap: null, lineJoin: null, miterLimit: 10, hasStroke: !1, strokeStyle: "0", hasFill: !1, fillStyle: "0", fillAlpha: 0, lineStyle: function(t, e, i, n, r, a) {
                    var s = this,
                        o = s._addAction;
                    return o.call(s, ["lineWidth", s.lineWidth = t || 1]), o.call(s, ["strokeStyle", s.strokeStyle = e || "0"]), o.call(s, ["lineAlpha", s.lineAlpha = i || 1]), void 0 != n && o.call(s, ["lineCap", s.lineCap = n]), void 0 != r && o.call(s, ["lineJoin", s.lineJoin = r]), void 0 != a && o.call(s, ["miterLimit", s.miterLimit = a]), s.hasStroke = !0, s }, beginFill: function(t, e) {
                    var i = this,
                        n = i._addAction;
                    return n.call(i, ["fillStyle", i.fillStyle = t]), n.call(i, ["fillAlpha", i.fillAlpha = e || 1]), i.hasFill = !0, i }, endFill: function() {
                    var t = this,
                        e = t._addAction;
                    return t.hasStroke && e.call(t, ["stroke"]), t.hasFill && e.call(t, ["fill"]), t.setCacheDirty(!0), t }, beginLinearGradientFill: function(t, e, i, n, r, a) {
                    for (var o = this, h = s.createLinearGradient(t, e, i, n), l = 0, c = r.length; c > l; l++) h.addColorStop(a[l], r[l]);
                    return o.hasFill = !0, o._addAction(["fillStyle", o.fillStyle = h]) }, beginRadialGradientFill: function(t, e, i, n, r, a, o, h) {
                    for (var l = this, c = s.createRadialGradient(t, e, i, n, r, a), u = 0, d = o.length; d > u; u++) c.addColorStop(h[u], o[u]);
                    return l.hasFill = !0, l._addAction(["fillStyle", l.fillStyle = c]) }, beginBitmapFill: function(t, e) {
                    var i = this,
                        n = s.createPattern(t, e || "");
                    return i.hasFill = !0, i._addAction(["fillStyle", i.fillStyle = n]) }, beginPath: function() {
                    return this._addAction(["beginPath"]) }, closePath: function() {
                    return this._addAction(["closePath"]) }, moveTo: function(t, e) {
                    return this._addAction(["moveTo", t, e]) }, lineTo: function(t, e) {
                    return this._addAction(["lineTo", t, e]) }, quadraticCurveTo: function(t, e, i, n) {
                    return this._addAction(["quadraticCurveTo", t, e, i, n]) }, bezierCurveTo: function(t, e, i, n, r, a) {
                    return this._addAction(["bezierCurveTo", t, e, i, n, r, a]) }, drawRect: function(t, e, i, n) {
                    return this._addAction(["rect", t, e, i, n]) }, drawRoundRectComplex: function(t, e, i, n, r, a, s, o) {
                    var h = this,
                        l = h._addAction;
                    return l.call(h, ["moveTo", t + r, e]), l.call(h, ["lineTo", t + i - a, e]), l.call(h, ["arc", t + i - a, e + a, a, -Math.PI / 2, 0, !1]), l.call(h, ["lineTo", t + i, e + n - s]), l.call(h, ["arc", t + i - s, e + n - s, s, 0, Math.PI / 2, !1]), l.call(h, ["lineTo", t + o, e + n]), l.call(h, ["arc", t + o, e + n - o, o, Math.PI / 2, Math.PI, !1]), l.call(h, ["lineTo", t, e + r]), l.call(h, ["arc", t + r, e + r, r, Math.PI, 3 * Math.PI / 2, !1]), h }, drawRoundRect: function(t, e, i, n, r) {
                    return this.drawRoundRectComplex(t, e, i, n, r, r, r, r) }, drawCircle: function(t, e, i) {
                    return this._addAction(["arc", t + i, e + i, i, 0, 2 * Math.PI, 0]) }, drawEllipse: function(t, e, i, n) {
                    var r = this;
                    if (i == n) return r.drawCircle(t, e, i);
                    var a = r._addAction,
                        s = i / 2,
                        o = n / 2,
                        h = .5522847498307933,
                        l = h * s,
                        c = h * o;
                    return t += s, e += o, a.call(r, ["moveTo", t + s, e]), a.call(r, ["bezierCurveTo", t + s, e - c, t + l, e - o, t, e - o]), a.call(r, ["bezierCurveTo", t - l, e - o, t - s, e - c, t - s, e]), a.call(r, ["bezierCurveTo", t - s, e + c, t - l, e + o, t, e + o]), a.call(r, ["bezierCurveTo", t + l, e + o, t + s, e + c, t + s, e]), r }, drawSVGPath: function(t) {
                    var e = this,
                        i = e._addAction,
                        n = t.split(/,| (?=[a-zA-Z])/);
                    i.call(e, ["beginPath"]);
                    for (var r = 0, a = n.length; a > r; r++) {
                        var s = n[r],
                            o = s[0].toUpperCase(),
                            h = s.substring(1).split(/,| /);
                        switch (0 == h[0].length && h.shift(), o) {
                            case "M":
                                i.call(e, ["moveTo", h[0], h[1]]);
                                break;
                            case "L":
                                i.call(e, ["lineTo", h[0], h[1]]);
                                break;
                            case "C":
                                i.call(e, ["bezierCurveTo", h[0], h[1], h[2], h[3], h[4], h[5]]);
                                break;
                            case "Z":
                                i.call(e, ["closePath"]) } }
                    return e }, _draw: function(t) {
                    var e, i = this,
                        n = i._actions,
                        r = n.length;
                    for (t.beginPath(), e = 0; r > e; e++) {
                        var a = n[e],
                            s = a[0],
                            o = a.length > 1 ? a.slice(1) : null; "function" == typeof t[s] ? t[s].apply(t, o) : t[s] = a[1] } }, render: function(t, e) {
                    var i = this;
                    t.canvas; "canvas" === t.renderType ? i._draw(t.context) : (i.cache(), t.draw(i)) }, clear: function() {
                    var t = this;
                    return t._actions.length = 0, t.lineWidth = 1, t.lineAlpha = 1, t.lineCap = null, t.lineJoin = null, t.miterLimit = 10, t.hasStroke = !1, t.strokeStyle = "0", t.hasFill = !1, t.fillStyle = "0", t.fillAlpha = 1, t.setCacheDirty(!0), t }, _addAction: function(t) {
                    var e = this;
                    return e._actions.push(t), e } }) }();
    e.Graphics = a }(window),
function(t) {
    var e = t.Hilo,
        i = e.Class,
        n = e.View,
        r = e.CacheMixin,
        a = i.create({ Extends: n, Mixes: r, constructor: function(t) { t = t || {}, this.id = this.id || t.id || e.getUid("Text"), a.superclass.constructor.call(this, t), t.font || (this.font = "12px arial"), this._fontHeight = a.measureFontHeight(this.font) }, text: null, color: "#000", textAlign: null, textVAlign: null, outline: !1, lineSpacing: 0, maxWidth: 200, font: null, textWidth: 0, textHeight: 0, setFont: function(t) {
                var e = this;
                return e.font !== t && (e.font = t, e._fontHeight = a.measureFontHeight(t)), e }, render: function(t, e) {
                var i = this;
                t.canvas;
                if ("canvas" === t.renderType) i._draw(t.context);
                else if ("dom" === t.renderType) {
                    var n = i.drawable,
                        r = n.domElement,
                        a = r.style;
                    a.font = i.font, a.textAlign = i.textAlign, a.color = i.color, a.width = i.width + "px", a.height = i.height + "px", a.lineHeight = i._fontHeight + i.lineSpacing + "px", r.innerHTML = i.text, t.draw(this) } else i.cache(), t.draw(i) }, _draw: function(t) {
                var e = this,
                    i = e.text.toString();
                if (i) { t.font = e.font, t.textAlign = e.textAlign, t.textBaseline = "top";
                    var n, r, a, s = i.split(/\r\n|\r|\n|<br(?:[ \/])*>/),
                        o = 0,
                        h = 0,
                        l = e._fontHeight + e.lineSpacing,
                        c = [];
                    for (n = 0, len = s.length; n < len; n++)
                        if (r = s[n], a = t.measureText(r).width, a <= e.maxWidth) c.push({ text: r, y: h }), a > o && (o = a), h += l;
                        else {
                            var u, d, f, p = "",
                                v = 0;
                            for (d = 0, wlen = r.length; d < wlen; d++) f = r[d], u = t.measureText(p + f).width, u > e.maxWidth ? (c.push({ text: p, y: h }), v > o && (o = v), h += l, p = f) : (v = u, p += f), d == wlen - 1 && (c.push({ text: p, y: h }), p !== f && u > o && (o = u), h += l) }
                    e.textWidth = o, e.textHeight = h, e.width || (e.width = o), e.height || (e.height = h);
                    var m = 0;
                    switch (e.textVAlign) {
                        case "middle":
                            m = e.height - e.textHeight >> 1;
                            break;
                        case "bottom":
                            m = e.height - e.textHeight }
                    var g = e.background;
                    g && (t.fillStyle = g, t.fillRect(0, 0, e.width, e.height)), e.outline ? t.strokeStyle = e.color : t.fillStyle = e.color;
                    for (var n = 0; n < c.length; n++) {
                        var r = c[n];
                        e._drawTextLine(t, r.text, m + r.y) } } }, _drawTextLine: function(t, e, i) {
                var n = this,
                    r = 0,
                    a = n.width;
                switch (n.textAlign) {
                    case "center":
                        r = a >> 1;
                        break;
                    case "right":
                    case "end":
                        r = a }
                n.outline ? t.strokeText(e, r, i) : t.fillText(e, r, i) }, Statics: { measureFontHeight: function(t) {
                    var i, n = document.documentElement,
                        r = e.createElement("div", { style: { font: t, position: "absolute" }, innerHTML: "M" });
                    return n.appendChild(r), i = r.offsetHeight, n.removeChild(r), i } } });
    e.Text = a }(window),
function(t) {
    var e = t.Hilo,
        i = e.Class,
        n = e.Container,
        r = e.Bitmap,
        a = i.create({ Extends: n, constructor: function(t) { t = t || {}, this.id = this.id || t.id || e.getUid("BitmapText"), a.superclass.constructor.call(this, t);
                var i = t.text + "";
                i && (this.text = "", this.setText(i)), this.pointerChildren = !1 }, glyphs: null, letterSpacing: 0, text: "", textAlign: "left", setText: function(t) {
                var e = this,
                    i = t.toString(),
                    n = i.length;
                if (e.text != i) { e.text = i;
                    var r, a, s, o, h = 0,
                        l = 0,
                        c = 0;
                    for (r = 0; n > r; r++) a = i.charAt(r), s = e.glyphs[a], s && (c = h + (h > 0 ? e.letterSpacing : 0), e.children[r] ? (o = e.children[r], o.setImage(s.image, s.rect)) : (o = e._createBitmap(s), e.addChild(o)), o.x = c, h = c + s.rect[2], l = Math.max(l, s.rect[3]));
                    for (r = e.children.length - 1; r >= n; r--) e._releaseBitmap(e.children[r]), e.children[r].removeFromParent();
                    return e.width = h, e.height = l, this.setTextAlign(), e } }, _createBitmap: function(t) {
                var e;
                return a._pool.length ? (e = a._pool.pop(), e.setImage(t.image, t.rect)) : e = new r({ image: t.image, rect: t.rect }), e }, _releaseBitmap: function(t) { a._pool.push(t) }, setTextAlign: function(t) {
                switch (this.textAlign = t || this.textAlign, this.textAlign) {
                    case "center":
                        this.pivotX = .5 * this.width;
                        break;
                    case "right":
                        this.pivotX = this.width;
                        break;
                    case "left":
                    default:
                        this.pivotX = 0 }
                return this }, hasGlyphs: function(t) {
                var e = this.glyphs;
                if (!e) return !1;
                var i, t = t.toString(),
                    n = t.length;
                for (i = 0; n > i; i++)
                    if (!e[t.charAt(i)]) return !1;
                return !0 }, Statics: { _pool: [], createGlyphs: function(t, e, i, n) {
                    var r = t.toString();
                    i = i || r.length, n = n || 1;
                    for (var a = e.width / i, s = e.height / n, o = {}, h = 0, l = t.length; l > h; h++) charStr = r.charAt(h), o[charStr] = { image: e, rect: [a * (h % i), s * Math.floor(h / i), a, s] };
                    return o } } });
    e.BitmapText = a }(window),
function(t) {
    var e = t.Hilo,
        i = e.Class,
        n = e.View,
        r = e.Drawable,
        a = i.create({ Extends: n, constructor: function(t) { t = t || {}, this.id = this.id || t.id || e.getUid("Button"), a.superclass.constructor.call(this, t), this.drawable = new r(t), this.setState(a.UP) }, upState: null, overState: null, downState: null, disabledState: null, state: null, enabled: !0, useHandCursor: !0, setEnabled: function(t) {
                return this.enabled != t && (t ? this.setState(a.UP) : this.setState(a.DISABLED)), this }, setState: function(t) {
                if (this.state !== t) { this.state = t, this.pointerEnabled = this.enabled = t !== a.DISABLED;
                    var i;
                    switch (t) {
                        case a.UP:
                            i = this.upState;
                            break;
                        case a.OVER:
                            i = this.overState;
                            break;
                        case a.DOWN:
                            i = this.downState;
                            break;
                        case a.DISABLED:
                            i = this.disabledState }
                    i && (this.drawable.init(i), e.copy(this, i, !0)) }
                return this }, fire: function(t, e) {
                if (this.enabled) {
                    var i = "string" == typeof t ? t : t.type;
                    switch (i) {
                        case "mousedown":
                        case "touchstart":
                        case "touchmove":
                            this.setState(a.DOWN);
                            break;
                        case "mouseover":
                            this.setState(a.OVER);
                            break;
                        case "mouseup":
                            this.overState ? this.setState(a.OVER) : this.upState && this.setState(a.UP);
                            break;
                        case "touchend":
                        case "touchout":
                        case "mouseout":
                            this.setState(a.UP) }
                    return a.superclass.fire.call(this, t, e) } }, Statics: { UP: "up", OVER: "over", DOWN: "down", DISABLED: "disabled" } });
    e.Button = a }(window),
function(t) {
    var e = t.Hilo,
        i = e.Class,
        n = function() {
            function t(t) {
                var e = t.frames;
                if (!e) return null;
                var i, n = [];
                if (e instanceof Array)
                    for (var r = 0, a = e.length; a > r; r++) i = e[r], n[r] = { image: t.image, rect: i };
                else
                    for (var s = e.frameWidth, o = e.frameHeight, h = t.width / s | 0, l = t.height / o | 0, c = e.numFrames || h * l, r = 0; c > r; r++) n[r] = { image: t.image, rect: [r % h * s, (r / h | 0) * o, s, o] };
                return n }

            function e(t, e) {
                var i = t.sprites;
                if (!i) return null;
                var a, s, o, h = {};
                for (var l in i) {
                    if (a = i[l], r(a)) s = n(e[a]);
                    else if (a instanceof Array) { s = [];
                        for (var c = 0, u = a.length; u > c; c++) {
                            var d, f = a[c];
                            r(f) ? o = n(e[f]) : (d = f.rect, r(d) && (d = e[f.rect]), o = n(d, f)), s[c] = o } } else { s = [];
                        for (var c = a.from; c <= a.to; c++) s[c - a.from] = n(e[c], a[c]) }
                    h[l] = s }
                return h }

            function n(t, e) {
                var i = { image: t.image, rect: t.rect };
                return e && (i.name = e.name || null, i.duration = e.duration || 0, i.stop = !!e.stop, i.next = e.next || null), i }

            function r(t) {
                return "number" == typeof t }
            return i.create({ constructor: function(i) { this._frames = t(i), this._sprites = e(i, this._frames) }, _frames: null, _sprites: null, getFrame: function(t) {
                    var e = this._frames;
                    return e && e[t] }, getSprite: function(t) {
                    var e = this._sprites;
                    return e && e[t] }, Statics: { createSpriteFrames: function(t, e, i, n, r, a, s) {
                        if ("[object Array]" === Object.prototype.toString.call(t)) {
                            for (var e = [], o = 0, h = t.length; h > o; o++) e = e.concat(this.createSpriteFrames.apply(this, t[o]));
                            return e }
                        if ("string" == typeof e) {
                            var l = e.split(",");
                            e = [];
                            for (var c = 0, u = l.length; u > c; c++) {
                                var d = l[c].split("-");
                                if (1 == d.length) e.push(parseInt(d[0]));
                                else
                                    for (var o = parseInt(d[0]), h = parseInt(d[1]); h >= o; o++) e.push(o) } }
                        for (var f = Math.floor(i.width / n), o = 0; o < e.length; o++) {
                            var p = e[o];
                            e[o] = { rect: [n * (p % f), r * Math.floor(p / f), n, r], image: i, duration: s } }
                        return e[0].name = t, a ? e[e.length - 1].next = t : e[e.length - 1].stop = !0, e } } }) }();
    e.TextureAtlas = n }(window),
function(t) {
    var e = t.Hilo,
        i = e.Class,
        n = i.create({ constructor: function(t) { this._targetFPS = t || 30, this._interval = 1e3 / this._targetFPS, this._tickers = [] }, _paused: !1, _targetFPS: 0, _interval: 0, _intervalId: null, _tickers: null, _lastTime: 0, _tickCount: 0, _tickTime: 0, _measuredFPS: 0, start: function(i) {
                if (!this._intervalId) { this._lastTime = +new Date;
                    var n = this,
                        r = this._interval,
                        a = t.requestAnimationFrame || t[e.browser.jsVendor + "RequestAnimationFrame"];
                    if (i && a) var s = function() { n._tick() },
                        o = function() { n._intervalId = setTimeout(o, r), a(s) };
                    else o = function() { n._intervalId = setTimeout(o, r), n._tick() };
                    o() } }, stop: function() { clearTimeout(this._intervalId), this._intervalId = null, this._lastTime = 0 }, pause: function() { this._paused = !0 }, resume: function() { this._paused = !1 }, _tick: function() {
                if (!this._paused) {
                    var t = +new Date,
                        e = t - this._lastTime,
                        i = this._tickers;++this._tickCount >= this._targetFPS ? (this._measuredFPS = 1e3 / (this._tickTime / this._tickCount) + .5 >> 0, this._tickCount = 0, this._tickTime = 0) : this._tickTime += t - this._lastTime, this._lastTime = t;
                    for (var n = 0, r = i.length; r > n; n++) i[n].tick(e) } }, getMeasuredFPS: function() {
                return this._measuredFPS }, addTick: function(t) {
                if (!t || "function" != typeof t.tick) throw new Error("Ticker: The tick object must implement the tick method.");
                this._tickers.push(t) }, removeTick: function(t) {
                var e = this._tickers,
                    i = e.indexOf(t);
                i >= 0 && e.splice(i, 1) } });
    e.Ticker = n }(window),
function(t) {
    var e = t.Hilo,
        i = Array.prototype,
        n = i.slice;
    i.indexOf = i.indexOf || function(t, e) { e = e || 0;
        var i, n = this.length;
        if (0 == n || e >= n) return -1;
        for (0 > e && (e = n + e), i = e; n > i; i++)
            if (this[i] === t) return i;
        return -1 };
    var r = Function.prototype;
    r.bind = r.bind || function(t) {
        function e() {
            var a = r.concat(n.call(arguments));
            return i.apply(this instanceof e ? this : t, a) }
        var i = this,
            r = n.call(arguments, 1),
            a = function() {};
        return a.prototype = i.prototype, e.prototype = new a, e }, e.undefined = void 0 }(window),
function(t) {
    var e = t.Hilo,
        i = (e.Class, { startDrag: function(t) {
                function i(t) { t.stopPropagation(), a(t), h.off(e.event.POINTER_START, i), h.fire("dragStart", l), h.__dragX = h.x - l.x, h.__dragY = h.y - l.y, o || (o = this.getStage()), o.on(e.event.POINTER_MOVE, r), document.addEventListener(e.event.POINTER_END, n) }

                function n(t) { document.removeEventListener(e.event.POINTER_END, n), o && o.off(e.event.POINTER_MOVE, r), h.fire("dragEnd", l), h.on(e.event.POINTER_START, i) }

                function r(t) { a(t), h.fire("dragMove", l);
                    var e = l.x + h.__dragX,
                        i = l.y + h.__dragY;
                    h.x = Math.max(c, Math.min(d, e)), h.y = Math.max(u, Math.min(f, i)) }

                function a(t) { l.preX = l.x, l.preY = l.y, l.x = t.stageX, l.y = t.stageY }

                function s() { document.removeEventListener(e.event.POINTER_END, n), o && o.off(e.event.POINTER_MOVE, r), h.off(e.event.POINTER_START, i) }
                var o, h = this,
                    t = t || [-(1 / 0), -(1 / 0), 1 / 0, 1 / 0],
                    l = { x: 0, y: 0, preX: 0, preY: 0 },
                    c = t[0],
                    u = t[1],
                    d = t[2] == 1 / 0 ? 1 / 0 : c + t[2],
                    f = t[3] == 1 / 0 ? 1 / 0 : u + t[3];
                h.on(e.event.POINTER_START, i), h.stopDrag = s }, stopDrag: function() {} });
    e.drag = i }(window),
function(t) {
    var e = t.Hilo,
        i = e.Class,
        n = function() {
            function t() {
                return +new Date }
            return i.create({ constructor: function(t, e, i, n) {
                    var r = this;
                    r.target = t, r._startTime = 0, r._seekTime = 0, r._pausedTime = 0, r._pausedStartTime = 0, r._reverseFlag = 1, r._repeatCount = 0, 3 == arguments.length && (n = i, i = e, e = null);
                    for (var a in n) r[a] = n[a];
                    r.setProps(e, i), !n.duration && n.time && (r.duration = n.time || 0, r.time = 0) }, target: null, duration: 0, delay: 0, paused: !1, loop: !1, reverse: !1, repeat: 0, repeatDelay: 0, ease: null, time: 0, onStart: null, onUpdate: null, onComplete: null, setProps: function(t, e) {
                    var i = this,
                        n = i.target,
                        r = t || e,
                        a = i._fromProps = {},
                        s = i._toProps = {};
                    t = t || n, e = e || n;
                    for (var o in r) s[o] = e[o] || 0, n[o] = a[o] = t[o] || 0;
                    return i }, start: function() {
                    var e = this;
                    return e._startTime = t() + e.delay, e._seekTime = 0, e._pausedTime = 0, e.paused = !1, n.add(e), e }, stop: function() {
                    return n.remove(this), this }, pause: function() {
                    var e = this;
                    return e.paused = !0, e._pausedStartTime = t(), e }, resume: function() {
                    var e = this;
                    return e.paused = !1, e._pausedStartTime && (e._pausedTime += t() - e._pausedStartTime), e._pausedStartTime = 0, e }, seek: function(e, i) {
                    var r = this,
                        a = t();
                    return r._startTime = a, r._seekTime = e, r._pausedTime = 0, void 0 !== i && (r.paused = i), r._update(a, !0), n.add(r), r }, link: function(t) {
                    var e = this,
                        i = t.delay,
                        r = e._startTime;
                    if ("string" == typeof i) {
                        var a = 0 == i.indexOf("+"),
                            s = 0 == i.indexOf("-");
                        i = a || s ? Number(i.substr(1)) * (a ? 1 : -1) : Number(i) }
                    return t.delay = i, t._startTime = a || s ? r + e.duration + i : r + i, e._next = t, n.remove(t), e }, _render: function(t) {
                    var e, i = this,
                        n = i.target,
                        r = i._fromProps;
                    for (e in r) n[e] = r[e] + (i._toProps[e] - r[e]) * t }, _update: function(e, i) {
                    var r = this;
                    if (!r.paused || i) {
                        var a = e - r._startTime - r._pausedTime + r._seekTime;
                        if (!(0 > a)) {
                            var s, o = a / r.duration,
                                h = !1;
                            o = 0 >= o ? 0 : o >= 1 ? 1 : r.ease ? r.ease(o) : o, r.reverse && (r._reverseFlag < 0 && (o = 1 - o), 1e-7 > o && (r.repeat > 0 && r._repeatCount++ >= r.repeat || 0 == r.repeat && !r.loop ? h = !0 : (r._startTime = t(), r._pausedTime = 0, r._reverseFlag *= -1))), 0 == r.time && (s = r.onStart) && s.call(r, r), r.time = a, r._render(o), (s = r.onUpdate) && s.call(r, o, r), o >= 1 && (r.reverse ? (r._startTime = t(), r._pausedTime = 0, r._reverseFlag *= -1) : r.loop || r.repeat > 0 && r._repeatCount++ < r.repeat ? (r._startTime = t() + r.repeatDelay, r._pausedTime = 0) : h = !0);
                            var l = r._next;
                            if (l && l.time <= 0) {
                                var c = l._startTime;
                                c > 0 && e >= c ? (l._render(o), l.time = a, n.add(l)) : h && (0 > c || c > e) && l.start() }
                            return h ? ((s = r.onComplete) && s.call(r, r), !0) : void 0 } } }, Statics: { _tweens: [], tick: function() {
                        var e, i, r = n._tweens,
                            a = r.length;
                        for (i = 0; a > i; i++) e = r[i], e && e._update(t()) && (r.splice(i, 1), i--);
                        return n }, add: function(t) {
                        var e = n._tweens;
                        return -1 == e.indexOf(t) && e.push(t), n }, remove: function(t) {
                        if (t instanceof Array) {
                            for (var e = 0, i = t.length; i > e; e++) n.remove(t[e]);
                            return n }
                        var e, r = n._tweens;
                        if (t instanceof n) e = r.indexOf(t), e > -1 && r.splice(e, 1);
                        else
                            for (e = 0; e < r.length; e++) r[e].target === t && (r.splice(e, 1), e--);
                        return n }, removeAll: function() {
                        return n._tweens.length = 0, n }, fromTo: function(t, e, i, r) {
                        var a = t instanceof Array;
                        t = a ? t : [t];
                        var s, o, h = r.stagger,
                            l = [];
                        for (o = 0; o < t.length; o++) s = new n(t[o], e, i, r), h && (s.delay = (r.delay || 0) + (o * h || 0)), s.start(), l.push(s);
                        return a ? l : s }, to: function(t, e, i) {
                        return n.fromTo(t, null, e, i) }, from: function(t, e, i) {
                        return n.fromTo(t, e, null, i) } } }) }();
    e.Tween = n }(window),
function(t) {
    var e = t.Hilo,
        i = function() {
            function t(t, e, i, n, r) {
                return t = t || {}, e && (t.EaseIn = e), i && (t.EaseOut = i), n && (t.EaseInOut = n), r && (t.EaseNone = r), t }
            var e = t(null, null, null, null, function(t) {
                    return t }),
                i = t(null, function(t) {
                    return t * t }, function(t) {
                    return -t * (t - 2) }, function(t) {
                    return (t *= 2) < 1 ? .5 * t * t : -.5 * (--t * (t - 2) - 1) }),
                n = t(null, function(t) {
                    return t * t * t }, function(t) {
                    return --t * t * t + 1 }, function(t) {
                    return (t *= 2) < 1 ? .5 * t * t * t : .5 * ((t -= 2) * t * t + 2) }),
                r = t(null, function(t) {
                    return t * t * t * t }, function(t) {
                    return -(--t * t * t * t - 1) }, function(t) {
                    return (t *= 2) < 1 ? .5 * t * t * t * t : -.5 * ((t -= 2) * t * t * t - 2) }),
                a = t(null, function(t) {
                    return t * t * t * t * t }, function(t) {
                    return (t -= 1) * t * t * t * t + 1 }, function(t) {
                    return (t *= 2) < 1 ? .5 * t * t * t * t * t : .5 * ((t -= 2) * t * t * t * t + 2) }),
                s = Math,
                o = s.PI,
                h = .5 * o,
                l = s.sin,
                c = s.cos,
                u = s.pow,
                d = s.sqrt,
                f = t(null, function(t) {
                    return -c(t * h) + 1 }, function(t) {
                    return l(t * h) }, function(t) {
                    return -.5 * (c(o * t) - 1) }),
                p = t(null, function(t) {
                    return 0 == t ? 0 : u(2, 10 * (t - 1)) }, function(t) {
                    return 1 == t ? 1 : -u(2, -10 * t) + 1 }, function(t) {
                    return 0 == t || 1 == t ? t : (t *= 2) < 1 ? .5 * u(2, 10 * (t - 1)) : .5 * (-u(2, -10 * (t - 1)) + 2) }),
                v = t(null, function(t) {
                    return -(d(1 - t * t) - 1) }, function(t) {
                    return d(1 - --t * t) }, function(t) {
                    return (t /= .5) < 1 ? -.5 * (d(1 - t * t) - 1) : .5 * (d(1 - (t -= 2) * t) + 1) }),
                m = t({ a: 1, p: .4, s: .1, config: function(t, e) { m.a = t, m.p = e, m.s = e / (2 * o) * Math.asin(1 / t) || 0 } }, function(t) {
                    return -(m.a * u(2, 10 * (t -= 1)) * l((t - m.s) * (2 * o) / m.p)) }, function(t) {
                    return m.a * u(2, -10 * t) * l((t - m.s) * (2 * o) / m.p) + 1 }, function(t) {
                    return (t *= 2) < 1 ? -.5 * (m.a * u(2, 10 * (t -= 1)) * l((t - m.s) * (2 * o) / m.p)) : m.a * u(2, -10 * (t -= 1)) * l((t - m.s) * (2 * o) / m.p) * .5 + 1 }),
                g = t({ o: 1.70158, s: 2.59491, config: function(t) { g.o = t, g.s = 1.525 * t } }, function(t) {
                    return t * t * ((g.o + 1) * t - g.o) }, function(t) {
                    return (t -= 1) * t * ((g.o + 1) * t + g.o) + 1 }, function(t) {
                    return (t *= 2) < 1 ? .5 * (t * t * ((g.s + 1) * t - g.s)) : .5 * ((t -= 2) * t * ((g.s + 1) * t + g.s) + 2) }),
                _ = t(null, function(t) {
                    return 1 - _.EaseOut(1 - t) }, function(t) {
                    return (t /= 1) < .36364 ? 7.5625 * t * t : .72727 > t ? 7.5625 * (t -= .54545) * t + .75 : .90909 > t ? 7.5625 * (t -= .81818) * t + .9375 : 7.5625 * (t -= .95455) * t + .984375 }, function(t) {
                    return .5 > t ? .5 * _.EaseIn(2 * t) : .5 * _.EaseOut(2 * t - 1) + .5 });
            return { Linear: e, Quad: i, Cubic: n, Quart: r, Quint: a, Sine: f, Expo: p, Circ: v, Elastic: m, Back: g, Bounce: _ } }();
    e.Ease = i }(window),
function(t) {
    var e = t.Hilo,
        i = e.Class,
        n = i.create({ load: function(t) {
                var e = this,
                    i = new Image;
                t.crossOrigin && (i.crossOrigin = t.crossOrigin), i.onload = function() { e.onLoad(i) }, i.onerror = i.onabort = e.onError.bind(i), i.src = t.src + (t.noCache ? (-1 == t.src.indexOf("?") ? "?" : "&") + "t=" + +new Date : "") }, onLoad: function(e) { e = e || t.event;
                var i = e;
                return i.onload = i.onerror = i.onabort = null, i }, onError: function(t) {
                var e = t.target;
                return e.onload = e.onerror = e.onabort = null, t } });
    e.ImageLoader = n }(window),
function(t) {
    var e = t.Hilo,
        i = e.Class,
        n = i.create({ load: function(e) {
                var i = this,
                    r = e.src,
                    a = "jsonp" == e.type;
                if (a) {
                    var s = e.callbackName || "callback",
                        o = e.callback || "jsonp" + ++n._count,
                        h = t;
                    h[o] || (h[o] = function(t) { delete h[o] }) }
                a && (r += (-1 == r.indexOf("?") ? "?" : "&") + s + "=" + o), e.noCache && (r += (-1 == r.indexOf("?") ? "?" : "&") + "t=" + +new Date);
                var l = document.createElement("script");
                l.type = "text/javascript", l.async = !0, l.onload = i.onLoad.bind(i), l.onerror = i.onError.bind(i), l.src = r, e.id && (l.id = e.id), document.getElementsByTagName("head")[0].appendChild(l) }, onLoad: function(t) {
                var e = t.target;
                return e.onload = e.onerror = null, e }, onError: function(t) {
                var e = t.target;
                return e.onload = e.onerror = null, t }, Statics: { _count: 0 } });
    e.ScriptLoader = n }(window),
function(t) {
    function e(t) {
        var e, i, n = /\/?[^\/]+\.(\w+)(\?\S+)?$/i;
        return (e = t.match(n)) && (i = e[1].toLowerCase()), i || null }
    var i = t.Hilo,
        n = i.Class,
        r = i.EventMixin,
        a = i.ImageLoader,
        s = i.ScriptLoader,
        o = n.create({ Mixes: r, constructor: function(t) { this._source = [], this.add(t) }, maxConnections: 2, _source: null, _loaded: 0, _connections: 0, _currentIndex: -1, add: function(t) {
                var e = this;
                return t && (t = t instanceof Array ? t : [t], e._source = e._source.concat(t)), e }, get: function(t) {
                if (t)
                    for (var e = this._source, i = 0; i < e.length; i++) {
                        var n = e[i];
                        if (n.id === t || n.src === t) return n }
                return null }, getContent: function(t) {
                var e = this.get(t);
                return e && e.content }, start: function() {
                var t = this;
                return t._loadNext(), t }, _loadNext: function() {
                var t = this,
                    e = t._source,
                    i = e.length;
                if (t._loaded >= i) return void t.fire("complete");
                if (t._currentIndex < i - 1 && t._connections < t.maxConnections) {
                    var n = ++t._currentIndex,
                        r = e[n],
                        a = t._getLoader(r);
                    if (a) {
                        var s = a.onLoad,
                            o = a.onError;
                        a.onLoad = function(e) { a.onLoad = s, a.onError = o;
                            var i = s && s.call(a, e) || e.target;
                            t._onItemLoad(n, i) }, a.onError = function(e) { a.onLoad = s, a.onError = o, o && o.call(a, e), t._onItemError(n, e) }, t._connections++ }
                    t._loadNext(), a && a.load(r) } }, _getLoader: function(t) {
                var i = t.loader;
                if (i) return i;
                var n = t.type || e(t.src);
                switch (n) {
                    case "png":
                    case "jpg":
                    case "jpeg":
                    case "gif":
                        i = new a;
                        break;
                    case "js":
                    case "jsonp":
                        i = new s }
                return i }, _onItemLoad: function(t, e) {
                var i = this,
                    n = i._source[t];
                n.loaded = !0, n.content = e, i._connections--, i._loaded++, i.fire("load", n), i._loadNext() }, _onItemError: function(t, e) {
                var i = this,
                    n = i._source[t];
                n.error = e, i._connections--, i._loaded++, i.fire("error", n), i._loadNext() }, getSize: function(t) {
                for (var e = 0, i = this._source, n = 0; n < i.length; n++) {
                    var r = i[n];
                    e += (t ? r.loaded && r.size : r.size) || 0 }
                return e }, getLoaded: function() {
                return this._loaded }, getTotal: function() {
                return this._source.length } });
    i.LoadQueue = o }(window),
function(t) {
    var e = t.Hilo,
        i = e.Class,
        n = e.EventMixin,
        r = i.create({ Mixes: n, constructor: function(t) { e.copy(this, t, !0), this._onAudioEvent = this._onAudioEvent.bind(this) }, src: null, loop: !1, autoPlay: !1, loaded: !1, playing: !1, duration: 0, volume: 1, muted: !1, _element: null, load: function() {
                if (!this._element) try {
                    var t = this._element = new Audio;
                    t.addEventListener("canplaythrough", this._onAudioEvent, !1), t.addEventListener("ended", this._onAudioEvent, !1), t.addEventListener("error", this._onAudioEvent, !1), t.src = this.src, t.volume = this.volume, t.load() } catch (e) {
                    var t = this._element = {};
                    t.play = t.pause = function() {} }
                return this }, _onAudioEvent: function(t) {
                var e = t.type;
                switch (e) {
                    case "canplaythrough":
                        t.target.removeEventListener(e, this._onAudioEvent), this.loaded = !0, this.duration = this._element.duration, this.fire("load"), this.autoPlay && this._doPlay();
                        break;
                    case "ended":
                        this.playing = !1, this.fire("end"), this.loop && this._doPlay();
                        break;
                    case "error":
                        this.fire("error") } }, _doPlay: function() { this.playing || (this._element.volume = this.muted ? 0 : this.volume, this._element.play(), this.playing = !0) }, play: function() {
                return this.playing && this.stop(), this._element ? this.loaded && this._doPlay() : (this.autoPlay = !0, this.load()), this }, pause: function() {
                return this.playing && (this._element.pause(), this.playing = !1), this }, resume: function() {
                return this.playing || this._doPlay(), this }, stop: function() {
                return this.playing && (this._element.pause(), this._element.currentTime = 0, this.playing = !1), this }, setVolume: function(t) {
                return this.volume != t && (this.volume = t, this._element.volume = t), this }, setMute: function(t) {
                return this.muted != t && (this.muted = t, this._element.volume = t ? 0 : this.volume), this }, Statics: { isSupported: null !== t.Audio } });
    e.HTMLAudio = r }(window),
function(t) {
    var e = t.Hilo,
        i = e.Class,
        n = e.EventMixin,
        r = function() {
            var r = t.AudioContext || t.webkitAudioContext,
                a = r ? new r : null;
            return i.create({ Mixes: n, constructor: function(t) { e.copy(this, t, !0), this._init() }, src: null, loop: !1, autoPlay: !1, loaded: !1, playing: !1, duration: 0, volume: 1, muted: !1, _context: null, _gainNode: null, _buffer: null, _audioNode: null, _startTime: 0, _offset: 0, _init: function() { this._context = a, this._gainNode = a.createGain ? a.createGain() : a.createGainNode(), this._gainNode.connect(a.destination), this._onAudioEvent = this._onAudioEvent.bind(this), this._onDecodeComplete = this._onDecodeComplete.bind(this), this._onDecodeError = this._onDecodeError.bind(this) }, load: function() {
                    if (!this._buffer) {
                        var t = new XMLHttpRequest;
                        t.src = this.src, t.open("GET", this.src, !0), t.responseType = "arraybuffer", t.onload = this._onAudioEvent, t.onprogress = this._onAudioEvent, t.onerror = this._onAudioEvent, t.send(), this._buffer = !0 }
                    return this }, _onAudioEvent: function(t) {
                    var e = t.type;
                    switch (e) {
                        case "load":
                            var i = t.target;
                            i.onload = i.onprogress = i.onerror = null, this._context.decodeAudioData(i.response, this._onDecodeComplete, this._onDecodeError), i = null;
                            break;
                        case "ended":
                            this.playing = !1, this.fire("end"), this.loop && this._doPlay();
                            break;
                        case "progress":
                            this.fire(t);
                            break;
                        case "error":
                            this.fire(t) } }, _onDecodeComplete: function(t) { this._buffer = t, this.loaded = !0, this.duration = t.duration, this.fire("load"), this.autoPlay && this._doPlay() }, _onDecodeError: function() { this.fire("error") }, _doPlay: function() { this._clearAudioNode();
                    var t = this._context.createBufferSource();
                    t.start || (t.start = t.noteOn, t.stop = t.noteOff), t.buffer = this._buffer, t.onended = this._onAudioEvent, this._gainNode.gain.value = this.muted ? 0 : this.volume, t.connect(this._gainNode), t.start(0, this._offset), this._audioNode = t, this._startTime = this._context.currentTime, this.playing = !0 }, _clearAudioNode: function() {
                    var t = this._audioNode;
                    t && (t.onended = null, t.disconnect(0), this._audioNode = null) }, play: function() {
                    return this.playing && this.stop(), this.loaded ? this._doPlay() : this._buffer || (this.autoPlay = !0, this.load()), this }, pause: function() {
                    return this.playing && (this._audioNode.stop(0), this._offset += this._context.currentTime - this._startTime, this.playing = !1), this }, resume: function() {
                    return this.playing || this._doPlay(), this }, stop: function() {
                    return this.playing && (this._audioNode.stop(0), this._audioNode.disconnect(), this._offset = 0, this.playing = !1), this }, setVolume: function(t) {
                    return this.volume != t && (this.volume = t, this._gainNode.gain.value = t), this }, setMute: function(t) {
                    return this.muted != t && (this.muted = t, this._gainNode.gain.value = t ? 0 : this.volume), this }, Statics: { isSupported: null != r, enabled: !1, enable: function() {
                        if (!this.enabled && a) {
                            var t = a.createBufferSource();
                            return t.buffer = a.createBuffer(1, 1, 22050), t.connect(a.destination), t.start ? t.start(0, 0, 0) : t.noteOn(0, 0, 0), this.enabled = !0, !0 }
                        return this.enabled } } }) }();
    e.WebAudio = r }(window),
function(t) {
    var e = t.Hilo,
        i = e.HTMLAudio,
        n = e.WebAudio,
        r = { _audios: {}, enableAudio: function() { n.isSupported && n.enable() }, getAudio: function(t) { t = this._normalizeSource(t);
                var e = this._audios[t.src];
                return e || (n.isSupported ? e = new n(t) : i.isSupported && (e = new i(t)), this._audios[t.src] = e), e }, removeAudio: function(t) {
                var e = "string" == typeof t ? t : t.src,
                    i = this._audios[e];
                i && (i.stop(), i.off(), this._audios[e] = null, delete this._audios[e]) }, _normalizeSource: function(t) {
                var i = {};
                return "string" == typeof t ? i = { src: t } : e.copy(i, t), i } };
    e.WebSound = r }(window),
function(t) {
    var e = t.Hilo,
        i = e.Class,
        n = i.create({ constructor: function(t) { this.width = 0, this.height = 0, this.target = null, this.deadzone = null, this.bounds = null, this.scroll = { x: 0, y: 0 }, e.copy(this, t) }, tick: function(t) {
                var e = this.target,
                    i = this.scroll,
                    n = this.bounds,
                    r = this.deadzone;
                if (e) {
                    var a, s;
                    r ? (a = Math.min(Math.max(e.x - i.x, r[0]), r[0] + r[2]), s = Math.min(Math.max(e.y - i.y, r[1]), r[1] + r[3])) : (a = .5 * this.width, s = .5 * this.height), i.x = e.x - a, i.y = e.y - s, n && (i.x = Math.min(Math.max(i.x, n[0]), n[0] + n[2]), i.y = Math.min(Math.max(i.y, n[1]), n[1] + n[3])) } else i.x = 0, i.y = 0 }, follow: function(t, e) { this.target = t, void 0 !== e && (this.deadzone = e), this.tick() } });
    e.Camera = n }(window),
function(t) {
    var e = t.Hilo,
        i = e.Class,
        n = function() {
            function t(t, e, i, n, r) {
                return { x: t, y: e * n - i * r, z: e * r + i * n } }

            function n(t, e, i, n, r) {
                return { x: t * n - i * r, y: e, z: t * r + i * n } }

            function r(t, e, i, n, r) {
                return { x: t * n - e * r, y: t * r + e * n, z: i } }
            var a = Math.PI / 180,
                s = i.create({ constructor: function(t) { t.x = t.x || 0, t.y = t.y || 0, t.z = t.z || 0, t.rotationX = t.rotationX || 0, t.rotationY = t.rotationY || 0, t.rotationZ = t.rotationZ || 0, e.copy(this, t) }, translate: function(t, e, i) { this.tx = t, this.ty = e, this.tz = i }, rotateX: function(t) { this.rotationX = t }, rotateY: function(t) { this.rotationY = t }, rotateZ: function(t) { this.rotationZ = t }, project: function(e, i) {
                        var s = this.rotationX * a,
                            o = this.rotationY * a,
                            h = this.rotationZ * a,
                            l = Math.cos(s),
                            c = Math.sin(s),
                            u = Math.cos(o),
                            d = Math.sin(o),
                            f = Math.cos(h),
                            p = Math.sin(h),
                            v = e.x - this.x,
                            m = e.y - this.y,
                            g = e.z - this.z,
                            _ = r(v, m, g, f, p);
                        _ = n(_.x, _.y, _.z, u, d), _ = t(_.x, _.y, _.z, l, c), this.tx && (_.x -= this.tx), this.ty && (_.y -= this.ty), this.tz && (_.z -= this.tz);
                        var x = this.fv / (this.fv + _.z),
                            y = _.x * x,
                            w = -_.y * x;
                        return i ? (i.x = y + this.fx, i.y = w + this.fy, i.z = -_.z, i.scaleX = x, i.scaleY = x, void 0) : { x: y + this.fx, y: w + this.fy, z: -_.z, scale: x } }, sortZ: function() { this.stage.children.sort(function(t, e) {
                            return t.z > e.z }) }, tick: function() { this.sortZ() } });
            return s }();
    e.Camera3d = n }(window),
function(t) {
    var e = t.Hilo,
        i = e.Class,
        n = e.View,
        r = e.Container,
        a = (e.Bitmap, e.Drawable),
        s = function() {
            function t(t, e) {
                return e ? t + 2 * (Math.random() - .5) * e : t }
            for (var s = ["x", "y", "vx", "vy", "ax", "ay", "rotation", "rotationV", "scale", "scaleV", "alpha", "alphaV", "life"], o = [], h = 0, l = s.length; l > h; h++) {
                var c = s[h];
                o.push(c), o.push(c + "Var") }
            var u = { x: 0, y: 0, vx: 0, vy: 0, ax: 0, ay: 0, scale: 1, scaleV: 0, alpha: 1, alphaV: 0, rotation: 0, rotationV: 0, life: 1 },
                d = [],
                f = i.create({ Extends: r, constructor: function v(t) { this.id = this.id || t.id || e.getUid("ParticleSystem"), this.emitterX = 0, this.emitterY = 0, this.gx = 0, this.gy = 0, this.totalTime = 1 / 0, this.emitNum = 10, this.emitNumVar = 0, this.emitTime = .2, this.emitTimeVar = 0, this.particle = {}, v.superclass.constructor.call(this, t), this.reset(t) }, Statics: { PROPS: o, PROPS_DEFAULT: u, diedParticles: d }, reset: function(t) { e.copy(this, t), this.particle.system = this, this.totalTime <= 0 && (this.totalTime = 1 / 0) }, onUpdate: function(e) { e *= .001, this._isRun && (this._totalRunTime += e, this._currentRunTime += e, this._currentRunTime >= this._emitTime && (this._currentRunTime = 0, this._emitTime = t(this.emitTime, this.emitTimeVar), this._emit()), this._totalRunTime >= this.totalTime && this.stop()) }, _emit: function() {
                        for (var e = t(this.emitNum, this.emitNumVar) >> 0, i = 0; e > i; i++) this.addChild(p.create(this.particle)) }, start: function() { this.stop(!0), this._currentRunTime = 0, this._totalRunTime = 0, this._isRun = !0, this._emitTime = t(this.emitTime, this.emitTimeVar) }, stop: function(t) {
                        if (this.isRun = !1, t)
                            for (var e = this.children.length - 1; e >= 0; e--) this.children[e].destroy() } }),
                p = i.create({
                    Extends: n,
                    constructor: function m(t) { this.id = this.id || t.id || e.getUid("Particle"), m.superclass.constructor.call(this, t), this.init(t) },
                    onUpdate: function(t) {
                        if (t *= .001, !this._died) {
                            var e = this.ax + this.system.gx,
                                i = this.ay + this.system.gy;
                            this.vx += e * t, this.vy += i * t, this.x += this.vx * t, this.y += this.vy * t, this.rotation += this.rotationV, this._time > .1 && (this.alpha += this.alphaV),
                                this.scale += this.scaleV, this.scaleX = this.scaleY = this.scale, this._time += t, (this._time >= this.life || this.alpha < 0) && this.destroy()
                        }
                    },
                    setImage: function(t, e) { this.drawable = this.drawable || new a;
                        var e = e || [0, 0, t.width, t.height];
                        this.width = e[2], this.height = e[3], this.drawable.rect = e, this.drawable.image = t },
                    destroy: function() { this.died = !0, this.removeFromParent(), d.push(this) },
                    init: function(e) { this.system = e.system, this._died = !1, this._time = 0, this.alpha = 1;
                        for (var i = 0, n = o.length; n > i; i++) {
                            var r = o[i],
                                a = void 0 === e[r] ? u[r] : e[r];
                            this[r] = t(a, e[r + "Var"]) }
                        if (this.x += this.system.emitterX, this.y += this.system.emitterY, e.image) {
                            var s = e.frame;
                            s && s[0].length && (s = s[Math.random() * s.length >> 0]), this.setImage(e.image, s), void 0 !== e.pivotX && (this.pivotX = e.pivotX * s[2]), void 0 !== e.pivotY && (this.pivotY = e.pivotY * s[3]) } },
                    Statics: { create: function(t) {
                            if (d.length > 0) {
                                var e = d.pop();
                                return e.init(t), e }
                            return new p(t) } }
                });
            return f
        }();
    e.ParticleSystem = s
    module.exports=e;
}(window);
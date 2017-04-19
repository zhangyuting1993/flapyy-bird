webpackJsonp([0],[
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/bg.png";

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {


var Asset=__webpack_require__(9);
var Bird=__webpack_require__(10);
var Holdbacks=__webpack_require__(11);
var OverScene=__webpack_require__(12);
var ReadyScene=__webpack_require__(13);

var img1=__webpack_require__(0);



(function(){

window.onload = function(){
    game.init();
}

var game = {
    width: 0,
    height: 0,

    asset: null,
    stage: null,
    ticker: null,
    state: null,
    score: 0,

    bg: null,
    ground: null,
    bird: null,
    holdbacks: null,
    gameReadyScene: null,
    gameOverScene: null,

    init: function(){
        this.asset = new Asset();
        this.asset.on('complete', function(e){
            this.asset.off('complete');
            this.initStage();
        }.bind(this));
        this.asset.load();
    },

    initStage: function(){
        this.width = 720;
        this.height = 1280;
        this.scale = 0.5;

        //舞台
        this.stage = new Hilo.Stage({
            renderType:'canvas',
            width: this.width,
            height: this.height,
            scaleX: this.scale,
            scaleY: this.scale
        });
        document.body.appendChild(this.stage.canvas);

        //启动计时器
        this.ticker = new Hilo.Ticker(60);
        this.ticker.addTick(Hilo.Tween);
        this.ticker.addTick(this.stage);
        this.ticker.start();

        //绑定交互事件
        this.stage.enableDOMEvent(Hilo.event.POINTER_START, true);
        this.stage.on(Hilo.event.POINTER_START, this.onUserInput.bind(this));

        //Space键控制
        document.addEventListener('keydown', function(e){
            if(e.keyCode === 32) this.onUserInput(e);
        }.bind(this));

      

        //初始化
        this.initBackground();
        this.initScenes();
        this.initHoldbacks();
        this.initBird();
        this.initCurrentScore();

          //舞台更新
        this.stage.onUpdate = this.onUpdate.bind(this);

        //准备游戏
        this.gameReady();
    },

    initBackground: function(){
        //背景
        var bgWidth = this.width * this.scale;
        var bgHeight = this.height * this.scale;
        document.body.insertBefore(Hilo.createElement('div', {
            id: 'bg',
            style: {
                background: 'url('+img1+') no-repeat',
                backgroundSize: bgWidth + 'px, ' + bgHeight + 'px',
                position: 'absolute',
                width: bgWidth + 'px',
                height: bgHeight + 'px'
            }
        }), this.stage.canvas);

        //地面
        this.ground = new Hilo.Bitmap({
            id: 'ground',
            image: this.asset.ground
        }).addTo(this.stage);

        //设置地面的y轴坐标
        this.ground.y = this.height - this.ground.height;

        //移动地面
        Hilo.Tween.to(this.ground, {x:-60}, {duration:300, loop:true});
    },

    initCurrentScore: function(){
        //当前分数
        this.currentScore = new Hilo.BitmapText({
            id: 'score',
            glyphs: this.asset.numberGlyphs,
            text: 0
        }).addTo(this.stage);

        //设置当前分数的位置
        this.currentScore.x = this.width - this.currentScore.width >> 1;
        this.currentScore.y = 180;
    },

    initBird: function(){
        this.bird = new Bird({
            id: 'bird',
            atlas: this.asset.birdAtlas,
            startX: 100,
            startY: this.height >> 1,
            groundY: this.ground.y - 12
        }).addTo(this.stage, this.ground.depth - 1);
    },

    initHoldbacks: function(){
        this.holdbacks = new Holdbacks({
            id: 'holdbacks',
            image: this.asset.holdback,
            height: this.height,
            startX: this.width * 2,
            groundY: this.ground.y
        }).addTo(this.stage, this.ground.depth - 1);
    },

    initScenes: function(){
        //准备场景
        this.gameReadyScene = new ReadyScene({
            width: this.width,
            height: this.height,
            image: this.asset.ready
        }).addTo(this.stage);

        //结束场景
        this.gameOverScene = new OverScene({
            width: this.width,
            height: this.height,
            image: this.asset.over,
            numberGlyphs: this.asset.numberGlyphs,
            visible: false
        }).addTo(this.stage);

        //绑定开始按钮事件
        this.gameOverScene.getChildById('start').on(Hilo.event.POINTER_START, function(e){
            e._stopped = true;
            this.gameOverScene.visible = false;
            this.gameReady();
        }.bind(this));
    },

    onUserInput: function(e){
        if(this.state !== 'over'){
            //启动游戏场景
            if(this.state !== 'playing') this.gameStart();
            //控制小鸟往上飞
            this.bird.startFly();
        }
    },

    onUpdate: function(delta){
        if(this.state === 'ready'){
            return;
        }

        if(this.bird.isDead){
            this.gameOver();
        }else{
            this.currentScore.setText(this.calcScore());
            //碰撞检测
            if(this.holdbacks.checkCollision(this.bird)){
                this.gameOver();
            }
        }
    },

    gameReady: function(){
        this.state = 'ready';
        this.score = 0;
        this.currentScore.visible = true;
        this.currentScore.setText(this.score);
        this.gameReadyScene.visible = true;
        this.holdbacks.reset();
        this.bird.getReady();
    },

    gameStart: function(){
        this.state = 'playing';
        this.gameReadyScene.visible = false;
        this.holdbacks.startMove();
    },

    gameOver: function(){
        if(this.state !== 'over'){
            //设置当前状态为结束over
            this.state = 'over';
            //停止障碍的移动
            this.holdbacks.stopMove();
            //小鸟跳转到第一帧并暂停
            this.bird.goto(0, true);
            //隐藏屏幕中间显示的分数
            this.currentScore.visible = false;
            //显示结束场景
            this.gameOverScene.show(this.calcScore(), this.saveBestScore());
        }
    },

    calcScore: function(){
        var count = this.holdbacks.calcPassThrough(this.bird.x);
        return this.score = count;
    },

    saveBestScore: function(){
        var score = this.score, best = 0;
        if(Hilo.browser.supportStorage){
            best = parseInt(localStorage.getItem('hilo-flappy-best-score')) || 0;
        }
        if(score > best){
            best = score;
            localStorage.setItem('hilo-flappy-best-score', score);
        }
        return best;
    }
};

})();

/***/ }),
/* 2 */,
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/bird.png";

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/ground.png";

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/holdback.png";

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/number.png";

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/over.png";

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/ready.png";

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var img2=__webpack_require__(0);
var img3=__webpack_require__(4);
var img4=__webpack_require__(8);
var img5=__webpack_require__(7);
var img6=__webpack_require__(6);
var img7=__webpack_require__(3);
var img8=__webpack_require__(5);



var Asset = Hilo.Class.create({
    Mixes: Hilo.EventMixin,

    queue: null,
    bg: null,
    ground: null,
    ready: null,
    over: null,
    numberGlyphs: null,
    birdAtlas: null,
    holdback: null,

    load: function(){
        var resources = [
            {id:'bg', src:img2},
            {id:'ground', src:img3},
            {id:'ready', src:img4},
            {id:'over', src:img5},
            {id:'number', src:img6},
            {id:'bird', src:img7},
            {id:'holdback', src:img8}
        ];

        this.queue = new Hilo.LoadQueue();
        this.queue.add(resources);
        this.queue.on('complete', this.onComplete.bind(this));
        this.queue.start();
    },

    onComplete: function(e){
        this.bg = this.queue.get('bg').content;
        this.ground = this.queue.get('ground').content;
        this.ready = this.queue.get('ready').content;
        this.over = this.queue.get('over').content;
        this.holdback = this.queue.get('holdback').content;

        this.birdAtlas = new Hilo.TextureAtlas({
            image: this.queue.get('bird').content,
            frames: [
                [0, 120, 86, 60], 
                [0, 60, 86, 60], 
                [0, 0, 86, 60]
            ],
            sprites: {
                bird: [0, 1, 2]
            }
        });

        var number = this.queue.get('number').content;
        this.numberGlyphs = {
            0: {image:number, rect:[0,0,60,91]},
            1: {image:number, rect:[61,0,60,91]},
            2: {image:number, rect:[121,0,60,91]},
            3: {image:number, rect:[191,0,60,91]},
            4: {image:number, rect:[261,0,60,91]},
            5: {image:number, rect:[331,0,60,91]},
            6: {image:number, rect:[401,0,60,91]},
            7: {image:number, rect:[471,0,60,91]},
            8: {image:number, rect:[541,0,60,91]},
            9: {image:number, rect:[611,0,60,91]}
        };

        this.queue.off('complete');
        this.fire('complete');
    }
});


module.exports=Asset;



/***/ }),
/* 10 */
/***/ (function(module, exports) {

var Bird  = Hilo.Class.create({
    Extends: Hilo.Sprite,
    constructor: function(properties){
        Bird.superclass.constructor.call(this, properties);

        this.addFrame(properties.atlas.getSprite('bird'));
        this.interval = 6;
        this.pivotX = 43;
        this.pivotY = 30;

        this.gravity = 10 / 1000 * 0.3;
        this.flyHeight = 80;
        this.initVelocity = Math.sqrt(2 * this.flyHeight * this.gravity);
    },

    startX: 0, //小鸟的起始x坐标
    startY: 0, //小鸟的起始y坐标
    groundY: 0, //地面的坐标
    gravity: 0, //重力加速度
    flyHeight: 0, //小鸟每次往上飞的高度
    initVelocity: 0, //小鸟往上飞的初速度

    isDead: true, //小鸟是否已死亡
    isUp: false, //小鸟是在往上飞阶段，还是下落阶段
    flyStartY: 0, //小鸟往上飞的起始y轴坐标
    flyStartTime: 0, //小鸟飞行起始时间

    getReady: function(){
        //设置起始坐标
        this.x = this.startX;
        this.y = this.startY;

        this.rotation = 0;
        this.interval = 6;
        this.play();
        this.tween = Hilo.Tween.to(this, {y:this.y + 10, rotation:-8}, {duration:400, reverse:true, loop:true});
    },

    startFly: function(){
        this.isDead = false;
        this.interval = 3;
        this.flyStartY = this.y;
        this.flyStartTime = +new Date();
        if(this.tween) this.tween.stop();
    },

    onUpdate: function(){
        if(this.isDead) return;

        //飞行时间
        var time = (+new Date()) - this.flyStartTime;
        //飞行距离
        var distance = this.initVelocity * time - 0.5 * this.gravity * time * time;
        //y轴坐标
        var y = this.flyStartY - distance;

        if(y <= this.groundY){
            //小鸟未落地
            this.y = y;
            if(distance > 0 && !this.isUp){
                //往上飞时，角度上仰20度
                this.tween = Hilo.Tween.to(this, {rotation:-20}, {duration:200});
                this.isUp = true;
            }else if(distance < 0 && this.isUp){
                //往下跌落时，角度往下90度
                this.tween = Hilo.Tween.to(this, {rotation:90}, {duration:this.groundY - this.y});
                this.isUp = false;
            }
        }else{
            //小鸟已经落地，即死亡
            this.y = this.groundY;
            this.isDead = true;
        }
    }
});

module.exports=Bird;

/***/ }),
/* 11 */
/***/ (function(module, exports) {


var Holdbacks = Hilo.Class.create({
    Extends: Hilo.Container,
    constructor: function(properties){
        Holdbacks.superclass.constructor.call(this, properties);

        //管子之间的水平间隔
        this.hoseSpacingX = 300;
        //上下管子之间的垂直间隔，即小鸟要穿越的空间大小
        this.hoseSpacingY = 240;
        //管子的总数（上下一对管子算一个）
        this.numHoses = 4;
        //移出屏幕左侧的管子数量，一般设置为管子总数的一半
        this.numOffscreenHoses = this.numHoses * 0.5;
        //管子的宽度（包括管子之间的间隔）
        this.hoseWidth = 148 + this.hoseSpacingX;

        //初始化障碍的宽和高
        this.width = this.hoseWidth * this.numHoses;
        this.height = properties.height;

        this.reset();
        this.createHoses(properties.image);
        this.moveTween = new Hilo.Tween(this, null, {
            onComplete: this.resetHoses.bind(this)
        });
    },

    startX: 0, //障碍开始的起始x轴坐标
    groundY: 0, //地面的y轴坐标

    hoseSpacingX: 0, //管子之间的水平间隔
    hoseSpacingY: 0, //上下管子之间的垂直间隔
    numHoses: 0, //管子的总数（上下一对管子算一个）
    numOffscreenHoses: 0, //移出屏幕左侧的管子数量
    hoseWidth: 0, //管子的宽度（包括管子之间的间隔）

    passThrough: 0, //穿过的管子的数量，也即移出屏幕左侧的管子的数量

    createHoses: function(image){
        for(var i = 0; i < this.numHoses; i++){
            var downHose = new Hilo.Bitmap({
                id: 'down' + i,
                image: image,
                rect: [0, 0, 148, 820],
                boundsArea:[
                    {x:8, y:0},
                    {x:140, y:0},
                    {x:140, y:60},
                    {x:136, y:60},
                    {x:136, y:820},
                    {x:14, y:820},
                    {x:14, y:60},
                    {x:8, y:60}
                ]
            }).addTo(this);

            var upHose = new Hilo.Bitmap({
                id: 'up' + i,
                image: image,
                rect: [148, 0, 148, 820],
                boundsArea:[
                    {x:14, y:0},
                    {x:140, y:0},
                    {x:140, y:820-60},
                    {x:144, y:820-60},
                    {x:144, y:820},
                    {x:8, y:820},
                    {x:8, y:820-60},
                    {x:14, y:820-60}
                ]
            }).addTo(this);

            this.placeHose(downHose, upHose, i);
        }
    },

    placeHose: function(down, up, index){
        //下面障碍在y轴的最上的位置
        var downMinY = this.groundY - down.height + this.hoseSpacingY;
        //下面障碍在y轴的最下的位置
        var downMaxY = this.groundY - 180;
        //在downMinY和downMaxY之间随机位置
        down.y = downMinY + (downMaxY - downMinY) * Math.random() >> 0;
        down.x = this.hoseWidth * index;

        up.y = down.y - this.hoseSpacingY - up.height;
        up.x = down.x;
    },

    resetHoses: function(){
        var total = this.children.length;

        //把已移出屏幕外的管子放到队列最后面，并重置它们的可穿越位置
        for(var i = 0; i < this.numOffscreenHoses; i++){
            var downHose = this.getChildAt(0);
            var upHose = this.getChildAt(1);
            this.setChildIndex(downHose, total - 1);
            this.setChildIndex(upHose, total - 1);
            this.placeHose(downHose, upHose, this.numOffscreenHoses + i);
        }

        //重新确定队列中所有管子的x轴坐标
        for(var i = 0; i < total - this.numOffscreenHoses * 2; i++){
            var hose = this.getChildAt(i);
            hose.x = this.hoseWidth * (i * 0.5 >> 0);
        }

        //重新确定障碍的x轴坐标
        this.x = 0;

        //更新穿过的管子数量
        this.passThrough += this.numOffscreenHoses;

        //继续移动
        this.startMove();
    },

    startMove: function(){
        //设置缓动的x轴坐标
        var targetX = -this.hoseWidth * this.numOffscreenHoses;
        Hilo.Tween._tweens.push(this.moveTween);
        //设置缓动时间
        this.moveTween.duration = (this.x - targetX) * 4;
        //设置缓动的变换属性，即x从当前坐标变换到targetX
        this.moveTween.setProps({x:this.x}, {x:targetX});
        //启动缓动动画
        this.moveTween.start();
    },

    stopMove: function(){
        if(this.moveTween) this.moveTween.pause();
    },

    checkCollision: function(bird){
        for(var i = 0, len = this.children.length; i < len; i++){
            if(bird.hitTestObject(this.children[i], true)){
                return true;
            }
        }
        return false;
    },

    calcPassThrough: function(x){
        var count = 0;

        x = -this.x + x;
        if(x > 0){
            var num = x / this.hoseWidth + 0.5 >> 0;
            count += num;
        }
        count += this.passThrough;

        return count;
    },

    reset: function(){
        this.x = this.startX;
        this.passThrough = 0;
    }

});

module.exports=Holdbacks;

/***/ }),
/* 12 */
/***/ (function(module, exports) {

var OverScene = Hilo.Class.create({
    Extends: Hilo.Container,
    constructor: function(properties){
        OverScene.superclass.constructor.call(this, properties);
        this.init(properties);
    },

    init: function(properties){
        var board = new Hilo.Bitmap({
            id: 'board',
            image: properties.image,
            rect: [0, 0, 590, 298]
        });

        var gameover = new Hilo.Bitmap({
            id: 'gameover',
            image: properties.image,
            rect: [0, 298, 508, 158]
        });

        var startBtn = new Hilo.Bitmap({
            id: 'start',
            image: properties.image,
            rect: [590, 0, 290, 176]
        });

        var gradeBtn = new Hilo.Bitmap({
            id: 'grade',
            image: properties.image,
            rect: [590, 176, 290, 176]
        });

        var scoreLabel = new Hilo.BitmapText({
            id: 'score',
            glyphs: properties.numberGlyphs,
            scaleX: 0.5,
            scaleY: 0.5,
            letterSpacing: 4,
            text: 0
        });

        var bestLabel = new Hilo.BitmapText({
            id: 'best',
            glyphs: properties.numberGlyphs,
            scaleX: 0.5,
            scaleY: 0.5,
            letterSpacing: 4,
            text: 0
        });

        var whiteMask = new Hilo.View({
            id: 'mask',
            width: this.width,
            height: this.height,
            alpha: 0.0,
            background:'#fff'
        });

        board.x = this.width - board.width >> 1;
        board.y = this.height - board.height >> 1;
        gameover.x = this.width - gameover.width >> 1;
        gameover.y = board.y - gameover.height - 20;
        startBtn.x = board.x - 5;
        startBtn.y = board.y + board.height + 20 >> 0;
        gradeBtn.x = startBtn.x + startBtn.width + 20 >> 0;
        gradeBtn.y = startBtn.y;
        scoreLabel.x = board.x + board.width - 140 >> 0;
        scoreLabel.y = board.y + 90;
        bestLabel.x = scoreLabel.x;
        bestLabel.y = scoreLabel.y + 105;

        this.addChild(gameover, board, startBtn, gradeBtn, scoreLabel, bestLabel, whiteMask);
    },

    show: function(score, bestScore){
        this.visible = true;
        this.getChildById('score').setText(score);
        this.getChildById('best').setText(bestScore);
        this.getChildById('mask').alpha = 1.0;

        Hilo.Tween.from(this.getChildById('gameover'), {alpha:0}, {duration:100});
        Hilo.Tween.from(this.getChildById('board'), {alpha:0, y:this.getChildById('board').y+150}, {duration:200, delay:200});
        Hilo.Tween.from(this.getChildById('score'), {alpha:0, y:this.getChildById('score').y+150}, {duration:200, delay:200});
        Hilo.Tween.from(this.getChildById('best'), {alpha:0, y:this.getChildById('best').y+150}, {duration:200, delay:200});
        Hilo.Tween.from(this.getChildById('start'), {alpha:0}, {duration:100, delay:600});
        Hilo.Tween.from(this.getChildById('grade'), {alpha:0}, {duration:100, delay:600});
        Hilo.Tween.to(this.getChildById('mask'), {alpha:0}, {duration:400});
    }
});
module.exports=OverScene;

/***/ }),
/* 13 */
/***/ (function(module, exports) {

//var Hilo=require('../lib/hilo-standalone.js');
var ReadyScene = Hilo.Class.create({
    Extends: Hilo.Container,
    constructor: function(properties){
        ReadyScene.superclass.constructor.call(this, properties);
        this.init(properties);
    },

    init: function(properties){
        //准备Get Ready!
        var getready = new Hilo.Bitmap({
            image: properties.image,
            rect: [0, 0, 508, 158]
        });

        //开始提示tap
        var tap = new Hilo.Bitmap({
            image: properties.image,
            rect: [0, 158, 286, 246]
        });
        
        //确定getready和tap的位置
        tap.x = this.width - tap.width >> 1;
        tap.y = this.height - tap.height + 40 >> 1;
        getready.x = this.width - getready.width >> 1;
        getready.y = tap.y - getready.height >> 0;

        this.addChild(tap, getready);
    }
});

module.exports=ReadyScene;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ })
],[14]);
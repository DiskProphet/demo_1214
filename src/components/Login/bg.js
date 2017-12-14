export default function() {
    var particlesArgs = {
        num: 200,
        color: '#fff',
        speed: 0.3,
        dist: 0.12,
        scrilWidth: 3,
        lineWidth: 1
    }
    var reg = /^[1-9]\d*\.\d*|0\.\d*[1-9]\d*$/;
    var particlesCanvas = document.getElementById('particlesCanvas');
    particlesCanvas.height = window.innerHeight - 30
    var points = new Array(particlesArgs.num);
    var particlesCanvas_width;
    var length = points.length;
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    var mouse_point = {
        x: -1,
        y: -1
    };
    //生成粒子的随机坐标
    for (let i = 0; i < length; i++) {
        points[i] = {
            x: Math.floor(Math.random() * particlesCanvas.width),
            y: Math.floor(Math.random() * particlesCanvas.height),
            move: Math.random() * 2 * Math.PI
        };
    }
    var throttle = function (fn, delay) {
        var timer = null;
        return function () {
            var context = this,
                particlesArgs = arguments;
            clearTimeout(timer);
            timer = setTimeout(function () {
                fn.apply(context, particlesArgs);
            }, delay);
        };
    };
    // 处理窗口缩放
    function resizeCanvas() {
        for (let i = 0; i < points.length; i++) {
            var p = points[i];
            p.x = (p.x / particlesCanvas.width) * document.body.clientWidth;
            p.y = (p.y / particlesCanvas.height) * document.body.clientHeight;
        }
        particlesCanvas.width = document.body.clientWidth;
        particlesCanvas.height = document.body.clientHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', throttle(resizeCanvas, 100), false);
    //粒子运动
    function pointMove(ps) {
        for (let i = 0; i < ps.length; i++) {
            var p = ps[i];
            p.x += particlesArgs.speed * Math.sin(p.move);
            p.y += particlesArgs.speed * Math.cos(p.move);
            if (p.x < 0 || p.x > particlesCanvas.width) {
                p.move = 2 * Math.PI - p.move;
            } else if (p.y > particlesCanvas.height || p.y < 0) {
                p.move = Math.PI - p.move;
            }
        }
    }
    //粒子间的连接线
    function theLineOfTwoPoints(p1, p2, cxt, d_connect) {
        var d = Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
        cxt.globalAlpha = (d_connect - d) / d_connect;
        if (d < d_connect) {
            cxt.moveTo(p1.x, p1.y);
            cxt.lineTo(p2.x, p2.y);
            cxt.stroke();
            cxt.lineWidth = particlesArgs.lineWidth;
        }
    }
    //鼠标事件
    function canvasMouseMove(e) {
        var position = particlesCanvas.getBoundingClientRect();
        var pos = {
            x: e.clientX,
            y: e.clientY
        }
        mouse_point = {
            x: pos.x,
            y: pos.y
        };
    }
    
    function canvasMouseOut() {
        mouse_point = {
            x: -1,
            y: -1
        };
    }
    particlesCanvas.addEventListener('mousemove', canvasMouseMove, false);
    particlesCanvas.addEventListener('mouseout', canvasMouseOut, false)
    //显示粒子的运动轨迹
    function show() {
        // 画出每一个粒子点
        var cxt = particlesCanvas.getContext('2d');
        cxt.fillStyle = particlesArgs.color;
        cxt.clearRect(0, 0, particlesCanvas.width, particlesCanvas.height);
        cxt.strokeStyle = particlesArgs.color;
        var d_connect = Math.max(particlesCanvas.width, particlesCanvas.height) * particlesArgs.dist;
        for (let i = 0; i < length; i++) {
            var p1 = points[i];
            cxt.globalAlpha = 1;
            cxt.beginPath();
            cxt.arc(p1.x, p1.y, particlesArgs.scrilWidth, 0, Math.PI * 2, true);
            cxt.closePath();
            cxt.fill();
            for (let j = i + 1; j < length; j++) {
                var p2 = points[j];
                theLineOfTwoPoints(p1, p2, cxt, d_connect);
            }
        }
        // 画出粒子与鼠标当前位置的连接线
        if (mouse_point.x >= 0) {
            for (let i = 0; i < length; i++) {
                theLineOfTwoPoints(mouse_point, points[i], cxt, d_connect);
            }
        }
        pointMove(points)
        requestAnimationFrame(show)
    }
    return show;
}

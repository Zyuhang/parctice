! function () {
    const gamebox = document.querySelector(".gamebox")
    const oEm = document.querySelector("em");

    let bgposition = 0;
    let bgtimer = setInterval(() => {
        bgposition += 2;
        gamebox.style.backgroundPosition = ` 0 ${bgposition}px `
    }, 1000 / 60)

    class Role {
        constructor(w, h, x, y, imgurl, boomurl) {
            this.w = w;
            this.h = h;
            this.x = x;
            this.y = y;
            this.imgurl = imgurl;
            this.boomurl = boomurl;
        }

        creatrole() {
            this.roleimg = document.createElement("img");
            this.roleimg.src = this.imgurl;
            this.roleimg.style.cssText = `width:${this.w}px;height:${this.h}px;position:absolute;left:${this.x}px;top:${this.y}px;`
            gamebox.appendChild(this.roleimg);
        }
    }

    class myplane extends Role {
        constructor(w, h, x, y, imgurl, boomurl) {
            super(w, h, x, y, imgurl, boomurl);
            this.creatrole();
            this.myplanemove();
            this.myplanebullet();
        }

        myplanemove() {
            let _this = this;
            let uptimer = null;
            let downtimer = null;
            let lefttimer = null;
            let righttimer = null;
            let uplock = true;
            let downlock = true;
            let leftlock = true;
            let rightlock = true;

            document.addEventListener("keydown", planemove, false);

            function planemove(ev) {
                var ev = ev || window.event;
                switch (ev.keyCode) {
                    case 87:
                        moveup();
                        break;
                    case 83:
                        movedown();
                        break;
                    case 65:
                        moveleft();
                        break;
                    case 68:
                        moveright();
                        break;
                }
            }

            function moveup() {
                if (uplock) {
                    uplock = false;
                    clearInterval(downtimer);
                    uptimer = setInterval(() => {
                        _this.y -= 4;
                        if (_this.y <= 0) {
                            _this.y = 0;
                        }
                        _this.roleimg.style.top = _this.y + "px";
                    }, 1000 / 60)
                }
            }

            function movedown() {
                if (downlock) {
                    downlock = false;
                    clearInterval(uptimer);
                    downtimer = setInterval(() => {
                        _this.y += 4;
                        if (_this.y >= gamebox.offsetHeight - _this.roleimg.offsetHeight) {
                            _this.y = gamebox.offsetHeight - _this.roleimg.offsetHeight;
                        }
                        _this.roleimg.style.top = _this.y + "px";
                    }, 1000 / 60)
                }
            }

            function moveleft() {
                if (leftlock) {
                    leftlock = false;
                    clearInterval(righttimer);
                    lefttimer = setInterval(() => {
                        _this.x -= 4;
                        if (_this.x <= 0) {
                            _this.x = 0;
                        }
                        _this.roleimg.style.left = _this.x + "px";
                    }, 1000 / 60)
                }
            }

            function moveright() {
                if (rightlock) {
                    rightlock = false;
                    clearInterval(lefttimer);
                    righttimer = setInterval(() => {
                        _this.x += 4;
                        if (_this.x >= gamebox.offsetWidth - _this.roleimg.offsetWidth) {
                            _this.x = gamebox.offsetWidth - _this.roleimg.offsetWidth;
                        }
                        _this.roleimg.style.left = _this.x + "px";
                    }, 1000 / 60)
                }
            }

            document.addEventListener("keyup", planeup);

            function planeup(ev) {
                var ev = ev || window.event;
                if (ev.keyCode === 87) {
                    clearInterval(uptimer);
                    uplock = true;
                }
                if (ev.keyCode === 83) {
                    clearInterval(downtimer);
                    downlock = true;
                }
                if (ev.keyCode === 65) {
                    clearInterval(lefttimer);
                    leftlock = true;
                }
                if (ev.keyCode === 68) {
                    clearInterval(righttimer);
                    rightlock = true;
                }
            }
        }

        myplanebullet() {
            let _this = this;
            let bullettimer = null;
            let bulletlock = true;

            document.addEventListener("keydown", planebullet);

            function planebullet(ev) {
                var ev = ev || window.event;
                if (ev.keyCode === 75) {
                    if (bulletlock) {
                        bulletlock = false;
                        function createbullet() {
                            new bullet(6, 14, _this.x + _this.w / 2 - 3, _this.y - 14, 'img/bullet.png');
                        }
                        bullettimer = setInterval(createbullet, 200);
                        createbullet();
                    }
                }
            }

            document.addEventListener("keyup", upbullet);

            function upbullet(ev) {
                var ev = ev || window.event;
                if (ev.keyCode === 75) {
                    clearInterval(bullettimer);
                    bulletlock = true;
                }
            }
        }

    }

    class bullet extends Role {
        constructor(w, h, x, y, imgurl) {
            super(w, h, x, y, imgurl);
            this.creatrole();
            this.bulletmove();
        }

        bulletmove() {
            this.timer = setInterval(() => {
                this.y -= 5;
                if (this.y === -this.h) {
                    clearInterval(this.timer);
                    gamebox.removeChild(this.roleimg);
                }
                this.roleimg.style.top = this.y + "px";
            }, 1000 / 60)
        }
    }


    class enemyplane extends Role{
        constructor(w, h, x, y, imgurl, boomurl,blood,score,speed){
            super(w, h, x, y, imgurl, boomurl,blood,score,speed);
            this.blood = blood;
            this.score = score;
            this.speed = speed;
            this.creatrole();

        }
    }


    let enemytimer = setInterval(()=>{
        let num = randnum(1,20);
    })



    function randnum(min, max) {
        return Math.round(Math.random() * (max - min)) + min
    }


    new myplane(66, 80, (gamebox.offsetWidth - 66) / 2, gamebox.offsetHeight - 80, "img/myplane.gif", "img/myplaneBoom.gif");
}() 
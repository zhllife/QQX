var UiplayPage = pc.createScript('uiplayPage');
UiplayPage.attributes.add('h_speed',{type:'number',default:1});
UiplayPage.attributes.add('w_speed',{type:'number',default:1});

// initialize code called once per entity
UiplayPage.prototype.initialize = function() {
    
    this.gm = this.app.root.findByName("GameManager").script.gameManager;
    
    this.uiplayer_1 = this.entity.children[0].children[0].script.uiplayer;
    this.uiplayer_2 = this.entity.children[0].children[1].script.uiplayer;
    
    this.arrow1 = this.entity.children[0].children[3].children[0];
    this.arrow2 = this.entity.children[0].children[3].children[1].children[0];
    this.arrow3 = this.entity.children[0].children[3].children[2].children[0];
    
    this.timeStr = this.entity.children[0].children[2];
    this.tipImage = this.entity.children[0].children[3];
    
    this.dragBeginTime = 0;
    var touch = this.app.touch;
    if (touch) {
        touch.on(pc.EVENT_TOUCHSTART, this.onTouchStart, this);
        touch.on(pc.EVENT_TOUCHMOVE, this.onTouchMove, this);
        touch.on(pc.EVENT_TOUCHEND, this.onTouchEnd, this);
        touch.on(pc.EVENT_TOUCHCANCEL, this.onTouchCancel, this);
    }
    
    this.timeLimitPInt = 0;
    this.timeLimitP = 0;
    this.beginCutTime = false;
    
    this.x_pow = 0;
    this.y_pow = 0;
    this.angle_pow = 0;
    this.upDown = false;
    this.leftRight = false;
};

UiplayPage.prototype.init = function()
{
    console.log("this.gm.p_nickname:"+this.gm.p_nickname);
    console.log("this.gm.opNickName:"+this.gm.opNickName);
    this.uiplayer_1.SetName(this.gm.p_nickname);
    this.uiplayer_2.SetName(this.gm.opNickName);
    if(this.gm.playerPos === 0)
    {
        window._UIData(UIData.SetPlayInfo,this.gm.p_nickname,this.gm.opNickName,this.gm.p_headimgurl,this.gm.opHeadImgUrl,this.gm.playerPos);
    }else
    {
        window._UIData(UIData.SetPlayInfo,this.gm.opNickName,this.gm.p_nickname,this.gm.opHeadImgUrl,this.gm.p_headimgurl,this.gm.playerPos);
    }
    
};

// update code called every frame
UiplayPage.prototype.UpdateData = function(score_1,score_2) {
    this.uiplayer_1.SetScore(score_1);
    this.uiplayer_2.SetScore(score_2);
    if(this.gm.playerPos === 0)
    {
        window._UIData(UIData.SetScore,score_1,score_2);
    }else
    {
        window._UIData(UIData.SetScore,score_2,score_1);
    }
    
    
    this.tipImage.enabled = this.gm.gp.isMyTurn();
    
    this.timeLimitPInt = -1;
    this.timeLimitP = 0;
    this.beginCutTime = true;
};

UiplayPage.prototype.changeRound = function(roundNumber)
{
    window._UIData(UIData.SetChangeRound,roundNumber);
    this.arrow1.enabled = false;
    this.arrow2.enabled = false;
    this.arrow3.enabled = false;
    if(roundNumber===0)
    {
        this.uiplayer_1.SetRound(-1);
        this.uiplayer_2.SetRound(-1);
    }
    
    if(roundNumber%2 ===  0)
        this.uiplayer_1.SetRound((roundNumber)/2);
    else
        this.uiplayer_2.SetRound((roundNumber)/2);
};

UiplayPage.prototype.Throw = function(x,y)
{
    console.log("ui throw event");
    this.beginCutTime = false;
};

// update code called every frame
UiplayPage.prototype.update = function(dt) {
    
    if(this.gm.gs === GameState.G_Play&&this.beginCutTime)
    {
        if(this.timeLimitP<10)
        {
            this.timeLimitP+=dt;
            
            if(Math.floor(this.timeLimitP)>this.timeLimitPInt)
            {
                this.timeLimitPInt = Math.floor(this.timeLimitP);
                window._UIData(UIData.SetLestTime,(10 -this.timeLimitPInt));
            }
            

            if(this.timeLimitP>=10)
            {

                if(this.gm.gp.isMyTurn())
                {
                    //时间结束，不可以操作了
                    //pc.app.root.findByName("GameManager").script.gameManager.Req_RoundTimeOver();
                }

            }
        }
    }

    
};

/*新版操作方式*/

UiplayPage.prototype.onTouchStart = function (event)
{
    var b_x = event.touches[0].x - window.screen.width/2;
    if(event.touches[0].y/window.screen.height<0.8)
    {
        this.upDown = true;
        this.leftRight = false;
    }else
    {
        if(Math.abs(b_x)<window.screen.width/8)
        {
            //this.upDown = true;
            //this.leftRight = false;
            this.upDown = false;
            this.leftRight = true;
        }else
        {

            this.upDown = false;
            this.leftRight = true;
        }
        
    }
    
    this.OperateArrow(event);
};
UiplayPage.prototype.onTouchMove = function (event)
{
    this.OperateArrow(event);
};
UiplayPage.prototype.onTouchEnd = function (event)
{
    if(this.upDown)
    {
        var total = Math.abs(this.x_pow) + Math.abs(this.y_pow);
        if(this.gm.gs === GameState.G_Play&&this.pos!==null&&this.gm.gp.isMyTurn()&&event!==null)
        {
            pc.app.root.findByName("GameManager").script.gameManager.Req_Throw(parseInt(-1*this.x_pow*this.h_speed),parseInt(-1*this.y_pow*this.h_speed),parseInt(this.angle_pow*this.w_speed));
        }
        this.x_pow = 0;
        this.y_pow = 0;
        this.angle_pow = 0;
        this.upDown = false;
        this.leftRight = false;
    }

};
UiplayPage.prototype.OperateArrow = function(event)
{
    if(this.gm.gs === GameState.G_Play&&this.pos!==null&&this.gm.gp.isMyTurn()&&event!==null)
    {

            console.log(event.touches[0]);
            var y = window.screen.height-event.touches[0].y;
            var x = window.screen.width/2- event.touches[0].x;
            if(y<30)
                y =30;
            else if(y>window.screen.height/3)
                y=window.screen.height/3;
            
            if(x<-1*window.screen.width/2)
                x=-1*window.screen.width/2;
            else if(x>1*window.screen.width/2)
                x=1*window.screen.width/2;
            
        
            if(this.upDown)
            {
                this.arrow1.enabled = true;
                var angle = Math.atan2(window.screen.width/2- event.touches[0].x,window.screen.height-event.touches[0].y)*180/Math.PI;
                if(angle<-45)
                    angle = -45;
                else if(angle>45)
                    angle = 45;
                this.arrow1.setLocalEulerAngles(0,0,angle);
                var y_f = y/window.screen.height*3;
                this.arrow1.element.height = y_f * 461;
                this.arrow1.element.rect =new pc.Vec4(0,0,1,y_f);
                this.x_pow =  x;
                this.y_pow =  y;
                this.arrow1.enabled =  this.y_pow>=0;
                
                window._UIData(UIData.SetForce,y_f,angle);
            }else if(this.leftRight)
            {
                this.arrow2.enabled = true;
                this.arrow3.enabled = true;
                this.angle_pow = x;
                
                var x_f = Math.abs(this.angle_pow)/window.screen.width*2;
                if(this.angle_pow<0)
                {
                    
                    this.arrow2.setLocalEulerAngles(0,0,90);
                    this.arrow3.setLocalEulerAngles(0,0,90-x_f*90);
                    window._UIData(UIData.SetTorque,0,90-x_f*90);
                }else if(this.angle_pow>0)
                {
                    this.arrow3.setLocalEulerAngles(0,0,-90);
                    this.arrow2.setLocalEulerAngles(0,0,-90+x_f*90);
                    window._UIData(UIData.SetTorque,1,-90+x_f*90);
                }
                
            }

    }
};
/*
//老版本操作方式
UiplayPage.prototype.onTouchStart = function (event) {
    if (event.touches.length === 1) {
        this.pos = new pc.Vec2();
        this.originPos = event.touches[0];
        this.dragBeginTime = Date.now();
    }
};


UiplayPage.prototype.onTouchMove = function (event) {
    this.pos= new pc.Vec2(this.pos.x+event.touches[0].x-this.originPos.x,this.pos.y+event.touches[0].y-this.originPos.y);
        
};


UiplayPage.prototype.onTouchEnd = function (event) {

    if(this.gm.gs === GameState.G_Play&&this.pos!==null)
    {
        if(this.pos.y<=-200)
        {
            if(this.gm.gp.isMyTurn()||this.gm.Gameid === null)
            {
                var total = Math.abs(this.pos.x) +Math.abs(this.pos.y)+0.1;
                var dragtime = (Date.now() - this.dragBeginTime);
                if(total>0.5&&dragtime>50)
                {

                    if(this.gm.Gameid === null)
                    {
                        pc.app.root.findByName("GameManager").script.gameManager.ThrowEvent(this.gm.gp.RoundNumber%2,parseInt(20000/dragtime*this.pos.x/total),parseInt(20000/dragtime*this.pos.y/total));
                    }else
                    {
                        pc.app.root.findByName("GameManager").script.gameManager.Req_Throw(parseInt(20000/dragtime*this.pos.x/total),parseInt(20000/dragtime*this.pos.y/total));
                    }

                }
            }else
            {
                console.log("对手回合");
            }
        }else{
            console.log("滑动距离太短");
        }
        
    }else{
        console.log("不是play状态");
    }
    this.dragBeginTime = null;
};
*/
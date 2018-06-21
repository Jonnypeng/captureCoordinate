class btnMake extends PIXI.Sprite.fromImage {
  constructor(url,x,y,interactive = false){
    super(url);
    this.position.x = x;
    this.position.y = y;
    this.interactive = interactive;
  }
}

class sprite extends PIXI.Sprite.fromImage{
  constructor(url){
    super(url);
    this.position.x = 0;
    this.position.y = 0;
  }
}

class shape extends PIXI.Graphics{
  constructor(x = 0,y = 0){
    super();
    this.start = new PIXI.Point(x,y);
    this.alpha = 0.5;
  }
  rect(w = 0,h = 0){
    this.clear();
    if(w<0 || h <0){
      return false;
    }else{
      this.beginFill(0xff0000).drawRect(this.start.x,this.start.y,w,h);
    };
  }
}

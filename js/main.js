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

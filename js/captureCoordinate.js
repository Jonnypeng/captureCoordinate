window.onload = init;

function init(){

  var res = new Object();

  var v = {
    w:1920,
    h:1080
  };

  var app = new PIXI.Application(v.w,v.h,{
    'view':document.getElementById("canvas")
  });


  var game = {
    "init":function (){
      var loader = new PIXI.loaders.Loader();
      loader.add([
        "images/logo.png",
        "images/circle.png",
        "images/file.png",
        "images/rectangle.png",
        "images/ellipse.png",
        "images/polygon.png",
        "images/resView.png"
      ]);
      loader.load(function (){
        game.res();
      });
    },
    "res":function (){
      res.bg = new PIXI.Graphics();
      res.bg.beginFill(0x000).drawRect(0,0,app.screen.width,app.screen.height);
      res.temp = new PIXI.Sprite();
      res.logo = new btnMake("images/logo.png",v.w-80,0,false);
      res.file = new btnMake("images/file.png",v.w-80,81,true);
      res.rectangle = new btnMake("images/rectangle.png",v.w-80,81*2,true);
      res.circle = new btnMake("images/circle.png",v.w-80,81*3,true);
      res.ellipse = new btnMake("images/ellipse.png",v.w-80,81*4,true);
      res.polygon = new btnMake("images/polygon.png",v.w-80,81*5,true);
      res.resView = new btnMake("images/resView.png",v.w-80,81*6,true);
      game.view();
    },
    "view":function (){
      var nav = new PIXI.Container();app.stage.addChild(res.bg,res.temp,nav);
      nav.addChild(res.logo,res.file,res.rectangle,res.circle,res.ellipse,res.polygon,res.resView);
      app.renderer.render(app.stage);
      game.outputImg();
    },
    "outputImg":function (){
      var simg = document.getElementById("selectImage");
      res.file.on("pointertap",function (){
        $(simg).click();
      });

      simg.addEventListener("change",simgHandle,false);

      var result = document.getElementById("result");

      function simgHandle(e){
        var file = e.target.files[0];
        var fileType = file.type.match("image/*");
        if(fileType){
          fileReader();
        }else{
          return false;
        };

        function fileReader(){
          var reader = new FileReader();
          reader.readAsDataURL(file);
          reader.addEventListener("load",output,false);
          function output(e){
            res.temp.texture = PIXI.Texture.fromImage(e.currentTarget.result);
          };
        };
      };

      res.resView.on("pointertap",function (){
        $("#codeView").modal();
      });

      game.draw();
    },
    'draw':function (){
      var myShape;
      var type;
      var count = {
        "r":0,
        "c":0,
        "e":0,
        "p":0
      };

      res.bg.interactive = false;

      res.bg.on("pointerdown",pointerStart);
      res.bg.on("pointermove",pointerMove);
      res.bg.on("pointerup",pointerUp);

      function pointerStart(e){
        this.drop = true;
        myShape = new shape(e.data.global.x,e.data.global.y);
        app.stage.addChild(myShape);
      };

      function pointerMove(e){
        if(this.drop){
          switch(type){
            case "rect" :
            myShape.rect(e.data.global.x - myShape.start.x,e.data.global.y - myShape.start.y);
            break;
          }
        }else{
          return false;
        }
      };

      function pointerUp(e){
        this.drop = false;
        switch(type){
          case "rect":
          count.r+=1;
          var text = new PIXI.Text("r" + count.r,{"fill":0xffffff});
          text.position = myShape.start;
          app.stage.addChild(text);
          var content = "<pre>" + ("r" + count.r + ":new PIXI.Rectangle(" + Math.floor(myShape.start.x) + "," + Math.floor(myShape.start.y) + "," + Math.floor(e.data.global.x - myShape.start.x) + "," +  Math.floor(e.data.global.y - myShape.start.y) + ")" + "<br>") + "</pre>";
          $("#code").append(content);
          break;
        }
      }

      res.rectangle.on("pointertap",rectangleHandle);
      function rectangleHandle(e){
        res.bg.interactive = true;
        type = "rect";
      };
    }
  };

  game.init();

};

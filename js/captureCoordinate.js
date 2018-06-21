window.onload = init;

function init(){

  var res = new Object();

  var v = {
    w:window.innerWidth,
    h:window.innerHeight
  };

  var app = new PIXI.Application(v.w*1.5,v.h*1.5,{
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
      res.temp = new PIXI.Sprite();
      res.logo = new btnMake("images/logo.png",v.w*1.5-80,0,false);
      res.file = new btnMake("images/file.png",v.w*1.5-80,81,true);
      res.rectangle = new btnMake("images/rectangle.png",v.w*1.5-80,81*2,true);
      res.circle = new btnMake("images/circle.png",v.w*1.5-80,81*3,true);
      res.ellipse = new btnMake("images/ellipse.png",v.w*1.5-80,81*4,true);
      res.polygon = new btnMake("images/polygon.png",v.w*1.5-80,81*5,true);
      res.resView = new btnMake("images/resView.png",v.w*1.5-80,81*6,true);
      game.view();
    },
    "view":function (){
      var nav = new PIXI.Container();app.stage.addChild(res.temp,nav);
      nav.addChild(res.logo,res.file,res.rectangle,res.circle,res.ellipse,res.polygon,res.resView);
      app.renderer.render(app.stage);
      game.control();
    },
    "control":function (){
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
    }
  };

  game.init();

};

img=""
status="";
object=[];

function preload(){
    song=loadSound("music.mp3");
}

function setup(){
    canvas = createCanvas(600,400);
 canvas.center();
 video=createCapture(VIDEO);
 video.hide();
 objectDetector= ml5.objectDetector("cocossd", modelloaded)
 document.getElementById("status").innerHTML="Status:Detecting Objects";
}

function modelloaded(){
    console.log("model loaded");
    status=true;
    
}
function gotResults(error,results){
if(error){
console.log(error);
}
console.log(results);
object=results;
}
function draw(){
    image(video,0,0,600,400);
   
    if(status != ""){
               
        r=random(255);
        g=random(255);
        b=random(255);
        objectDetector.detect(video,gotResults);
        for(i=0;i < object.length; i++){
            document.getElementById("status").innerHTML="Status : Objects Detected";
           
            fill(r,g,b);
            percent= floor(object[i].confidence *100);
            text(object[i].label + " " + percent + "%",object[i].x,object[i].y)
            noFill()
            stroke(r,g,b);
            rect(object[i].x,object[i].y,object[i].width,object[i].height);
            if(object[i].label == "person"){
                document.getElementById("status_baby").innerHTML="Baby Found";
                song.stop();
            }else{
                document.getElementById("status_baby").innerHTML="Baby Not Found";
                song.play();
            }
        }
    }
}
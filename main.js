function setup(){
    canvas = createCanvas(280,280);
    canvas.center();
    background("white");
    synth=window.speechSynthesis;
    canvas.mouseReleased(canvasUpdate);
}
function preload(){
    classifier= ml5.imageClassifier('DoodleNet');
}
function draw(){
    strokeWeight(13);
    stroke('purple');
    if(mouseIsPressed){
        line(pmouseX,pmouseY,mouseX,mouseY);
    }
}
function canvasUpdate(){
    classifer.classify(canvas,gotresults);
}
function gotresults(error,result){
    if(error){
        console.error(error);
    } else{
        console.log(result);
        label= result[0].label;
        confidence= Math.round(result[0].confidence*100)+"%";
        document.getElementById("label").innerHTML="Label: "+label;
        document.getElementById("confidence").innerHTML="Confidence: "+confidence;
        utterThis = new SpeechSynthesisUtterance(label);
        synth.speak(utterThis);
    }
}
function clearCanvas(){
    background('white');
}
async function main(){
    if(!navigator.mediaDevices?.getUserMedia){
	alert("getUserMedia() not supported");
    }
    setDevices();
    
    let sel = document.querySelectorAll("select");
    sel.forEach((s) => {
	s.addEventListener("change", changeTracks);
    });
}

async function setDevices() {
    var audioList = document.getElementById("audio-id");
    var videoList = document.getElementById("video-id");
    await navigator.mediaDevices.getUserMedia({video: true, audio: true});
    tracks = await navigator.mediaDevices.enumerateDevices()
    tracks.forEach((t)=> {
	let opt = document.createElement("option");
	opt.text = t.label;
	opt.value = t.deviceId;
	if(t.kind == "audioinput") {
	    audioList.appendChild(opt);
	} else if (t.kind == "videoinput") {
	    videoList.appendChild(opt);
	} else {
	    console.log("unknown kind: " + t.kind);
	}
    });
}

async function changeTracks() {
    let aid = document.getElementById("audio-id").value;
    let vid = document.getElementById("video-id").value;
    let v = document.getElementById("video");
    let c = {
	audio: { deviceId: aid },
	video: { deviceId: vid },
    }
    let m = await navigator.mediaDevices.getUserMedia(c);
    console.log("called, video is " + v + " aid is " + aid + " vid is " + vid + " m is " + m);
    v.srcObject = m;
    v.play();
}

main();

class Node {

  constructor(eyed, ex, wy) {
    this.id = eyed;
    this.x = ex;
    this.y = wy;
    this.name = "" + this.id;
  }

  draw() {
    fill(124);
    stroke(30);

    ellipse(this.x, this.y, 50, 35);
    fill(0);
    textAlign(CENTER, CENTER);
    text(""+this.id, this.x, this.y);
  }

  hit(nx, ny) {
    if ((createVector(this.x,this.y)).dist(createVector(nx, ny)) < 50) {
      return true;
    }
    return false;
  }

  moveTo(ex, wy) {
    this.x = ex;
    this.y = wy;
  }
}

class Arc {
  constructor(en1, en2) {
    this.n1 = en1;
    this.n2 = en2;
  }

  draw() {
    line(this.n1.x, this.n1.y, this.n2.x, this.n2.y);
  }
}

class Network {

  constructor() {
    this.nodes = [];
    this.arcs = [];
    this.nid = 0;
    this.aid = 0;
    this.selectedNode = -1;
  }

  addNode(ex, wy) {
    var n = new Node(this.nid, ex, wy);
    this.nodes.push(n);
    this.nid++;
  }

  hitOne(ex, wy) {
    for (var i=0;i<this.nodes.length;i++) {
      var n = this.nodes[i];
      if (n.hit(ex, wy)) {
        return n.id;
      }      
    }
    return -1;
  }

  getNodeById(id) {
    for (var i=0;i<this.nodes.length;i++) {
        var n = this.nodes[i];
        if (n.id == id) { 
            return n;
        }
    }
    throw ("Id " + id + " does not exist");
  }

  draw() {
    for (var i=0;i<this.arcs.length;i++) {
      var a = this.arcs[i];
      a.draw();
    }
    for (var i=0;i<this.nodes.length;i++) {
      var n = this.nodes[i];
      n.draw();
    }
  }

  toEDN() {
    var s = "{:nodes [ \n";
    for (var i=0;i<this.nodes.length;i++) {
        var n = this.nodes[i];
        s = s + "[\"" + n.id + "\" " + n.x + " " + n.y + "]\n";
    }
    s = s + "] :arcs [\n";
    for (var i=0;i<this.arcs.length;i++) {
      var a = this.arcs[i];
      s = s + "[\"" + a.n1.id + "\" \"" + a.n2.id + "\"]\n";
    }
    s = s + "]\n}";
    return s;
  }

  scaledTo(wi, hi) {
    var net = new Network();
    for (var i=0;i<this.nodes.length;i++) {
        var n = this.nodes[i];
        net.nodes.push(new Node(n.id, map(n.x, 0, width, 0, wi), map(n.y, 0, height, 0, hi)));
    }
    for (var i=0;i<this.arcs.length;i++) {
      var a = this.arcs[i];
      try {
        net.arcs.push(new Arc(this.getNodeById(a.n1.id), this.getNodeById(a.n2.id)));
      } 
      catch (e) {
        bgcol = color(255, 0, 0);

        console.log("WTF??? in scaling " + e + " ==== "+ a.n1.id + " " + a.n2.id );
      }
    }
    return net;
  }

}

var bgcol; 
var mainMsg; 

var network = new Network();

function setup() {
  createCanvas(600, 900);
  fill(124);
  stroke(30);
  textSize(16);
  background(255);
  bgcol = color(255,255,255);
  mainMsg = "";
}

function draw() {

  background(bgcol);
  push();
      strokeWeight(4);
      stroke(99,99,99);
      rect(0,0,width,height);
      fill(bgcol);
      rect(3,3,width-3,height-3);
  pop();
  
  network.draw();
  fill(33,33,33);
  push();
  textSize(24);
  textAlign(LEFT);
  text(mainMsg,30,40);
  pop();

}

function mousePressed() {
  network.selectedNode = network.hitOne(mouseX, mouseY);
}

function mouseReleased() {
  if (network.selectedNode > -1) {
    // we'd already selected something
    try {      
      var hid = network.hitOne(mouseX, mouseY);
      if (hid < 0) {
        // we haven't hit anything else, so we move
        network.getNodeById(network.selectedNode).moveTo(mouseX, mouseY);
      } else {
        // we did hit something else so we add an arc
        network.arcs.push(new Arc(network.getNodeById(network.selectedNode), 
          network.getNodeById(hid)));
      }
    } 
    catch (e) {
      console.log("WTF??? " + e);
    }
  } else {
    // we hadn't already selected something, so we create a new node
    network.addNode(mouseX, mouseY);
  }
  network.selectedNode = -1;
  
  var edn = network.scaledTo(600,500).toEDN();
  console.log(edn);
  document.getElementById("edn_text").innerHTML=edn;
}



class Node {

    constructor(eyed, label,  ex, wy) {
    this.id = eyed;
    this.x = ex;
    this.y = wy;
    this.setLabel(label);
  }

  draw(isSelected) {
    if (isSelected) {
        fill(124,220,220);
    } else {
        fill(200);
    }
    stroke(30);

    var wide = textWidth(this.getLabel())*1.1;
    rect(this.x,this.y,wide,50);
    rectMode(CENTER);
    //ellipse(this.x, this.y, wide, 30);
    textAlign(CENTER, CENTER);

    fill(0);
    text(this.getLabel(), this.x, this.y);
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

  setLabel(l) {
    this.label =     l;
    console.log(this);
  }

  getLabel() {

    return this.label;
    }

  toEDN() {
     return "[\"" + this.id + "\" \"" + this.getLabel() + "\" " + this.x + " " + this.y + "]\n";
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
    this.lastSelectedNode = -1;
  }

  addNode(ex, wy) {
      var n = new Node(this.nid, "  "+this.nid+"  ",ex, wy);
    this.nodes.push(n);
    this.nid++;
  }

    addArc(nid1, nid2) {
        this.arcs.push(new Arc(this.getNodeById(nid1),
                          this.getNodeById(nid2)));
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
      n.draw(n.id == this.lastSelectedNode);
    }
  }

  renameSelected(newLabel) {
    var n = this.getNodeById(this.lastSelectedNode);
    n.setLabel(newLabel);
    this.selectedNode = n.id;
    console.log(n);
  }

    deleteSelected() {
        var n = this.getNodeById(this.lastSelectedNode);

        this.arcs = this.arcs.filter(function(a,i,xs) {
            if (a.n1.id == n.id) { return false; }
            if (a.n2.id == n.id) { return false; }
            return true;
        });

        this.nodes = this.nodes.filter(function(value,index,xs){
            return value.id != n.id;
        });
        console.log(this.nodes);

    }

  toEDN() {
    var s = "{:nodes [ \n";
    for (var i=0;i<this.nodes.length;i++) {
        var n = this.nodes[i];
        s = s + n.toEDN() + "\n";
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
        net.nodes.push(new Node(n.id, n.label,  map(n.x, 0, width, 0, wi), map(n.y, 0, height, 0, hi)));
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

var cnv, deleteButton, renameInput, renameButton;


function updateEDN() {
      var edn = network.scaledTo(600,500).toEDN();
      console.log(edn);
      document.getElementById("edn_text").innerHTML=edn;
}

function setup() {


    deleteButton = select("#deleteButton");
    deleteButton.mousePressed(function() {
        network.deleteSelected();
        updateEDN();
    });


    renameInput = select("#renameInput");

    renameButton = select("#renameButton");
    renameButton.mousePressed(function() {
        network.renameSelected(renameInput.value());
        updateEDN();
    });


  cnv = createCanvas(500, 500);
  fill(124);
  stroke(30);
  textSize(16);
  background(255);
  bgcol = color(255,255,255);
  mainMsg = "";

  hit = function(x,y) {
    console.log(""+x + "," + y + " out of " + cnv.width + "," + cnv.height);
    if (x < 0) { return false; }
    if (y < 0) { return false;}
    if (x > cnv.width) { return false; }
      if (y > cnv.height) { return false; }
    return true;
  };

  cnv.mousePressed(function() {
        if (hit(mouseX,mouseY)) {
            network.selectedNode = network.hitOne(mouseX, mouseY);
        }
    });

  cnv.mouseReleased(function() {
      if (! hit(mouseX,mouseY)) { return; }
      if (network.selectedNode > -1) {
        // we'd already selected something
        try {
          var hid = network.hitOne(mouseX, mouseY);
          if (hid < 0) {
            // we haven't hit anything else, so we move
            network.getNodeById(network.selectedNode).moveTo(mouseX, mouseY);
          } else {
              // we did hit something else, if it's a different
              // node then we add an arc.
              if (network.selectedNode != hid) {
                  network.addArc(network.selectedNode,hid);
              } else {
                  // it's the same node so just move it
                  network.getNodeById(network.selectedNode).moveTo(mouseX, mouseY);
              }
          }
        }
        catch (e) {
          console.log("WTF??? " + e);
        }
      } else {
        // we hadn't already selected something, so we create a new node
        network.addNode(mouseX, mouseY);
      }
      network.lastSelectedNode = network.selectedNode;
      network.selectedNode = -1;
      updateEDN();

    });



}

function draw() {

  background(bgcol);
  push();
      strokeWeight(4);
      stroke(99,99,99);
      rect(cnv.width/2,cnv.height/2,cnv.width,cnv.height);
      fill(bgcol);
      rect(cnv.width/2,cnv.height/2,width-3,height-3);
  pop();

  network.draw();
  fill(33,33,33);
  push();
  textSize(24);
  textAlign(LEFT);
  text(mainMsg,30,40);
  pop();

}

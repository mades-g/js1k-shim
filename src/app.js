//tr -> trail
// px py snake x and y positions

(function(d) {
  d.addEventListener("keydown",k)
  cW=c.width
  cH=c.height
  setInterval(g,1000/15)
})(document)
dv=12
px=py=5
tc=30
fx=fy=10
xv=yv=0
tr=[]
ta=3
function g(x,y,w,h) {
  px+=xv
	py+=yv
	if(px<0) {
		px= tc-1
	}
	if(px>tc-1) {
		px=0
	}
	if(py<0) {
		py=(tc/2)-1
	}
	if(py>(tc/2)-1) {
		py=0
  }
	a.fillStyle="black"
  a.fillRect(0,0,c.width,c.height)
  a.fillStyle="red"
	for(var i=0;i<tr.length;i++) {
		eval(draw(tr[i].x*(dv-2),tr[i].y*(dv-2),(dv-2),(dv-2)))
		if(tr[i].x==px && tr[i].y==py) {
			ta = 3
		}
	}
	tr.push({x:px,y:py})
	while(tr.length>ta) {
	tr.shift()
  }
	if(fx==px && fy==py) {
		ta++
		fx=~~(Math.random()*(tc/2))
		fy=~~(Math.random()*(tc/2))
  }
	eval(draw(fx*(dv-2),fy*(dv-2),(dv-2),(dv-2)))
}
function draw(x,y,w,h) {return `a.fillRect(${x},${y},${w},${h})`}
function k(x,y,w,h) {
	switch(x.keyCode) {
		case 37:
			xv=-1;yv=0
			break
		case 38:
			xv=0;yv=-1
			break
		case 39:
			xv=1;yv=0
			break
		case 40:
			xv=0;yv=1
			break
	}
}

///g 430
///s 408
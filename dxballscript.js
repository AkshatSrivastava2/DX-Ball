	//music code
	var back_music=new Audio("music.ogg");
	var hit_music=new Audio("brick hit.mp3");
	back_music.play();
	back_music.loop=true;

	//variable initialization
	var canvas = document.getElementById("mycanvas");
	var ctx = canvas.getContext("2d");
	var x=canvas.width/2; 
	var y=canvas.height-30;
	var dx=2;
	var dy=-2;
	var paddleHeight=6;
	var paddleWidth=70;
	var paddleX=(canvas.width-paddleWidth)/2;
	var rightpressed=false;
	var leftpressed=false;
	var ballRadius=3;
	var brickRowCount=3;
	var brickColumnCount=5;
	var brickWidth=50;
	var brickHeight=5;
	var brickPadding=10;
	var brickOffsetTop=15;
	var brickOffsetLeft=5;
	var x,y,status,score=0;
	//initialize array for bricks
	var bricks=[];
	for(c=0;c<brickColumnCount;c++)
	{	bricks[c] =[];
		for (r=0;r<brickRowCount;r++)
		{
			bricks[c][r]={x:0,y:0,status:1};
		}
	}
	//draw score board
	function drawScore() 
	{
    	ctx.font = "70% Arial";
    	ctx.fillStyle = "#0095DD";
    	ctx.fillText("Score: "+score, 4, 10);
    	ctx.stroke();
	}
	//draw bricks
	function drawBricks()
	{
		for(c=0;c<brickColumnCount;c++)
		{
			for(r=0;r<brickRowCount;r++)
			{
				if(bricks[c][r].status==1)
				{
					var brickX=(c*(brickPadding+brickWidth))+brickOffsetLeft;
					var brickY=(r*(brickPadding+brickHeight))+brickOffsetTop;
					bricks[c][r].x=brickX;
					bricks[c][r].y=brickY;
					ctx.beginPath();
					ctx.rect(brickX,brickY,brickWidth,brickHeight);
					ctx.fillStyle="#8B4513";
					ctx.fill();
					ctx.closePath();
				}
			}
		}
	}

	//detect collision
	function collisionDetection()
	{
    	for(c=0; c<brickColumnCount; c++)
    	{
        	for(r=0; r<brickRowCount; r++) 
        	{
               	if(bricks[c][r].status==1)
            	{
            		if(x > bricks[c][r].x && x < bricks[c][r].x+brickWidth && y > bricks[c][r].y && y < bricks[c][r].y+brickHeight)
            	 	{
                		dy = -dy;
                		bricks[c][r].status=0;
                		score++;
                		hit_music.play();
                  		if(score == brickRowCount*brickColumnCount)
                		{
                			alert("You Won ! Congratulations Your Score is :"+score)
                			document.location.reload();
                		}
                	}
                }
            }
        }
    }

    //draw paddle
	function drawPaddle()
	{
		ctx.beginPath();
		ctx.rect(paddleX,canvas.height-paddleHeight,paddleWidth,paddleHeight);
		ctx.fillStyle="#FFD700";
		ctx.fill();
		ctx.stroke();
		ctx.closePath();
	}
	//draw ball
	function drawBall()
	{
		
		ctx.beginPath();
		ctx.arc(x,y,ballRadius,0,2*Math.PI);
		ctx.fillStyle="#FFA500";
		ctx.fill();
		ctx.stroke();
		ctx.closePath();
	}
	//draw the game
	function draw()
	{
		ctx.clearRect(0,0,canvas.width,canvas.height);
		drawBricks();
		drawBall();
		collisionDetection();
		drawPaddle();
		drawScore();
		

		if(y+dy-2<ballRadius)
		{
			dy=-dy;
		}
		else if(y+dy>canvas.height-ballRadius)
		{
			if(x-2> paddleX-1 && x+2< paddleX + paddleWidth -1)
			{
    	    	dy = -dy;
    		}
    		else
    		{
			alert("GAME OVER")
			document.location.reload();
			}
		}
		if(x+dx-2<ballRadius||x+dx+2>canvas.width-ballRadius)
		{
			dx=-dx;
		}
		x+=dx;
		y+=dy;
	}
	//control mouse
	function mouseMoveHandler(e)
	{
		var relativeX=e.clientX-canvas.offsetLeft-2*canvas.width;
		if(relativeX-34>0&&relativeX+34<canvas.width)
		{
			paddleX=relativeX-paddleWidth/2;
		}
	}
	document.addEventListener("mousemove",mouseMoveHandler,false);
	setInterval(draw,20);
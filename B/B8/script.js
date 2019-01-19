// Treat each number tile as a cell
// Initialise a grid of cells as a matrix
// Use iteration each time the user presses an arrow key to move the cell
// Use check functions everytime a move function is called to check if movement is possible

// ...
// To do - work on mobile functioning and touch actions
// ...

function startGame()
{
	var playboard = document.getElementsByClassName('playboard')[0];
	var newCells = document.getElementsByClassName('new-cell');
	var score_div = document.getElementsByClassName('score')[0];
	var score=0;
	var classCounter=0;
	score_div.innerHTML=score;
	
	// Initialise an object with all background colors to be used when addcell is called
	const colors = {
        2: "#eee3d6",
        4: "#ede0c8",
        8: "#f2b179",
        16: "#f59563",
        32: "#f67e5f",
        64: "#f65e3b",
        128: "#f1d96b",
        256: "#f2cf4d",
        512: "#e5c12b",
        1024: "#dfba12",
        2048: "#edc501"
	}
	
	// ----------------------- Touch Swipe Code ---------------------------
	// ----------------------- Still under progress -------------------------

	function swipedetect(el, callback){
  
		var touchsurface = el,
		swipedir,
		startX,
		startY,
		distX,
		distY,
		threshold = 150, //required min distance traveled to be considered swipe
		restraint = 100, 
		allowedTime = 300, // maximum time allowed to travel that distance
		elapsedTime,
		startTime,
		handleswipe = callback || function(swipedir){}
	  
		touchsurface.addEventListener('touchstart', function(e)
		{
			var touchobj = e.changedTouches[0];
			swipedir = 'none';
			dist = 0;
			startX = touchobj.pageX;
			startY = touchobj.pageY;
			startTime = new Date().getTime(); // record time when finger first makes contact with surface

			e.preventDefault();

		}, false)
	  
		touchsurface.addEventListener('touchmove', function(e){
			e.preventDefault(); // prevent scrolling when inside DIV
		}, false)
	  
		touchsurface.addEventListener('touchend', function(e)
		{
			var touchobj = e.changedTouches[0];

			distX = touchobj.pageX - startX; // get horizontal dist traveled by finger while in contact with surface
			distY = touchobj.pageY - startY; // get vertical dist traveled by finger while in contact with surface

			elapsedTime = new Date().getTime() - startTime; // get time elapsed

			if (elapsedTime <= allowedTime)
			{ // first condition for awipe met
				if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){ // 2nd condition for horizontal swipe met
					swipedir = (distX < 0)? 'left' : 'right'; // if dist traveled is negative, it indicates left swipe
				}
				else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint){ // 2nd condition for vertical swipe met
					swipedir = (distY < 0)? 'up' : 'down'; // if dist traveled is negative, it indicates up swipe
				}
			}

			handleswipe(swipedir);
			e.preventDefault();

		}, false)
	}
	  	
	// swipedetect(playboard, function(swipedir){
	// 	// swipedir contains either "none", "left", "right", "top", or "down"
	// 	el.innerHTML = 'Swiped <span style="color:yellow;margin: 0 5px;">' + swipedir +'</span>';
	// });
	// -----------------------------------------------------------------------

	document.addEventListener("keydown", keyPressed);
	document.addEventListener("keyup", keyReleased);
	 
	var cells = new Array();

	// Grid is intitalised
	for(var i=0; i<4; i++) {
		cells[i] = new Array();

		for(var j=0; j<4; j++) {
			cells[i][j]=0;
		}
	}
	
	console.log(cells);
	function generateCells() {
		addCell();
		addCell();
	}
	function addCell()
	{
		if(newCells.length<16)
		{
			do
			{
				var count=newCells.length;
				if(count<16)
				{
					var indicator=0;
					var i=0;
					var x = parseInt(Math.random()*4);
					var y = parseInt(Math.random()*4);
					for(i=0; i<count; i++)
					{
						if(((x*110+10+"px")==newCells[i].style.left) && ((y*110+10+"px")==newCells[i].style.top))
						{
							indicator=1;
							break;
						}
					}
				}
				else
				{
					checkGameOver();
					break;
				}
			} while(indicator==1);

			// create new div
			var cellToAdd = document.createElement('div')

			cellToAdd.style.top = y*110+10+"px";
			cellToAdd.style.left = x*110+10+"px";

			cellToAdd.className='new-cell new tile'+classCounter;
			classCounter++;
			
			var cell_content = parseInt(Math.random()*2 + 1)*2;
			cellToAdd.innerHTML += cell_content;
			playboard.appendChild(cellToAdd);

			//add colors to creted cell
			addBgColor(newCells.length-1);
			// update the cells array
			cells[x][y]=cell_content;
		}
		else
			checkGameOver();
	}
	function keyPressed(e) {

		switch(e.keyCode) {
			case 37 :
				leftKeyPressed();
				break;
			case 38 :
				upKeyPressed();
				break;
			case 39 :
				rightKeyPressed();
				break;
			case 40 :
				downKeyPressed();
				break;
		}

		// const keys = {
		// 	37: leftKeyPressed(),
		// 	38: upKeyPressed(),
		// 	39: rightKeyPressed(),
		// 	40: downKeyPressed()
		// }

	}
	function keyReleased(e) {

		if(e.keyCode>=37 && e.keyCode<=40)
			setTimeout(function() {removeClass();}, 310)
	}
	function leftKeyPressed() {
		running=0;
			for(var row=0; row<4; row++)
			{
				for(var i=1; i<=3; i++)
				{
					var target=i;
					var indicator=0;
					if(cells[i][row]!=0)
					{
						for(j=i; j>0; j--)
						{
							if(cells[j-1][row]==1 && cells[j-2][row]==cells[i][row])
							{
								target=j-1;
								indicator=1;
								break;
							}
							else if(cells[j-1][row]==0 || cells[j-1][row]==1)
							{
								target=j-1;
								indicator=1;
							}
							else if(cells[j-1][row]==cells[i][row])
							{
								target=j-1;
								indicator=2;
								break;
							}
							else
								break;
						}
						if(indicator==1)
						{
							cells[target][row]=cells[i][row];
							cells[i][row]=0;
						}
						else if(indicator==2)
						{
							cells[target][row]=cells[i][row]*2;
							score+=cells[target][row];
							score_div.innerHTML=score;

							cells[i][row]=0;
							cells[target+1][row]=1;
							for(k=0; k<newCells.length; k++)
							{
								if(((target*110+10+"px")==newCells[k].style.left) && ((row*110+10+"px")==newCells[k].style.top))
								{
									newCells[k].innerHTML=cells[target][row];
									addBgColor(k);
									newCells[k].classList.add('merge');
									break;
								}
							}
						}
					}
					for(x=0; x<newCells.length; x++)
					{
						if(((i*110+10+"px")==newCells[x].style.left) && ((row*110+10+"px")==newCells[x].style.top) && target!=i)
						{
							newCells[x].style.left=target*110+10+"px";
							if(indicator==2)
							{
								// removeElement(newCells[x].className);
								newCells[x].parentNode.removeChild(newCells[x]);
							}
							running=1; //indication that this loop ran once
							break;
						}
					}
				}
				for(j=0; j<4; j++)
					if(cells[j][row]==1)
						cells[j][row]=0;
			}
			if(running==1)
				setTimeout(addCell, 200);
				// setTimeout(addCell);
			else
				checkGameOver();
			// for(var i=0; i<4; i++)
			// {
			// 	var str="";
			// 	for(var j=0; j<4; j++)
			// 	{
			// 		str+=cells[j][i]+", ";
			// 	}
			// 	console.log(str+"\n");
			// }
	}
	function rightKeyPressed() {
		running=0;
			for(var row=0; row<4; row++)
			{
				for(var i=2; i>=0; i--)
				{
					var target=i;
					var indicator=0;
					if(cells[i][row]!=0)
					{
						for(j=i; j<3; j++)
						{
							if(cells[j+1][row]==1 && cells[j+2][row]==cells[i][row])
							{
								target=j+1;
								indicator=1;
								break;
							}
							else if(cells[j+1][row]==0 || cells[j+1][row]==1)
							{
								target=j+1;
								indicator=1;
							}
							else if(cells[j+1][row]==cells[i][row])
							{
								target=j+1;
								indicator=2;
								break;
							}
							else
								break;
						}
						if(indicator==1)
						{
							cells[target][row]=cells[i][row];
							cells[i][row]=0;
						}
						else if(indicator==2)
						{
							cells[target][row]=cells[i][row]*2;
							score+=cells[target][row];
							score_div.innerHTML=score;
							cells[i][row]=0;
							cells[target-1][row]=1;
							for(k=0; k<newCells.length; k++)
							{
								if(((target*110+10+"px")==newCells[k].style.left) && ((row*110+10+"px")==newCells[k].style.top))
								{
									newCells[k].innerHTML=cells[target][row];
									addBgColor(k);
									newCells[k].classList.add('merge');
									break;
								}
							}
						}
					}
					for(x=0; x<newCells.length; x++)
					{
						if(((i*110+10+"px")==newCells[x].style.left) && ((row*110+10+"px")==newCells[x].style.top) && target!=i)
						{
							newCells[x].style.left=target*110+10+"px";
							newCells = document.getElementsByClassName('new-cell');
							if(indicator==2)
							{
								newCells[x].parentNode.removeChild(newCells[x]);
							}
							running=1; //indication that this loop ran once
							break;
						}
					}
				}
				for(j=0; j<4; j++)
					if(cells[j][row]==1)
						cells[j][row]=0;
			}
			if(running==1)
				setTimeout(addCell, 200);
				// setTimeout(addCell);
			else
				checkGameOver();
	}
	function downKeyPressed() {
		running=0;
			for(var column=0; column<4; column++)
			{
				for(var i=2; i>=0; i--)
				{
					var target=i;
					var indicator=0;
					if(cells[column][i]!=0)
					{
						for(j=i; j<3; j++)
						{
							if(cells[column][j+1]==1 && cells[column][j+2]==cells[column][i])
							{
								target=j+1;
								indicator=1;
								break;
							}
							else if(cells[column][j+1]==0 || cells[column][j+1]==1)
							{
								target=j+1;
								indicator=1;
							}
							else if(cells[column][j+1]==cells[column][i])
							{
								target=j+1;
								indicator=2;
								break;
							}
							else
								break;
						}
						if(indicator==1)
						{
							cells[column][target]=cells[column][i];
							cells[column][i]=0;
						}
						else if(indicator==2)
						{
							cells[column][target]=cells[column][i]*2;
							score+=cells[column][target];
							score_div.innerHTML=score;
							
							cells[column][i]=0;
							cells[column][target-1]=1;
							for(k=0; k<newCells.length; k++)
							{
								if(((column*110+10+"px")==newCells[k].style.left) && ((target*110+10+"px")==newCells[k].style.top))
								{
									newCells[k].innerHTML=cells[column][target];
									addBgColor(k);
									newCells[k].classList.add('merge');
									break;
								}
							}
						}
					}
					for(x=0; x<newCells.length; x++)
					{
						if(((column*110+10+"px")==newCells[x].style.left) && ((i*110+10+"px")==newCells[x].style.top) && target!=i)
						{
							newCells[x].style.top=target*110+10+"px";
							newCells = document.getElementsByClassName('new-cell');
							if(indicator==2)
							{
								newCells[x].parentNode.removeChild(newCells[x]);
							}
							running=1; //indication that this loop ran once
							break;
						}
					}
				}
				for(j=0; j<4; j++)
					if(cells[column][j]==1)
						cells[column][j]=0;
			}
			if(running==1)
				setTimeout(addCell, 200);
				// setTimeout(addCell);
			else
				checkGameOver();
	}
	function upKeyPressed() {
		running=0;
			for(var column=0; column<4; column++)
			{
				for(var i=1; i<=3; i++)
				{
					var target=i;
					var indicator=0;
					if(cells[column][i]!=0)
					{
						for(j=i; j>0; j--)
						{
							if(cells[column][j-1]==1 && cells[column][j-2]==cells[column][i])
							{
								target=j-1;
								indicator=1;
								break;
							}
							else if(cells[column][j-1]==0 || cells[column][j-1]==1)
							{
								target=j-1;
								indicator=1;
							}
							else if(cells[column][j-1]==cells[column][i])
							{
								target=j-1;
								indicator=2;
								break;
							}
							else
								break;
						}
						if(indicator==1)
						{
							cells[column][target]=cells[column][i];
							cells[column][i]=0;
						}
						else if(indicator==2)
						{
							cells[column][target]=cells[column][i]*2;
							score+=cells[column][target];
							score_div.innerHTML=score;
							cells[column][i]=0;
							cells[column][target+1]=1;
							for(k=0; k<newCells.length; k++)
							{
								if(((column*110+10+"px")==newCells[k].style.left) && ((target*110+10+"px")==newCells[k].style.top))
								{
									newCells[k].innerHTML=cells[column][target];
									addBgColor(k);
									newCells[k].classList.add('merge');
									break;
								}
							}
						}
					}
					for(x=0; x<newCells.length; x++)
					{
						if(((column*110+10+"px")==newCells[x].style.left) && ((i*110+10+"px")==newCells[x].style.top) && target!=i)
						{
							newCells[x].style.top=target*110+10+"px";
							newCells = document.getElementsByClassName('new-cell');
							if(indicator==2)
							{
								newCells[x].parentNode.removeChild(newCells[x]);
							}
							running=1; //indication that this loop ran once
							break;
						}
					}
				}
				for(j = 0; j < 4; j++)
					if(cells[column][j]==1)
						cells[column][j]=0;
			}
			if(running == 1)
				setTimeout(addCell, 200);
				// setTimeout(addCell);
			else
				checkGameOver();
	}
	function removeClass() {
		for(k=0; k<newCells.length; k++)
		{
			newCells[k].classList.remove('merge');
			newCells[k].classList.remove('new');
		}
	}

	function addBgColor(k) {
		if(newCells[k].innerHTML==2 || newCells[k].innerHTML == 4)
			newCells[k].style.color="#776e65";
        else 
			newCells[k].style.color = "#f9f6f2"

		if(newCells[k].innerHTML >= 1024) {
			newCells[k].style.fontSize = "2.5em";
		} 

		newCells[k].style.background = colors[newCells[k].innerHTML];
	}

	function checkGameOver() {
		if(checkLeft() && checkRight() && checkUp() && checkDown())
			confirm("Game over!");
	}
	function checkLeft() {
		running=0;
		for(var row=0; row<4; row++)
		{
			for(var i=1; i<=3; i++)
			{
				var target=i;
				var indicator=0;
				if(cells[i][row]!=0)
				{
					for(j=i; j>0; j--)
					{
						if(cells[j-1][row]==1 && cells[j-2][row]==cells[i][row])
						{
							target=j-1;
							indicator=1;
							break;
						}
						else if(cells[j-1][row]==0 || cells[j-1][row]==1)
						{
							target=j-1;
							indicator=1;
						}
						else if(cells[j-1][row]==cells[i][row])
						{
							target=j-1;
							indicator=2;
							break;
						}
						else
							break;
					}
				}
				for(x=0; x<newCells.length; x++)
				{
					if(((i*110+10+"px")==newCells[x].style.left) && ((row*110+10+"px")==newCells[x].style.top) && target!=i)
					{
						running=1; //indication that this loop ran once
						break;
					}
				}
			}
		}
		if(running==1)
			return 0;
		else
			return 1;
	}
	function checkRight() {
		running=0;
			for(var row = 0; row < 4; row++)
			{
				for(var i = 2; i >= 0; i--)
				{
					var target=i;
					var indicator=0;
					if(cells[i][row]!=0)
					{
						for(j=i; j<3; j++)
						{
							if(cells[j+1][row]==1 && cells[j+2][row]==cells[i][row])
							{
								target=j+1;
								indicator=1;
								break;
							}
							else if(cells[j+1][row]==0 || cells[j+1][row]==1)
							{
								target=j+1;
								indicator=1;
							}
							else if(cells[j+1][row]==cells[i][row])
							{
								target=j+1;
								indicator=2;
								break;
							}
							else
								break;
						}
					}
					for(x=0; x<newCells.length; x++)
					{
						if(((i*110+10+"px")==newCells[x].style.left) && ((row*110+10+"px")==newCells[x].style.top) && target!=i)
						{
							running=1; //indication that this loop ran once
							break;
						}
					}
				}
			}
			if(running==1)
				return 0;
			else
				return 1;
	}
	function checkDown() {
		running=0;
			for(var col=0; col<4; col++)
			{
				for(var i=2; i>=0; i--)
				{
					var target=i;
					var indicator=0;
					if(cells[col][i]!=0)
					{
						for(j=i; j<3; j++)
						{
							if(cells[col][j+1]==1 && cells[col][j+1]==cells[col][i])
							{
								target=j+1;
								indicator=1;
								break;
							}
							else if(cells[col][j+1]==0 || cells[col][j+1]==1)
							{
								target=j+1;
								indicator=1;
							}
							else if(cells[col][j+1]==cells[col][i])
							{
								target=j+1;
								indicator=2;
								break;
							}
							else
								break;
						}
					}
					for(x=0; x<newCells.length; x++)
					{
						if(((col*110+10+"px")==newCells[x].style.left) && ((i*110+10+"px")==newCells[x].style.top) && target!=i)
						{
							running=1; //indication that this loop ran once
							break;
						}
					}
				}
			}
			if(running==1)
				return 0;
			else
				return 1;
	}
	function checkUp() {
		running=0;
			for(var col=0; col<4; col++)
			{
				for(var i=1; i<=3; i++)
				{
					var target=i;
					var indicator=0;
					if(cells[col][i]!=0)
					{
						for(j=i; j>0; j--)
						{
							if(cells[col][j-1]==1 && cells[col][j-1]==cells[col][i])
							{
								target=j-1;
								indicator=1;
								break;
							}
							else if(cells[col][j-1]==0 || cells[col][j-1]==1)
							{
								target=j-1;
								indicator=1;
							}
							else if(cells[col][j-1]==cells[col][i])
							{
								target=j-1;
								indicator=2;
								break;
							}
							else
								break;
						}
					}
					for(x=0; x<newCells.length; x++)
					{
						if(((col*110+10+"px")==newCells[x].style.left) && ((i*110+10+"px")==newCells[x].style.top) && target!=i)
						{
							running=1; //indication that this loop ran once
							break;
						}
					}
				}
			}
			if(running==1)
				return 0;
			else
				return 1;
	}
	// function removeElement(classname)
	// {
	// 	var elem = document.getElementsByClassName(classname)[0];
	// 	setTimeout(function() {elem.parentNode.removeChild(elem);}, 300);
	// }
	generateCells();
	// function checkGameOver() {
	// 	if(checkLeft() && checkRight() && checkUp() && checkDown())
	// 		confirm("Game over!");
	// }
	// if (confirm())
}
startGame();
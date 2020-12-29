const container = document.getElementById("container");


let grid = makegrid();
//let player1={turn:"true", marker:"X"};
//let player2={turn:"false", marker:"O"};

let currentmarker="X"; //if current player is X or not
let ai=false;
let gameover=false;
let xscore=0;
let oscore=0;
let ties=0;
document.getElementsByClassName("pvp")[0].addEventListener("click", function(){ai=false; clear();});
document.getElementsByClassName("ai")[0].addEventListener("click", function(){ai=true; clear(); runai();});



function clicked()
{
    if(gameover)
    {
        clear();
    }
    else if(this.innerHTML=="")
    {
        this.classList.add('mousedown');
        
        this.innerHTML=currentmarker;
        if(currentmarker=="X")
            currentmarker="O";
        else
            currentmarker="X";

        checkwin();
        if(ai && !gameover)
        {
            runai();
            checkwin();   
        }
    }
}

function checkwin()
{
    let xgrid=[];
    let ogrid=[];
    let win=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    let sum=0;
    for(var a=0; a<grid.length; a++)
    {
        if(grid[a].innerHTML=="X")
            xgrid.push(1);
        else    
            xgrid.push(0);
        if(grid[a].innerHTML=="O")
            ogrid.push(1);
        else    
            ogrid.push(0);
        if(grid[a].innerHTML!="")
            sum++;
    }
    for(var a=0; a<win.length; a++)
    {
        if(xgrid[win[a][0]]+xgrid[win[a][1]]+xgrid[win[a][2]]==3)
            {
                xscore++;
                document.getElementById("xscore").innerHTML="X: "+xscore;
                document.getElementById("xscore").classList.add("gameover");
                grid.forEach(key => key.classList.add("gameover"));
                gameover=true;
                return;
            }
        if(ogrid[win[a][0]]+ogrid[win[a][1]]+ogrid[win[a][2]]==3)
            {
                oscore++;
                document.getElementById("oscore").innerHTML="O: "+oscore;
                grid.forEach(key => key.classList.add("gameover"));
                document.getElementById("oscore").classList.add("gameover");
                gameover=true;
                return;
            }
    }
    if(sum==9)
        {
            ties++;
            document.getElementById("ties").innerHTML="Ties: "+ties;
            grid.forEach(key => key.classList.add("gameover"));
            document.getElementById("ties").classList.add("gameover");
            gameover=true;
        }
}

function makegrid()
{
    let temp=[];
    for(var x=0; x<9; x++)
    {
        let box = document.createElement("div");
        box.className="square";
        box.addEventListener('mousedown', clicked);
        box.addEventListener('mouseup', rmcolor);
        container.appendChild(box);
        temp.push(box);
    }
    return temp;
}

function clear()
{
    for(var a=0; a<grid.length; a++)
    {
        grid[a].classList.remove("gameover");
        grid[a].classList.remove("fade");
        grid[a].innerHTML="";
    }
    document.getElementById("xscore").classList.remove("gameover");
    document.getElementById("oscore").classList.remove("gameover");
    document.getElementById("ties").classList.remove("gameover");

    currentplayer=true;
    gameover=false;
}
function rmcolor()
{
    this.classList.remove('mousedown');
}

function runai()
{
    console.log("running ai");
    let emptyspots=[];
    for(var x=0; x<grid.length; x++)
    {
        if(grid[x].innerHTML=="")
            emptyspots.push(x);
    }
    let temp=emptyspots[parseInt(Math.random()*emptyspots.length)];
    grid[temp].innerHTML=currentmarker;
    grid[temp].classList.add("fade");
    if(currentmarker=="X")
        currentmarker="O";
    else    
        currentmarker="X";
}
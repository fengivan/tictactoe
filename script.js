const container = document.getElementById("container");
let grid = makegrid();
let currentplayer=true;
let gameover=false;

function clicked()
{
    if(this.innerHTML==""&& !gameover)
    {
        if(currentplayer)
            this.innerHTML="X";
        else
            this.innerHTML="O";
        currentplayer=!currentplayer;
        checkwin();
    }
}

function checkwin()
{
    let xgrid=[];
    let ogrid=[];
    let win=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
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
    }

    for(var a=0; a<win.length; a++)
    {
        if(xgrid[win[a][0]]+xgrid[win[a][1]]+xgrid[win[a][2]]==3)
            {
                window.alert("Winner is X");
                clear();
            }
        if(ogrid[win[a][0]]+ogrid[win[a][1]]+ogrid[win[a][2]]==3)
            {
                window.alert("Winner is O");
                clear();
            }
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
        container.appendChild(box);
        temp.push(box);
    }
    return temp;
}

function clear()
{
    for(var a=0; a<grid.length; a++)
        grid[a].innerHTML="";
    currentplayer=true;
    gameover=false;
}
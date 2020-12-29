const container = document.getElementById("container");
let grid = makegrid();
let currentmarker="X"; 
let ai=false;
let gameover=false;
let xscore=0;
let oscore=0;
let ties=0;

document.getElementsByClassName("pvp")[0].addEventListener("click", function(){ai=false; clear();});
document.getElementsByClassName("ai")[0].addEventListener("click", function(){ai=true; clear();});

function clicked()                          //on click, clear the board if the game is over. if not, and click is valid, mark click and run ai if ai is true;
{
    if(gameover)
        clear();
    
    else if(this.innerHTML=="")
    {
        this.classList.add('mousedown');
        if(currentmarker=="X")
            currentmarker="O";
        else
            currentmarker="X";
        this.innerHTML=currentmarker;
        
        checkwin();
        if(ai && !gameover)
        {
            runai();
            checkwin();   
        }
    }
}

function checkwin()                         //checks the status of the game, if the game is over add css effects and changes the score
{
    let status=endpos(getgrid());
    if(status==0)                                                           
        return;                           

    if(status==1)
    {
        xscore++;
        document.getElementById("xscore").innerHTML="X: "+xscore;
        document.getElementById("xscore").classList.add("gameover");
        grid.forEach(key => key.classList.add("gameover"));
        gameover=true;
    }    

    if(status==-1)
    {
        oscore++;
        document.getElementById("oscore").innerHTML="O: "+oscore;
        grid.forEach(key => key.classList.add("gameover"));
        document.getElementById("oscore").classList.add("gameover");
        gameover=true;
    }
    if(status==100)
    {
        ties++;
        document.getElementById("ties").innerHTML="Ties: "+ties;
        grid.forEach(key => key.classList.add("gameover"));
        document.getElementById("ties").classList.add("gameover");
        gameover=true;
    }
}

function makegrid()                         //makes the 3x3 grid
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

function clear()                            //clears the board for a new game
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
    currentmarker="X";
    if(ai)
    {
        if(parseInt(Math.random()*2)==0)            
        {
            currentmarker="X";
            runai();
        }
        else
            currentmarker="O";
        
    }
}
function rmcolor()                          //removes color from clicking
{
    this.classList.remove('mousedown');
}

function runai()                            //runs the ai and adds the ai's move to the grid
{
    let player=0;
    if(currentmarker=="X")
    {
        currentmarker="O";
        player=-1;
    }
    else    
    {
        currentmarker="X";
        player=1;
    }
    
    let move=getbestmove(getgrid(),player);
    grid[move].innerHTML=currentmarker;
    grid[move].classList.add("fade");
}

function getgrid()                          //returns a numerical grid with 1 for x, -1 for o, and 100 for empty spots
{
    let temp=[];
    for(var x=0; x<grid.length; x++)
    {
        if(grid[x].innerHTML=="X")
            temp.push(1);
        else if (grid[x].innerHTML=="O")
            temp.push(-1);
        else if (grid[x].innerHTML=="")
            temp.push(100);
    }
    return temp;
}

function getbestmove(board, p)              //returns the position of the best move for player p
{                 
    let possiblemoves=[];                                   //list of possible moves with equal value of bestsofar
    let bestsofar=0;                                        //value of the best move so far
    if(p==1)
        bestsofar=-Infinity;    
    else    
        bestsofar=Infinity;

    for(var x=0; x<board.length; x++)                           //find every empty spot on the board, insert player p into it, and check the value of the new board.
    {                                                           //get a list of the best board positions
        if(board[x]==100)//empty spot   
        {
            let nextboard=Array.from(board);//clone board
            nextboard[x]=p;//insert p into cloned board
            let val=value(nextboard, p*-1, 0);
            if(p==-1)
            {
                if(val<bestsofar)
                {
                    possiblemoves=[x];
                    bestsofar=val;
                }
                else if(val==bestsofar)
                {
                    possiblemoves.push(x);
                }
            }
            if(p==1)
            {
                if(val>bestsofar)
                {
                    possiblemoves=[x];
                    bestsofar=val;
                }
                else if(val==bestsofar)
                {
                    possiblemoves.push(x);
                }
            }
        }
    }
    return possiblemoves[parseInt(Math.random()*possiblemoves.length)];         //returns any of the possible equally valued moves
}

function value(board, p, depth)             ///returns the best value of the board if it's player p's move; value of 1 is x winning, -1 is x losing, and 0 is a tie.
{                                                                                           //value is defined as 1 for x winning, -1 for o winning, 0 for tie
    let result=endpos(board);//1 is x wins, -1 for o win, 100 for tie, 0 for game not over
    if(result!=0)    //if the game IS over (win or tie condition)
    {
        if(result==100)  //if this board is a tie condition, the value of this board is 0
            return 0;
        return result;   //returns the result of the board
    }            
    
    if(p==1)                                               //current player is x
    {
        let v=-Infinity;
        for(var a=0; a<board.length; a++)
        {
            if(board[a]==100)                           //if the current spot is empty
            {
                let temp=Array.from(board);             //make a copy of the board
                temp[a]=1;                              //set the current spot to the current marker
                let temp2=value(temp,-1, depth+1);   //gets the value of board if the current marker was placed on the current spot
                v=Math.max(v, temp2);           //if this value is higher than the max value so far, a new best move has been found for player X
            }
        }
        return v;                                   //returns the maximum possible value of this board 
    }
    else                                                //current player is y
    {
        let v=Infinity;                             
        for(var a=0; a<board.length; a++)   
        {
            if(board[a]==100)                           //if the current spot is empty
            {
                let temp=Array.from(board);             //make a copy of the board
                temp[a]=-1;                             //set the current spot to the current marker
                let temp2=value(temp, 1, depth+1);//gets the value of board if the current marker was placed on the current spot
                v=Math.min(v, temp2);           //if this value is lower than the min value so far, a new best move has been found for player O
            }
        }
        return v;
    }
}

function endpos(board)                      //returns if the game is over or not. 1 is x wins, -1 for o win, 100 for tie, 0 for game not over
{
    let win=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    let sum=0;
    
    for(var a=0; a<win.length; a++)
        if(board[win[a][0]]+board[win[a][1]]+board[win[a][2]]==3)
            return 1                    
        else if(board[win[a][0]]+board[win[a][1]]+board[win[a][2]]==-3)
            return -1

    for(var a=0; a<board.length; a++)
        sum+=board[a];

    if(sum<90)          //no 100(empty spot) on the board
        return 100;

    return 0;           //game not over yet
}


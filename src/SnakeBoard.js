import React, {useState, useRef, useEffect} from 'react';
import './SnakeBoard.css'
import Blank from './Blank.png'
import Snake from './Snake.png'
import Food from './Food.png'
import Head from './Head.png'


const SnakeBoard = (props) => {

    let initialRows = [];  
    
    let horSize = 10;
    let verSize = 10;

    horSize = props.horSize === '' || props.horSize === undefined ? horSize : props.horSize;
    verSize = props.verSize === '' || props.verSize === undefined ? verSize : props.verSize;
    

    for (let i=0; i<verSize; i++){
        initialRows.push([]);
        for (let k=0; k<horSize; k++){
            initialRows[i].push('blank');
        }
    }


    const [rows, setRows] = useState(initialRows);
    const displayRows = rows.map(x =>    
        <li>
            {  x.map(y =>{
                    switch(y) {
                        case 'blank':
                            return <img className="Grid" src={Blank}/>
                        case 'snake':
                            return <img className="Grid" src={Snake}/>
                        case 'food':
                            return <img className="Grid" src={Food}/>
                        case 'head':
                            return <img className="Grid" src={Head}/>
                    }
                })
            }
        </li>   
        );

        
    const [snake, setSnake] = useState( [ {x:0,y:0} ] );
    //const [count, setCount] = useState(0);

    const displaySnake = () => {
        const newRows = initialRows;
        snake.forEach(cell => {
            newRows[cell.x][cell.y] = 'snake';    
        });
        newRows[food.x][food.y] = 'food';
        newRows[snake[0].x][snake[0].y] = 'head';
        setRows(newRows);
        //setCount(2);
        //console.log('testpoint3');
    }
    
    
    const [direction, setDirection] = useState('right');
    
    const moveSnake = () => {
        //console.log('testpoint');
        const newSnake = [];
        switch(direction) {
            case 'right':
                newSnake.push({x: snake[0].x, y: (snake[0].y + 1)%horSize});
                //console.log('testpoint2')
                break
            case 'left':
                newSnake.push({x: snake[0].x, y: (snake[0].y - 1) < 0 ? (horSize-1) : (snake[0].y - 1)%horSize})
                break
            case 'up':
                newSnake.push({x: (snake[0].x - 1) < 0 ? (verSize-1) : (snake[0].x - 1)%verSize, y: snake[0].y})
                break
            case 'down':
                newSnake.push({x: (snake[0].x + 1)%verSize, y: snake[0].y})
                break
        }
        if(snake.length !== 1){
            for(let i=0 ; i < snake.length - 1; i++){
                newSnake.push(snake[i])
            }
        }
        

        foodIsEaten(newSnake);

        setSnake(newSnake);

        displaySnake();    
    }

    /* 
    if(expression)
        return true; 
    else 
    return false; 
    
    expression ? 1 : 2; 

    (snake[0].y - 1) < 0 ? 10 : (snake[0].y - 1)%10} 
    
    */

    
    function useInterval(callback, delay) { //Fonction toute faite pour créer un appel à un certain interval
        const savedCallback = useRef();

        // Remember the latest callback.
        useEffect(() => {
            savedCallback.current = callback;
            }, [callback]);

        // Set up the interval.
        useEffect(() => {
            function tick() {
            savedCallback.current();
            }
        
            if (delay !== null) {
                let id = setInterval(tick, delay);
                return () => clearInterval(id);
            }
        
        }, [delay]);
    }

    const isTheOppositeDirection = (e) => {

        if( (e === 37 && direction === 'right') ||
            (e === 39 && direction === 'left') ||
            (e === 38 && direction === 'down') ||
            (e === 40 && direction === 'up') ){
                return true;
            }
        else{
                return false;
        }   
    }

    const changeDirectionWithKeys = (e) => {
    
        if(isTheOppositeDirection(e.keyCode)){
          //setDirection(direction); FONCTIONNE AVEC ET SANS JE COMPRENDS PAS PQ 
        }
        else{
            console.log('trigger');
            switch(e.keyCode) {
                case 37:
                    setDirection('left');
                    break;
                case 39:
                    setDirection('right');
                    break;
                case 38:
                    setDirection('up');
                    break;
                case 40:
                    setDirection('down');
                    break;
                default:
                    break;
            }       
        }      
    }
    
    const randomPosition = () => {

        let position = {
            x: Math.floor(Math.random()*verSize),
            y: Math.floor(Math.random()*horSize)
        };

        /*
        console.log('position générée:');
        console.log(position);
        console.log(snake);*/

        /*let foodOnSnake; = snake.some(cell => 
            (cell.x === position.x && cell.y === position.y));
        */
        
        let i;

        for(i=0; i<snake.length; i++){
            if(snake[i].x === position.x && snake[i].y === position.y)
                return randomPosition();
            else{}
        }

        return position;
        
    }
        

    const [food, setFood] = useState(randomPosition);
    const foodIsEaten = (newSnake) => {
        if (newSnake[0].x === food.x && newSnake[0].y === food.y){
            newSnake.push(newSnake[newSnake.length-1]);
            setFood(randomPosition);
            //console.log('dans foodiseaten:')
            //console.log(food);
        }
    }

    //if(rows.length != props.horSize){
    //    setFood(randomPosition)
    //}
    

    const gameOver = () => {

        /* let result = snake.some(cell =>
            (cell.x === snake[0].x && cell.y === snake[0].y)); */
        let i; 

        if(snake.length < 3){
            return false; 
        }
        for(i=1;i<snake.length;i++){
            if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
               console.log("in true"); 
                return true; 
            }
        }   
        return false; 
    }

    
    useEffect(() => {
        window.addEventListener('keydown', changeDirectionWithKeys, false)
          // cleanup this component
    return () => {
        window.removeEventListener('keydown', changeDirectionWithKeys);
      };
    }, [snake]);


    const [inter, setInter] = useState();

    useEffect(() => {
        setFood(randomPosition());
        setSnake([ {x:0,y:0} ] );
        setInter(181);
        return () => {
        
        };
    }, [horSize, verSize, gameOver()]);

   

   
    useInterval(moveSnake, inter);
    useEffect(() => {
        if(props.hardcore !== undefined && props.hardcore !== false)
            setInter(inter-30);
        return () => {
            
        };
    }, [snake.length]);
    

    
    
    return(
        <div>
            {displayRows}
        </div>
    )
}

export default SnakeBoard;
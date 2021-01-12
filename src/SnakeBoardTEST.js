import React, {useState, useRef, useEffect} from 'react';
import './SnakeBoard.css'
import Blank from './Blank.png'
import Snake from './Snake.png'

const SnakeBoard = () => {

    let initialRows = [];
    

    for (let i=0; i<10; i++){
        initialRows.push([]);
        for (let k=0; k<10; k++){
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
                    }
                })
            }
        </li>   
        );

        
    const [snake, setSnake] = useState( [ {x:0,y:0}, {x:1,y:0} ] );
    //const [count, setCount] = useState(0);

    const displaySnake = () => {
        const newRows = initialRows;
        snake.forEach(cell => {
            newRows[cell.x][cell.y]='snake';    
        });
        setRows(newRows);
        //setCount(2);
        //console.log('testpoint3');
    }
    
    
    const [direction, setDirection] = useState('left');
    
    const moveSnake = () => {
        //console.log('testpoint');
        const newSnake = [];
        switch(direction) {
            case 'right':
                newSnake.push({x: snake[0].x, y: (snake[0].y + 1)%10});
                //console.log('testpoint2')
                break
            case 'left':
                newSnake.push({x: snake[0].x, y: (snake[0].y - 1) < 0 ? 9 : (snake[0].y - 1)%10})
                break
            case 'up':
                newSnake.push({x: (snake[0].x - 1) < 0 ? 9 : (snake[0].x - 1)%10, y: snake[0].y})
                break
            case 'down':
                newSnake.push({x: (snake[0].x + 1)%10, y: snake[0].y})
                break
        }
        if(snake.length !== 1){
            for(let i=0 ; i < snake.length - 1; i++){
                newSnake.push(snake[i])
            }
        }
        /* console.log('valeur de newSnake:')
        console.log(newSnake[0]); */
        setSnake(newSnake);
        /* console.log('dans la fonction:')
        console.log(snake);*/ 
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

    //Fonction toute faite pour créer un appel à un certain interval
    function useInterval(callback, delay) {
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

    
    useEffect(() => {
        window.addEventListener('keydown', changeDirectionWithKeys, false);

          // cleanup this component
    return () => {
        window.removeEventListener('keydown', changeDirectionWithKeys);
      };
    }, [direction]);

    useInterval(moveSnake, 100);
    console.log(direction);

    
    
    return(
        <div>
            {displayRows}
        </div>
    )
}

export default SnakeBoard;
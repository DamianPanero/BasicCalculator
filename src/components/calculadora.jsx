import { useState } from "react"
import Delete from "./delete";
import OperationButton from "./operationButton";
import Equals from "./equals";

export default function Calculadora(){
    const [number,setNumber]=useState("");
    const [accumulated,setAccumulated]=useState(null);
    const [operation,setOperation]=useState(null);

    const numbers={
        "0":0,
        "1":1,
        "2":2,
        "3":3,
        "4":4,
        "5":5,
        "6":6,
        "7":7,
        "8":8,
        "9":9
    }
    const handleNumberClick=(e)=>{
        setNumber((prev)=>prev + e.target.innerText)
    }

    const handleDelete=()=>{
        setNumber((prev)=>prev.slice(0,-1))
    }

    const handleOperationButton=(op)=>{
        if(number!==""){
            if(operation && accumulated!==null){
                const result=performOperation(parseFloat(accumulated),parseFloat(number),operation);
                setAccumulated(result.toString())
            }else{
                setAccumulated(number)
            }
            setNumber("");
            setOperation(op);
        }else if(setAccumulated !== null){
            setOperation(op);
        }   
    }

    const performOperation=(num1,num2,op)=>{
        switch(op){
            case "+":
                return num1 + num2;
            case "-":
                return num1-num2;
            case "*":
                return num1*num2;
            case "/":
                return num1/num2;
            default:
                return num2;
        }
        
    }
    const handleEqualsButton=()=>{
        if(number!=="" && accumulated !==null && operation){
            const result=performOperation(parseFloat(accumulated),parseFloat(number),operation)
            setNumber(result.toString());
            setAccumulated(null);
            setOperation(null);
        }
    }
    return(
        <div className="calculadora">
            <input type="text" placeholder="0" readOnly value={number}/>
            <div className="keys">
                <div className="numbers">
                    {Object.keys(numbers).map((num)=>(
                        <button key={num} onClick={handleNumberClick}>{num}</button>
                    ))}
                </div>
                <div className="symbols">
                    <Delete onDelete={handleDelete}/>
                    <button onClick={()=>setNumber("")}>AC</button>
                    <OperationButton onClick={handleOperationButton} operation="+"/>
                    <OperationButton onClick={handleOperationButton} operation="-"/>
                    <OperationButton onClick={handleOperationButton} operation="*"/>
                    <OperationButton onClick={handleOperationButton} operation="/"/>
                    <Equals onEqual={handleEqualsButton}/>
                </div>
            </div>
        </div>
    )
}
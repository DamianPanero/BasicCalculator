
export default function OperationButton({operation,onClick}){
    return(
        <button onClick={()=>onClick(operation)}>{operation}</button>
    )
}
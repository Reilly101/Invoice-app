

export default function Row({ data, select}){
    return (
        <div className="row">
            <div className="number">{data.id}</div>
            <div className="datecreated">Due {new Date(data.paymentDue).toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</div>
            <div className="nameinvoice">{data.clientName}</div>
            <div className="amoutdue">{data.total}</div>
            <div className="status"> {data.status}</div>
            <img src="Path 5.png" className="arrow" onClick ={select}/>
        </div>
    )
}
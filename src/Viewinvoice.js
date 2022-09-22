import App from "./App.js";

export default function Viewinvoice({ item, setView,setShow }) {
    
    return (
        <div>
            <div className="gobackcontainer">
                <svg width="6" height="11" viewBox="0 0 6 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.3418 0.886047L0.113895 5.11395L4.3418 9.34185" stroke="#7C5DFA" stroke-width="2" />
                </svg>
                <div className="font12" onClick = {()=>setView(null)}>Go Back</div>
            </div>
            <div className="invoicecontainer">
                <div className="top">
                    <div className="invoicestatus">
                        <div className="statustext">Status</div>
                        <div className="statustype">{item.status}</div>
                        <button className="edit" onClick={()=>setShow(true)}>Edit</button>
                        <button className="delete">Delete</button>
                        <button className="markpaid">Mark as Paid</button>
                    </div>
                </div>
                <div className="invoicepage">
                    <div className="d-flex">
                        <div className="invoicenumber">
                            <div className="font16">{item.id}</div>
                            <div className="greytext">{item.description}</div>
                        </div>
                        <div className="addressbox">
                            <div className="greytext">{item.senderAddress.street}</div>
                            <div className="greytext">{item.senderAddress.city}</div>
                            <div className="greytext">{item.senderAddress.postCode}</div>
                            <div className="greytext">{item.senderAddress.country}</div>
                        </div>
                    </div>
                    <div className='d-flex'>
                        <div>
                            <div className="greytext">Invoice Date</div>
                            <div className="font15">{item.createdAt}</div>
                            <div className="greytext"> Payment Due</div>
                            <div className="font15">{item.aymentDue}</div>
                        </div>
                        <div className="billinfo">
                            <div className="greytext">Bill To</div>
                            <div className="font15">{item.clientName}</div>
                            <div className="greytext">{item.clientAddress.street}</div>
                            <div className="greytext">{item.clientAddress.city}</div>
                            <div className="greytext">{item.clientAddress.postcode}</div>
                            <div className="greytext">{item.clientAddress.country}</div>
                        </div>
                        <div className="emailbox">
                            <div className="greytext">Sent to</div>
                            <div className="font15">{item.clientEmail}</div>
                        </div>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th className='greytext'>Item Name</th>
                                <th className='greytext'>QTY.</th>
                                <th className='greytext'>Price</th>
                                <th className='greytext'>Total</th>
                            </tr>
                        </thead>

                        <tbody>
                            {item.items.map(row =>
                                <tr>
                                    <td className='font12'>{row.name}</td>
                                    <td className='greytext'>{row.quantity}</td>
                                    <td className='greytext'>{row.price}</td>
                                    <td className='font12'>{row.total}</td>

                                </tr>
                            )}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td className='amountdue'>Amount Due</td>
                                <td className='grandtotal'>{item.total}</td>
                            </tr>

                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    );
}

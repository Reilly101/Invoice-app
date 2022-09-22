import React, { useState } from "react";
import db from "./data.json";
import "./App.css";
import Row from "./Row";
import Viewinvoice from "./Viewinvoice";
import FilterByStatus from "./FilterByStatus";
import CreateNewInvoiсe from "./CreateNewInvoice";


export default function App() {
  let [view, setView] = useState(null);
  let data = db[0];
  let [selected, setSelected] = useState(false);
  let [show, setShow] = useState(false)
  let [invoices, setInvoices] = useState(db)

  function createNewInvoice(newInvoice) {
    invoices.push(newInvoice)
    setInvoices([...invoices])
  }

  function updateInvoice(invoice){
    let index = invoices.findIndex(inv=>inv.id===invoice.id)
    invoices[index] = invoice
    setView(invoice)
    setInvoices([...invoices])
  }


  return (
    <>
      {show && <CreateNewInvoiсe
        setShow={setShow}
        createNewInvoice={view?updateInvoice:createNewInvoice}
        initialInputs={view || { items: [] } }
      />}


      <div className="screen">
        <div className="leftrectangle">
          <img src="Group 9-2.png" className="logo" />
          <div className="bottomleft">
            <img src="Path-2.png" className="moon" />
            <img src="Oval-6.png" className="face" />
          </div>
        </div>
        {view ? (
          <Viewinvoice item={view}
            setView={setView}
            setShow={setShow}
          />
        ) : (
          <div className="main_container">
            <div className="invoicesdata">
              <div>
                <div className="invoices">Invoices</div>
                <div className="totalnumber">There are 7 total invoices</div>
              </div>
              <FilterByStatus selected={selected} setSelected={setSelected} />
              <button className="purplebutton" onClick={() => setShow(true)}>
                <img src="Group 3-2.png" />
                New Invoice
              </button>
            </div>

            <div className="invoice_middle_box">
              {invoices.filter(element => {
                if (selected) {
                  return selected == element.status
                } else {
                  return true
                }
              }).map((item) => (
                <Row key={item.id} data={item} select={() => setView(item)} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

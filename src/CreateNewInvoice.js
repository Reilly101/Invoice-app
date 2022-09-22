import { useState } from "react";

export default function CreateNewInvoiсe({ setShow, createNewInvoice, initialInputs}) {
  let [inputs, setInputs] = useState(simplifying(initialInputs));

  function simplifying(obj){
    let newObj={}
    for(let key in obj){
      if(['clientAddress','senderAddress'].includes(key)){
        for(let subKey in obj[key]){
          newObj[`${key}.${subKey}`] = obj[key][subKey]
        }
      }else{
        newObj[key] = obj[key]
      }
    }
    return newObj
  }

  function handleChange(e) {
    let { name, value } = e.target;
    inputs[name] = value;

    console.log(inputs);
    setInputs({ ...inputs });
  }

  function handleInputsChange(e, index) {
    let { name, value } = e.target;
    inputs.items[index][name] = value;
    let total = inputs.items[index].price * inputs.items[index].quantity;
    if (total) {
      inputs.items[index].total = total;
    }
    inputs.total = inputs.items.reduce((totals, item) => {
      totals += item.total;
      return totals;
    }, 0);
    console.log(inputs);
    setInputs({ ...inputs });
  }

  function handleSave() {
    let newInvoice = {};
    inputs.status = "pending";
    for (let key in inputs) {
      if (key.includes(".")) {
        let [key1, key2] = key.split(".");
        if (newInvoice[key1]) {
          newInvoice[key1][key2] = inputs[key];
        } else {
          newInvoice[key1] = {
            [key2]: inputs[key],
          };
        }
      } else {
        newInvoice[key] = inputs[key];
      }
    }
    let createdAtDate = new Date(inputs.createdAt);
    createdAtDate.setDate(createdAtDate.getDate() + +inputs.paymentTerms);
    
    newInvoice.paymentDue = createdAtDate;
    setShow(false);
    createNewInvoice(newInvoice);
  }
  function handleSaveDraft() {
    let newInvoice = {};
    inputs.status = "draft";
    for (let key in inputs) {
      if (key.includes(".")) {
        let [key1, key2] = key.split(".");
        if (newInvoice[key1]) {
          newInvoice[key1][key2] = inputs[key];
        } else {
          newInvoice[key1] = {
            [key2]: inputs[key],
          };
        }
      } else {
        newInvoice[key] = inputs[key];
      }
    }
    let createdAtDate = new Date(inputs.createdAt);
    createdAtDate.setDate(createdAtDate.getDate() + +inputs.paymentTerms);
    
    newInvoice.paymentDue = createdAtDate;
    setShow(false);
    createNewInvoice(newInvoice);
  }

  function handleDiscard() {
    setShow(false);

  }
  function handleDelete (index) {
    inputs.items.splice(index, 1)
    setInputs({ ...inputs });
  }
  return (
    <div className="containerinvoice">
      <div className="newinvoicebox">
        <div className="titilenew">New Invoice</div>
        <div>Bill From</div>

        <div className="input">
          <div>Street address</div>
          <input
            name="senderAddress.street"
            className="inputstreet"
            value={inputs["senderAddress.street"]}
            onChange={handleChange}
          />
        </div>

        <div className="flex-row">
          <div className="input">
            <div>City</div>
            <input
              name="senderAddress.city"
              value={inputs["senderAddress.city"]}
              className="inputcity"
              onChange={handleChange}
            />
          </div>
          <div className="input">
            <div>Post Code</div>
            <input
              name="senderAddress.postCode"
              value={inputs["senderAddress.postCode"]}
              className="inputpostcode"
              onChange={handleChange}
            />
          </div>
          <div className="input">
            <div>Country</div>
            <input
              name="senderAddress.country"
              value={inputs["senderAddress.country"]}
              className="inputcountry"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="billto">
          Bill to
          <div className="input">
            <div>client`s Name</div>
            <input
              name="clientName"
              value={inputs["clientName"]}
              className="nameinput"
              onChange={handleChange}
            />
          </div>
          <div className="input">
            <div>Client`s Email</div>
            <input
              name="clientEmail"
              value={inputs["clientEmail"]}
              className="emailinput"
              onChange={handleChange}
            />
          </div>
          <div className="input">
            <div>Street Address</div>
            <input
              name="clientAddress.street"
              value={inputs["clientAddress.street"]}
              className="addressinput"
              onChange={handleChange}
            />
          </div>
          <div className="flex-row">
            <div className="input">
              <div>City</div>
              <input
                name="clientAddress.city"
                value={inputs["clientAddress.city"]}
                className="clcityinput"
                onChange={handleChange}
              />
            </div>
            <div className="input">
              <div>Post Code</div>
              <input
                name="clientAddress.postCode"
                value={inputs["clientAddress.postCode"]}
                className="clpostcodeinput"
                onChange={handleChange}
              />
            </div>
            <div className="input">
              <div>Cuntry</div>
              <input
                name="clientAddress.country"
                value={inputs["clientAddress.country"]}
                className="clcountryinput"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex-row">
            <div className="input">
              <div>Invoice Date</div>
              <input
                name="createdAt"
                value={inputs["createdAt"]}
                className="invoicedateinput"
                onChange={handleChange}
                type="date"
              />
            </div>
            <div className="input">
              <div>Payment Terms</div>
              <input
                name="paymentTerms"
                value={inputs["paymentTerms"]}
                className="paymenttermsinput"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="input">
            <div>Project Description</div>
            <input
              name="description"
              value={inputs["description"]}
              className="projectdescriptioninput"
              onChange={handleChange}
            />
          </div>
          <div className="itemlisttitle">Item List</div>
          <div className="flex-row">
            <div className="itemlist">
              <div className="itemname">Item Name</div>
              <div className="itemqty">Qty.</div>
              <div className="itemprice">Price</div>
              <div className="itemtotal">Total</div>
            </div>
          </div>
          {inputs.items.map((item, index) => (
            <div className="flex-row">
              <div className="input">
                <input
                  name="name"
                  value={inputs["items"][index]["name"]}
                  className="invoicedateinput"
                  onChange={(e) => handleInputsChange(e, index)}
                />
              </div>
              <div className="input">
                <input
                  name="quantity"
                  value={inputs["items"][index]["quantity"]}
                  className="paymenttermsinput"
                  onChange={(e) => handleInputsChange(e, index)}
                />
              </div>
              <div className="input">
                <input
                  name="price"
                  value={inputs["items"][index]["price"]}
                  className="paymenttermsinput"
                  onChange={(e) => handleInputsChange(e, index)}
                />
              </div>
              <div className="input">
                <div>
                  {inputs["items"][index]["quantity"] *
                    inputs["items"][index]["price"]}
                </div>
              </div>

              <svg
                width="13"
                height="16"
                viewBox="0 0 13 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                onClick={()=>handleDelete(index)}
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M8.47225 0L9.36117 0.888875H12.4722V2.66667H0.027832V0.888875H3.13892L4.02783 0H8.47225ZM2.6945 16C1.71225 16 0.916707 15.2045 0.916707 14.2222V3.55554H11.5834V14.2222C11.5834 15.2045 10.7878 16 9.80562 16H2.6945Z"
                  fill="#888EB0"
                />
              </svg>
            </div>
          ))}
          <div
            className="addnewitem"
            onClick={() => {
              inputs.items.push({
                name: "",
                quantity: 0,
                price: 0,
              });
              setInputs({ ...inputs });
            }}
          >
            + Add New Item{" "}
          </div>
        </div>
        <div className="footer">
          <div className="discard" onClick={handleDiscard}>Discard</div>
          <button className="savedraft" onClick={handleSaveDraft}>
            Save as Draft
          </button>
          <button className="savesend" onClick={handleSave}>
            Save & Send
          </button>
        </div>
      </div>
    </div>
  );
}

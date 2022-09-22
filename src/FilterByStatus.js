import { useState } from "react";

export default function FilterByStatus({ selected, setSelected }) {
  let [statuses, setStatuses] = useState(["paid", "pending", "draft"]);
  let [show, setShow] = useState(false);

  return (
    <>
      <div className="filterbystatus">
        Filter by status
        <img
          src="Path 2-2.png"
          className="arrowdown"
          onClick={() => setShow(!show)}
        />
      </div>
      <div>
        {show &&
          statuses.map((status) => (
            <div
              className={selected == status ? "selected" : ""}
              onClick={() =>
                setSelected((previousSelected) => 
                  previousSelected === status ? "" : status
                )
              }
            >
              {" "}
              {status}
            </div>
          ))}
      </div>
    </>
  );
}

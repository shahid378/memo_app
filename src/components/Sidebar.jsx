import React from 'react';
import { useState } from 'react';
import { FaInbox, FaRegCalendarAlt, FaRegCaretSquareDown } from "react-icons/fa";

const Sidebar = ({ selectedTab, setselectedTab }) => {
    const [classactive, setclassactive] = useState("")
    return (
        <div className="sidebar">
            <div className={classactive} onClick={() => { setselectedTab("INBOX"); setclassactive("active")}}>
                <FaInbox className="icon" />
                Inbox
            </div>
            <div className={classactive} onClick={()=>{setselectedTab("TODAY"); setclassactive("active")}}>
                <FaRegCalendarAlt className="icon"/>
                Today                
            </div>
            <div className={classactive} onClick={()=>{setselectedTab("NEXT_7"); setclassactive("active")}}>
                <FaRegCaretSquareDown className="icon" />
                Next 7 days
            </div>
        </div>
    )
}

export default Sidebar

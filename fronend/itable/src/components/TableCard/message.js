import React from 'react';
import index from  './index.css'
const Message = (props) => {
    const {teamData}=props
    const team1=teamData.split(',')[1].split('vs')[0].split(' ')[2]
    const team2=teamData.split(',')[1].split('vs')[1].split(' ')[2]
    return (
        <div style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}>
            {/* <div style={{ textAlign: "center", marginBottom: "4px", }} className="border">第n桌</div> */}
            <div style={{ textAlign: "center" }} className={index.flexRow} >
                <span  style={{maxWidth:"100px",display:"inline-block"}}>{team1}</span>
                <span style={{ color: "red", fontWeight: "500", fontSize: "20px"}}>vs</span>
                <span style={{maxWidth:"100px",display:"inline-block"}}>{team2}</span>
                {/* {<span style={{right:"0",cursor:"pointer",color:"red",position:"absolute"}}>详情</span>} */}
            </div>
        </div>
    )
}
export default React.memo(Message)
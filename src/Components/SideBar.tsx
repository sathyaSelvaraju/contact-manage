// Sidebar.tsx
import { Divider } from "antd";
import React from "react";
import { Link } from "react-router-dom";

function SideBar() {
  return (
    <>
     <div className="Side-Bar">
              <Link to="/" style={{color:'#fff'}}>
                  Contact
              </Link>
          </div>
          <Divider style={{background:'#fff'}}/>
    <div className="Side-bar">
          <Link to="/charts" style={{color:'#fff'}}>
               Maps
          </Link>
      </div>
      <Divider style={{background:'#fff'}}/>
      <div className="Side-bar">
          <Link to="/maps" style={{color:'#fff'}}>
          Charts
          </Link>
      </div>
      <Divider style={{background:'#fff'}}/>
    </>
  );
}

export default SideBar;

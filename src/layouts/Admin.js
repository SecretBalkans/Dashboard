import React from "react";
import { Routes, Route } from "react-router-dom";

import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import HeaderStats from "components/Headers/HeaderStats.js";
// import FooterAdmin from "components/Footers/FooterAdmin.js";

import Dashboard from "views/admin/Dashboard.js";
import Tables from "views/admin/Tables.js";
// import Maps from "views/admin/Maps.js";
// import Settings from "views/admin/Settings.js";

const Admin = () => {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <AdminNavbar />
        {/* Header */}
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <Routes>
            <Route path="/admin/dashboard" exact element={<Dashboard />} />
            {/* <Route path="/admin/maps" exact component={Maps} /> */}
            {/* <Route path="/admin/settings" exact component={Settings} /> */}
            <Route path="/admin/tables" exact element={<Tables />} />
            <Route path="/admin" element={<Dashboard />} />
          </Routes>
          {/* <FooterAdmin /> */}
        </div>
      </div>
    </>
  );
};

export default Admin;

import React from "react";
import { Routes, Route } from "react-router-dom";

import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import HeaderStats from "components/Headers/HeaderStats.js";

import Dashboard from "views/admin/Dashboard.js";
import Balances from "views/admin/Balances.js";
import RunLogs from "views/admin/RunLogs.js";

const Admin = () => {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <AdminNavbar />
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <Routes>
            <Route path="/admin/dashboard" exact element={<Dashboard />} />
            <Route path="/admin/balances" exact element={<Balances />} />
            <Route path="/admin/runlogs" exact element={<RunLogs />} />
            <Route path="/admin" element={<Dashboard />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default Admin;

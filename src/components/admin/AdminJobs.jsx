import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import AdminJobsTable from "./AdminJobsTable";
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs";
import { setSearchJobByText } from "@/redux/jobSlice";

const AdminJobs = () => {
  useGetAllAdminJobs();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input]);
  return (
    <div>
      <Navbar />
      <div className="max-w-6xl my-10 mx-auto"></div>
      <div className="flex items-center justify-between mx-20 my-5">
        <Input
          className="w-fit"
          placeholder="Filter by name,role"
          onChange={(e) => setInput(e.target.value)}
        />
        <Button
          onClick={() => navigate("/admin/jobs/create")}
          className="cursor-pointer"
        >
          New Job
        </Button>
      </div>
      <AdminJobsTable />
    </div>
  );
};

export default AdminJobs;

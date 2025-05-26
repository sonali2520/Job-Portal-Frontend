import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";
import useGetAllCompanies from "@/hooks/useGetAllCompanies";
import { useDispatch } from "react-redux";
import { setSearchCompanyByText } from "@/redux/companySlice";

const Companies = () => {
  useGetAllCompanies();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
  }, [input]);
  return (
    <div>
      <Navbar />
      <div className="max-w-6xl my-10 mx-auto"></div>
      <div className="flex items-center justify-between mx-20 my-5">
        <Input
          className="w-fit"
          placeholder="Filter by name"
          onChange={(e) => setInput(e.target.value)}
        />
        <Button
          onClick={() => navigate("/admin/companies/create")}
          className="cursor-pointer"
        >
          New Company
        </Button>
      </div>
      <CompaniesTable />
    </div>
  );
};

export default Companies;

import React, { useEffect } from "react";
import Navbar from "../shared/Navbar";
import ApplicantsTable from "./ApplicantsTable";
import axios from "axios";
import { APP_API_END_POINT } from "../utils/constant";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setApplicants } from "@/redux/appSlice";

const Applicants = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { applicants } = useSelector((store) => store.app);
  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(`${APP_API_END_POINT}/get/${params.id}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setApplicants(res.data.job));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllApplicants();
  }, []);
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl ml-20 mr-25">
        <h1 className="font-bold text-xl my-4">
          Applicants {applicants?.applications?.length}
        </h1>
        {applicants?.applications?.length === 0 ? (
          <span>No applicant applied for this job</span>
        ) : (
          <ApplicantsTable />
        )}
      </div>
    </div>
  );
};

export default Applicants;

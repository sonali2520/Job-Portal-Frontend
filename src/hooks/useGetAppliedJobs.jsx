import { APP_API_END_POINT } from "@/components/utils/constant";
import { setAppliedJobs } from "@/redux/jobSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAppliedJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllAppliedJobs = async () => {
      try {
        const res = await axios.get(`${APP_API_END_POINT}/appliedjobs`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setAppliedJobs(res.data.appliedJobs));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllAppliedJobs();
  }, []);
};

export default useGetAppliedJobs;

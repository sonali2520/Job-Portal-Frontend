import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent } from "../ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { APP_API_END_POINT } from "../utils/constant";

const shortlistingStatus = ["accepted", "rejected"];

const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.app);

  const statusHandler = async (status, id) => {
    try {
      const res = await axios.put(
        `${APP_API_END_POINT}/update/${id}`,
        { status },
        { withCredentials: true }
      );
      console.log(res.data);
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Table>
        <TableCaption>A list of recent applicants</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Full Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicants &&
            applicants?.applications.map((item) => (
              <tr key={item._id}>
                <TableCell>{item.applicant.fullname}</TableCell>
                <TableCell>{item.applicant.email}</TableCell>
                <TableCell>{item.applicant.phoneNumber}</TableCell>
                <TableCell>
                  {item.applicant?.profile?.resume ? (
                    <a
                      className="text-blue-600"
                      href={item.applicant.profile.resume}
                      target="_blank"
                    >
                      {item.applicant.profile.resumeOriginalName}
                    </a>
                  ) : (
                    <span>NA</span>
                  )}
                </TableCell>
                <TableCell>{item.applicant.createdAt.split("T")[0]}</TableCell>
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger asChild>
                      <div className="flex justify-end cursor-pointer">
                        <MoreHorizontal />
                      </div>
                    </PopoverTrigger>
                    <PopoverContent className="w-32 cursor-pointer">
                      {shortlistingStatus.map((status, index) => {
                        return (
                          <div
                            key={index}
                            onClick={() => statusHandler(status, item._id)}
                          >
                            <span>{status}</span>
                          </div>
                        );
                      })}
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </tr>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;

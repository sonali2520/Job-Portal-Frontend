import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import { useSelector } from "react-redux";

const AppliedJobsTable = () => {
  const { appliedJobs } = useSelector((store) => store.job);
  return (
    <div>
      <Table>
        <TableCaption>List of jobs you have applied</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {appliedJobs.length <= 0 ? (
            <span>You haven't applied for any job yet</span>
          ) : (
            appliedJobs.map((appliedJob) => {
              return (
                <TableRow key={appliedJob._id}>
                  <TableHead>{appliedJob?.createdAt.split("T")[0]}</TableHead>
                  <TableHead>{appliedJob?.job?.title}</TableHead>
                  <TableHead>{appliedJob?.job?.company?.name}</TableHead>
                  <TableHead className="text-right">
                    <Badge
                      className={`${
                        appliedJob.status === "rejected"
                          ? "bg-red-600"
                          : appliedJob.status === "pending"
                          ? "bg-gray-600"
                          : "bg-green-800"
                      }`}
                    >
                      {appliedJob?.status.toUpperCase()}
                    </Badge>
                  </TableHead>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobsTable;

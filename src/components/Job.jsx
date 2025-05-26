import React from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const Job = ({ job }) => {
  const navigate = useNavigate();
  const jobId = job._id;

  const daysAgoFunc = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currTime = new Date();
    const timeDiff = (currTime - createdAt) / (1000 * 24 * 60 * 60);
    return Math.floor(timeDiff);
  };
  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-200">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          {daysAgoFunc(job?.createdAt) == 0
            ? "Today"
            : `${daysAgoFunc(job?.createdAt)} days ago`}
        </p>
        <Button
          variant="outline"
          className="rounded-full border border-gray-50"
          size="icon"
        >
          <Bookmark />
        </Button>
      </div>

      <div className="flex items-center gap-2 my-2">
        <Button className="p-6" variant="outline" size="icon">
          <Avatar>
            <AvatarImage src={job?.company?.logo} />
          </Avatar>
        </Button>
        <div>
          <h1 className="font-medium text-lg">{job?.company?.name}</h1>
          <p className="text-sm text-gray-500">{job?.location}</p>
        </div>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2">{job?.title}</h1>
        <p className="text-sm text-gray-600">{job?.description}</p>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Badge className="text-blue-700 font-bold" variant="secondary">
          {job?.position} positions
        </Badge>
        <Badge className="text-[#F83002] font-bold" variant="secondary">
          {job?.jobType}
        </Badge>
        <Badge className="text-[#7209b7] font-bold" variant="secondary">
          {job?.salary} LPA
        </Badge>
      </div>
      <div className="flex items-center gap-4 mt-4">
        <Button
          className="cursor-pointer"
          variant="outline"
          onClick={() => navigate(`/description/${jobId}`)}
        >
          Details
        </Button>
        <Button className="bg-[#6a3bc2]">Save for later</Button>
      </div>
    </div>
  );
};

export default Job;

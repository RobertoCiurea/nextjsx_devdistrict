"use client";
import React from "react";
import ReportCard from "../ReportCard";
type ReportType = {
  id: string;
  title: string;
  description: string;
  status: string;
  condition: string;
  userId: string;
  createdAt: Date | string;
};
const ReportsLayout = ({ reports }: { reports: ReportType[] }) => {
  return (
    <div id="reports" className="flex flex-col items-center gap-5 font-Raleway">
      <h1 className="text-2xl text-white">Reports</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 m-10 gap-10 text-white">
        {reports.length > 0 ? (
          reports.map((report) => (
            <ReportCard
              key={report.id}
              id={report.id}
              title={report.title}
              description={report.description}
              condition={report.condition}
              status={report.status}
              userId={report.userId}
              createdAt={report.createdAt.toLocaleString()}
            />
          ))
        ) : (
          <h1 className="text-lg text-primaryGray font-Montserrat">
            No reports yet
          </h1>
        )}
      </div>
    </div>
  );
};

export default ReportsLayout;

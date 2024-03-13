import React from "react";
type ReportCardType = {
  id: string;
  userId: string;
  title: string;
  description: string;
  condition: string;
  status: string;
  createdAt: Date | string;
};
const ReportCard = ({
  id,
  userId,
  title,
  description,
  condition,
  status,
  createdAt,
}: ReportCardType) => {
  const date = createdAt.toLocaleString().split(" ");
  return (
    <div className="flex flex-col px-5 py-2 bg-backgroundAccent text-primaryGray rounded-lg gap-3">
      <h1 className="sm:text-xl text-white">{title}</h1>
      <p>{description}</p>
      {/*Bottom section */}
      <div className="flex justify-between items-center text-white">
        <h1>{date[0]}</h1>
        <h1>{status}</h1>
      </div>
    </div>
  );
};

export default ReportCard;

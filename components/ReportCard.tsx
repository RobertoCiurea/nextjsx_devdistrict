"use session";
import React from "react";
import { useSession } from "next-auth/react";
import { useFormStatus } from "react-dom";
//actions
import { deleteReport } from "@/actions/deleteReport";
import { modifyReportStatus } from "@/actions/modifyReportStatus";
import Button from "./Button";
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
  const session = useSession();
  const date = createdAt.toLocaleString().split(" ");
  return (
    <div className="flex flex-col justify-between px-5 py-2 bg-backgroundAccent text-primaryGray rounded-lg gap-3">
      {session.data?.user?.name === "ADMIN" ? (
        <div className="flex justify-between">
          <h1>
            User id:<span className="font-bold text-white"> {id}</span>
          </h1>
          <form action={deleteReport}>
            <input type="hidden" name="reportId" defaultValue={id} />
            <FormButton
              title="Delete report"
              styles="bg-red-600 hover:bg-red-700"
            />
          </form>
        </div>
      ) : (
        <div className="flex justify-end">
          <form action={deleteReport}>
            <input type="hidden" name="reportId" defaultValue={id} />
            <FormButton
              title="Delete report"
              styles="bg-red-600 hover:bg-red-700"
            />
          </form>
        </div>
      )}
      <h1 className="sm:text-xl text-white">{title}</h1>
      <p>{description}</p>
      {/*Bottom section */}
      <div className="flex justify-between items-center text-white">
        <h1>{date}</h1>
        <h1>{status}</h1>
      </div>
      {/*Update status of report as ADMIN */}
      {session.data?.user?.name === "ADMIN" && status === "PENDING" && (
        <form action={modifyReportStatus}>
          <input type="hidden" name="reportId" defaultValue={id} />
          <FormButton
            title="Mark as resolved"
            styles="bg-primaryAccent hover:bg-primaryAccentHover py-1"
          />
        </form>
      )}
    </div>
  );
};

export default ReportCard;
const FormButton = ({ title, styles }: { title: string; styles: string }) => {
  const { pending } = useFormStatus();
  return (
    <Button
      title={pending ? "Loading..." : title}
      styles=""
      buttonType={"submit"}
      buttonStyles={` ${styles}  transition-colors shadow-xl text-white px-2 rounded-lg`}
    />
  );
};

import { getRandomInterviewCover } from "@/lib/utils";
import Image from "next/image";
import dayjs from "dayjs";
import { Button } from "./ui/button";
import Link from "next/link";
import DisplayTechIcons from "./DisplayTechIcons";
import { getFeedbackByInterviewId } from "@/lib/actions/general.action";
import { getCurrentUser } from "@/lib/actions/auth.action";

const InterviewCard = async ({
  id,
  role,
  type,
  techstack,
  createdAt,
}: InterviewCardProps) => {
  const user = await getCurrentUser();

  const feedback = (await getFeedbackByInterviewId({
    interviewId: id!,
    userId: user?.id!,
  })) as Feedback | null;
  const normalizedType = /mix/gi.test(type) ? "Mixed" : type;

  const formattedDate = dayjs(
    feedback?.createdAt || createdAt || Date.now()
  ).format("MMM D, YYYY");

  return (
    <div className="card-border">
      <div className="card-interview w-[320px] max-sm:w-full min-h-90">
        <div className="absolute top-0 right-0 px-2 py-2 rounded-tr-2xl rounded-bl-2xl bg-light-600">
          <p>{normalizedType}</p>
        </div>
        <Image
          src={getRandomInterviewCover()}
          height={90}
          width={90}
          sizes="90px"
          alt="interview image"
        />
        <h3>{role}</h3>
        <div className="flex gap-6">
          <div className="flex gap-2">
            <Image
              src={"/calendar.svg"}
              height={22}
              width={22}
              alt="calendar"
            />
            <p>{formattedDate}</p>
          </div>
          <div className="flex gap-2">
            <Image src={"/star.svg"} height={22} width={22} alt="star" />
            <p>{feedback?.totalScore || "---"} /100</p>
          </div>
        </div>
        <p>
          {feedback?.finalAssessment?.split(' ').slice(0, 10).join(' ') ||
            "Please take interview first. Then the feedback will show here."}
        </p>
        <div className="mt-4 flex justify-between items-center">
          <DisplayTechIcons techStack={techstack} />
          <Button className="btn-primary">
            <Link
              href={feedback ? `/interview/${id}/feedback` : `/interview/${id}`}
            >
              {feedback ? "Check feedback" : "View interview"}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
export default InterviewCard;

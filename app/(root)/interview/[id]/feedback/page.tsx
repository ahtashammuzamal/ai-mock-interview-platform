import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/actions/auth.action";
import {
  getFeedbackByInterviewId,
  getInterviewById,
} from "@/lib/actions/general.action";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

const Page = async ({ params }: RouteParams) => {
  const { id } = await params;
  const user = await getCurrentUser();

  const interview = await getInterviewById(id);

  if (!interview) redirect("/");

  const feedback = await getFeedbackByInterviewId({
    interviewId: id,
    userId: user?.id!,
  });

  console.log(feedback);

  return (
    <section className="section-feedback">
      <h1 className="text-4xl font-semibold text-center">
        Feedback on the Interview — {interview.role}
      </h1>
      <div className="flex gap-4 md:gap-8 flex-col md:flex-row justify-center items-center">
        <div className="flex gap-0.5">
          <Image src="/star.svg" width={20} height={20} alt="rating" />
          <p>Overall impression: {` ${feedback?.totalScore}/100`}</p>
        </div>
        <div className="flex gap-0.5">
          <Image src="/calendar.svg" width={20} height={20} alt="rating" />
          <p>
            {dayjs(feedback?.createdAt).format("MMM D, YYYY h:mm A") || "N/A"}
          </p>
        </div>
      </div>
      <p>{feedback?.finalAssessment}</p>
      <div className="flex flex-col gap-2">
        <h2>Breakdown of Evaluation:</h2>
        {feedback?.categoryScores.map((category, index) => (
          <div key={index}>
            <h4>{`${index + 1}. ${category.name} (${category.score}/100)`}</h4>
            <p>{category.comment}</p>
          </div>
        ))}
      </div>

      {feedback?.strengths && (
        <div>
          {feedback.strengths.map((strength, index) => (
            <div key={index}>
              <h3>Strengths</h3>
              <li>{strength}</li>
            </div>
          ))}
        </div>
      )}

      <div>
        <h2>Areas of improvement:</h2>
        {feedback?.areasForImprovement.map((area, index) => (
          <div key={index}>
            <li>{area}</li>
          </div>
        ))}
      </div>

      <div className="buttons">
        <Button className="btn-secondary flex-1">
          <Link href={"/"} className="flex w-full justify-center">
            <p className="text-sm font-semibold text-primary-200 text-center">
              Back to dashboard
            </p>
          </Link>
        </Button>

        <Button className="btn-secondary flex-1">
          <Link
            href={`/interview/${id}`}
            className="flex w-full justify-center"
          >
            <p className="text-sm font-semibold text-primary-200 text-center">
              Retake interview
            </p>
          </Link>
        </Button>
      </div>
    </section>
  );
};
export default Page;

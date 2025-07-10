import { Agent } from "@/components/Agent";
import DisplayTechIcons from "@/components/DisplayTechIcons";
import { getCurrentUser } from "@/lib/actions/auth.action";
import { getInterviewById } from "@/lib/actions/general.action";
import { getRandomInterviewCover } from "@/lib/utils";
import Image from "next/image";
import { redirect } from "next/navigation";

const Page = async ({ params }: RouteParams) => {
  const user = await getCurrentUser()
  const { id } = await params;
  const interview = await getInterviewById(id);
  if (!interview) redirect("/");
  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex gap-4 justify-center items-center md:justify-start">
          <Image
            src={getRandomInterviewCover()}
            height={40}
            width={40}
            alt={interview.role}
          />
          <h2>{interview.role}</h2>
          <DisplayTechIcons techStack={interview.techstack} />
        </div>
        <div className="bg-dark-300 rounded-sm px-4 py-2">
          <p>{interview.type} Interview</p>
        </div>
      </div>
      <Agent userName={user?.name!} interviewId={id} questions={interview.questions} type="interview"/>
    </>
  );
};
export default Page;

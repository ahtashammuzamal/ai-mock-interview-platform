import { Button } from "@/components/ui/button";
import InterviewCard from "@/components/InterviewCard"
import Image from "next/image";
import Link from "next/link";
import { getCurrentUser, getInterviewsByUserId, getLatestInterviews } from "@/lib/actions/auth.action";

const Page = async () => {
  const user = await getCurrentUser();
  const [userInterviews, latestInterviews] = await Promise.all([
    await getInterviewsByUserId(user?.id!),
    await getLatestInterviews({userId: user?.id!}) 
  ])
  const hasPastInterviews = userInterviews?.length! > 0
  const hasUpcomingInterviews = latestInterviews?.length! > 0
  return (
    <>
      <section className="card-cta mt-4">
        <div className="flex flex-col gap-6 max-w-lg">
          <h3>Get Interview-Ready with AI-Powered Practice & Feedback</h3>
          <p>Practice real interview questions & get instant feedback.</p>
          <Button className="btn-primary">
            <Link href={'/interview'}>
              Start an interview
            </Link>
          </Button>
        </div>
        <Image src={'/robot.png'} height={400} width={400} alt="hero image" className="max-sm:hidden"/>
      </section>
      <section>
        <h3>Your Interviews</h3>
        <div className="flex flex-col md:flex-row gap-8 mt-8 interviews-section">
          {hasPastInterviews ? userInterviews?.map(interview => (
            <InterviewCard {...interview} key={interview.id}/>
          )) : <p>You haven't taken any interviews yet.</p>}
        </div>
      </section>
      <section>
        <h3>Latest Interviews</h3>
        <div className="flex flex-col md:flex-row gap-8 mt-8 interviews-section">
          {hasUpcomingInterviews ? latestInterviews?.map(interview => (
            <InterviewCard {...interview} key={interview.id}/>
          )) : <p>No lastet interviews found.</p>}
        </div>
      </section>
    </>
  );
};

export default Page;

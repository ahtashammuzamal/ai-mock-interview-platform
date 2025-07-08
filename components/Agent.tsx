import { cn } from "@/lib/utils";
import Image from "next/image";

 enum CallStatus {
    INACTIVE = "INACTIVE",
    CONNECTING = "CONNECTING",
    ACTIVE = "ACTIVE",
    FINISHED = "FINISHED",
  }

export const Agent = ({ userName, type }: AgentProps) => {
 
    const callStatus = CallStatus.INACTIVE

  const isSpeaking = true;

  const messages = ["Hi How are you", "I am fine."];
  const lastMessage = messages[messages.length - 1];

  return (
    <>
      <div className="call-view">
        {/* Ai interview card */}
        <div className="card-interviewer">
          <div className="avatar">
            <Image
              src="/ai-avatar.png"
              height={54}
              width={65}
              alt="profile-image"
              className="object-cover"
            />
            {isSpeaking && <span className="animate-speak" />}
          </div>
          <h3>AI Interviewer</h3>
        </div>
        {/* User interview card */}
        <div className="card-border">
          <div className="card-content">
            <Image
              src="/user-avatar.png"
              height={539}
              width={539}
              alt="profile-image"
              className="rounded-full object-cover size-[130px]"
            />
            <h3>{userName}</h3>
          </div>
        </div>
      </div>

      {messages.length > 0 && (
        <div className="transcript-border">
          <div className="transcript">
            <p
              key={lastMessage}
              className={cn(
                "transition-opacity duration-500 opacity-0",
                "animate-fadeIn opacity-100"
              )}
            >
              {lastMessage}
            </p>
          </div>
        </div>
      )}

      <div className="w-full flex justify-center">
        {callStatus !== "ACTIVE" ? (
          <button className="relative btn-call">
            <span
              className={cn(
                "absolute, animate-ping rounded-full opacity-75",
                callStatus !== "CONNECTING" && "hidden"
              )}
            />
            <span className="relative">
                {callStatus === 'INACTIVE' || callStatus === 'FINISHED' ? 'Call' : '...'}
            </span>
          </button>
        ) : (
            <button className="btn-disconnect">
                End
            </button>
        )}
      </div>
    </>
  );
};

"use client";
import React from "react";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";

interface PollOption {
  id: string;
  text: string;
  votes: number;
}

interface Poll {
  id: number;
  question: string;
  options: PollOption[];
}

const initialPolls: Poll[] = [
  {
    id: 1,
    question: "What time should the community meeting be tomorrow?",
    options: [
      { id: "1a", text: "5:00 PM", votes: 12 },
      { id: "1b", text: "6:00 PM", votes: 18 },
      { id: "1c", text: "7:00 PM", votes: 5 },
    ],
  },
  {
    id: 2,
    question: "Which movie should we watch on movie night?",
    options: [
      { id: "2a", text: "The Grand Adventure", votes: 25 },
      { id: "2b", text: "Mystery on the Hill", votes: 15 },
      { id: "2c", text: "Space Odyssey", votes: 20 },
    ],
  },
];

const VotingPage = () => {
  const [polls, setPolls] = useState<Poll[]>(initialPolls);
  const [voted, setVoted] = useState<Record<number, string>>({});

  const handleVote = (pollId: number, optionId: string) => {
    if (voted[pollId]) return;

    setPolls(
      polls.map((poll) =>
        poll.id === pollId
          ? {
              ...poll,
              options: poll.options.map((opt) =>
                opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt
              ),
            }
          : poll
      )
    );
    setVoted({ ...voted, [pollId]: optionId });
  };

  const getTotalVotes = (poll: Poll) =>
    poll.options.reduce((acc, opt) => acc + opt.votes, 0);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold font-headline text-[#353B41]">
        Community Polls
      </h1>
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        {polls.map((poll) => {
          const totalVotes = getTotalVotes(poll);
          const userVote = voted[poll.id];

          return (
            <Card key={poll.id} className="bg-[#FFFFFF]">
              <CardHeader>
                <CardTitle className="text-[#353B41]">
                  {poll.question}
                </CardTitle>
                <CardDescription className="text-[#64748B]">
                  Total votes: {totalVotes}
                </CardDescription>
              </CardHeader>
              <CardContent className="text-[#353B41]">
                {userVote ? (
                  <div className="space-y-4">
                    {poll.options.map((option) => {
                      const percentage =
                        totalVotes > 0 ? (option.votes / totalVotes) * 100 : 0;
                      return (
                        <div key={option.id}>
                          <div className="flex justify-between mb-1">
                            <p className="text-sm font-medium">{option.text}</p>
                            <p className="text-sm text-muted-foreground">
                              {Math.round(percentage)}%
                            </p>
                          </div>
                          <Progress value={percentage} className="h-2" />
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <RadioGroup
                    onValueChange={(value) => handleVote(poll.id, value)}
                  >
                    <div className="space-y-2">
                      {poll.options.map((option) => (
                        <div
                          key={option.id}
                          className="flex items-center space-x-2"
                        >
                          <RadioGroupItem
                            value={option.id}
                            id={`${poll.id}-${option.id}`}
                          />
                          <Label htmlFor={`${poll.id}-${option.id}`}>
                            {option.text}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                )}
              </CardContent>
              {userVote && (
                <CardFooter>
                  <p className="text-sm text-primary text-[#0D6DFD]">
                    Thanks for voting!
                  </p>
                </CardFooter>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default VotingPage;

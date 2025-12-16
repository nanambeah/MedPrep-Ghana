import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { CheckCircle2, Trophy, ArrowRight, BarChart3, Clock, Target } from "lucide-react";
import { MOCK_STATS } from "@/lib/mockData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function Results() {
  const totalCorrect = MOCK_STATS.reduce((acc, curr) => acc + curr.correct, 0);
  const totalQuestions = MOCK_STATS.reduce((acc, curr) => acc + curr.total, 0);
  const percentage = Math.round((totalCorrect / totalQuestions) * 100);

  return (
    <div className="container py-12 px-4 max-w-5xl">
      <div className="flex flex-col md:flex-row gap-8 items-start mb-12">
        <div className="flex-1 space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Performance Summary</h1>
          <p className="text-muted-foreground">Here is how you are performing across different medical disciplines.</p>
        </div>
        <Link href="/dashboard">
          <Button size="lg" className="gap-2">
            Continue Practice <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Score</CardTitle>
            <Trophy className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{percentage}%</div>
            <p className="text-xs text-muted-foreground">Average across all topics</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Questions Attempted</CardTitle>
            <Target className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalQuestions}</div>
            <p className="text-xs text-muted-foreground">Total answered</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Correct Answers</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCorrect}</div>
            <p className="text-xs text-muted-foreground">Accuracy rate</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Study Time</CardTitle>
            <Clock className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12h 30m</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="col-span-1 md:col-span-2">
          <CardHeader>
            <CardTitle>Discipline Performance</CardTitle>
            <CardDescription>Breakdown of your accuracy by medical specialty.</CardDescription>
          </CardHeader>
          <CardContent className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MOCK_STATS} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                <XAxis type="number" domain={[0, 20]} hide />
                <YAxis dataKey="discipline" type="category" width={150} tick={{fontSize: 12}} />
                <Tooltip 
                  cursor={{fill: 'transparent'}}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="correct" name="Correct Answers" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} barSize={20}>
                  {
                    MOCK_STATS.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.correct / entry.total > 0.7 ? "hsl(var(--primary))" : "hsl(var(--destructive))"} />
                    ))
                  }
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

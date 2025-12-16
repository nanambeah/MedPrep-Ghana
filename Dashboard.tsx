import { useAuth } from "@/lib/auth";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  Stethoscope, 
  Trophy, 
  Clock, 
  ArrowRight, 
  BookMarked, 
  AlertCircle,
  PlayCircle
} from "lucide-react";
import { MOCK_STATS } from "@/lib/mockData";

export default function Dashboard() {
  const { user } = useAuth();
  
  // Quick stats
  const totalCorrect = MOCK_STATS.reduce((acc, curr) => acc + curr.correct, 0);
  const totalQuestions = MOCK_STATS.reduce((acc, curr) => acc + curr.total, 0);
  const accuracy = Math.round((totalCorrect / totalQuestions) * 100);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, {user?.name}. Ready to continue your prep?</p>
      </div>

      {/* Subscription Status Banner (if needed) */}
      {user?.subscriptionStatus !== 'active' && user?.role !== 'admin' && (
        <div className="bg-yellow-50 dark:bg-yellow-950/30 border border-yellow-200 dark:border-yellow-900 p-4 rounded-lg flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-500" />
            <div>
              <p className="font-semibold text-yellow-900 dark:text-yellow-200">Subscription Required</p>
              <p className="text-sm text-yellow-800 dark:text-yellow-300/80">Your access to practice questions is limited.</p>
            </div>
          </div>
          <Link href="/subscription">
            <Button size="sm" variant="default" className="bg-yellow-600 hover:bg-yellow-700 text-white">
              Upgrade Now
            </Button>
          </Link>
        </div>
      )}

      {/* Main Actions Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Start Practice Card */}
        <Card className="col-span-1 md:col-span-2 bg-primary/5 border-primary/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl">Start Practice</CardTitle>
              <Stethoscope className="h-6 w-6 text-primary" />
            </div>
            <CardDescription>
              Choose a specialty or continue where you left off.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/practice">
                <Button size="lg" className="w-full sm:w-auto gap-2 text-base">
                  <PlayCircle className="h-5 w-5" />
                  New Session
                </Button>
              </Link>
              <Link href="/practice?mode=resume">
                <Button variant="outline" size="lg" className="w-full sm:w-auto gap-2">
                  Resume Last Session
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Performance Snapshot */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Overall Accuracy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">{accuracy}%</div>
            <Progress value={accuracy} className="h-2 mb-2" />
            <p className="text-xs text-muted-foreground">
              {totalCorrect} correct out of {totalQuestions} answered
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Saved Questions Teaser */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <BookMarked className="h-5 w-5 text-primary" />
              <CardTitle>Saved Questions</CardTitle>
            </div>
            <CardDescription>Review questions you bookmarked for later.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg border">
                <div className="space-y-1">
                  <p className="text-sm font-medium line-clamp-1">A 32-year-old male farmer from the Volta Region...</p>
                  <p className="text-xs text-muted-foreground">Internal Medicine • Infectious Diseases</p>
                </div>
                <Button size="icon" variant="ghost" className="h-8 w-8">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
              <Link href="/saved">
                <Button variant="ghost" className="w-full text-primary hover:text-primary/80">
                  View All Saved Questions
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Study Goals / Streak */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-yellow-500" />
              <CardTitle>Study Streak</CardTitle>
            </div>
            <CardDescription>Keep up the momentum!</CardDescription>
          </CardHeader>
          <CardContent>
             <div className="flex items-center justify-between mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold">3</div>
                  <div className="text-xs text-muted-foreground">Day Streak</div>
                </div>
                <div className="h-8 w-px bg-border"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold">45</div>
                  <div className="text-xs text-muted-foreground">Questions Today</div>
                </div>
                <div className="h-8 w-px bg-border"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold">1.5h</div>
                  <div className="text-xs text-muted-foreground">Time Spent</div>
                </div>
             </div>
             <Button variant="outline" className="w-full" disabled>View Detailed Stats (Coming Soon)</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

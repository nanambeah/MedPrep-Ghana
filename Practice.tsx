import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth";
import { useLocation } from "wouter";
import { MOCK_QUESTIONS, DISCIPLINES } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  BookOpen, 
  Bookmark,
  BookmarkCheck,
  Settings2,
  Filter
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";

export default function Practice() {
  const { user } = useAuth();
  const [_, setLocation] = useLocation();
  const { toast } = useToast();
  
  // Setup State
  const [isSetupMode, setIsSetupMode] = useState(true);
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");
  
  // Practice State
  const [filteredQuestions, setFilteredQuestions] = useState(MOCK_QUESTIONS);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [savedQuestions, setSavedQuestions] = useState<number[]>([]); // Array of Question IDs
  
  // Access Control
  const [showSubscriptionAlert, setShowSubscriptionAlert] = useState(false);

  useEffect(() => {
    if (user && user.subscriptionStatus !== "active" && user.role !== "admin") {
      setShowSubscriptionAlert(true);
    }
  }, [user]);

  const startSession = () => {
    // Filter questions logic
    let questions = [...MOCK_QUESTIONS];
    if (selectedDiscipline !== "all") {
      questions = questions.filter(q => q.discipline === selectedDiscipline);
    }
    if (selectedDifficulty !== "all") {
      questions = questions.filter(q => q.difficulty === selectedDifficulty);
    }

    if (questions.length === 0) {
      toast({
        title: "No questions found",
        description: "Try adjusting your filters.",
        variant: "destructive"
      });
      return;
    }

    setFilteredQuestions(questions);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsSubmitted(false);
    setIsSetupMode(false);
  };

  const handleOptionSelect = (index: number) => {
    if (!isSubmitted) {
      setSelectedOption(index);
    }
  };

  const handleSubmit = () => {
    if (selectedOption !== null) {
      setIsSubmitted(true);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < filteredQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
    } else {
      setLocation("/results");
    }
  };

  const toggleSaveQuestion = (id: number) => {
    if (savedQuestions.includes(id)) {
      setSavedQuestions(prev => prev.filter(qId => qId !== id));
      toast({ description: "Question removed from saved items." });
    } else {
      setSavedQuestions(prev => [...prev, id]);
      toast({ description: "Question saved for later review." });
    }
  };

  if (!user) return null;

  // --- SETUP MODE ---
  if (isSetupMode) {
    return (
      <div className="container max-w-2xl py-8">
        <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Settings2 className="h-6 w-6 text-primary" />
          Configure Practice Session
        </h1>
        
        <Card>
          <CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="space-y-3">
                <Label>Medical Discipline</Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Button 
                    variant={selectedDiscipline === "all" ? "default" : "outline"}
                    className="justify-start"
                    onClick={() => setSelectedDiscipline("all")}
                  >
                    All Disciplines
                  </Button>
                  {DISCIPLINES.map(disc => (
                    <Button 
                      key={disc}
                      variant={selectedDiscipline === disc ? "default" : "outline"}
                      className="justify-start truncate"
                      onClick={() => setSelectedDiscipline(disc)}
                    >
                      {disc}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <Label>Difficulty Level</Label>
                <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Mixed Difficulty</SelectItem>
                    <SelectItem value="Easy">Easy</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-3 pt-4">
              <Button variant="ghost" onClick={() => setLocation("/dashboard")}>Cancel</Button>
              <Button size="lg" onClick={startSession} className="min-w-[150px]">
                Start Practice
              </Button>
            </CardFooter>
          </CardHeader>
        </Card>
      </div>
    );
  }

  // --- PRACTICE MODE ---
  const currentQuestion = filteredQuestions[currentQuestionIndex];
  const isSaved = savedQuestions.includes(currentQuestion.id);

  return (
    <div className="container max-w-4xl py-4 px-0 md:px-4">
      <AlertDialog open={showSubscriptionAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Subscription Required</AlertDialogTitle>
            <AlertDialogDescription>Active subscription required for full practice mode.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setLocation("/subscription")}>View Plans</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="space-y-1">
          <Button variant="ghost" size="sm" className="pl-0 hover:bg-transparent text-muted-foreground" onClick={() => setIsSetupMode(true)}>
             &larr; Back to Setup
          </Button>
          <div className="flex items-center gap-2">
            <Badge variant="outline">{currentQuestion.discipline}</Badge>
            <span className="text-xs text-muted-foreground">•</span>
            <span className="text-sm font-medium text-muted-foreground">{currentQuestion.topic}</span>
          </div>
        </div>
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="flex-1 md:flex-none">
            <div className="text-xs text-muted-foreground mb-1 flex justify-between">
              <span>Progress</span>
              <span>{currentQuestionIndex + 1} / {filteredQuestions.length}</span>
            </div>
            <Progress value={((currentQuestionIndex + 1) / filteredQuestions.length) * 100} className="h-2" />
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => toggleSaveQuestion(currentQuestion.id)}
            className={cn("shrink-0", isSaved ? "text-primary" : "text-muted-foreground")}
            title="Save Question"
          >
            {isSaved ? <BookmarkCheck className="h-6 w-6" /> : <Bookmark className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Question Card */}
      <Card className="border-t-4 border-t-primary shadow-md">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start mb-4">
             <Badge variant={
               currentQuestion.difficulty === 'Hard' ? 'destructive' : 
               currentQuestion.difficulty === 'Medium' ? 'secondary' : 'outline'
             }>
               {currentQuestion.difficulty}
             </Badge>
          </div>
          <p className="text-lg md:text-xl font-medium leading-relaxed text-foreground/90">
            {currentQuestion.vignette}
          </p>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => {
              let cardStyle = "border-2 border-transparent hover:bg-muted/50 cursor-pointer transition-all";
              let icon = null;

              if (isSubmitted) {
                if (index === currentQuestion.correctAnswerIndex) {
                  cardStyle = "border-2 border-green-500 bg-green-50 dark:bg-green-950/20";
                  icon = <CheckCircle2 className="h-5 w-5 text-green-600" />;
                } else if (index === selectedOption) {
                  cardStyle = "border-2 border-destructive bg-destructive/5";
                  icon = <XCircle className="h-5 w-5 text-destructive" />;
                } else {
                  cardStyle = "opacity-60";
                }
              } else if (selectedOption === index) {
                cardStyle = "border-2 border-primary bg-primary/5";
              }

              return (
                <div
                  key={index}
                  onClick={() => handleOptionSelect(index)}
                  className={cn("flex items-center justify-between p-4 rounded-lg border", cardStyle)}
                >
                  <span className="font-medium text-sm md:text-base">{option}</span>
                  {icon}
                </div>
              );
            })}
          </div>

          {/* Explanation */}
          {isSubmitted && (
            <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 p-6 border border-blue-100 dark:border-blue-900">
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                  <h3 className="font-bold text-blue-900 dark:text-blue-100">Explanation</h3>
                </div>
                <p className="text-sm md:text-base text-foreground/80 leading-relaxed">
                  {currentQuestion.explanation}
                </p>
                {selectedOption !== currentQuestion.correctAnswerIndex && selectedOption !== null && (
                   <div className="mt-4 pt-4 border-t border-blue-200 dark:border-blue-800">
                     <p className="text-sm font-medium text-destructive mb-1">Why your answer was incorrect:</p>
                     <p className="text-sm text-muted-foreground">
                        {currentQuestion.wrongExplanations[selectedOption > currentQuestion.correctAnswerIndex ? selectedOption - 1 : selectedOption]}
                     </p>
                   </div>
                )}
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-end pt-6 pb-6 bg-muted/10 border-t sticky bottom-0 z-10">
          {!isSubmitted ? (
            <Button size="lg" onClick={handleSubmit} disabled={selectedOption === null} className="w-full md:w-auto">
              Submit Answer
            </Button>
          ) : (
            <Button size="lg" onClick={handleNext} className="w-full md:w-auto gap-2">
              {currentQuestionIndex < filteredQuestions.length - 1 ? "Next Question" : "View Results"}
              <ArrowRight className="h-4 w-4" />
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}

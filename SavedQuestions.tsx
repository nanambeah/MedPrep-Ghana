import { MOCK_QUESTIONS } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, BookMarked, Trash2 } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function SavedQuestions() {
  // In a real app, fetch from backend. Here we simulate having saved specific IDs.
  const [savedIds, setSavedIds] = useState<number[]>([1, 4]); 
  const { toast } = useToast();

  const savedQuestions = MOCK_QUESTIONS.filter(q => savedIds.includes(q.id));

  const removeSaved = (id: number) => {
    setSavedIds(prev => prev.filter(sid => sid !== id));
    toast({ description: "Question removed from saved items." });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Saved Questions</h1>
          <p className="text-muted-foreground">Review difficult concepts and bookmarked vignettes.</p>
        </div>
        <Link href="/practice">
           <Button>Practice New Questions</Button>
        </Link>
      </div>

      {savedQuestions.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 border rounded-lg bg-muted/10 text-center">
          <div className="bg-muted p-4 rounded-full mb-4">
            <BookMarked className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No saved questions yet</h3>
          <p className="text-muted-foreground max-w-sm mb-6">
            Bookmark questions during practice to review them here later.
          </p>
          <Link href="/practice">
            <Button variant="outline">Start Practice Session</Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-4">
          {savedQuestions.map(question => (
            <Card key={question.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline">{question.discipline}</Badge>
                    <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-0">{question.topic}</Badge>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                    onClick={() => removeSaved(question.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <CardTitle className="text-base line-clamp-2 leading-snug">
                  {question.vignette}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mt-2">
                   <div className="text-xs text-muted-foreground">
                     Difficulty: <span className="font-medium text-foreground">{question.difficulty}</span>
                   </div>
                   <Button variant="link" className="px-0 text-primary h-auto">
                     Review Answer <ArrowRight className="ml-1 h-3 w-3" />
                   </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

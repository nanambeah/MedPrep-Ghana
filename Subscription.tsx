import { useState } from "react";
import { useAuth } from "@/lib/auth";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CheckCircle2, ShieldCheck, Loader2, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Subscription() {
  const { user, updateSubscription } = useAuth();
  const [_, setLocation] = useLocation();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [provider, setProvider] = useState("mtn");
  const [phone, setPhone] = useState("");

  if (!user) {
    setLocation("/auth");
    return null;
  }

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate Payment Gateway Process
    setTimeout(() => {
      setIsLoading(false);
      updateSubscription("active");
      toast({
        title: "Payment Successful",
        description: "Your 3-month subscription is now active.",
      });
      setLocation("/dashboard");
    }, 2500);
  };

  return (
    <div className="container max-w-4xl py-12 px-4">
      <div className="grid gap-8 md:grid-cols-3">
        {/* Plan Details */}
        <div className="md:col-span-1 space-y-6">
          <div>
             <h1 className="text-3xl font-bold tracking-tight mb-2">Subscribe</h1>
             <p className="text-muted-foreground">Complete your payment to access the full question bank.</p>
          </div>
          
          <Card className="bg-primary text-primary-foreground border-none shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl">Premium Pass</CardTitle>
              <CardDescription className="text-primary-foreground/80">Full Access</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-baseline gap-1">
                <span className="text-sm font-medium opacity-80">GHS</span>
                <span className="text-5xl font-bold">300</span>
              </div>
              <div className="text-sm font-medium opacity-90">For 3 Months (90 Days)</div>
              
              <div className="space-y-2 pt-4">
                {[
                  "Unlimited Questions",
                  "Detailed Explanations",
                  "Performance Tracking",
                  "Mobile Access"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-secondary" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Payment Form */}
        <div className="md:col-span-2">
           <Card>
             <CardHeader>
               <CardTitle>Mobile Money Payment</CardTitle>
               <CardDescription>Select your provider and enter your mobile number.</CardDescription>
             </CardHeader>
             <form onSubmit={handlePayment}>
               <CardContent className="space-y-6">
                 
                 <div className="space-y-3">
                   <Label>Select Provider</Label>
                   <RadioGroup defaultValue="mtn" value={provider} onValueChange={setProvider} className="grid grid-cols-3 gap-4">
                     <div>
                       <RadioGroupItem value="mtn" id="mtn" className="peer sr-only" />
                       <Label
                         htmlFor="mtn"
                         className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer transition-all"
                       >
                         <div className="h-8 w-8 rounded-full bg-yellow-400 mb-2" />
                         MTN
                       </Label>
                     </div>
                     <div>
                       <RadioGroupItem value="voda" id="voda" className="peer sr-only" />
                       <Label
                         htmlFor="voda"
                         className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer transition-all"
                       >
                         <div className="h-8 w-8 rounded-full bg-red-600 mb-2" />
                         Telecel/Voda
                       </Label>
                     </div>
                     <div>
                       <RadioGroupItem value="airtel" id="airtel" className="peer sr-only" />
                       <Label
                         htmlFor="airtel"
                         className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer transition-all"
                       >
                         <div className="h-8 w-8 rounded-full bg-blue-600 mb-2" />
                         AirtelTigo
                       </Label>
                     </div>
                   </RadioGroup>
                 </div>

                 <div className="space-y-2">
                   <Label htmlFor="phone">Mobile Number</Label>
                   <Input 
                     id="phone" 
                     placeholder="024 XXX XXXX" 
                     value={phone}
                     onChange={(e) => setPhone(e.target.value)}
                     required
                     className="text-lg tracking-wide"
                   />
                   <p className="text-xs text-muted-foreground">You will receive a prompt on this number to approve the transaction.</p>
                 </div>

                 <div className="rounded-lg bg-muted p-4 flex items-start gap-3">
                   <ShieldCheck className="h-5 w-5 text-green-600 mt-0.5" />
                   <div className="space-y-1">
                     <p className="text-sm font-medium">Secure Payment</p>
                     <p className="text-xs text-muted-foreground">Your payment is processed securely via Paystack/Hubtel. We do not store your financial details.</p>
                   </div>
                 </div>

               </CardContent>
               <CardFooter>
                 <Button type="submit" size="lg" className="w-full" disabled={isLoading || phone.length < 10}>
                   {isLoading ? (
                     <>
                       <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                       Waiting for approval...
                     </>
                   ) : (
                     <>
                       <Lock className="mr-2 h-4 w-4" />
                       Pay GHS 300.00
                     </>
                   )}
                 </Button>
               </CardFooter>
             </form>
           </Card>
        </div>
      </div>
    </div>
  );
}

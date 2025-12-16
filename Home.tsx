import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Check, Shield, Zap, BookOpen, TrendingUp, Users } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-background to-secondary/20 pt-16 pb-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="flex flex-col justify-center space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-semibold text-primary bg-primary/10 w-fit">
                  <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
                  New: 2025 GMDC Syllabus Updated
                </div>
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-foreground">
                  Master Your Ghana Medical Licensing Exam
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl leading-relaxed">
                  The first AI-powered question bank tailored specifically for the Ghanaian medical context. Practice with thousands of high-yield questions, detailed explanations, and track your progress.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/auth?mode=register">
                  <Button size="lg" className="h-12 px-8 text-base shadow-lg hover:shadow-xl transition-all">
                    Start Practicing Now
                  </Button>
                </Link>
                <Link href="#how-it-works">
                  <Button variant="outline" size="lg" className="h-12 px-8 text-base">
                    View Features
                  </Button>
                </Link>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-8 w-8 rounded-full border-2 border-background bg-muted flex items-center justify-center text-xs font-bold overflow-hidden">
                      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`} alt="User" />
                    </div>
                  ))}
                </div>
                <p>Joined by 500+ Medical Students in Ghana</p>
              </div>
            </div>
            <div className="mx-auto lg:mr-0 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border aspect-[4/3] w-full max-w-[600px]">
                 <img 
                   src="/african_medical_students_studying_in_modern_bright_environment.png"
                   alt="Medical students studying" 
                   className="object-cover w-full h-full"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                 <div className="absolute bottom-6 left-6 text-white">
                   <p className="font-bold text-lg">Dr. Abena Osei</p>
                   <p className="text-sm opacity-90">Passed GMDC Exam 2024</p>
                 </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -z-10 top-1/2 right-0 w-72 h-72 bg-primary/20 rounded-full blur-[100px]"></div>
              <div className="absolute -z-10 bottom-0 left-0 w-72 h-72 bg-accent/30 rounded-full blur-[100px]"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="how-it-works" className="py-24 bg-background">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Why Choose MedPrep Ghana?</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              We focus on the specific clinical scenarios and guidelines relevant to medical practice in West Africa.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Shield className="h-10 w-10 text-primary" />}
              title="Ghana-Specific Content"
              description="Questions designed around common conditions in Ghana (Malaria, Typhoid, Sickle Cell) and local treatment guidelines."
            />
            <FeatureCard 
              icon={<Zap className="h-10 w-10 text-primary" />}
              title="AI-Powered Explanations"
              description="Instant, detailed feedback explaining exactly why an answer is right and—more importantly—why the others are wrong."
            />
            <FeatureCard 
              icon={<TrendingUp className="h-10 w-10 text-primary" />}
              title="Performance Analytics"
              description="Identify your weak areas by discipline (Surgery, O&G, Paediatrics) to focus your revision effectively."
            />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-secondary/30">
        <div className="container px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Simple, Affordable Pricing</h2>
              <p className="text-muted-foreground text-lg">
                Invest in your medical career for less than the cost of a textbook. One plan, full access.
              </p>
              <ul className="space-y-4 mt-8">
                {[
                  "Unlimited Practice Questions",
                  "Full Performance Tracking",
                  "Mobile & Tablet Friendly",
                  "24/7 Access for 3 Months",
                  "New Questions Added Weekly"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="h-6 w-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                      <Check className="h-4 w-4" />
                    </div>
                    <span className="text-foreground/80">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="relative">
              <div className="bg-background rounded-2xl shadow-xl border p-8 md:p-12 relative z-10">
                <div className="text-center space-y-4 mb-8">
                  <h3 className="text-xl font-medium text-muted-foreground">Premium Access</h3>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-sm font-medium text-muted-foreground">GHS</span>
                    <span className="text-5xl font-bold tracking-tight text-primary">300</span>
                  </div>
                  <p className="text-sm text-muted-foreground">per 3 months</p>
                </div>
                <Link href="/auth?mode=register">
                  <Button className="w-full h-12 text-lg font-semibold" size="lg">
                    Get Started Now
                  </Button>
                </Link>
                <div className="mt-6 text-center">
                  <p className="text-xs text-muted-foreground mb-2">Secure payment via</p>
                  <div className="flex justify-center gap-4 opacity-70 grayscale hover:grayscale-0 transition-all">
                    <span className="font-bold text-yellow-600">MTN MoMo</span>
                    <span className="font-bold text-red-600">Vodafone Cash</span>
                    <span className="font-bold text-blue-600">AirtelTigo</span>
                  </div>
                </div>
              </div>
              {/* Glow effect */}
              <div className="absolute inset-0 bg-primary/20 blur-3xl -z-10 rounded-full transform scale-90"></div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Ace Your Exams?</h2>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8 text-lg">
            Join thousands of Ghanaian medical professionals who trust MedPrep for their licensing preparation.
          </p>
          <Link href="/auth?mode=register">
            <Button size="lg" variant="secondary" className="h-14 px-8 text-lg text-primary font-bold">
              Create Free Account
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: any, title: string, description: string }) {
  return (
    <div className="bg-card p-8 rounded-xl border shadow-sm hover:shadow-md transition-shadow">
      <div className="bg-primary/5 w-16 h-16 rounded-full flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  );
}

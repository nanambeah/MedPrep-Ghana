import { Link, useLocation } from "wouter";
import { useAuth } from "@/lib/auth";
import { 
  NavigationMenu, 
  NavigationMenuItem, 
  NavigationMenuLink, 
  NavigationMenuList, 
  navigationMenuTriggerStyle 
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Menu, Stethoscope, User as UserIcon, LogOut, LayoutDashboard, CreditCard } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function Navbar() {
  const { user, logout } = useAuth();
  const [location] = useLocation();

  const isAuth = !!user;

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link href="/">
          <a className="flex items-center gap-2 font-bold text-xl text-primary tracking-tight">
            <div className="bg-primary text-primary-foreground p-1.5 rounded-lg">
              <Stethoscope className="h-5 w-5" />
            </div>
            MedPrep <span className="text-foreground font-normal">Ghana</span>
          </a>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {isAuth ? (
            <>
              <Link href="/dashboard">
                <a className={`text-sm font-medium transition-colors hover:text-primary ${location === '/dashboard' ? 'text-primary' : 'text-muted-foreground'}`}>
                  Practice
                </a>
              </Link>
              <Link href="/results">
                <a className={`text-sm font-medium transition-colors hover:text-primary ${location === '/results' ? 'text-primary' : 'text-muted-foreground'}`}>
                  Results
                </a>
              </Link>
              {user.role === 'admin' && (
                <Link href="/admin">
                  <a className={`text-sm font-medium transition-colors hover:text-primary ${location === '/admin' ? 'text-primary' : 'text-muted-foreground'}`}>
                    Admin
                  </a>
                </Link>
              )}
            </>
          ) : (
            <Link href="/#pricing">
              <a className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                Pricing
              </a>
            </Link>
          )}

          {isAuth ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src="/avatars/01.png" alt={user.name} />
                    <AvatarFallback className="bg-primary/10 text-primary font-bold">
                      {user.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => window.location.href = '/subscription'}>
                  <CreditCard className="mr-2 h-4 w-4" />
                  <span>Subscription</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logout} className="text-destructive focus:text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/auth">
                <Button variant="ghost" size="sm">Log in</Button>
              </Link>
              <Link href="/auth?mode=register">
                <Button size="sm">Get Started</Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Nav */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-6 mt-8">
                {isAuth ? (
                  <>
                    <div className="flex items-center gap-3 mb-4">
                      <Avatar>
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                    <Link href="/dashboard">
                      <a className="text-lg font-medium">Practice</a>
                    </Link>
                    <Link href="/results">
                      <a className="text-lg font-medium">Results</a>
                    </Link>
                    <Link href="/subscription">
                      <a className="text-lg font-medium">Subscription</a>
                    </Link>
                    <Button onClick={logout} variant="destructive" className="mt-4">
                      Log Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Link href="/auth">
                      <Button variant="outline" className="w-full">Log In</Button>
                    </Link>
                    <Link href="/auth?mode=register">
                      <Button className="w-full">Sign Up</Button>
                    </Link>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="bg-muted/30 border-t py-12 mt-auto">
      <div className="container px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-bold text-xl text-primary">
              <Stethoscope className="h-5 w-5" />
              MedPrep Ghana
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Empowering Ghanaian medical professionals with AI-driven preparation tools for licensing excellence.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Platform</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary">Practice Questions</a></li>
              <li><a href="#" className="hover:text-primary">Mock Exams</a></li>
              <li><a href="#" className="hover:text-primary">Performance</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary">GMDC Guidelines</a></li>
              <li><a href="#" className="hover:text-primary">Study Materials</a></li>
              <li><a href="#" className="hover:text-primary">Community</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>support@medprep.gh</li>
              <li>Accra, Ghana</li>
            </ul>
          </div>
        </div>
        <div className="border-t mt-12 pt-8 text-center text-sm text-muted-foreground">
          © 2025 MedPrep Ghana. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  Sparkles,
  MessageSquare,
  FileText,
  Users,
  Zap,
  Star,
  ArrowRight,
  Mail,
  Bot,
  Clock,
  Shield,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <Badge
              variant="secondary"
              className="mb-6 bg-blue-500/10 text-blue-400 border-blue-500/20"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              AI-Powered Client Portal
            </Badge>

            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
              Your New{" "}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                AI-Powered
              </span>{" "}
              Client Portal
            </h1>

            <p className="mt-6 text-xl text-slate-300 max-w-3xl mx-auto">
              Replace chaotic workflows with one sleek, organized place for
              clients.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 text-lg"
              >
                Join the Waitlist
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-slate-600 text-slate-300 hover:bg-slate-800 px-8 py-3 text-lg"
              >
                Watch Demo
              </Button>
            </div>
          </div>

          {/* Hero UI Mockup */}
          <div className="mt-16 relative">
            <div className="relative mx-auto max-w-4xl">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-3xl"></div>
              <div className="relative bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="bg-slate-700/50 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="space-y-3">
                      <div className="h-4 bg-slate-600 rounded w-3/4"></div>
                      <div className="h-4 bg-slate-600 rounded w-1/2"></div>
                      <div className="h-4 bg-slate-600 rounded w-2/3"></div>
                    </div>
                  </div>
                  <div className="bg-slate-700/50 rounded-xl p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Bot className="w-5 h-5 text-blue-400" />
                      <span className="text-sm text-slate-300">
                        AI Assistant
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div className="h-3 bg-blue-500/20 rounded w-full"></div>
                      <div className="h-3 bg-blue-500/20 rounded w-4/5"></div>
                    </div>
                  </div>
                  <div className="bg-slate-700/50 rounded-xl p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Users className="w-5 h-5 text-green-400" />
                      <span className="text-sm text-slate-300">
                        Client View
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div className="h-3 bg-green-500/20 rounded w-2/3"></div>
                      <div className="h-3 bg-green-500/20 rounded w-1/2"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl mb-6">
              Juggling Slack, Notion, Trello, and endless emails?
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Your clients are confused. Your team is overwhelmed. It's time to
              simplify.
            </p>
          </div>

          {/* Problem Visual */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { name: "Slack", color: "bg-purple-500", icon: "💬" },
              { name: "Notion", color: "bg-gray-500", icon: "📝" },
              { name: "Trello", color: "bg-blue-500", icon: "📋" },
              { name: "Email", color: "bg-red-500", icon: "📧" },
            ].map((app, index) => (
              <div key={app.name} className="relative group">
                <div
                  className={`${app.color} rounded-xl p-6 text-white text-center transform transition-all duration-300 group-hover:scale-105 group-hover:rotate-2`}
                >
                  <div className="text-3xl mb-2">{app.icon}</div>
                  <div className="font-semibold">{app.name}</div>
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  {index + 1}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Features */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 bg-slate-800/30">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl mb-6">
              Everything you need in one place
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Streamline your client communication with powerful AI features
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Bot className="w-8 h-8 text-blue-400" />,
                title: "AI-generated status updates",
                description:
                  "Automatically create weekly project summaries and progress reports",
              },
              {
                icon: <FileText className="w-8 h-8 text-green-400" />,
                title: "Centralized project files",
                description:
                  "All files, feedback, and project assets in one organized location",
              },
              {
                icon: <MessageSquare className="w-8 h-8 text-purple-400" />,
                title: "Async client communication",
                description:
                  "No more back-and-forth emails. Everything stays organized",
              },
              {
                icon: <CheckCircle className="w-8 h-8 text-yellow-400" />,
                title: "Feedback & request tracking",
                description:
                  "Track all client requests and feedback with smart categorization",
              },
              {
                icon: <Users className="w-8 h-8 text-pink-400" />,
                title: "Clean client interface",
                description:
                  "Beautiful, no-login interface that your clients will love",
              },
              {
                icon: <Zap className="w-8 h-8 text-orange-400" />,
                title: "Smart automation",
                description:
                  "Automated reminders, notifications, and workflow triggers",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-all duration-300 hover:scale-105"
              >
                <CardHeader>
                  <div className="flex items-center gap-3">
                    {feature.icon}
                    <CardTitle className="text-white">
                      {feature.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-slate-300">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* AI-Powered Magic Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge
                variant="secondary"
                className="mb-6 bg-purple-500/10 text-purple-400 border-purple-500/20"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                AI-Powered Magic
              </Badge>

              <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl mb-6">
                Let AI Handle the Updates
              </h2>

              <div className="space-y-6">
                {[
                  "Auto-drafted weekly project summaries",
                  "Smart categorization of feedback & requests",
                  "Proactive reminders for you & your clients",
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-lg text-slate-300">{item}</p>
                  </div>
                ))}
              </div>

              <Button
                size="lg"
                className="mt-8 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white"
              >
                See AI in Action
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur-3xl"></div>
              <div className="relative bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8">
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <Bot className="w-6 h-6 text-purple-400" />
                    <span className="text-white font-semibold">
                      AI Assistant
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-slate-700/50 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="w-4 h-4 text-blue-400" />
                        <span className="text-sm text-slate-300">
                          Weekly Summary
                        </span>
                      </div>
                      <div className="space-y-2">
                        <div className="h-3 bg-blue-500/20 rounded w-full"></div>
                        <div className="h-3 bg-blue-500/20 rounded w-4/5"></div>
                        <div className="h-3 bg-blue-500/20 rounded w-2/3"></div>
                      </div>
                    </div>

                    <div className="bg-slate-700/50 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Shield className="w-4 h-4 text-green-400" />
                        <span className="text-sm text-slate-300">
                          Smart Categories
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <Badge
                          variant="secondary"
                          className="bg-green-500/20 text-green-400"
                        >
                          Design
                        </Badge>
                        <Badge
                          variant="secondary"
                          className="bg-blue-500/20 text-blue-400"
                        >
                          Development
                        </Badge>
                        <Badge
                          variant="secondary"
                          className="bg-purple-500/20 text-purple-400"
                        >
                          Content
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 bg-slate-800/30">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl mb-6">
              Loved by agency owners
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Join the growing community of professionals who've simplified
              their client workflows
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                quote: "This would've saved us hours weekly.",
                author: "Small Agency Owner",
                rating: 5,
              },
              {
                quote:
                  "Finally, a tool that actually understands our workflow.",
                author: "Freelance Designer",
                rating: 5,
              },
              {
                quote: "Our clients love the clean interface.",
                author: "Digital Agency CEO",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <Card key={index} className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="text-slate-300 mb-4 italic">
                    "{testimonial.quote}"
                  </p>
                  <p className="text-slate-400 font-semibold">
                    — {testimonial.author}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl mb-6">
            Join 50+ agency owners already on the waitlist
          </h2>
          <p className="text-xl text-slate-300 mb-10">
            Get early access to the future of client communication
          </p>

          <div className="max-w-md mx-auto">
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="pl-10 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-400 h-12"
                />
              </div>
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 h-12"
              >
                Get Early Access
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
            <p className="text-sm text-slate-400 mt-3">
              No spam, ever. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 py-12 sm:px-6 lg:px-8 border-t border-slate-800">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-2">ClientFlow</h3>
            <p className="text-slate-400 mb-6">
              The future of client communication
            </p>
            <div className="flex justify-center gap-6 text-slate-400">
              <a href="#" className="hover:text-white transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

import { PortfolioCard } from "@/components/portfolio-card";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { AdminShortcut } from "@/components/admin-shortcut";
import { getPortfolioData } from "@/lib/models";

export default async function Home() {
  const portfolioData = await getPortfolioData() || {
    name: "John Doe",
    title: "Full Stack Developer",
    description: "Passionate developer with 5+ years of experience building web applications. I love creating user-friendly interfaces and solving complex problems through clean, efficient code. Always eager to learn new technologies and contribute to meaningful projects.",
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "Python",
      "PostgreSQL",
      "AWS",
      "Docker",
      "Git",
      "Tailwind CSS"
    ],
    socialMedia: [
      {
        platform: "GitHub",
        url: "https://github.com/johndoe"
      },
      {
        platform: "LinkedIn",
        url: "https://linkedin.com/in/johndoe"
      },
      {
        platform: "Twitter",
        url: "https://twitter.com/johndoe"
      },
      {
        platform: "Email",
        url: "mailto:john@example.com"
      }
    ],
    projects: [
      {
        name: "E-Commerce Platform",
        description: "A full-stack e-commerce solution built with Next.js, featuring user authentication, payment processing, and admin dashboard.",
        technologies: ["Next.js", "TypeScript", "Stripe", "PostgreSQL", "Prisma"],
        link: "https://github.com/johndoe/ecommerce-platform"
      },
      {
        name: "Task Management App",
        description: "A collaborative task management application with real-time updates, team collaboration features, and project tracking.",
        technologies: ["React", "Node.js", "Socket.io", "MongoDB", "Express"],
        link: "https://github.com/johndoe/task-manager"
      },
      {
        name: "Weather Dashboard",
        description: "A responsive weather dashboard that displays current weather conditions and forecasts for multiple cities.",
        technologies: ["React", "OpenWeather API", "Chart.js", "CSS3"],
        link: "https://github.com/johndoe/weather-dashboard"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-black dark:to-black py-4 sm:py-8 px-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <AdminShortcut />
          <ThemeSwitcher />
        </div>
        <PortfolioCard {...portfolioData} />
      </div>
    </div>
  );
}

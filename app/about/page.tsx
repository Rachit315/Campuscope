"use client"

import Link from "next/link"
import {
  Github,
  Linkedin,
  Mail,
  Twitter,
  Code,
  Heart,
  Star,
  Award,
  Coffee,
  Zap,
  BookOpen,
  BarChart3,
  Shield,
  Users,
} from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useEffect, useState } from "react"

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState("project")
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  }

  const cardVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  }

  const skillVariants = {
    hidden: { width: 0 },
    visible: (i: number) => ({
      width: `${(i + 5) * 10}%`,
      transition: { duration: 1, delay: 0.2 * i },
    }),
  }

  const tabVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        delay: 0.2,
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.2 },
    },
  }

  const handleTabChange = (value: string) => {
    setActiveTab(value)
  }

  const skills = [
    { name: "React", level: 9, icon: <Code className="h-4 w-4" /> },
    { name: "Next.js", level: 8, icon: <Zap className="h-4 w-4" /> },
    { name: "TypeScript", level: 8, icon: <Code className="h-4 w-4" /> },
    { name: "Tailwind CSS", level: 9, icon: <Star className="h-4 w-4" /> },
    { name: "Node.js", level: 7, icon: <Zap className="h-4 w-4" /> },
    { name: "PostgreSQL", level: 7, icon: <BookOpen className="h-4 w-4" /> },
    { name: "UI/UX Design", level: 8, icon: <Heart className="h-4 w-4" /> },
    { name: "API Development", level: 8, icon: <Code className="h-4 w-4" /> },
    { name: "Responsive Design", level: 9, icon: <Award className="h-4 w-4" /> },
  ]

  const timelineEvents = [
    { year: "2021", title: "Started CampuScope", description: "Began development of the initial concept" },
    { year: "2022", title: "Beta Launch", description: "Released the first beta version to select users" },
    { year: "2023", title: "Public Release", description: "Officially launched CampuScope to the public" },
    { year: "2024", title: "Expansion", description: "Added new features and expanded the college database" },
  ]

  return (
    <div className="container max-w-5xl py-10 space-y-10 overflow-hidden">
      <motion.div
        className="space-y-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1
          className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          About CampuScope
        </motion.h1>
        <motion.p
          className="text-xl text-muted-foreground"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          Discover the story behind CampuScope and the developer who created it.
        </motion.p>
      </motion.div>

      <Tabs defaultValue="project" className="w-full" onValueChange={handleTabChange}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <TabsList className="grid w-full grid-cols-2 relative overflow-hidden">
            <motion.div
              className="absolute bottom-0 h-[3px] bg-primary rounded-full"
              initial={{ left: "0%", width: "50%" }}
              animate={{
                left: activeTab === "project" ? "0%" : "50%",
                width: "50%",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
            <TabsTrigger value="project" className="relative z-10">
              <motion.span
                initial={{ scale: 0.9 }}
                animate={{ scale: activeTab === "project" ? 1 : 0.9 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                The Project
              </motion.span>
            </TabsTrigger>
            <TabsTrigger value="developer" className="relative z-10">
              <motion.span
                initial={{ scale: 0.9 }}
                animate={{ scale: activeTab === "developer" ? 1 : 0.9 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                The Developer
              </motion.span>
            </TabsTrigger>
          </TabsList>
        </motion.div>

        <motion.div key={activeTab} initial="hidden" animate="visible" exit="exit" variants={tabVariants}>
          <TabsContent value="project" className="space-y-6 pt-4">
            <motion.div variants={containerVariants} initial="hidden" animate={isVisible ? "visible" : "hidden"}>
              <Card className="overflow-hidden border-2 border-primary/10 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5">
                  <motion.div variants={itemVariants}>
                    <CardTitle className="flex items-center gap-2">
                      <Star className="h-5 w-5 text-primary animate-pulse" />
                      CampuScope: Honest College Reviews
                    </CardTitle>
                  </motion.div>
                  <motion.div variants={itemVariants}>
                    <CardDescription>
                      A platform dedicated to providing transparent insights into college experiences
                    </CardDescription>
                  </motion.div>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                  <motion.div variants={itemVariants}>
                    <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                      <Heart className="h-5 w-5 text-primary" />
                      Our Mission
                    </h3>
                    <p className="text-muted-foreground">
                      CampuScope aims to revolutionize how students choose colleges by providing authentic, unfiltered
                      reviews from real students. We believe that prospective students deserve to know what campus life
                      is truly like before making one of the most important decisions of their lives.
                    </p>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                      <Award className="h-5 w-5 text-primary" />
                      What We Offer
                    </h3>
                    <ul className="grid gap-2">
                      {[
                        "Authentic reviews from verified students",
                        "Comprehensive college profiles with key statistics",
                        "Trending colleges and reviews to stay updated",
                        "Personalized dashboard to track your favorite colleges",
                        "Community-driven insights into campus life",
                      ].map((item, i) => (
                        <motion.li
                          key={i}
                          className="flex items-center gap-2 p-2 rounded-md hover:bg-primary/5 transition-colors"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * i + 0.5 }}
                        >
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.1 * i + 0.7, type: "spring" }}
                          >
                            <div className="h-2 w-2 rounded-full bg-primary" />
                          </motion.div>
                          <span className="text-muted-foreground">{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Star className="h-5 w-5 text-primary" />
                      Our Values
                    </h3>
                    <div className="grid gap-4 md:grid-cols-3">
                      {[
                        {
                          title: "Transparency",
                          description:
                            "We believe in showing the complete picture, both good and bad aspects of college life.",
                          icon: <Zap className="h-5 w-5 text-primary" />,
                        },
                        {
                          title: "Authenticity",
                          description: "Every review comes from real students with real experiences.",
                          icon: <Award className="h-5 w-5 text-primary" />,
                        },
                        {
                          title: "Community",
                          description: "We foster a supportive environment for students to share and learn.",
                          icon: <Heart className="h-5 w-5 text-primary" />,
                        },
                      ].map((value, i) => (
                        <motion.div
                          key={i}
                          variants={cardVariants}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Card className="h-full border-primary/10 hover:border-primary/30 transition-colors">
                            <CardHeader className="pb-2">
                              <CardTitle className="text-base flex items-center gap-2">
                                {value.icon}
                                {value.title}
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <p className="text-sm text-muted-foreground">{value.description}</p>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants} className="pt-4">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Star className="h-5 w-5 text-primary" />
                      How Our Review System Works
                    </h3>
                    <div className="grid gap-6 md:grid-cols-2">
                      {[
                        {
                          title: "Verified Reviews",
                          description:
                            "All reviews are submitted by verified students who have attended the college, ensuring authenticity and reliability.",
                          icon: <Award className="h-10 w-10 text-primary/40" />,
                        },
                        {
                          title: "Comprehensive Ratings",
                          description:
                            "Students rate colleges across multiple categories including academics, campus life, facilities, and value for money.",
                          icon: <BarChart3 className="h-10 w-10 text-primary/40" />,
                        },
                        {
                          title: "Anonymous Submissions",
                          description:
                            "Students can share their honest experiences anonymously, encouraging candid and unfiltered feedback.",
                          icon: <Shield className="h-10 w-10 text-primary/40" />,
                        },
                        {
                          title: "Community Moderation",
                          description:
                            "Our community helps ensure reviews are helpful and appropriate through upvotes and reporting features.",
                          icon: <Users className="h-10 w-10 text-primary/40" />,
                        },
                      ].map((item, i) => (
                        <motion.div
                          key={i}
                          className="bg-primary/5 p-4 rounded-lg border border-primary/10 relative overflow-hidden"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 * i + 0.5 }}
                        >
                          <div className="absolute right-0 bottom-0 opacity-10">{item.icon}</div>
                          <h4 className="font-medium text-base mb-2">{item.title}</h4>
                          <p className="text-sm text-muted-foreground relative z-10">{item.description}</p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="developer" className="space-y-6 pt-4">
            <motion.div variants={containerVariants} initial="hidden" animate={isVisible ? "visible" : "hidden"}>
              <Card className="overflow-hidden border-2 border-primary/10 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5">
                  <motion.div variants={itemVariants}>
                    <CardTitle className="flex items-center gap-2">
                      <Code className="h-5 w-5 text-primary animate-pulse" />
                      Rachit Thakur
                    </CardTitle>
                  </motion.div>
                  <motion.div variants={itemVariants}>
                    <CardDescription>Full-Stack Developer & Creator of CampuScope</CardDescription>
                  </motion.div>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                  <motion.div variants={itemVariants}>
                    <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                      <Coffee className="h-5 w-5 text-primary" />
                      About Me
                    </h3>
                    <p className="text-muted-foreground">
                      I'm Rachit Thakur, a passionate full-stack developer with a focus on creating meaningful web
                      applications that solve real problems. CampuScope was born from my own experience navigating the
                      complex process of college selection and wanting to create a more transparent system for future
                      students.
                    </p>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Code className="h-5 w-5 text-primary" />
                      Technical Skills
                    </h3>
                    <div className="space-y-4">
                      {skills.map((skill, i) => (
                        <div key={i} className="space-y-1">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              {skill.icon}
                              <span>{skill.name}</span>
                            </div>
                            <span className="text-sm text-muted-foreground">{skill.level}/10</span>
                          </div>
                          <div className="h-2 w-full bg-primary/10 rounded-full overflow-hidden">
                            <motion.div
                              className="h-full bg-primary rounded-full"
                              custom={i}
                              variants={skillVariants}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                      <Star className="h-5 w-5 text-primary" />
                      My Vision
                    </h3>
                    <p className="text-muted-foreground">
                      I believe technology should empower people to make better decisions. With CampuScope, my goal is
                      to create a platform that helps students find the right college fit based on authentic experiences
                      rather than marketing materials. I'm committed to continuously improving this platform to better
                      serve the student community.
                    </p>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                      <Mail className="h-5 w-5 text-primary" />
                      Connect With Me
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {[
                        { name: "GitHub", icon: <Github className="h-4 w-4" /> },
                        { name: "LinkedIn", icon: <Linkedin className="h-4 w-4" /> },
                        { name: "Twitter", icon: <Twitter className="h-4 w-4" /> },
                        { name: "Email", icon: <Mail className="h-4 w-4" /> },
                      ].map((social, i) => (
                        <motion.div
                          key={i}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 * i + 0.5 }}
                        >
                          <Button variant="outline" size="sm" className="gap-2 relative overflow-hidden group">
                            <motion.div
                              className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-10 transition-opacity"
                              initial={{ scale: 0, opacity: 0 }}
                              whileHover={{ scale: 1, opacity: 1 }}
                              transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            />
                            {social.icon}
                            <span>{social.name}</span>
                          </Button>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  <motion.div className="border-t pt-6 mt-6" variants={itemVariants}>
                    <motion.div
                      className="relative p-4 bg-primary/5 rounded-lg border border-primary/10"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1 }}
                    >
                      <motion.div
                        className="absolute -top-3 -left-3 text-4xl"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.2, type: "spring" }}
                      >
                        "
                      </motion.div>
                      <p className="text-center text-muted-foreground italic">
                        I'm always open to feedback and collaboration. If you have ideas to improve CampuScope or want
                        to work together on a project, don't hesitate to reach out!
                      </p>
                      <motion.div
                        className="absolute -bottom-3 -right-3 text-4xl"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.4, type: "spring" }}
                      >
                        "
                      </motion.div>
                    </motion.div>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </motion.div>
      </Tabs>

      <motion.div
        className="flex justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button asChild className="relative overflow-hidden group">
            <Link href="/submit-review">
              <motion.div
                className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              />
              Contribute to CampuScope
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </div>
  )
}

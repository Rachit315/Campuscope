"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  MapPin,
  Users,
  GraduationCap,
  Building,
  DollarSign,
  Filter,
  PenSquare,
  Calendar,
} from "lucide-react"
import ReviewCard from "@/components/review-card"
import CollegeChart from "@/components/college-chart"
import ReviewHeatmap from "@/components/review-heatmap"
import CollegeDetailSkeleton from "@/components/skeletons/college-detail-skeleton"
import InstantPoll from "@/components/instant-poll"
import DynamicTags from "@/components/dynamic-tags"
import AnonymousAvatar from "@/components/anonymous-avatar"
import ReviewTimeline from "@/components/review-timeline"

// College data mapping
const collegesData = {
  "1": {
    id: 1,
    name: "Indian Institute of Technology (IIT) Madras",
    location: "Chennai, Tamil Nadu",
    type: "Government Institute",
    founded: 1959,
    students: 9000,
    acceptance: "1%",
    tuition: "₹2,20,000 per year",
    nirfRanking: "#1 in Engineering",
    entranceExam: "JEE Advanced",
    description:
      "IIT Madras is renowned for its excellence in engineering, research, and technology education. The campus is located in Chennai and is known for its beautiful deer park. It consistently ranks as the top engineering institute in India with exceptional placement records and research output.",
    tags: ["Engineering", "Research", "Technology", "Innovation", "STEM"],
    stats: {
      overall: 4.7,
      academics: 4.9,
      social: 4.3,
      facilities: 4.6,
      value: 4.8,
      safety: 4.5,
      placements: 4.9,
      faculty: 4.8,
    },
    reviews: [
      {
        id: 1,
        collegeName: "IIT Madras",
        collegeInitials: "IITM",
        content:
          "The engineering program is world-class but be prepared for intense competition. The professors are brilliant researchers but teaching quality varies. Campus infrastructure is excellent with great labs.",
        rating: 5,
        timeAgo: "3h ago",
        date: "2023-05-15",
        reactions: {
          "🔥": 42,
          "💀": 28,
          "😭": 15,
          "🤡": 5,
          "🧢": 2,
        },
        tags: ["engineering", "research", "competition"],
      },
      {
        id: 2,
        collegeName: "IIT Madras",
        collegeInitials: "IITM",
        content:
          "The campus is beautiful with deer roaming freely. Research opportunities are abundant if you're proactive. The placement cell is excellent with top companies visiting regularly.",
        rating: 4,
        timeAgo: "2d ago",
        date: "2023-05-10",
        reactions: {
          "🔥": 35,
          "💀": 18,
          "😭": 12,
          "🤡": 4,
          "🧢": 7,
        },
        tags: ["campus", "placements", "research"],
      },
      {
        id: 3,
        collegeName: "IIT Madras",
        collegeInitials: "IITM",
        content:
          "Hostel facilities need improvement. Mess food quality is average at best. The academic pressure is immense, and mental health support could be better. Great for academics but social life suffers.",
        rating: 3,
        timeAgo: "1w ago",
        date: "2023-05-03",
        reactions: {
          "🔥": 21,
          "💀": 32,
          "😭": 19,
          "🤡": 8,
          "🧢": 5,
        },
        tags: ["hostel", "mess-food", "mental-health"],
      },
      {
        id: 4,
        collegeName: "IIT Madras",
        collegeInitials: "IITM",
        content:
          "The online degree programs are revolutionary and accessible. The faculty is supportive if you show interest. Research infrastructure is top-notch with excellent funding opportunities.",
        rating: 5,
        timeAgo: "2w ago",
        date: "2023-04-25",
        reactions: {
          "🔥": 48,
          "💀": 9,
          "😭": 7,
          "🤡": 3,
          "🧢": 11,
        },
        tags: ["online-degree", "faculty", "research-funding"],
      },
      {
        id: 5,
        collegeName: "IIT Madras",
        collegeInitials: "IITM",
        content:
          "The startup ecosystem is thriving with great incubation support. Cultural festivals like Saarang are amazing. The alumni network is incredibly strong and helpful for career growth.",
        rating: 4,
        timeAgo: "3w ago",
        date: "2023-04-18",
        reactions: {
          "🔥": 29,
          "💀": 15,
          "😭": 10,
          "🤡": 6,
          "🧢": 4,
        },
        tags: ["startup", "culture", "alumni"],
      },
    ],
    placementStats: {
      averagePackage: "₹16.5 LPA",
      highestPackage: "₹1.2 Cr",
      placementPercentage: "92%",
      topRecruiters: ["Google", "Microsoft", "Amazon", "Qualcomm", "Goldman Sachs"],
    },
    fees: {
      tuitionPerSemester: "₹1,10,000",
      hostelPerSemester: "₹20,000",
      messPerMonth: "₹4,500",
      otherCharges: "₹10,000",
    },
    hostelInfo: {
      numberOfHostels: 20,
      roomTypes: ["Single", "Double", "Triple"],
      facilities: ["Wi-Fi", "Gym", "Reading Room", "Indoor Games", "Washing Machine"],
    },
    reservationCategories: ["General", "OBC-NCL", "SC", "ST", "EWS", "PWD"],
    ratingTrends: [
      { month: "Jan", rating: 4.5 },
      { month: "Feb", rating: 4.6 },
      { month: "Mar", rating: 4.5 },
      { month: "Apr", rating: 4.7 },
      { month: "May", rating: 4.8 },
      { month: "Jun", rating: 4.7 },
      { month: "Jul", rating: 4.6 },
      { month: "Aug", rating: 4.5 },
      { month: "Sep", rating: 4.7 },
      { month: "Oct", rating: 4.8 },
      { month: "Nov", rating: 4.7 },
      { month: "Dec", rating: 4.6 },
    ],
    heatmapData: [
      { day: "Mon", hour: "8AM", value: 3 },
      { day: "Mon", hour: "12PM", value: 7 },
      { day: "Mon", hour: "4PM", value: 5 },
      { day: "Mon", hour: "8PM", value: 8 },
      { day: "Tue", hour: "8AM", value: 2 },
      { day: "Tue", hour: "12PM", value: 9 },
      { day: "Tue", hour: "4PM", value: 6 },
      { day: "Tue", hour: "8PM", value: 4 },
      { day: "Wed", hour: "8AM", value: 1 },
      { day: "Wed", hour: "12PM", value: 5 },
      { day: "Wed", hour: "4PM", value: 8 },
      { day: "Wed", hour: "8PM", value: 10 },
      { day: "Thu", hour: "8AM", value: 4 },
      { day: "Thu", hour: "12PM", value: 6 },
      { day: "Thu", hour: "4PM", value: 7 },
      { day: "Thu", hour: "8PM", value: 9 },
      { day: "Fri", hour: "8AM", value: 2 },
      { day: "Fri", hour: "12PM", value: 8 },
      { day: "Fri", hour: "4PM", value: 9 },
      { day: "Fri", hour: "8PM", value: 10 },
      { day: "Sat", hour: "8AM", value: 1 },
      { day: "Sat", hour: "12PM", value: 3 },
      { day: "Sat", hour: "4PM", value: 4 },
      { day: "Sat", hour: "8PM", value: 7 },
      { day: "Sun", hour: "8AM", value: 1 },
      { day: "Sun", hour: "12PM", value: 2 },
      { day: "Sun", hour: "4PM", value: 5 },
      { day: "Sun", hour: "8PM", value: 6 },
    ],
    polls: [
      {
        id: "poll1",
        question: "Is IIT Madras worth the JEE Advanced preparation?",
        options: [
          { id: "yes", text: "Yes, definitely", votes: 324 },
          { id: "somewhat", text: "Somewhat overrated", votes: 89 },
          { id: "fair", text: "Rating is fair", votes: 203 },
          { id: "underrated", text: "Actually underrated", votes: 176 },
        ],
      },
      {
        id: "poll2",
        question: "How's the placement scenario?",
        options: [
          { id: "excellent", text: "Excellent, top companies visit", votes: 356 },
          { id: "good", text: "Good for CS/IT, average for others", votes: 218 },
          { id: "average", text: "Average, depends on branch", votes: 97 },
          { id: "poor", text: "Not as good as advertised", votes: 43 },
        ],
      },
    ],
    suggestedTags: [
      "jee-preparation",
      "placements",
      "hostel-life",
      "mess-food",
      "faculty",
      "curriculum",
      "lab-facilities",
      "internships",
      "campus-life",
      "competitive",
    ],
  },
  "2": {
    id: 2,
    name: "Indian Institute of Science (IISc)",
    location: "Bangalore, Karnataka",
    type: "Government Institute",
    founded: 1909,
    students: 4500,
    acceptance: "0.8%",
    tuition: "₹2,30,000 per year",
    nirfRanking: "#1 in Research",
    entranceExam: "GATE/JEE Advanced",
    description:
      "The Indian Institute of Science (IISc) is India's premier research institution located in Bangalore. Known for its cutting-edge research in science and engineering, IISc offers world-class education with a focus on postgraduate and doctoral programs. The lush green campus spans 400 acres and houses state-of-the-art research facilities.",
    tags: ["Research", "Science", "Engineering", "Innovation", "Postgraduate"],
    stats: {
      overall: 4.8,
      academics: 4.9,
      social: 4.1,
      facilities: 4.7,
      value: 4.9,
      safety: 4.6,
      placements: 4.8,
      faculty: 4.9,
    },
    reviews: [
      {
        id: 1,
        collegeName: "IISc Bangalore",
        collegeInitials: "IISc",
        content:
          "The research environment is unparalleled in India. Professors are top-notch researchers with international recognition. The academic rigor is intense but extremely rewarding for serious students.",
        rating: 5,
        timeAgo: "2d ago",
        date: "2023-05-12",
        reactions: {
          "🔥": 52,
          "💀": 18,
          "😭": 10,
          "🤡": 2,
          "🧢": 3,
        },
        tags: ["research", "faculty", "academics"],
      },
      {
        id: 2,
        collegeName: "IISc Bangalore",
        collegeInitials: "IISc",
        content:
          "The campus is beautiful with abundant greenery. Research facilities are world-class with the latest equipment. The library is exceptional with access to all major journals and publications.",
        rating: 5,
        timeAgo: "1w ago",
        date: "2023-05-05",
        reactions: {
          "🔥": 45,
          "💀": 12,
          "😭": 8,
          "🤡": 3,
          "🧢": 5,
        },
        tags: ["campus", "facilities", "library"],
      },
      {
        id: 3,
        collegeName: "IISc Bangalore",
        collegeInitials: "IISc",
        content:
          "Social life is limited compared to other colleges. The focus is entirely on academics and research. Hostel facilities are decent but could be improved. Food quality in the mess is good.",
        rating: 4,
        timeAgo: "2w ago",
        date: "2023-04-28",
        reactions: {
          "🔥": 25,
          "💀": 22,
          "😭": 15,
          "🤡": 6,
          "🧢": 4,
        },
        tags: ["social-life", "hostel", "mess-food"],
      },
      {
        id: 4,
        collegeName: "IISc Bangalore",
        collegeInitials: "IISc",
        content:
          "The funding for research projects is generous. Collaboration opportunities with industry and international universities are abundant. The faculty-to-student ratio is excellent.",
        rating: 5,
        timeAgo: "3w ago",
        date: "2023-04-21",
        reactions: {
          "🔥": 38,
          "💀": 7,
          "😭": 5,
          "🤡": 2,
          "🧢": 8,
        },
        tags: ["research-funding", "collaboration", "faculty-ratio"],
      },
      {
        id: 5,
        collegeName: "IISc Bangalore",
        collegeInitials: "IISc",
        content:
          "The workload is intense and can be overwhelming. Mental health support services are available but could be more robust. The alumni network is strong and helpful for career advancement.",
        rating: 4,
        timeAgo: "1m ago",
        date: "2023-04-10",
        reactions: {
          "🔥": 32,
          "💀": 28,
          "😭": 18,
          "🤡": 4,
          "🧢": 6,
        },
        tags: ["workload", "mental-health", "alumni"],
      },
    ],
    placementStats: {
      averagePackage: "₹18.5 LPA",
      highestPackage: "₹1.5 Cr",
      placementPercentage: "95%",
      topRecruiters: ["Intel", "IBM Research", "Google", "ISRO", "DRDO"],
    },
    fees: {
      tuitionPerSemester: "₹1,15,000",
      hostelPerSemester: "₹22,000",
      messPerMonth: "₹4,800",
      otherCharges: "₹12,000",
    },
    hostelInfo: {
      numberOfHostels: 18,
      roomTypes: ["Single", "Double"],
      facilities: ["Wi-Fi", "Gym", "Reading Room", "Sports Complex", "Laundry"],
    },
    reservationCategories: ["General", "OBC-NCL", "SC", "ST", "EWS", "PWD"],
    ratingTrends: [
      { month: "Jan", rating: 4.7 },
      { month: "Feb", rating: 4.8 },
      { month: "Mar", rating: 4.7 },
      { month: "Apr", rating: 4.8 },
      { month: "May", rating: 4.9 },
      { month: "Jun", rating: 4.8 },
      { month: "Jul", rating: 4.7 },
      { month: "Aug", rating: 4.8 },
      { month: "Sep", rating: 4.9 },
      { month: "Oct", rating: 4.8 },
      { month: "Nov", rating: 4.7 },
      { month: "Dec", rating: 4.8 },
    ],
    heatmapData: [
      { day: "Mon", hour: "8AM", value: 4 },
      { day: "Mon", hour: "12PM", value: 8 },
      { day: "Mon", hour: "4PM", value: 6 },
      { day: "Mon", hour: "8PM", value: 9 },
      { day: "Tue", hour: "8AM", value: 3 },
      { day: "Tue", hour: "12PM", value: 7 },
      { day: "Tue", hour: "4PM", value: 8 },
      { day: "Tue", hour: "8PM", value: 5 },
      { day: "Wed", hour: "8AM", value: 2 },
      { day: "Wed", hour: "12PM", value: 6 },
      { day: "Wed", hour: "4PM", value: 9 },
      { day: "Wed", hour: "8PM", value: 10 },
      { day: "Thu", hour: "8AM", value: 3 },
      { day: "Thu", hour: "12PM", value: 7 },
      { day: "Thu", hour: "4PM", value: 8 },
      { day: "Thu", hour: "8PM", value: 9 },
      { day: "Fri", hour: "8AM", value: 3 },
      { day: "Fri", hour: "12PM", value: 9 },
      { day: "Fri", hour: "4PM", value: 8 },
      { day: "Fri", hour: "8PM", value: 7 },
      { day: "Sat", hour: "8AM", value: 2 },
      { day: "Sat", hour: "12PM", value: 4 },
      { day: "Sat", hour: "4PM", value: 5 },
      { day: "Sat", hour: "8PM", value: 6 },
      { day: "Sun", hour: "8AM", value: 1 },
      { day: "Sun", hour: "12PM", value: 3 },
      { day: "Sun", hour: "4PM", value: 4 },
      { day: "Sun", hour: "8PM", value: 5 },
    ],
    polls: [
      {
        id: "poll1",
        question: "Is IISc the best place for research in India?",
        options: [
          { id: "yes", text: "Yes, absolutely", votes: 412 },
          { id: "somewhat", text: "Good but overhyped", votes: 78 },
          { id: "fair", text: "On par with top IITs", votes: 156 },
          { id: "no", text: "Specialized institutes are better", votes: 43 },
        ],
      },
      {
        id: "poll2",
        question: "How's the work-life balance?",
        options: [
          { id: "excellent", text: "Well balanced", votes: 87 },
          { id: "good", text: "Manageable but challenging", votes: 245 },
          { id: "poor", text: "Too much academic pressure", votes: 178 },
          { id: "terrible", text: "No life outside academics", votes: 98 },
        ],
      },
    ],
    suggestedTags: [
      "research-quality",
      "lab-facilities",
      "faculty-expertise",
      "publication-opportunities",
      "industry-collaboration",
      "workload",
      "hostel-life",
      "mess-food",
      "bangalore-life",
      "phd-programs",
    ],
  },
  "3": {
    id: 3,
    name: "IIT Delhi",
    location: "New Delhi, Delhi",
    type: "Government Institute",
    founded: 1961,
    students: 8500,
    acceptance: "1.2%",
    tuition: "₹2,20,000 per year",
    nirfRanking: "#2 in Engineering",
    entranceExam: "JEE Advanced",
    description:
      "IIT Delhi is one of India's most prestigious engineering institutes located in the heart of the capital. Known for its strong engineering programs, innovation ecosystem, and entrepreneurial culture, it has produced numerous successful startups and business leaders. The campus offers excellent facilities and a vibrant student life.",
    tags: ["Engineering", "Innovation", "Startups", "Technology", "Research"],
    stats: {
      overall: 4.6,
      academics: 4.8,
      social: 4.5,
      facilities: 4.5,
      value: 4.7,
      safety: 4.4,
      placements: 4.8,
      faculty: 4.7,
    },
    reviews: [
      {
        id: 1,
        collegeName: "IIT Delhi",
        collegeInitials: "IITD",
        content:
          "The startup ecosystem is phenomenal with great incubation support at TBIU. The entrepreneurship cell is very active and provides excellent networking opportunities with investors and industry leaders.",
        rating: 5,
        timeAgo: "1d ago",
        date: "2023-05-14",
        reactions: {
          "🔥": 48,
          "💀": 15,
          "😭": 8,
          "🤡": 3,
          "🧢": 4,
        },
        tags: ["startup", "entrepreneurship", "networking"],
      },
      {
        id: 2,
        collegeName: "IIT Delhi",
        collegeInitials: "IITD",
        content:
          "Being in Delhi has its advantages with easy access to industry, government, and cultural events. The campus is well-maintained but feels a bit congested compared to other IITs. The metro connectivity is a huge plus.",
        rating: 4,
        timeAgo: "4d ago",
        date: "2023-05-11",
        reactions: {
          "🔥": 32,
          "💀": 14,
          "😭": 10,
          "🤡": 5,
          "🧢": 6,
        },
        tags: ["location", "campus", "delhi-life"],
      },
      {
        id: 3,
        collegeName: "IIT Delhi",
        collegeInitials: "IITD",
        content:
          "The academic pressure is intense, especially in the first year. The curriculum is rigorous but sometimes feels outdated in certain departments. Faculty quality varies significantly between departments.",
        rating: 3,
        timeAgo: "1w ago",
        date: "2023-05-08",
        reactions: {
          "🔥": 25,
          "💀": 30,
          "😭": 22,
          "🤡": 7,
          "🧢": 5,
        },
        tags: ["academics", "curriculum", "faculty"],
      },
      {
        id: 4,
        collegeName: "IIT Delhi",
        collegeInitials: "IITD",
        content:
          "Placements are excellent with top companies visiting regularly. The highest packages are usually for CS/IT students, but core engineering companies also recruit in good numbers. The alumni network is very strong.",
        rating: 5,
        timeAgo: "2w ago",
        date: "2023-04-30",
        reactions: {
          "🔥": 42,
          "💀": 12,
          "😭": 8,
          "🤡": 4,
          "🧢": 9,
        },
        tags: ["placements", "alumni", "cs-it"],
      },
      {
        id: 5,
        collegeName: "IIT Delhi",
        collegeInitials: "IITD",
        content:
          "Hostel life is vibrant with lots of cultural and technical events throughout the year. Mess food quality varies between hostels. The sports facilities are good but could be better maintained.",
        rating: 4,
        timeAgo: "3w ago",
        date: "2023-04-23",
        reactions: {
          "🔥": 35,
          "💀": 18,
          "😭": 12,
          "🤡": 5,
          "🧢": 7,
        },
        tags: ["hostel-life", "mess-food", "sports"],
      },
    ],
    placementStats: {
      averagePackage: "₹17.2 LPA",
      highestPackage: "₹1.4 Cr",
      placementPercentage: "90%",
      topRecruiters: ["Microsoft", "Google", "Goldman Sachs", "McKinsey", "Samsung"],
    },
    fees: {
      tuitionPerSemester: "₹1,10,000",
      hostelPerSemester: "₹22,000",
      messPerMonth: "₹4,700",
      otherCharges: "₹11,000",
    },
    hostelInfo: {
      numberOfHostels: 13,
      roomTypes: ["Single", "Double", "Triple"],
      facilities: ["Wi-Fi", "Gym", "Common Room", "Sports Facilities", "Canteen"],
    },
    reservationCategories: ["General", "OBC-NCL", "SC", "ST", "EWS", "PWD"],
    ratingTrends: [
      { month: "Jan", rating: 4.4 },
      { month: "Feb", rating: 4.5 },
      { month: "Mar", rating: 4.6 },
      { month: "Apr", rating: 4.7 },
      { month: "May", rating: 4.6 },
      { month: "Jun", rating: 4.5 },
      { month: "Jul", rating: 4.4 },
      { month: "Aug", rating: 4.5 },
      { month: "Sep", rating: 4.6 },
      { month: "Oct", rating: 4.7 },
      { month: "Nov", rating: 4.6 },
      { month: "Dec", rating: 4.5 },
    ],
    heatmapData: [
      { day: "Mon", hour: "8AM", value: 4 },
      { day: "Mon", hour: "12PM", value: 8 },
      { day: "Mon", hour: "4PM", value: 7 },
      { day: "Mon", hour: "8PM", value: 9 },
      { day: "Tue", hour: "8AM", value: 3 },
      { day: "Tue", hour: "12PM", value: 8 },
      { day: "Tue", hour: "4PM", value: 7 },
      { day: "Tue", hour: "8PM", value: 6 },
      { day: "Wed", hour: "8AM", value: 2 },
      { day: "Wed", hour: "12PM", value: 6 },
      { day: "Wed", hour: "4PM", value: 8 },
      { day: "Wed", hour: "8PM", value: 9 },
      { day: "Thu", hour: "8AM", value: 3 },
      { day: "Thu", hour: "12PM", value: 7 },
      { day: "Thu", hour: "4PM", value: 8 },
      { day: "Thu", hour: "8PM", value: 10 },
      { day: "Fri", hour: "8AM", value: 3 },
      { day: "Fri", hour: "12PM", value: 7 },
      { day: "Fri", hour: "4PM", value: 9 },
      { day: "Fri", hour: "8PM", value: 10 },
      { day: "Sat", hour: "8AM", value: 2 },
      { day: "Sat", hour: "12PM", value: 4 },
      { day: "Sat", hour: "4PM", value: 6 },
      { day: "Sat", hour: "8PM", value: 8 },
      { day: "Sun", hour: "8AM", value: 1 },
      { day: "Sun", hour: "12PM", value: 3 },
      { day: "Sun", hour: "4PM", value: 5 },
      { day: "Sun", hour: "8PM", value: 7 },
    ],
    polls: [
      {
        id: "poll1",
        question: "Is IIT Delhi good for entrepreneurship?",
        options: [
          { id: "yes", text: "Yes, excellent ecosystem", votes: 356 },
          { id: "somewhat", text: "Good but needs improvement", votes: 124 },
          { id: "average", text: "Average support", votes: 87 },
          { id: "no", text: "Not as good as claimed", votes: 45 },
        ],
      },
      {
        id: "poll2",
        question: "How's the Delhi location advantage?",
        options: [
          { id: "great", text: "Great for opportunities", votes: 278 },
          { id: "good", text: "Good but pollution is an issue", votes: 189 },
          { id: "mixed", text: "Mixed feelings, crowded city", votes: 134 },
          { id: "bad", text: "Prefer quieter campuses", votes: 67 },
        ],
      },
    ],
    suggestedTags: [
      "startup-ecosystem",
      "delhi-location",
      "placements",
      "hostel-life",
      "mess-food",
      "faculty",
      "curriculum",
      "internships",
      "cultural-fests",
      "technical-clubs",
    ],
  },
}

export default function CollegeDetailPage({ params }: { params: { id: string } }) {
  const [filter, setFilter] = useState("all")
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null)
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [collegeData, setCollegeData] = useState(collegesData["1"]) // Default to IIT Madras

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      // Get college data based on ID parameter
      if (collegesData[params.id]) {
        setCollegeData(collegesData[params.id])
      }
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [params.id])

  const getFilteredReviews = () => {
    let filtered = [...collegeData.reviews]

    // Filter by emoji if selected
    if (selectedEmoji) {
      filtered = filtered.filter((review) => review.reactions[selectedEmoji] && review.reactions[selectedEmoji] > 0)
    }

    // Filter by tags if selected
    if (selectedTags.length > 0) {
      filtered = filtered.filter((review) => review.tags && selectedTags.some((tag) => review.tags?.includes(tag)))
    }

    // Apply additional filters
    if (filter === "highest") {
      filtered.sort((a, b) => b.rating - a.rating)
    } else if (filter === "lowest") {
      filtered.sort((a, b) => a.rating - b.rating)
    } else if (filter === "recent") {
      filtered.sort((a, b) => {
        if (a.timeAgo.includes("h") && b.timeAgo.includes("h")) {
          return Number.parseInt(a.timeAgo) - Number.parseInt(b.timeAgo)
        }
        if (a.timeAgo.includes("h")) return -1
        if (b.timeAgo.includes("h")) return 1
        if (a.timeAgo.includes("d") && b.timeAgo.includes("d")) {
          return Number.parseInt(a.timeAgo) - Number.parseInt(b.timeAgo)
        }
        if (a.timeAgo.includes("d")) return -1
        if (b.timeAgo.includes("d")) return 1
        return 0
      })
    } else if (filter === "spicy") {
      filtered.sort((a, b) => {
        const aSpice = (a.reactions["🔥"] || 0) + (a.reactions["💀"] || 0)
        const bSpice = (b.reactions["🔥"] || 0) + (b.reactions["💀"] || 0)
        return bSpice - aSpice
      })
    }

    return filtered
  }

  const handleEmojiFilter = (emoji: string) => {
    setSelectedEmoji((prev) => (prev === emoji ? null : emoji))
  }

  const handleTagsChange = (tags: string[]) => {
    setSelectedTags(tags)
  }

  const handlePollVote = (pollId: string, optionId: string) => {
    console.log(`Voted for ${optionId} in poll ${pollId}`)
    // In a real app, you would send this to your backend
  }

  if (isLoading) {
    return <CollegeDetailSkeleton />
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <Button variant="ghost" asChild>
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>

        <Select
          value={params.id}
          onValueChange={(value) => {
            window.location.href = `/college/${value}`
          }}
        >
          <SelectTrigger className="w-[250px]">
            <SelectValue placeholder="Switch College" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">IIT Madras</SelectItem>
            <SelectItem value="2">IISc Bangalore</SelectItem>
            <SelectItem value="3">IIT Delhi</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* College Info */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-3xl">{collegeData.name}</CardTitle>
                    <CardDescription className="flex items-center mt-1">
                      <MapPin className="h-4 w-4 mr-1" />
                      {collegeData.location}
                    </CardDescription>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="text-4xl font-bold text-yellow-500">{collegeData.stats.overall}</div>
                    <div className="text-sm text-muted-foreground">Overall Rating</div>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <Tabs defaultValue="overview" onValueChange={setActiveTab}>
                  <TabsList className="mb-4">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="reviews">Reviews</TabsTrigger>
                    <TabsTrigger value="analytics">Analytics</TabsTrigger>
                    <TabsTrigger value="timeline">Timeline</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="space-y-6">
                    <p>{collegeData.description}</p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      <div className="flex flex-col">
                        <span className="text-sm text-muted-foreground">Type</span>
                        <span className="font-medium flex items-center">
                          <Building className="h-4 w-4 mr-1 text-primary" />
                          {collegeData.type}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm text-muted-foreground">Founded</span>
                        <span className="font-medium flex items-center">
                          <GraduationCap className="h-4 w-4 mr-1 text-primary" />
                          {collegeData.founded}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm text-muted-foreground">Students</span>
                        <span className="font-medium flex items-center">
                          <Users className="h-4 w-4 mr-1 text-primary" />
                          {collegeData.students.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm text-muted-foreground">Tuition</span>
                        <span className="font-medium flex items-center">
                          <DollarSign className="h-4 w-4 mr-1 text-primary" />
                          {collegeData.tuition}
                        </span>
                      </div>
                    </div>

                    {/* Indian-specific information */}
                    <div className="bg-muted/30 p-4 rounded-lg border">
                      <h3 className="font-bold text-lg mb-3">Admission Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col">
                          <span className="text-sm text-muted-foreground">NIRF Ranking</span>
                          <span className="font-medium">{collegeData.nirfRanking}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm text-muted-foreground">Entrance Exam</span>
                          <span className="font-medium">{collegeData.entranceExam}</span>
                        </div>
                      </div>

                      <h4 className="font-medium mt-4 mb-2">Reservation Categories</h4>
                      <div className="flex flex-wrap gap-2">
                        {collegeData.reservationCategories.map((category) => (
                          <Badge key={category} variant="outline">
                            {category}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Fee Structure */}
                    <div>
                      <h3 className="font-bold text-lg mb-3">Fee Structure</h3>
                      <Card>
                        <CardContent className="p-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col">
                              <span className="text-sm text-muted-foreground">Tuition (per semester)</span>
                              <span className="font-medium">{collegeData.fees.tuitionPerSemester}</span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-sm text-muted-foreground">Hostel (per semester)</span>
                              <span className="font-medium">{collegeData.fees.hostelPerSemester}</span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-sm text-muted-foreground">Mess (per month)</span>
                              <span className="font-medium">{collegeData.fees.messPerMonth}</span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-sm text-muted-foreground">Other Charges</span>
                              <span className="font-medium">{collegeData.fees.otherCharges}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Placement Statistics */}
                    <div>
                      <h3 className="font-bold text-lg mb-3">Placement Statistics</h3>
                      <Card>
                        <CardContent className="p-4">
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            <div className="flex flex-col">
                              <span className="text-sm text-muted-foreground">Average Package</span>
                              <span className="font-medium">{collegeData.placementStats.averagePackage}</span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-sm text-muted-foreground">Highest Package</span>
                              <span className="font-medium">{collegeData.placementStats.highestPackage}</span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-sm text-muted-foreground">Placement %</span>
                              <span className="font-medium">{collegeData.placementStats.placementPercentage}</span>
                            </div>
                          </div>

                          <div className="mt-4">
                            <h4 className="text-sm text-muted-foreground mb-2">Top Recruiters</h4>
                            <div className="flex flex-wrap gap-2">
                              {collegeData.placementStats.topRecruiters.map((company) => (
                                <Badge key={company} variant="secondary">
                                  {company}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Hostel Information */}
                    <div>
                      <h3 className="font-bold text-lg mb-3">Hostel Information</h3>
                      <Card>
                        <CardContent className="p-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col">
                              <span className="text-sm text-muted-foreground">Number of Hostels</span>
                              <span className="font-medium">{collegeData.hostelInfo.numberOfHostels}</span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-sm text-muted-foreground">Room Types</span>
                              <span className="font-medium">{collegeData.hostelInfo.roomTypes.join(", ")}</span>
                            </div>
                          </div>

                          <div className="mt-4">
                            <h4 className="text-sm text-muted-foreground mb-2">Facilities</h4>
                            <div className="flex flex-wrap gap-2">
                              {collegeData.hostelInfo.facilities.map((facility) => (
                                <Badge key={facility} variant="outline">
                                  {facility}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {collegeData.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <Separator className="my-6" />

                    <div>
                      <h3 className="font-bold text-lg mb-4">Rating Breakdown</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div className="space-y-1">
                          <div className="flex justify-between">
                            <span className="text-sm">Academics</span>
                            <span className="font-medium">{collegeData.stats.academics}</span>
                          </div>
                          <div className="h-2 bg-secondary rounded-full">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${(collegeData.stats.academics / 5) * 100}%` }}
                              transition={{ duration: 1, ease: "easeOut" }}
                              className="h-2 bg-primary rounded-full"
                            ></motion.div>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between">
                            <span className="text-sm">Social Life</span>
                            <span className="font-medium">{collegeData.stats.social}</span>
                          </div>
                          <div className="h-2 bg-secondary rounded-full">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${(collegeData.stats.social / 5) * 100}%` }}
                              transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
                              className="h-2 bg-primary rounded-full"
                            ></motion.div>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between">
                            <span className="text-sm">Facilities</span>
                            <span className="font-medium">{collegeData.stats.facilities}</span>
                          </div>
                          <div className="h-2 bg-secondary rounded-full">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${(collegeData.stats.facilities / 5) * 100}%` }}
                              transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                              className="h-2 bg-primary rounded-full"
                            ></motion.div>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between">
                            <span className="text-sm">Value</span>
                            <span className="font-medium">{collegeData.stats.value}</span>
                          </div>
                          <div className="h-2 bg-secondary rounded-full">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${(collegeData.stats.value / 5) * 100}%` }}
                              transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
                              className="h-2 bg-primary rounded-full"
                            ></motion.div>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between">
                            <span className="text-sm">Safety</span>
                            <span className="font-medium">{collegeData.stats.safety}</span>
                          </div>
                          <div className="h-2 bg-secondary rounded-full">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${(collegeData.stats.safety / 5) * 100}%` }}
                              transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
                              className="h-2 bg-primary rounded-full"
                            ></motion.div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Instant Poll */}
                    <div className="mt-8">
                      <h3 className="font-bold text-lg mb-4">Student Polls</h3>
                      <InstantPoll
                        id={collegeData.polls[0].id}
                        question={collegeData.polls[0].question}
                        options={collegeData.polls[0].options}
                        onVote={handlePollVote}
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="reviews">
                    <div className="flex flex-col gap-4 mb-6">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                          <Filter className="h-4 w-4" />
                          <Select value={filter} onValueChange={setFilter}>
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Filter reviews" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Reviews</SelectItem>
                              <SelectItem value="recent">Most Recent</SelectItem>
                              <SelectItem value="highest">Highest Rated</SelectItem>
                              <SelectItem value="lowest">Lowest Rated</SelectItem>
                              <SelectItem value="spicy">Most Spicy 🔥</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {["🔥", "💀", "😭", "🤡", "🧢"].map((emoji) => (
                            <button
                              key={emoji}
                              onClick={() => handleEmojiFilter(emoji)}
                              className={`emoji-reaction text-sm ${
                                selectedEmoji === emoji
                                  ? "bg-primary/20 border-primary/30"
                                  : "bg-secondary hover:bg-secondary/80"
                              }`}
                            >
                              {emoji}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Tag filtering */}
                      <div className="w-full">
                        <h4 className="text-sm font-medium mb-2">Filter by tags:</h4>
                        <DynamicTags
                          tags={selectedTags}
                          onTagsChange={handleTagsChange}
                          suggestedTags={collegeData.suggestedTags}
                          maxTags={5}
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      {getFilteredReviews().map((review, index) => (
                        <motion.div
                          key={review.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                          <Card>
                            <ReviewCard review={review} />
                            {review.tags && (
                              <div className="px-5 pb-4 flex flex-wrap gap-2">
                                {review.tags.map((tag) => (
                                  <Badge key={tag} variant="outline" className="text-xs">
                                    #{tag}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </Card>
                        </motion.div>
                      ))}
                    </div>

                    <div className="mt-8 flex justify-center">
                      <Button
                        asChild
                        className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                      >
                        <Link href="/submit-review">
                          <PenSquare className="mr-2 h-4 w-4" />
                          Write a Review
                        </Link>
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="analytics">
                    <div className="space-y-8">
                      <div>
                        <h3 className="font-bold text-lg mb-4">Rating Trends</h3>
                        <Card>
                          <CardContent className="pt-6">
                            <CollegeChart data={collegeData.ratingTrends} />
                          </CardContent>
                        </Card>
                      </div>

                      <div>
                        <h3 className="font-bold text-lg mb-4">Campus Activity Heatmap</h3>
                        <Card>
                          <CardContent className="pt-6">
                            <p className="text-sm text-muted-foreground mb-4">
                              This heatmap shows when students are most active on campus based on review submissions
                            </p>
                            <ReviewHeatmap data={collegeData.heatmapData} />
                          </CardContent>
                        </Card>
                      </div>

                      <div>
                        <h3 className="font-bold text-lg mb-4">Student Opinion</h3>
                        <InstantPoll
                          id={collegeData.polls[1].id}
                          question={collegeData.polls[1].question}
                          options={collegeData.polls[1].options}
                          onVote={handlePollVote}
                        />
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="timeline">
                    <div className="h-[600px]">
                      <h3 className="font-bold text-lg mb-4">Review Timeline</h3>
                      <Card className="h-full">
                        <CardContent className="p-0 h-full">
                          <div className="h-full">
                            {collegeData.reviews.length > 0 && (
                              <div className="h-full">
                                <ReviewTimeline reviews={collegeData.reviews} collegeId={collegeData.id} />
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>NIRF Ranking</span>
                    <Badge variant="outline" className="font-bold">
                      {collegeData.nirfRanking}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Acceptance Rate</span>
                    <Badge variant="outline" className="font-bold">
                      {collegeData.acceptance}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Student-Faculty Ratio</span>
                    <Badge variant="outline" className="font-bold">
                      12:1
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Avg. Placement</span>
                    <Badge variant="outline" className="font-bold">
                      {collegeData.placementStats.averagePackage}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Campus Size</span>
                    <Badge variant="outline" className="font-bold">
                      617 acres
                    </Badge>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="space-y-2">
                  <h3 className="font-medium">Popular Departments</h3>
                  <ul className="space-y-1 text-sm">
                    <li>• Computer Science & Engineering</li>
                    <li>• Electrical Engineering</li>
                    <li>• Mechanical Engineering</li>
                    <li>• Aerospace Engineering</li>
                    <li>• Biotechnology</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="bg-primary/10 text-primary p-2 rounded-md">
                      <Calendar className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium">Shaastra Tech Fest</h4>
                      <p className="text-sm text-muted-foreground">Jan 15, 2024 • 10:00 AM</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="bg-primary/10 text-primary p-2 rounded-md">
                      <Calendar className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium">Campus Placement Drive</h4>
                      <p className="text-sm text-muted-foreground">Dec 20, 2023 • 9:00 AM</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="bg-primary/10 text-primary p-2 rounded-md">
                      <Calendar className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium">Saarang Cultural Fest</h4>
                      <p className="text-sm text-muted-foreground">Feb 5, 2024 • 2:00 PM</p>
                    </div>
                  </div>
                </div>

                <Button variant="outline" className="w-full mt-4">
                  View All Events
                </Button>
              </CardContent>
            </Card>

            {/* Anonymous Avatars Showcase */}
            <Card>
              <CardHeader>
                <CardTitle>Anonymous Reviewers</CardTitle>
                <CardDescription>Recent anonymous contributors</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3 justify-center">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <AnonymousAvatar
                      key={i}
                      seed={`user-${i + 1}`}
                      style={i % 3 === 0 ? "gradient" : i % 3 === 1 ? "emoji" : "initials"}
                      size="md"
                    />
                  ))}
                </div>
                <div className="text-center mt-4 text-sm text-muted-foreground">
                  Join our community of {Math.floor(Math.random() * 1000) + 500} anonymous reviewers
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

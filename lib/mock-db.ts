// Mock database with in-memory storage
// This replaces any real database connection

// Types
export type User = {
  id: string
  name: string
  email: string
  password: string // In a real app, this would be hashed
  createdAt: string
  isAnonymous?: boolean
  username?: string
  role?: string
  avatarStyle?: string
  avatarColor?: string
  bio?: string
  location?: string
  website?: string
  socialLinks?: Array<{ platform: string; url: string }>
  skills?: string[]
  education?: Array<{
    id: string
    institution: string
    degree: string
    field: string
    startYear: number
    endYear: number | null
    current: boolean
  }>
}

export type College = {
  id: string
  name: string
  shortName: string
  location: string
  country: string
  description: string
  founded: number
  type: string
  ranking: number
  acceptanceRate: number
  studentCount: number
  undergraduateCount: number
  graduateCount: number
  internationalStudentPercentage: number
  maleFemaleRatio: string
  tuitionFee: number
  averageLivingCost: number
  popularMajors: string[]
  topEmployers: string[]
  averageSalaryAfterGraduation: number
  website: string
  logoUrl: string
  bannerUrl: string
  campusImages: string[]
  reviewCount: number
  averageRating: number
  nirfRanking?: number
  entranceExams?: string[]
  reservationCategories?: { category: string; percentage: number }[]
  feeStructure?: { program: string; fees: number }[]
  placementStats?: { company: string; offers: number; averageCTC: number }[]
  hostelInfo?: { name: string; type: string; capacity: number; fees: number }[]
  events?: { name: string; date: string; description: string }[]
}

export type Review = {
  id: string
  userId: string
  collegeId: string
  departmentId?: string
  content: string
  rating: number
  createdAt: string
  isAnonymous: boolean
  tags: string[]
  reactions: Record<string, number>
}

export type Department = {
  id: string
  collegeId: string
  name: string
  description: string
  facultyCount: number
  studentCount: number
  courses: string[]
  facilities: string[]
  reviewCount: number
  averageRating: number
}

export type Comment = {
  id: string
  userId: string
  reviewId: string
  content: string
  createdAt: string
}

export type Reaction = {
  id: string
  userId: string
  reviewId: string
  emoji: string
  createdAt: string
}

export type Bookmark = {
  id: string
  userId: string
  reviewId: string
  createdAt: string
}

export type Poll = {
  id: string
  collegeId?: string
  question: string
  options: { id: string; text: string; votes: number }[]
  createdAt: string
  expiresAt: string
}

export type Vote = {
  id: string
  userId: string
  pollId: string
  optionId: string
  createdAt: string
}

export type Notification = {
  id: string
  userId: string
  type: string
  message: string
  read: boolean
  createdAt: string
  relatedId?: string
}

// In-memory storage
const db: {
  users: User[]
  colleges: College[]
  reviews: Review[]
  departments: Department[]
  comments: Comment[]
  reactions: Reaction[]
  bookmarks: Bookmark[]
  polls: Poll[]
  votes: Vote[]
  notifications: Notification[]
} = {
  users: [
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      password: "password123", // In a real app, this would be hashed
      createdAt: new Date("2023-01-01").toISOString(),
      role: "USER",
      bio: "Computer Science student passionate about web development and AI.",
      location: "San Francisco, CA",
      website: "https://johndoe.dev",
      socialLinks: [
        { platform: "LinkedIn", url: "https://linkedin.com/in/johndoe" },
        { platform: "Twitter", url: "https://twitter.com/johndoe" },
        { platform: "GitHub", url: "https://github.com/johndoe" },
      ],
      skills: ["JavaScript", "React", "Node.js", "Python", "Machine Learning"],
      education: [
        {
          id: "1",
          institution: "Stanford University",
          degree: "Bachelor of Science",
          field: "Computer Science",
          startYear: 2018,
          endYear: 2022,
          current: false,
        },
      ],
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      password: "password456",
      createdAt: new Date("2023-02-15").toISOString(),
      role: "USER",
    },
    {
      id: "3",
      name: "Admin User",
      email: "admin@example.com",
      password: "adminpass",
      createdAt: new Date("2023-01-01").toISOString(),
      role: "ADMIN",
    },
  ],
  colleges: [
    {
      id: "1",
      name: "Indian Institute of Technology, Delhi",
      shortName: "IIT Delhi",
      location: "New Delhi, Delhi",
      country: "India",
      description:
        "IIT Delhi is one of India's most prestigious engineering institutions, known for its rigorous academic programs and cutting-edge research.",
      founded: 1961,
      type: "Public",
      ranking: 2,
      acceptanceRate: 0.02,
      studentCount: 10000,
      undergraduateCount: 4500,
      graduateCount: 5500,
      internationalStudentPercentage: 5,
      maleFemaleRatio: "80:20",
      tuitionFee: 200000,
      averageLivingCost: 120000,
      popularMajors: ["Computer Science", "Electrical Engineering", "Mechanical Engineering"],
      topEmployers: ["Google", "Microsoft", "Tata Consultancy Services", "Reliance"],
      averageSalaryAfterGraduation: 1600000,
      website: "https://iitd.ac.in",
      logoUrl: "/placeholder.svg?height=100&width=100",
      bannerUrl: "/placeholder.svg?height=400&width=800",
      campusImages: [
        "/placeholder.svg?height=300&width=400",
        "/placeholder.svg?height=300&width=400",
        "/placeholder.svg?height=300&width=400",
      ],
      reviewCount: 245,
      averageRating: 4.7,
      nirfRanking: 2,
      entranceExams: ["JEE Advanced", "GATE"],
      reservationCategories: [
        { category: "General", percentage: 50.5 },
        { category: "OBC", percentage: 27 },
        { category: "SC", percentage: 15 },
        { category: "ST", percentage: 7.5 },
      ],
      feeStructure: [
        { program: "B.Tech", fees: 222000 },
        { program: "M.Tech", fees: 178000 },
        { program: "PhD", fees: 82000 },
      ],
      placementStats: [
        { company: "Google", offers: 38, averageCTC: 3500000 },
        { company: "Microsoft", offers: 42, averageCTC: 2800000 },
        { company: "Amazon", offers: 51, averageCTC: 2600000 },
      ],
      hostelInfo: [
        { name: "Nilgiri Hostel", type: "Boys", capacity: 500, fees: 80000 },
        { name: "Kailash Hostel", type: "Boys", capacity: 450, fees: 80000 },
        { name: "Himadri Hostel", type: "Girls", capacity: 350, fees: 80000 },
      ],
      events: [
        {
          name: "Rendezvous",
          date: "October 2023",
          description: "Annual cultural festival of IIT Delhi",
        },
        {
          name: "Tryst",
          date: "March 2024",
          description: "Annual technical festival of IIT Delhi",
        },
      ],
    },
    {
      id: "2",
      name: "Indian Institute of Management, Ahmedabad",
      shortName: "IIM-A",
      location: "Ahmedabad, Gujarat",
      country: "India",
      description:
        "IIM Ahmedabad is India's premier management institution, consistently ranked as the top business school in the country.",
      founded: 1961,
      type: "Public",
      ranking: 1,
      acceptanceRate: 0.01,
      studentCount: 1200,
      undergraduateCount: 0,
      graduateCount: 1200,
      internationalStudentPercentage: 8,
      maleFemaleRatio: "65:35",
      tuitionFee: 2300000,
      averageLivingCost: 180000,
      popularMajors: ["MBA", "PGPX", "Executive Education"],
      topEmployers: ["McKinsey", "BCG", "Bain & Company", "Amazon"],
      averageSalaryAfterGraduation: 2800000,
      website: "https://iima.ac.in",
      logoUrl: "/placeholder.svg?height=100&width=100",
      bannerUrl: "/placeholder.svg?height=400&width=800",
      campusImages: [
        "/placeholder.svg?height=300&width=400",
        "/placeholder.svg?height=300&width=400",
        "/placeholder.svg?height=300&width=400",
      ],
      reviewCount: 178,
      averageRating: 4.8,
      nirfRanking: 1,
      entranceExams: ["CAT", "GMAT"],
      reservationCategories: [
        { category: "General", percentage: 50.5 },
        { category: "OBC", percentage: 27 },
        { category: "SC", percentage: 15 },
        { category: "ST", percentage: 7.5 },
      ],
      feeStructure: [
        { program: "MBA", fees: 2300000 },
        { program: "PGPX", fees: 2800000 },
        { program: "Executive Education", fees: 1500000 },
      ],
      placementStats: [
        { company: "McKinsey", offers: 18, averageCTC: 4200000 },
        { company: "BCG", offers: 15, averageCTC: 4000000 },
        { company: "Amazon", offers: 22, averageCTC: 3500000 },
      ],
      hostelInfo: [
        { name: "New Campus", type: "Co-ed", capacity: 600, fees: 120000 },
        { name: "Old Campus", type: "Co-ed", capacity: 400, fees: 100000 },
      ],
      events: [
        {
          name: "Confluence",
          date: "November 2023",
          description: "Annual business summit of IIM Ahmedabad",
        },
        {
          name: "Chaos",
          date: "January 2024",
          description: "Annual cultural festival of IIM Ahmedabad",
        },
      ],
    },
    {
      id: "3",
      name: "All India Institute of Medical Sciences, Delhi",
      shortName: "AIIMS Delhi",
      location: "New Delhi, Delhi",
      country: "India",
      description:
        "AIIMS Delhi is India's premier medical institution, offering world-class medical education and healthcare services.",
      founded: 1956,
      type: "Public",
      ranking: 1,
      acceptanceRate: 0.005,
      studentCount: 2500,
      undergraduateCount: 1200,
      graduateCount: 1300,
      internationalStudentPercentage: 3,
      maleFemaleRatio: "55:45",
      tuitionFee: 6000,
      averageLivingCost: 120000,
      popularMajors: ["MBBS", "MD", "MS", "DM", "MCh"],
      topEmployers: ["AIIMS", "Apollo Hospitals", "Fortis Healthcare", "Max Healthcare"],
      averageSalaryAfterGraduation: 1200000,
      website: "https://aiims.edu",
      logoUrl: "/placeholder.svg?height=100&width=100",
      bannerUrl: "/placeholder.svg?height=400&width=800",
      campusImages: [
        "/placeholder.svg?height=300&width=400",
        "/placeholder.svg?height=300&width=400",
        "/placeholder.svg?height=300&width=400",
      ],
      reviewCount: 156,
      averageRating: 4.9,
      nirfRanking: 1,
      entranceExams: ["NEET-UG", "NEET-PG", "INI-CET"],
      reservationCategories: [
        { category: "General", percentage: 50.5 },
        { category: "OBC", percentage: 27 },
        { category: "SC", percentage: 15 },
        { category: "ST", percentage: 7.5 },
      ],
      feeStructure: [
        { program: "MBBS", fees: 6000 },
        { program: "MD/MS", fees: 8000 },
        { program: "DM/MCh", fees: 10000 },
      ],
      placementStats: [
        { company: "AIIMS", offers: 45, averageCTC: 1500000 },
        { company: "Apollo Hospitals", offers: 32, averageCTC: 1800000 },
        { company: "Fortis Healthcare", offers: 28, averageCTC: 1600000 },
      ],
      hostelInfo: [
        { name: "Undergraduate Hostel", type: "Boys", capacity: 450, fees: 60000 },
        { name: "Girls Hostel", type: "Girls", capacity: 350, fees: 60000 },
        { name: "Resident Doctors Hostel", type: "Co-ed", capacity: 600, fees: 72000 },
      ],
      events: [
        {
          name: "Pulse",
          date: "September 2023",
          description: "Annual medical festival of AIIMS Delhi",
        },
        {
          name: "Confluence",
          date: "March 2024",
          description: "Annual research symposium of AIIMS Delhi",
        },
      ],
    },
  ],
  reviews: [
    {
      id: "1",
      userId: "1",
      collegeId: "1",
      departmentId: "1",
      content:
        "IIT Delhi has an excellent Computer Science program. The faculty is knowledgeable and the curriculum is up-to-date with industry standards. Campus placements are outstanding with top tech companies visiting regularly. However, the workload can be overwhelming at times.",
      rating: 4.5,
      createdAt: new Date("2023-05-15").toISOString(),
      isAnonymous: false,
      tags: ["Academics", "Placements", "Faculty"],
      reactions: { "👍": 42, "❤️": 28, "🔥": 15 },
    },
    {
      id: "2",
      userId: "2",
      collegeId: "1",
      departmentId: "2",
      content:
        "The Electrical Engineering department at IIT Delhi is top-notch. The labs are well-equipped and there are plenty of research opportunities. The faculty is supportive but some courses could be better structured. The JEE preparation was definitely worth it!",
      rating: 4.0,
      createdAt: new Date("2023-06-20").toISOString(),
      isAnonymous: true,
      tags: ["Research", "Labs", "Curriculum"],
      reactions: { "👍": 35, "❤️": 19, "🤔": 8 },
    },
    {
      id: "3",
      userId: "1",
      collegeId: "2",
      departmentId: "3",
      content:
        "IIM Ahmedabad's MBA program is intense but transformative. The case-based learning approach really prepares you for real-world business challenges. The alumni network is incredibly strong and helpful for placements. The campus is beautiful with the iconic Louis Kahn architecture.",
      rating: 5.0,
      createdAt: new Date("2023-04-10").toISOString(),
      isAnonymous: false,
      tags: ["Placements", "Networking", "Campus"],
      reactions: { "👍": 56, "❤️": 41, "🔥": 23 },
    },
  ],
  departments: [
    {
      id: "1",
      collegeId: "1",
      name: "Computer Science and Engineering",
      description:
        "The Department of Computer Science and Engineering at IIT Delhi is known for its cutting-edge research and comprehensive curriculum.",
      facultyCount: 45,
      studentCount: 800,
      courses: ["Data Structures and Algorithms", "Machine Learning", "Computer Networks", "Operating Systems"],
      facilities: ["AI Lab", "Systems Lab", "Networks Lab", "Graphics Lab"],
      reviewCount: 120,
      averageRating: 4.6,
    },
    {
      id: "2",
      collegeId: "1",
      name: "Electrical Engineering",
      description:
        "The Department of Electrical Engineering at IIT Delhi offers programs in power systems, communications, and electronics.",
      facultyCount: 50,
      studentCount: 850,
      courses: ["Power Systems", "Digital Signal Processing", "VLSI Design", "Control Systems"],
      facilities: ["Power Lab", "Communications Lab", "VLSI Lab", "Embedded Systems Lab"],
      reviewCount: 95,
      averageRating: 4.4,
    },
    {
      id: "3",
      collegeId: "2",
      name: "MBA Program",
      description:
        "The flagship two-year MBA program at IIM Ahmedabad is designed to prepare students for leadership roles in business.",
      facultyCount: 90,
      studentCount: 400,
      courses: ["Marketing Management", "Financial Accounting", "Operations Research", "Strategic Management"],
      facilities: ["Case Study Rooms", "Bloomberg Terminal", "Incubation Center", "Library"],
      reviewCount: 150,
      averageRating: 4.8,
    },
  ],
  comments: [
    {
      id: "1",
      userId: "2",
      reviewId: "1",
      content: "Thanks for sharing your experience! Did you participate in any internships?",
      createdAt: new Date("2023-05-16").toISOString(),
    },
    {
      id: "2",
      userId: "1",
      reviewId: "1",
      content:
        "Yes, I did a summer internship at Google after my third year. The college's placement cell was very helpful in securing it.",
      createdAt: new Date("2023-05-17").toISOString(),
    },
  ],
  reactions: [
    {
      id: "1",
      userId: "2",
      reviewId: "1",
      emoji: "👍",
      createdAt: new Date("2023-05-15").toISOString(),
    },
    {
      id: "2",
      userId: "1",
      reviewId: "2",
      emoji: "❤️",
      createdAt: new Date("2023-06-21").toISOString(),
    },
  ],
  bookmarks: [
    {
      id: "1",
      userId: "1",
      reviewId: "2",
      createdAt: new Date("2023-06-22").toISOString(),
    },
    {
      id: "2",
      userId: "2",
      reviewId: "1",
      createdAt: new Date("2023-05-18").toISOString(),
    },
  ],
  polls: [
    {
      id: "1",
      collegeId: "1",
      question: "Which aspect of IIT Delhi do you value the most?",
      options: [
        { id: "1", text: "Academic Excellence", votes: 145 },
        { id: "2", text: "Research Opportunities", votes: 98 },
        { id: "3", text: "Placement Support", votes: 187 },
        { id: "4", text: "Campus Life", votes: 76 },
      ],
      createdAt: new Date("2023-04-01").toISOString(),
      expiresAt: new Date("2023-12-31").toISOString(),
    },
  ],
  votes: [
    {
      id: "1",
      userId: "1",
      pollId: "1",
      optionId: "3",
      createdAt: new Date("2023-04-05").toISOString(),
    },
    {
      id: "2",
      userId: "2",
      pollId: "1",
      optionId: "1",
      createdAt: new Date("2023-04-10").toISOString(),
    },
  ],
  notifications: [
    {
      id: "1",
      userId: "1",
      type: "COMMENT",
      message: "Someone commented on your review of IIT Delhi",
      read: false,
      createdAt: new Date("2023-05-16").toISOString(),
      relatedId: "1", // Comment ID
    },
    {
      id: "2",
      userId: "1",
      type: "REACTION",
      message: "Someone reacted to your review of IIT Delhi",
      read: true,
      createdAt: new Date("2023-05-15").toISOString(),
      relatedId: "1", // Reaction ID
    },
  ],
}

// Helper functions
function generateId(prefix: string): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
}

// Mock database methods
const mockDB = {
  // User methods
  async findUserByEmail(email: string): Promise<User | null> {
    const user = db.users.find((u) => u.email === email)
    return user || null
  },

  async findUserById(id: string): Promise<User | null> {
    const user = db.users.find((u) => u.id === id)
    return user ? { ...user } : null
  },

  async createUser(userData: Omit<User, "id" | "createdAt" | "role">): Promise<User> {
    const newUser: User = {
      id: generateId("user"),
      ...userData,
      createdAt: new Date().toISOString(),
      role: "USER",
    }
    db.users.push(newUser)
    return { ...newUser }
  },

  async updateUser(id: string, updates: Partial<Omit<User, "id" | "createdAt" | "role">>): Promise<User> {
    const userIndex = db.users.findIndex((u) => u.id === id)
    if (userIndex === -1) {
      throw new Error("User not found")
    }
    db.users[userIndex] = { ...db.users[userIndex], ...updates }
    return { ...db.users[userIndex] }
  },

  // College methods
  async findAllColleges(): Promise<College[]> {
    return [...db.colleges]
  },

  async findCollegeById(id: string): Promise<College | null> {
    const college = db.colleges.find((c) => c.id === id)
    return college ? { ...college } : null
  },

  async searchColleges(query: string): Promise<College[]> {
    const lowercaseQuery = query.toLowerCase()
    return db.colleges.filter(
      (c) =>
        c.name.toLowerCase().includes(lowercaseQuery) ||
        c.shortName.toLowerCase().includes(lowercaseQuery) ||
        c.location.toLowerCase().includes(lowercaseQuery),
    )
  },

  // Review methods
  async findReviewsByCollegeId(collegeId: string): Promise<Review[]> {
    return db.reviews.filter((r) => r.collegeId === collegeId).map((r) => ({ ...r }))
  },

  async findReviewsByUserId(userId: string): Promise<Review[]> {
    return db.reviews.filter((r) => r.userId === userId).map((r) => ({ ...r }))
  },

  async findReviewById(id: string): Promise<Review | null> {
    const review = db.reviews.find((r) => r.id === id)
    return review ? { ...review } : null
  },

  async createReview(reviewData: Omit<Review, "id" | "createdAt" | "reactions">): Promise<Review> {
    const newReview: Review = {
      id: generateId("review"),
      ...reviewData,
      createdAt: new Date().toISOString(),
      reactions: {},
    }
    db.reviews.push(newReview)
    return { ...newReview }
  },

  async updateReview(
    id: string,
    updates: Partial<Omit<Review, "id" | "userId" | "collegeId" | "createdAt">>,
  ): Promise<Review> {
    const reviewIndex = db.reviews.findIndex((r) => r.id === id)
    if (reviewIndex === -1) {
      throw new Error("Review not found")
    }
    db.reviews[reviewIndex] = { ...db.reviews[reviewIndex], ...updates }
    return { ...db.reviews[reviewIndex] }
  },

  async deleteReview(id: string): Promise<void> {
    const reviewIndex = db.reviews.findIndex((r) => r.id === id)
    if (reviewIndex === -1) {
      throw new Error("Review not found")
    }
    db.reviews.splice(reviewIndex, 1)
  },

  // Department methods
  async findDepartmentsByCollegeId(collegeId: string): Promise<Department[]> {
    return db.departments.filter((d) => d.collegeId === collegeId).map((d) => ({ ...d }))
  },

  // Comment methods
  async findCommentsByReviewId(reviewId: string): Promise<Comment[]> {
    return db.comments.filter((c) => c.reviewId === reviewId).map((c) => ({ ...c }))
  },

  async createComment(commentData: Omit<Comment, "id" | "createdAt">): Promise<Comment> {
    const newComment: Comment = {
      id: generateId("comment"),
      ...commentData,
      createdAt: new Date().toISOString(),
    }
    db.comments.push(newComment)
    return { ...newComment }
  },

  // Reaction methods
  async createReaction(reactionData: Omit<Reaction, "id" | "createdAt">): Promise<Reaction> {
    // Check if user already reacted with this emoji
    const existingReaction = db.reactions.find(
      (r) => r.userId === reactionData.userId && r.reviewId === reactionData.reviewId && r.emoji === reactionData.emoji,
    )

    if (existingReaction) {
      // Remove the reaction if it already exists (toggle behavior)
      const reactionIndex = db.reactions.findIndex((r) => r.id === existingReaction.id)
      db.reactions.splice(reactionIndex, 1)

      // Update the review's reaction count
      const review = db.reviews.find((r) => r.id === reactionData.reviewId)
      if (review && review.reactions[reactionData.emoji]) {
        review.reactions[reactionData.emoji]--
        if (review.reactions[reactionData.emoji] === 0) {
          delete review.reactions[reactionData.emoji]
        }
      }

      return existingReaction
    }

    // Create new reaction
    const newReaction: Reaction = {
      id: generateId("reaction"),
      ...reactionData,
      createdAt: new Date().toISOString(),
    }
    db.reactions.push(newReaction)

    // Update the review's reaction count
    const review = db.reviews.find((r) => r.id === reactionData.reviewId)
    if (review) {
      if (!review.reactions[reactionData.emoji]) {
        review.reactions[reactionData.emoji] = 0
      }
      review.reactions[reactionData.emoji]++
    }

    return { ...newReaction }
  },

  // Bookmark methods
  async toggleBookmark(userId: string, reviewId: string): Promise<boolean> {
    const existingBookmark = db.bookmarks.find((b) => b.userId === userId && b.reviewId === reviewId)

    if (existingBookmark) {
      // Remove bookmark
      const bookmarkIndex = db.bookmarks.findIndex((b) => b.id === existingBookmark.id)
      db.bookmarks.splice(bookmarkIndex, 1)
      return false // Bookmark removed
    } else {
      // Add bookmark
      const newBookmark: Bookmark = {
        id: generateId("bookmark"),
        userId,
        reviewId,
        createdAt: new Date().toISOString(),
      }
      db.bookmarks.push(newBookmark)
      return true // Bookmark added
    }
  },

  async findBookmarksByUserId(userId: string): Promise<Bookmark[]> {
    return db.bookmarks.filter((b) => b.userId === userId).map((b) => ({ ...b }))
  },

  async isBookmarked(userId: string, reviewId: string): Promise<boolean> {
    return db.bookmarks.some((b) => b.userId === userId && b.reviewId === reviewId)
  },

  // Poll methods
  async findPollsByCollegeId(collegeId: string): Promise<Poll[]> {
    return db.polls.filter((p) => p.collegeId === collegeId).map((p) => ({ ...p }))
  },

  async findPollById(id: string): Promise<Poll | null> {
    const poll = db.polls.find((p) => p.id === id)
    return poll ? { ...poll } : null
  },

  async voteInPoll(pollId: string, optionId: string, userId: string): Promise<boolean> {
    // Check if user already voted in this poll
    const existingVote = db.votes.find((v) => v.pollId === pollId && v.userId === userId)
    if (existingVote) {
      return false // User already voted
    }

    // Add vote
    const newVote: Vote = {
      id: generateId("vote"),
      userId,
      pollId,
      optionId,
      createdAt: new Date().toISOString(),
    }
    db.votes.push(newVote)

    // Update poll option vote count
    const poll = db.polls.find((p) => p.id === pollId)
    if (poll) {
      const option = poll.options.find((o) => o.id === optionId)
      if (option) {
        option.votes++
      }
    }

    return true // Vote added
  },

  // Notification methods
  async findNotificationsByUserId(userId: string): Promise<Notification[]> {
    return db.notifications.filter((n) => n.userId === userId).map((n) => ({ ...n }))
  },

  async markNotificationsAsRead(userId: string): Promise<void> {
    db.notifications.forEach((n) => {
      if (n.userId === userId) {
        n.read = true
      }
    })
  },

  async createNotification(notificationData: Omit<Notification, "id" | "createdAt" | "read">): Promise<Notification> {
    const newNotification: Notification = {
      id: generateId("notification"),
      ...notificationData,
      read: false,
      createdAt: new Date().toISOString(),
    }
    db.notifications.push(newNotification)
    return { ...newNotification }
  },

  // Helper methods for getting trending data
  async getTrendingColleges(): Promise<College[]> {
    // In a real app, this would use complex logic to determine trending colleges
    // For now, we'll just return the top 3 by review count
    return [...db.colleges].sort((a, b) => b.reviewCount - a.reviewCount).slice(0, 3)
  },

  async getTrendingReviews(): Promise<Review[]> {
    // In a real app, this would use complex logic to determine trending reviews
    // For now, we'll just return the most recent 5 reviews
    return [...db.reviews].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5)
  },
}

export default mockDB

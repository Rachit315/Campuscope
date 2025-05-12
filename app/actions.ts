"use server"

import { revalidatePath } from "next/cache"
import mockDB from "@/lib/mock-db"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function signUpAction(formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  if (!name || !email || !password) {
    return { success: false, error: "Missing required fields" }
  }

  try {
    // Check if user already exists
    const existingUser = await mockDB.findUserByEmail(email)

    if (existingUser) {
      return { success: false, error: "Email already in use" }
    }

    // Create user
    await mockDB.createUser({
      name,
      email,
      password,
      isAnonymous: false,
    })

    return { success: true }
  } catch (error) {
    console.error("Signup error:", error)
    return { success: false, error: "Failed to create account" }
  }
}

export async function setAnonymityAction(formData: FormData) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    return { success: false, error: "Not authenticated" }
  }

  const isAnonymous = formData.get("isAnonymous") === "true"
  const username = formData.get("username") as string | null

  if (isAnonymous && !username) {
    return { success: false, error: "Username is required for anonymous users" }
  }

  try {
    await mockDB.updateUser(session.user.id, {
      isAnonymous,
      username: isAnonymous ? username : null,
    })

    return { success: true }
  } catch (error) {
    console.error("Set anonymity error:", error)
    return { success: false, error: "Failed to update anonymity settings" }
  }
}

export async function updateProfileAction(formData: FormData) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    return { success: false, error: "Not authenticated" }
  }

  const name = formData.get("name") as string
  const bio = formData.get("bio") as string
  const location = formData.get("location") as string
  const website = formData.get("website") as string
  const avatarStyle = formData.get("avatarStyle") as string
  const avatarColor = formData.get("avatarColor") as string

  try {
    await mockDB.updateUser(session.user.id, {
      name,
      bio,
      location,
      website,
      avatarStyle,
      avatarColor,
    })

    revalidatePath("/dashboard")
    return { success: true }
  } catch (error) {
    console.error("Update profile error:", error)
    return { success: false, error: "Failed to update profile" }
  }
}

export async function submitReviewAction(formData: FormData) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    return { success: false, error: "Not authenticated" }
  }

  const collegeId = formData.get("collegeId") as string
  const departmentId = formData.get("departmentId") as string
  const content = formData.get("content") as string
  const rating = Number.parseFloat(formData.get("rating") as string)
  const isAnonymous = formData.get("isAnonymous") === "true"
  const tags = (formData.get("tags") as string).split(",").filter(Boolean)

  if (!collegeId || !content || isNaN(rating)) {
    return { success: false, error: "Missing required fields" }
  }

  try {
    await mockDB.createReview({
      content,
      rating,
      isAnonymous,
      tags,
      userId: session.user.id,
      collegeId,
      departmentId,
    })

    revalidatePath(`/college/${collegeId}`)
    return { success: true }
  } catch (error) {
    console.error("Submit review error:", error)
    return { success: false, error: "Failed to submit review" }
  }
}

export async function updateReviewAction(reviewId: string, formData: FormData) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    return { success: false, error: "Not authenticated" }
  }

  const content = formData.get("content") as string
  const rating = Number.parseFloat(formData.get("rating") as string)
  const isAnonymous = formData.get("isAnonymous") === "true"
  const tags = (formData.get("tags") as string).split(",").filter(Boolean)

  try {
    // Check if the review belongs to the user
    const review = await mockDB.findReviewById(reviewId)

    if (!review) {
      return { success: false, error: "Review not found" }
    }

    if (review.userId !== session.user.id) {
      return { success: false, error: "Not authorized" }
    }

    await mockDB.updateReview(reviewId, {
      content,
      rating,
      isAnonymous,
      tags,
    })

    revalidatePath(`/college/${review.collegeId}`)
    revalidatePath("/dashboard")
    return { success: true }
  } catch (error) {
    console.error("Update review error:", error)
    return { success: false, error: "Failed to update review" }
  }
}

export async function deleteReviewAction(reviewId: string) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    return { success: false, error: "Not authenticated" }
  }

  try {
    // Check if the review belongs to the user
    const review = await mockDB.findReviewById(reviewId)

    if (!review) {
      return { success: false, error: "Review not found" }
    }

    if (review.userId !== session.user.id && session.user.role !== "ADMIN") {
      return { success: false, error: "Not authorized" }
    }

    await mockDB.deleteReview(reviewId)

    revalidatePath(`/college/${review.collegeId}`)
    revalidatePath("/dashboard")
    return { success: true }
  } catch (error) {
    console.error("Delete review error:", error)
    return { success: false, error: "Failed to delete review" }
  }
}

export async function reactToReviewAction(reviewId: string, emoji: string) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    return { success: false, error: "Not authenticated" }
  }

  try {
    await mockDB.createReaction({
      emoji,
      reviewId,
      userId: session.user.id,
    })

    // Get the review's college ID for revalidation
    const review = await mockDB.findReviewById(reviewId)

    if (review) {
      revalidatePath(`/college/${review.collegeId}`)
    }

    return { success: true }
  } catch (error) {
    console.error("React to review error:", error)
    return { success: false, error: "Failed to react to review" }
  }
}

export async function addCommentAction(reviewId: string, formData: FormData) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    return { success: false, error: "Not authenticated" }
  }

  const content = formData.get("content") as string

  if (!content) {
    return { success: false, error: "Comment cannot be empty" }
  }

  try {
    await mockDB.createComment({
      content,
      userId: session.user.id,
      reviewId,
    })

    // Get the review for revalidation
    const review = await mockDB.findReviewById(reviewId)

    if (review) {
      revalidatePath(`/college/${review.collegeId}`)
    }

    return { success: true }
  } catch (error) {
    console.error("Add comment error:", error)
    return { success: false, error: "Failed to add comment" }
  }
}

export async function bookmarkReviewAction(reviewId: string) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    return { success: false, error: "Not authenticated" }
  }

  try {
    await mockDB.toggleBookmark(session.user.id, reviewId)
    revalidatePath("/dashboard")
    return { success: true }
  } catch (error) {
    console.error("Bookmark review error:", error)
    return { success: false, error: "Failed to bookmark review" }
  }
}

export async function voteInPollAction(pollId: string, optionId: string) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    return { success: false, error: "Not authenticated" }
  }

  try {
    const success = await mockDB.voteInPoll(pollId, optionId, session.user.id)

    if (!success) {
      return { success: false, error: "You have already voted in this poll" }
    }

    // Get the poll for revalidation
    const poll = await mockDB.findPollById(pollId)

    if (poll?.collegeId) {
      revalidatePath(`/college/${poll.collegeId}`)
    }

    return { success: true }
  } catch (error) {
    console.error("Vote in poll error:", error)
    return { success: false, error: "Failed to vote in poll" }
  }
}

export async function markNotificationsAsReadAction() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    return { success: false, error: "Not authenticated" }
  }

  try {
    await mockDB.markNotificationsAsRead(session.user.id)
    revalidatePath("/dashboard")
    return { success: true }
  } catch (error) {
    console.error("Mark notifications as read error:", error)
    return { success: false, error: "Failed to mark notifications as read" }
  }
}

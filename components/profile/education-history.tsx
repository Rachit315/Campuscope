"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PlusCircle, Pencil, Trash2, GraduationCap } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

// Mock education data
const mockEducation = [
  {
    id: "1",
    institution: "Stanford University",
    degree: "Bachelor of Science",
    field: "Computer Science",
    startYear: 2018,
    endYear: 2022,
    current: false,
  },
  {
    id: "2",
    institution: "MIT",
    degree: "Master of Science",
    field: "Artificial Intelligence",
    startYear: 2022,
    endYear: null,
    current: true,
  },
]

interface EducationHistoryProps {
  userId: string
}

export default function EducationHistory({ userId }: EducationHistoryProps) {
  const [education, setEducation] = useState(mockEducation)
  const [isAdding, setIsAdding] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    institution: "",
    degree: "",
    field: "",
    startYear: new Date().getFullYear(),
    endYear: new Date().getFullYear(),
    current: false,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const resetForm = () => {
    setFormData({
      institution: "",
      degree: "",
      field: "",
      startYear: new Date().getFullYear(),
      endYear: new Date().getFullYear(),
      current: false,
    })
  }

  const handleAddEducation = () => {
    setIsAdding(true)
    resetForm()
  }

  const handleEditEducation = (id: string) => {
    const educationToEdit = education.find((edu) => edu.id === id)
    if (educationToEdit) {
      setFormData({
        institution: educationToEdit.institution,
        degree: educationToEdit.degree,
        field: educationToEdit.field,
        startYear: educationToEdit.startYear,
        endYear: educationToEdit.endYear || new Date().getFullYear(),
        current: educationToEdit.current,
      })
      setEditingId(id)
      setIsAdding(true)
    }
  }

  const handleDeleteEducation = (id: string) => {
    setEducation(education.filter((edu) => edu.id !== id))
    toast({
      title: "Education deleted",
      description: "Your education history has been updated",
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (editingId) {
      // Update existing education
      setEducation(
        education.map((edu) =>
          edu.id === editingId
            ? {
                ...edu,
                ...formData,
                endYear: formData.current ? null : formData.endYear,
              }
            : edu,
        ),
      )
      toast({
        title: "Education updated",
        description: "Your education history has been updated",
      })
    } else {
      // Add new education
      const newEducation = {
        id: String(Date.now()),
        ...formData,
        endYear: formData.current ? null : formData.endYear,
      }
      setEducation([...education, newEducation])
      toast({
        title: "Education added",
        description: "Your education history has been updated",
      })
    }

    setIsAdding(false)
    setEditingId(null)
    resetForm()
  }

  const handleCancel = () => {
    setIsAdding(false)
    setEditingId(null)
    resetForm()
  }

  // Generate year options
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 50 }, (_, i) => currentYear - i)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Education History</h3>
        <Button onClick={handleAddEducation} size="sm">
          <PlusCircle className="h-4 w-4 mr-2" /> Add Education
        </Button>
      </div>

      {isAdding ? (
        <Card>
          <CardHeader>
            <CardTitle>{editingId ? "Edit Education" : "Add Education"}</CardTitle>
            <CardDescription>
              {editingId ? "Update your education details" : "Add your educational background to your profile"}
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="institution">Institution</Label>
                <Input
                  id="institution"
                  name="institution"
                  value={formData.institution}
                  onChange={handleInputChange}
                  placeholder="University or College name"
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="degree">Degree</Label>
                <Input
                  id="degree"
                  name="degree"
                  value={formData.degree}
                  onChange={handleInputChange}
                  placeholder="e.g., Bachelor of Science, Master's"
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="field">Field of Study</Label>
                <Input
                  id="field"
                  name="field"
                  value={formData.field}
                  onChange={handleInputChange}
                  placeholder="e.g., Computer Science, Business"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="startYear">Start Year</Label>
                  <Select
                    value={String(formData.startYear)}
                    onValueChange={(value) => handleSelectChange("startYear", value)}
                  >
                    <SelectTrigger id="startYear">
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent>
                      {years.map((year) => (
                        <SelectItem key={year} value={String(year)}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="endYear">End Year</Label>
                  <Select
                    value={formData.current ? "present" : String(formData.endYear)}
                    onValueChange={(value) => {
                      if (value === "present") {
                        setFormData({
                          ...formData,
                          current: true,
                          endYear: new Date().getFullYear(),
                        })
                      } else {
                        handleSelectChange("endYear", value)
                        setFormData({
                          ...formData,
                          current: false,
                        })
                      }
                    }}
                    disabled={formData.current}
                  >
                    <SelectTrigger id="endYear">
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="present">Present</SelectItem>
                      {years.map((year) => (
                        <SelectItem key={year} value={String(year)}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="current"
                  name="current"
                  checked={formData.current}
                  onChange={handleInputChange}
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <Label htmlFor="current" className="text-sm font-normal">
                  I currently study here
                </Label>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button type="button" variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button type="submit">{editingId ? "Update" : "Add"} Education</Button>
            </CardFooter>
          </form>
        </Card>
      ) : education.length > 0 ? (
        <div className="space-y-4">
          {education.map((edu) => (
            <Card key={edu.id}>
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-base">{edu.institution}</CardTitle>
                    <CardDescription>
                      {edu.degree} in {edu.field}
                    </CardDescription>
                  </div>
                  <div className="flex space-x-1">
                    <Button variant="ghost" size="icon" onClick={() => handleEditEducation(edu.id)} className="h-8 w-8">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteEducation(edu.id)}
                      className="h-8 w-8 text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {edu.startYear} - {edu.current ? "Present" : edu.endYear}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="flex flex-col items-center justify-center p-6 text-center">
          <GraduationCap className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No education history</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Add your educational background to help others understand your academic journey.
          </p>
          <Button onClick={handleAddEducation}>
            <PlusCircle className="h-4 w-4 mr-2" /> Add Education
          </Button>
        </Card>
      )}
    </div>
  )
}

import React from "react"
import type { Project } from "@/lib/content"
import { SpecCard } from "@/components/project-card"

export function ProjectGallery({ projects }: { projects: Project[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <div key={project.id} className="reveal">
          <SpecCard project={project} />
        </div>
      ))}
    </div>
  )
}

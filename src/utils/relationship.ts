export const RELATIONSHIP_START = new Date(2026, 2, 27, 0, 0, 0);

export interface RelationshipTime {
  years: number
  months: number
  days: number
  hours: number
  minutes: number
  seconds: number
  totalDays: number
  isMilestone: boolean
  milestoneType: "year" | "month" | null
  nextMilestoneDays: number
  nextMilestoneLabel: string
}

function daysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate()
}

export function calculateRelationshipTime(now: Date = new Date()): RelationshipTime {
  let years = now.getFullYear() - RELATIONSHIP_START.getFullYear()
  let months = now.getMonth() - RELATIONSHIP_START.getMonth()
  let days = now.getDate() - RELATIONSHIP_START.getDate()

  if (days < 0) {
    months--
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0)
    days += prevMonth.getDate()
  }
  if (months < 0) {
    years--
    months += 12
  }

  const hours = now.getHours()
  const minutes = now.getMinutes()
  const seconds = now.getSeconds()

  const diffMs = now.getTime() - RELATIONSHIP_START.getTime()
  const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  const isMonthMilestone = totalDays > 0 && days === 0 && hours === 0 && minutes === 0 && seconds < 2
  const isYearMilestone = isMonthMilestone && months === 0

  const nextMonthDate = new Date(RELATIONSHIP_START)
  const totalMonths = years * 12 + months
  nextMonthDate.setMonth(nextMonthDate.getMonth() + totalMonths + 1)
  const nextMilestoneDays = Math.ceil(
    (nextMonthDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
  )

  const formattedMonths = totalMonths + 1
  const nextLabel =
    formattedMonths >= 12
      ? `${Math.floor(formattedMonths / 12)} ano${Math.floor(formattedMonths / 12) > 1 ? "s" : ""}`
      : `${formattedMonths} mês${formattedMonths > 1 ? "es" : ""}`

  return {
    years,
    months,
    days,
    hours,
    minutes,
    seconds,
    totalDays,
    isMilestone: isMonthMilestone || isYearMilestone,
    milestoneType: isYearMilestone ? "year" : isMonthMilestone ? "month" : null,
    nextMilestoneDays,
    nextMilestoneLabel: nextLabel,
  }
}

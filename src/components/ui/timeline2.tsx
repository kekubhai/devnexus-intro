"use client"

import React, { useEffect, useRef } from 'react'
import { motion, useAnimation, useInView } from 'framer-motion'

interface TimelineEvent {
  date: string
  year: number
  description: string
  imageUrl?: string
}

const events: TimelineEvent[] = [
  { date: 'September', year: 2023, description: 'Participated in an exciting hackathon' },
  { date: 'March', year: 2024, description: 'Completed Semester 2 exams' },
  { date: 'August', year: 2024, description: 'Joined another innovative hackathon' },
]

const TimelineItem: React.FC<{ event: TimelineEvent; index: number }> = ({ event, index }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const mainControls = useAnimation()

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible")
    }
  }, [isInView, mainControls])

  return (
    <motion.div
      ref={ref}
      variants={{
        hidden: { opacity: 0, y: 75 },
        visible: { opacity: 1, y: 0 },
      }}
      initial="hidden"
      animate={mainControls}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className={`mb-8 flex justify-between items-center w-full ${
        index % 2 === 0 ? 'flex-row-reverse' : 'flex-row'
      }`}
    >
      <div className="order-1 w-5/12"></div>
      <div className="z-20 flex items-center order-1 bg-gray-800 shadow-xl w-8 h-8 rounded-full">
        <h1 className="mx-auto font-semibold text-lg text-white">{event.year}</h1>
      </div>
      <div className="order-1 bg-gray-400 rounded-lg shadow-xl w-5/12 px-6 py-4">
        <h3 className="mb-3 font-bold text-gray-800 text-xl">{event.date}</h3>
        <p className="text-sm leading-snug tracking-wide text-gray-900 text-opacity-100">{event.description}</p>
        {event.imageUrl && (
          <img src={event.imageUrl} alt="Event" className="mt-3 rounded-lg w-full h-48 object-cover" />
        )}
        {!event.imageUrl && (
          <div className="mt-3 bg-gray-300 rounded-lg w-full h-48 flex items-center justify-center text-gray-500">
            Photo placeholder
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default function Timeline() {
  return (
    <div className="container mx-auto w-full h-full">
      <div className="relative wrap overflow-hidden p-10 h-full">
        <div className="border-2-2 absolute border-opacity-20 border-gray-700 h-full border left-1/2"></div>
        <div className="absolute h-full w-1 bg-gradient-to-b from-blue-500 to-purple-500 left-1/2 transform -translate-x-1/2">
          <div className="absolute w-full h-24 animate-pulse bg-gradient-to-b from-transparent via-blue-400 to-transparent" style={{animation: 'glow 3s infinite'}}></div>
        </div>
        {events.map((event, index) => (
          <TimelineItem key={index} event={event} index={index} />
        ))}
      </div>
    </div>
  )
}
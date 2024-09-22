'use client'

import { useState, useRef, useEffect, useId } from 'react'
import Image from 'next/image'
import { Canvas, useFrame } from '@react-three/fiber'
import { Box } from '@react-three/drei'
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion'
import { Github, Linkedin, Mail, Phone } from 'lucide-react'
import path from 'path'

const useOutsideClick = (ref: unknown, callback: unknown) => {
  useEffect(() => {
    const handleClickOutside = (event: { target: any }) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]);
};

interface TeamMemberProps {
  name: string
  role: string
  email: string
  phone: string
  stream: string
  year: string
  linkedin: string
  github: string
  photo: string
  expandedPhoto:string
}

const HoveringObject = ({ isHovered }) => {
  const meshRef = useRef()
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.5
      meshRef.current.rotation.y += delta * 0.5
    }
  })

  return (
    <Box
      ref={meshRef}
      args={[1, 1, 1]}
      scale={isHovered ? 1.2 : 1}
    >
      <meshNormalMaterial />
    </Box>
  )
}

const CloseIcon = () => {
  return (
    <motion.svg
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.05 } }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  )
}

const TeamMemberCard = ({
  name, role, photo, email, phone, linkedin, github, stream, year, onClick, id
}: TeamMemberProps & { onClick: () => void, id: string }) => {
  const [isHovered, setIsHovered] = useState(false)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useTransform(y, [-100, 100], [30, -30])
  const rotateY = useTransform(x, [-100, 100], [-30, 30])

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const mouseX = event.clientX - rect.left
    const mouseY = event.clientY - rect.top
    x.set(mouseX - rect.width / 2)
    y.set(mouseY - rect.height / 2)
  }

  return (
    <motion.div
      layoutId={`card-${name}-${id}`}
      onClick={onClick}
      className="rounded-lg shadow-lg p-6 bg-white dark:bg-gray-800 flex flex-col items-center relative overflow-hidden cursor-pointer"
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      whileHover={{ scale: 1.05 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <Canvas>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <HoveringObject isHovered={isHovered} />
        </Canvas>
      </div>
      <motion.div
        className="relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div layoutId={`image-${name}-${id}`}>
          <Image src={photo} alt={`${name}'s photo`} width={150} height={150} className="rounded-full" />
        </motion.div>
        <motion.h2 layoutId={`name-${name}-${id}`} className="text-xl font-semibold mt-4 text-gray-800 dark:text-gray-200">{name}</motion.h2>
        <motion.p layoutId={`role-${role}-${id}`} className="text-gray-600 dark:text-gray-400">{role}</motion.p>
        <p className="text-gray-500 dark:text-gray-500">{`${stream}, ${year} Year`}</p>
      </motion.div>
    </motion.div>
  )
}

export function ExpandableTeamMemberCards({ teamMembers }: { teamMembers: TeamMemberProps[] }) {
  const [active, setActive] = useState<TeamMemberProps | null>(null)
  const id = useId()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(null)
      }
    }

    if (active) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [active])

  useOutsideClick(ref, () => setActive(null))

  return (
    <>
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active ? (
          <div className="fixed inset-0 grid place-items-center z-[100]">
            <motion.button
              key={`button-${active.name}-${id}`}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.05 } }}
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
              onClick={() => setActive(null)}
              aria-label="Close"
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.name}-${id}`}
              ref={ref}
              className="w-full max-w-[500px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-white dark:bg-gray-800 sm:rounded-3xl overflow-hidden"
            >
              <motion.div layoutId={`image-${active.name}-${id}`}>
                <Image
                  priority
                  width={500}
                  height={500}
                  src={active.expandedPhoto}
                  alt={active.name}
                  className="w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top"
                />
              </motion.div>

              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <motion.h3
                      layoutId={`name-${active.name}-${id}`}
                      className="text-2xl font-semibold text-gray-800 dark:text-gray-200"
                    >
                      {active.name}
                    </motion.h3>
                    <motion.p
                      layoutId={`role-${active.role}-${id}`}
                      className="text-gray-600 dark:text-gray-400 text-lg"
                    >
                      {active.role}
                    </motion.p>
                  </div>
                </div>
                <div className="mt-4">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-gray-700 dark:text-gray-300 text-base space-y-4"
                  >
                    <p>Stream: {active.stream}</p>
                    <p>Year: {active.year}</p>
                    <p>Email: {active.email}</p>
                    <p>Phone: {active.phone}</p>
                  </motion.div>
                </div>
                <div className="mt-6 flex space-x-4">
                  <motion.a
                    href={`mailto:${active.email}`}
                    className="text-blue-500 hover:text-blue-700 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    aria-label={`Email ${active.name}`}
                  >
                    <Mail size={24} />
                  </motion.a>
                  <motion.a
                    href={`tel:${active.phone}`}
                    className="text-blue-500 hover:text-blue-700 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    aria-label={`Call ${active.name}`}
                  >
                    <Phone size={24} />
                  </motion.a>
                  <motion.a
                    href={active.linkedin}
                    className="text-blue-500 hover:text-blue-700 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    aria-label={`${active.name}'s LinkedIn profile`}
                  >
                    <Linkedin size={24} />
                  </motion.a>
                  <motion.a
                    href={active.github}
                    className="text-blue-500 hover:text-blue-700 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    aria-label={`${active.name}'s GitHub profile`}
                  >
                    <Github size={24} />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      <ul className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamMembers.map((member) => (
          <li key={member.name}>
            <TeamMemberCard
              {...member}
              onClick={() => setActive(member)}
              id={id}
            />
          </li>
        ))}
      </ul>
    </>
  )
}

export default function TeamPage() {
  const teamMembers: TeamMemberProps[] = [
    {
      name: "Amitava Datta",
      role: "Team Leader",
      email: "dattaarup2004@gmail.com",
      phone: "8910168864",
      stream: "CSE-AIML",
      year: "2nd",
      linkedin: "https://linkedin.com/in/amitava-datta",
      github: "https://github.com/amitava-datta",
      photo: "/public/devImages/Anirban.jpg",
      expandedPhoto: "/public/devImages/Anirban.jpg"
    },
    {
      name: "Pranay De",
      role: "Team Member",
      email: "pranayde201@gmail.com",
      phone: "8100460128",
      stream: "CSE-AIML",
      year: "2nd",
      linkedin: "https://linkedin.com/in/pranay-de",
      github: "https://github.com/pranay-de",
      photo: "/dev/Pranay.jpg",
      expandedPhoto: ''
    },
    {
      name: "Anirban Ghosh",
      role: "Team Member",
      email: "anirbanghosh060@gmail.com",
      phone: "8100460128",
      stream: "CSE-AIML",
      year: "2nd",
      linkedin: "https://linkedin.com/in/anirban-ghosh",
      github: "https://github.com/anirban-ghosh",
      photo: "/dev/Anirban.jpg",
      expandedPhoto: ''
    },
    {
      name: "Srinjinee Mitra",
      role: "Team Member",
      email: "srinjineemitra@gmail.com",
      phone: "8100460128",
      stream: "CSE-AIML",
      year: "2nd",
      linkedin: "https://linkedin.com/in/srinjinee-mitra",
      github: "https://github.com/srinjinee-mitra",
      photo: "/dev/Srinjinee.jpg",
      expandedPhoto: ''
    },
    {
      name: "Aitijhya Roy",
      role: "Team Member",
      email: "aitijhyaroy@gmail.com",
      phone: "8100460128",
      stream: "CSE-AIML",
      year: "2nd",
      linkedin: "https://linkedin.com/in/aitijhya-roy",
      github: "https://github.com/aitijhya-roy",
      photo: "/dev/Aitijhya.jpg",
      expandedPhoto: ''
    },
    {
      name: "Rudranil Das",
      role: "Team Member",
      email: "rudranildas@gmail.com",
      phone: "8100460128",
      stream: "CSE-AIML",
      year: "2nd",
      linkedin: "https://linkedin.com/in/rudranil-das",
      github: "https://github.com/rudranil-das",
      photo: "/public/devImages/Rudranil.jpg",
      expandedPhoto: ''
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
          Meet Our Team Dev-Nexus
        </h1>
        <ExpandableTeamMemberCards teamMembers={teamMembers} />
      </div>
    </div>
  );
}
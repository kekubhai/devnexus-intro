'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link href={href} className="text-white hover:text-gray-300 transition-colors">
    {children}
  </Link>
)

const ResourceCard = ({ title, href, hoverColor }: { title: string; href: string; hoverColor: string }) => (
  <Link 
    href={href} 
    className={`bg-white bg-opacity-10 p-4 rounded-lg text-black transition-all ${hoverColor}`}
  >
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-sm text-black">Explore {title} resources and projects</p>
  </Link>
)

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
      <div className="relative">
        {/* Beaming lights background */}
        <div className="absolute inset-0 overflow-hidden rounded-full">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-teal-300"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-yellow-300 rounded-full filter blur-3xl opacity-50 animate-pulse"></div>
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-pink-300 rounded-full filter blur-3xl opacity-50 animate-pulse"></div>
        </div>

        {/* Navbar content */}
        <div className="relative backdrop-blur-md bg-black bg-opacity-30 rounded-full px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="text-white text-2xl font-bold">
                DEV-NEXUS
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <NavLink href="/">Dorm</NavLink>
                <div className="relative">
                  <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="text-white hover:text-gray-300 transition-colors flex items-center"
                  >
                    Pursuits <ChevronDown className="ml-1 h-4 w-4" />
                  </button>
                  {isOpen && (
                    <div className="absolute right-0 mt-6 w-screen max-w-md bg-white text-black backdrop-blur-md rounded-lg overflow-hidden shadow-lg z-50">
                      <div className="grid  text-black grid-cols-2 gap-4 p-4">
                        <ResourceCard   title="Web Dev" href="/pursuits/web-dev" hoverColor=" hover:bg-blue-400 hover:bg-opacity-90" />
                        <ResourceCard title="ML & Data Science" href="/pursuits/ml-data-science" hoverColor="hover:bg-green-400 hover:bg-opacity-90" />
                        <ResourceCard title="AI" href="/pursuits/ai" hoverColor="hover:bg-purple-400 hover:bg-opacity-90" />
                        <ResourceCard title="UI/UX" href="/pursuits/ui-ux" hoverColor="hover:bg-pink-400 hover:bg-opacity-90" />
                        <ResourceCard title="Blockchain" href="/pursuits/blockchain" hoverColor="hover:bg-yellow-400 hover:bg-opacity-90" />
                      </div>
                    </div>
                  )}
                </div>
                <NavLink href="/team">Meet the Team</NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
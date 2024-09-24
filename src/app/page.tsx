
'use client'

import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Canvas, useFrame } from '@react-three/fiber'
import { Sphere, MeshDistortMaterial } from '@react-three/drei'
import { useRef } from 'react'
import Navbar from '@/components/navbarwithmenu'
import Timeline from '@/components/ui/timeline2'
import Image from 'next/image'



function AnimatedSphere() {
  const meshRef = useRef()

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime()
      meshRef.current.position.y = Math.sin(time) * 0.1
      meshRef.current.rotation.y = time * 0.1
    }
  })

  return (
    <Sphere ref={meshRef} args={[1, 100, 200]} scale={2.5}>
      <MeshDistortMaterial
        color="#8B5CF6"
        attach="material"
        distort={0.3}
        speed={1.5}
        roughness={0.4}
      />
    </Sphere>
  )
}


export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gray-900 text-white">
      <div className="absolute inset-0 z-0">
        <Canvas>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <AnimatedSphere />
        </Canvas>
      </div>
      
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 md:p-24 text-center">
           <Navbar/>
        <h1 className="mb-8 bg-clip-text text-4xl sm:text-5xl md:text-6xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          Meet the Team - DEV-NEXUS
          <Image
          src="/check3.jpg"
          width={40}
          height={50}
          alt='team'/>
        </h1>
        <p className="mb-8 max-w-2xl text-lg sm:text-xl text-gray-300">
          We are a team of six passionate 2nd-year engineering students from Techno Main Salt Lake, 
          pushing boundaries in hackathons and workshops across India.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-12 text-sm sm:text-base">
          <div className="bg-gray-800 bg-opacity-50 p-4 rounded-lg">
            <h3 className="font-semibold text-purple-400">Web Development</h3>
            <p>Building the future of the web</p>
          </div>
          <div className="bg-slate-100 bg-opacity-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-400">Blockchain</h3>
            <p>Revolutionizing digital trust</p>
          </div>
          <div className="bg-gray-800 bg-opacity-50 p-4 rounded-lg">
            <h3 className="font-semibold text-green-400">Machine Learning</h3>
            <p>Crafting intelligent solutions</p>
          </div>
          <div className="bg-gray-800 bg-opacity-50 p-4 rounded-lg">
            <h3 className="font-semibold text-yellow-400">UI/UX Design</h3>
            <p>Creating seamless experiences</p>
          </div>
          <div className="bg-gray-800 bg-opacity-50 p-4 rounded-lg">
            <h3 className="font-semibold text-red-400">Data Science</h3>
            <p>Unlocking insights from data</p>
          </div>
          <div className="bg-gray-800 bg-opacity-50 p-4 rounded-lg">
            <h3 className="font-semibold text-indigo-400">Artificial Intelligence</h3>
            <p>Shaping the future with AI</p>
          </div>
        </div>
        
        <Link href="/team">
          <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-full text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
            Discover Our Journey
          </Button>
        </Link>
        
        <Timeline/>
      </div>
     
    </main>
  )
}
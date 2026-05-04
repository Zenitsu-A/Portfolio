'use client';

import { useState } from 'react';
import { ClientOnly } from '@/components/client-only';
import HeroFuturistic from '@/components/ui/hero-futuristic';
import RadialOrbitalTimeline from '@/components/ui/radial-orbital-timeline';
import { Radar, ScannedIcon } from '@/components/ui/radar-effect';
import { ShareholderReports } from '@/components/ui/carousel';
import { WorldMap } from '@/components/ui/world-map';
import { SparklesText } from '@/components/ui/sparkles-text';
import { ProfileCard } from '@/components/ui/profile-card';
import { FaqsSection } from '@/components/ui/faqs-1';
import { motion } from 'framer-motion';
import { Calendar, Code, FileText, User, Clock } from 'lucide-react';
import { HiDocumentText } from 'react-icons/hi';
import { AiFillDollarCircle } from 'react-icons/ai';
import { BsClipboardDataFill } from 'react-icons/bs';
import { BiSolidReport } from 'react-icons/bi';
import { HiMiniDocumentArrowUp } from 'react-icons/hi2';
import { RiFilePaper2Fill } from 'react-icons/ri';

const timelineData = [
  {
    id: 1,
    title: 'Cheap Editors',
    date: 'Problem 1',
    content: 'Low quality output, inconsistent results, poor communication, and missed deadlines.',
    category: 'Problem',
    icon: FileText,
    relatedIds: [2],
    status: 'completed' as const,
    energy: 100,
  },
  {
    id: 2,
    title: 'Expensive Agencies',
    date: 'Problem 2',
    content: 'High costs, slow turnaround, inflexible, and difficult to communicate with.',
    category: 'Problem',
    icon: Code,
    relatedIds: [1, 3],
    status: 'completed' as const,
    energy: 90,
  },
  {
    id: 3,
    title: 'Unreliable Freelancers',
    date: 'Problem 3',
    content: 'Inconsistent quality, ghosting, scope creep, and lack of professionalism.',
    category: 'Problem',
    icon: User,
    relatedIds: [2, 4],
    status: 'in-progress' as const,
    energy: 60,
  },
  {
    id: 4,
    title: 'The Solution',
    date: 'Solution',
    content: 'Professional quality, responsive communication, reliable delivery, and fair pricing.',
    category: 'Solution',
    icon: Clock,
    relatedIds: [3, 5],
    status: 'in-progress' as const,
    energy: 80,
  },
  {
    id: 5,
    title: 'Your Success',
    date: 'Result',
    content: 'Broadcast-quality content, 100% satisfaction, long-term partnership, and growth.',
    category: 'Result',
    icon: Calendar,
    relatedIds: [4],
    status: 'pending' as const,
    energy: 100,
  },
];

const portfolioData = [
  {
    id: 'supercar',
    quarter: 'Supercar Content',
    period: 'Feb 2025 - Present',
    imageSrc: 'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=500&h=600&fit=crop',
    isNew: true,
  },
  {
    id: 'magnetmedi',
    quarter: 'MagnetMedia Style',
    period: 'Jul 2024 - Present',
    imageSrc: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=500&h=600&fit=crop',
  },
  {
    id: 'documentary',
    quarter: 'Documentary Editing',
    period: 'Nov 2024 - Present',
    imageSrc: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=500&h=600&fit=crop',
  },
  {
    id: 'dental-vfx',
    quarter: 'Dental VFX',
    period: 'Aug 2023',
    imageSrc: 'https://images.unsplash.com/photo-1576091160550-112173f7f869?w=500&h=600&fit=crop',
  },
  {
    id: 'youtube-editing',
    quarter: 'YouTube Editing',
    period: 'Feb 2024',
    imageSrc: 'https://images.unsplash.com/photo-1611339555312-e607c90352fd?w=500&h=600&fit=crop',
  },
];

export default function Home() {
  return (
    <main className="w-full">
      {/* Hero Section */}
      <ClientOnly>
        <HeroFuturistic />
      </ClientOnly>

      {/* Problems & Skills Split Section */}
      <div className="w-full bg-black flex flex-col lg:flex-row relative mt-20">
        {/* Left: Problems Section */}
        <section className="w-full lg:w-1/2 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                The Cycle of Problems
              </h2>
              <p className="text-xl text-gray-400">
                Cheap editors, expensive agencies, unreliable freelancers. There's a better way.
              </p>
            </motion.div>
          </div>
          <ClientOnly>
            <RadialOrbitalTimeline timelineData={timelineData} />
          </ClientOnly>
        </section>

        {/* Cyan divider line with 50% taper from both ends */}
        <div className="hidden lg:flex items-center justify-center w-px relative">
          <div className="w-px h-1/2" style={{ background: 'linear-gradient(to bottom, transparent 0%, rgba(0, 217, 255, 0.5) 25%, rgba(0, 217, 255, 0.5) 75%, transparent 100%)' }} />
        </div>

        {/* Right: Skills Section */}
        <section className="w-full lg:w-1/2 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                My Skills & Expertise
              </h2>
              <p className="text-xl text-gray-400">
                Specialized in motion graphics, video editing, and VFX
              </p>
            </motion.div>

            <div className="flex min-h-screen w-full items-center justify-center bg-black">
              <div className="relative flex h-96 w-full max-w-3xl flex-col items-center justify-center space-y-4 overflow-hidden px-4">
                <div className="mx-auto w-full max-w-3xl">
                  <div className="flex w-full items-center justify-center space-x-10 md:justify-between md:space-x-0">
                   <ScannedIcon
  text="Motion Graphics"
  angle={45}       // <-- Add an angle (0 to 360)
  distance={30}    // <-- Add a distance percentage from center
  icon={<HiDocumentText className="h-8 w-8 text-gray-500" />}
/>
                    <ScannedIcon
                      text="Video Editing"
                      angle={90}       // Replaced delay={0.4}
                      distance={40}    // Percentage from center
                      icon={<AiFillDollarCircle className="h-8 w-8 text-gray-500" />}
                    />
                    <ScannedIcon
                      text="VFX & Animation"
                      angle={180}      // Replaced delay={0.3}
                      distance={35}
                      icon={<BsClipboardDataFill className="h-8 w-8 text-gray-500" />}
                    />
                  </div>
                </div>
                <div className="mx-auto w-full max-w-md">
                  <div className="flex w-full items-center justify-center space-x-10 md:justify-between md:space-x-0">
                    <ScannedIcon
                      text="After Effects"
                      angle={270}      // Replaced delay={0.5}
                      distance={45}
                      icon={<BiSolidReport className="h-8 w-8 text-gray-500" />}
                    />
                    <ScannedIcon
                      text="Premiere Pro"
                      angle={315}      // Replaced delay={0.8}
                      distance={30}
                      icon={<HiMiniDocumentArrowUp className="h-8 w-8 text-gray-500" />}
                    />
                  </div>
                </div>
                <div className="mx-auto w-full max-w-3xl">
                  <div className="flex w-full items-center justify-center space-x-10 md:justify-between md:space-x-0">
                    <ScannedIcon
                      text="DaVinci Resolve"
                      angle={225}      // Replaced delay={0.6}
                      distance={50}
                      icon={<RiFilePaper2Fill className="h-8 w-8 text-gray-500" />}
                    />
                    <ScannedIcon
                      text="Photoshop & Illustrator"
                      angle={340}      // Replaced delay={0.7}
                      distance={25}
                      icon={<FileText className="h-8 w-8 text-gray-500" />}
                    />
                  </div>
                </div>

                <Radar className="absolute -bottom-12" />
                <div className="absolute bottom-0 z-[41] h-px w-full bg-gradient-to-r from-transparent via-gray-700 to-transparent" />
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Portfolio Section */}
      <section className="w-full py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Portfolio Projects
            </h2>
            <p className="text-xl text-gray-400">
              Broadcast-quality work across multiple formats and industries
            </p>
          </motion.div>
          <ShareholderReports reports={portfolioData} />
        </div>
      </section>

      {/* World Map Section */}
      <section className="w-full py-40 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="font-bold text-xl md:text-4xl text-white">
              Connect{' '}
              <span className="text-gray-400">
                {'Worldwide'.split('').map((word, idx) => (
                  <motion.span
                    key={idx}
                    className="inline-block"
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: idx * 0.04 }}
                  >
                    {word}
                  </motion.span>
                ))}
              </span>
            </p>
            <p className="text-sm md:text-lg text-gray-400 max-w-2xl mx-auto py-4">
              I've worked with clients from all over the world. From the USA to Europe, Asia to the Middle East, I deliver the same high-quality results.
            </p>
          </div>
          <WorldMap
            dots={[
              {
                start: { lat: 40.7128, lng: -74.006 },
                end: { lat: 34.0522, lng: -118.2437 },
              },
              {
                start: { lat: 40.7128, lng: -74.006 },
                end: { lat: 51.5074, lng: -0.1278 },
              },
              {
                start: { lat: 51.5074, lng: -0.1278 },
                end: { lat: 48.8566, lng: 2.3522 },
              },
              {
                start: { lat: 48.8566, lng: 2.3522 },
                end: { lat: 30.0444, lng: 31.2357 },
              },
              {
                start: { lat: 30.0444, lng: 31.2357 },
                end: { lat: 28.6139, lng: 77.209 },
              },
              {
                start: { lat: 28.6139, lng: 77.209 },
                end: { lat: 35.6762, lng: 139.6503 },
              },
            ]}
          />
        </div>
      </section>

      {/* About Me Section */}
      <section className="w-full py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <SparklesText
              text="About Me"
              className="text-4xl md:text-5xl font-bold text-white"
              colors={{ first: '#00D9FF', second: '#9D4EDD' }}
            />
          </motion.div>

          <div className="flex justify-center mb-12">
            <ClientOnly>
              <ProfileCard />
            </ClientOnly>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <p className="text-lg text-gray-300 mb-6">
              I'm Ahmed Salah, a motion graphics designer and video editor with 4+ years of freelance experience. I specialize in creating broadcast-quality video content with a perfect 100% job success rate on Upwork.
            </p>
            <p className="text-lg text-gray-300 mb-6">
              My expertise spans motion graphics, video editing, VFX, and animation. I work with YouTubers, content creators, documentary producers, and marketing agencies to deliver exceptional results.
            </p>
            <p className="text-lg text-gray-300">
              What sets me apart is my commitment to quality, responsive communication, and ability to understand client vision from the first interaction. I'm bilingual (English & Arabic) and available for both freelance projects and fulltime opportunities.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full py-20 bg-black">
        <FaqsSection />
      </section>

      {/* CTA Section */}
      <section className="w-full py-20 bg-gradient-to-r from-cyan-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to elevate your content?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Let's create something extraordinary together. Get in touch today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://www.upwork.com/freelancers/~01d668f68f17f2e444"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 bg-white text-cyan-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
              >
                Hire Me on Upwork
              </a>
              <a
                href="https://www.behance.net/ahmedsalah760"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
              >
                View My Portfolio
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-black border-t border-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-white font-semibold mb-4">Ahmed Salah</h3>
              <p className="text-gray-400">Motion Graphics Designer & Video Editor</p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Links</h3>
              <ul className="space-y-2">
                <li><a href="https://www.upwork.com/freelancers/~01d668f68f17f2e444" className="text-gray-400 hover:text-white">Upwork</a></li>
                <li><a href="https://www.behance.net/ahmedsalah760" className="text-gray-400 hover:text-white">Behance</a></li>
                <li><a href="https://instagram.com/dds.ahmedsalah" className="text-gray-400 hover:text-white">Instagram</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Services</h3>
              <ul className="space-y-2">
                <li className="text-gray-400">Motion Graphics</li>
                <li className="text-gray-400">Video Editing</li>
                <li className="text-gray-400">VFX & Animation</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Ahmed Salah. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}

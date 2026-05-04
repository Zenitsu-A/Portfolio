import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export function FaqsSection() {
  return (
    <div className="mx-auto w-full max-w-3xl space-y-7 px-4 pt-16">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold md:text-4xl">Frequently Asked Questions</h2>
        <p className="text-muted-foreground max-w-2xl">
          Here are some common questions about working with me. If you don't find the answer you're looking for, feel free to reach out.
        </p>
      </div>
      <Accordion
        type="single"
        collapsible
        className="bg-card dark:bg-card/50 w-full -space-y-px rounded-lg "
        defaultValue="item-1"
      >
        {questions.map((item) => (
          <AccordionItem
            value={item.id}
            key={item.id}
            className="relative border-x first:rounded-t-lg first:border-t last:rounded-b-lg last:border-b"
          >
            <AccordionTrigger className="px-4 py-4 text-[15px] leading-6 hover:no-underline">
              {item.title}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground pb-4 px-4">
              {item.content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <p className="text-muted-foreground">
        Can't find what you're looking for? Contact me on{' '}
        <a href="https://www.upwork.com/freelancers/~01d668f68f17f2e444" className="text-primary hover:underline">
          Upwork
        </a>
      </p>
    </div>
  );
}

const questions = [
  {
    id: 'item-1',
    title: 'What services do you offer?',
    content:
      'I specialize in motion graphics, video editing, VFX, and animation. I work with YouTube content, documentaries, social media videos, and professional VFX projects. I can handle everything from concept to final delivery.',
  },
  {
    id: 'item-2',
    title: 'What is your turnaround time?',
    content:
      'Turnaround time depends on project complexity. Simple edits can be done in 1-2 days, while complex VFX projects may take longer. I always discuss timelines upfront and work to meet your deadlines.',
  },
  {
    id: 'item-3',
    title: 'Do you offer revisions?',
    content:
      'Yes, I include revisions in my projects. I work closely with clients to ensure the final product matches their vision. My goal is 100% client satisfaction, and I\'m committed to getting it right.',
  },
  {
    id: 'item-4',
    title: 'What software do you use?',
    content:
      'I primarily use Adobe After Effects for motion graphics and VFX, Adobe Premiere Pro for video editing, DaVinci Resolve for color grading, and Adobe Photoshop and Illustrator for design work.',
  },
  {
    id: 'item-5',
    title: 'Can you work with my specific style or brand?',
    content:
      'Absolutely. I can replicate specific styles like Vox, MagnatesMedia, or any other aesthetic you prefer. I\'m flexible and willing to adapt to match your brand\'s unique look and feel.',
  },
  {
    id: 'item-6',
    title: 'What is your pricing structure?',
    content:
      'I offer both hourly rates ($30/hour) and fixed-price projects depending on your needs. I provide detailed quotes after understanding your project requirements.',
  },
  {
    id: 'item-7',
    title: 'How do I get started?',
    content:
      'Simply reach out with your project details. I\'ll discuss your vision, timeline, and budget, then provide a quote. Once you approve, we\'ll get started right away. I\'m responsive and communicative throughout the entire process.',
  },
];

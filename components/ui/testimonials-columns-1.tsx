"use client";
import React from "react";
import { motion } from "motion/react";

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: typeof testimonials;
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6 bg-background"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, image, name, role }, i) => (
                <div className="p-10 rounded-3xl border shadow-lg shadow-primary/10 max-w-xs w-full" key={i}>
                  <div>{text}</div>
                  <div className="flex items-center gap-2 mt-5">
                    <img
                      width={40}
                      height={40}
                      src={image}
                      alt={name}
                      className="h-10 w-10 rounded-full"
                    />
                    <div className="flex flex-col">
                      <div className="font-medium tracking-tight leading-5">{name}</div>
                      <div className="leading-5 opacity-60 tracking-tight">{role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
};

const testimonials = [
  {
    text: "Ahmed is one of the best editors you can find. I have worked with many but I always have to request revision. Not with Ahmed - he gets my point from the first try. Quality ++++",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    name: "MagnetMedia Client",
    role: "Video Production",
  },
  {
    text: "Ahmed is a professional of very high standards. The project was completed with top quality in a very short time frame. I will definitely be hiring him for future projects.",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    name: "Dental VFX Client",
    role: "Healthcare VFX",
  },
  {
    text: "A great person to work with and very talented. Work is on time and willing to make necessary changes to align with your vision. I have had many projects done and I am very satisfied.",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    name: "Professional Client",
    role: "Long-term Partner",
  },
  {
    text: "Ahmed delivered the video with high editing quality and in a timely manner. Loved working with him, quick and to the point. Will for sure come back with future projects.",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    name: "Harold Shipman",
    role: "Content Creator",
  },
  {
    text: "Ahmed is a very hard working person. He went above and beyond to complete a difficult project in the required timeframe. Very few people adhere to such high professional standards.",
    image: "https://randomuser.me/api/portraits/women/5.jpg",
    name: "VFX Project Lead",
    role: "Project Management",
  },
  {
    text: "Ahmed is a fantastic video editor! This was my first time making a YouTube video and Ahmed was patient and collaborative throughout the entire process.",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
    name: "YouTube Creator",
    role: "Content Creation",
  },
  {
    text: "Ahmed was great to work with. Very responsive and understood the details of the project. I would recommend him again on this type of project.",
    image: "https://randomuser.me/api/portraits/men/7.jpg",
    name: "Photo to Video Client",
    role: "Media Production",
  },
  {
    text: "Ahmed is very competent in his editing skills. Despite this not being his expertise, he did so willingly and delivered excellent results.",
    image: "https://randomuser.me/api/portraits/women/8.jpg",
    name: "YouTube Banner Client",
    role: "Branding",
  },
  {
    text: "Working with Ahmed has been a game-changer for our content. His attention to detail and quick turnaround time are unmatched in the industry.",
    image: "https://randomuser.me/api/portraits/men/9.jpg",
    name: "Supercar Content Client",
    role: "High-end Production",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

const Testimonials = () => {
  return (
    <section className="bg-background my-20 relative">
      <div className="container z-10 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-[540px] mx-auto"
        >
          <div className="flex justify-center">
            <div className="border py-1 px-4 rounded-lg">Testimonials</div>
          </div>

          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tighter mt-5">
            What my clients say
          </h2>
          <p className="text-center mt-5 opacity-75">
            See what my clients have to say about working with me.
          </p>
        </motion.div>

        <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
        </div>
      </div>
    </section>
  );
};

export default { Testimonials };

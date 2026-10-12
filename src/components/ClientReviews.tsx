'use client';

import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

const REVIEWS = [
  {
    id: 1,
    name: "Akash Fernando",
    role: "Content Creator",
    image: "https://i.pravatar.cc/150?img=12",
    rating: 5,
    text: "This design looks like a Marvel movie poster. The lighting and typography are absolutely cinematic.",
    date: "2 days ago"
  },
  {
    id: 2,
    name: "Nishadi Perera",
    role: "Graphic Designer",
    image: "https://i.pravatar.cc/150?img=32",
    rating: 5,
    text: "The color grading and visual depth feel like a Hollywood production. Super professional work.",
    date: "1 week ago"
  },
  {
    id: 3,
    name: "Ravindu Silva",
    role: "YouTuber",
    image: "https://i.pravatar.cc/150?img=15",
    rating: 5,
    text: "My thumbnails now look like movie posters. Very dramatic and eye-catching designs.",
    date: "3 days ago"
  },
  {
    id: 4,
    name: "Dilani Fernando",
    role: "Student",
    image: "https://i.pravatar.cc/150?img=25",
    rating: 4,
    text: "Typography is clean and bold. Feels like official Netflix poster branding.",
    date: "2 weeks ago"
  },
  {
    id: 5,
    name: "Tharindu Jayasekara",
    role: "Event Organizer",
    image: "https://i.pravatar.cc/150?img=18",
    rating: 5,
    text: "Our event posters looked like a movie premiere setup. Everyone noticed the design quality.",
    date: "1 month ago"
  },
  {
    id: 6,
    name: "Sanduni Wickramasinghe",
    role: "Animator",
    image: "https://i.pravatar.cc/150?img=47",
    rating: 5,
    text: "The motion poster ideas and animation concepts feel like trailer-level production.",
    date: "5 days ago"
  },
  {
    id: 7,
    name: "Isuru Bandara",
    role: "Freelancer",
    image: "https://i.pravatar.cc/150?img=22",
    rating: 4,
    text: "Amazing shadows and glow effects. Everything feels balanced and cinematic.",
    date: "2 weeks ago"
  },
  {
    id: 8,
    name: "Kavindi Rajapaksa",
    role: "Influencer",
    image: "https://i.pravatar.cc/150?img=44",
    rating: 5,
    text: "The neon and futuristic vibe looks like a sci-fi movie scene. Super aesthetic!",
    date: "4 days ago"
  },
  {
    id: 9,
    name: "Sahan Perera",
    role: "Gamer",
    image: "https://i.pravatar.cc/150?img=13",
    rating: 5,
    text: "My setup now looks like a cinematic gaming studio. Unreal visuals.",
    date: "1 week ago"
  },
  {
    id: 10,
    name: "Nadeesha Silva",
    role: "Business Owner",
    image: "https://i.pravatar.cc/150?img=29",
    rating: 5,
    text: "Very premium designs. It really upgrades brand image to a cinematic level.",
    date: "3 weeks ago"
  },
  {
    id: 11,
    name: "Chaminda Perera",
    role: "Photographer",
    image: "https://i.pravatar.cc/150?img=11",
    rating: 5,
    text: "Lighting and composition feel like movie stills. Very artistic.",
    date: "6 days ago"
  },
  {
    id: 12,
    name: "Hiruni Fernando",
    role: "Designer",
    image: "https://i.pravatar.cc/150?img=48",
    rating: 4,
    text: "Typography and layout are bold and professional. Studio-quality work.",
    date: "2 weeks ago"
  },
  {
    id: 13,
    name: "Kasun Jayawardena",
    role: "Marketing Executive",
    image: "https://i.pravatar.cc/150?img=20",
    rating: 5,
    text: "Perfect for ads and promotions. Very eye-catching cinematic visuals.",
    date: "1 month ago"
  },
  {
    id: 14,
    name: "Dilshan Perera",
    role: "Student",
    image: "https://i.pravatar.cc/150?img=17",
    rating: 5,
    text: "Looks like a Netflix movie poster. Modern and super cool.",
    date: "3 days ago"
  },
  {
    id: 15,
    name: "Nimali Silva",
    role: "Office Worker",
    image: "https://i.pravatar.cc/150?img=36",
    rating: 4,
    text: "Smooth experience and high-quality output. Very satisfied.",
    date: "2 weeks ago"
  },
  {
    id: 16,
    name: "Rashan Fernando",
    role: "Video Editor",
    image: "https://i.pravatar.cc/150?img=14",
    rating: 5,
    text: "Feels like a trailer poster with dramatic lighting and composition.",
    date: "5 days ago"
  },
  {
    id: 17,
    name: "Tharushi Perera",
    role: "Influencer",
    image: "https://i.pravatar.cc/150?img=41",
    rating: 5,
    text: "Perfect for Instagram branding. Looks premium and cinematic.",
    date: "1 week ago"
  },
  {
    id: 18,
    name: "Imesh Silva",
    role: "Engineer",
    image: "https://i.pravatar.cc/150?img=23",
    rating: 5,
    text: "Every detail is perfectly placed. Very precise and clean design.",
    date: "3 weeks ago"
  },
  {
    id: 19,
    name: "Sachini Fernando",
    role: "Student",
    image: "https://i.pravatar.cc/150?img=46",
    rating: 4,
    text: "Affordable and stylish. Adds a cinematic feel instantly.",
    date: "2 weeks ago"
  },
  {
    id: 20,
    name: "Janith Perera",
    role: "Creative Director",
    image: "https://i.pravatar.cc/150?img=19",
    rating: 5,
    text: "Feels like working with a movie studio. One of the best design services.",
    date: "1 month ago"
  }
];
// Duplicate for infinite scroll
const ALL_REVIEWS = [...REVIEWS, ...REVIEWS];

export const ClientReviews = () => {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Google Reviews Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-2"
          >
            <div className="flex items-center gap-2 mb-2">
              <img src="https://static.vecteezy.com/system/resources/previews/046/861/647/non_2x/google-logo-transparent-background-free-png.png" alt="Google" referrerPolicy="no-referrer" className="h-8" />
              <span className="text-2xl font-medium text-gray-600">Reviews</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-5xl font-bold text-gray-800 tracking-tight">4.6</span>
              <div className="flex flex-col items-start leading-none">
                <div className="flex text-[#ffc107] mb-1">
                  {[...Array(4)].map((_, i) => <Star key={i} size={24} fill="currentColor" />)}
                  <Star size={24} fill="#e2e8f0" className="text-gray-300" />
                </div>
                <span className="text-sm font-medium text-gray-500">Based on 50 reviews</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Marquee Container */}
        <div
          className="relative flex overflow-hidden group py-10"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            className={`flex gap-6 animate-marquee ${isPaused ? 'pause-animation' : ''}`}
            style={{ width: 'max-content' }}
          >
            {ALL_REVIEWS.map((review, i) => (
              <div
                key={`${review.id}-${i}`}
                className="w-[300px] md:w-[350px] bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-lg md:shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] flex flex-col justify-between lg:hover:shadow-2xl lg:hover:-translate-y-1 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <img
                      src={review.image}
                      alt={review.name}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 rounded-full object-cover grayscale"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${review.name}&background=random`;
                      }}
                    />
                    <div>
                      <h4 className="font-bold text-gray-800 text-sm leading-tight">{review.name}</h4>
                      <p className="text-xs text-gray-400 font-medium">{review.date}</p>
                    </div>
                  </div>

                  <div className="flex text-[#ffc107] mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill={i < review.rating ? "currentColor" : "none"} className={i < review.rating ? "" : "text-gray-200"} />
                    ))}
                  </div>

                  <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">
                    {review.text}
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-gray-50 pt-4">
                  <div className="flex items-center gap-1.5 opacity-60">
                    <img src="https://static.vecteezy.com/system/resources/previews/046/861/647/non_2x/google-logo-transparent-background-free-png.png" alt="Google" referrerPolicy="no-referrer" className="h-3" />
                    <span className="text-[10px] font-bold text-gray-400">Posted on Google</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        .pause-animation {
          animation-play-state: paused;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        /* For mobile */
        @media (max-width: 768px) {
          .animate-marquee {
            animation-duration: 35s; /* Slower = cooler on mobile */
          }
        }
      `}</style>
    </section>
  );
};

'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { RainbowGallery } from '@/components/RainbowGallery';

const BLOG_POSTS = [
    {
        id: 1,
        title: "Custom Dart Board Design Process",
        excerpt: "Step-by-step look at how handcrafted dart boards are designed with precision and creativity...",
        image: "https://i.ibb.co/Jjwq76JR/unnamed-2026-04-16-T124458-834.jpg",
        author: "Art Craft Works",
        date: "April 10, 2026",
        category: "Design",
        readTime: "6 min read"
    },
    {
        id: 2,
        title: "Why Custom Boards Are Trending",
        excerpt: "Custom dart boards are becoming popular for their unique look and premium feel...",
        image: "https://i.ibb.co/99WwQ5X3/unnamed-2026-04-16-T124456-143.jpg",
        author: "Art Craft Works",
        date: "April 5, 2026",
        category: "Trends",
        readTime: "5 min read"
    },
    {
        id: 3,
        title: "Best Materials for Dart Boards",
        excerpt: "Explore the materials used in professional and custom dart board crafting...",
        image: "https://i.ibb.co/p6GVYm5g/unnamed-2026-04-16-T124452-347.jpg",
        author: "Art Craft Works",
        date: "March 28, 2026",
        category: "Guide",
        readTime: "7 min read"
    },
    {
        id: 4,
        title: "Handcrafted vs Machine Made",
        excerpt: "Comparing handcrafted dart boards with factory-made designs...",
        image: "https://i.ibb.co/HLLp1Kw3/unnamed-2026-04-16-T124449-017.jpg",
        author: "Art Craft Works",
        date: "March 20, 2026",
        category: "Comparison",
        readTime: "6 min read"
    }
];

const CATEGORIES = ["All", "Design", "Trends", "Guide", "Comparison"];

export default function BlogPage() {
    return (
        <div className="bg-[#f4f4f0] min-h-screen pb-32">
            <RainbowGallery />

            <div className="max-w-[1400px] mx-auto px-4 md:px-8 -mt-12 relative z-20">

                {/* Categories */}
                <div className="flex overflow-x-auto gap-4 pb-12 mb-20 justify-center">
                    {CATEGORIES.map((cat, i) => (
                        <button
                            key={cat}
                            className={`px-8 py-3 rounded-xl text-xs font-bold uppercase border-2 ${i === 0 ? "bg-black text-white" : "bg-white text-black hover:bg-black hover:text-white"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="grid lg:grid-cols-12 gap-16">

                    {/* Main */}
                    <div className="lg:col-span-8 space-y-20">

                        {/* Featured */}
                        <div className="group cursor-pointer">
                            <div className="aspect-[21/9] overflow-hidden mb-10 border-4 border-black">
                                <img src={BLOG_POSTS[0].image} className="w-full h-full object-cover group-hover:scale-110 transition" />
                            </div>

                            <h2 className="text-5xl font-black mb-6 group-hover:text-red-600 transition">
                                {BLOG_POSTS[0].title}
                            </h2>

                            <p className="text-gray-700 mb-6">
                                {BLOG_POSTS[0].excerpt}
                            </p>

                            <Link href={`/blog/${BLOG_POSTS[0].id}`} className="flex items-center gap-2 font-bold">
                                READ MORE <ArrowRight size={18} />
                            </Link>
                        </div>

                        {/* Grid */}
                        <div className="grid md:grid-cols-2 gap-10 border-t pt-10">
                            {BLOG_POSTS.slice(1).map(post => (
                                <div key={post.id} className="group">
                                    <div className="aspect-[4/3] overflow-hidden border-2 border-black mb-4">
                                        <img src={post.image} className="w-full h-full object-cover group-hover:scale-110 transition" />
                                    </div>

                                    <h3 className="text-xl font-bold mb-2 group-hover:text-red-600">
                                        {post.title}
                                    </h3>

                                    <Link href={`/blog/${post.id}`} className="text-sm font-bold">
                                        READ →
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <aside className="lg:col-span-4 space-y-10">

                        {/* About */}
                        <div className="bg-black text-white p-10">
                            <h4 className="text-lg font-bold mb-4">About Us</h4>
                            <p className="text-sm text-gray-300">
                                We create handcrafted dart board designs with unique art styles, bringing creativity into every game.
                            </p>
                        </div>

                        {/* Latest */}
                        <div className="bg-white p-8 border-2 border-black">
                            <h4 className="font-bold mb-6">Latest Posts</h4>

                            {BLOG_POSTS.map(post => (
                                <div key={post.id} className="mb-4 border-b pb-2">
                                    <p className="text-sm font-semibold">{post.title}</p>
                                </div>
                            ))}
                        </div>

                        {/* Subscribe */}
                        <div className="bg-red-600 text-white p-10">
                            <h4 className="text-xl font-bold mb-4">Subscribe</h4>

                            <input
                                type="email"
                                placeholder="Enter email"
                                className="w-full mb-4 p-3 text-black"
                            />

                            <button className="w-full bg-black py-3 font-bold">
                                SUBSCRIBE
                            </button>
                        </div>

                    </aside>
                </div>
            </div>
        </div>
    );
}
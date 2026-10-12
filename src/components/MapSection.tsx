'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Palette } from 'lucide-react';

export const MapSection = () => {
  const mapStyle = 'standard';

  const getFilter = () => {
    switch (mapStyle) {

      case 'standard': return 'grayscale(0.2) contrast(1.1)';
      default: return 'none';
    }
  };

  return (
    <section className="relative w-full h-full bg-gray-50 group overflow-hidden">
      {/* Google Map Embed - Full Cover Design */}
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15843.916327361732!2d79.8519!3d6.9271!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae259115cc78fb9%3A0xc31245084930d41!2sColombo%2007%2C%20Sri%20Lanka!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
        width="100%"
        height="100%"
        style={{
          border: 0,
          filter: getFilter(),
          pointerEvents: 'auto'
        }}
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="transition-all duration-700"
      ></iframe>

    </section>
  );
};

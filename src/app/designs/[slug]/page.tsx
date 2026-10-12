import React from 'react';
import DesignClient from './DesignClient';

export async function generateStaticParams() {
  return [
    { slug: 'vehicle' },
    { slug: 'gamers' },
    { slug: 'movie' },
    { slug: 'marvel' },
    { slug: 'anime' },
    { slug: 'typographic' },
  ];
}

export default async function DesignPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <DesignClient slug={slug} />;
}

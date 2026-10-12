import React from 'react';
import ProductClient from './ProductClient';
import { products } from '@/data/products';

export async function generateStaticParams() {
    return products.map((product) => ({
        id: product.id,
    }));
}

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return <ProductClient id={id} />;
}

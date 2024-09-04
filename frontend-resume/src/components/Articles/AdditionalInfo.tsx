import { allPosts } from '@content';
import { PaintBrushIcon } from '@heroicons/react/24/solid';
import React from 'react';
import { SectionHeading } from '../SectionHeading/SectionHeading';
import Link from 'next/link';
import Image from 'next/image';

export const AdditionalInfo: React.FC = () => {
    return (
        <article className="py-12">
            <div className="mb-6 flex justify-center">
                <SectionHeading
                    Icon={PaintBrushIcon}
                    level={2}
                    text="My Projects"
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allPosts.map((post) => (
                    <Link href={post.url} key={post.slug} className="block">
                        <div className="rounded-lg hover:shadow-lg bg-slate-3">
                            <Image
                                src={post.image}
                                alt={post.title}
                                width={400}
                                height={400}
                                className="w-full h-48 object-cover "
                            />
                            <div className="p-4">
                                <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
                                <p className="text-sm text-gray-600">{new Date(post.date).toLocaleDateString()}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </article>
    );
};
'use client';

import { useMutation } from '@tanstack/react-query';

import { useState } from 'react';
import { Caption } from './components/Caption';
import { Images } from './components/Images';
import { Video } from './components/Video';
import { Logo } from './components/Logo';
import { InstaPostForm } from './components/InstaPostForm';
import { isValidInstagramUrl } from './api/instagram-post/util/isValidInstagramUrl';

// Type for post parameters
type PostParams = {
  link: string;
  rigName?: string;
  creator?: string;
  creatorHandle?: string;
  info?: string;
};

// API call to generate Instagram post
async function generatePost(props: PostParams) {
  const res = await fetch('/api/instagram-post', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(props),
  });

  const data = await res.json();
  return data;
}

export default function InstaPostGenerator() {
  // Form state
  const [form, setForm] = useState({
    link: '',
    rigName: '',
    creator: '',
    creatorHandle: '',
    info: '',
  });
  const [formError, setFormError] = useState<string | null>(null);

  // React Query mutation for API call
  const { mutate, data, isPending, error } = useMutation<{
    caption: string;
    images: string[];
    video: string | null;
    originalCaption: string;
  } | null>({
    mutationFn: () => generatePost(form),
    onError: () => {
      setFormError('Something went wrong. Please check your input and try again.');
    },
    onSuccess: () => {
      setFormError(null);
    },
  });

  // Handle form submit
  function handleGenerate() {
    if (!form.link.trim()) {
      setFormError('Instagram link is required.');
      return;
    }
    if (!isValidInstagramUrl(form.link.trim())) {
      setFormError('Please enter a valid Instagram link.');
      return;
    }
    setFormError(null);
    mutate();
  }

  function handleFormChange(field: string, value: string) {
    setForm(f => ({ ...f, [field]: value }));
  }

  return (
    <div className="space-y-4 p-4 pb-60 min-h-screen">
      <Logo />

      <InstaPostForm
        link={form.link}
        rigName={form.rigName}
        creator={form.creator}
        creatorHandle={form.creatorHandle}
        info={form.info}
        formError={formError}
        isPending={isPending}
        onChange={handleFormChange}
        onSubmit={handleGenerate}
      />

      <div className="mt-6 space-y-4">
        {error && !formError && (
          <p className="text-red-500">
            {error.message || 'Something went wrong. Please try again.'}
          </p>
        )}

        {data && (
          <>
            <Caption caption={data.caption} />
            <Images images={data.images} />
            <Video video={data.video} />
          </>
        )}
      </div>
    </div>
  );
}

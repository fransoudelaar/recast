'use client';

import { useMutation } from '@tanstack/react-query';

import { useState } from 'react';
import { Caption } from './_components/Caption';
import { Media } from './_components/Media';
import { Logo } from './_components/Logo';
import { InstaPostForm } from './_components/InstaPostForm';
import { isValidInstagramUrl } from './_utils/isValidInstagramUrl';

import type { DataReturnType } from './_services/instagramPost';
import { generatePost } from './_services/instagramPost';
import { FormError } from './_components/FormError';

export default function InstaPostGenerator() {
  const [form, setForm] = useState({
    link: '',
    rigName: '',
    creator: '',
    creatorHandle: '',
    info: '',
  });
  const [formError, setFormError] = useState<string | null>(null);

  const { mutate, data, isPending, error } = useMutation<DataReturnType>({
    mutationFn: () => generatePost(form),
    onError: () => {
      setFormError('Something went wrong. Please check your input and try again.');
    },
    onSuccess: () => {
      setFormError(null);
      window.scrollTo(0, 0);
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
          <FormError error={error.message || 'Something went wrong. Please try again.'} />
        )}

        {data && (
          <div className="flex flex-col gap-4 pb-32">
            <Caption caption={data.caption} />
            <Media images={data.images} video={data.video} />
          </div>
        )}
      </div>
    </div>
  );
}

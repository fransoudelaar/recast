import React from 'react';
import { FormInput } from './FormInput';
import { FormTextarea } from './FormTextarea';
import { FormError } from './FormError';
import { Spinner } from './Spinner';

interface InstaPostFormProps {
  link: string;
  rigName: string;
  creator: string;
  creatorHandle: string;
  info: string;
  formError: string | null;
  isPending: boolean;
  onChange: (field: string, value: string) => void;
  onSubmit: () => void;
}

export function InstaPostForm({
  link,
  rigName,
  creator,
  creatorHandle,
  info,
  formError,
  isPending,
  onChange,
  onSubmit,
}: InstaPostFormProps) {
  // For accessibility, associate error with link input
  const errorId = formError ? 'form-error-message' : undefined;
  return (
    <form
      className="fixed bottom-0 m-0 left-0 w-full flex gap-2 flex-col p-4 dark:bg-linear-65 bg-white dark:from-neutral-900 dark:to-stone-950 z-index-10"
      onSubmit={e => {
        e.preventDefault();
        onSubmit();
      }}>
      <div className="flex gap-2">
        <FormInput
          id="link"
          name="link"
          label="Instagram link"
          type="text"
          placeholder="Instagram link"
          value={link}
          onChange={e => onChange('link', e.target.value)}
          required
          aria-required="true"
          errorId={errorId}
        />
        <FormInput
          id="rigName"
          name="rigName"
          label="Rig name"
          type="text"
          placeholder="Rig name"
          value={rigName}
          onChange={e => onChange('rigName', e.target.value)}
        />
      </div>
      <div className="flex gap-2">
        <FormInput
          id="creator"
          name="creator"
          label="Creator"
          type="text"
          placeholder="Creator"
          value={creator}
          onChange={e => onChange('creator', e.target.value)}
        />
        <FormInput
          id="creatorHandle"
          name="creatorHandle"
          label="Creator's Instagram handle"
          type="text"
          placeholder="Creator's Instagram handle"
          value={creatorHandle}
          onChange={e => onChange('creatorHandle', e.target.value)}
        />
      </div>
      <FormTextarea
        id="info"
        name="info"
        label="Extra info"
        placeholder="Extra info (rig details, style, etc.)"
        value={info}
        onChange={e => onChange('info', e.target.value)}
        rows={2}
      />
      <FormError error={formError} id={errorId} />
      <button
        type="submit"
        disabled={isPending || !link.trim()}
        className="uppercase w-full relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
        <span className="w-full relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-linear-65 dark:from-neutral-900 dark:to-stone-950 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
          {isPending ? (
            <>
              <Spinner />
              Generating...
            </>
          ) : (
            'Generate post'
          )}
        </span>
      </button>
    </form>
  );
}

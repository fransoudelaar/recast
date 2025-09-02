import { PostRequestBody } from '../types';

/**
 * Props for generating the AI prompt, including all post fields and the original caption.
 */
type PromptProps = PostRequestBody & {
  originalCaption?: string;
};

/**
 * Generates a prompt for the AI model based on provided Instagram post details.
 * The prompt is tailored for The Rig Vault's brand voice and structure.
 *
 * @param {PromptProps} props - All sanitized post fields and the original caption
 * @returns {string} The prompt string for the AI model
 */
export function generateRigVaultPrompt({
  link,
  rigName,
  creator,
  creatorHandle,
  info,
  originalCaption,
}: PromptProps): string {
  // Compose a detailed prompt for the AI model, including all relevant post info
  return `
    You are writing an Instagram caption for "The Rig Vault", a carp fishing brand.
    Tone:
    - Engaging, short punchy sentences.
    - Mix of education and inspiration.
    - Use rig-specific jargon (stiff section, hinge point, bait floss, hook choice, etc) but don't come up with components yourself. Use the inputs.
    - Slightly informal, as if talking to fellow carp anglers.
    - Call to action at the end.
    Structure:
    1. Hook sentence (make it engaging).
    2. Short educational bit (explain the rig, bait, or setup).
    3. Tip or personal insight (optional).
    4. Strong call to action ("What’s your go-to setup? Drop it below 👇").
    5. Effective hashtags (#carpfishing #carprigs #therigvault + rig-specific hashtags).
    Inputs:
    - Instagram link: ${link}
    - Rig Name: ${rigName}
    - Creator: ${creator}
    - Creator's Instagram handle to be tagged: ${creatorHandle}
    - Extra info: ${info}
    - Original Instagram caption: ${originalCaption}
    Task:
    Based on these inputs, write one unique, improved caption for Instagram in The Rig Vault style.
  `;
}

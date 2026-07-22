'use client';

import { useState } from 'react';

import styles from './contact-section.module.css';

type CopyEmailButtonProps = {
  email: string;
};

export default function CopyEmailButton({ email }: CopyEmailButtonProps) {
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'failed'>('idle');

  async function copyEmail() {
    let didCopy = false;

    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(email);
        didCopy = true;
      } else {
        didCopy = fallbackCopy(email);
      }
    } catch {
      didCopy = fallbackCopy(email);
    }

    if (didCopy) {
      setCopyStatus('copied');
      window.setTimeout(() => setCopyStatus('idle'), 1800);
      return;
    }

    setCopyStatus('failed');
  }

  return (
    <div className={styles.emailGroup}>
      <button className={styles.emailButton} type="button" onClick={copyEmail}>
        <span className={styles.emailText}>{email}</span>

        <span className={styles.copyIcon} aria-hidden="true">
          <svg aria-hidden="true" viewBox="0 0 24 24" focusable="false">
            <rect x="9" y="9" width="10" height="10" rx="2" />
            <path d="M5 15V7a2 2 0 0 1 2-2h8" />
          </svg>
        </span>

        <span className="visually-hidden">Copy email address</span>
      </button>

      <p className={styles.copyStatus} aria-live="polite">
        {copyStatus === 'copied' ? 'Copied email to clipboard.' : null}
        {copyStatus === 'failed' ? 'Could not copy email. You can select it manually.' : null}
      </p>
    </div>
  );
}

function fallbackCopy(value: string) {
  const textarea = document.createElement('textarea');

  textarea.value = value;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'fixed';
  textarea.style.top = '0';
  textarea.style.left = '0';
  textarea.style.opacity = '0';

  try {
    document.body.appendChild(textarea);
    textarea.select();
    textarea.setSelectionRange(0, textarea.value.length);

    return document.execCommand('copy');
  } catch {
    return false;
  } finally {
    textarea.remove();
  }
}

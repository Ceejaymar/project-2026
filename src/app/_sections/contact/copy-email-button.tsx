'use client';

import { CopyIcon } from '@phosphor-icons/react';
import { useState } from 'react';

import styles from './contact-section.module.css';

type CopyEmailButtonProps = {
  email: string;
};

export default function CopyEmailButton({ email }: CopyEmailButtonProps) {
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'failed'>('idle');

  const tooltipText =
    copyStatus === 'copied'
      ? 'Email address copied'
      : copyStatus === 'failed'
        ? 'Could not copy email'
        : 'Click to copy email';

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
    window.setTimeout(() => setCopyStatus('idle'), 1800);
  }

  return (
    <div className={styles.emailGroup}>
      <button
        className={styles.emailButton}
        type="button"
        onClick={copyEmail}
        data-copy-status={copyStatus}
      >
        <span className={styles.emailText}>{email}</span>

        <span className={styles.copyIcon} aria-hidden="true">
          <CopyIcon weight="regular" size={28} />
        </span>

        <span className={styles.tooltip} aria-hidden="true">
          {tooltipText}
        </span>

        <span className="visually-hidden">Copy email address</span>
      </button>

      <p className="visually-hidden" aria-live="polite">
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

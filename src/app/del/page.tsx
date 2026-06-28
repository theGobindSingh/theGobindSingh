"use client";

import { Button } from "@components/button";
import { useCallback, useEffect, useRef, useState } from "react";

let showToast: ((msg: string) => void) | null = null;
const triggerToast = (msg: string) => {
  showToast?.(msg);
};

let focusGate = false;

const prevent = (e: Event) => {
  e.preventDefault();
  e.stopPropagation();
  (
    e as Event & { stopImmediatePropagation?: () => void }
  ).stopImmediatePropagation?.();
};

const preventClipboard = (e: Event) => {
  prevent(e);
  if (e.type === "paste") {
    triggerToast("Pasting is not allowed. Please type your response.");
  }
};
const preventDrag = (e: Event) => {
  prevent(e);
  if (e.type === "drop") {
    triggerToast("Dropping content is not allowed. Please type your response.");
  }
};
const preventContextMenu = (e: MouseEvent) => {
  const target = e.target as HTMLElement;
  if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") {
    prevent(e);
  }
};
const preventMiddleClick = (e: MouseEvent) => {
  if (e.button === 1) {
    const target = e.target as HTMLElement;
    if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") {
      prevent(e);
    }
  }
};
const preventAuxClick = (e: MouseEvent) => {
  if (e.button === 1) prevent(e);
};
const onVisibilityChange = () => {
  if (document.hidden && !focusGate) {
    focusGate = true;
    triggerToast(
      "Please do not switch tabs or minimize the browser while on this page.",
    );
    setTimeout(() => {
      focusGate = false;
    }, 1500);
  }
};
const onWindowBlur = () => {
  if (!focusGate) {
    focusGate = true;
    triggerToast(
      "Please do not switch tabs or minimize the browser while on this page.",
    );
    setTimeout(() => {
      focusGate = false;
    }, 1500);
  }
};

export default function DelPage() {
  const nameRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const [violations, setViolations] = useState<{ id: number; msg: string }[]>(
    [],
  );
  const idRef = useRef(0);

  const pushToast = useCallback((msg: string) => {
    const id = idRef.current++;
    setViolations((prev) => {
      return [...prev, { id, msg }];
    });
  }, []);

  useEffect(() => {
    showToast = pushToast;
    return () => {
      showToast = null;
    };
  }, [pushToast]);

  useEffect(() => {
    const opts = { capture: true } as const;

    document.addEventListener("paste", preventClipboard, opts);
    document.addEventListener("copy", preventClipboard, opts);
    document.addEventListener("cut", preventClipboard, opts);
    document.addEventListener("contextmenu", preventContextMenu, opts);
    document.addEventListener("mousedown", preventMiddleClick, opts);
    document.addEventListener(
      "auxclick",
      preventAuxClick as EventListener,
      opts,
    );
    document.addEventListener("drop", preventDrag, opts);
    document.addEventListener("dragover", preventDrag, opts);
    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("blur", onWindowBlur);

    return () => {
      document.removeEventListener("paste", preventClipboard, opts);
      document.removeEventListener("copy", preventClipboard, opts);
      document.removeEventListener("cut", preventClipboard, opts);
      document.removeEventListener("contextmenu", preventContextMenu, opts);
      document.removeEventListener("mousedown", preventMiddleClick, opts);
      document.removeEventListener(
        "auxclick",
        preventAuxClick as EventListener,
        opts,
      );
      document.removeEventListener("drop", preventDrag, opts);
      document.removeEventListener("dragover", preventDrag, opts);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("blur", onWindowBlur);
    };
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const mod = e.ctrlKey || e.metaKey;

    if (mod && (e.key === "v" || e.key === "V")) {
      e.preventDefault();
      triggerToast("Pasting is not allowed. Please type your response.");
      return;
    }

    if (e.shiftKey && e.key === "Insert") {
      e.preventDefault();
      triggerToast("Pasting is not allowed. Please type your response.");
      return;
    }

    if (mod && e.key === "Insert") {
      e.preventDefault();
      return;
    }
  };

  const noSelect: React.CSSProperties = {
    userSelect: "none",
    WebkitTouchCallout: "none",
  };

  const fieldProps = {
    onPaste: (e: React.ClipboardEvent) => {
      return e.preventDefault();
    },
    onCopy: (e: React.ClipboardEvent) => {
      return e.preventDefault();
    },
    onCut: (e: React.ClipboardEvent) => {
      return e.preventDefault();
    },
    onKeyDown: handleKeyDown,
    onDragOver: (e: React.DragEvent) => {
      return e.preventDefault();
    },
    onDrop: (e: React.DragEvent) => {
      e.preventDefault();
      triggerToast(
        "Dropping content is not allowed. Please type your response.",
      );
    },
    onContextMenu: (e: React.MouseEvent) => {
      return e.preventDefault();
    },
    autoComplete: "off" as const,
    autoCorrect: "off" as const,
    spellCheck: false as const,
    style: noSelect,
  };

  return (
    <main className="flex min-h-[60vh] items-start justify-center px-(--gutter) py-24">
      <form
        onSubmit={(e) => {
          return e.preventDefault();
        }}
        className="w-full max-w-lg space-y-(--space-8)"
      >
        <div className="space-y-(--space-2)">
          <label
            htmlFor="del-name"
            className="font-mono text-sm tracking-wide text-(--color-text-muted) uppercase"
          >
            Name
          </label>
          <input
            ref={nameRef}
            id="del-name"
            name="name"
            type="text"
            {...fieldProps}
            className="w-full border border-(--color-border-strong) bg-transparent px-(--space-4) py-(--space-3) font-sans text-(--color-text) outline-offset-2 focus:outline-2 focus:outline-(--color-focus)"
          />
        </div>

        <div className="space-y-(--space-2)">
          <label
            htmlFor="del-message"
            className="font-mono text-sm tracking-wide text-(--color-text-muted) uppercase"
          >
            Message
          </label>
          <textarea
            ref={messageRef}
            id="del-message"
            name="message"
            rows={5}
            {...fieldProps}
            className="w-full resize-y border border-(--color-border-strong) bg-transparent px-(--space-4) py-(--space-3) font-sans text-(--color-text) outline-offset-2 focus:outline-2 focus:outline-(--color-focus)"
          />
        </div>

        {violations.length > 0 && (
          <div
            role="alert"
            aria-live="assertive"
            className="space-y-(--space-2)"
          >
            {violations.map((v) => {
              return (
                <div
                  key={v.id}
                  className="border-l-4 border-error-500 bg-(--color-grey-100) px-(--space-4) py-(--space-3)"
                >
                  <p className="font-mono text-sm text-error-500">{v.msg}</p>
                </div>
              );
            })}
          </div>
        )}

        <div className="pt-(--space-4)">
          <Button type="submit" variant="filled" color="accent" size="lg">
            Submit
          </Button>
        </div>
      </form>
    </main>
  );
}

"use client";

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export interface AlertModalProps {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: string;
  description?: string;
  actionLabel?: string;
  cancelLabel?: string;
  onAction?: () => void | Promise<void>;
  children?: React.ReactNode;
  trigger?: React.ReactNode;
}

export default function AlertModal({
  isOpen: controlledOpen,
  onOpenChange,
  title = "Are you absolutely sure?",
  description = "This action cannot be undone.",
  actionLabel = "Continue",
  cancelLabel = "Cancel",
  onAction,
  children,
  trigger,
}: AlertModalProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;
  
  const handleOpenChange = (open: boolean) => {
    if (controlledOpen === undefined) {
      setInternalOpen(open);
    }
    onOpenChange?.(open);
  };

  const handleAction = async () => {
    await onAction?.();
    handleOpenChange(false);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={handleOpenChange}>
      {trigger && <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        {children && <div className="py-4">{children}</div>}
        <AlertDialogFooter>
          <AlertDialogCancel>{cancelLabel}</AlertDialogCancel>
          <AlertDialogAction onClick={handleAction}>{actionLabel}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
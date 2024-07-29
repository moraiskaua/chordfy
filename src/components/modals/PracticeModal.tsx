'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/src/components/ui/Dialog';
import { usePracticeModal } from '@/src/stores/usePracticeModal';
import Image from 'next/image';
import { Button } from '@/src/components/ui/Button';
import { useEffect, useState } from 'react';

interface PracticeModalProps {}

export const PracticeModal: React.FC<PracticeModalProps> = ({}) => {
  const [isClient, setIsClient] = useState(false);
  const { isOpen, close } = usePracticeModal();

  useEffect(() => setIsClient(true), []);
  if (!isClient) return null;

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center w-full justify-center mb-5">
            <Image
              src="/icons/heart.svg"
              alt="Heart"
              width={100}
              height={100}
            />
          </div>
          <DialogTitle className="text-center font-bold text-2xl">
            Practice lesson
          </DialogTitle>
          <DialogDescription className="text-center text-base">
            Use practice lesson to regain hearts and points. You cannot lose
            hearts or points in practice lessons.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mb-4">
          <div className="flex flex-col gap-y-4 w-full">
            <Button
              variant="primary"
              size="lg"
              className="w-full"
              onClick={close}
            >
              I understand
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

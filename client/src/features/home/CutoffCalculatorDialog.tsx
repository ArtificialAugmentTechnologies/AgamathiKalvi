import { useTranslation } from 'react-i18next';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { QuickCutoffCard } from './QuickCutoffCard';

type Props = { open: boolean; onOpenChange: (open: boolean) => void };

/** The TNEA quick calculator in a popup, opened from the hero (and anywhere else that needs it). */
export function CutoffCalculatorDialog({ open, onOpenChange }: Props) {
  const { t } = useTranslation();
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent closeLabel={t('booking.close')} className="sm:max-w-md">
        {/* The card shows its own visible heading; these give the dialog an accessible name. */}
        <DialogTitle className="sr-only">{t('home.quick.title')}</DialogTitle>
        <DialogDescription className="sr-only">{t('home.quick.subtitle')}</DialogDescription>
        <QuickCutoffCard className="border-0 bg-transparent p-0 shadow-none backdrop-blur-none sm:p-0" />
      </DialogContent>
    </Dialog>
  );
}

import { useCallback, type SyntheticEvent } from 'react';
import { useBookingContext, type BookingPreset } from './BookingProvider';

/**
 * Single entry point for every "Book counselling" CTA — opens the 3-step booking dialog.
 * Safe to pass straight to onClick: a click event is ignored rather than treated as a preset.
 */
export function useBookCounselling() {
  const { open } = useBookingContext();
  return useCallback(
    (preset?: BookingPreset | SyntheticEvent) =>
      open(preset && !('nativeEvent' in preset) ? preset : undefined),
    [open],
  );
}

import {
  createContext,
  lazy,
  Suspense,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from 'react';

// The dialog (forms + validation) is code-split and only downloaded on first open.
const BookingDialog = lazy(() => import('./BookingDialog'));

type BookingContextValue = { open: (preset?: BookingPreset) => void };
export type BookingPreset = {
  cutoff?: number;
  interest?: string;
  /** "Get Free Career Guidance": after a successful booking, take signed-out students to the Student Login. */
  thenLogin?: boolean;
};

const BookingContext = createContext<BookingContextValue | null>(null);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const [preset, setPreset] = useState<BookingPreset>({});

  const open = useCallback((p: BookingPreset = {}) => {
    setPreset(p);
    setHasOpened(true);
    setIsOpen(true);
  }, []);

  return (
    <BookingContext.Provider value={{ open }}>
      {children}
      {hasOpened && (
        <Suspense fallback={null}>
          <BookingDialog open={isOpen} onOpenChange={setIsOpen} preset={preset} />
        </Suspense>
      )}
    </BookingContext.Provider>
  );
}

export function useBookingContext() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error('useBookCounselling must be used inside <BookingProvider>');
  return ctx;
}

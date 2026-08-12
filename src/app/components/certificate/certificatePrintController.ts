export interface CertificatePrintWindow {
  closed: boolean;
  document: {
    open: () => void;
    write: (markup: string) => void;
    close: () => void;
  };
  addEventListener: (
    type: 'afterprint',
    listener: () => void,
    options: { once: true },
  ) => void;
  close: () => void;
  focus: () => void;
  print: () => void;
}

export interface CertificatePrintHost {
  open: (url: string, target: string, features: string) => CertificatePrintWindow | null;
  setTimeout: (callback: () => void, delay: number) => unknown;
}

export const CERTIFICATE_PRINT_DELAY_MS = 150;

export function openCertificatePrintDocument(host: CertificatePrintHost, buildMarkup: () => string) {
  const printWindow = host.open('', '_blank', 'width=1280,height=900');
  if (!printWindow) {
    return false;
  }

  const markup = buildMarkup();
  printWindow.document.open();
  printWindow.document.write(markup);
  printWindow.document.close();

  printWindow.addEventListener('afterprint', () => printWindow.close(), { once: true });
  host.setTimeout(() => {
    if (!printWindow.closed) {
      printWindow.focus();
      printWindow.print();
    }
  }, CERTIFICATE_PRINT_DELAY_MS);

  return true;
}

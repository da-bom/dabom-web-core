import { toast } from 'react-hot-toast';

import { Toast } from '@shared';

export const showToast = {
  success: (message: string) =>
    toast.custom((t) => <Toast visible={t.visible} message={message} style="positive" />, {
      position: 'bottom-center',
    }),
  error: (message: string) =>
    toast.custom((t) => <Toast visible={t.visible} message={message} style="negative" />, {
      position: 'bottom-center',
    }),
  info: (message: string) =>
    toast.custom((t) => <Toast visible={t.visible} message={message} style="default" />, {
      position: 'bottom-center',
    }),
};

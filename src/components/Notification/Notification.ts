import { toast } from 'react-toastify';

export enum NotificationVariant {
  Success = 'success',
  Error = 'error',
  Info = 'info',
}

export function notification(variant: NotificationVariant, text: string) {
  switch (variant) {
    case NotificationVariant.Error:
      return toast.error(`${text}`, {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    case NotificationVariant.Success:
      return toast.success(`${text}`, {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    case NotificationVariant.Info:
      return toast.info(`${text}`, {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
  }
}

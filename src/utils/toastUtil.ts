import { toast } from "react-toastify";

/*
 * Custom methods for showing toasters
 */
export function showErrorToast(message: string) {
  toast.error(message);
}

export function showSuccessToast(message: string) {
  toast.success(message);
}

export function showWarningToast(message: string) {
  toast.warn(message);
}

export function showInfoToast(message: string) {
  toast.info(message);
}

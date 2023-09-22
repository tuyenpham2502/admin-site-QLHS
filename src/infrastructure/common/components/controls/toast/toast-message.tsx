import { notification } from "antd";
import type { NotificationPlacement } from 'antd/es/notification/interface';
import Constants from "@/core/application/common/Constants";
/**
 * Show toast message, if you leave the message as null or empty, it will show title only
 * @param translator
 * @param title
 * @param message 
 */
export const notifyInfo = (translator: any, title: string, message?: string) => {
    if (message == null || message.length == 0) {
        notification.info({
            message: translator('toast-info'),
            description: title,
            placement: Constants.ToastMessage.Notification.Position,
            duration: Constants.ToastMessage.Notification.Duration,
        });
    } else {
        notification.info({
            message: title,
            description: message,
            placement: Constants.ToastMessage.Notification.Position,
            duration: Constants.ToastMessage.Notification.Duration,
        });
    }
};

export const notifySuccess = (translator: any, title: any, message?: string) => {
    if (message == null || message.length == 0) {
        notification.success({
            message: translator('Thành công'),
            description: title,
            placement: Constants.ToastMessage.Notification.Position,
            duration: Constants.ToastMessage.Notification.Duration,
        });
    } else {
        notification.success({
            message: title,
            description: message,
            placement: Constants.ToastMessage.Notification.Position,
            duration: Constants.ToastMessage.Notification.Duration,
        });
    }

};

export const notifyError = (translator: any, title: any, message?: any) => {
    if (message == null || message.length == 0) {
        notification.error({
            message: translator('Lỗi'),
            description: title,
            placement: Constants.ToastMessage.Notification.Position,
            duration: Constants.ToastMessage.Notification.Duration,
        });
    } else {
        notification.error({
            message: title,
            description: message,
            placement: Constants.ToastMessage.Notification.Position,
            duration: Constants.ToastMessage.Notification.Duration,
        });
    }

};

export const notifyWarning = (translator: any, title: any, message?: string, duration: number = Constants.ToastMessage.Notification.Duration, placement: NotificationPlacement = Constants.ToastMessage.Notification.Position) => {
    if (message == null || message.length == 0) {
        notification.warning({
            message: translator('Cảnh báo'),
            description: title,
            placement: placement,
            duration: duration,
        });
    } else {
        notification.warning({
            message: title,
            description: message,
            placement: placement,
            duration: duration,
        });
    }

};

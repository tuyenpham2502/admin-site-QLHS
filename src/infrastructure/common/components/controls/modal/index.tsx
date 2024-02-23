import { Modal } from "antd";

/**
 * Show confirm modal
 * @param title 
 * @param content 
 * @param onOk 
 * @param onCancel 
 */ 

export const ModalConfirm = (title: string, content:any, onOk: any, onCancel:any) => {
    Modal.confirm({
        title: title,
        content: content,
        onOk: onOk,
        onCancel: onCancel,
        width:  600
    });


}
import { ModalFuncProps } from "antd";
import { editItemT } from "../../components/UserMain/UserMain";

export interface IEditModal extends ModalFuncProps {
    head?: string,
    editItemType: editItemT | ''
}


"use client";
import React, { useCallback, useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import styles from "./Modal.module.scss";
import Button from "../Button/Button";

interface ModalProps {
  disabled?: boolean;
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  content?: React.ReactElement;
  footer?: React.ReactElement;
  action: () => void;
  actionLabel: string;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
}

const Modal: React.FC<ModalProps> = ({
  disabled,
  isOpen,
  onClose,
  title,
  content,
  footer,
  action,
  actionLabel,
  secondaryAction,
  secondaryActionLabel,
}) => {
  const [showModal, setShowModal] = useState(isOpen);

  //show modal if isOpen is true
  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  /**
   * close the modal onClick
   * check if the modal is disabled first
   * return if disabled else run the function
   */
  const handleClose = useCallback(() => {
    if (disabled) return;
    setShowModal(false)
    setTimeout(() => {
      onClose();
    }, 300);
  }, [disabled, onClose]);

  //perform an action if the action btn is clicked
  const handleAction = useCallback(() => {
    if (disabled) return;
    action();
  }, [disabled, action]);

  //handle secondary action if true
  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) return;
    secondaryAction();
  }, [disabled, secondaryAction]);

  //if the modal is not open return null else continue the function flow
  if (!isOpen) return null;

  const visibleModal = () => {
    if (showModal) {
      return `${styles.modalContent} ${styles.modalContentAlt}`;
    } else {
      return `${styles.modalContent}`;
    }
  };

  return (
    <>
      <div className={styles.modal}>
        <div className={styles.modalContainer}>
          <div className={visibleModal()}>
            <div className={styles.content}>
              {/* head */}
              <div className={styles.head}>
                <AiOutlineClose
                  className={styles.closeIcn}
                  onClick={handleClose}
                />
                <p className={styles.title}>{title}</p>
              </div>
              {/* body */}
              <div className={styles.body}>{content}</div>
              {/* action */}
              <div className={styles.action}>
                <div className={styles.actionContent}>
                  {secondaryAction && secondaryActionLabel && (
                    <Button
                      outline
                      label={secondaryActionLabel}
                      disabled={disabled}
                      onClick={handleSecondaryAction}
                    />
                  )}
                  <Button
                    label={actionLabel}
                    disabled={disabled}
                    onClick={handleAction}
                  />
                </div>
              </div>
              {/* footer */}
              <div className={styles.footer}>{footer}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;

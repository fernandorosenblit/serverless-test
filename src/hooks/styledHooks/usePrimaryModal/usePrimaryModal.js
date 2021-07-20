import React, { useState, useEffect, useCallback } from 'react'
import ReactModal from 'react-modal'
import { useIntl } from 'react-intl'
import classNames from 'classnames'

import { white } from 'styles/common/_constants.scss'
import { isFunction } from 'utils/helpers'
import Button from 'components/common/Button/Button'

import { ReactComponent as CloseIcon } from 'assets/icons/close.svg'
import { func, string } from 'prop-types'

const labels = {
  close: { id: 'common.close_modal' },
}

export default () => {
  const intl = useIntl()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    ReactModal.setAppElement('body')
  }, [])

  const Modal = ({
    title,
    description,
    handleCloseModal,
    onLeftButtonClick,
    onRightButtonClick,
    leftButtonLabel,
    rightButtonLabel,
    icon: Icon,
  }) => {
    const onCloseModal = useCallback(() => {
      setIsOpen(false)
      isFunction(handleCloseModal) && handleCloseModal()
    }, [handleCloseModal])
    return (
      <ReactModal
        className={classNames('primary-modal', { 'primary-modal--with-icon': Icon })}
        overlayClassName="primary-modal-overlay"
        isOpen={isOpen}
        onRequestClose={onCloseModal}
      >
        <button
          aria-label={intl.formatMessage(labels.close)}
          className="primary-modal__close-btn"
          type="button"
          onClick={() => setIsOpen(false)}
        >
          <CloseIcon fill={white} />
        </button>
        {Icon && <Icon />}
        <h2 className="primary-modal__title">{title}</h2>
        <span className="primary-modal__description">{description}</span>
        <div className="primary-modal__btn-wrapper">
          {isFunction(onLeftButtonClick) && (
            <Button
              className="primary-modal__left-btn"
              onClick={onLeftButtonClick}
              primary
              outlined
            >
              {leftButtonLabel}
            </Button>
          )}
          {isFunction(onRightButtonClick) && (
            <Button onClick={onRightButtonClick} primary>
              {rightButtonLabel}
            </Button>
          )}
        </div>
      </ReactModal>
    )
  }

  Modal.propTypes = {
    title: string.isRequired,
    description: string,
    handleCloseModal: func,
    onLeftButtonClick: func,
    onRightButtonClick: func,
    leftButtonLabel: string,
    rightButtonLabel: string,
    icon: func,
  }

  return { Modal, setIsOpen }
}

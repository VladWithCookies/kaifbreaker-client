import React, { useState } from 'react'

import NewProjectModalComponent from './component'

export default function NewProjectModal()  {
  const [isOpen, setIsOpen] = useState(false)

  const handleToggleModal = () => {
    setIsOpen(!isOpen)
  }

  return (
    <NewProjectModalComponent
      isOpen={isOpen}
      onOpen={handleToggleModal}
      onClose={handleToggleModal}
    />
  )
}

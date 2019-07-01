import React from 'react'

import NewProjectModalComponent from './component'

class NewProjectModal extends React.Component {
  state = {
    isOpen: false
  }

  handleOpen = () => {
    this.setState({ isOpen: true })
  }

  handleClose = () => {
    this.setState({ isOpen: false })
  }

  render() {
    return (
      <NewProjectModalComponent
        {...this.props}
        isOpen={this.state.isOpen}
        onOpen={this.handleOpen}
        onClose={this.handleClose}
      />
    )
  }
}

export default NewProjectModal

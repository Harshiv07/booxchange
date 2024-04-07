import React, { Component } from 'react'
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ListGroup,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Input,
} from 'reactstrap'
import { FaEdit } from 'react-icons/fa'
import axios from 'axios'

class AdminModalUpdate extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalEdit: false,
            title: this.props.infos.title,
            tags: this.props.infos.tags,
            images: this.props.infos.images,
            author: this.props.infos.author,
            description: this.props.infos.description,
            price: this.props.infos.price,
        }
    }

    toggle = () => this.setState({ modalEdit: !this.state.modalEdit })

    onSubmit = (id, title, author, price, tags, images, description) => {
        axios({
            method: 'put',
            url: '/api/update/item',
            data: {
                id: id,
                title: title,
                author: author,
                price: price,
                tags: (tags.slice(0) + '').replace(/\s/g, '').split(','),
                images: (images.slice(0) + '').replace(/\s/g, '').split(','),
                description: description,
            },
        })
            .then(() => {
                this.setState({ modalEdit: !this.state.modalEdit })
            })
            .then(() => {
                window.location.reload(true)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    onChangeTitle = (e) => this.setState({ title: e.target.value })
    onChangeAuthor = (e) => this.setState({ author: e.target.value })
    onChangePrice = (e) => this.setState({ price: e.target.value })
    onChangeTags = (e) => this.setState({ tags: e.target.value })
    onChangeImages = (e) => this.setState({ images: e.target.value })
    onChangeDescription = (e) => this.setState({ description: e.target.value })

    render() {
        const { title, tags, images, description, author, price } = this.state
        const { _id } = this.props.infos

        return (
            <div>
                <Button outline color="primary" size="sm" onClick={this.toggle}>
                    <FaEdit />
                </Button>
                <Modal
                    isOpen={this.state.modalEdit}
                    toggle={this.toggle}
                    className={this.props.className}
                >
                    <ModalHeader toggle={this.toggle}>
                        {this.props.infos.title} - (id: {_id})
                    </ModalHeader>
                    <ModalBody>
                        <ListGroup>
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>Name</InputGroupText>
                                </InputGroupAddon>
                                <Input
                                    placeholder={
                                        'default: ' + this.props.infos.title
                                    }
                                    value={title}
                                    onChange={this.onChangeTitle}
                                />
                            </InputGroup>
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>Author</InputGroupText>
                                </InputGroupAddon>
                                <Input
                                    placeholder={
                                        'default: ' + this.props.infos.author
                                    }
                                    value={author}
                                    onChange={this.onChangeAuthor}
                                />
                            </InputGroup>
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>Price</InputGroupText>
                                </InputGroupAddon>
                                <Input
                                    placeholder={
                                        'default: ' + this.props.infos.price
                                    }
                                    value={price}
                                    onChange={this.onChangePrice}
                                />
                            </InputGroup>
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>Category</InputGroupText>
                                </InputGroupAddon>
                                <Input
                                    placeholder={
                                        'default: ' + this.props.infos.tags
                                    }
                                    value={tags}
                                    onChange={this.onChangeTags}
                                />
                            </InputGroup>
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>Images</InputGroupText>
                                </InputGroupAddon>
                                <Input
                                    type="textarea"
                                    placeholder={
                                        'default: ' +
                                        this.props.infos.images.map(
                                            (x) => x + ' ' + x
                                        )
                                    }
                                    value={images}
                                    onChange={this.onChangeImages}
                                />
                            </InputGroup>
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>description</InputGroupText>
                                </InputGroupAddon>
                                <Input
                                    type="textarea"
                                    placeholder={
                                        'default: ' +
                                        this.props.infos.description
                                    }
                                    value={description}
                                    onChange={this.onChangeDescription}
                                />
                            </InputGroup>
                        </ListGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            color="primary"
                            onClick={() =>
                                this.onSubmit(
                                    _id,
                                    title,
                                    author,
                                    price,
                                    tags,
                                    images,
                                    description
                                )
                            }
                        >
                            Confirm the changes?
                        </Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export default AdminModalUpdate

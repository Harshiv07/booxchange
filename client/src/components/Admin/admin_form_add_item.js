import React, { Component } from 'react'
import { Button, Input, Form, FormGroup, Label, Container } from 'reactstrap'
import axios from 'axios'

class AdminFormAddItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalEdit: false,
            title: '',
            author: '',
            tags: '',
            images: '',
            description: '',
            price: 30,
            success: false,
        }
    }

    toggle = () => {
        this.setState({
            modalEdit: !this.state.modalEdit,
        })
    }

    onSubmit = (title, author, price, tags, images, description) => {
        axios
            .post(process.env.REACT_APP_SERVER + '/api/add/item', {
                title,
                author,
                price,
                tags: (tags.slice(0) + '').replace(/\s/g, '').split(','),
                images: (images.slice(0) + '').replace(/\s/g, '').split(','),
                description,
            })
            .then(() => {
                window.location.reload(true)
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    onChangeTitle = (e) => this.setState({ title: e.target.value })
    onChangeAuthor = (e) => this.setState({ author: e.target.value })
    onChangePrice = (e) => this.setState({ price: e.target.value })
    onChangeTags = (e) => this.setState({ tags: [e.target.value] })
    onChangeImages = (e) => this.setState({ images: [e.target.value] })
    onChangeDescription = (e) => this.setState({ description: e.target.value })

    render() {
        const { title, author, price, tags, images, description } = this.state
        return (
            <Container style={{ paddingTop: '50px', minHeight: '85vh' }}>
                <h1>Add new item</h1>
                <Form>
                    <FormGroup>
                        <Label for="exampleTitle">Item's Title</Label>
                        <Input
                            placeholder="example: Hamlet"
                            value={this.state.title}
                            onChange={this.onChangeTitle}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleAuthor">Item's Author</Label>
                        <Input
                            placeholder="example: William Shakesphere"
                            value={this.state.author}
                            onChange={this.onChangeAuthor}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="examplePrice">Price</Label>
                        <Input
                            placeholder="example: 40"
                            value={this.state.price}
                            onChange={this.onChangePrice}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleCategory">Category</Label>
                        <Input
                            placeholder="example: Novel"
                            value={this.state.tags}
                            onChange={this.onChangeTags}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleImage">Images</Label>
                        <Input
                            placeholder="example: http://link1.jpg, http://link2.jpg"
                            value={this.state.images}
                            onChange={this.onChangeImages}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleDescription">Description</Label>
                        <Input
                            type="textarea"
                            value={this.state.description}
                            onChange={this.onChangeDescription}
                        />
                    </FormGroup>
                </Form>
                <Button
                    onClick={() =>
                        this.onSubmit(
                            title,
                            author,
                            price,
                            tags,
                            images,
                            description
                        )
                    }
                >
                    Submit
                </Button>
            </Container>
        )
    }
}

export default AdminFormAddItem

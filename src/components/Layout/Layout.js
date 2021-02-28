import React, { Component } from 'react';

import { Row, Col, Button } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import './Layout.css';
import Categories from '../Categories/Categories';
import Modal from '../Modal/Modal';

class Layout extends Component {
    state = {
        title: '',
        categories: [],
        showModal: false,
        isCreate: true,
        category: null
    }

    defaultState = {
        title: '',
        showModal: false,
        isCreate: true,
        category: null
    }

    onChangeTitle = (event) => {
        this.setState({
            title: event.target.value
        })
    }

    showCategoryModal = (category, isCreate) => {
        let title = '';
        if (!isCreate && category) {
            title = category.title;
        }
        this.setState({
            showModal: true,
            isCreate: isCreate,
            title: title,
            category: category
        })
    }

    onCloseModal = () => {
        this.setState({
            ...this.defaultState
        })
    }

    onSaveCategory = () => {
        if (this.state.title !== '') {
            let parentId = 0, categoryId = Date.now(); // default for category creation
            if (this.state.category) { // when creating or editing a child
                categoryId = this.state.isCreate ? 
                    categoryId : // Setting category id to current timestamp for creating new category
                    this.state.category.id; // Setting category id for editing existing category
                parentId = this.state.isCreate ? 
                    this.state.category.id : // Setting parent category id for creating new category
                    this.state.category.parent; // Setting parent id for editing child category
            }
            const category = {
                id: categoryId,
                parent: parentId,
                title: this.state.title
            }            
            let categories = [
                ...this.state.categories
            ]
            if (this.state.isCreate) {
                categories.push(category);
            } else {
                const index = categories.findIndex(category => category.id === this.state.category.id);
                categories.splice(index, 1, category);
            }
            
            this.setState({
                categories: categories,
                ...this.defaultState
            })
        }
    }

    onDeleteCategory = (categoryId) => {
        let categories = [
            ...this.state.categories
        ]
        const index = categories.findIndex(category => category.id === categoryId);
        categories.splice(index, 1);
        const filteredCategories = categories.filter(category => category.parent !== categoryId);
        this.setState({
            categories: filteredCategories
        })
    }

    buildCategoryTree = (categories, id = 0) => {
        return categories
            .filter(category => category['parent'] === id)
            .map(category => ({ ...category, children: this.buildCategoryTree(categories, category.id) }));
    }

    render() {
        let categoriesList = null;
        if (this.state.categories.length) {
            const categoriesTree = this.buildCategoryTree(this.state.categories);
            categoriesList = <Categories 
                categories={categoriesTree}
                showCategoryModal={this.showCategoryModal}
                deleteCategory={this.onDeleteCategory}
            />
        }

        return (
            <Row className="my-4 categories-list">
                <Col xs="12">                    
                    <Button variant="success" onClick={() => this.showCategoryModal(null, true)}>
                        <FontAwesomeIcon icon={faPlus} /> Add Category
                    </Button>
                </Col>
                <Col xs="12" className="my-4">
                    {categoriesList}
                </Col>
                <Modal 
                    title={this.state.title}
                    showModal={this.state.showModal}
                    closeModal={this.onCloseModal}
                    saveCategory={this.onSaveCategory}
                    changeTitle={this.onChangeTitle}
                />
            </Row>
        )
    }
}

export default Layout;
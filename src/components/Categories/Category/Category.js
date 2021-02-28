import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash, faCaretRight } from '@fortawesome/free-solid-svg-icons';

import Categories from '../Categories';

const Category = (props) => {
    const [childVisible, setChildVisibility] = useState(false);

    const hasChildCategoory = props.category.children.length ? true : false;

    let categoryToggler = null;
    if (hasChildCategoory) {
        categoryToggler = <div className="d-inline" onClick={() => setChildVisibility(visible => !visible)}>
            <FontAwesomeIcon icon={faCaretRight} />
        </div>
    }

    let childCategories = null;
    if (hasChildCategoory && childVisible) {
        childCategories = <div>
            <ul className="d-flex flex-column">
                <Categories categories={props.category.children}
                    showCategoryModal={props.showCategoryModal}
                    deleteCategory={props.deleteCategory} />
            </ul>
        </div>
    }

    return (
        <li>
            <div className="d-flex">
                {categoryToggler}
                <div className="mx-2">
                    <span onClick={() => setChildVisibility(visible => !visible)}>
                        {props.category.title}
                    </span>
                    <Button size="sm" className="mx-1" onClick={() => props.showCategoryModal(props.category, true)}> 
                        <FontAwesomeIcon icon={faPlus} /> 
                    </Button>
                    <Button size="sm" className="mx-1" onClick={() => props.showCategoryModal(props.category, false)}>
                        <FontAwesomeIcon icon={faEdit} /> 
                    </Button>
                    <Button size="sm" variant="danger" className="mx-1" onClick={() => props.deleteCategory(props.category.id)}>
                        <FontAwesomeIcon icon={faTrash} /> 
                    </Button>
                </div>
            </div>

            {childCategories}
        </li>
    )    
}

export default Category;
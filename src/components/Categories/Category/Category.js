import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import * as styles from './Category.module.css';

import Categories from '../Categories';

const Category = (props) => {
    const [childVisible, setChildVisibility] = useState(false);

    const hasChildCategoory = props.category.children.length ? true : false;

    let caretStyle = [
        styles.CaretIcon
    ]
    if (hasChildCategoory && childVisible) {
        caretStyle.push(styles.Open)
    }

    let categoryToggler = null;
    if (hasChildCategoory) {
        categoryToggler = <div className={"d-inline-block " + styles.Caret} onClick={() => setChildVisibility(visible => !visible)}>
            <FontAwesomeIcon className={caretStyle.join(" ")} icon={faCaretRight} />
        </div>
    }

    let childCategories = null;
    if (hasChildCategoory && childVisible) {
        childCategories = <Categories 
            categories={props.category.children}
            showCategoryModal={props.showCategoryModal}
            deleteCategory={props.deleteCategory} />
    }

    return (
        <li className={styles.CategoryContainer}>
            <div className={"d-flex " + styles.Category}>
                {categoryToggler}
                <div className="mx-2 d-flex w-100">
                    <span onClick={() => setChildVisibility(visible => !visible)}>
                        {props.category.title}
                    </span>
                    <div className={styles.CategoryActions}>
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
            </div>

            {childCategories}
        </li>
    )    
}

export default Category;